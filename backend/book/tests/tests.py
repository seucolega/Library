import pytest
from rest_framework import status

from book.models import Book


@pytest.mark.django_db
def test_book_inventory_success(metabooks_instance, api_client):
    metabooks_instance.return_value.status_code = status.HTTP_200_OK

    url = '/api/book/book/inventory/'
    payload = {
        'ean': '9788535906509',
        'quantity': '1'
    }
    r = api_client.post(url, data=payload)

    assert r.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_book_inventory_new_book(metabooks_instance, metabooks_product_search_json, product_ean, api_client):
    metabooks_instance.return_value.status_code = status.HTTP_200_OK
    metabooks_instance.return_value.json = metabooks_product_search_json

    url = '/api/book/book/inventory/'
    payload = {
        'ean': product_ean,
        'quantity': '1'
    }
    api_client.post(url, data=payload)

    assert Book.objects.filter(ean=product_ean).exists()


@pytest.mark.django_db
def test_book_inventory_new_book_with_title(metabooks_instance, metabooks_product_search_json, product_ean, api_client):
    metabooks_instance.return_value.status_code = status.HTTP_200_OK
    metabooks_instance.return_value.json = metabooks_product_search_json

    url = '/api/book/book/inventory/'
    payload = {
        'ean': product_ean,
        'quantity': '1'
    }
    api_client.post(url, data=payload)

    book = Book.objects.get(ean=product_ean)

    assert book.title == metabooks_product_search_json.get('titles')[0].get('title')


@pytest.mark.django_db
@pytest.mark.parametrize(
    'quantity',
    [1, 2]
)
def test_book_inventory_new_book_stock_quantity(
        metabooks_instance, metabooks_product_search_json, product_ean, quantity, api_client
):
    metabooks_instance.return_value.status_code = status.HTTP_200_OK
    metabooks_instance.return_value.json = metabooks_product_search_json

    url = '/api/book/book/inventory/'
    payload = {
        'ean': product_ean,
        'quantity': quantity
    }
    api_client.post(url, data=payload)

    book = Book.objects.get(ean=product_ean)

    assert book.stock_quantity == quantity


@pytest.mark.django_db
def test_book_inventory_new_book_stock_quantity_2(
        metabooks_instance, metabooks_product_search_json, product_ean, api_client
):
    metabooks_instance.return_value.status_code = status.HTTP_200_OK
    metabooks_instance.return_value.json = metabooks_product_search_json

    url = '/api/book/book/inventory/'
    payload = {
        'ean': product_ean,
        'quantity': 1
    }
    api_client.post(url, data=payload)

    payload['quantity'] = 2
    api_client.post(url, data=payload)

    book = Book.objects.get(ean=product_ean)

    assert book.stock_quantity == 3
