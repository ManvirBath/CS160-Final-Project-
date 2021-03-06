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
import debug_toolbar
from django.conf import settings
from django.urls import include, path
from django.conf.urls import url
from django.contrib import admin
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from test import views
from test.views import automated_bill

router = routers.DefaultRouter()
router.register(r'api/clients', views.ClientViewSet)
router.register(r'api/accounts', views.AccountViewSet)
router.register(r'api/transactions', views.TransactionViewSet)
router.register(r'api/bill_payments', views.BillPaymentViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/staffbreakingbass/', admin.site.urls), # keep admin secret.
    path('', include(router.urls)),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.register),
    path('api/reset_password/', views.reset_password),
    path('api/all_accounts/', views.all_accounts),
    path('api/all_clients/', views.all_clients),
    path('api/performance_test_regular/', views.performance_test_regular),
    path('api/performance_test_selected/', views.performance_test_selected),
    path('api/bank_statistics/', views.bank_statistics),
    path('api/client_account_statistics/', views.client_account_statistics),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('__debug__/', include(debug_toolbar.urls)),
]

automated_bill()
# automated_bill(repeat=10, repeat_until=None)
# from django.contrib import admin
# from django.urls import path
# from django.urls import include
# from test import views

# urlpatterns = [
#     path('staffbreakingbass/', admin.site.urls), # keep admin secret.
#     path('', views.home, name="home"),
#     path('accounts/', include('django.contrib.auth.urls')),
# ]
