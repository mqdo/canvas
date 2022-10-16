const canvas = document.getElementById("canvas");
const button = document.getElementById("button");
const menu = document.getElementById("menu");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

let prevX = 0;
let prevY = 0;
let color = 0;
let isDrawing = false;

const draw = (e) => {
  if (!isDrawing) {
    return;
  }
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 40;
  ctx.strokeStyle = `hsl(${color}, 80%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  prevX = e.offsetX;
  prevY = e.offsetY;
  if (color === 360) color = 0;
  color++;
};

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  prevX = e.offsetX;
  prevY = e.offsetY;
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
canvas.addEventListener("mousemove", (e) => draw(e));

let isOpened = false;

const showHide = () => {
  if (!isOpened) {
    isOpened = true;
    button.style.opacity = "1";
    button.innerHTML = "+";
    button.style.fontSize = "30px";
    button.style.transform = "rotate(45deg) scale(1.2)";
    menu.style.opacity = "1";
    menu.style.width = "300px";
    menu.addEventListener("click", clearCanvas);
  } else {
    isOpened = false;
    button.style.opacity = "0.5"
    button.style.transform = "rotate(0)";
    button.style.fontSize = "20px";
    button.innerHTML = "i";
    menu.style.opacity = "0";
    menu.style.width = "50px";
    menu.removeEventListener("click", clearCanvas);
  }
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showHide();
}

button.addEventListener("click", showHide);
