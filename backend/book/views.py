from rest_framework import viewsets

from book.models import BookPublisher, BookAgeClassification, BookTextualClassification, BookPersonType, Book
from .serializers import BookPublisherSerializer, BookAgeClassificationSerializer, BookTextualClassificationSerializer, \
    BookPersonTypeSerializer, BookSerializer


class BookPublisherViewSet(viewsets.ModelViewSet):
    queryset = BookPublisher.objects.all().order_by('name')
    serializer_class = BookPublisherSerializer


class BookAgeClassificationViewSet(viewsets.ModelViewSet):
    queryset = BookAgeClassification.objects.all().order_by('name')
    serializer_class = BookAgeClassificationSerializer


class BookTextualClassificationViewSet(viewsets.ModelViewSet):
    queryset = BookTextualClassification.objects.all().order_by('name')
    serializer_class = BookTextualClassificationSerializer


class BookPersonTypeViewSet(viewsets.ModelViewSet):
    queryset = BookPersonType.objects.all().order_by('name')
    serializer_class = BookPersonTypeSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('title')
    serializer_class = BookSerializer
