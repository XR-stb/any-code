```pyuthon
#coding=gbk

'''

#coding=gbk
用于支持中文输入

PY文件当中本身是不支持中文的。即使注释是中文也不行，为了解决这个问题，就需要把文件编码类型改为UTF-8的类型，这也就是本行代码的作用
所以我的注释写在了下面，因为写在上面就报错了
建议新建一个程序就添加上这句话，因为不管是注释还是弹出消息提示，免不了的要输入中文，所以这个基本是必须的。

这两天在写一个随机图片api 觉得命名麻烦 就
学了下python库里面的os.rename()和os.listdir()来实现批量文件重命名
遂以记录之

'''
import os
import sys
def rename():
    path = 'C:/Users/86187/Pictures/api图库' #要修改的文件夹路径
    name = 'img' #文件名前缀
    startNumber = 1 #开始的序号 比如 img1
    fileType = '.jpg' #文件名后缀
    cnt = 0
    for files in os.listdir(path): #os.listdir 获取该目录下的文件名 以list返回
        Olddir = os.path.join(path,files) #路径拼接 因为我们是要通过确定的位置去修改文件名
        if os.path.isdir(Olddir):
            continue
        Newdir=os.path.join(path,name+str(cnt+int(startNumber))+fileType)
        os.rename(Olddir,Newdir)
        cnt+=1
    print("修改成功，可以打开文件夹查看")
rename()

if __name__ == '__main__':
    rename()


'''
rename()方法语法格式如下
os.rename(src, dst)
os.rename() 方法用于命名文件或目录，从 src 到 dst,如果dst是一个存在的目录, 将抛出OSError。
'''

```
