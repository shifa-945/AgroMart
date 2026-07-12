from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    farmer_register,
    FarmerProfileViewSet,
    customer_orders,
    farmer_Login,
    ProductViewSet,
    CustomerViewSet,
    Customer_Login,
    customer_register,
    farmer_orders,
    toggle_wishlist,
    update_order_status,
    ReviewViewSet,
    OrderViewSet,
    CartViewSet,
    get_wishlist
)

router = DefaultRouter()

router.register('farmers', FarmerProfileViewSet)
router.register("products", ProductViewSet)
router.register("customers", CustomerViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'cart', CartViewSet)

urlpatterns = router.urls

urlpatterns += [

    path('farmer-register/', farmer_register),
    path('farmerlogin/', farmer_Login),

    path("customer-register/", customer_register),
    path("customerlogin/", Customer_Login),

    path(
        "farmer-orders/<int:farmer_id>/",
        farmer_orders
    ),

    path(
        "update-order-status/<int:order_id>/",
        update_order_status
    ),

    path(
        'customer-orders/<int:customer_id>/',
        customer_orders
    ),

    path(
        "wishlist/toggle/",
        toggle_wishlist
    ),

    path(
        "wishlist/<int:customer_id>/",
        get_wishlist
    ),
]