import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pipeline } from "@huggingface/transformers";
import { useState } from "react";

interface ImageCaptioningProps {
  file: File | null;
}

interface CaptionOutput {
  generated_text: string;
}

export const ImageCaptioning = ({ file }: ImageCaptioningProps) => {
  const [caption, setCaption] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const initializeModel = async () => {
    if (!file) return;

    const status = document.getElementById("status") as HTMLElement;

    status.textContent = "Loading model...";

    try {
      const captioner = await pipeline(
        "image-to-text",
        "Xenova/vit-gpt2-image-captioning"
      );

      const base64Image = await fileToBase64(file);
      const output = await captioner(base64Image);

      status.textContent = "Ready";

      console.log("Output:", output);

      const captions = output as CaptionOutput[];

      if (Array.isArray(captions) && captions.length > 0) {
        if ("generated_text" in captions[0]) {
          setCaption(captions[0].generated_text);
        } else {
          console.error("generated_text property not found in output:", captions[0]);
          setCaption("Error: Caption not found.");
        }
      } else {
        console.error("Output is not an array or is empty:", output);
        setCaption("Error: No caption generated.");
      }
    } catch (error) {
      console.error("Error in initializeModel:", error);
      status.textContent = "Error loading model";
      setCaption("Error: Failed to generate caption.");
    }
  };

  return (
    <>
      <div>
        <Card>
           <p>{caption ? caption : "No caption generated yet."}</p>
        </Card>
        <Button onClick={initializeModel} variant="secondary">
          Load Model
        </Button>
        <p id="status"></p>
        
      </div>
    </>
  );
};