class PixelArray {
  #row = [];

  constructor() {}

  push(pixel) {
    this.#row.push(pixel);
  }

  getRow() {
    return this.#row;
  }
}
