import requests

URL = 'http://172.20.10.3:5500/api/v1/parking_spaces'

def update_api_request(api_url, is_empty, id):
    update = {
        'isEmpty': is_empty
    }

    req = f'{api_url}/{id}'
    print(req)

    response = requests.put(req, json=update)

    if response.status_code == 200:
        print('Success.')
    else:
        print('Failed:', response.status_code)


update_api_request(URL, is_empty=True, id=3)
#update is_emtpy with status of emptiness of parking space at id=3