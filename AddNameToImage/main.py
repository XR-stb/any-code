from PIL import Image, ImageDraw, ImageFont
from appdirs import unicode


def add_name_to_image(image_path, name):
    # 打开原始图像
    image = Image.open(image_path)

    # 创建一个绘图对象
    draw = ImageDraw.Draw(image)

    # 设置字体和字体大小
    font = ImageFont.truetype("Simsun.ttf", 40)

    # 计算文本的宽度和高度
    text_width, text_height = draw.textsize(name, font=font)

    # 计算文本在图像中的位置
    x = (image.width - text_width) // 2
    y = (image.height - text_height) // 2

    # 在图像中间位置添加名字
    draw.text((x, y), name, fill="blue", font=font)

    # 保存修改后的图像
    image.save(f"output/{name}.png")


# 读取名字列表
with open("names.txt", "r", encoding='utf-8') as file:
    names = file.readlines()

# 处理每个名字
for name in names:
    # 去除换行符
    name = name.strip()

    # 添加名字到图像
    add_name_to_image("template.png", name)
