import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// Componente de botón con estilo animado
interface InteractiveHoverButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

const InteractiveHoverButton = ({
  text = "Button",
  onClick,
  className,
}: InteractiveHoverButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`group relative w-24 cursor-pointer overflow-hidden rounded-full border bg-white p-2 text-center font-semibold text-black ${className}`}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-black transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-black dark:group-hover:bg-black"></div>
    </div>
  );
};

// Componente de carga de archivos
export const UploadFile = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Simula el clic en el input oculto
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 p-4 border rounded-lg shadow-lg h-full">
      {/* Input oculto para seleccionar archivo */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Muestra el nombre del archivo seleccionado */}
      {fileName && (
        <p className="text-gray-700">Archivo seleccionado: {fileName}</p>
      )}

      <div className="flex-grow"></div>

      {/* Botón estilizado con animación */}
      <div className="flex justify-center w-full mt-auto mb-4">
        <InteractiveHoverButton
          text=" Subir archivo "
          onClick={handleButtonClick}
          className="w-full max-w-xs"
        />
      </div>
    </div>
  );
};
