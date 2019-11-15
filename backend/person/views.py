from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.shortcuts import render

from .forms import PersonForm
from .models import Person


# from django.core import serializers
# from django.http.response import HttpResponse


def person_list(request):
    search_for = request.POST.get('search', '')
    return render(request, 'person_list.html',
                  {
                      'list': Person.objects.filter(
                          Q(first_name__icontains=search_for) |
                          Q(last_name__icontains=search_for)
                      ),
                      'search_for': search_for
                  })


def person_new(request):
    form = PersonForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        return redirect('person_list')
    return render(request, 'person_edit.html', {'form': form})


def person_edit(request, person_id):
    person = get_object_or_404(Person, pk=person_id)
    form = PersonForm(request.POST or None, request.FILES or None, instance=person)
    if form.is_valid():
        form.save()
        return redirect('person_list')
    return render(request, 'person_edit.html', {'id': person_id, 'form': form})


def person_remove(request, person_id):
    person = get_object_or_404(Person, pk=person_id)
    if request.method == 'POST':
        person.delete()
        return redirect('person_list')
    return render(request, 'person_remove.html', {'model': person})

# def person_list_json(request):
#     data = serializers.serialize('json', Person.objects.all())
#     return HttpResponse(data, content_type='application/json')
