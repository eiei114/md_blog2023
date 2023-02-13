import Link from "next/link";
import React from 'react'
import Footer from "@/pages/components/Footer/footer";
import Header from "@/pages/components/Header/header";
import Sidebar from "@/pages/components/Sidebar/sidebar";
import {getAllPosts} from "@/utils/post-data";

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
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/4">
                    {props.posts.map(({slug, frontMatter: {title, description}}) => (
                        <Link
                            className="flex flex-col items-center mb-6"
                            key={slug}
                            href={`/blog/${slug}`}
                            passHref
                        ><h5 className="text-lg font-medium">{title}</h5>
                            <p className="text-sm text-gray-700">{description}</p>
                            <hr className="w-full border-gray-300 border-t mt-2 mb-6"/>
                        </Link>
                    ))}
                </div>
                <div className="md:w-1/4">
                    <Sidebar posts={props.allPosts}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CategoryPost

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