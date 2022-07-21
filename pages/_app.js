import "@fontsource/nunito";
import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "layouts/default";
import ProfileLayout from "layouts/profile";
import AdminLayout from "layouts/admin";
import WatchCourseLayout from "layouts/watchCourse";
import Theme from "../theme";
import ProgressBar from "nextjs-progressbar";
import { useEffect } from "react";
import useStore from "store";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";

// ? Register New Layouts Here
const layouts = {
    default: DefaultLayout,
    profile: ProfileLayout,
    admin: AdminLayout,
    watchcourse: WatchCourseLayout,
};

function MyApp({ Component, pageProps }) {
    const layoutName = Component.layout || "default";
    const Layout = layouts[layoutName];
    const user = useStore((state) => state.user);
    const setUserData = useStore((state) => state.setUserData);
    const setUser = useStore((state) => state.setUser);

    useEffect(() => {
        // refresh access token
        if (user) {
            Axios.post("auth/refresh/", {
                refresh: user.refresh,
            })
                .then((res) => {
                    setUser({
                        access: res.data.access,
                        refresh: user.refresh,
                    });

                    // fetching user data
                    Axios.get("users/current-user").then((res) => {
                        setUserData(res.data);
                    });
                })
                .catch((err) => {
                    setUser(null);
                    swal({
                        icon: "error",
                        title: "Invalid Token",
                        text: "Your auth token is expired or invalid, Please Login Again",
                    });
                });
        }
    }, []);

    return (
        <ChakraProvider theme={Theme}>
            <ProgressBar
                color="black"
                options={{ showSpinner: false }}
                height={2}
            />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}

export default MyApp;
