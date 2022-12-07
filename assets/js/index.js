import PPM_Image from "./PPM_Image.js";
import Pixel from "./Pixel.js";
import selectedPixel from "./selectedPixel.js";

// ---------- function given by developer.mozilla.org on FileReader API (modified)---------------
const input = document.querySelector("input[type=file]");
const canvas = document.querySelector("canvas");
const colorPicker = document.querySelector("input[type=color]");
let image = null;

input.addEventListener("change", handleFile);

canvas.addEventListener("click", handleCanvasClick);

colorPicker.addEventListener("change", handleColorChange);

function handleFile() {
	const [file] = input.files;
	const reader = new FileReader();
	
	reader.addEventListener(
		"load",
		() => {
			// this will then display a text file
			image = new PPM_Image(reader.result);
			canvas.width = image.getWidth();
			canvas.height = image.getHeight();
			selectedPixel.setDimensions(canvas.width, canvas.height);
			draw();
			selectedPixel.updatePosition(0, 0);
		},
		false
	);
	
	if (file) {
		reader.readAsText(file);
	}
}

function draw() {
	const context = canvas.getContext("2d");
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
	return {column: Math.floor(x / pxWidth), row: Math.floor(y / pxHeight)};
}

function handleCanvasClick(event) {
	const {row, column} = handlePixelClick(event);
	selectedPixel.updatePosition(row, column);
	colorPicker.value = image.getPixel(row, column).getHex();
}

function handleColorChange(event) {
	const {row, column} = selectedPixel.getPosition();
	image.updatePixelXY(row, column, Pixel.hexToRgb(event.target.value));
	draw();
}