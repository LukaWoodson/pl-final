import PPM_Image from "./PPM_Image.js";
import Pixel from "./Pixel.js";
import selectedPixel from "./selectedPixel.js";

// ---------- function given by developer.mozilla.org on FileReader API (modified)---------------
const input = document.querySelector("input[type=file]");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const colorPicker = document.querySelector("input[type=color]");
let image = null;

input.addEventListener("change", handleFile);

canvas.addEventListener("click", (e) => {
	const {row, column} = handlePixelClick(e);
	selectedPixel.updatePosition(row, column);
	colorPicker.value = image.getPixel(row, column).getHex();
});

colorPicker.addEventListener("change", (e) => {
	const {row, column} = selectedPixel.getPosition();
	image.updatePixelXY(row, column, Pixel.hexToRgb(e.target.value));
	draw(context, image);
});

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
			draw(context, image);
			selectedPixel.updatePosition(0, 0);
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
	return {column: Math.floor(x / pxWidth), row: Math.floor(y / pxHeight)};
}
