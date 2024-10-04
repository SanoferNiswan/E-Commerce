# store/admin.py

from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_id', 'category_name', 'created_time')  # Display category details
    search_fields = ('category_name',)  # Search by category name
    list_filter = ('created_time',)  # Filter by creation time

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_id', 'product_name', 'category', 'mrp', 'discounted_price', 'product_count')  # Display product details
    search_fields = ('product_name', 'tags', 'category__category_name')  # Search by product name, tags, or category
    list_filter = ('category', 'mrp')  # Filter by category and MRP
