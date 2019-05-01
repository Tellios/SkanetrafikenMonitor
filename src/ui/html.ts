export const html = ({ body }: { body: string }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css">
      <link href="assets/styles.css" rel="stylesheet" type="text/css" />
    </head>
    <body class="body-text">
      <div id="app">${body}</div>
    </body>
  </html>
`;
