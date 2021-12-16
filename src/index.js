import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './App';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

import theme from './theme'

import "fontsource-inter/500.css";

ReactGA.initialize('G-ZGH8P3T8L3');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <ChakraProvider theme={extendTheme(theme)} >
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);