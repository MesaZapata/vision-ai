import "./App.css";
import { ImageCaptioning, UploadFile } from "./modules/vision";

export const App = () => {
  return (
    <>
      <ImageCaptioning />
      <UploadFile />
    </>
  );
};
