import time
import pytest
from urllib.parse import urljoin
from db import Database
import string
import secrets
from werkzeug.security import generate_password_hash, check_password_hash

# Connect to the database
Database.initialize()


@pytest.mark.run(order=1)
def test_api(wait_for_api):
    """The api is now verified good to go and tests can interact with it"""
    request_session, api_url = wait_for_api
    res = request_session.get('{}/app/healthz'.format(api_url))
    assert res.status_code == 200
