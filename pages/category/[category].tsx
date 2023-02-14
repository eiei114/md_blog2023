import React from 'react'
import BlogList from "@/pages/components/BlogList/blogList";
import Footer from "@/pages/components/Footer/footer";
import Header from "@/pages/components/Header/header";
import Sidebar from "@/pages/components/Sidebar/sidebar";
import {getAllPosts} from "@/utils/post-data";
import GoogleAnalytics from "pages/components/Google/googleAnalytics";

const CategoryPost = (props: {
    posts: [
        {
            slug: string
            frontMatter: { [key: string]: string }
        }
    ],
    allPosts: [
        {
            frontMatter: { [key: string]: string
            category: string
            };
        }
    ]
}) => {
    return (
        <div>
            <GoogleAnalytics/>
            <Header/>
            <div className="flex flex-col md:flex-row">
                <BlogList posts={props.posts}/>
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