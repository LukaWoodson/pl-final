import PPM_Image from "./PPM_Image.js";

// ---------- function given by developer.mozilla.org on FileReader API (modified)---------------
const input = document.querySelector("input[type=file]");
input.addEventListener("change", previewFileAsText);
const canvas = document.querySelector("canvas");

function previewFileAsText() {
  const content = document.querySelector(".content");
  let [file] = input.files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // this will then display a text file
      content.innerText = reader.result;
      const image = new PPM_Image(reader.result);
      const context = canvas.getContext("2d");
      canvas.width = image.getWidth();
      canvas.height = image.getHeight();
      const imageData = new ImageData(
        image.toUint8ClampedArray(),
        canvas.width,
        canvas.height
      );
      context.putImageData(imageData, 0, 0);
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}
