import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";
import { useState, useEffect } from "react";
import useStore from "store";
import { useRouter } from "next/router";

const list = [
    {
        name: "Edit",
        href: "/profile",
    },
    // {
    //     name: "Settings",
    //     href: "/profile/settings",
    // },
];

function ProfileLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const user = useStore((state) => state.user);
    const userData = useStore((state) => state.userData);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (userData) {
                setLoading(false);
            }
        } else {
            router.push("/login");
        }
    }, [user, userData]);

    return (
        <>
            {!loading && (
                <>
                    <Header />
                    <Profile list={list}>{children}</Profile>
                    <Footer />
                </>
            )}
        </>
    );
}

export default ProfileLayout;
