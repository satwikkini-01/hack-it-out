"""
URL configuration for crisis project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path,include

from registrar.views import predictions,home,flood_predict,health,manual,alerts

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('registrar.urls')),
    path('predictions/earthquake',predictions,name='earthquake_prediction'),
    path('predictions/floods',flood_predict,name="flood_prediction"),
    path('',home),
    path('healthcare/', health, name='health'),
    path('manual/', manual, name='manual'),
    path('alerts/', alerts, name='alerts'),

]
