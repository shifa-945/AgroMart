from rest_framework import serializers
from . models import FarmerProfile, Product

class FarmerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= FarmerProfile
        fields='__all__'



class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"