from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.shortcuts import render

from .forms import BookForm
from .models import Book


# from django.http.response import HttpResponse
# from django.core import serializers


def book_list(request):
    search_for = request.POST.get('search', '')
    return render(request, 'book_list.html',
                  {
                      'list': Book.objects.filter(title__icontains=search_for),
                      'search_for': search_for
                  })
    # return render(request, 'book_list.html', {'list': Book.objects.all()})


def book_new(request):
    form = BookForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        return redirect('book_list')
    return render(request, 'book_edit.html', {'form': form})


def book_edit(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    form = BookForm(request.POST or None, request.FILES or None, instance=book)
    if form.is_valid():
        form.save()
        return redirect('book_list')
    return render(request, 'book_edit.html', {'id': book_id, 'form': form})


def book_remove(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    if request.method == 'POST':
        book.delete()
        return redirect('book_list')
    return render(request, 'book_remove.html', {'model': book})

# def book_list_json(request):
#     data = serializers.serialize('json', Book.objects.all())
#     return HttpResponse(data, content_type='application/json')


# def book_list_(request):
#     return HttpResponse('Oi')
