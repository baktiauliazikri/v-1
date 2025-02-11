const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loadPage: (page) => ipcRenderer.send("load-page", page),
  captureScreenshot: () => ipcRenderer.send('capture-screenshot'),
  onScreenshotSaved: (callback) => ipcRenderer.on('screenshot-saved', callback),
});