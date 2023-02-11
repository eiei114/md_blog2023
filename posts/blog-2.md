---
title: 'ブログ追加機能'
date: '2023-02-06T15:30:44.675Z'
category : 'Tech'
description: 'ブログ追加機能について'
thumbnail: '/img/blog/sebastiaan-stam-H33IhK53rpg-unsplash.jpg'
---

[Zenn](https://zenn.dev/keisuke114)

# はじめに

先日、というか今日の早朝ごろに MarkDown ブログを作成した。起きてまた数時間触った成果について書いていく。

## 追加したこと

- eslint ルールの追加
- prettier の追加
- PR 時に自動テストを行うようにした。
- docker を利用した自動ビルド断念

## eslint や prettier の追加について

eslint や prettier は今まで使っていなかったので、今回の機会に使ってみた。
eslint は、コードの品質を保つために使う。prettier は、コードのフォーマットを整えるために使う。

eslint のルールの制約を外部から適当にとってきて、それを使うことにした。
import の順番を変えるというエラー解除に時間がかかってしまった。(なにも eslint のことを知らずに入れていたため)

## PR 時に自動テストを行うようにした。

テスト内容はモックを生成し投稿記事がホームで表示されるかどうかのテストを行うようにした。

## docker を利用した自動ビルド断念

```
COPY failed: stat app/.next/static: file does not exist
Error: Process completed with exit code 1.
```

というエラーが出てしまった。原因は、つかめていないので、後日調べる。
