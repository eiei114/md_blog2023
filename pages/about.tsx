import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from 'react';
import Footer from "../pages/components/Footer/footer";
import Header from "../pages/components/Header/header";
import Sidebar from "../pages/components/Sidebar/sidebar";

const AboutPage = (props: {
    posts: [
        {
            slug: string
            frontMatter: { [key: string]: string }
        }
    ]
}) => {
    /* eslint-disable */
    return (
        <div>
            <Header/>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 p-4">
                    <h2 className="font-bold text-lg">このブログについて</h2>
                    <p>このブログは、大学生であり、主にUnityエンジニアを主戦場としている自分のブログです。</p>
                    <p>最近はNextjs,TypeScriptなどを利用してwebアプリを作ることにハマっています。技術検証系のコミュニティ"MidraLab"を知り合いと立ち上げました。</p>
                    <p>このブログでは、技術的な内容や自分自身の近況などを投稿しています。</p>
                    <p>また、このブログはNextjsを利用して作成しています。Nextjsの学習のために作成したブログです。</p>
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <h2 className="font-bold text-lg">表示内容</h2>
                    <ul>
                        <li>この記事の説明</li>
                        <li>ちょっとしたバグや気づきなどの技術記事</li>
                        <li>自分自身の近況を投稿</li>
                        <li>その他メモ</li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <h2 className="font-bold text-lg">自己紹介</h2>
                    <p>私は大学生であり、主にUnityエンジニアを主戦場としています。最近はNextjs,TypeScriptなどを利用してwebアプリを作ることにハマっています。技術検証系のコミュニティ"MidraLab"を知り合いと立ち上げました。</p>
                </div>
            <div className="md:w-1/4">
                    <Sidebar posts={props.posts}/>
                </div>
            </div>

            <Footer/>
        </div>
    );
};
/* eslint-enable */
export async function getStaticProps() {
    // postsディレクトリのファイルを取得
    const files = fs.readdirSync(path.join('posts'))

    const posts = files
        .filter((filename) => filename.includes('.md'))
        .map((filename) => {
            // ファイル名から拡張子を除いたものをslugとする
            const slug = filename.replace('.md', '')

            const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

            const {data: frontMatter} = matter(markdownWithMeta)

            return {
                slug,
                frontMatter,
            }
        })
        .sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime())

    return {
        props: {
            posts,
        },
    }
}

export default AboutPage;
