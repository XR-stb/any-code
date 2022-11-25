qiangzhi


```py
import requests
from concurrent.futures import ThreadPoolExecutor

cookie = 'JSESSIONID=2044BDBE76369D52F3EC37C30A50E901; Hm_lvt_c2daa8e62b938a0869a122a0d6da4e9a=1639983337,1640157426,1640340700,1640922234; SERVERID=122; JSESSIONID=6E0CDB467B3F1AD022EDFED74DC9E47F'
header = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Mobile Safari/537.36 Edg/102.0.1245.33',
    'Referer': 'http://qzjwgl.gzcc.edu.cn/jsxsd/xsxkkc/comeInGgxxkxk',
    'cookie': cookie
}
#学校的抢课课程链接修改最后面的课程号和cookie即可
#http://qzjwgl.gzcc.edu.cn/jsxsd/xsxkkc/ggxxkxkOper?kcid=003058&cfbs=null&jx0404id=202220231000029

def rush(data):
    # data 是课程 ID ， f12 打开查看课程id即可
    #data = 202220232000085
    # 下面是地址信息， 每个学校都不一样，自己看看抢课系统然后改改
    url = 'http://qzjwgl.gzcc.edu.cn/jsxsd/xsxkkc/ggxxkxkOper?kcid=003058&cfbs=null&jx0404id=' + str(data)
    while True:
        # 设定5s服务器未应答就放弃本次get请求
        mes = requests.get(url, headers=header, timeout=5)
        # 打印选课结果
        print(str(data) + ' code ' + str(mes.status_code) + ':' + str(mes.text))

executor = ThreadPoolExecutor(max_workers=4)

i = 1
for result in executor.map(rush, [202220232000085, 202220232000029, 202220232000042,
                                  202220232000043, 202220232000018, 202220232000049,
                                  202220232000046, 202220232000085, 202220232000052]):
    pass
```
