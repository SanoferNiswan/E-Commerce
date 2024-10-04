# store/urls.py
from django.urls import path
from .views import CategoryListCreate, CategoryDetail, ProductListCreate, ProductDetail, ProductByCategory,ProductSearchView
 
urlpatterns = [
    path('categories/', CategoryListCreate.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('products/', ProductListCreate.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('products/category/<int:category_id>/', ProductByCategory.as_view(), name='products-by-category'),
    path('search/', ProductSearchView.as_view(), name='product-search'),
]


