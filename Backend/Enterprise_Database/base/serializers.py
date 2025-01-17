from rest_framework import serializers
from .models import Project,Client,Department,Employee,Task

project_type_choices=[
        ('Advance Tax','Advance Tax'),
        ('GSTR1','GSTR1')
    ]
project_completed_choices=[
        ('Completed','Completed'),
        ('Not Completed','Not Completed')
]

class Projects_serializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
    
    def validate(self,data):
        project_type = data.get('type')
        type_choices = [i[0] for i in project_type_choices]
        if project_type not in type_choices:
            raise serializers.ValidationError(f" project_type is not a valid...")
        return data

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
        fields = ['id','client_name','employee_name','department_name','name','type','start_date','end_date','mode_of_payment','status_description','project_completed','Document_endpath']
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


project_status_choices={
        'Advance Tax' :[
        ('Data Collection','Data Collection'),
        ('Data Recieved','Data Recieved'),
        ('Data Process / Working','Data Process / Working'),
        ('Approval From Sir','Approval From Sir'),
        ('Approval From Client','Approval From Client'),
        ('Challan Sent','Challan Sent'),
        ('Challan Paid','Challan Paid')
    ],
    'GSTR1':[
        ('Follow Up','Follow Up'),
        ('Data Recieved','Data Recieved'),
        ('Working / Process','Working / Process'),
        ('Query Sent To Client','Query Sent To Client'),
        ('Answer Recieved From Client','Answer Recieved From Client'),
        ('Checking By HOD','Checking By HOD'),
        ('Uploading','Uploading')
    ]
}



class Task_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields='__all__'
    
    def validate(self,data):
        project_id = data.get('Project')
        status = data.get('task_status')

        if project_id:
            project_type = project_id.type
            
            if project_type =="Advance Tax":
                status_choices = project_status_choices.get('Advance Tax')
                status_choices_list = [i[0] for i in status_choices]
                if status not in status_choices_list:
                    raise serializers.ValidationError(f"Invalid status for Advance Tax......")
            
            elif project_type=="GSTR1":
                status_choices = project_status_choices.get('GSTR1')
                status_choices_list = [i[0] for i in status_choices]
                if status not in status_choices_list:
                    raise serializers.ValidationError(f"Invalid status for GSTR1......")
        
        return data

