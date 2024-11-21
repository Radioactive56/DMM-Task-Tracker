from django.db import models
# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=128,unique=True)

    def __str__(self):
        return self.name
    
class Client(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=128)
    phone_number=models.CharField(max_length=15)
    email=models.EmailField()

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
        ('GSTR1','GSTR1')
    ]
    # query can be wriiten wrt to first column in below () i.e data_collection,data_recieved ...and so on
    project_status_choices={
        'Advance Tax' :[
        ('1','Data Collection'),
        ('2','Data Recieved'),
        ('3','Data Process / Working'),
        ('4','Approval From Sir'),
        ('5','Approval From Client'),
        ('6','Challan Sent'),
        ('7','Challan Paid')
    ],
    'GSTR1':[
        ('1','Follow Up'),
        ('2','Data Recieved'),
        ('3','Working / Process'),
        ('4','Query Sent To Client'),
        ('5','Answer Recieved From Client'),
        ('6','Checking By HOD'),
        ('7','Uploading')
    ]
    }
    name = models.CharField(max_length=128)
    type = models.CharField(max_length=128,choices=project_type_choices)
    Department=models.ForeignKey(Department,on_delete=models.RESTRICT)
    Client=models.ForeignKey(Client,on_delete=models.RESTRICT)
    Employee=models.ForeignKey(Employee,on_delete=models.RESTRICT)
    status=models.CharField(max_length=128)
    start_date=models.DateField(blank=True,null=True)
    end_date = models.DateField(null=True,blank=True)
    mode_of_payment=models.CharField(max_length=128,blank=True,null=True)
    status_description=models.TextField(blank=True,null=True)
    project_completed=models.BooleanField(default=False)
    Document_endpath=models.CharField(max_length=128,blank=True,null=True)

    def __str__(self):
        return self.name
