import React from 'react'

const Footer = () => {
    return (
        <footer >
            <p>&copy; {new Date().getFullYear()} Poetic Coding</p>
            <p>
                Built with <span >❤️</span> using Next.js
            </p>
        </footer>
    )
}

export default Footer