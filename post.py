import datetime
import random
import string
import os

title = input("記事のタイトルを入力してください:")
category = input("記事のカテゴリを入力してください:")
description = input("記事の説明を入力してください:")

now = datetime.datetime.now()

# ランダムなファイル名を生成する
filename = ''.join(random.choices(string.ascii_letters + string.digits, k=10))

# ファイルパスを指定する
file_path = f'posts/{filename}.md'

frontmatter = f'''---
title: '{title}'
date: '{now.isoformat()}'
category: '{category}'
description: '{description}'
thumbnail: '/img/blog/'
---
'''

with open(file_path, "w", encoding='utf-8') as f:
    f.write(frontmatter)

print(f'{file_path}を作成しました。')
