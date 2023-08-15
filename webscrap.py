from bs4 import BeautifulSoup
import requests

#Defining function to get data from HTML doc
def data(url):
    r = requests.get('https://en.wikipedia.org/wiki/Independence_Day_(India)')
    return r.text

s = data("r")
soup = BeautifulSoup(s, 'html.parser')
input = ''
for input in soup.find_all(['p', 'ul', 'li']):
    print(input.get_text())