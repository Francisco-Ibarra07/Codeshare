import React, { useState, useRef, useEffect } from "react";

export default function Whiteboard(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const { drawing, setDrawing } = props;
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const pixelRatio = window.devicePixelRatio || 1;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * pixelRatio;
    canvas.style.width = `${window.innerWidth / pixelRatio}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(pixelRatio, pixelRatio);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (drawing.length == 0) {
      clearCanvas();
      return;
    }
    if (isDrawing || drawing.length <= 1) return;

    const lastCoordinates = drawing[drawing.length - 1];
    const { offsetX, offsetY, isNewLine } = lastCoordinates;

    if (isNewLine) startNewLine(offsetX, offsetY);
    else draw(offsetX, offsetY);
  }, [drawing]);

  function handleDrawingChange(newDrawing) {
    setDrawing(newDrawing)
  }

  function handleMouseDown(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    startNewLine(offsetX, offsetY);
    setIsDrawing(true);
    const isNewLine = true;
    const coordinate = { offsetX, offsetY, isNewLine };
    const newDrawing = drawing.concat(coordinate);
    handleDrawingChange(newDrawing);
  }

  function handleMouseMove(e) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    draw(offsetX, offsetY);
    const coordinate = { offsetX, offsetY };
    const newDrawing = drawing.concat(coordinate);
    handleDrawingChange(newDrawing);
  }

  function handleMouseUp() {
    setIsDrawing(false);
  }
  
  function handleClearWhiteboardClick() {
    clearCanvas();
    handleDrawingChange([]);
  }

  function startNewLine(x, y) {
    const context = contextRef.current
    context.beginPath();
    context.moveTo(x, y);
  }

  function draw(x, y) {
    const context = contextRef.current;
    context.lineTo(x, y);
    context.stroke();
  }

  function clearCanvas() {
    const context = contextRef.current;
    const { width, height } = canvasRef.current;
    context.clearRect(0, 0, width, height);
    context.beginPath();
  }

  return (
    <div className="whiteboard-container">
      <button onClick={handleClearWhiteboardClick}>Clear Whiteboard</button>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
      />
    </div>
  );
}
