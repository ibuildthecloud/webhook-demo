import json
import pytest


@pytest.mark.run(order=30)
def test_get_history(wait_for_api):
    request_session, api_url = wait_for_api

    res = request_session.get('{}/data'.format(api_url),
                              headers={'Authorization': 'Bearer {}'.format(pytest.token)})
    assert res.status_code == 200
    json_data = json.loads(res.text)
    assert "webhook" in json_data
    assert "data" in json_data
    assert len(json_data["data"]) == 3
