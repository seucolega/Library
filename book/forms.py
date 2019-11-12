from django.forms import ModelForm

from .models import Book


class BookForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({'class': 'form-control'})

    class Meta:
        model = Book
        fields = ['title', 'original_title', 'publisher', 'age_classification', 'textual_classification']
