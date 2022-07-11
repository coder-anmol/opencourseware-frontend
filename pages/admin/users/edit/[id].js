import { withRouter } from "next/router";

const EditId = ({ router }) => {
    return <div>Index: {router.query.id}</div>;
};

const page = withRouter(EditId);
page.layout = "admin";
export default page;
