import React, { useRef, useEffect } from "react";
import { startNewLine, draw, clearCanvas } from "../constants/painter";

export default function Whiteboard(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const { drawing, setDrawing } = props;
  const isDrawing = useRef(false);

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
    if (drawing.length === 0) {
      const { width, height } = canvasRef.current;
      clearCanvas(width, height, contextRef.current);
      return;
    }
    if (isDrawing.current || drawing.length <= 1) return;

    const lastCoordinates = drawing[drawing.length - 1];
    const { offsetX, offsetY, isNewLine } = lastCoordinates;

    const context = contextRef.current;
    if (isNewLine) startNewLine(offsetX, offsetY, context);
    else draw(offsetX, offsetY, context);
  }, [drawing]);

  function handleDrawingChange(newDrawing) {
    setDrawing(newDrawing)
  }

  function handleMouseDown(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    startNewLine(offsetX, offsetY, contextRef.current);
    isDrawing.current = true;
    const isNewLine = true;
    const coordinate = { offsetX, offsetY, isNewLine };
    const newDrawing = drawing.concat(coordinate);
    handleDrawingChange(newDrawing);
  }

  function handleMouseMove(e) {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    draw(offsetX, offsetY, contextRef.current);
    const coordinate = { offsetX, offsetY };
    const newDrawing = drawing.concat(coordinate);
    handleDrawingChange(newDrawing);
  }

  function handleMouseUp() {
    isDrawing.current = false;
  }
  
  function handleClearWhiteboardClick() {
    const { width, height } = canvasRef.current;
    clearCanvas(width, height, contextRef.current);
    handleDrawingChange([]);
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
