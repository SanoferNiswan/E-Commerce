#custom_auth/admin.py
from django.contrib import admin
from .models import User, Profile

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_staff', 'is_superuser', 'is_active')  # Fields to display
    search_fields = ('email',)  # Search users by email
    list_filter = ('is_staff', 'is_active', 'is_superuser')  # Filter by staff and superuser status

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'bio', 'verified')  # Display profile details
    search_fields = ('user__email', 'full_name')  # Search by email or full name
    list_filter = ('verified',)  # Filter by verified status
