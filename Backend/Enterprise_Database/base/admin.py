from django.contrib import admin
from .models import Client,Department,Project,Task,totp,Profile
# Register your models here.

admin.site.register(Client)
admin.site.register(Profile)
# admin.site.register(Employee)
admin.site.register(Department)
admin.site.register(Project)
admin.site.register(Task)
admin.site.register(totp)