import AdminWrapper from "@/components/Admin/AdminWrapper";
import Welcome from "@/components/Admin/Welcome";

const Index = () => {
    return (
        <AdminWrapper show={true}>
            <Welcome text={"Teacher."} />
        </AdminWrapper>
    );
};

Index.layout = "teacher";
export default Index;
