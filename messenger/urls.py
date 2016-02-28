from django.conf.urls import url
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'^$', views.Index.as_view(), name='index'),
    url(r'^user_list$', views.UserList.as_view(), name='user_list'),
    url(r'^authenticate$', views.Authenticate.as_view(), name='authenticate'),
    url(r'^logout$', views.Logout.as_view(), name='logout'),
    url(r'^register$', views.Register.as_view(), name='register'),

    # page partials
    url(r'^partials/home$', TemplateView.as_view(template_name='partials/home.html')),

    #directive partials
    url(r'^partials/messenger$', TemplateView.as_view(template_name='partials/messenger.html')),
    url(r'^partials/users$', TemplateView.as_view(template_name='partials/users.html')),
    url(r'^partials/registration$', TemplateView.as_view(template_name='partials/registration.html')),
    url(r'^partials/login$', TemplateView.as_view(template_name='partials/login.html')),

]
