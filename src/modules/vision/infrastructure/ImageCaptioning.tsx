import { Button } from "@/components/ui/button";
import { pipeline } from "@huggingface/transformers";

interface ImageCaptioningProps {
  file: File | null;
}

export const ImageCaptioning = ({file}: ImageCaptioningProps) => {

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const initializeModel = async () => {
    if (!file) return;

    const status = document.getElementById("status") as HTMLElement;

    status.textContent = "Loading model...";

    const captioner = await pipeline(
      "image-to-text",
      "Xenova/vit-gpt2-image-captioning"
    );
    
    const base64Image = await fileToBase64(file);
    const output = await captioner(base64Image);
    status.textContent = "Ready";

    console.log(output);
  };

  return (
    <>
      <div>
        <Button onClick={initializeModel} variant="secondary">Load Model</Button>
        <p id="status"></p>
        <p>output</p>
      </div>
    </>
  );
};