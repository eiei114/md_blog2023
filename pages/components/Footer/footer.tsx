const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Poetic Coding</p>
            <p className="text-sm">
                Built with <span className="text-red-500">❤️</span> using Next.js
            </p>
        </footer>
    )
}

export default Footer