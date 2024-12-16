from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.cache import cache
from .models import Project,Client,Employee,Department
from .serializers import Project_serializer,Client_serializer,Employee_serializer,Department_serializer
from datetime import date
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from datetime import timedelta
from django.utils import timezone
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from captcha.image import ImageCaptcha
from io import BytesIO
import random
import string
 
# Create your views here.


@api_view(['GET'])
def validate(request):
    return Response({'message':'token is valid'},status=status.HTTP_200_OK)

# Generate Captcha
def generate_captcha(request):
    captcha_text = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    print(captcha_text)
    cache.set('captcha_code', captcha_text, timeout=300)  # Store in cache for 5 minutes
    image = ImageCaptcha()
    data = BytesIO()
    image.write(captcha_text, data)
    data.seek(0)
    return HttpResponse(data, content_type="image/png")
 

@api_view(['POST'])
def login(request):
    data = json.loads(request.body)
    username=data.get('username')
    password=data.get('password')
    user_captcha = data.get('captcha')

    server_captcha = cache.get('captcha_code')
    if not server_captcha or user_captcha != server_captcha:
        return Response({"message": "Invalid captcha!"},status = status.HTTP_400_BAD_REQUEST)
 
    user = authenticate(username=username,password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response({'Token':access_token},status= status.HTTP_200_OK)
        return Response(token.key,status=status.HTTP_200_OK)
    else:
        return Response({'message':"Invalid Credentials"},status=status.HTTP_400_BAD_REQUEST)

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def check(request):
    s_date = date(2024,11,12)
    data = Project.objects.filter(start_date__lt=s_date) # for exact date use = ,for before __lt, for after __gt , on and before __lte similarly __gte for month start_date__month=11, for year start_date__year=2023
    serializer = Project_serializer(data,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def project_type(request):
    data = [i[1] for i in Project.project_type_choices]
    return Response(data,status=status.HTTP_200_OK)

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def status_name(request,name):
    data = Project.project_status_choices.get(name,[])
    f = [i[1] for i in data]
    return Response(f,status=status.HTTP_200_OK)

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_client_name(request):
    data = Client.objects.all()
    serializer=Client_serializer(data,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_department_name(request):
    data = Department.objects.all()
    serializer=Department_serializer(data,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_Employee_data(request):
    data = Employee.objects.all()
    serializer=Employee_serializer(data,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

# @permission_classes([IsAuthenticated])
@csrf_exempt
@api_view(['POST'])
def add_Project(request):
    print(request.data)
    serializer = Project_serializer(data=request.data)
    if serializer.is_valid():
        print('data is valid')
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        print('data invalid')
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def fetch_project_from_client(request,id):

    data = Project.objects.filter(Client__id=id)
    print(data)
    if data:
        serializer= Project_serializer(data,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        return Response({'message':'No project or client found'},status=status.HTTP_404_NOT_FOUND)