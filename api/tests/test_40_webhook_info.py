import json
import pytest
import logging
import time


@pytest.mark.run(order=40)
def test_webhook_info(wait_for_api):
    request_session, api_url = wait_for_api
    res = request_session.get('{}/wh/info'.format(api_url),
                              headers={'Authorization': 'Bearer {}'.format(pytest.token)})
    assert res.status_code == 200

    json_data = json.loads(res.text)
    assert "info" in json_data
    assert "name" in json_data["info"]
    assert "payload_nbr" in json_data["info"]
    assert "created_at" in json_data["info"]
    # assert json_data["payload_nbr"]) == 2
