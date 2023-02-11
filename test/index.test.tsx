import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from './Home'

const samplePosts = [
  {
    slug: 'post-1',
    frontMatter: {
      title: 'Post 1',
      description: 'This is the first post',
      date: '2021-01-01'
    }
  },
  {
    slug: 'post-2',
    frontMatter: {
      title: 'Post 2',
      description: 'This is the second post',
      date: '2021-02-01'
    }
  }
]

describe('Home', () => {
  it('renders the correct number of posts', () => {
    render(<Home posts={samplePosts} />)

    const postTitles = screen.getAllByRole('heading', { level: 5 })
    expect(postTitles).toHaveLength(2)
  })

  it('renders the correct post titles', () => {
    render(<Home posts={samplePosts} />)

    const postTitles = screen.getAllByRole('heading', { level: 5 })
    expect(postTitles[0]).toHaveTextContent('Post 2')
    expect(postTitles[1]).toHaveTextContent('Post 1')
  })
})
