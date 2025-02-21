import { pipeline } from "@huggingface/transformers";

export const ImageCaptioning = () => {
  const initializeModel = async () => {
    const status = document.getElementById("status") as HTMLElement;

    status.textContent = "Loading model...";

    const captioner = await pipeline(
      "image-to-text",
      "Xenova/vit-gpt2-image-captioning"
    );
    const url =
      "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg";
    const output = await captioner(url);
    status.textContent = "Ready";

    console.log(output);
  };

  return (
    <>
      <div>
        <h1>Image Captioning</h1>
        <button onClick={initializeModel}>Load Model</button>
        <p id="status"></p>
      </div>
    </>
  );
};
