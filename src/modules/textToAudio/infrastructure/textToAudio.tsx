import { useEffect, useState } from "react";
import { KokoroTTS } from "kokoro-js";

interface AudioGenerationProps {
  caption: string;
}

export const AudioGeneration = ({ caption }: AudioGenerationProps) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const generateAudio = async () => {
      setIsLoading(true);
      try {
        const model_id = "onnx-community/Kokoro-82M-ONNX";
        const tts = await KokoroTTS.from_pretrained(model_id, { dtype: "q8" });
        const audioBuffer = await tts.generate(caption, { voice: "af_bella" });
        const blob = new Blob([audioBuffer], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (error) {
        console.error("Error generating audio:", error);
      } finally {
        setIsLoading(false);
      }
    };
    generateAudio();
  }, [caption]);

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold">Audio:</h4>
      {isLoading ? (
        <p>Generando audio...</p>
      ) : (
        audioUrl && (
          <audio controls className="mt-2 w-full">
            <source src={audioUrl} type="audio/wav" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        )
      )}
    </div>
  );
};
