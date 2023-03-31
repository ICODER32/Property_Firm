import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from '@apollo/client';
import client from './utils/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <ChakraProvider>

      <App />
    </ChakraProvider>
  </ApolloProvider>

);

serviceWorker.register()