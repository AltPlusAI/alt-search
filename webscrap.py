from bs4 import BeautifulSoup
import requests
import json
#Defining function to get data from HTML doc
def data(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    inputT = ''
    for input in soup.find_all('p'):
        inputT+=input.get_text()

    return inputT
