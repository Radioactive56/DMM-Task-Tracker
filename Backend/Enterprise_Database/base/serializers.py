from rest_framework import serializers
from .models import Project,Client,Department,Employee

class Projects_serializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
    # def validate_status(self,value):
    #     valid_choices = [i for i in Project.project_status_choices.values()]
    #     if value not in valid_choices:
    #         raise serializers.ValidationError(f"{value} is not a valid category....")
    #     return value
    end_date = serializers.DateField(allow_null=True,required=False)
    def to_internal_value(self,data):
        if data.get('end_date') == '':
            data['end_date']=None
        return super().to_internal_value(data)

class Project_serializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='Client.name',read_only=True)
    employee_name = serializers.CharField(source='Employee.name',read_only=True)
    department_name = serializers.CharField(source='Department.name',read_only=True)
    class Meta:
        model = Project
        fields = ['id','client_name','employee_name','department_name','name','type','status','start_date','end_date','mode_of_payment','status_description','project_completed','Document_endpath']
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
