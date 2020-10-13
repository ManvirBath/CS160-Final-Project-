"""back_end URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from test import views

router = routers.DefaultRouter()
router.register(r'clients', views.ClientViewSet)
router.register(r'accounts', views.AccountViewSet)
router.register(r'transactions', views.TransactionViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('staffbreakingbass/', admin.site.urls), # keep admin secret. 
    path('', include(router.urls)),
    path('register/', views.register),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

# from django.contrib import admin
# from django.urls import path
# from django.urls import include
# from test import views

# urlpatterns = [
#     path('staffbreakingbass/', admin.site.urls), # keep admin secret. 
#     path('', views.home, name="home"),
#     path('accounts/', include('django.contrib.auth.urls')),
# ]
