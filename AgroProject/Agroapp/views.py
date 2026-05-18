from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import FarmerProfileSerializer,ProductSerializer,ReviewSerializer
from .models import FarmerProfile,Product,Review,Cart
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Customer,Order
from .serializers import CustomerSerializer,OrderSerializer,CartSerializer
# Create your views here.

class FarmerProfileViewSet(ModelViewSet):
    queryset = FarmerProfile.objects.all()
    serializer_class = FarmerProfileSerializer



@api_view(['POST'])
def farmer_Login(request):
    email=request.data.get('email')
    password=request.data.get('password')
    print(" heyyy")
    try:
        farmer=FarmerProfile.objects.get(email=email,password=password)
        return Response({'message':'Login successful',"id": farmer.id})
    
    except FarmerProfile.DoesNotExist:
        return Response({'message':'Invalid credentials'})
    


class ProductViewSet(ModelViewSet):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

    def get_queryset(self):

        farmer_id = self.request.query_params.get('farmer')

        # SHOW ONLY FARMER PRODUCTS
        if farmer_id:
            return Product.objects.filter(farmer_id=farmer_id)

        return Product.objects.all()


class CustomerViewSet(ModelViewSet):

    queryset = Customer.objects.all()

    serializer_class = CustomerSerializer


@api_view(['POST'])
def Customer_Login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:

        customer = Customer.objects.get(
            email=email,
            password=password
        )

        return Response({
            "message": "Login successful",
            "id": customer.id,
            "name": customer.full_name
        })

    except Customer.DoesNotExist:

        return Response({
            "message": "Invalid email or password"
        }, status=400)
    




class ReviewViewSet(ModelViewSet):

    queryset = Review.objects.all()

    serializer_class = ReviewSerializer

    def get_queryset(self):

        queryset = Review.objects.all()

        product_id = self.request.query_params.get('product')

        if product_id:

            queryset = queryset.filter(product=product_id)

        return queryset
    

class OrderViewSet(ModelViewSet):

    queryset = Order.objects.all()

    serializer_class = OrderSerializer



class CartViewSet(ModelViewSet):

    serializer_class = CartSerializer

    queryset = Cart.objects.all()

    def get_queryset(self):

        queryset = Cart.objects.all()

        customer = self.request.query_params.get("customer")

        if customer:
            queryset = queryset.filter(customer=customer)

        return queryset
    










@api_view(["GET"])
def farmer_orders(request, farmer_id):

    orders = Order.objects.filter(
        product__farmer_id=farmer_id
    ).select_related("product", "customer")

    data = []

    for order in orders:
        data.append({
            "id": order.id,
            "product_name": order.product.name,
            "full_name": order.full_name,
            "phone": order.phone,
            "quantity": order.quantity,
            "total_price": order.total_price,
            "order_status": order.order_status,
        })

    return Response(data)


@api_view(["PATCH"])
def update_order_status(request, order_id):

    print("PATCH HIT")  # DEBUG CHECK

    try:
        order = Order.objects.get(id=order_id)

        print("BEFORE:", order.order_status)

        new_status = request.data.get("status")

        if not new_status:
            return Response({"error": "status missing"}, status=400)

        order.order_status = new_status
        order.save()

        print("AFTER:", order.order_status)

        return Response({
            "message": "updated successfully",
            "order_status": order.order_status
        })

    except Order.DoesNotExist:
        return Response({"error": "not found"}, status=404)