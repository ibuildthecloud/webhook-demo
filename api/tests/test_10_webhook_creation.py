import json
import pytest
import logging
import time


@pytest.mark.run(order=10)
def test_webhook_creation(wait_for_api):
    request_session, api_url = wait_for_api
    res = request_session.get('{}/wh'.format(api_url))
    json_data = json.loads(res.text)
    assert res.status_code == 201
    assert "token" in json_data
    assert "name" in json_data
    pytest.token = json_data["token"]
    pytest.name = json_data["name"]
