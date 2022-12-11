const FILE_INPUT = document.querySelector("input[type=file]");
let image = null;

FILE_INPUT.addEventListener("change", handleFile);
document.getElementById("save").addEventListener("click", () => {
  if (image) saveFile("EDITED_" + FILE_INPUT.files[0].name, image.getText());
});

function handleFile() {
  try {
    const [file] = FILE_INPUT.files;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        image = new PPM_Image(reader.result);
        updateElementDisplays();
      },
      false
    );

    if (file) {
      reader.readAsText(file);
    }
  } catch (e) {
    console.log(e);
  }
}

function updateElementDisplays() {
  document.getElementById("canvas-wrapper").style.display = "flex";
  document.getElementById("instruction").style.display = "block";
  document.getElementById("note").style.display = "block";
  document.getElementById("picker").style.display = "flex";
  document.getElementById("save").style.opacity = "1";
}

// saveFile found here:
// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
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
