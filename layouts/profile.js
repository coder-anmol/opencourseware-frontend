import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";

const list = [
    {
        name: "Edit",
        href: "/profile",
    },
    {
        name: "Settings",
        href: "/profile/settings",
    },
];

function ProfileLayout({ children }) {
    return (
        <>
            <Header />
            <Profile list={list}>{children}</Profile>
            <Footer />
        </>
    );
}

export default ProfileLayout;
