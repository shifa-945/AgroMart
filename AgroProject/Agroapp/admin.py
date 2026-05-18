from django.contrib import admin

from .models import FarmerProfile,Product,Customer,Order,Review



class FarmerAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'email', 'farm_name')
    list_filter = ('gender', 'farming_type', 'state')
    search_fields = ('full_name', 'phone', 'email')

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'subcategory', 'price')



class CustomerAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'email')
# Register your models here.
admin.site.register(FarmerProfile, FarmerAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Order)
admin.site.register(Review)