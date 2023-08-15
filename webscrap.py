from bs4 import BeautifulSoup
import requests

#Function for getting the table of contents
def content(url):
    s = requests.get(url).text
    soup = BeautifulSoup(s, 'html.parser')
    scrapedInput = ''
    for input in soup.find_all(['p']): #take input from p tags
        print(input.get_text())
        scrapedInput += input.get_text()
    return scrapedInput
url = input('Enter URL ') #take input from the user
content(url) #call the function