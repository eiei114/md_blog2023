import Link from "next/link";
import React from 'react'

const SideBar = (props: {
    posts: [{
        frontMatter: { [key: string]: string }
    }] | null
}) => {
    if (!props.posts) {
        return null;
    }
    return (
        <aside>
            <div className="w-full lg:w-1/4 lg:px-4">
                <h3 className="text-lg font-medium">Categories</h3>
                <ul className="mt-4">
                    <div>
                        {props.posts
                            .map(({frontMatter: {category}}) => category)
                            .filter((category, index, self) => self.indexOf(category) === index)
                            .map((category) => (
                                <Link key={category} href={`/category/${category}`} passHref>
                                    <li className="my-2">{category}</li>
                                </Link>
                            ))}
                    </div>
                </ul>
            </div>
        </aside>
    )
}

export default SideBar