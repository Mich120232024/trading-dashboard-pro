import React, { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface VolPoint {
  strike: number;
  maturity: number;
  volatility: number;
}

const generateVolData = () => {
  const data: VolPoint[] = [];
  // EUR/USD typical vol surface
  for (let k = 0.8; k <= 1.2; k += 0.02) {
    // strikes from 0.8 to 1.2
    for (let t = 1; t <= 365; t += 7) {
      // maturities from 1 to 365 days
      const atmVol = 8; // base ATM vol
      const skew = -2 * Math.log(k); // negative skew for FX
      const term = 0.5 * Math.log(t / 30); // term structure
      const smile = 2 * (k - 1) * (k - 1); // vol smile

      const vol = atmVol + skew + term + smile;
      data.push({
        strike: k,
        maturity: t,
        volatility: Math.max(1, Math.min(20, vol)), // cap between 1% and 20%
      });
    }
  }
  return data;
};

const VolatilitySurfaceChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1f2937");

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 2, 2);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Generate surface geometry
    const volData = generateVolData();
    const geometry = new THREE.PlaneGeometry(2, 2, 50, 50);

    // Create surface material with custom colors
    const material = new THREE.MeshPhongMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      shininess: 70,
    });

    // Update vertices and add colors
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);

      // Map x,z to strike,maturity
      const strike = 1 + x * 0.2; // center around ATM
      const maturity = 180 + z * 180; // 0-360 days

      // Find nearest vol point
      const vol =
        volData.find(
          (p) =>
            Math.abs(p.strike - strike) < 0.02 &&
            Math.abs(p.maturity - maturity) < 7
        )?.volatility || 10;

      // Set height based on volatility
      positions.setY(i, (vol - 10) * 0.05);

      // Color based on volatility
      const t = (vol - 5) / 15; // normalize to 0-1
      if (t < 0.5) {
        // Interpolate between salmon and off-white
        colors[i * 3] = 0.98 - t * 0.36; // R: 250->157
        colors[i * 3 + 1] = 0.5 - t * 0.17; // G: 128->85
        colors[i * 3 + 2] = 0.45 - t * 0.16; // B: 114->69
      } else {
        // Interpolate between off-white and brown
        colors[i * 3] = 0.62 - (t - 0.5) * 0.54; // R: 157->20
        colors[i * 3 + 1] = 0.33 - (t - 0.5) * 0.27; // G: 85->15
        colors[i * 3 + 2] = 0.27 - (t - 0.5) * 0.23; // B: 69->10
      }
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Grid helper
    const gridHelper = new THREE.GridHelper(2, 20, 0x444444, 0x444444);
    scene.add(gridHelper);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[400px] w-full bg-gray-800 rounded-lg"
    />
  );
};

export default VolatilitySurfaceChart;
