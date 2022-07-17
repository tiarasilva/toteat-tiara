from django.contrib import admin

# Register your models here.
from .models import Order, Product, Payment

try: 
    admin.site.register(Order)
    admin.site.register(Product)
    admin.site.register(Payment)
except admin.sites.AlreadyRegistered:
    pass