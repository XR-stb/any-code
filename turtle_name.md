![image](https://user-images.githubusercontent.com/56108982/168458487-24bbb53d-5765-4e19-902c-421249e60ae4.png)

```python
import turtle

def run(angle, lenth):#方向为angle ，画笔前进length个单位长度
    turtle.seth(angle)
    turtle.fd(lenth)

def change(x, y):#改变画笔起点坐标
    turtle.penup()
    turtle.goto(x, y)
    turtle.pendown()

def init():
    turtle.pensize(10)


turtle.setup(1000, 400, 400, 200)
init()

#———沙————————
#三点水
#第一个点
change(-400, 50)
run(-40, 60)
#第二个点
change(-400, 10)
run(-40, 60)
#提
change(-400, -100)
run(30, 60)

#少
#撇
change(-300, 50)
run(-110, 60)
#竖
change(-250, 90)
run(-90, 70)
#捺
change(-230, 50)
run(-50, 60)
#撇
change(-210, 10)
run(-120, 150)
#———沙————————


#———天————————
#短横
change(-50, 50)
run(0, 100)
#长横
change(-100, 0)
run(0, 200)
#撇
change(0, 50)
run(-110, 150)
#捺
change(-20, 0)
run(-50, 120)
#———天————————

#---保--------
#单人旁
#撇
change(200, 50)
run(-130, 70)
#竖
change(190, 10)
run(-90, 140)
#呆
#口
#左竖
change(250, 50)
run(-90, 50)
#上横
change(250, 50)
run(0, 50)
#右竖
change(300, 50)
run(-90, 50)
#下横
change(250, 0)
run(0, 50)

#木
#横
change(220, -30)
run(0, 130)
#竖
change(270, 0)
run(-90, 130)
#撇
change(275, -30)
run(-135, 100)
#捺
change(275, -30)
run(-40, 100)
#---保--------
turtle.done()
```
