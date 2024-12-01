import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as d3 from "d3";

const VolatilitySurfaceChart: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = mountRef.current?.clientWidth || 800;
    const height = mountRef.current?.clientHeight || 600;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20; // Adjusted to fit the entire structure

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x1a202c, 1); // Match the container's background
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    mountRef.current?.appendChild(renderer.domElement);

    // Create a grid of points
    const data = d3.range(0, 2, 0.02).map((x) =>
      d3.range(0, 2, 0.02).map((y) => ({
        x: x * 5,
        y: y * 5,
        z: Math.sin(x * Math.PI * 2) * Math.cos(y * Math.PI * 2),
      }))
    );

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];

    // Generate vertices and colors

    data.forEach((row) => {
      row.forEach((point) => {
        vertices.push(point.x, point.y, point.z);
        const color = new THREE.Color();
        const ratio = point.z + 1; // Normalize between 0 and 1
        color.setHSL(0.6 * ratio, 0.8, 0.6); // Brightened gradient
        colors.push(color.r, color.g, color.b);
      });
    });

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1, // Larger points for better visibility
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    points.position.set(-5, -5, 0); // Center the grid
    points.scale.set(4, 4, 4); // Scale to enhance visibility
    scene.add(points);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.x += 0.01;
      points.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "500px", // Fixed height
        position: "relative", // Keep the WebGL canvas contained
        margin: "0 auto",
        backgroundColor: "#1a202c",
        borderRadius: "8px",
        overflow: "hidden", // Prevent overflow
      }}
    >
      <p style={{ fontSize: "18px", color: "#a0aec0" }}>
        3D Volatility Surface for EUR/USD
      </p>
    </div>
  );
};

export default VolatilitySurfaceChart;
