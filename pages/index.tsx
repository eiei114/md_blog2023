import Comments from "../pages/components/Comments/Comments";
import Footer from "../pages/components/Footer/footer";
import GoogleAnalytics from "../pages/components/Google/googleAnalytics";
import Header from "../pages/components/Header/header";
import Sidebar from "../pages/components/Sidebar/sidebar";
import {getAllPosts} from "../utils/post-data";
import BlogList from "@/pages/components/BlogList/blogList";

const Home = (props: {
    posts: [
        {
            slug: string
            frontMatter: {
                [key: string]: string
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
                    <Sidebar posts={props.posts}/>
                </div>
            </div>
            <div className="mt-8">
                <Comments/>
            </div>
            <Footer/>
        </div>
    )
}

export async function getStaticProps() {
    const posts = getAllPosts().sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime());
    return {
        props: {
            posts
        },
    }
}

export default Home
