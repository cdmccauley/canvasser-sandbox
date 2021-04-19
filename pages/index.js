import Head from 'next/head'
import React, { useState } from 'react'
import styles from '../styles/Index.module.css'

import {
  Container,
  Switch,
  createMuiTheme,
  ThemeProvider,
  CssBaseline
} from '@material-ui/core';

import User from '../components/user.js'
import Queue from '../components/queue.js'

export default function Index() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  // may change Container to Box when working on nav
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Canvasser</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CssBaseline />
      <Container style={{ height: '100vh' }}>
        <User 
          canvasUrl={ process.env.NEXT_PUBLIC_CANVAS_URL }
          apiKey={ process.env.NEXT_PUBLIC_API_KEY } />
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <Queue 
          canvasUrl={ process.env.NEXT_PUBLIC_CANVAS_URL }
          apiKey={ process.env.NEXT_PUBLIC_API_KEY } />
      </Container>
    </ThemeProvider>
  )
}
