import "@fontsource/open-sans";
import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "../layouts/default";
import Theme from "../theme";
import ProgressBar from "nextjs-progressbar";

// ? Register New Layouts Here
const layouts = {
    default: DefaultLayout,
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
