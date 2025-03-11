from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd
from django.core.cache import cache
from .models import Project,Client,Employee,Department,Task
from .serializers import Projects_serializer,Project_serializer,Client_serializer,Employee_serializer,Department_serializer,Task_Serializer
from datetime import date
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from datetime import timedelta
from django.utils import timezone
from django.http import HttpResponse

from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache

from django.http import JsonResponse
from captcha.image import ImageCaptcha
from io import BytesIO
import random
import string
from django.core.mail import EmailMessage
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def validate(request):
    return Response({'message':'token is valid'},status=status.HTTP_200_OK)

# Generate Captcha
def generate_captcha(request):
    captcha_text = ''.join(random.choices(string.digits, k=6))
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
    else:
        return Response({'message':"Invalid Credentials"},status=status.HTTP_403_FORBIDDEN)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def check(request):
    s_date = date(2024,11,12)
    data = Project.objects.filter(start_date__lt=s_date) # for exact date use = ,for before __lt, for after __gt , on and before __lte similarly __gte for month start_date__month=11, for year start_date__year=2023
    serializer = Project_serializer(data,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def project_type(request):
    data = [i[1] for i in Project.project_type_choices]
    return Response(data,status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def status_name(request,name):
    data = Task.project_status_choices.get(name,[])
    f = [i[1] for i in data]
    return Response(f,status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_client_name(request):
    data = Client.objects.all()
    serializer=Client_serializer(data,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_department_name(request):
    data = Department.objects.all()
    serializer=Department_serializer(data,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_Employee_data(request):
    data = Employee.objects.all()
    serializer=Employee_serializer(data,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
@csrf_exempt
@api_view(['POST'])
def add_Project(request):
    print(request.data)
    serializer = Projects_serializer(data=request.data)
    if serializer.is_valid():
        print('data is valid')
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        print('data invalid')
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def fetch_project_from_client(request,id):

    data = Project.objects.filter(Client__id=id)
    print(data)
    if data:
        serializer= Project_serializer(data,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        return Response({'message':'No project or client found'},status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_projects(request):
    data = Project.objects.all()
    serialized_data = Project_serializer(data,many=True)
    return Response(serialized_data.data,status = status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def fetch_project_by_id(request,id):
    data = Project.objects.get(id=id)
    serialized_data = Projects_serializer(data)
    return Response(serialized_data.data,status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_projects(request,id):
    item = Project.objects.get(id = id)
    print(item)
    updated_data = Projects_serializer(instance=item,data=request.data)
    if updated_data.is_valid():
        updated_data.save()
        return Response('Data saved Successfully......',status = status.HTTP_200_OK)
    else:
        return Response('Error in saving the form data.....',status = status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def send_email(request):
    # data = json.loads(request.body) this only works if the body is a json string and not formdata
    # if it is formdata you have to use the below code....
    from_email=request.POST.get('from_email')
    email_reciever = request.POST.get('email_reciever')
    emails=json.loads(email_reciever)
    body = request.POST.get('body')
    subject=request.POST.get('subject')
    files = request.FILES.getlist('attachment')


    from_email='neoemailtest12@gmail.com'
    email = EmailMessage(subject,body,from_email,[],emails)

    if files != []:
        for file in files:
            email.attach(file.name,file.read(),file.content_type)
    
    try:
        email.send()
        return Response('Email Sent Successfully...',status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'message':str(e)},status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def fetch_all_tasks_by_project_id(request,id):
    data = Task.objects.filter(Project__id=id)
    serialized_data = Task_Serializer(data,many=True)
    print(serialized_data.data)
    return Response(serialized_data.data,status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_tasks_for_project_id(request,id):
    data = json.loads(request.body)
    print(data)
    data['Project'] = id
    print(data)

    new_data = Task_Serializer(data=data)
    if new_data.is_valid():
        new_data.save()
        return Response('Data saved successfully',status=status.HTTP_200_OK)
    else:
        return Response('Error in saving data.....',status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addClient(request):
    serializer = Client_serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status = status.HTTP_200_OK)
    else:
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)


# @api_view(['GET'])
# def read_excel(request):
#     df = pd.read_excel('Final GST List-1.xlsx')
#     print(len(df))

#     for x, y in df.iterrows():
#         Client.objects.create(
#             name = y['Client Name'],
#             group = y['Client Group'],
#             pan = y['PAN'],
#             gstin = y['GSTIN'],
#             tan = y['TAN'],
#             ptrc = y['PTRC'],
#             ptec= y['PTEC'],
#             contact_no = y['Ph. No'],
#             email = y['Email'],
#             poc=y['Point of Contact']
#         )


# def error(request):
#     c=0
#     data = Client.objects.all()
#     for i in data:
#         if len(i.contact_no)>10:
#             i.contact_no = i.contact_no[:-2]
#             i.save()
#             c+=1
#             print(f'edited {i.name}')
#     print(f'done edited total of {c}') 


def read_excel(request):
    data  = pd.read_excel('Final GST List-1.xlsx')
    print(data[:2][:2])
    