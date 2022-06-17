url 链接可以去电费充值页面爬取
```python
#coding:utf-8

from bs4 import BeautifulSoup
import requests
import urllib3
import time
url = 'http://111.85.254.90:8180/epay/wxpage/wanxiao/eleresult?sysid=101&roomid=101670164&areaid=1&buildid=%E9%87%91%E6%A1%82%E8%8B%91'

html_doc = requests.get(url)

soup = BeautifulSoup(html_doc.content, 'html.parser')

out = soup.get_text()

print('寝室:' + out[59:62] + '\n剩余电量:' + out[94:99])#电量的位置
print('查询时间' + time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
```
