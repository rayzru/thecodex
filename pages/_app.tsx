import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../config/theme';
import Defaults from '../styles/default';
import Reset from '../styles/reset';

export default class extends App {
  public render() {
    const { Component, pageProps }: any = this.props;
    return (
      <>
        <Reset />
        <Defaults />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
