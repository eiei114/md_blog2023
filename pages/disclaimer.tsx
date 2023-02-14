import React from "react";
import GoogleAnalytics from "@/pages/components/Google/googleAnalytics";
import Header from "@/pages/components/Header/header";
import Footer from "@/pages/components/Footer/footer";

const Disclaimer = () => {
    return (
        <div>
            <GoogleAnalytics/>
            <Header/>
        <div className="text-sm text-gray-500 mb-4">
            <p className="mb-2">
                このウェブサイトはFirebaseによるメール認証を実装しています。FirebaseはGoogle社が提供するクラウドサービスであり、
                利用者のメールアドレスを含む個人情報がFirebaseによって収集されることがあります。
            </p>
            <p className="mb-2">
                このウェブサイトの管理者は、Firebaseによるメール認証によって取得された利用者のメールアドレスを利用して、
                利用者に対して情報提供、および本ウェブサイト内でのコミュニケーションに利用することがあります。
            </p>
            <p>
                利用者は、Firebaseによるメール認証を行うことによって、上記に記載された利用目的について同意したものとみなされます。
            </p>
        </div>
            <Footer/>
        </div>
    );
};

export default Disclaimer;