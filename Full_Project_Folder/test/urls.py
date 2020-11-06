from django.urls import path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    # url(r'', views.background_view, name="background_view"),
    path('api/register/', views.register),
    path('api/reset_password/', views.reset_password),
    path('api/all_accounts/', views.all_accounts),
]

urlpatterns = format_suffix_patterns(urlpatterns)
