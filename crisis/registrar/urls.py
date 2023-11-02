from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.custom_login, name='login'),
    path('home/', views.home, name='home'),
    path('getResponse/',views.getResponse,name='getResponse'),
    path('predict/quake',views.quake_predict,name='quakepredict'),
    path('predict/flood',views.getResponse,name='floodpredict'),
    
]
