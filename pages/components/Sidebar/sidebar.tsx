import React from 'react'
import Link from "next/link";

const SideBar = (props: {
    posts: [{
        frontMatter: { [key: string]: string }
    }]
}) => {
    return (
        <aside>
            <div>
                <h3>Categories</h3>
                <ul>
                    <div>
                        {
                            //重複させない
                            props.posts
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