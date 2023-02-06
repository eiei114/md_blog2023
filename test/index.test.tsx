import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

describe('Home', () => {
  it('renders a list of blog posts', () => {
    const mockPosts = [
      {
        slug: 'sample-post-1',
        frontMatter: {
          title: 'Sample Post 1',
          description: 'This is a sample post 1',
        },
      },
      {
        slug: 'sample-post-2',
        frontMatter: {
          title: 'Sample Post 2',
          description: 'This is a sample post 2',
        },
      },
    ]
    render(<Home posts={mockPosts} />)

    mockPosts.forEach(({ slug, frontMatter: { title, description } }) => {
      const titleElement = screen.getByText(title)
      expect(titleElement).toBeInTheDocument()
      const descriptionElement = screen.getByText(description)
      expect(descriptionElement).toBeInTheDocument()
    })
  })
})
