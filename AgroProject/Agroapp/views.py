from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import FarmerProfileSerializer,ProductSerializer,ReviewSerializer, WishlistSerializer
from .models import FarmerProfile,Product,Review,Cart, Wishlist
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Customer,Order
from .serializers import CustomerSerializer,OrderSerializer,CartSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .permissions import IsFarmerOwner
from rest_framework.decorators import permission_classes,  authentication_classes

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def farmer_register(request):

    data = request.data

    email = data.get('email')

    if User.objects.filter(username=email).exists():

        return Response({
            "message": "Email already registered"
        }, status=400)

    user = User.objects.create_user(
        username=email,
        email=email,
        password=data.get('password')
    )

    FarmerProfile.objects.create(
        user=user,
        phone=data.get('phone'),
        village=data.get('location')
    )

    return Response({
        "message": "Registration successful"
    })

class FarmerProfileViewSet(ModelViewSet):

    queryset = FarmerProfile.objects.all()

    serializer_class = FarmerProfileSerializer

    authentication_classes = [TokenAuthentication]

    permission_classes = [IsAuthenticated, IsFarmerOwner]

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
@api_view(['POST'])
@permission_classes([AllowAny])
def farmer_Login(request):

    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(
        username=email,
        password=password
    )

    if user is not None:

        token, created = Token.objects.get_or_create(user=user)

        farmer = FarmerProfile.objects.get(user=user)

        return Response({
            "message": "Login successful",
            "token": token.key,
            "user_id": user.id,
            "farmer_id": farmer.id
        })

    return Response({
        "message": "Invalid credentials"
    }, status=400)





@api_view(['POST'])
@permission_classes([AllowAny])
def customer_register(request):

    data = request.data

    email = data.get("email")

    # CHECK EMAIL EXISTS
    if User.objects.filter(username=email).exists():

        return Response({
            "message": "Email already registered"
        }, status=400)

    # PASSWORD CHECK
    if data.get("password") != data.get("confirm_password"):

        return Response({
            "message": "Passwords do not match"
        }, status=400)

    # CREATE DJANGO USER
    user = User.objects.create_user(
        username=email,
        email=email,
        password=data.get("password")
    )

    # CREATE CUSTOMER
    customer = Customer.objects.create(
        user=user,
        phone=data.get("phone"),
        address=data.get("address")
    )

    # CREATE TOKEN
    token, created = Token.objects.get_or_create(user=user)

    return Response({

        "message": "Customer registered successfully",

        "token": token.key,

        "user_id": user.id,

        "customer_id": customer.id

    })


@api_view(['POST'])
@permission_classes([AllowAny])
def Customer_Login(request):

    email = request.data.get("email")

    password = request.data.get("password")

    user = authenticate(
        username=email,
        password=password
    )

    if user is not None:

        token, created = Token.objects.get_or_create(user=user)

        customer = Customer.objects.get(user=user)

        return Response({
            "message": "Login successful",
            "token": token.key,
            "user_id": user.id,
            "customer_id": customer.id
        })

    return Response({
        "message": "Invalid email or password"
    }, status=400)
    
class CustomerViewSet(ModelViewSet):

    queryset = Customer.objects.all()

    serializer_class = CustomerSerializer


class ProductViewSet(ModelViewSet):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

    permission_classes = [AllowAny]

    def get_queryset(self):

        farmer_id = self.request.query_params.get('farmer')

        if farmer_id:
            return Product.objects.filter(farmer_id=farmer_id)

        return Product.objects.all()

    def perform_update(self, serializer):

        serializer.save()



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

    authentication_classes = [TokenAuthentication]

    permission_classes = [IsAuthenticated]



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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
    


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def customer_orders(request, customer_id):

    orders = Order.objects.filter(customer_id=customer_id)

    order_data = []

    for order in orders:

        order_data.append({

            "id": order.id,

            "product_name": order.product.name,

            "product_image": request.build_absolute_uri(
                order.product.image.url
            ) if order.product.image else None,

            "quantity": order.quantity,

            "total_price": order.total_price,

            "order_status": order.order_status,

            "farmer_name": order.product.farmer.user.username,

            "created_at": order.created_at.strftime("%d-%m-%Y"),

        })

    return Response(order_data)



@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def toggle_wishlist(request):

    customer_id = request.data["customer"]
    product_id = request.data["product"]

    item = Wishlist.objects.filter(
        customer_id=customer_id,
        product_id=product_id
    )

    if item.exists():
        item.delete()
        return Response({"liked": False})

    Wishlist.objects.create(
        customer_id=customer_id,
        product_id=product_id
    )

    return Response({"liked": True})



@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_wishlist(request, customer_id):

    wishlist = Wishlist.objects.filter(customer_id=customer_id)

    serializer = WishlistSerializer(wishlist, many=True)

    return Response(serializer.data)