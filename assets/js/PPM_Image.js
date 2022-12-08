class PPM_Image {
  #fileType = "";
  #width = 0;
  #height = 0;
  #maxColorVal = 0;
  #pixelArrays = [];
  #canvas = null;
  #colorPicker = null;

  constructor(textData) {
    this.#parse(textData);
    this.#colorPicker = document.querySelector("input[type=color]");
    this.#colorPicker.value = this.#getPixel(0, 0).getHex();
    this.#setCanvas();
    this.#colorPicker.removeEventListener("change", this.#handleColorChange);
    this.#colorPicker.addEventListener("change", this.#handleColorChange);
    selectedPixel.setDimensions(this.#width, this.#height);
    this.#draw();
    selectedPixel.updatePosition(0, 0);
  }

  static removeCommentsAndWhiteSpace(text) {
    return text.split(/#.*|\s+/g).filter((text) => text !== "");
  }

  #getPixel = (row, col) => {
    return this.#pixelArrays[row].getRow()[col];
  };

  #updatePixelXY(row, col, pixel) {
    this.#pixelArrays[row].getRow()[col].set(pixel.getColor());
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

  #parse(text) {
    text = PPM_Image.removeCommentsAndWhiteSpace(text);
    this.#fileType = text[0];
    if (this.#fileType !== "P3") alert("Problem");
    this.#width = text[1];
    this.#height = text[2];
    this.#maxColorVal = text[3];

    for (let i = 4; i < text.length; i += this.#width * 3) {
      const pixelArray = new PixelArray();
      for (let j = i; j < this.#width * 3 + i; j += 3) {
        const r = parseInt(text[j]);
        const g = parseInt(text[j + 1]);
        const b = parseInt(text[j + 2]);
        const pixel = new Pixel(r, g, b);
        pixelArray.push(pixel);
      }
      this.#pixelArrays.push(pixelArray);
    }
  }

  #setCanvas() {
    document.querySelector("canvas")?.remove();
    const canvas = document.createElement("canvas");
    document.getElementById("canvas-wrapper").appendChild(canvas);
    this.#canvas = canvas;
    this.#canvas.width = this.#width;
    this.#canvas.height = this.#height;
    this.#canvas.addEventListener("click", this.#handleCanvasClick);
  }

  #handleCanvasClick = (event) => {
    const { row, column } = this.#getPixelIndices(event);
    selectedPixel.updatePosition(row, column);
    this.#colorPicker.value = this.#getPixel(row, column).getHex();
  };

  #getPixelIndices({ clientX, clientY }) {
    const rect = this.#canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const pxWidth = this.#canvas.clientWidth / this.#width;
    const pxHeight = this.#canvas.clientHeight / this.#height;
    return { column: Math.floor(x / pxWidth), row: Math.floor(y / pxHeight) };
  }

  #draw() {
    const imageData = new ImageData(
      this.toUint8ClampedArray(),
      this.#width,
      this.#height
    );
    const context = this.#canvas.getContext("2d");
    context.putImageData(imageData, 0, 0);
  }

  #handleColorChange = (event) => {
    const { row, column } = selectedPixel.getPosition();
    this.#updatePixelXY(row, column, Pixel.hexToRgb(event.target.value));
    this.#draw();
  };

  getText() {
    let text =
      this.#fileType +
      "\n" +
      this.#width +
      " " +
      this.#height +
      "\n" +
      this.#maxColorVal;
    for (let row of this.#pixelArrays) {
      let rowArray = row.getRow();
      for (let i = 0; i < rowArray.length; i++) {
        const { r, g, b } = rowArray[i].getColor();
        text += "\n" + r + " " + g + " " + b;
      }
    }
    return text;
  }
}
