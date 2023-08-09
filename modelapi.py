from flask import *
import json 
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from werkzeug.utils import secure_filename
from transformers import T5Tokenizer, T5ForConditionalGeneration
app=Flask(__name__,template_folder='template', static_folder='static')
app.config['UPLOAD_FOLDER']= 'files'
import pdfread
import os
import torch

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
        summary= summarizeT(input_json['text'],input_json['min_words'],input_json['max_words'])
        dictToReturn = {'summary':summary, 'max_words':input_json['max_words'],'status':200}
    except:
        dictToReturn = {'summary':'', 'max_words':0, 'status':500}

    return jsonify(dictToReturn)

@app.route('/upload', methods=['POST'])
def get_FilePrediction():
    f = request.files['file']
    f.save(secure_filename(f.filename))
    print('uploaded successfully')
    name=(f.filename).replace(' ','_')
    ext= os.path.splitext(name)[1]
    print(ext)
    if( ext == '.docx'):
        text = pdfread.readDocx(name)
    if( ext== '.text'):
        text= pdfread.readText(name)
    if (ext== '.pdf'):
        text= pdfread.readPDF(name)
    summary=''
    try:
        summary= summarizeT(text,100,500)
        dictToReturn = {'summary':summary, 'max_words':'max_words', 'status':200}
    except:
        dictToReturn = {'summary':'', 'max_words':'max_words', 'status':500}
    print(summary)
    if os.path.exists(name):
        os.remove(name)
    else:
        print("The file does not exist")
    
    return jsonify(dictToReturn)

def summarizeT(sequence, min_length, max_length):
    print('input: '+sequence[:100])
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    tokenizer=T5Tokenizer.from_pretrained('google/flan-t5-base')
    model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base", device_map="auto").to(device)
    inputs=tokenizer.encode("Produce an article summary of the following news article:" +sequence,return_tensors='pt', max_length=512, truncation=True).to(device)
    output = model.generate(inputs, min_length=80,max_length=max_length).to(device)
    summary=tokenizer.decode(output[0],skip_special_tokens=True)
    torch.cuda.empty_cache()
    return summary

if __name__ == '__main__':  
   app.run()