from django.db import models

# Create your models here.

from django.contrib.auth.models import User
from django.db import models

class FarmerProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    phone = models.CharField(max_length=10, null=True, blank=True)

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

    profile_photo = models.ImageField(
        upload_to='farmer_profiles/',
        null=True,
        blank=True
    )

    id_proof = models.FileField(
        upload_to='farmer_documents/',
        null=True,
        blank=True
    )

    bank_name = models.CharField(max_length=100, null=True, blank=True)

    account_number = models.CharField(max_length=50, null=True, blank=True)

    ifsc_code = models.CharField(max_length=20, null=True, blank=True)

    account_holder = models.CharField(max_length=100, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    


from datetime import date

class Product(models.Model):

    farmer = models.ForeignKey(
        FarmerProfile,
        on_delete=models.CASCADE,
        related_name="products",
        null=True,
        blank=True
    )

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

    offer_percentage = models.PositiveIntegerField(default=0)
    offer_start_date = models.DateField(null=True, blank=True)
    offer_end_date = models.DateField(null=True, blank=True)

    image = models.ImageField(upload_to="products/")

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def discounted_price(self):
        today = date.today()

        if (
            self.offer_percentage > 0
            and self.offer_start_date
            and self.offer_end_date
            and self.offer_start_date <= today <= self.offer_end_date
        ):
            discount = (self.price * self.offer_percentage) / 100
            return self.price - discount

        return self.price

    def __str__(self):
        return self.name
    
class Customer(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    phone = models.CharField(max_length=15)

    address = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)



class Order(models.Model):

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.IntegerField()

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    full_name = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    address = models.TextField()

    city = models.CharField(max_length=100)

    district = models.CharField(max_length=100)

    state = models.CharField(max_length=100)

    pincode = models.CharField(max_length=10)

    payment_method = models.CharField(max_length=50)

    order_status = models.CharField(
        max_length=50,
        default="Pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
    


class Cart(models.Model):

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.IntegerField(default=1)

    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name


class Wishlist(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("customer", "product")

    