from django.db import models
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
    pan = models.CharField(max_length=128,blank=True,null=True,unique=True)
    gstin = models.CharField(max_length=128,blank=True,null=True)
    tan = models.CharField(max_length=128,blank=True,null=True)
    ptrc = models.CharField(max_length=128,blank=True,null=True)
    ptec = models.CharField(max_length=128,blank=True,null=True)
    contact_no = models.CharField(max_length=10,blank=True,null=True)
    email = models.CharField(max_length=128,blank=True,null=True)
    poc = models.CharField(max_length =128,blank=True,null=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    position_choices=[
        ('manager','Manager'),
        ('employee','Employee')
    ]
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=128)
    status=models.CharField(max_length=100,choices=position_choices)

    def __str__(self):
        return self.name

class Project(models.Model):
    project_type_choices=[
        ('Advance Tax','Advance Tax'),
        ('GSTR1','GSTR1'),
        ('GSTR3B','GSTR3B')
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
    Employee=models.ForeignKey(Employee,on_delete=models.SET_NULL, null=True, blank=True)
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
    ]
    }
    id = models.BigAutoField(primary_key=True)
    Project=models.ForeignKey(Project,on_delete=models.SET_NULL, null=True, blank=True) 
    task_status = models.CharField(max_length=126,choices=project_status_choices)
    task_date = models.DateField()

    def __int__(self):
        return self.id