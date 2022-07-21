import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState, useEffect } from "react";

const EditId = ({ router }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [router.query.id]);

    return (
        <>
            <AdminLoader isLoading={loading} />
            <AdminWrapper show={!loading}>
                <div>Index: {router.query.id}</div>
                <Link href={`/admin/users/edit/${new Date().toISOString()}`}>
                    <Button>Next Page</Button>
                </Link>
            </AdminWrapper>
        </>
    );
};

const page = withRouter(EditId);
page.layout = "admin";
export default page;
