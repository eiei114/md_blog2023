import {getAuth, signOut} from "firebase/auth";
import Link from "next/link";
import {FC, useContext} from "react";
import {AuthContext} from "@/context/Auth";

const Header: FC = () => {
    const {currentUser} = useContext(AuthContext);

    const handleSignOut = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="bg-gray-900 text-white py-6">
            <h1 className="text-2xl font-medium mx-auto max-w-sm ">Poetic Coding</h1>
            <nav className="flex justify-center flex-wrap mt-4">
                <Link href="/" className="px-4 text-white hover:bg-gray-800">
                    Home
                </Link>
                <Link href="/about" className="px-4 text-white hover:bg-gray-800 ml-4">
                    About
                </Link>
                <Link href="/disclaimer" className="px-4 text-white hover:bg-gray-800 ml-4">
                    Disclaimer
                </Link>
                {!currentUser && (
                    <div className="text-center py-2 text-red-500 w-full">
                        ログインするとコメントが投稿できます！
                    </div>
                )}
                <div className="ml-auto">
                    {!currentUser ? (
                        <>
                            <Link href="/signin" className="px-4 text-white hover:bg-gray-800">
                                SignIn
                            </Link>
                            <Link href="/signup" className="px-4 text-white hover:bg-gray-800 ml-4">
                                SignUp
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleSignOut}
                            className="px-4 text-white hover:bg-gray-800"
                        >
                            Sign Out
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
