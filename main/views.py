from django.shortcuts import render
import requests, json
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import webscrap, qna

import time
import torch
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from transformers import T5Tokenizer, T5ForConditionalGeneration
# Create your views here.
def index(request):
    return render(request, 'chat_app.html')

text=''
@api_view([ 'POST'])
def get_GoogleResults(request):
    if request.method== 'POST':
        input_json = request.data
        print(input_json['text'])
        link=google(input_json['text'])
        print(link)
        i=0
        dictToReturn={}
        for lin in range(len(link)):
            dictToReturn['url'+str(i)]= link[lin]
            # dictToReturn['title'+str(i)]= link[lin+1]           
            i+=1

        # dictToReturn = {'summary':str(summary),'status':200}
        print(dictToReturn)
        return Response(dictToReturn)
    return Response({"message": "there is an error"})

@api_view([ 'POST'])
def get_UrlData(request):
    try: 
        input_json = request.data
        text=webscrap.data(input_json['text'])
        # text2= webscrap.data(input_json['text2'])
        # text+=text2
        summary = summarizeT(text,140)
        dictToReturn = {'summary':summary,'status':200}
        print(summary)
    except:
        dictToReturn = {'summary':'', 'status':500}
    
    return Response(dictToReturn)

@api_view(['POST'])
def get_QnaResults(request):
    try: 
        input_json = request.data
        summary,duration=qna.QNA(text,input_json['text'],60)
        dictToReturn = {'summary':summary,'status':200}
        print(summary)
    except:
        dictToReturn = {'summary':'', 'status':500}
    
    return Response(dictToReturn)

def summarizeT(sequence, max_length):
    # sequence= webscrap.data(url)
    start= time.time()
    print('input: '+sequence[:100])
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    tokenizer=T5Tokenizer.from_pretrained('google/flan-t5-base')
    model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base", device_map="auto").to(device)
    inputs=tokenizer.encode("Produce an article summary of the following news article:" +sequence,return_tensors='pt', max_length=512, truncation=True).to(device)
    output = model.generate(inputs, min_length=80,max_length=max_length).to(device)
    summary=tokenizer.decode(output[0],skip_special_tokens=True)
    torch.cuda.empty_cache()
    end= time.time()
    duration= end-start
    print(duration)
    return summary, duration

def google(query):
    response= requests.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyCpKsc33vEiu-K5QT9UjzTU6FqwPpxCM_c&cx=d3ae9be4ac4324a35&q="+query)
    resp_json=json.loads(response.text)
    link=[]
    # title=[]
    i=0
    for items in resp_json["items"]:
        link.append(str(items["link"]))
        link.append(str(items["title"]))

        i+=1
    return link