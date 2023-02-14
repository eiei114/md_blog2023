import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {marked} from 'marked'
import Image from 'next/image'
import React from 'react'
import Footer from "@/pages/components/Footer/footer";
import Header from "@/pages/components/Header/header";
import GoogleAnalytics from "pages/components/Google/googleAnalytics";

const BlogPost = (props: { frontMatter: { [key: string]: string }; slug: string; content: string }) => (
    <div>
        <GoogleAnalytics/>
        <Header/>
        <div className="flex flex-col md:flex-row">
            <div className="md:w-3/4">
                <Image src={props.frontMatter.thumbnail} alt={props.frontMatter.title} className="object-cover w-full h-64 md:h-128"/>
                <div className="mt-4">
                    <div dangerouslySetInnerHTML={{__html: marked(props.content)}} />
                </div>
            </div>
        </div>
        <Footer/>
    </div>
)

export default BlogPost

export async function getStaticPaths() {

    const files = fs.readdirSync(path.join('posts'))

    const paths = files
        .filter((filename) => filename.includes('.md'))
        .map((filename) => ({
            params: {
                slug: filename.replace('.md', ''),
            },
        }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params: {slug}}: never) {
    const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')

    const {data: frontMatter, content} = matter(markdownWithMeta)

    return {
        props: {
            frontMatter,
            slug,
            content,
        },
    }
}
