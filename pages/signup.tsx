import firebase from "firebase/compat";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { auth } from "@/utils/firebase";

const SignUp: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 既にサインインしている時はサインアップの必要が無いので
    // ログイン後のページに飛ばす
    useEffect(() => {
        auth.onAuthStateChanged((user: firebase.User | null) => {
            user && router.back();
        });
    }, []);

    // 新規ユーザー登録
    const createUser = async (e: FormEvent) => {
        // form の動作を止める
        e.preventDefault();

        try {
            // firebase のユーザー登録用メソッド
            await auth.createUserWithEmailAndPassword(email, password);
            router.back();
        } catch (err: unknown) {
            const {message} = err as { message: string };
            alert(message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">アカウント登録</h1>
            <form className="w-full max-w-sm" onSubmit={createUser}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">メールアドレス:</label>
                    <input
                        id="email"
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">パスワード:</label>
                    <input
                        id="password"
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    登録
                </button>
            </form>
            <Link href="/" className="mt-4 underline">ログイン</Link>
        </div>
    );
};

export default SignUp;