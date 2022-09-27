import logging
import re

# Check if token is provided
# - in the Authorization header (Authorization: Bearer XXX)
# - in the query string (token=XXX)


def get_auth_token(request):
    # Check if token provided in the Authorization header as a Bearer
    header = request.headers.get('Authorization')
    if header != None:
        if re.match(r"^[Bb]earer \S{30}$", header):
            return header.split()[1]
        logging.debug("No correctly formatted bearer token found")

    # Check if token provided in the token field within the query string
    token = request.args.get('token')
    if token != None and token != "":
        if re.match(r"^\S{30}$", token):
            return token
        logging.debug("No correctly formatted token found in the query string")

    # Consider no token or empty token provided
    # => associated to "default" webhook
    return None
