---
title: '自動投稿記事生成機能追加'
date: '2023-02-15T07:48:21.768636'
category: 'Python'
description: 'Pythonを利用して投稿記事のテンプレートを自動生成させてみた'
thumbnail: '/img/blog/スクリーンショット 2023-02-15 074845.jpg'
---
# 自動投稿記事生成機能追加
記事を書く際に毎回frontmatterを書くのが面倒だったので、Pythonを利用して投稿記事のテンプレートを自動生成させてみた。

## 使い方
1. ターミナルで`python post.py`を実行する
2. タイトルを入力する
3. カテゴリーを入力する
4. 説明を入力する
5. ランダムなファイル名で記事が生成される

## サンプルコード
```python
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
```
## まとめ
めちゃくちゃ楽になりました。
特定の名前の付いたブランチを切ることで自動生成とかできたらもっと楽そう。
