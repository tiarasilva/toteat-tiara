from django.http import HttpResponse
from backend.vars import database
from django.views import View
from django.http import JsonResponse
import requests

def index(request):
  return HttpResponse("Hello, world. You're at the polls index.")

def results_by_order(request, order_id):
  response = "The statistics for the order: %s are ___"
  return HttpResponse(response % order_id)

class dbOrder(View):
  def get(self, request):
    headers = {'content-type': 'application/json'}
    responses = requests.get(database, headers=headers)
    response  = JsonResponse(responses.json(), safe=False, status=200)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

class Stadistics(View):
  def get(self, request):
    headers = {'content-type': 'application/json'}
    responses = requests.get(database, headers=headers)
    response = responses.json()
    # { 'category': {'sales': '1000', 'producto1': {'sales': 1, 'price': 1200 }, 'producto2': {'sales': 3, 'price': 890 }}}
    all_categories = {}

    for item in response:
      for product in item['products']:
        category = str(product['category'])
        if category in all_categories:
          if product['name'] in all_categories[category]:
            all_categories[category]['sales'] += product['quantity']
            all_categories[category][product['name'] ]['sales'] += product['quantity']
          else:
            all_categories[category]['sales'] += product['quantity']
            all_categories[category][product['name'] ] = {"sales": product['quantity'], "price": product['price']}

        else:
          all_categories[category] = {}
          all_categories[category]['sales'] = product['quantity']
          all_categories[category][product['name']] = {"sales": product['quantity'], "price": product['price']}

    # all_categories = {key: dict(sorted(val['sales'], key = lambda x: (x[1]) )) for key, val in all_categories.items()}

    response  = JsonResponse(all_categories, safe=False, status=200)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

class Payments(View):
  def get(self, request):
    headers = {'content-type': 'application/json'}
    responses = requests.get(database, headers=headers)
    response = responses.json()
    # "payments": [{"amount": 16913, "type": "Tarjeta cr\u00e9dito"}, {"amount": 35578, "type": "Efectivo"}, {"amount": 101259, "type": "Tarjeta d\u00e9bito"}]
    all_payments = {"Tarjeta credito": 0, 
                    "Tarjeta debito": 0,
                    "Efectivo": 0,
                    "Todos": 0,
                    "Credito & Debito": 0,
                    "Credito & Efectivo": 0,
                    "Debito & Efectivo": 0,
                    } 

    for item in response:
      TC = 0
      TD = 0
      E = 0
      for payment in item['payments']:
        if payment['type'] == 'Tarjeta crédito':
          TC += 1
        elif payment['type'] == "Efectivo":
          E += 1
        elif payment['type'] == "Tarjeta débito":
          TD += 1

      if TC & E & TD > 0:
        all_payments['Todos'] += 1
      elif TC & E > 0:
        all_payments["Credito & Efectivo"] += 1
      elif TD & E > 0:
        all_payments["Debito & Efectivo"] += 1
      elif TC & TD > 0:
        all_payments["Credito & Debito"] += 1
      elif E > 0:
        all_payments["Efectivo"] += 1
      elif TC > 0:
        all_payments["Tarjeta credito"] += 1
      elif TD > 0:
        all_payments["Tarjeta debito"] += 1
    
    chart = [{'title': "Tarjeta crédito", 'value': all_payments["Tarjeta credito"], 'color': '#9C5172'},
            {'title': "Tarjeta débito", 'value': all_payments["Tarjeta debito"], 'color': '#B69BF5'},
            {'title': "Efectivo", 'value': all_payments["Efectivo"], 'color': '#84A859'},
            {'title':  "Todos", 'value': all_payments["Todos"], 'color': '#C6F58E'},
            {'title': "Crédito & Débito", 'value': all_payments["Credito & Debito"], 'color': '#F5DFA6'},
            {'title': "Crédito & Efectivo", 'value': all_payments["Credito & Efectivo"], 'color': '#A89C7B'},
            {'title': "Tarjeta crédito", 'value': all_payments["Tarjeta credito"], 'color': '#A76C35'},
          ] 

    response  = JsonResponse(chart, safe=False, status=200)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response