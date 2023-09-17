from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("searchResults", views.get_GoogleResults, name="searchresults"),
    path("url",views.get_UrlData, name="getsummary"),
    path('qnaResults', views.get_QnaResults,name="qna")
]