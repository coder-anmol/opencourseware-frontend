import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import useStore from "store";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { checkRole } from "store";

function DashboardLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const user = useStore((state) => state.user);
    const userData = useStore((state) => state.userData);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (userData) {
                if (checkRole(userData, "student")) {
                    setLoading(false);
                } else {
                    swal({
                        icon: "error",
                        title: "Error",
                        text: "You are not a student",
                    });
                    router.push("/");
                }
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
                    {children}
                    <Footer />
                </>
            )}
        </>
    );
}

export default DashboardLayout;
