// Creates a new path and move to next line starting position
export function startNewLine(x, y, context) {
  context.beginPath();
  context.moveTo(x, y);
}

// Draws a line to a coordinate
export function draw(x, y, context) {
  context.lineTo(x, y);
  context.stroke();
}

// Clears the canvas and creates a new path for the next line
export function clearCanvas(width, height, context) {
  context.clearRect(0, 0, width, height);
  context.beginPath();
}