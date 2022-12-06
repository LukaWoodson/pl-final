import PixelArray from "./PixelArray.js";
import Pixel from "./Pixel.js";

class PPM_Image {
  #fileType = "";
  #width = 0;
  #height = 0;
  #maxColorVal = 0;
  #pixelArrays = [];

  constructor(textData) {
    textData = PPM_Image.removeCommentsAndWhiteSpace(textData);
    this.#fileType = textData[0];
    if (this.#fileType !== "P3") alert("Problem");
    this.#width = textData[1];
    this.#height = textData[2];
    this.#maxColorVal = textData[3];

    for (let i = 4; i < textData.length; i += this.#width * 3) {
      const pixelArray = new PixelArray();
      for (let j = i; j < this.#width * 3 + i; j += 3) {
        const r = parseInt(textData[j]);
        const g = parseInt(textData[j + 1]);
        const b = parseInt(textData[j + 2]);
        const pixel = new Pixel(r, g, b);
        pixelArray.push(pixel);
      }
      this.#pixelArrays.push(pixelArray);
    }
  }

  static removeCommentsAndWhiteSpace(text) {
    return text.split(/#.*|\s+/g).filter((text) => text !== "");
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  toUint8ClampedArray() {
    const array = [];
    const WHITE = 255;
    this.#pixelArrays.forEach((pixelArray) => {
      pixelArray.getRow().forEach((pixel) => {
        const { r, g, b } = pixel.getColor();
        array.push(r);
        array.push(g);
        array.push(b);
        array.push(WHITE);
      });
    });
    return new Uint8ClampedArray(array);
  }
}

export default PPM_Image;
