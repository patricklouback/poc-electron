/// <reference types="vite/client" />

interface ElectronAPI {
  selectFolder: () => Promise<string | null>;
  saveJson: (folder: string, data: any) => Promise<void>;
}

interface Window {
  electron: ElectronAPI;
}
