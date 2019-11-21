from rest_framework import serializers

from book.models import BookPublisher, BookAgeClassification, BookTextualClassification, BookPersonType, Book, \
    BookPerson


class BookPublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookPublisher
        fields = ['id', 'name']


class BookAgeClassificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookAgeClassification
        fields = ['id', 'name']


class BookTextualClassificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookTextualClassification
        fields = ['id', 'name']


class BookPersonTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookPersonType
        fields = ['id', 'name']


class BookPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookPerson
        # depth = 2
        fields = ['person', 'type']


class BookSerializer(serializers.ModelSerializer):
    # person = serializers.PrimaryKeyRelatedField(queryset=BookPerson.objects.all(), many=True, allow_null=True)

    class Meta:
        model = Book
        # depth = 2
        fields = ['id', 'title', 'original_title', 'publisher', 'age_classification', 'textual_classification',
                  'bookperson_set']

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
