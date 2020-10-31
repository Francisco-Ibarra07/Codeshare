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
      const context = contextRef.current;
      const { width, height } = canvasRef.current;
      context.clearRect(0, 0, width, height);
      context.beginPath();
    }
    if (isDrawing || drawing.length <= 1) return;
    const context = contextRef.current;
    const lastCoordinates = drawing[drawing.length - 1];
    const { offsetX, offsetY, isNewLine } = lastCoordinates;
    if (isNewLine) {
      context.beginPath();
      context.moveTo(offsetX,offsetY);
    }
    else {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  }, [drawing]);

  function handleDrawingChange(newDrawing) {
    setDrawing(newDrawing)
  }

  function startDrawing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    const isNewLine = true;
    const coordinate = { offsetX, offsetY, isNewLine };
    const newDrawing = drawing.concat(coordinate);
    handleDrawingChange(newDrawing);
  }

  function draw(e, color) {
    if (!isDrawing) return;
    const context = contextRef.current;
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.stroke();
    const coordinate = { offsetX, offsetY };
    const newDrawing = drawing.concat(coordinate);
    handleDrawingChange(newDrawing);
  }

  function finishDrawing() {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  function clearWhiteboard() {
    const context = contextRef.current;
    const { width, height } = canvasRef.current;
    context.clearRect(0, 0, width, height);
    context.beginPath();
    handleDrawingChange([]);
  }

  return (
    <div className="whiteboard-container">
      <button onClick={clearWhiteboard}>Clear Whiteboard</button>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}
