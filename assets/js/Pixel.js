class Pixel {
  #r = 0;
  #g = 0;
  #b = 0;

  constructor(r, g, b) {
    this.#r = r;
    this.#b = b;
    this.#g = g;
  }

  // componentToHex and hexToRGB found here: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  static componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  static hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? new Pixel(
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        )
      : null;
  }

  set({ r, g, b }) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
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
