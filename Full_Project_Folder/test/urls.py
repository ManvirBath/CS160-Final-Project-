from django.urls import path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'', views.background_view, name="background_view"),
    path('register/', views.register),
    path('reset_password/', views.reset_password),
    # path('background_view/', views.automated_bill)
]

urlpatterns = format_suffix_patterns(urlpatterns)
