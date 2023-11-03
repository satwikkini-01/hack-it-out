from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.custom_login, name='login'),
    path('home/', views.home, name='home'),
    path('getResponse/',views.Chatbot.as_view(),name='getResponse'),
    path('logout/', views.logout_view, name='logout'),
    path('predict/quake',views.Earthquake.as_view(),name='quakepredict'),
    path('predict/flood',views.Flood.as_view(),name='floodpredict'),
    path('getuser/',views.get_all_user.as_view(),name='backend-notifier'),
    path('onNotify/',views.notify.as_view(),name='backend-notified'),
    path('subscribe/',views.startNotify.as_view(),name='backend-subscribe'),
]
