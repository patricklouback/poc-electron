import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  console.log('Creating window...');
  console.log('Current directory:', __dirname);
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // In development, load from Vite dev server
  if (process.env.NODE_ENV === 'development') {
    console.log('Loading development URL...');
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    const indexPath = path.join(__dirname, '../dist/index.html');
    console.log('Loading production file:', indexPath);
    console.log('File exists:', fs.existsSync(indexPath));
    
    mainWindow.loadFile(indexPath);
    
    // Open DevTools in production for debugging
    mainWindow.webContents.openDevTools();
    
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Failed to load:', errorCode, errorDescription);
    });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for file operations
ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openDirectory'],
  });
  return result.filePaths[0];
});

ipcMain.handle('read-users', async (_, directoryPath) => {
  const filePath = path.join(directoryPath, 'users.json');
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
});

ipcMain.handle('save-user', async (_, { directoryPath, user }) => {
  const filePath = path.join(directoryPath, 'users.json');
  try {
    let users = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      users = JSON.parse(data);
    }
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
}); 