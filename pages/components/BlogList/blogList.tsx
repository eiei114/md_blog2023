import Link from 'next/link';
import {FC} from "react";

interface BlogListProps {
    posts: {
        slug: string;
        frontMatter: {
            [key: string]: string;
        };
    }[];
}

const BlogList: FC<BlogListProps> = ({posts}) => {
    if (!posts || posts.length === 0) {
        return <p>No posts found.</p>;
    }
    return (
        <div className="md:w-3/4">
            {posts.map(({slug, frontMatter: {title, description}}) => (
                <Link
                    className="flex flex-col items-center mb-6"
                    key={slug}
                    href={`/blog/${slug}`}
                    passHref
                >
                    <h5 className="text-lg font-medium">{title}</h5>
                    <p className="text-sm text-gray-700">{description}</p>
                    <hr className="w-full border-gray-300 border-t mt-2 mb-6"/>
                </Link>
            ))}
        </div>
    );
};

export default BlogList;
