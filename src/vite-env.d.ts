/// <reference types="vite/client" />

interface ElectronAPI {
  selectFolder: () => Promise<string | null>;
}

interface Window {
  electron: ElectronAPI;
}
