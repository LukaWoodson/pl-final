class Pixel {
  #r = 0;
  #g = 0;
  #b = 0;

  constructor(r, g, b) {
    this.#r = r;
    this.#b = b;
    this.#g = g;
  }

  static componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  getColor() {
    return { r: this.#r, g: this.#g, b: this.#b };
  }

  getHex() {
    const r = Pixel.componentToHex(this.#r);
    const g = Pixel.componentToHex(this.#g);
    const b = Pixel.componentToHex(this.#b);
    return `#${r}${g}${b}`;
  }
}

export default Pixel;
