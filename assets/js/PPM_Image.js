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

    console.log(textData);
  }

  static removeCommentsAndWhiteSpace(text) {
    return text.split(/#.*|\s+/g).filter((text) => text !== "");
  }

  pushRow(row) {
    this.#pixelArrays.push(row);
  }

  getImage() {
    return this.#pixelArrays;
  }

  setImage(image) {
    this.#pixelArrays = image.map((image) => image);
  }
}

export default PPM_Image;
