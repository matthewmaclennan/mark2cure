from django.http import HttpResponseForbidden

from ..document.models import Document


def doc_completion_required(function):

    def test_user_for_doc_completion(request, *args, **kwargs):
        # (TODO) Make sure always gets run after login_required
        completed_document_pks = request.user.profile.completed_document_pks()

        # (TODO) This is horrendous
        doc_pk = Document.objects.filter(document_id=kwargs['pubmed_id']).values('pk')[0]['pk']

        if not request.user.groups.filter(name='Comment Moderators').exists() and doc_pk not in completed_document_pks:
            return HttpResponseForbidden('Access denied!')
        else:
            return function(request, *args, **kwargs)

    return test_user_for_doc_completion
