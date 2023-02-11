import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import React from 'react'
import Header from "@/pages/components/Header/header";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Sidebar from "@/pages/components/Sidebar/sidebar";
import Footer from "@/pages/components/Footer/footer";

const CategoryPost = (props: {
    posts: [
        {
            slug: string
            frontMatter: { [key: string]: string }
        }
    ],
    allPosts: [
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
                    <Sidebar posts={props.allPosts}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CategoryPost

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))
    const posts = files
        .filter((filename) => filename.includes('.md'))
        .map((filename) => {
            const slug = filename.replace('.md', '')

            const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

            const {data: frontMatter} = matter(markdownWithMeta)

            return {
                slug,
                frontMatter,
            }
        })

    const paths = posts.map(({frontMatter: {category}}) => category)
        .filter((category, index, self) => self.indexOf(category) === index)
        .map((category) => ({
            params: {
                category: category,
            }
        }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params: {category}}: { params: { category: string } }) {
    const files = fs.readdirSync(path.join('posts'))
    const allPosts = files
        .filter((filename) => filename.includes('.md'))
        .map((filename) => {
            const slug = filename.replace('.md', '')

            const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

            const {data: frontMatter} = matter(markdownWithMeta)

            return {
                slug,
                frontMatter,
                category
            }
        })

    const posts = allPosts.filter(({frontMatter: {category: postCategory}}) => postCategory === category)

    return {
        props: {
            posts,
            allPosts,
        },
    }
}