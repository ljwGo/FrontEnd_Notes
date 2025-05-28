from PIL import Image
import os
import json

# 图片目录
uniform_img_width = 400
img_dir_path= "../images"
img_dic = {}
image_groups_list = {}
group_img_amount = 12

# 改变工作目录
os.chdir(os.path.dirname(__file__))

def relative_to_abs_path():
  # 将相对路径的图片目录转变为绝对路径的目录
  global img_dir_path
  if not os.path.isabs(img_dir_path):
    img_dir_path = os.path.abspath(img_dir_path)
    return True

# 获取指定文件下所有的图片
def get_all_images(img_dir_path, per_json_img_limit=12):
  img_dic = {}
  img_groups_list = []
  # 路径是目录
  if (os.path.isdir(img_dir_path)):
    # 获取路径下所有文件或者目录
    file_or_dir_list = os.listdir(img_dir_path)

    #计数功能
    counter = 1
    for item in file_or_dir_list:
      # 如果目标是文件
      if os.path.isfile(os.path.join(img_dir_path, item)):
        extend = os.path.splitext(item)[1]
        # 如果文件后缀为图片后缀
        if extend in ['.png', '.gif', '.jpg', '.webp']:
          # 加入到字典中
          img_dic[item] = []
          counter += 1
          if counter > per_json_img_limit:
            img_groups_list.append(img_dic)
            counter=1
            img_dic = {}
    return img_groups_list

# 获取每个图片的高度, 写入列表
def get_image_height(image_groups_list):
  new_list = []
  for img_dic in image_groups_list:
    for img_name in img_dic.keys():
      img_obj = Image.open(os.path.join(img_dir_path, img_name))
      relative_height = round(uniform_img_width / img_obj.size[0], 3) * img_obj.size[1]
      img_dic[img_name].append(relative_height)
      img_obj.close()
    new_list.append(img_dic)
  return new_list

# 序列化为json格式
def img_dic2json(image_groups_list):
  new_list = []
  for dic in image_groups_list:
    new_list.append(json.dumps(dic))
  return new_list

def img_dic2file(image_groups_list):
  i = 0
  for img_dic in image_groups_list:
    with open(f'img_json_group{i}.json', 'w', encoding='utf-8') as fp:
      fp.write(img_dic)
    i += 1

relative_to_abs_path()
image_groups_list = get_all_images(img_dir_path, group_img_amount)
image_groups_list = get_image_height(image_groups_list)
image_groups_list = img_dic2json(image_groups_list)
img_dic2file(image_groups_list)