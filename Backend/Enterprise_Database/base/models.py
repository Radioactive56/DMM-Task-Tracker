from django.db import models
from django.contrib.auth.models import User,Permission
# import pyotp
# from .models import totp

# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=128,unique=True)

    def __str__(self):
        return self.name
    
class Client(models.Model):
    id=models.AutoField(primary_key=True)
    active = models.BooleanField(default=True)
    name = models.CharField(max_length=128)
    group = models.CharField(max_length=128,blank=True,null=True)
    pan = models.CharField(max_length=128,blank=True,null=True)
    gstin = models.CharField(max_length=128,blank=True,null=True)
    tan = models.CharField(max_length=128,blank=True,null=True)
    ptrc = models.CharField(max_length=128,blank=True,null=True)
    ptec = models.CharField(max_length=128,blank=True,null=True)
    contact_no = models.CharField(max_length=10,blank=True,null=True)
    email = models.CharField(max_length=128,blank=True,null=True)
    poc = models.CharField(max_length =128,blank=True,null=True)

    def __str__(self):
        return self.name

class Project(models.Model):
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
    # query can be wriiten wrt to first column in below () i.e data_collection,data_recieved ...and so on
    name = models.CharField(max_length=128)
    type = models.CharField(max_length=128,choices=project_type_choices)
    Department=models.ForeignKey(Department,on_delete=models.SET_NULL, null=True, blank=True)
    Client=models.ForeignKey(Client,on_delete=models.SET_NULL, null=True, blank=True)
    Users = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True)
    start_date=models.DateField(blank=True,null=True)
    end_date = models.DateField(null=True,blank=True)
    mode_of_payment=models.CharField(max_length=128,blank=True,null=True)
    status_description=models.TextField(blank=True,null=True)
    project_completed=models.CharField(max_length=128,choices=project_completed_choices,default='Not Completed')
    Document_endpath=models.CharField(max_length=128,blank=True,null=True)

    def __int__(self):
        return self.id

class Task(models.Model):
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
    id = models.BigAutoField(primary_key=True)
    Project=models.ForeignKey(Project,on_delete=models.SET_NULL, null=True, blank=True) 
    task_status = models.CharField(max_length=126,choices=project_status_choices,blank=True,null=True)
    custom_status = models.CharField(max_length=128,blank=True,null=True)
    task_date = models.DateField()

    def __int__(self):
        return self.id
    
class totp(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    secret = models.CharField(max_length=32)
