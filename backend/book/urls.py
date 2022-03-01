# from django.urls import path
#
# from book.views import book_list, book_new, book_edit, book_remove
#
# urlpatterns = [
#     path('', book_list, name='book_list'),
#     path('new', book_new, name='book_new'),
#     path('edit/<int:book_id>', book_edit, name='book_edit'),
#     path('remove/<int:book_id>', book_remove, name='book_remove'),
#     # path('list_json', book_list_json),
# ]

from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'publisher', views.PublisherViewSet)
router.register(r'age_classification', views.AgeClassificationViewSet)
router.register(r'textual_classification', views.TextualClassificationViewSet)
router.register(r'person_type', views.PersonTypeViewSet)
router.register(r'person_profile', views.PersonProfileViewSet)
router.register(r'person', views.PersonViewSet)
router.register(r'book', views.BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path(
        'api-auth/', include('rest_framework.urls', namespace='rest_framework')
    ),
]
