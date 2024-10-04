# store/views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from django.http import JsonResponse
from rest_framework.views import APIView
from .solr_client import solr_search
import re

class ProductSearchView(APIView):
    def get(self, request):
        query = request.GET.get('query', '')  # Get the search query from request

        # Initialize price range variables
        price_range = {
            'min': None,
            'max': None
        }

        # Dictionary to map different words to 'under' and 'above'
        price_filters = {
            'under': 'max',
            'below': 'max',
            'max': 'max',
            'above': 'min',
            'over': 'min',
            'min': 'min'
        }

        # First, handle "between X and Y" or "within X and Y" cases for price ranges
        between_within_patterns = [
            r'between\s*(\d+)\s*and\s*(\d+)',  # "between X and Y"
            r'within\s*(\d+)\s*and\s*(\d+)'    # "within X and Y"
        ]
        
        for pattern in between_within_patterns:
            match = re.search(pattern, query)
            if match:
                price_range['min'] = float(match.group(1))
                price_range['max'] = float(match.group(2))
                query = query.replace(match.group(0), '').strip()  # Remove the price range part from query

        # Process individual price filters like "under", "above", etc.
        for term, price_type in price_filters.items():
            if term in query:
                match = re.search(rf'{term}\s*(\d+)', query)
                if match:
                    price_value = float(match.group(1))
                    price_range[price_type] = price_value
                    query = query.replace(match.group(0), '').strip()  # Remove price filter from query

        # Perform the exact match search
        exact_results = solr_search(query, price_range)

        # Perform partial keyword search even if exact matches are found
        keywords = query.split()  # Split the query into individual keywords
        partial_results = []
        
        for keyword in keywords:
            partial_results.extend(solr_search(keyword, price_range))

        # Remove duplicates by combining exact and partial results
        combined_results = {result['product_id'][0]: result for result in exact_results + partial_results}.values()

        return JsonResponse(list(combined_results), safe=False)  # Return combined results as JSON
    
class CategoryListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def delete(self, request, *args, **kwargs):
        category = self.get_object()
        Product.objects.filter(category=category).delete()
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProductListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductByCategory(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        try:
            category = Category.objects.get(category_id=category_id)
            return Product.objects.filter(category=category)
        except Category.DoesNotExist:
            raise NotFound(detail="Category not found.")


