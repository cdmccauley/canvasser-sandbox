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

import Key from '../components/key.js'
import User from '../components/user.js'
import Queue from '../components/queue.js'

export default function Index() {
  const [darkMode, setDarkMode] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false)
  const [canvasUrl, setCanvasUrl] = useState(null)
  const [apiKey, setApiKey] = useState(null)
  // const [priorities, setPriorities] = useState([[]]);

  // https://material.io/design/color/the-color-system.html#tools-for-picking-colors
  // https://material-ui.com/customization/color/#playground
  // https://imagecolorpicker.com/
  // https://hexcolor.co/
  const theme = createMuiTheme({
    palette: darkMode ? {
      type: 'dark',
      primary: {
        main: '#383434',
      },
      secondary: {
        main: '#68a7de',
      },
    } :
    {
      type: 'light'
    }
  })

  // may change Container to Box when working on nav
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <title>Canvasser</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CssBaseline />
      <Container>
        <Key 
          loggedIn={ loggedIn }
          onLogin={ setLoggedIn }/>
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
