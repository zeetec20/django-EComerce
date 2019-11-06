from uuid import uuid4
from django.contrib.auth import get_user_model

def getToken():
    token = uuid4()
    allUser = get_user_model().objects.all()
    allToken = []
    for user in allUser:
        allToken.append(user.token)
    while token in allToken:
        token = uuid4()
    return token

def getTokenInt():
    token = uuid4().int
    return token