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
router.register(r'book_publisher', views.BookPublisherViewSet)
router.register(r'book_age_classification', views.BookAgeClassificationViewSet)
router.register(r'book_textual_classification', views.BookTextualClassificationViewSet)
router.register(r'book_person_type', views.BookPersonTypeViewSet)
router.register(r'book', views.BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]