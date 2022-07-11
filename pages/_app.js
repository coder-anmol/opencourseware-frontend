import "@fontsource/nunito";
import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "layouts/default";
import ProfileLayout from "layouts/profile";
import AdminLayout from "layouts/admin";
import Theme from "../theme";
import ProgressBar from "nextjs-progressbar";

// ? Register New Layouts Here
const layouts = {
    default: DefaultLayout,
    profile: ProfileLayout,
    admin: AdminLayout,
};

function MyApp({ Component, pageProps }) {
    const layoutName = Component.layout || "default";
    const Layout = layouts[layoutName];

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
