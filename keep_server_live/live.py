import requests
import time 

api_url = 'https://dmm-server.onrender.com'
def keep_server_live():
    while True:
        try:
            data  = requests.get(api_url)
            print(data)
        except:
            print('Cant reach the server...')
        time.sleep(300)

if __name__ == '__main__':
    keep_server_live()

