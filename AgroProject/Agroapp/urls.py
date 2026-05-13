from django.urls import path

from rest_framework.routers import DefaultRouter
from .views import FarmerProfileViewSet, farmer_Login,ProductViewSet

router = DefaultRouter()
router.register('farmers', FarmerProfileViewSet)
router.register("products", ProductViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('farmerlogin/', farmer_Login),
]