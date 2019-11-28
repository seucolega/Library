from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext as _
from django.template.defaultfilters import slugify


class Publisher(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Publisher'
        verbose_name_plural = 'Publishers'
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def slug(self):
        return slugify(self.name)

    def save(self, *args, **kwargs):
        self.clean_fields()
        super().save(*args, **kwargs)

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude=exclude)

        # self.objects.get(name__unn)
        raise ValidationError(
            _('There is already a publisher with this name.')
        )

        # if self.status == 'draft' and self.pub_date is not None:
        #     if exclude and 'status' in exclude:
        #         raise ValidationError(
        #             _('Draft entries may not have a publication date.')
        #         )
        #     else:
        #         raise ValidationError({
        #             'status': _(
        #                 'Set status to draft if there is not a '
        #                 'publication date.'
        #              ),
        #         })


class AgeClassification(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Age Classification'
        verbose_name_plural = 'Age Classifications'
        ordering = ['name']

    def __str__(self):
        return self.name


class TextualClassification(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Textual Classification'
        verbose_name_plural = 'Textual Classifications'
        ordering = ['name']

    def __str__(self):
        return self.name


# class BookPersonAuthorship(models.Model):
#     name = models.CharField(max_length=100)
#
#     class Meta:
#         verbose_name = 'Author'
#         verbose_name_plural = 'Authors'
#         ordering = ['name']
#
#     def __str__(self):
#         return self.name
#
#
# class BookPersonIllustration(models.Model):
#     name = models.CharField(max_length=100)
#
#     class Meta:
#         verbose_name = 'Illustrator'
#         verbose_name_plural = 'Illustrators'
#         ordering = ['name']
#
#     def __str__(self):
#         return self.name
#
#
# class BookPersonTranslation(models.Model):
#     name = models.CharField(max_length=100)
#
#     class Meta:
#         verbose_name = 'Translator'
#         verbose_name_plural = 'Translators'
#         ordering = ['name']
#
#     def __str__(self):
#         return self.name
#
#
# class BookPersonOrganization(models.Model):
#     name = models.CharField(max_length=100)
#
#     class Meta:
#         verbose_name = 'Organizer'
#         verbose_name_plural = 'Organizers'
#         ordering = ['name']
#
#     def __str__(self):
#         return self.name


# class BookCollection(models.Model):
#     name = models.CharField(max_length=50)
#
#     class Meta:
#         verbose_name = 'Collection'
#         verbose_name_plural = 'Collections'
#         ordering = ['name']
#
#     def __str__(self):
#         return self.name


class PersonType(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        verbose_name = 'Person Type'
        verbose_name_plural = 'Person Types'
        ordering = ['name']

    def __str__(self):
        return self.name


class PersonProfile(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Person'
        verbose_name_plural = 'People'
        ordering = ['name']

    def __str__(self):
        return self.name


# class BookPerson(models.Model):
#     person = models.ForeignKey(BookPersonProfile, on_delete=models.PROTECT)
#     type = models.ManyToManyField(BookPersonType)
#
#     class Meta:
#         verbose_name = 'Person (Book)'
#         verbose_name_plural = 'People (Book)'
#         ordering = ['person__name']
#
#     @property
#     def type_verbose(self):
#         return ', '.join([t.name for t in self.type.only('name')])
#
#     def __str__(self):
#         return f'{self.person.name} ({self.type_verbose})'


class Book(models.Model):
    title = models.CharField(max_length=100)
    original_title = models.CharField(max_length=100)
    publisher = models.ForeignKey(Publisher, on_delete=models.PROTECT)
    age_classification = models.ManyToManyField(AgeClassification)
    # TODO: Transformar relacionamento com classificação textual em ManyToOne
    textual_classification = models.ManyToManyField(TextualClassification)

    # authorship = models.ManyToManyField(BookPersonAuthorship)
    # illustration = models.ManyToManyField(BookPersonIllustration, null=True)
    # translation = models.ManyToManyField(BookPersonTranslation, null=True)
    # organization = models.ManyToManyField(BookPersonOrganization, null=True)
    # collection = models.ManyToManyField(BookCollection, null=True)
    # image = models.ImageField(null=True, blank=True)
    # checksum = models.CharField(max_length=32, blank=True, null=True)
    # estoque

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'
        ordering = ['title']

    def __str__(self):
        return self.title

    # @property
    # def person(self):
    #     return self.bookperson_set.all()

    # @person.setter
    # def person(self, value):
    #     current = set(self.person)
    #     value = [p.id for p in value]
    #     for book_person in current.difference(value):
    #         book_person.delete()
    #     for book_person in set(value).difference(current):
    #         book_person.update({'book': self.pk})
    #         BookPerson(book_person).save()

    # def _update_md5(self):
    #     if self.image:
    #         self.checksum = hash_file(self.image)
    #
    # def save(self, *args, **kwargs):
    #     self._update_md5()
    #     super().save(*args, **kwargs)


class Person(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    person = models.ForeignKey(PersonProfile, on_delete=models.PROTECT)
    type = models.ManyToManyField(PersonType)

    class Meta:
        verbose_name = 'Person (Book)'
        verbose_name_plural = 'People (Book)'
        ordering = ['person__name']

    @property
    def type_verbose(self):
        return ', '.join([t.name for t in self.type.only('name')])

    def __str__(self):
        return f'{self.person.name} ({self.type_verbose})'
