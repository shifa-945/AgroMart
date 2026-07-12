from django.contrib import admin

from .models import (
    FarmerProfile,
    Product,
    Customer,
    Order,
    Review
)

# ================= FARMER ADMIN =================

class FarmerAdmin(admin.ModelAdmin):

    list_display = (
        'get_name',
        'phone',
        'get_email'
    )

    def get_name(self, obj):
        return obj.user.first_name

    get_name.short_description = "Full Name"

    def get_email(self, obj):
        return obj.user.email

    get_email.short_description = "Email"


# ================= PRODUCT ADMIN =================

class ProductAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'category',
        'subcategory',
        'price'
    )


# ================= CUSTOMER ADMIN =================

class CustomerAdmin(admin.ModelAdmin):

    list_display = (
        'get_full_name',
        'phone',
        'get_email'
    )

    def get_full_name(self, obj):
        return obj.user.first_name

    get_full_name.short_description = "Full Name"

    def get_email(self, obj):
        return obj.user.email

    get_email.short_description = "Email"


# ================= REGISTER MODELS =================

admin.site.register(FarmerProfile, FarmerAdmin)

admin.site.register(Product, ProductAdmin)

admin.site.register(Customer, CustomerAdmin)

admin.site.register(Order)

admin.site.register(Review)