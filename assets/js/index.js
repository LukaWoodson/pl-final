import PPM_Image from "./PPM_Image.js";
import Pixel from "./Pixel.js";
import selectedPixel from "./selectedPixel.js";

const FILE_INPUT = document.querySelector("input[type=file]");
const COLOR_PICKER = document.querySelector("input[type=color]");

FILE_INPUT.addEventListener("change", handleFile);

function handleLoading(text) {
  removeCanvas();
  const image = new PPM_Image(text);
  const CANVAS = document.createElement("canvas");
  document.getElementById("canvas-wrapper").appendChild(CANVAS);
  CANVAS.addEventListener("click", (e) => handleCanvasClick(e, image, CANVAS));
  const { width, height } = image.getDimensions();
  CANVAS.width = width;
  CANVAS.height = height;
  const context = CANVAS.getContext("2d");
  COLOR_PICKER.addEventListener("change", (e) =>
    handleColorChange(e, image, context, width, height)
  );
  selectedPixel.setDimensions(width, height);
  draw(image, context, width, height);
  selectedPixel.updatePosition(0, 0);
}

function removeCanvas() {
  const CANVAS = document.querySelector("canvas");
  if (CANVAS) CANVAS.remove();
}

function handleFile() {
  const [file] = FILE_INPUT.files;
  const reader = new FileReader();

  reader.addEventListener("load", () => handleLoading(reader.result), false);

  if (file) {
    reader.readAsText(file);
  }
}

function draw(image, context, width, height) {
  const imageData = new ImageData(image.toUint8ClampedArray(), width, height);
  context.putImageData(imageData, 0, 0);
}

function handlePixelClick(event, width, height, CANVAS) {
  const rect = CANVAS.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const pxWidth = CANVAS.clientWidth / width;
  const pxHeight = CANVAS.clientHeight / height;
  return { column: Math.floor(x / pxWidth), row: Math.floor(y / pxHeight) };
}

function handleCanvasClick(event, image, CANVAS) {
  const { row, column } = handlePixelClick(
    event,
    image.getWidth(),
    image.getHeight(),
    CANVAS
  );
  selectedPixel.updatePosition(row, column);
  COLOR_PICKER.value = image.getPixel(row, column).getHex();
}

function handleColorChange(event, image, context, width, height) {
  const { row, column } = selectedPixel.getPosition();
  image.updatePixelXY(row, column, Pixel.hexToRgb(event.target.value));
  draw(image, context, width, height);
}

function updateCanvasDisplay() {}
