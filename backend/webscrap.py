from bs4 import BeautifulSoup
import requests
import json
#Defining function to get data from HTML doc
# def data(url):
#     r = requests.get(url)
#     soup = BeautifulSoup(r.text, 'html.parser')
#     inputT = ''
#     for input in soup.find_all('p'):
#         inputT+=input.get_text()

#     return inputT


#Function for getting the table of contents
def data(url):
    s = requests.get(url).text
    soup = BeautifulSoup(s, 'html.parser')
    scrapedInput = ''
    for input in soup.find_all(['p']): #take input from p tags
        print(input.get_text())
        scrapedInput += input.get_text()
    return scrapedInput
