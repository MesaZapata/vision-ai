import { useState } from 'react';
import './App.css'
import { ImageCaptioning, UploadFile } from './modules/vision'

export const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  return (
    <>
      <UploadFile onFileChange={(file) => setSelectedFile(file)} />
      <ImageCaptioning file={selectedFile}/>
    </>
  )
}


