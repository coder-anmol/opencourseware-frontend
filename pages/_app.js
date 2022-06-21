import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "../layouts/default";

// ? Register New Layouts Here
const layouts = {
    default: DefaultLayout,
};

function MyApp({ Component, pageProps }) {
    const layoutName = Component.layout || "default";
    const Layout = layouts[layoutName];

    return (
        <ChakraProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}

export default MyApp;
