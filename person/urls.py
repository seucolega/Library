from django.urls import path

from .views import person_edit
from .views import person_list
from .views import person_list_json
from .views import person_new
from .views import person_remove

urlpatterns = [
    path('', person_list, name='person_list'),
    path('list_json', person_list_json),
    path('new', person_new, name='person_new'),
    path('edit/<int:person_id>', person_edit, name='person_edit'),
    path('remove/<int:person_id>', person_remove, name='person_remove'),
]
