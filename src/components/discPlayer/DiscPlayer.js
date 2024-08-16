import React, { useEffect, useRef, useState } from "react";
import useInterval from "../../hooks/useInterval";
import styles from "./discPlayer.module.css";

export default function DiscPlayer({
  url,
  canvas,
  center,
  isSpinning,
  msPerFrame,
  size,
}) {
  const [sourceImg, setSourceImg] = useState(null);
  const [, setRotation] = useState(0);
  const canvasRef = useRef(null);

  const segments = 10;
  const segAngle = 360 / segments;

  useInterval(() => {
    if (!sourceImg && !canvas) return;

    setRotation((prev) => {
      let newRot = prev + segAngle;
      if (newRot > 360) {
        const overlap = 0; //newRot - 360;
        newRot = segAngle + overlap;
      }

      // for testing
      if (!isSpinning) newRot = 0;

      if (canvas) {
        drawRotatedCircle(canvasRef.current, canvas, newRot, center, size);
      } else {
        drawRotatedCircle(canvasRef.current, sourceImg, newRot, center, size);
      }

      return newRot;
    });
  }, msPerFrame);

  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };
      image.src = url;
    }
  }, [url, sourceImg, size]);

  return (
    <div className={styles.discPlayer}>
      <canvas ref={canvasRef} />
    </div>
  );
}

const drawRotatedCircle = (canvas, image, degrees, center, size) => {
  const { width: inputW, height: inputH } = image;

  const wToHRatio = inputH / inputW;

  const outWidth = size;
  const outHeight = outWidth * wToHRatio;

  canvas.width = outWidth;
  canvas.height = outHeight;

  const ctx = canvas.getContext("2d");
  const circleRadius = canvas.width / 2;

  const canvasMiddle = { x: center.x * outWidth, y: center.y * outHeight };

  ctx.save();
  ctx.beginPath();
  ctx.arc(canvasMiddle.x, canvasMiddle.y, circleRadius, 0, Math.PI * 2);
  ctx.clip();

  ctx.translate(canvasMiddle.x, canvasMiddle.y);
  ctx.rotate(-(degrees * Math.PI) / 180);
  ctx.translate(-canvasMiddle.x, -canvasMiddle.y);
  ctx.drawImage(image, 0, 0, inputW, inputH, 0, 0, outWidth, outHeight);
  ctx.restore();

  // ctx.beginPath();
  // ctx.fillStyle = "rgba(0,255,255,0.7)";
  // ctx.arc(canvasMiddle.x, canvasMiddle.y, 10, 0, Math.PI * 2);
  // ctx.fill();
};
