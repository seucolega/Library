from unittest.mock import patch

import pytest


@pytest.fixture
def supply_book_publisher():
    from book.models import Publisher

    return Publisher(name='name 1')


@pytest.fixture
def supply_book_age_classification():
    from book.models import AgeClassification

    return AgeClassification(name='name 1')


@pytest.fixture
def supply_book_textual_classification():
    from book.models import TextualClassification

    return TextualClassification(name='name 1')


@pytest.fixture
def supply_book_person_profile():
    from book.models import PersonProfile

    return PersonProfile(first_name='first_name 1', last_name='last_name 1')


@pytest.fixture
def supply_book_person_profile_2():
    from book.models import PersonProfile

    return PersonProfile(first_name='first_name 2', last_name='last_name 2')


@pytest.fixture
def supply_book_person_type():
    from book.models import PersonType

    return PersonType(name='type 1')


@pytest.fixture
def supply_book(supply_book_publisher, supply_book_age_classification, supply_book_textual_classification):
    from book.models import Book

    supply_book_publisher.save()
    supply_book_age_classification.save()
    supply_book_textual_classification.save()
    book = Book(title='title 1', original_title='original title 1', publisher=supply_book_publisher,)
    book.save()
    book.age_classification.add(supply_book_age_classification)
    book.textual_classification.add(supply_book_textual_classification)
    return book


@pytest.fixture
def supply_book_person(supply_book, supply_book_person_profile, supply_book_person_type):
    from book.models import Person

    return Person(book=supply_book, person=supply_book_person_profile, type=supply_book_person_type)


@pytest.fixture
@patch('book.metabooks_api.requests.request')
def metabooks_instance(mock):
    # TODO: mock error
    return mock


@pytest.fixture
def metabooks_product_search_json():
    return {
        "productId": "93be1194f0ca4e03a91036efad9ddcae",
        "providerId": "pxavier",
        "publicationDate": "21.06.2005",
        "titles": [{"title": "Poesia completa de Alberto Caeiro", "titleType": "01"}],
        "noContributor": False,
        "edition": {"editionNumber": 1, "editionStatement": "Edição de bolso"},
        "form": {
            "height": 180.0,
            "width": 125.0,
            "weight": 220.0,
            "thickness": 13.0,
            "primaryContentType": "10",
            "productForm": "BC",
        },
        "extent": {"mainContentPageCount": 264},
        "contributors": [
            {
                "firstName": "Fernando",
                "lastName": "Pessoa",
                "sequenceNumber": 1,
                "contributorRole": "A01",
            }
        ],
        "identifiers": [
            {
                "productIdentifierType": "01",
                "idTypeName": "Publishers Order No",
                "idValue": "80006",
            },
            {"productIdentifierType": "02", "idValue": "8535906509"},
            {"productIdentifierType": "03", "idValue": "9788535906509"},
            {"productIdentifierType": "15", "idValue": "9788535906509"},
        ],
        "languages": [{"languageRole": "01", "languageCode": "por"}],
        "prices": [
            {
                "priceType": "02",
                "countriesIncluded": "BR",
                "currencyCode": "BRL",
                "priceAmount": 34.9,
                "priceTypeDescription": "0% MwSt.-Angabe vom Verlag",
                "priceStatus": "02",
                "calculated": False,
            }
        ],
        "publishers": [
            {
                "adbName": "Editora Schwarcz SA",
                "imprint": False,
                "publishingRole": "01",
                "publisherName": "Companhia de Bolso",
                "publisherIdType": "05",
                "idValue": "BR0089558",
            }
        ],
        "textContents": [
            {
                "textType": "03",
                "textFormat": "06",
                "text": 'Esta reunião da poesia de Alberto Caeiro, "o guardador de rebanhos", integra a coleção de '
                "obras de Fernando Pessoa publicada pela Companhia das Letras, sempre com texto estabelecido "
                "por grandes especialistas. Aqui o trabalho de edição crítica ficou a cargo de Fernando "
                "Cabral Martins e Richard Zenith, autores também dos dois ensaios que integram o livro. Para "
                "Martins, de todos os heterônimos criados por Fernando Pessoa, Caeiro talvez seja o que "
                'corresponda a um "esforço de arquitetura" mais bem-sucedido. Uma das três partes de sua '
                'obra, O pastor amoroso, "mostra-o em tudo contrário ao que se deseja e se projeta nas outras '
                'duas", enquanto O guardador de rebanhos e os Poemas inconjuntos contêm poemas "em que a '
                "personagem surge sob iluminações imprevistas, revelando aspectos que contradizem o seu ideal "
                'de Si-Mesmo e lhe conferem verossimilhança ficcional". Em Caeiro há uma "ciência '
                'espontânea", um "misticismo materialista" e uma "simplicidade complexa" - "atributos '
                'paradoxais que servem para intensificar e tornar crível a sua extraordinária singularidade".',
                "textContentAudience": ["00"],
            }
        ],
        "formFeatures": [
            {
                "productFormFeatureType": "01",
                "productFormFeatureValue": "PUR",
                "productFormFeatureDescription": "2%",
            },
            {
                "productFormFeatureType": "01",
                "productFormFeatureValue": "SKY",
                "productFormFeatureDescription": "88%",
            },
            {
                "productFormFeatureType": "01",
                "productFormFeatureValue": "TEA",
                "productFormFeatureDescription": "9%",
            },
        ],
        "supportingResources": [
            {
                "resourceMode": "03",
                "resourceForm": "02",
                "fileFormat": "D502",
                "imageHeight": 2126,
                "imageWidth": 1476,
                "filename": "9788535906509.jpg",
                "filesizeExact": 2760426,
                "md5Hash": "51a3400c2736178d0b93e3ab03a307f1",
                "sha256Hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "exportedLink": "https://api.metabooks.com/api/v1/cover/9788535906509/m",
                "lastUpdated": "20190329",
                "resourceContentType": "01",
                "contentAudience": ["00"],
            }
        ],
        "active": True,
        "bitNo": 4118,
        "productType": "pbook",
        "productAvailability": "20",
        "subjects": [
            {
                "subjectSchemeIdentifier": "12",
                "subjectCode": "POE000000",
                "mainSubject": True,
            },
            {
                "subjectSchemeIdentifier": "10",
                "subjectCode": "POE000000",
                "subjectSchemeName": "MainSubject",
                "mainSubject": True,
            },
            {
                "sourceName": "Publisher",
                "subjectSchemeIdentifier": "93",
                "subjectSchemeVersion": "1.1",
                "subjectCode": "DC",
                "subjectHeadingText": "Poesia",
                "subjectSchemeName": "MainSubject",
                "mainSubject": True,
            },
            {
                "subjectSchemeIdentifier": "20",
                "subjectHeadingText": "poemas",
                "mainSubject": False,
            },
            {
                "subjectSchemeIdentifier": "20",
                "subjectHeadingText": "poesia portuguesa",
                "mainSubject": False,
            },
            {
                "subjectSchemeIdentifier": "20",
                "subjectHeadingText": "coletânea",
                "mainSubject": False,
            },
            {
                "subjectSchemeIdentifier": "20",
                "subjectHeadingText": "heterônimo",
                "mainSubject": False,
            },
        ],
        "productClassifications": [
            {
                "productClassificationType": "10",
                "productClassificationCode": "4901.99.00",
            }
        ],
        "creationDate": "09.06.2017",
        "lastModificationDate": "06.07.2020",
        "splitVat": False,
    }


@pytest.fixture
def product_ean():
    return '9788535906509'


# @pytest.fixture
# def metabooks_instance_with_product_r_json(metabooks_instance, metabooks_product_search_json, product_ean):
#     metabooks_instance.return_value.status_code = status.HTTP_200_OK
#     metabooks_instance.return_value.json = metabooks_product_search_json
#
#     return metabooks_instance