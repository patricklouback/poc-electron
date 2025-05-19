const { spawn } = require('child_process');
const electron = require('electron');
const path = require('path');

// Start Vite dev server
const vite = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Wait for Vite to start
setTimeout(() => {
  // Start Electron
  const electronProcess = spawn(electron, [path.join(__dirname, 'dist-electron/main.js')], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  });

  electronProcess.on('close', () => {
    vite.kill();
    process.exit();
  });
}, 5000); // Wait 5 seconds for Vite to start 