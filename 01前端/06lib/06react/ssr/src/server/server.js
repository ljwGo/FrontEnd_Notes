import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../client/App';
import About from '../compoents/About';
import AboutPropsProvider from '../provider/AboutPropsProvider';

const app = express()
app.use(express.static('public'))

app.get(/.*/, async (req, res) => {
  const initProps = await About.getInitProps();

  // 将数据注入服务端预渲染
  const renderStr = renderToString(
    <StaticRouter location={req.url}>
      <AboutPropsProvider value={initProps}>
        <App />
      </AboutPropsProvider>
    </StaticRouter>
  )

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR</title>
        <script defer="defer" src="/bundle.js"></script>
      </head>
      <body>
        <div id="root">${renderStr}</div>
        <textarea id="ssr-hydrate-data" style="display:none">${JSON.stringify(initProps)}</textarea>
      </body>
    </html>
  `)
})

const PORT = 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))