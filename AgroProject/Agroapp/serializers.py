from rest_framework import serializers
from .models import FarmerProfile, Product, Customer, Review,Order,Cart, Wishlist
from django.db import models


class FarmerProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = FarmerProfile
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):

    # SHOW FARMER FULL DETAILS
    farmer_details = FarmerProfileSerializer(
        source='farmer',
        read_only=True
    )

    # CALCULATE REMAINING STOCK
    remaining_stock = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_remaining_stock(self, obj):

        total_orders = Order.objects.filter(
            product=obj
        ).aggregate(
            total=models.Sum("quantity")
        )["total"] or 0

        return max(obj.stockQuantity - total_orders, 0)



class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = "__all__"



class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):

    class Meta:

        model = Order

        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)

    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True
    )

    class Meta:
        model = Cart
        fields = "__all__"


class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = "__all__"