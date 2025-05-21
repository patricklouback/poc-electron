interface ElectronAPI {
  selectFolder: () => Promise<string | null>;
  saveFile: (content: string, filename: string) => Promise<void>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
} 