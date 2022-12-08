import PPM_Image from "./PPM_Image.js";

const FILE_INPUT = document.querySelector("input[type=file]");
let image = null;

FILE_INPUT.addEventListener("change", handleFile);

function handleFile() {
  const [file] = FILE_INPUT.files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => (image = new PPM_Image(reader.result)),
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

function updateCanvasWrapperDisplay() {}
