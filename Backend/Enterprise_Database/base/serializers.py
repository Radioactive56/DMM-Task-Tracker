from rest_framework import serializers
from .models import Project

class Project_serializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'