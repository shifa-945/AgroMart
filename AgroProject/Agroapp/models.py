from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db import models
from django.db import models

class FarmerProfile(models.Model):

    # LOGIN / BASIC DETAILS
    full_name = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=10, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    password = models.CharField(max_length=100, null=True, blank=True)
    confirm_password = models.CharField(max_length=100, null=True, blank=True)

    
    gender = models.CharField(max_length=20, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    village = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True)
    
    pincode = models.CharField(max_length=10, null=True, blank=True)

    
    farm_name = models.CharField(max_length=150, null=True, blank=True)
    farming_type = models.CharField(max_length=100, null=True, blank=True)
    experience = models.CharField(max_length=50, null=True, blank=True)
    farm_size = models.CharField(max_length=50, null=True, blank=True)
    main_products = models.TextField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

    # PROFILE PHOTO
    profile_photo = models.ImageField(
        upload_to='farmer_profiles/',
        null=True,
        blank=True
    )

    # DOCUMENTS
    id_proof = models.FileField(
        upload_to='farmer_documents/',
        null=True,
        blank=True
    )

    # BANK DETAILS
    bank_name = models.CharField(max_length=100, null=True, blank=True)
    account_number = models.CharField(max_length=50, null=True, blank=True)
    ifsc_code = models.CharField(max_length=20, null=True, blank=True)
    account_holder = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True, blank=True)

    def __str__(self):
        return self.full_name
    



class Product(models.Model):

    name = models.CharField(max_length=200)

    category = models.CharField(max_length=100)

    subcategory = models.CharField(max_length=100)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    unit = models.CharField(max_length=50)

    stockQuantity = models.PositiveIntegerField()

    minimumOrderQuantity = models.PositiveIntegerField()

    description = models.TextField()

    image = models.ImageField(
        upload_to="products/"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name