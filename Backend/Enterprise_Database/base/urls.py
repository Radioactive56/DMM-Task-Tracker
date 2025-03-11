from django.urls import path
from .views import read_excel,update_client,get_client_by_id,addClient,add_tasks_for_project_id,fetch_all_tasks_by_project_id,send_email,update_projects,fetch_project_by_id,fetch_projects,generate_captcha,validate,fetch_project_from_client,check,project_type,status_name,get_client_name,get_department_name,get_Employee_data,add_Project,login
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
    path('project/<int:id>/',fetch_project_by_id),
    path('update_project/<int:id>/',update_projects),
    path('email/',send_email),
    path('tasks/<int:id>/',fetch_all_tasks_by_project_id),
    path('addtask/<int:id>/',add_tasks_for_project_id),
    path('addClient/',addClient),
    path('getClient/<int:id>/',get_client_by_id),
    path('updateClient/<int:id>/',update_client),
    path('read/',read_excel),
    # path('error/',error)
]
