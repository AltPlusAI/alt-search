from flask import *
import json 
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from werkzeug.utils import secure_filename
from transformers import T5Tokenizer, T5ForConditionalGeneration
import os
import torch
import time
import requests
import webscrap, qna
app=Flask(__name__,template_folder='template', static_folder='static')
app.config['UPLOAD_FOLDER']= 'files'
text=""
@app.route('/')
def hello():
    return render_template('chat_app.html')

@app.route('/error')
def error():
    return render_template('404.html')

# This gets url requested and summarise the single url and sends the summarised content 
@app.route('/url', methods=['POST'])
def get_UrlData():
    try: 
        input_json = request.get_json(force=True) 
        text=webscrap.data(input_json['text'])
        # text2= webscrap.data(input_json['text2'])
        # text+=text2
        summary = summarizeT(text,140)
        dictToReturn = {'summary':summary,'status':200}
        print(summary)
    except:
        dictToReturn = {'summary':'', 'status':500}
    
    return jsonify(dictToReturn)

# After getting url content asked questions will be answered and replied as json
@app.route('/qnaResults', methods=['POST'])
def get_QnaResults():
    try: 
        input_json = request.get_json(force=True) 
        summary=qna.QNA(text,input_json['text'],10)
        dictToReturn = {'summary':summary,'status':200}
        print(summary)
    except:
        dictToReturn = {'summary':'', 'status':500}
    
    return jsonify(dictToReturn)

# this gets the search urls
@app.route('/searchResults', methods=['POST'])
def get_GoogleResults():
     
    input_json = request.get_json(force=True) 
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

    
    return jsonify(dictToReturn)

@app.route('/predict', methods=['POST'])
def get_TextPrediction():
    try: 
        input_json = request.get_json(force=True) 
        summary, duration= summarizeT(input_json['text'],input_json['min_words'],input_json['max_words'])
        dictToReturn = {'summary':summary, 'max_words':input_json['max_words'],'status':200}
    except:
        dictToReturn = {'summary':'', 'max_words':duration, 'status':500}

    return jsonify(dictToReturn)



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


if __name__ == '__main__':  
   app.run()