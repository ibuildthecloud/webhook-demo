import json
import pytest
import logging
import time


@pytest.mark.run(order=60)
def test_webhook_deletion(wait_for_api):
    request_session, api_url = wait_for_api
    res = request_session.delete('{}/wh'.format(api_url),
                                 headers={'Authorization': 'Bearer {}'.format(pytest.token)})
    assert res.status_code == 200
