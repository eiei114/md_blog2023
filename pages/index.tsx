import styles from '../styles/Home.module.css'
import Footer from "@/pages/components/Footer/footer";
import Header from "@/pages/components/Header/header";
import Sidebar from "@/pages/components/Sidebar/sidebar";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from 'next/link'
import React from "react";

const Home = (props: {
    posts: [
        {
            slug: string
            frontMatter: { [key: string]: string }
        }
    ]
}) => {
    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <div>
                    {props.posts.map(({slug, frontMatter: {title, description}}) => (
                        <Link key={slug} href={`/blog/${slug}`} passHref>
                            <h5>{title}</h5>
                            <p>{description}</p>
                            <hr/>
                        </Link>
                    ))}
                </div>
                <div className={styles.sidebar}>
                    <Sidebar posts={props.posts}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export async function getStaticProps() {
  // postsディレクトリのファイルを取得
  const files = fs.readdirSync(path.join('posts'))

  const posts = files
    .filter((filename) => filename.includes('.md'))
    .map((filename) => {
      // ファイル名から拡張子を除いたものをslugとする
      const slug = filename.replace('.md', '')

      const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

      const { data: frontMatter } = matter(markdownWithMeta)

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

export default Home
