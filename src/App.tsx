import { useState } from 'react';
import './App.css'
import { UploadFile } from './modules/vision'
import { ThemeProvider } from './components/ui/themeProvider';
import { ModeToggle } from './components/ui/modeToggle';
import { ImageCaptioning } from './modules/vision/infrastructure/ImageCaptioning';
import { Hero } from './modules/vision/ui/Hero';

export const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="fixed top-4 right-4 z-10">
        <ModeToggle />
      </div>
      
      <Hero />
      
      <div className="container mx-auto px-4 -mt-4">
        <div className="max-w-2xl mx-auto">
          <UploadFile onFileChange={(file) => setSelectedFile(file)} />
          <div className="flex justify-center items-center">
            <ImageCaptioning file={selectedFile}/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

