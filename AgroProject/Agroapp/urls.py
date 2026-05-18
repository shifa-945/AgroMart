from django.urls import path

from rest_framework.routers import DefaultRouter
from .views import FarmerProfileViewSet, farmer_Login,ProductViewSet,CustomerViewSet,Customer_Login, farmer_orders, update_order_status
from .views import ReviewViewSet,OrderViewSet,CartViewSet
router = DefaultRouter()
router.register('farmers', FarmerProfileViewSet)
router.register("products", ProductViewSet)
router.register("customers", CustomerViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'cart', CartViewSet)
urlpatterns = router.urls

urlpatterns += [
    path('farmerlogin/', farmer_Login),
    path('customerlogin/', Customer_Login),
    path("farmer-orders/<int:farmer_id>/",farmer_orders),
    path("update-order-status/<int:order_id>/", update_order_status),
]