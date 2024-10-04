# store/serializers.py--->convert to json format 
from rest_framework import serializers
from .models import Category, Product
 
class CategorySerializer(serializers.ModelSerializer):
    class Meta: #configuration
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # This will include all fields, including new ones
