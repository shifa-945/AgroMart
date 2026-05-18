from rest_framework import serializers
from .models import FarmerProfile, Product, Customer, Review,Order,Cart


class FarmerProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = FarmerProfile
        fields = '__all__'



class ProductSerializer(serializers.ModelSerializer):

    # ✅ THIS IS THE IMPORTANT FIX
    farmer = FarmerProfileSerializer(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"



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