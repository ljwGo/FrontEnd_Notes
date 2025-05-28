import React from 'react';
import express from 'express'
import ReactDOMServer from 'react-dom/server';

function App() {
  return (
    <div>
      <p>Hello React</p>
      <p>New line</p>
      <button onClick={() => alert('Hello')}>Click me</button>
    </div>
  );
}

const app = express();

app.use(express.static('./static'))

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>React App</title>
      </head>
      <body>
        <script defer="defer" src="/js/main.75a7573c.js"></script>
        <div id="root">${ReactDOMServer.renderToString(<App />)}</div>
      </body>
    </html>
  `)
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
