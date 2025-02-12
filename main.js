const path = require("path");
const { app, BrowserWindow, ipcMain, desktopCapturer, dialog } = require("electron");
const fs = require("fs");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 550,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.removeMenu();
  win.loadFile("index.html");
  //win.webContents.openDevTools();
  
  ipcMain.on("load-page", (event, page) => {
    win.loadFile(page);
  });  

  ipcMain.on("capture-screenshot", async () => {
    try {
      const screenshotPath = await captureScreenshot();
      win.webContents.send('screenshot-saved', screenshotPath);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });


}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

function captureScreenshot() {
  return new Promise((resolve, reject) => {
    win.capturePage().then(image => {
      //Save screenshot to a file
      const filePath = path.join(app.getPath('downloads'), 'screenshot.png');
      const imageBuffer = image.toPNG();
      fs.writeFileSync(filePath, imageBuffer);  //Save screenshot to disk
      resolve(filePath);  //Return saved screenshot file path
    }).catch(err => {
      console.error('Error capturing the application window:', err);
      reject('Error capturing the application window');
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});