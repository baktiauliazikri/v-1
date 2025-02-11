const path = require("path");
const { app, BrowserWindow, ipcMain, desktopCapturer, dialog } = require("electron");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 550,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.removeMenu();
  mainWindow.loadFile("index.html");
  // Handle navigation to other pages
  ipcMain.on("load-page", (event, page) => {
    mainWindow.loadFile(page);
  });

  // Handle screenshot request from renderer
  ipcMain.on("capture-screenshot", async () => {
    try {
      const screenshotPath = await captureScreenshot();
      mainWindow.webContents.send("screenshot-saved", screenshotPath);  // Send screenshot path to renderer
    } catch (error) {
      console.error("Error capturing screenshot:", error);
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
    // Capture the screen
    desktopCapturer.getSources({ types: ['screen', 'window'] }).then(async (sources) => {
      const screenSource = sources.find((source) => source.name === 'Screen 1'); // You can select the desired screen

      if (!screenSource) {
        return reject('Screen capture failed');
      }

      // Capture the screenshot as a PNG image
      const imageBuffer = Buffer.from(screenSource.thumbnail.toPNG());
      const filePath = path.join(app.getPath('downloads'), 'screenshot.png');  // Set file path to Downloads folder
      fs.writeFileSync(filePath, imageBuffer);  // Save the screenshot

      resolve(filePath);  // Return the path where the screenshot is saved
    }).catch(reject);  // Handle any errors from desktopCapturer
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});