---
title: 'Dockerが起動しないバグについて'
date: '2023-02-07T07050:44.675Z'
description: 'Dockerが起動しないバグについてリンクをまとめてみます。'
thumbnail: '/img/blog/sebastiaan-stam-H33IhK53rpg-unsplash.jpg'
---
[Zenn](https://zenn.dev/keisuke114)
# Dockerが起動しないバグについて

## 症状
docker-compose up -d --build で以下のエラーが出る件について。
どちらかが解消すると、もう一方が出る。という無限地獄に陥っていってた。

>- Error response from daemon: open \\.\pipe\docker_engine_linux: The system cannot find the file specified.
>- docker endpoint for "default" not found.


## とりあえず探索したリンクをまとめる
- https://wp.kobore.net/%E6%B1%9F%E7%AB%AF%E3%81%95%E3%82%93%E3%81%AE%E6%8A%80%E8%A1%93%E3%83%A1%E3%83%A2/post-1989/
- https://qiita.com/noname_303/items/d025cf8ac816167fbe1f
- https://stackoverflow.com/questions/74804296/docker-endpoint-for-default-not-found
- https://qiita.com/kooohei/items/0e788a2ce8c30f9dba53

## 解決策

### Error response from daemon: open \\.\pipe\docker_engine_linux: The system cannot find the file specified. エラーの解決策
Dockerの再起動で解決した。

### docker endpoint for "default" not found.エラーの解決策
`C:\Users\(username)\.docker`ディレクトリを削除して、Dockerを再起動すると解決した。

#### 再起動方法
画面上の青いバーの設定マークの左隣にあるバグアイコンをクリックするとリスタートメニューが出てくるので、そこから再起動する。
![image](/img/blog/スクリーンショット 2023-02-07 072445.jpg)