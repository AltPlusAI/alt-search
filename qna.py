from transformers import T5Tokenizer, T5ForConditionalGeneration
import time
import torch
from transformers import T5ForConditionalGeneration

device = 'cuda' if torch.cuda.is_available() else 'cpu'

def QNA(context, question, max_length):
    start= time.time()
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    tokenizer=T5Tokenizer.from_pretrained('google/flan-t5-base')
    model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base", device_map="auto").to(device)
    inputs=tokenizer.encode("question:"+question+" context:" +context,return_tensors='pt', max_length=512, truncation=True).to(device)
    output = model.generate(inputs, min_length=10,max_length=max_length).to(device)
    summary=tokenizer.decode(output[0],skip_special_tokens=True)
    torch.cuda.empty_cache()
    end= time.time()
    duration= end-start
    print(duration)
    return summary, duration

# i=0
# while i<=5:
#     context= input("enter context")
#     question= input("enter question")
#     print(QNA(context, question, 150))
#     i+=1