class Pixel {
  #r = 0;
  #g = 0;
  #b = 0;

  constructor(r, g, b) {
    this.#r = r;
    this.#b = b;
    this.#g = g;
  }

  getColor() {
    return { r: this.#r, g: this.#g, b: this.#b };
  }
}

export default Pixel;
