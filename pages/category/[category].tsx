import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from "next/link";
import React from 'react'
import Footer from "@/pages/components/Footer/footer";
import Header from "@/pages/components/Header/header";
import Sidebar from "@/pages/components/Sidebar/sidebar";
import styles from "@/styles/Home.module.css";

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

const getAllPosts = () => {
    const files = fs.readdirSync(path.join('posts'))
    return files
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
}

export async function getStaticPaths() {
    const allPosts = getAllPosts();

    const paths = allPosts.map(({frontMatter: {category}}) => category)
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
    const allPosts = getAllPosts();
    const posts = allPosts.filter(({frontMatter: {category: postCategory}}) => postCategory === category)

    return {
        props: {
            posts,
            allPosts,
        },
    }
}