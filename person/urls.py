from django.urls import path

from person.views import person_list, person_new, person_edit, person_remove

urlpatterns = [
    path('', person_list, name='person_list'),
    path('new', person_new, name='person_new'),
    path('edit/<int:person_id>', person_edit, name='person_edit'),
    path('remove/<int:person_id>', person_remove, name='person_remove'),
    # path('list_json', person_list_json),
]
