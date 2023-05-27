import requests

password = 3994
url = 'http://192.168.0.150:5500/api/v1/parking_spaces'
response = requests.get(url)

if response.status_code == 200:
    users = response.json()
    # print(users)
else:
    print('Error:', response.status_code)


def getDataByPassword(password):
    for user in users:
        if user['password'] == password:
            return user
    return None

print(getDataByPassword(password))