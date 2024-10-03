# simulation/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('simulation/', views.SimulationView.as_view(), name='simulation'),
]