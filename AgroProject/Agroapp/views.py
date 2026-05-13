from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import FarmerProfileSerializer,ProductSerializer
from .models import FarmerProfile,Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

class FarmerProfileViewSet(ModelViewSet):
    queryset = FarmerProfile.objects.all()
    serializer_class = FarmerProfileSerializer



@api_view(['POST'])
def farmer_Login(request):
    email=request.data.get('email')
    password=request.data.get('password')
    try:
        farmer=FarmerProfile.objects.get(email=email,password=password)
        return Response({'message':'Login successful',"id": farmer.id})
    
    except FarmerProfile.DoesNotExist:
        return Response({'message':'Invalid credentials'})
    


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer