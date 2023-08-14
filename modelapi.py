from flask import *
import json 
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from werkzeug.utils import secure_filename
from transformers import T5Tokenizer, T5ForConditionalGeneration
import os
import torch
import time

app=Flask(__name__,template_folder='template', static_folder='static')
app.config['UPLOAD_FOLDER']= 'files'

@app.route('/')
def hello():
    return render_template('summary.html')

@app.route('/error')
def error():
    return render_template('404.html')

@app.route('/predict', methods=['POST'])
def get_TextPrediction():
    try:
        input_json = request.get_json(force=True) 
        summary, duration= summarizeT(input_json['text'],input_json['min_words'],input_json['max_words'])
        dictToReturn = {'summary':summary, 'max_words':input_json['max_words'],'status':200}
    except:
        dictToReturn = {'summary':'', 'max_words':duration, 'status':500}

    return jsonify(dictToReturn)



def summarizeT(sequence, min_length, max_length):
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

if __name__ == '__main__':  
   app.run()