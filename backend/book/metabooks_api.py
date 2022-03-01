from enum import Enum, auto
from urllib.parse import urljoin

import requests
from decouple import Csv, config


class Method(Enum):
    GET = 'GET'
    POST = 'POST'


class ImageSize(Enum):
    SMALL = 's'
    MEDIUM = 'm'
    LARGE = 'l'
    FULL = ''


class CallType(Enum):
    GENERAL = auto()
    MEDIA_LIST = auto()
    MEDIA = auto()


class MetabooksAPI:
    METABOOKS_ACCESS_KEYS = config(
        'METABOOKS_ACCESS_KEYS', cast=Csv(), default=None
    )
    API_ENDPOINT = 'http://www.metabooks.com/api/'
    AUTHENTICATION_SCHEME = 'Bearer'

    def __init__(self, session: requests.Session = None):
        self.tokens = {
            CallType.GENERAL: self.METABOOKS_ACCESS_KEYS[0],
            CallType.MEDIA_LIST: self.METABOOKS_ACCESS_KEYS[1],
            CallType.MEDIA: self.METABOOKS_ACCESS_KEYS[2],
        }
        self.session = (
            session or requests.Session()
        )  # Session instance for requests

    def get_api_url(self, url: str = '', uri: str = ''):
        if not url:
            url = self.API_ENDPOINT

        return urljoin(url, uri)

    def request(
        self,
        method: Method,
        url: str = '',
        uri: str = '',
        call_type: CallType = CallType.GENERAL,
        return_json: bool = False,
        **kwargs: dict,
    ):
        url = self.get_api_url(url, uri)

        headers = {
            'Authorization': f'{self.AUTHENTICATION_SCHEME} {self.tokens[call_type]}'
        }
        headers.update(kwargs.get('header', {}))

        r = self.session.request(
            method=method.value, url=url, headers=headers, **kwargs
        )

        if not return_json:
            return r

        try:
            return r.json()
        except ValueError:
            return r.text

    def get(
        self,
        url: str = '',
        uri: str = '',
        call_type: CallType = CallType.GENERAL,
        return_json: bool = False,
        **kwargs: dict,
    ):
        return self.request(
            Method.GET, url, uri, call_type, return_json, **kwargs
        )

    def post(
        self,
        url: str = '',
        uri: str = '',
        call_type: CallType = CallType.GENERAL,
        return_json: bool = False,
        **kwargs: dict,
    ):
        return self.request(
            Method.POST, url, uri, call_type, return_json, **kwargs
        )


def get_image_url(image_data: dict, image_size: ImageSize) -> str:
    if image_data.get('resourceContentType') == '01':
        return image_data.get('exportedLink')[:-1] + image_size.value
    return image_data.get('exportedLink')


def get_product_json_from_ean(
    metabooks_instance: MetabooksAPI, product_ean: str
) -> dict:
    r = metabooks_instance.get(uri=f'v2/product/{product_ean}/isbn13')
    if r.status_code == 200:
        return r.json()


def get_publisher_json_from_id(
    metabooks_instance: MetabooksAPI, publisher_id: str
) -> dict:
    r = metabooks_instance.get(uri=f'v2/publisher/{publisher_id}')
    if r.status_code == 200:
        return r.json()
