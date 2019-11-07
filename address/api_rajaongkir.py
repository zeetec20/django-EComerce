import http.client
import json
import requests

api_key = 'd83bacaaaa625ab17c3bd8c620de72ff'
conn = http.client.HTTPSConnection("api.rajaongkir.com")

def getCity(nama):
    headers = { 'key': api_key }
    data_json = requests.get('https://api.rajaongkir.com//starter/city', headers).json()
    result = data_json['rajaongkir']['results']
    for city in result:
        if city['city_name'] == nama:
            city_id = city['city_id']
            return city_id
    print('tidak ditemukan')

def cekTarif(asal, tujuan, berat, ekspedisi):
    origin      = str(getCity(asal))
    destination = str(getCity(tujuan))
    weight      = str(berat)
    courier     = str(ekspedisi)
    
    headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'key': api_key,
    }

    data = {
        'origin': origin,
        'destination': destination,
        'weight': weight,
        'courier': courier
    }
    response = requests.post('https://api.rajaongkir.com/starter/cost', headers=headers, data=data).json()
    return response['rajaongkir']['results']

def template(list, ekpdsi):
    template = []
    if ekpdsi == 'pos':
        for a in list:
            template.append(
                [
                    a['service'] + ' - ' + 'Rp' + str(format(a['cost'][0]['value'], ',d')) + ' - ' + a['cost'][0]['etd'], 
                    a['cost'][0]['value'],
                    a['service']
                ]
            )
    else:
        for a in list:
            template.append(
                [
                    a['service'] + ' - ' + 'Rp' + str(format(a['cost'][0]['value'], ',d')) + ' - ' + a['cost'][0]['etd'] + 'Hari', 
                    a['cost'][0]['value'],
                    a['service']
                ]
            )
    return template

headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'key': api_key,
}

data = {
    'origin': '501',
    'destination': '114',
    'weight': '1700',
    'courier': 'jne'
}

response = requests.post('https://api.rajaongkir.com/starter/cost', headers=headers, data=data)
print(response.json())


# [{
#     'code': 'jne',
#     'name': 'Jalur Nugraha Ekakurir (JNE)',
#     'costs': [{
#         'service': 'OKE',
#         'description': 'Ongkos Kirim Ekonomis',
#         'cost': [{
#             'value': 7000,
#             'etd': '2-3',
#             'note': ''
#         }]
#     }, {
#         'service': 'REG',
#         'description': 'Layanan Reguler',
#         'cost': [{
#             'value': 8000,
#             'etd': '1-2',
#             'note': ''
#         }]
#     }]
# }]