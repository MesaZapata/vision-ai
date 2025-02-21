import { useState } from "react";

export const UploadFile = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);

      console.log(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 border rounded-lg shadow-lg">
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Subir archivo
      </label>
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
  );
};
