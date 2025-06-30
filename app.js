const { app, BrowserWindow } = require('electron')
const path = require('path')

if (require('electron-squirrel-startup')) app.quit();

function createWindow () {
const iconPath = process.platform === 'darwin'
    ? path.join(__dirname, 'icons', 'darwin_mac', '1024.icns')
    : process.platform === 'win32'
        ? path.join(__dirname, 'icons', 'win', '128.ico') // Right now 128 is the highest quality
        : path.join(__dirname, 'icons', 'linux', '1024.png');

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
  icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    title: "Proton Mail",
    autoHideMenuBar: true
  })

  mainWindow.loadURL('https://mail.proton.me/')

  mainWindow.webContents.on('page-title-updated', (event) => {
    event.preventDefault();
    mainWindow.setTitle("Proton Mail");
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})