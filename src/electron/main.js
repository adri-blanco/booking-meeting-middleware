const { app, BrowserWindow } = require('electron');

let window = null;

function createWindow() {
  const startUrl = 'http://localhost:3000';
  window = new BrowserWindow({
    width: 800,
    height: 600,
  });
  window.loadURL(startUrl);
  window.webContents.openDevTools()

  window.on('closed', function () {
    window = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});