// main.ts
import { app, BrowserWindow } from 'electron'
import path from 'path'
import './back/app.ts' // 确保这个模块是 TypeScript 兼容的，或者它有一个类型定义文件

// 假设这些变量是由 Webpack 定义的，您需要在 webpack 配置中设置它们
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

console.log(123, MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, MAIN_WINDOW_WEBPACK_ENTRY)
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true, // 推荐启用上下文隔离以提高安全性
      nodeIntegration: false, // 在大多数新应用中禁用 nodeIntegration 以提高安全性
      // enableRemoteModule: false, // 禁用 remote 模块以提高安全性
    },
  })

  // Load the index.html of the app (注意：这里应该使用 loadFile 而不是 loadURL，除非 MAIN_WINDOW_WEBPACK_ENTRY 是一个 URL)
  // 如果 MAIN_WINDOW_WEBPACK_ENTRY 是一个文件路径，则使用：
  mainWindow.loadFile(MAIN_WINDOW_WEBPACK_ENTRY)
  // 如果 MAIN_WINDOW_WEBPACK_ENTRY 是一个 URL（不推荐用于本地文件），则使用：
  // mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools. (通常只在开发模式下打开)
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 在这里，您可以包含应用程序主进程的其他特定代码。
// 您也可以将它们放在单独的文件中并在这里导入它们。
