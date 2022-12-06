class PixelArray {
  #row = [];

  constructor() {}

  push(pixel) {
    this.#row.push(pixel);
  }

  getRow() {
    return this.#row;
  }

  setRow(row) {
    this.#row = row.map((row) => row);
  }
}
