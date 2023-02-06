---
title: 'ブログ追加機能'
date: '2023-02-06T15:30:44.675Z'
description: 'ブログ追加機能について'
thumbnail: '/img/blog/sebastiaan-stam-H33IhK53rpg-unsplash.jpg'
---
[Zenn](https://zenn.dev/keisuke114)
# はじめに

先日、というか今日の早朝ごろにMarkDownブログを作成した。起きてまた数時間触った成果について書いていく。

## 追加したこと
- eslintルールの追加
- prettierの追加
- PR時に自動テストを行うようにした。
- dockerを利用した自動ビルド断念

## eslintやprettierの追加について

eslintやprettierは今まで使っていなかったので、今回の機会に使ってみた。
eslintは、コードの品質を保つために使う。prettierは、コードのフォーマットを整えるために使う。

eslintのルールの制約を外部から適当にとってきて、それを使うことにした。
importの順番を変えるというエラー解除に時間がかかってしまった。(なにもeslintのことを知らずに入れていたため)

## PR時に自動テストを行うようにした。

テスト内容はモックを生成し投稿記事がホームで表示されるかどうかのテストを行うようにした。

## dockerを利用した自動ビルド断念

```
COPY failed: stat app/.next/static: file does not exist
Error: Process completed with exit code 1.
```
というエラーが出てしまった。原因は、つかめていないので、後日調べる。