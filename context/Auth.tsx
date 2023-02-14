import { FC, createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import firebase from "firebase/compat";

type AuthContextProps = {
    currentUser: firebase.User | null | undefined;
    email: string | null;
};

const AuthContext = createContext<AuthContextProps>({
    currentUser: undefined,
    email: null,
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<
        firebase.User | null | undefined
    >(undefined);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged((user: firebase.User | null) => {
            setCurrentUser(user);
            setEmail(user?.email || null);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, email }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
