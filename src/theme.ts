import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    colors: {
        brand: {
            50: '#f0f9f1',
            100: '#dcf1de',
            200: '#b9e3bd',
            300: '#8ccd93',
            400: '#5db369',
            500: '#3d9949',
            600: '#2d7a38',
            700: '#245c2c',
            800: '#1d4723',
            900: '#173a1d',
        },
        gray: {
            50: '#f7f7f7',
            100: '#e3e3e3',
            200: '#c8c8c8',
            300: '#a4a4a4',
            400: '#818181',
            500: '#666666',
            600: '#515151',
            700: '#383838',
            800: '#262626',
            900: '#171717',
        },
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'white',
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold',
                borderRadius: 'md',
            },
            variants: {
                solid: {
                    bg: 'brand.600',
                    color: 'white',
                    _hover: {
                        bg: 'brand.500',
                    },
                },
            },
        },
    },
});

export default theme; 