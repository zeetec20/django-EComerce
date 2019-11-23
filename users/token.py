from uuid import uuid4
from django.contrib.auth import get_user_model
from transaksi.models import Transaksi

def getTokenUser():
    token = uuid4()
    allUser = get_user_model().objects.all()
    allToken = []
    for user in allUser:
        allToken.append(user.token)
    while token in allToken:
        token = uuid4()
    return token

def getIdTransaksi():
    semuaTransaksi = Transaksi.objects.all()
    semuaId_Transaksi = []
    for transaksi in semuaTransaksi:
        semuaId_Transaksi.append(transaksi.id_transaksi)
    
    id = uuid4().int
    while id in semuaId_Transaksi:
        id = uuid4().int
    return id