from book.models import AgeClassification, Book, Person, PersonType, Publisher, TextualClassification
from django.db import IntegrityError
from django.utils.translation import gettext as _
from rest_framework import serializers


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['id', 'name']

    def update(self, instance, validated_data):
        try:
            super(PublisherSerializer, self).update(instance, validated_data)
        except IntegrityError:
            raise serializers.ValidationError({'error': _('Integrity error.')})
        return instance


class AgeClassificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgeClassification
        fields = ['id', 'name']


class TextualClassificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextualClassification
        fields = ['id', 'name']


class PersonTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonType
        fields = ['id', 'name']


class PersonProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonType
        fields = ['id', 'name']


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        # depth = 2
        fields = ['id', 'book', 'person', 'type']


class BookSerializer(serializers.ModelSerializer):
    # person = serializers.PrimaryKeyRelatedField(queryset=BookPerson.objects.all(), many=True, allow_null=True)

    class Meta:
        model = Book
        # depth = 2
        fields = [
            'id',
            'title',
            'original_title',
            'publisher',
            'age_classification',
            'textual_classification',
            'person_set',
            'gtin',
            'stock_quantity'
        ]

    # def to_representation(self, value):
    #     data = super().to_representation(value)
    #     data['person'] = [BookPersonSerializer(person).data for person in value.person]
    #     return data
    #
    # def update(self, instance, validated_data):
    #     del validated_data['person']
    #     # person = validated_data.pop('person')
    #     # for book_person in person:
    #     #     print(book_person['person'])
    #     #     print(book_person['type'])
    #     return instance
    #
    # def create(self, validated_data):
    #     del validated_data['person']
    #     instance = super().create(validated_data)
    #     return instance


class BookInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        depth = 2
        fields = [
            'id',
            'title',
            'publisher',
            'gtin',
            'stock_quantity'
        ]
