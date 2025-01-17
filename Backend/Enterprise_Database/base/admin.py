from django.contrib import admin
from .models import Client,Employee,Department,Project,Task
# Register your models here.

admin.site.register(Client)
admin.site.register(Employee)
admin.site.register(Department)
admin.site.register(Project)
admin.site.register(Task)