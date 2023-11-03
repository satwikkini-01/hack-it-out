# accounts/views.py
from django.contrib.auth import login, authenticate
from django.contrib.auth import logout
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from registrar.models import CustomUser
from django.contrib import messages
import traceback 
from Predictions.new import quake_predict
# from Predictions.flood import flood_predict

from .chat import get_response

def register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        firstname = request.POST.get('fname')
        lastname = request.POST.get('lname')
            
        try:
            user = CustomUser.objects.create_user(email=email, password=password, first_name=firstname, last_name=lastname)
            login(request, user)
            return redirect('home')
        except Exception as e:
            print("Error creating account:", e)
            return render(request, 'registration/register.html')
    return render(request, 'registration/register.html')

# def custom_login(request):
#     if request.method == 'POST':
#         form = AuthenticationForm(request, data=request.POST)
#         if form.is_valid():
#             email = form.cleaned_data.get('username')  # Username field is used for email
#             password = form.cleaned_data.get('password')
#             user = authenticate(request, email=email, password=password)
#             if user is not None:
#                 login(request, user)
#                 return redirect('home')  # Redirect to the home page or any desired URL
#     else:
#         form = AuthenticationForm()
#     return render(request, 'registration/login.html', {'form': form})

def custom_login(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return redirect('home') 
        else:
            messages.error(request, 'Invalid email or password.')
            return render(request, 'auth/login.html', status=401)
            
    return render(request, 'registration/login.html')

def logout_view(request):
    logout(request)
    return redirect('home') 

class Chatbot(APIView):
    def get(self,request):
        userMessage = request.GET.get('IPmessage')
        chat_ans = str(get_response(str(userMessage)))
        message = {
            'message':chat_ans
        }
        print(message)
        return JsonResponse(message)

class Earthquake(APIView):
    def get(self,request):
        latitude = float(request.GET.get('latitude'))
        longitude = float(request.GET.get('longitude'))
        response = quake_predict(latitude,longitude)
        message = {
            'message':response
        }
        print(message)
        return JsonResponse(message)

@csrf_exempt
def floodPredict(request):
    latitude = request.GET.get('latitude')
    longitude = request.GET.get('longitude')
    response = flood_predict(latitude,longitude)
    message = {
        'message':response
    }
    print(message)
    return JsonResponse(message)

def home(request):
    return render(request,'home.html')

def predictions(request):
    return render(request,'predictions.html')

def flood_predict(request):
    return render(request,'flood.html')

def alerts(request):
    return render(request, 'alerts.html')

def health(request):
    return render(request,'healthcare.html')

def manual(request):
    return render(request,'manual.html')

def home(request):
    return render(request,'home.html')
