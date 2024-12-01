import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

interface VolPoint {
  strike: number;
  maturity: number;
  volatility: number;
}

const generateVolData = (): VolPoint[] => {
  const data: VolPoint[] = [];
  const strikes = Array.from({ length: 20 }, (_, i) => 0.8 + i * 0.02); // 0.8 to 1.2
  const maturities = Array.from({ length: 20 }, (_, i) => 1 + i * 30); // 1 to 600 days

  strikes.forEach(strike => {
    maturities.forEach(maturity => {
      // EUR/USD typical vol surface shape
      const atmVol = 8; // At-the-money volatility
      const skew = -0.2 * Math.log(strike); // Negative skew
      const term = 0.1 * Math.log(maturity); // Term structure
      const smile = 0.3 * (strike - 1) ** 2; // Volatility smile
      
      const vol = atmVol + skew + term + smile;
      data.push({
        strike,
        maturity,
        volatility: Math.max(1, Math.min(20, vol)) // Cap between 1% and 20%
      });
    });
  });

  return data;
};

const createLabel = (text: string, position: THREE.Vector3): CSS2DObject => {
  const div = document.createElement('div');
  div.className = 'label';
  div.textContent = text;
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  div.style.color = 'white';
  div.style.padding = '2px 4px';
  div.style.borderRadius = '2px';
  div.style.fontSize = '10px';
  return new CSS2DObject(div);
};

const VolatilitySurfaceChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const labelRendererRef = useRef<CSS2DRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#1a1a1a');

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Label Renderer
    const labelRenderer = new CSS2DRenderer();
    labelRendererRef.current = labelRenderer;
    labelRenderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    containerRef.current.appendChild(labelRenderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, labelRenderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Generate vol surface mesh
    const volData = generateVolData();
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshPhongMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      shininess: 50,
    });

    const vertices: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    const strikeCount = 20;
    const maturityCount = 20;

    // Color palette
    const colorScale = (value: number) => {
      const brown = new THREE.Color('#8B4513');
      const salmon = new THREE.Color('#FA8072');
      const offWhite = new THREE.Color('#FDF5E6');
      
      if (value < 0.5) {
        return brown.lerp(salmon, value * 2);
      } else {
        return salmon.lerp(offWhite, (value - 0.5) * 2);
      }
    };

    // Create vertices and colors
    volData.forEach((point, i) => {
      const x = (point.strike - 1) * 2; // Center around ATM
      const y = point.volatility * 0.1;
      const z = point.maturity / 100 - 3;

      vertices.push(x, y, z);

      const color = colorScale(point.volatility / 20);
      colors.push(color.r, color.g, color.b);

      // Add labels at key points
      if (i % maturityCount === 0 || i % strikeCount === 0) {
        const position = new THREE.Vector3(x, -0.2, z);
        const label = createLabel(
          `${point.strike.toFixed(2)}`,
          position
        );
        scene.add(label);
      }

      if (i < maturityCount) {
        const position = new THREE.Vector3(-1, -0.2, z);
        const label = createLabel(
          `${point.maturity}d`,
          position
        );
        scene.add(label);
      }
    });

    // Create faces
    for (let i = 0; i < strikeCount - 1; i++) {
      for (let j = 0; j < maturityCount - 1; j++) {
        const a = i * maturityCount + j;
        const b = i * maturityCount + j + 1;
        const c = (i + 1) * maturityCount + j + 1;
        const d = (i + 1) * maturityCount + j;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add axes with labels
    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);

    // Add axis labels
    const xLabel = createLabel('Strike', new THREE.Vector3(1.2, 0, 0));
    const yLabel = createLabel('Volatility', new THREE.Vector3(0, 1.2, 0));
    const zLabel = createLabel('Maturity', new THREE.Vector3(0, 0, 1.2));
    scene.add(xLabel);
    scene.add(yLabel);
    scene.add(zLabel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      labelRenderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
        containerRef.current.removeChild(labelRenderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[400px] w-full relative" />
  );
};

export default VolatilitySurfaceChart;