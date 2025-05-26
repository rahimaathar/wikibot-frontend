import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <ChatInterface />
      </ChakraProvider>
    </>
  );
}

export default App;
