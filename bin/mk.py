# 抓取类目详情页图片
# pip install BeautifulSoup4
import urllib2
import urllib
from bs4 import BeautifulSoup
response=urllib2.urlopen('http://localhost/my.html')
html=response.read()
soup =BeautifulSoup(html,'html.parser')
links =soup.find_all('a')
i=1
for link in links:
  href='http://localhost/'+link.get('href')
  detailRes=urllib2.urlopen(href)
  detail=BeautifulSoup(detailRes.read(),'html.parser').find_all('img')
  for img in detail:
    image_url= img.get('src')
    urllib.urlretrieve(image_url,"E:\data\\%s.jpg"%(i))  
    i+=1 
