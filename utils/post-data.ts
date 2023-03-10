import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getAllPosts = () => {
    const files = fs.readdirSync(path.join('posts'))
    return files
        .filter((filename) => filename.includes('.md'))
        .map((filename) => {
            const slug = filename.replace('.md', '')

            const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

            const {data: frontMatter} = matter(markdownWithMeta)

            return {
                slug,
                frontMatter,
            }
        })
}
