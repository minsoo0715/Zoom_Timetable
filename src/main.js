const {app, BrowserWindow} = require('electron')

  const path = require('path')
  const url = require('url')
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.

    //윈도우 오브젝트를 전역으로 선언해라, 전역이 아니라면, 창은 자바스크립트가 garbage collected 될때 자동으로 닫히게 된다.

  let win
  
  function createWindow () {
    // browser window를 만듦
    win = new BrowserWindow({width: 920, height: 720, webPreferences: {nodeIntegration:true}})
    win.setMenu(null);
  
    // and load the index.html of the app.
    //그리고 index.html을 불러온다.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    
  
  
    // Emitted when the window is closed.
    //창이 닫히면 실행됨
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.

      //윈도우 객체 역참조..
      //주로 멀티 윈도우를 제공하는 프로그램에서는 창을 배열로 저장하고, 이때 해당 요소를 삭제해야한다(null값으로 초기화)
      win = null
    })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.

//이 메소드는 일렉트론이 초기화가 완료되고, 브라우저 창을 띄울 준비가 되면 호출됨
//몇 API들은 이 이벤트 이후에만 작동.

  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  //모든 윈도우가 닫히면 앱을 끔.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.



