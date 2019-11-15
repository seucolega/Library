from django.forms import ModelForm

from .models import Book


class BookForm(ModelForm):
    # choices = [(p.id, p) for p in BookPerson.objects.all()]
    # person = MultipleChoiceField(label='People', required=False, choices=choices)

    class Meta:
        model = Book
        fields = ['title', 'original_title', 'publisher', 'age_classification', 'textual_classification']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({'class': 'form-control'})

    # def save(self, commit=True):
    #     # do something with self.cleaned_data['person']
    #     return super().save(commit=commit)
