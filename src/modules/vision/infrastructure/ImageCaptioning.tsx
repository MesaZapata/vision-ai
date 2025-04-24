/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  Florence2ForConditionalGeneration,
  AutoProcessor,
  AutoTokenizer,
  RawImage,
} from "@huggingface/transformers";
import { AudioGeneration } from "@/modules/textToAudio/infrastructure/textToAudio";

interface ImageCaptioningProps {
  file: File | null;
}

export const ImageCaptioning = ({ file }: ImageCaptioningProps) => {
  const [caption, setCaption] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const generateCaption = async () => {
    if (!file) return;

    setStatusMessage("Cargando modelo Florence-2...");
    setIsProcessing(true);

    try {
      const model_id = "onnx-community/Florence-2-base-ft";
      const model = await Florence2ForConditionalGeneration.from_pretrained(model_id, { dtype: "fp32" });
      const processor = await AutoProcessor.from_pretrained(model_id, {});
      const tokenizer = await AutoTokenizer.from_pretrained(model_id);

      const imageUrl = URL.createObjectURL(file);
      const image = await RawImage.fromURL(imageUrl);
      
      const vision_inputs = await processor(image);
      
      const task = "<MORE_DETAILED_CAPTION>";
      const prompts = (processor as any).construct_prompts(task);
      const text_inputs = tokenizer(prompts);
      
      setStatusMessage("Generando descripción...");
      
      const generated_ids = await model.generate({
        ...text_inputs,
        ...vision_inputs,
        max_new_tokens: 100,
      });
      
      const generated_text = tokenizer.batch_decode(generated_ids as any, { skip_special_tokens: false })[0];
      
      const result = (processor as any).post_process_generation(generated_text, task, image.size);

      console.log("Result:", result);
      console.log("Generated text:", generated_text);
      
      
      
      URL.revokeObjectURL(imageUrl);
      
      if (result && result["<MORE_DETAILED_CAPTION>"]) {
        setCaption(result["<MORE_DETAILED_CAPTION>"]);
        setStatusMessage("Descripción generada");
      } else {
        setCaption("Error: No se pudo generar una descripción.");
        setStatusMessage("Error al generar descripción");
      }
    } catch (error) {
      console.error("Error in generateCaption:", error);
      setCaption("Error: Failed to generate caption.");
      setStatusMessage("Error al cargar Florence-2");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {caption && (
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Descripción:</h3>
          <p className="mb-4">{caption}</p>
          <AudioGeneration caption={caption} />
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={generateCaption} variant="default" disabled={isProcessing || !file}>
          Generar descripción
        </Button>
      </div>
      
      <p className="text-sm">{statusMessage}</p>
    </div>
  );
};
