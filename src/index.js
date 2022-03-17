import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

import Fonts from './fonts';
import theme from './theme';

import 'fontsource-inter/500.css';

ReactDOM.render(
  <ChakraProvider theme={extendTheme(theme)}>
    <Fonts />
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
