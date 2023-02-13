import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from 'next/link'
import Comments from "../pages/components/Comments/Comments";
import Footer from "../pages/components/Footer/footer";
import Header from "../pages/components/Header/header";
import Sidebar from "../pages/components/Sidebar/sidebar";

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

export default Home
