import React, { useRef, useEffect } from 'react';

const BoundingBoxDrawer = ({ imageUrl, boxes }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (canvas && ctx) {
        // resize within 640x640 while maintaining aspect ratio
        const maxDimension = 640;
        let { width, height } = image;
        if (width > height) {
          if (width > maxDimension) {
            height *= maxDimension / width;
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width *= maxDimension / height;
            height = maxDimension;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);

        const xScale = width / image.width;
        const yScale = height / image.height;

        boxes.forEach((box) => {
          let [y1, x1, y2, x2] = box.box_2d;
          y1 = (y1 / 1000) * height;
          x1 = (x1 / 1000) * width;
          y2 = (y2 / 1000) * height;
          x2 = (x2 / 1000) * width;

          if (x1 > x2) [x1, x2] = [x2, x1];
          if (y1 > y2) [y1, y2] = [y2, y1];

          ctx.beginPath();
          ctx.rect(x1, y1, x2 - x1, y2 - y1);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'red';
          ctx.stroke();
          ctx.font = '12px Arial';
          ctx.fillStyle = 'red';
          ctx.fillText(box.label, x1 + 8, y1 + 6);
        });
      }
    };
  }, [imageUrl, boxes]);

  return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />;
};

export default BoundingBoxDrawer;
