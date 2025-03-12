import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface UploadFileProps {
  onFileChange: (file: File) => void;
}

export const UploadFile = ({ onFileChange }: UploadFileProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);

      console.log(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <Card className="w-full max-w-md">
      <CardContent className="p-10">
        <div className="flex flex-col items-center gap-4">
        <Button variant="default" onClick={() => document.getElementById('file-upload')?.click()}>
          Subir archivo
        </Button>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {fileName && (
          <p className="text-gray-700">Archivo seleccionado: {fileName}</p>
        )}
        </div>
      </CardContent>
      </Card>
    </div>
  );
};
