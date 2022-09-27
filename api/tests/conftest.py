import os
import pytest
import requests
from urllib3.util.retry import Retry
from requests.adapters import HTTPAdapter


@pytest.fixture(scope="session")
def wait_for_api():
    """Wait for api to become responsive"""
    request_session = requests.Session()
    retries = Retry(total=5,
                    backoff_factor=0.1,
                    status_forcelist=[500, 502, 503, 504])
    request_session.mount('http://', HTTPAdapter(max_retries=retries))

    api_url = "http://api:5000"
    assert request_session.get('{}/app/healthz'.format(api_url))
    return request_session, api_url


def pytest_configure():
    """ Keep track of the authentication token"""
    pytest.token = ''
    pytest.name = ''
