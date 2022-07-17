from backend.workmode import database

def read_db(self, filename):
    headers = {'content-type': 'application/json'}
    responses = requests.get(database, headers = headers)
    response_json = = responses.json()
    print(response_json)