import { useState } from 'react';
import './App.css'
import { ImageCaptioning, UploadFile } from './modules/vision'
import { ThemeProvider } from './components/ui/themeProvider';
import { ModeToggle } from './components/ui/modeToggle';

export const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <UploadFile onFileChange={(file) => setSelectedFile(file)} />
      <div className="flex justify-center items-center">
        <ImageCaptioning file={selectedFile}/>
      </div>
    </ThemeProvider>
  )
}

