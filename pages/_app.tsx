import '../styles/globals.css'
import type {AppProps} from 'next/app'
import React from "react";
import {usePageView} from "../hooks/usePageView";
import {AuthProvider} from "@/context/Auth";

const MyApp = ({ Component, pageProps }: AppProps) => {
    usePageView();
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default MyApp
