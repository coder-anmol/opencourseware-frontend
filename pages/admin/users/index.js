import AdminWrapper from "@/components/Admin/AdminWrapper";

const index = () => {
    return (
        <AdminWrapper show={true}>
            <div>Index</div>
        </AdminWrapper>
    );
};

index.layout = "admin";
export default index;
