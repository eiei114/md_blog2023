import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SideBar from '../pages/components/Sidebar/sidebar'

describe('SideBar', () => {
    it('renders a list of categories', () => {
        const mockPosts = [{frontMatter: {category: 'Programming',},}, {frontMatter: {category: 'Design',},}, {frontMatter: {category: 'Programming',},}, {frontMatter: {category: 'Photography',},},]
        render(<SideBar posts={mockPosts}/>)

        const uniqueCategories = [...new Set(mockPosts.map(post => post.frontMatter.category))]

        uniqueCategories.forEach(category => {
            const categoryElement = screen.getByText(category)
            expect(categoryElement).toBeInTheDocument()
        })
    })

    it('does not render anything if no posts are provided', () => {
        render(<SideBar posts={null}/>)
        const sidebarElement = screen.queryByRole('complementary')
        expect(sidebarElement).not.toBeInTheDocument()
    })
})

