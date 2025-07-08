from django.contrib import admin
from .models import Client,Department,Project,Task,totp,Profile
# Register your models here.

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'contact_no')
    search_fields = ('name', 'email', 'contact_no')  # 🔍 Enables search box
admin.site.register(Profile)
# admin.site.register(Employee)
admin.site.register(Department)
admin.site.register(Project)
admin.site.register(Task)
admin.site.register(totp)