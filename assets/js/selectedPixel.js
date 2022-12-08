const selectedPixel = {
  row: 0,
  column: 0,
  boundingRect: document.getElementById("selected-pixel"),
  updatePosition: function (row, column) {
    this.row = row;
    this.column = column;
    this.boundingRect.style.transform = `translate(${column * 100}%, ${
      row * 100
    }%)`;
  },
  getPosition: function () {
    return { row: this.row, column: this.column };
  },
  setDimensions: function (width, height) {
    this.boundingRect.style.width = `${100 / width}%`;
    this.boundingRect.style.height = `${100 / height}%`;
  },
};

export default selectedPixel;
