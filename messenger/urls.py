from django.conf.urls import url
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'^$', views.Index.as_view(), name='index'),
    url(r'^messenger/$', TemplateView.as_view(template_name='messenger.html')),
    url(r'^users/$', TemplateView.as_view(template_name='users.html')),

]
