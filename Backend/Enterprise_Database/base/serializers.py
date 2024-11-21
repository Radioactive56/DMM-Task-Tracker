from rest_framework import serializers
from .models import Project,Client,Department,Employee

class Project_serializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
    end_date = serializers.DateField(allow_null=True,required=False)
    def to_internal_value(self,data):
        if data.get('end_date') == '':
            data['end_date']=None
        return super().to_internal_value(data)
    
class Client_serializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields='__all__'

class Employee_serializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields='__all__'

class Department_serializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields='__all__'
