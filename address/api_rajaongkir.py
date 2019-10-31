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
