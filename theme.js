import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

const Theme = extendTheme({
    fonts: {
        ...ChakraTheme.fonts,
        // body: `"Open Sans","Segoe UI",sans-serif`,
        // heading: `"Open Sans","Segoe UI",sans-serif`,
        body: `"Nunito","Segoe UI",sans-serif`,
        heading: `"Nunito","Segoe UI",sans-serif`,
    },
    colors: {
        primary: "#0d6efd",
        secondary: "#6c757d",
        success: "#198754",
        info: "#0dcaf0",
        warning: "#ffc107",
        danger: "#dc3545",
        light: "#f8f9fa",
        dark: "#212529",
    },
});

export default Theme;
