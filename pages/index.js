import Head from 'next/head'
import React from 'react'
import styles from '../styles/Index.module.css'

import User from '../components/user.js'
import Queue from '../components/queue.js'

export default function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Canvasser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <User 
        canvasUrl={ process.env.NEXT_PUBLIC_CANVAS_URL }
        apiKey={ process.env.NEXT_PUBLIC_API_KEY } />
      <Queue 
        canvasUrl={ process.env.NEXT_PUBLIC_CANVAS_URL }
        apiKey={ process.env.NEXT_PUBLIC_API_KEY } />
    </React.Fragment>
  )
}
