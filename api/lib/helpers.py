import secrets
from coolname import generate_slug


def get_nbr(request):
    default_nbr = 20
    max_nbr = 100
    nbr = request.args.get('nbr')
    if nbr == None or nbr == "":
        return default_nbr

    # Make sure value can be converted into an integer
    try:
        nbr = int(nbr)
    except Exception:
        return default_nbr

    # Make sure nbr value is acceptable
    if nbr > max_nbr:
        nbr = max_nbr
    return nbr


def create_item_name():
    return generate_slug(3)


def create_auth_token():
    return secrets.token_hex(15)
