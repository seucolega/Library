from book.models import AgeClassification, Book, Person, PersonProfile, PersonType, Publisher, TextualClassification
from rest_framework import viewsets

from .serializers import (
    AgeClassificationSerializer,
    BookSerializer,
    PersonProfileSerializer,
    PersonSerializer,
    PersonTypeSerializer,
    PublisherSerializer,
    TextualClassificationSerializer,
)


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


class PersonProfileViewSet(viewsets.ModelViewSet):
    queryset = PersonProfile.objects.all().order_by('name')
    serializer_class = PersonProfileSerializer


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all().order_by('person__name')
    serializer_class = PersonSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('title')
    serializer_class = BookSerializer
