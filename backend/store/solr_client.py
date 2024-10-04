# store/solr_client.py
import pysolr
from django.conf import settings

solr = pysolr.Solr(settings.SOLR_URL, always_commit=True, timeout=10)

def solr_search(query, price_range=None):
    search_params = {
        'q': query,
        'defType': 'edismax',  # Advanced query parser for better matching
        'qf': 'product_name product_description tags',  # Fields to search
        'mm': '1<75%',  # Minimum should match
    }

    # Apply price filters if provided
    if price_range:
        filters = []
        if price_range['min'] is not None:
            filters.append(f'discounted_price:[{price_range["min"]} TO *]')  # Min price
        if price_range['max'] is not None:
            filters.append(f'discounted_price:[* TO {price_range["max"]}]')  # Max price

        if filters:
            search_params['fq'] = filters  # Add filters to the query

    results = solr.search(**search_params)
    return results.docs  # Return documents
 