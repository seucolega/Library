from rest_framework import viewsets

from book.models import Publisher, AgeClassification, TextualClassification, PersonType, Book
from .serializers import PublisherSerializer, AgeClassificationSerializer, TextualClassificationSerializer, \
    PersonTypeSerializer, BookSerializer


class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all().order_by('name')
    serializer_class = PublisherSerializer


class AgeClassificationViewSet(viewsets.ModelViewSet):
    queryset = AgeClassification.objects.all().order_by('name')
    serializer_class = AgeClassificationSerializer


class TextualClassificationViewSet(viewsets.ModelViewSet):
    queryset = TextualClassification.objects.all().order_by('name')
    serializer_class = TextualClassificationSerializer


class PersonTypeViewSet(viewsets.ModelViewSet):
    queryset = PersonType.objects.all().order_by('name')
    serializer_class = PersonTypeSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('title')
    serializer_class = BookSerializer
