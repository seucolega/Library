from django.template.defaultfilters import slugify
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from book.models import AgeClassification, Book, Person, PersonProfile, PersonType, Publisher, TextualClassification
from . import metabooks_api
from .serializers import (
    AgeClassificationSerializer,
    BookSerializer,
    PersonProfileSerializer,
    PersonSerializer,
    PersonTypeSerializer,
    PublisherSerializer,
    TextualClassificationSerializer, BookInventorySerializer,
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

    @action(detail=False, methods=['post'])
    def inventory(self, request):
        try:
            gtin = self.request.data["gtin"]
            quantity = self.request.data["quantity"]
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        book = Book.objects.filter(gtin=gtin).first()
        if book:
            # TODO: criar função para fazer a entrada de um item no estoque
            book.stock_quantity += quantity
            book.save()
        else:
            # TODO: se nao tiver, verificar no metabooks
            metabooks_instance = metabooks_api.MetabooksAPI()
            metabooks_json = metabooks_api.get_product_json_from_ean(
                metabooks_instance=metabooks_instance,
                product_ean=gtin
            )
            if metabooks_json:
                book = Book(gtin=gtin)
                for title in metabooks_json.get("titles", []):
                    if title.get("titleType") == "01":
                        book.title = title.get("title")

                # for title in metabooks_json.get("textContents", []):
                #     if title.get("textType") == "03":
                #         book.description = title.get("text")

                if len(metabooks_json.get("publishers", [])):
                    publisher_name = metabooks_json["publishers"][0]["publisherName"]
                    publisher = Publisher.objects.filter(slug=slugify(publisher_name))
                    if not publisher:
                        publisher = Publisher(name=publisher_name)
                        publisher.save()
                    book.publisher = publisher

                book.save()

        if book:
            serializer = BookInventorySerializer(book)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
