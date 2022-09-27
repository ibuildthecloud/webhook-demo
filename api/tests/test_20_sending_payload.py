import json
import pytest


@pytest.mark.run(order=20)
def test_send_payload_with_bearer_authorization(wait_for_api):
    request_session, api_url = wait_for_api
    data = {
        "event": "new image available",
        "name": "api:1.14.5"
    }
    res = request_session.post('{}/data'.format(api_url),
                               json=data,
                               headers={'Authorization': 'Bearer {}'.format(pytest.token)})
    assert res.status_code == 201


@pytest.mark.run(order=21)
def test_send_payload_with_token_in_query(wait_for_api):
    request_session, api_url = wait_for_api
    data = {
        "event": "new image available",
        "name": "api:1.14.6"
    }
    res = request_session.post('{}/data?token={}'.format(api_url, pytest.token),
                               json=data)
    assert res.status_code == 201


@ pytest.mark.run(order=22)
def test_send_empty_string_payload(wait_for_api):
    request_session, api_url = wait_for_api
    data = ''
    res = request_session.post('{}/data'.format(api_url),
                               data=data,
                               headers={'Authorization': 'Bearer {}'.format(pytest.token)})
    assert res.status_code == 400


@ pytest.mark.run(order=23)
def test_send_string_payload(wait_for_api):
    request_session, api_url = wait_for_api
    data = 'test'
    res = request_session.post('{}/data'.format(api_url),
                               json=data,
                               headers={'Authorization': 'Bearer {}'.format(pytest.token)})
    assert res.status_code == 201


@ pytest.mark.run(order=24)
def test_send_incorrect_payload(wait_for_api):
    request_session, api_url = wait_for_api
    data = 2
    res = request_session.post('{}/data'.format(api_url),
                               json=data,
                               headers={'Authorization': 'Bearer {}'.format(pytest.token)})
    assert res.status_code == 400


@ pytest.mark.run(order=25)
def test_send_empty_payload(wait_for_api):
    request_session, api_url = wait_for_api
    res = request_session.post('{}/data'.format(api_url),
                               headers={'Authorization': 'Bearer {}'.format(pytest.token)})
    assert res.status_code == 400
