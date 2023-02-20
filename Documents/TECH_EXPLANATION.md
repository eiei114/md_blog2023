# MarkDownブログについて

2023/02/20

## はじめに

このサイトは、Next.jsやTypeScriptの学習を目的として作成されたサイトです。また、Webサービスにおいて最低限必要な機能の実装方法を学習するためにも作成されました。

## 参考にしたサイト

- [Next.js static blog with Markdown and React.js TypeScript/動画](https://youtu.be/vdW1VStKUUU)
- [Build comments section with Next.js and Supabase/ブログ](https://dev.to/hoonweedev/build-comments-section-with-nextjs-and-supabase-1o6c)
- [Next.jsでGoogle Analyticsを使えるようにする/ブログ](https://panda-program.com/posts/nextjs-google-analytics)
- [Next.js（TypeScript）で Firebase を利用し, Google ログインを実装する/ブログ](https://zenn.dev/minguu42/articles/20210717-nextjs-typescript-auth)
- [Next.js (JavaScript/TypeScript) に Tailwind CSS を導入する方法/ブログ](https://fwywd.com/tech/next-tailwind)
- [Next.js使ったプロジェクトでテストを書く](https://zenn.dev/slowhand/articles/7bfe83207b434d)

## サイトの構成

- MarkDownからHTML記事を生成する
- 記事の一覧を表示する
- コメント機能を実装する
- Google Analyticsを導入する
- メールログインを実装する
- 記事のテンプレートをターミナルで作成する

## MarkDownからHTML記事を生成する

### 利用したライブラリ

- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [marked](https://github.com/markedjs/marked)

### gray-matter

MarkDownの記事を読み込むために利用します。MarkDownの記事を読み込むと、MarkDownの記事の中にあるYAML形式のメタデータを取得することができます。

```
---
title: 'はじめに'
date: '2023-02-06T03:07:44.675Z'
category : 'Poem'
description: 'MarkDownブログ作ってみました。'
thumbnail: '/img/blog/sebastiaan-stam-H33IhK53rpg-unsplash.jpg'
---
```

このような形式で書いたものがメタデータとして利用することができ、例に挙げた以外にも`tag: ''`や`subTitle: ''`などの自由な形でメタデータを追加することができます。

### marked

MarkDownの記事をHTMLに変換するために利用します。
[slug].tsx

```
    <div>
        <GoogleAnalytics/>
        <Header/>
        <div className="flex flex-col md:flex-row">
            <div className="md:w-3/4">
                <div className="mt-4">
                    <div dangerouslySetInnerHTML={{__html: marked(props.content)}}/> //ここでMarkDownをHTMLに変換している
                </div>
            </div>
        </div>
        <Footer/>
    </div>
```

## 記事の一覧を表示する

### 利用したライブラリ

- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [fs]()
- [path]()

#### fs

ファイルを読み込むために利用します。
その他にもファイルを作成したり、ファイルの中身を書き換えたりすることができます。

#### path

ファイルのパスを取得するために利用します。
ファイル名やディレクトリ名の取得、パスの解析などができます。

### 投稿記事のメタデータを取得する

```
export const getAllPosts = () => {
    // postsディレクトリの中のファイルを取得
    const files = fs.readdirSync(path.join('posts'))
    return files
        .filter((filename) => filename.includes('.md')) //拡張子がmdのファイルのみを取得
        .map((filename) => {
            const slug = filename.replace('.md', '') //拡張子を取り除き、slugを取得

            const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8') //mdファイルをutf-8で読み込む

            const {data: frontMatter} = matter(markdownWithMeta) //mdファイルの中のメタデータを取得

            return { //slugとメタデータを返す
                slug,
                frontMatter,
            }
        })
}
```

## コメント機能を実装する

### 利用したライブラリ

- [Supabase](https://supabase.io/)
- [SWR](https://swr.vercel.app/)

#### Supabase

Supabaseは、サーバーレスのデータベースです。

#### SWR

SWRは、データの取得や更新を行うためのライブラリです。
保持しているデータが古くなった場合は、自動的にデータを更新してくれます。

### API
[commentApi.ts](https://github.com/eiei114/md_blog2023/blob/07bec0d60fac9432e269519f2db7864d9da9066a/pages/api/comments.ts)

### コメントの投稿

```
const addCommentRequest = (url: string, data: any) =>
    fetch(url, {
        method: "POST", // ポストメソッドを指定
        headers: {"Content-Type": "application/json"}, // ヘッダーを指定(送られるデータがJSONであることを指定)
        body: JSON.stringify(data), // ボディーにJSON文字列を指定(送信するデータ)
    }).then((res) => res.json()); 
```

```
const onSubmit = async (event: FormEvent<HTMLFormElement>) => { //コメントを投稿する
        event.preventDefault(); //ページ遷移を防ぐ
        const newComment = { //コメントのデータを作成
            username: username === "" ? "anonymous" : username, //名前が空の場合はanonymousを入れる
            payload: comment, //コメントの内容
            reply_of: replyOf, //返信先のコメントのid
        };
        if (typeof commentList !== "undefined") {
            mutate("/api/comments", [...commentList, newComment], false); //コメントの一覧を更新
            const response = await addCommentRequest("/api/comments", newComment);
            if (response && response[0] && response[0].created_at) {
                mutate("/api/comments");
                window.alert("Hooray!");
            }
            //投稿したらフォームを空にする
            setComment(""); //コメントの内容を空にする
            setUsername(""); //名前を空にする
        }
    };
```

```
                    <form onSubmit={onSubmit} className="flex flex-col mb-4"> //発火ポイント
                        {replyOf && (
                            <div className="flex items-center">
                                <p className="mr-4">
                                    Reply of: {commentList?.find((comment) => comment.id === replyOf)?.payload ?? ""} //返信先のコメントの内容
                                </p>
                                <button onClick={() => setReplyOf(null)} className="btn btn-sm"> //返信先を解除する
                                    Cancel
                                </button>
                            </div>
                        )}
                        <input className="border p-2 mb-4" onChange={onUsernameChange} value={username} type="text"
                               placeholder="The default name is 'anonymous'"/> //名前の入力フォーム
                        <input className="border p-2 mb-4" onChange={onChange} value={comment} type="text"
                               placeholder="Add a comment"/> //コメントの入力フォーム
                        <button className="bg-blue-500 text-white p-2 rounded">Submit</button>
                    </form>

```


### コメント削除

```
const deleteCommentRequest = (url: string, id: string) =>
    fetch(`${url}?comment_id=${id}`, {method: "DELETE"}).then((res) => res.json());
```

```
    const confirmDelete = async (id: string) => {
        const ok = window.confirm("Delete comment?");
        if (ok && typeof commentList !== "undefined") {
            mutate(
                "/api/comments",
                commentList.filter((comment) => comment.id !== id),
                false //コメントリストの再取得を遅らせる
            );
            const response = await deleteCommentRequest("/api/comments", id); //コメントを削除をリクエスト
            if (response && response[0] && response[0].created_at) {
                mutate("/api/comments");
                window.alert("Deleted Comment :)");
            }
        }
    };
```

```
 <div className="flex">
      <>{(currentUser.email === "ekawano114@gmail.com" ? ( //ログインしているユーザーが管理者の場合表示させる
       <button type="button" onClick={() => confirmDelete(comment.id)}
               className="bg-red-500 text-white p-2 mr-2 rounded">
               Delete
       </button>
```

### コメントリストの更新

```
const fetcher = (url: string) => fetch(url, {method: "GET"}).then((res) => res.json()); //
```

```
    const {data: commentList, error: commentListError} = useSWR<CommentParams[]>("/api/comments", fetcher); //コメントの一覧を取得。データが古くなった場合は自動的に更新する
```

```
 <div className="flex flex-col">
                    {(commentList ?? []) //コメントリストが存在する場合
                        .sort((a, b) => { //コメントの作成日時でソート
                            const aDate = new Date(a.created_at);
                            const bDate = new Date(b.created_at);
                            return +aDate - +bDate;
                        }).map((comment) => ( //コメントの一覧を表示
                            <div key={comment.id} className="border border-gray-200 rounded p-4 mb-4">
                                {comment.reply_of &&
                                    <p className="text-sm mb-2">
                                        Reply of: {commentList?.find((c) => c.id === comment.reply_of)?.payload ?? ""}
                                    </p>
                                }
                                <p className="mb-2">
                                    {comment.username} - ID:{comment.id} - {comment.created_at} //コメントの作成日時
                                </p>
                                <div className="flex flex-col">
                                        <p className="mb-2">{comment.payload}</p> //コメントの内容
```

### 記事のテンプレートをターミナルで作成する
[post.py](https://github.com/eiei114/md_blog2023/blob/07bec0d60fac9432e269519f2db7864d9da9066a/post.py)
```
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

ターミナルで以下のコマンドを実行する
```
python post.py
```
実行結果
以下のようなフロントマターが記載されたmdファイルが作成される
```
---
title: 'テスト'
date: '2023-02-20T12:03:36.795628'
category: 'テスト'
description: 'テスト'
thumbnail: '/img/blog/'
---
```

## 自動テスト
[blogList.test](https://github.com/eiei114/md_blog2023/blob/07bec0d60fac9432e269519f2db7864d9da9066a/test/blogList.test.tsx)

### テストの実行
- dockerでビルド
- dockerでテストを実行

### テスト内容
モックを用意して正確に処理をされているかを確認する
