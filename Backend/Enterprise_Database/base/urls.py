from django.urls import path
from .views import fetch_projects,generate_captcha,validate,fetch_project_from_client,check,project_type,status_name,get_client_name,get_department_name,get_Employee_data,add_Project,login
urlpatterns=[
    path('query',check),
    path('ptype',project_type),
    path('status/<str:name>',status_name),
    path('cname',get_client_name),
    path('dname',get_department_name),
    path('ename',get_Employee_data),
    path('newp',add_Project),
    path('login',login),
    path('get_project/<int:id>/',fetch_project_from_client),
    path('validate/',validate),
    path('get_project/',fetch_projects),
    path('generate-captcha/',generate_captcha),
]