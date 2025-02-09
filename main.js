const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 550,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.removeMenu();
  win.loadFile("index.html");
  win.webContents.openDevTools(); //Open the console
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
