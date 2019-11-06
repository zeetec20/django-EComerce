import http.client
import json

api_key = '1a5b8aa3d26f5de3986fe987cf40314e'
conn = http.client.HTTPSConnection("api.rajaongkir.com")

def getCity(nama):
    headers = { 'key': api_key }
    conn.request("GET", "/starter/city", headers=headers)  
    res = conn.getresponse()
    data = res.read()
    data_json = json.loads(data.decode("utf-8"))
    result = data_json['rajaongkir']['results']
    for city in result:
        if city['city_name'] == nama:
            city_id = city['city_id']
            return city_id

def cekTarif(asal, tujuan, berat, ekspedisi):
    origin      = getCity(asal)
    destination = getCity(tujuan)
    weight      = berat
    courier     = ekspedisi
    payload = "origin=" + origin + "&destination=" + destination + "&weight=" + weight + "&courier=" + courier
    headers = {
        'key': "1a5b8aa3d26f5de3986fe987cf40314e",
        'content-type': "application/x-www-form-urlencoded"
    }

    conn.request("POST", "/starter/cost", str(payload), headers)
    res = conn.getresponse()
    data = res.read()
    data_json = json.loads(data.decode('utf-8'))
    return data_json['rajaongkir']['results']

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