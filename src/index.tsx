
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './styles.css'
import ReactDOM from 'react-dom/client';
import React from 'react';

const theme = extendTheme({
  styles: {
    global: {
      color: 'blue.900'
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} cssVarsRoot={undefined}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);


