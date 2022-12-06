import PPM_Image from "./PPM_Image.js";
import Pixel from "./Pixel.js";

// ---------- function given by developer.mozilla.org on FileReader API (modified)---------------
const input = document.querySelector("input[type=file]");
input.addEventListener("change", previewFileAsText);
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const colorPicker = document.querySelector("input[type=color]");
const rowIndexInput = document.getElementById("row-index");
const colIndexInput = document.getElementById("col-index");
let image = null;

canvas.addEventListener("click", (e) => {
  const { row, column } = handlePixelClick(e);
  rowIndexInput.value = row;
  colIndexInput.value = column;
  const hexColor = image.getPixel(row, column).getHex();
  colorPicker.value = hexColor;
});

colorPicker.addEventListener("change", (e) => {
  const { value: row } = rowIndexInput;
  const { value: col } = colIndexInput;
  image.updatePixelXY(row, col, Pixel.hexToRgb(e.target.value));
  draw(context, image);
});

function previewFileAsText() {
  let [file] = input.files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // this will then display a text file
      image = new PPM_Image(reader.result);

      canvas.width = image.getWidth();
      canvas.height = image.getHeight();
      draw(context, image);
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

function draw(context, image) {
  const imageData = new ImageData(
    image.toUint8ClampedArray(),
    canvas.width,
    canvas.height
  );
  context.putImageData(imageData, 0, 0);
}

function handlePixelClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const pxWidth = canvas.clientWidth / image.getWidth();
  const pxHeight = canvas.clientHeight / image.getHeight();
  return { column: Math.floor(x / pxWidth), row: Math.floor(y / pxHeight) };
}
