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
            <div>
                <h3>Categories</h3>
                <ul>
                    <div>
                        {props.posts
                            .map(({frontMatter: {category}}) => category)
                            .filter((category, index, self) => self.indexOf(category) === index)
                            .map((category) => (
                                <Link key={category} href={`/category/${category}`} passHref>
                                    <li>{category}</li>
                                </Link>
                            ))}
                    </div>
                </ul>
            </div>
        </aside>
    )
}

export default SideBar