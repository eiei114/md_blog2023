import Link from 'next/link'

const Header = () => {
    return (
        <header className="bg-gray-900 text-white py-6">
            <h1 className="text-2xl font-medium mx-auto max-w-sm ">Poetic Coding</h1>
            <nav className="flex justify-center mt-4">
                <Link href="/" className="px-4 text-white hover:bg-gray-800">
                    Home
                </Link>
                <Link href="/about" className="px-4 text-white hover:bg-gray-800 ml-4">
                    About
                </Link>
            </nav>
        </header>
    )
}

export default Header
