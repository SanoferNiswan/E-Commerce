# store/models.py
from django.db import models
 
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=255, null=False)
    created_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'categories'  #  mysql table name

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=500, null=False)  # Increased length
    product_description = models.TextField(null=True)  # For product descriptions
    tags = models.CharField(max_length=255, null=True)  # For product tags
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_column='category_id')
    image_url = models.CharField(max_length=255, null=True)
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2)
    product_count = models.IntegerField()

    class Meta:
        db_table = 'products'  # mysql table name
