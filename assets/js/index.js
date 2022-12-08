import PPM_Image from "./PPM_Image.js";

const FILE_INPUT = document.querySelector("input[type=file]");
let image = null;

FILE_INPUT.addEventListener("change", handleFile);

function handleFile() {
  const [file] = FILE_INPUT.files;
  console.log(file);
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      image = new PPM_Image(reader.result);
      updateCanvasWrapperDisplay();
      console.log("load");
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

function updateCanvasWrapperDisplay() {
  document.getElementById("canvas-wrapper").style.display = "flex";
}

function saveFile(fileName, text) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", fileName);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

document.getElementById("save").addEventListener("click", () => {
  if (image) saveFile("EDITED_" + FILE_INPUT.files[0].name, image.getText());
});
