import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface RoseBouquet3DProps {
  modelPath?: string;
  className?: string;
}

export const RoseBouquet3D: React.FC<RoseBouquet3DProps> = ({
  modelPath = '/models/bouquet-rose-red/source/rose-bouquet-red.glb',
  className = 'w-full h-[360px] sm:h-[420px]'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 4.0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1.8;
    controls.maxDistance = 6.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.3;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffd6e8, 1.5);
    dirLight2.position.set(-5, 4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xff6fa8, 1.2, 10);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    let model: THREE.Group | null = null;
    let animFrameId: number;

    // Load GLTF / GLB Model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;

        // Auto center and scale model to fit
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        const targetSize = 2.4;
        const scale = targetSize / maxDim;
        model.scale.set(scale, scale, scale);

        // Center pivot
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale - 0.25;
        model.position.z = -center.z * scale;

        scene.add(model);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model:', error);
        setLoadError(true);
        setLoading(false);
      }
    );

    // Animation Loop
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [modelPath]);

  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading state */}
      {loading && !loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/50 backdrop-blur-xs rounded-[24px]">
          <span className="text-4xl animate-bounce">🌹</span>
          <p className="font-display text-[#ff6fa8] font-semibold text-sm">
            Menyiapkan buket mawar 3D... ✨
          </p>
        </div>
      )}

      {/* Error state */}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="text-4xl">🌹</span>
          <p className="text-sm text-[#8a5f82] font-semibold">
            Buket Mawar Merah Spesial 🎀
          </p>
        </div>
      )}
    </div>
  );
};
