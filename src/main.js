// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')
const serve = require('electron-serve');
const loadURL = serve({ directory: 'src/dist' });

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')

  // 窗口最大化
  mainWindow.maximize();
  // 全屏
  // mainWindow.setFullScreen(true);
  
  // 载入端口网页
  // mainWindow.loadURL('http://localhost:8001')

  // 载入静态HTML 非spa
  // mainWindow.loadFile('index.html')

  // 代理spa electron-serve
  mainWindow.loadURL('app://-');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 屏蔽网页刷新快捷键
app.on('browser-window-focus', function () {
  globalShortcut.register("CommandOrControl+R", () => {
      console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
      console.log("F5 is pressed: Shortcut Disabled");
  });
  // globalShortcut.register("F11", () => {
  //   console.log("F11 is pressed: Shortcut Disabled");
  // });
});
app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('F5');
  // globalShortcut.unregister('F11');
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
