from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("searchResults", views.GoogleResults.as_view(), name="searchresults"),
    path("url",views.UrlSummary.as_view(), name="getsummary"),
    path('qnaResults', views.QnaResults.as_view(),name="qna"),
]