const electron = require('electron');
const path = require('path');

const { app, BrowserWindow } =  electron;

const icon = electron.nativeImage.createFromPath(
    path.resolve('public/favicon.icns')
)
const createWindow = () => {
    let win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        icon,
    });
    win.loadURL('https://my-resume-92231.firebaseapp.com').then();
}

app.dock.setIcon(icon);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});
