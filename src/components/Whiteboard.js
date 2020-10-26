import React, { useState, useRef, useEffect } from "react";

export default function Whiteboard(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  function startDrawing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function draw(e, color) {
    if (!isDrawing) return;
    const context = contextRef.current;
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.stroke();
    const { width, height } = canvasRef.current;
    const imageData = context.getImageData(0, 0, width, height);
  }

  function finishDrawing() {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  function clearWhiteboard() {
    const context = contextRef.current;
    const { width, height } = canvasRef.current;
    context.clearRect(0, 0, width, height);
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
