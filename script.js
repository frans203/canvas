// INITAL DATA

let currentColor = "#ff0000";
let screen = document.querySelector("#tela");
let ctx = screen.getContext("2d");
let canDraw = false;
let mouseX;
let mouseY;
// iro.js LIBRALY
let colorPicker = new iro.ColorPicker("#picker", {
  width: 320,
  color: "#ff0000",
  layoutDirection: "horizontal",
  margin: 12,
});

let hex = colorPicker.color.hexString;
colorPicker.on("color:change", function (color) {
  console.log(color.hexString);
  currentColor = color.hexString;
  document.querySelector("body").style.background = currentColor;
});
console.log(hex);
// EVENTS

screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent);
document.querySelector(".clear").addEventListener("click", clearScreen);
/* 
- Clique do mouse abaixar, ativar modo desenho
- Quando o mouse mover, se o modo desenho estiver ativado, desenho
- QUando o clique do mouse levantar, desative o modo desenho

*/

function mouseDownEvent(e) {
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e) {
  if (canDraw) {
    draw(e.pageX, e.pageY);
  }
}
function mouseUpEvent() {
  canDraw = false;
}

function draw(x, y) {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(pointX, pointY);
  ctx.closePath();
  ctx.strokeStyle = `${currentColor}`;
  ctx.stroke();

  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
