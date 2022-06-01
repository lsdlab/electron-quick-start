// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
const fs = require('fs')
const serve = require('electron-serve');
const loadURL = serve({ directory: 'src/dist' });

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 窗口最大化
  mainWindow.maximize();
  // 窗口全屏
  mainWindow.setFullScreen(true)
  // 载入网页
  // mainWindow.loadURL("http://localhost")



  // const envpath = '/root/.DEVICEFRONTENDHOST'
  // if (fs.existsSync(envpath)) {
  //   fs.readFile(envpath, 'utf8', (err, data) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     mainWindow.loadURL(data.replace("\n", ''))
  //   });
  // } else {
  //   mainWindow.loadFile('src/index.html')
  // }

  if (fs.existsSync('src/dist')) {
    // 代理spa electron-serve
    mainWindow.loadURL('app://-');
    // loadURL(mainWindow);
  } else {
    mainWindow.loadFile('src/index.html')
  }

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
  globalShortcut.register("F11", () => {
    console.log("F11 is pressed: Shortcut Disabled");
  });
});
app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('F5');
  globalShortcut.unregister('F11');
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.