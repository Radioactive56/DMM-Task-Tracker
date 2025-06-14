from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project,Client,Department,Task

project_type_choices=[
        ('Advance Tax','Advance Tax'),
        ('GSTR1','GSTR1'),
        ('GSTR3B','GSTR3B'),
        ('Income Tax Return (Audit)','Income Tax Return (Audit)'),
        ('Income Tax Return (Non-Audit)','Income Tax Return (Non-Audit)'),
        ('TDS','TDS'),
        ('GSTR 2A/2B','GSTR 2A/2B'),
        ('LUT','LUT'),
        ('Registration','Registration'),
        ('Assessment','Assessment'),
        ('GST Refund','GST Refund'),
        ('Audit','Audit')
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

class Department_serializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields='__all__'



class Task_Serializer(serializers.ModelSerializer):

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
        ('Follow Up for Data','Follow Up for Data'),
        ('Data Recieved','Data Recieved'),
        ('Processing of Data','Processing of Data'),
        ('Query Sent To Client','Query Sent To Client'),
        ('Query Solve From Client','Query Sent From Client'),
        ('After solving of Query Tax Power Feeding ','After solving of Query Tax Power Feeding '),
        ('Checking Done By Head','Checking Done By Head'),
        ('Uploading','Uploading')
    ],
    'GSTR3B':[
        ('Download and Sent 2B Report','Download and Sent 2B Report'),
        ('Follow Up For Data','Follow Up For Data'),
        ('Data Recieved and Processing of Data','Data Recieved and Processing of Data'),
        ('Query Sent To Client & Query Solve From Client','Query Sent To Client & Query Solve From Client'),
        ('After Solving of Query Tax Power Feeding','After Solving of Query Tax Power Feeding'),
        ('Checking Done By Head','Checking Done By Head'),
        ('Challan Sent to Client & Follow Up for Payment','Challan Sent to Client & Follow Up for Payment'),
        ('Checking For Payment Status Whether Paid Or Not','Checking For Payment Status Whether Paid Or Not'),
        ('After Making Of Payment Submit the Return','After Making Of Payment Submit the Return'),
        ('Uploading','Uploading')
    ],
    "Income Tax Return (Audit)":[
        ("Getting Uploaded Copy of Audit Report","Getting Uploaded Copy of Audit Report"),
        ('Data collection of Personal of Prop .,/Partners etc','Data collection of Personal of Prop .,/Partners etc'),
        ('Queries Raised','Queries Raised'),
        ('Queries Solved','Queries Solved'),
        ('Data Entry in Software','Data Entry in Software'), 
        ('Client confirmation for SA ,Income etc','Client confirmation for SA ,Income etc'),
        ('Checking before Filing','Checking before Filing'),
        ('Uploaded','Uploaded'),
        ('Bill Preparation & Sending to Client','Bill Preparation & Sending to Client'),
        ('Completion Report to DMM','Completion Report to DMM'),
        ('Rectification Return , if any','Rectification Return , if any')
    ],
    "Income Tax Return (Non-Audit)":[
        ('Data Collection','Data Collection'),
        ('Data Process','Data Process'),
        ('Queries Raised','Queries Raised'),
        ('Queries Solved','Queries Solved'),
        ('Data Entry in Software','Data Entry in Software'), 
        ('Client confirmation for SA ,Income etc','Client confirmation for SA ,Income etc'),
        ('Checking before Filing','Checking before Filing'),
        ('Uploaded','Uploaded'),
        ('Bill Preparation & Sending to Client','Bill Preparation & Sending to Client'),
        ('Completion Report to DMM','Completion Report to DMM'),
        ('Rectification Return , if any','Rectification Return , if any')
    ],
    'TDS':[
        ('Data Collection','Data Collection'),
        ('Data Process','Data Process'),
        ('Queries Raised','Queries Raised'),
        ('Queries Solved','Queries Solved'),
        ('Data Entry in Software','Data Entry in Software'), 
        ('Challan Prepared & Given','Challan Prepared & Given'),
        ('Data Collection','Data Collection'),
        ('Data Process','Data Process'),
        ('Working Prepared','Working Prepared'),
        ('Queries Raised','Queries Raised'),
        ('Queries Solved','Queries Solved'),
        ('Paid Challan Received','Paid Challan Received'),
        ('Data Entry in Software','Data Entry in Software'),    
        ('Uploaded','Uploaded'),
        ('Completion Report to DMM','Completion Report to DMM'),
    ],
    'GSTR 2A/2B':[
        ('Data Collection','Data Collection'),
        ('Data Process','Data Process'),
        ('Queries Raised','Queries Raised'),
        ('Queries Solved','Queries Solved'),
        ('Data Entry in Software','Data Entry in Software'), 
        ('Client confirmation in case of 2B','Client confirmation in case of 2B'),
        ('Checking by HOD','Checking by HOD'),
        ('Uploaded','Uploaded'),
        ('Completion Report to DMM','Completion Report to DMM'),
        ('Amendments ,if any','Amendments ,if any')
    ]
    }

    class Meta:
        model = Task
        fields='__all__'
    
    def validate(self,data):
        project_id = data.get('Project')
        status = data.get('task_status')

        if project_id:
            project_type = project_id.type
            
            if project_type =="Advance Tax":
                status_choices = self.project_status_choices.get('Advance Tax')
                status_choices_list = [i[0] for i in status_choices]
                if status not in status_choices_list:
                    raise serializers.ValidationError(f"Invalid status for Advance Tax......")
            
            elif project_type=="GSTR1":
                status_choices = self.project_status_choices.get('GSTR1')
                status_choices_list = [i[0] for i in status_choices]
                if status not in status_choices_list:
                    raise serializers.ValidationError(f"Invalid status for GSTR1......")
                
            elif project_type=="GSTR3B":
                status_choices = self.project_status_choices.get('GSTR3B')
                status_choices_list_3 = [i[0] for i in status_choices]
                if status not in status_choices_list_3:
                    raise serializers.ValidationError(f"Invalid status for GSTR3B......")
            
            elif project_type=="Income Tax Return (Audit)":
                status_choices = self.project_status_choices.get('Income Tax Return (Audit)')
                status_choices_list_3 = [i[0] for i in status_choices]
                if status not in status_choices_list_3:
                    raise serializers.ValidationError(f"Invalid status for Income Tax Return (Audit)......")
            
            elif project_type=="Income Tax Return (Non-Audit)":
                status_choices = self.project_status_choices.get('Income Tax Return (Non-Audit)')
                status_choices_list_3 = [i[0] for i in status_choices]
                if status not in status_choices_list_3:
                    raise serializers.ValidationError(f"Invalid status for Income Tax Return (Non-Audit)......")
            
            elif project_type=="TDS":
                status_choices = self.project_status_choices.get('TDS')
                status_choices_list_3 = [i[0] for i in status_choices]
                if status not in status_choices_list_3:
                    raise serializers.ValidationError(f"Invalid status for TDS......")
            
            elif project_type=="GSTR 2A/2B":
                status_choices = self.project_status_choices.get('GSTR 2A/2B')
                status_choices_list_3 = [i[0] for i in status_choices]
                if status not in status_choices_list_3:
                    raise serializers.ValidationError(f"Invalid status for GSTR 2A/2B......")


        
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"