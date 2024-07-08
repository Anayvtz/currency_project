
export function createWindow(tableHTML) {
    let newWindow = window.open('', '_blank', 'location=yes,toolbar=yes,directories=yes,status=yes,menubar=yes,scrollbar=yes');
    newWindow.document.open();
    newWindow.document.write(`
        <html>
        <head>
        <title>table of winnings</title>
        <style>
        body {
        /* display:flex;
        justify-content: center;
        align-items: center; */
        height:100vh;
        margin:0;
        font-family:arial;
        }
        table {
        border-collapse:collapse;
        width:80%;
        max-width:800px;
        text-align: center;
        }
        th,td {
        padding:10px;
        border: 1px solid navy;
        }
        th {
        background-color: lightskyblue;
        }
        </style>
        </head>
        <body>
        ${tableHTML}
        </body>
        </html>`);
    newWindow.document.close();
}