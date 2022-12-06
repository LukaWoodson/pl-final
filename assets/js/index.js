// ---------- function given by developer.mozilla.org on FileReader API (modified)---------------
function previewFileAsText() {
  const content = document.querySelector(".content");
  let [file] = document.querySelector("input[type=file]").files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // this will then display a text file
      content.innerText = reader.result;
      parseFile(reader.result);
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

function parseFile(fileText) {
  // save an object split on every new line
  let result = fileText.trim().replaceAll("\r", "").split("\n");
  let data = {
      fileType: "",
      width: 0,
      height: 0,
      maxColorVal: 0,
      colors: [],
    },
    rows = [];

  // loop through the results array to parse the information we need
  for (let i of result) {
    // remove anything in the string after # so all comments are removed
    let substring = i.split(/#.*$/);
    for (let index of substring) {
      if (index !== "") {
        // push the parsed information onto the rows array
        rows.push(index.trim());
      }
    }
  }

  // save fileType (P3), image width and height, and the max color value
  data.fileType = rows[0];
  [data.width, data.height] = rows.at(1).split(" ");
  data.maxColorVal = rows.at(2);

  //loop through remaining data and parse it into array of objects containing rgb values
  for (let i = 3; i < rows.length; i++) {
    let colorArr = rows[i].split(/\s+/);
    data.colors.push({
      r: colorArr[0],
      g: colorArr[1],
      b: colorArr[2],
    });
  }
  console.log(data);
}

// ----------- FOR REFERENCE FROM developer.mozilla.org on Canvas API -----------------
// function draw() {
//   const canvas = document.getElementById("canvas");
//   if (canvas.getContext) {
//     const ctx = canvas.getContext("2d");
//
//     ctx.fillStyle = "rgb(200, 0, 0)";
//     ctx.fillRect(10, 10, 50, 50);
//
//     ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
//     ctx.fillRect(30, 30, 50, 50);
//   }
// }
