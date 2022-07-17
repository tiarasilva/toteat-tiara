from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:order_id>/', views.results_by_order, name='results_by_order'),
    path('viewdb', views.dbOrder.as_view(), name='probando'),
    path('all_categories', views.Stadistics.as_view(), name='products_by_category'),
    path('all_payments', views.Payments.as_view(), name='types_payments'),
]