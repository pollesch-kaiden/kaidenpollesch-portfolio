import { useEffect, useRef, useState } from "react";

interface HexByte {
  x: number;
  y: number;
  value: string;
}

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const hexBytesRef = useRef<HexByte[]>([]);
  const animationRef = useRef<number>();

  const RADIUS = 150;
  const HEX_SPACING = 40;
  const GRID_SIZE = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeHexBytes();
    };

    const initializeHexBytes = () => {
      hexBytesRef.current = [];
      const cols = Math.ceil(canvas.width / HEX_SPACING) + 1;
      const rows = Math.ceil(canvas.height / HEX_SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          hexBytesRef.current.push({
            x: i * HEX_SPACING,
            y: j * HEX_SPACING,
            value: "00",
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    const getHexValue = (distance: number) => {
      if (distance > RADIUS) return "00";
      const intensity = Math.max(0, (RADIUS - distance) / RADIUS);
      const value = Math.floor(intensity * 255);
      return value.toString(16).toUpperCase().padStart(2, "0");
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw hex bytes
      hexBytesRef.current.forEach((hexByte) => {
        const distance = calculateDistance(
          hexByte.x,
          hexByte.y,
          mousePos.x,
          mousePos.y,
        );
        hexByte.value = getHexValue(distance);

        // Calculate opacity based on distance
        const opacity =
          distance > RADIUS ? 0.1 : Math.max(0.1, (RADIUS - distance) / RADIUS);

        ctx.font = "12px monospace";
        ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
        ctx.textAlign = "center";
        ctx.fillText(hexByte.value, hexByte.x, hexByte.y);
      });

      // Draw cursor radius (optional visual aid)
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, RADIUS, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(0, 255, 0, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "#0a0a0a" }}
    />
  );
};

export default BackgroundAnimation;
