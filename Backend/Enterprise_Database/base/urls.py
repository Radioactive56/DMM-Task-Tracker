from django.urls import path
from .views import check,project_name,status_name
urlpatterns=[
    path('query/',check),
    path('pname',project_name),
    path('status/<str:name>',status_name)
]