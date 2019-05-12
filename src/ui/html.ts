function generateScriptTags(scripts: string[]): string {
  return scripts
    .map(script => `<script src="${script}" type="module"></script>`)
    .join("\n");
}

export const html = ({
  body,
  scripts = []
}: {
  body: string;
  scripts?: string[];
}) => `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css">
      <link href="/assets/styles.css" rel="stylesheet" type="text/css" />
      ${generateScriptTags(scripts)}
    </head>
    <body class="body-text">
      <div id="app">${body}</div>
    </body>
  </html>
`;
