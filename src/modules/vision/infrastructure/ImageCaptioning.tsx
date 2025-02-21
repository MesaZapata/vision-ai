import { pipeline } from "@huggingface/transformers"

export const ImageCaptioning = () => {

const captioner = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base")


  return (
   <>
   </>
  )
}
