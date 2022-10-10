import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles:{
    global:{
      color: 'blue.900'
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider >
    <App />
  </ChakraProvider>
);
