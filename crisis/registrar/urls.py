from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.custom_login, name='login'),
    path('home/', views.home, name='home'),
    path('getResponse/',views.Chatbot.as_view(),name='getResponse'),
    path('logout/', views.logout_view, name='logout'),
    path('predict/quake',views.Earthquake.as_view(),name='quakepredict'),
    # path('predict/flood',views.getResponse,name='floodpredict'),
    
]
