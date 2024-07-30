"use client";

import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const MemeGenerator = () => {
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [textSize, setTextSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const memeRef = useRef(null);
  const viewRef = useRef(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  const addText = () => {
    const x = Math.floor(Math.random() * 200) + 50;
    const y = Math.floor(Math.random() * 200) + 50;
    setTexts([
      ...texts,
      {
        text: currentText,
        color: textColor,
        size: textSize,
        bold: isBold,
        x,
        y,
      },
    ]);
    setCurrentText("");
  };

  const undo = () => {
    setTexts(texts.slice(0, -1));
  };

  const downloadImage = () => {
    html2canvas(memeRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "meme.png";
      link.click();
    });
  };

  return (
    <div className="meme-generator flex flex-col gap-4">
      <p className="text-xl font-medium text-center py-2">Make a meme</p>
      <div ref={memeRef} className="relative w-full h-[350px]">
        <div
          {...getRootProps({ className: "dropzone" })}
          className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full ${
            image ? "overflow-hidden" : "bg-gray-100"
          } p-2 rounded-md`}
          onClick={open}
        >
          <input {...getInputProps()} />
          {image ? (
            <img
              src={image}
              alt="Meme"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <p className="text-center text-sm text-gray-500 px-2 h-full w-full flex items-center justify-center">
              Drop an image here, or click to select one
            </p>
          )}
        </div>
        {texts.map((text, index) => (
          <Draggable key={index} defaultPosition={{ x: text.x, y: text.y }}>
            <div
              style={{
                color: text.color,
                fontSize: `${text.size}px`,
                fontWeight: text.bold ? "bold" : "normal",
                position: "absolute",
                zIndex: 10,
              }}
            >
              {text.text}
            </div>
          </Draggable>
        ))}
      </div>

      <div className="w-full flex items-center justify-center gap-4">
        <button
          className="text-sm bg-[#800000] text-white px-4 py-2 rounded-md w-fit"
          onClick={open}
        >
          Image
        </button>
        <button
          className="text-sm bg-black text-white px-4 py-2 rounded-md w-fit"
          onClick={addText}
        >
          Text
        </button>
      </div>
      <div className="flex items-center gap-2 justify-center">
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-8 h-10 rounded-lg overflow-hidden"
        />
        <input
          type="number"
          value={textSize}
          onChange={(e) => setTextSize(e.target.value)}
          placeholder="Size"
          className="w-16 border rounded-sm px-2 py-1"
        />
        <label className="flex items-center gap-1 font-medium">
          <input
            type="checkbox"
            checked={isBold}
            onChange={(e) => setIsBold(e.target.checked)}
          />
          Bold
        </label>
      </div>
      <div className="flex items-center w-full justify-between gap-4">
        <input
          type="text"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Enter text"
          className="border rounded-sm px-4 py-2 w-full"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          className="text-white bg-[#800000] px-3 py-2 rounded-md border-none"
          onClick={undo}
        >
          Undo
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-white bg-[#800000] px-3 py-2 rounded-md border-none">
              View
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generated Meme</DialogTitle>
            </DialogHeader>
            <div ref={viewRef} className="relative w-full h-full">
              {image && (
                <img
                  src={image}
                  alt="Meme"
                  className="w-full h-full object-cover object-center"
                />
              )}
              {texts.map((text, index) => (
                <div
                  key={index}
                  style={{
                    color: text.color,
                    fontSize: `${text.size}px`,
                    fontWeight: text.bold ? "bold" : "normal",
                    position: "absolute",
                    top: text.y,
                    left: text.x,
                    zIndex: 10,
                  }}
                >
                  {text.text}
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        <button
          className="text-white bg-[#800000] px-3 py-2 rounded-md border-none"
          onClick={downloadImage}
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default MemeGenerator;
