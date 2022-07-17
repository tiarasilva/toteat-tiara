from django.db import models

class Order(models.Model):
    id = models.CharField(primary_key=True, max_length=2000)
    date_opened = models.DateTimeField()
    date_closed = models.DateTimeField()
    zone = models.CharField(max_length=100)
    waiter = models.CharField(max_length=100)
    cashier = models.CharField(max_length=100)
    #products = Product(many=True)
    diners = models.IntegerField(default=0)
    table = models.IntegerField(default=0)
    total = models.IntegerField(default=0)
    #payments = Payment(many=True)

class Product(models.Model):
    category = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(default=0)
    id_order = models.ForeignKey(Order, on_delete=models.CASCADE)

class Payment(models.Model):
    amount = models.IntegerField(default=0)
    type_payment = models.CharField(max_length=50) # efectivo o Tarjeta cr\u00e9dito, pueden ser varios {}, {}, {}
    id_order = models.ForeignKey(Order, on_delete=models.CASCADE)