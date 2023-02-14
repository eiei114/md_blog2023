import Link from "next/link";
import React, { FC } from 'react'

interface SideBarProps {
    posts: {
        frontMatter: {
            [key: string]: string;
            category: string;
        };
    }[] | null;
}

const SideBar: FC<SideBarProps> = ({ posts }) => {
    if (!posts) {
        return null;
    }
    const categories = posts
        .map(({ frontMatter: { category } }) => category)
        .filter((category, index, self) => self.indexOf(category) === index);

    return (
        <aside>
            <div className="w-full lg:w-1/4 lg:px-4">
                <h3 className="text-lg font-medium">Categories</h3>
                <ul className="mt-4">
                    <div>
                        {categories.map((category) => (
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

export default SideBar;
