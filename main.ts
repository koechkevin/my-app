import * as electron from 'electron';
const { app, BrowserWindow } =  electron;

const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
    });
    win.loadURL('https://my-resume-92231.web.app').then();
};
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
        createWindow()
    }
});
