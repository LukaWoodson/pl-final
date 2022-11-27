// ---------- function given by developer.mozilla.org on FileReader API ---------------
function previewFileAsText() {
  const content = document.querySelector(".content");
  const [file] = document.querySelector("input[type=file]").files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // this will then display a text file
      content.innerText = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
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
