import React, { useState, useRef, useEffect } from "react";
import { startNewLine, draw, clearCanvas } from "../constants/painter";
import { CirclePicker } from "react-color";
import { colors } from "../constants/colors";

export default function Whiteboard(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const { drawing, setDrawing } = props;
  const isDrawing = useRef(false);
  const [color, setColor] = useState(colors[colors.length - 1]);

  useEffect(() => {
    setCanvasProperties();
    setContextProperties();
  }, []);

  useEffect(() => {
    if (drawing.length === 0) {
      const { width, height } = canvasRef.current;
      clearCanvas(width, height, contextRef.current);
      return;
    }
    if (isDrawing.current) return;

    const lastCoordinates = drawing[drawing.length - 1];
    const { offsetX, offsetY, color } = lastCoordinates;

    const context = contextRef.current;
    if (color) startNewLine(offsetX, offsetY, color, context);
    else draw(offsetX, offsetY, context);
  }, [drawing]);

  function handleDrawingChange(newDrawing) {
    setDrawing(newDrawing)
  }

  function handleColorChange(newColor) {
    setColor(newColor.hex);
  }

  function handleMouseDown(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    startNewLine(offsetX, offsetY, color, contextRef.current);
    isDrawing.current = true;
    const coordinate = { offsetX, offsetY, color };
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

  function setCanvasProperties() {
    const canvas = canvasRef.current;
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * pixelRatio;
    canvas.style.width = `${window.innerWidth / pixelRatio}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }

  function setContextProperties() {
    const context = canvasRef.current.getContext("2d");
    const pixelRatio = window.devicePixelRatio || 1;
    context.scale(pixelRatio, pixelRatio);
    context.lineCap = "round";
    context.strokeStyle = colors[colors.length - 1];
    context.lineWidth = 5;
    contextRef.current = context;
  }

  return (
    <div className="whiteboard-container">
      <div className="whiteboard-top">
        <CirclePicker
          color={color}
          colors={colors}
          onChangeComplete={handleColorChange}
        />
        <button onClick={handleClearWhiteboardClick}>Clear Whiteboard</button>
      </div>

      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
      />
    </div>
  );
}
