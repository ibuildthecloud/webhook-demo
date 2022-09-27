import json
import pytest
import logging
import time


@pytest.mark.run(order=50)
def test_stats(wait_for_api):
    request_session, api_url = wait_for_api
    res = request_session.get('{}/stats'.format(api_url))
    assert res.status_code == 200

    json_data = json.loads(res.text)
    assert "stats" in json_data
    assert "number_of_webhooks" in json_data["stats"]
    assert "number_of_payloads_received" in json_data["stats"]
