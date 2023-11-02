# accounts/views.py
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from Predictions.new import quake_predict
from Predictions.flood import flood_predict

from .chat import get_response

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Log the user in after registration
            login(request, user)
            return redirect('home')  # Redirect to the home page or any desired URL
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

def custom_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('username')  # Username field is used for email
            password = form.cleaned_data.get('password')
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # Redirect to the home page or any desired URL
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

@csrf_exempt
def getResponse(request):
    userMessage = request.GET.get('IPMessage')
    chat_ans = str(get_response(str(userMessage)))
    message = {
        'message':chat_ans
    }
    print(message)
    return JsonResponse(message)

@csrf_exempt
def quakePredict(request):
    latitude = request.GET.get('latitude')
    longitude = request.GET.get('longitude')
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


def health(request):
    return render(request,'healthcare.html')

def manual(request):
    return render(request,'manual.html')

def home(request):
    return render(request,'home.html')