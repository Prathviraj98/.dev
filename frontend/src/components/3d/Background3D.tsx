'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme, TimeMode } from '@/components/providers/ThemeContext';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { timeMode } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL Capability Check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) throw new Error('WebGL not supported');
    } catch (e) {
      console.warn('WebGL unavailable, fallback to CSS space gradient');
      return;
    }

    // 1. Color Palette Configurations per Time Mode
    const getTimePalettes = (mode: TimeMode) => {
      switch (mode) {
        case 'morning':
          return {
            bgHex: 0x090e18,
            fogDensity: 0.004,
            starsColor: 0xfef08a,
            gridColor: 0xf59e0b,
            particles: [
              new THREE.Color(0xf59e0b), // Amber Gold
              new THREE.Color(0x38bdf8), // Sky Cyan
              new THREE.Color(0x10b981), // Emerald
              new THREE.Color(0xf43f5e), // Sunrise Rose
            ],
            boxColors: [0xf59e0b, 0x38bdf8, 0x10b981],
          };
        case 'afternoon':
          return {
            bgHex: 0x0a1526,
            fogDensity: 0.0035,
            starsColor: 0xe0f2fe,
            gridColor: 0x0284c7,
            particles: [
              new THREE.Color(0x06b6d4), // Solar Cyan
              new THREE.Color(0x6366f1), // Electric Blue
              new THREE.Color(0xeab308), // Solar Yellow
              new THREE.Color(0x10b981), // Neon Emerald
            ],
            boxColors: [0x06b6d4, 0x6366f1, 0xeab308],
          };
        case 'evening':
          return {
            bgHex: 0x12091c,
            fogDensity: 0.0045,
            starsColor: 0xfce7f3,
            gridColor: 0xc084fc,
            particles: [
              new THREE.Color(0xec4899), // Twilight Magenta
              new THREE.Color(0xa855f7), // Purple Violet
              new THREE.Color(0xf97316), // Sunset Orange
              new THREE.Color(0x38bdf8), // Dusk Cyan
            ],
            boxColors: [0xec4899, 0xa855f7, 0xf97316],
          };
        case 'night':
        default:
          return {
            bgHex: 0x030712,
            fogDensity: 0.006,
            starsColor: 0x86efac,
            gridColor: 0x15803d,
            particles: [
              new THREE.Color(0x22c55e), // Matrix Neon Green
              new THREE.Color(0x06b6d4), // Deep Space Cyan
              new THREE.Color(0xec4899), // Hot Pink
              new THREE.Color(0x8b5cf6), // Royal Purple
            ],
            boxColors: [0x22c55e, 0x06b6d4, 0x8b5cf6],
          };
      }
    };

    const paletteConfig = getTimePalettes(timeMode);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(paletteConfig.bgHex, paletteConfig.fogDensity);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.maxWidth = '100%';
    renderer.domElement.style.maxHeight = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '0';

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Adaptive Mobile & Tablet WebGL Performance Scaling
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // 2. Deep Space Twinkling Starfield
    const starCount = isMobile ? 1200 : isTablet ? 2000 : 3200;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 350;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 350;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 250 - 50;

      starSizes[i] = Math.random() * 1.8 + 0.5;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.4,
      color: paletteConfig.starsColor,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 3. Coding Glyphs Texture Atlas
    const createCodeGlyphTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      const glyphs = ['</>', '{}', '=>', '01', '0x', ';', '&&', 'fn', 'dev', 'git', 'if', 'const', '!=', '[]', '->', '++'];
      ctx.font = 'bold 38px "JetBrains Mono", "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = 4;
      const cellW = 128;
      const cellH = 128;

      glyphs.forEach((glyph, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = col * cellW + cellW / 2;
        const y = row * cellH + cellH / 2;

        ctx.shadowColor = paletteConfig.particles[0].getStyle();
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(glyph, x, y);
      });

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const glyphTexture = createCodeGlyphTexture();

    // 4. Interactive Space Code Particles (Coding Rain Stream)
    const particleCount = isMobile ? 700 : isTablet ? 1200 : 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 110;

      velocities[i * 3] = (Math.random() - 0.5) * 0.03;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03 - 0.015; // Downward code stream
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;

      const col = paletteConfig.particles[Math.floor(Math.random() * paletteConfig.particles.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 2.5 : 3.2,
      vertexColors: true,
      map: glyphTexture,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 5. Gravitational Wave Cyber Floor Grid
    const gridSegments = isMobile ? 32 : isTablet ? 48 : 64;
    const gridGeometry = new THREE.PlaneGeometry(180, 180, gridSegments, gridSegments);
    const gridPositions = gridGeometry.attributes.position;

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: paletteConfig.gridColor,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const cyberGrid = new THREE.Mesh(gridGeometry, gridMaterial);
    cyberGrid.rotation.x = -Math.PI / 2.5;
    cyberGrid.position.y = -24;
    cyberGrid.position.z = -10;
    scene.add(cyberGrid);

    // 6. Floating 3D Code Satellites (Orbiting Microservices)
    const containerGroup = new THREE.Group();
    const boxGeometry = new THREE.BoxGeometry(6.5, 6.5, 6.5);

    const boxMaterials = paletteConfig.boxColors.map(
      (c) => new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.52 })
    );

    const boxes: THREE.Mesh[] = [];
    const boxOffsets = [
      { x: -34, y: 16, z: -18 },
      { x: 36, y: -14, z: -14 },
      { x: 0, y: 24, z: -28 },
    ];

    boxOffsets.forEach((pos, idx) => {
      const box = new THREE.Mesh(boxGeometry, boxMaterials[idx % boxMaterials.length]);
      box.position.set(pos.x, pos.y, pos.z);
      containerGroup.add(box);
      boxes.push(box);
    });

    scene.add(containerGroup);

    // Mouse Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Mouse Lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 9;
      camera.position.y = mouseY * 9;
      camera.lookAt(0, 0, 0);

      // Starfield slow rotation
      starField.rotation.y = elapsedTime * 0.01;
      starField.rotation.x = elapsedTime * 0.005;

      // Code Stream Particles Update
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += Math.sin(elapsedTime * 0.8 + i) * 0.015 + velocities[i3];
        posArray[i3 + 1] += Math.cos(elapsedTime * 0.8 + i) * 0.015 + velocities[i3 + 1];

        // Loop code rain stream
        if (posArray[i3 + 1] < -80) {
          posArray[i3 + 1] = 80;
        }

        // Repulsion around cursor
        const dx = posArray[i3] - mouseX * 30;
        const dy = posArray[i3 + 1] - mouseY * 30;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 24) {
          const force = (24 - dist) / 24;
          posArray[i3] += (dx / dist) * force * 0.7;
          posArray[i3 + 1] += (dy / dist) * force * 0.7;
        }
      }
      posAttr.needsUpdate = true;

      particleSystem.rotation.y = elapsedTime * 0.025 + mouseX * 0.15;
      particleSystem.rotation.x = mouseY * 0.1;

      // Gravitational Wave Cyber Grid Animation
      for (let i = 0; i < gridPositions.count; i++) {
        const u = gridPositions.getX(i);
        const v = gridPositions.getY(i);
        const z =
          Math.sin(u * 0.12 + elapsedTime * 1.8) * 3.0 +
          Math.cos(v * 0.12 + elapsedTime * 1.4) * 3.0;
        gridPositions.setZ(i, z);
      }
      gridPositions.needsUpdate = true;

      // Rotate Satellite Cubes
      boxes.forEach((box, i) => {
        box.rotation.x = elapsedTime * (0.35 + i * 0.1);
        box.rotation.y = elapsedTime * (0.45 + i * 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      starGeometry.dispose();
      starMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      boxGeometry.dispose();
      boxMaterials.forEach((m) => m.dispose());
      glyphTexture.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [timeMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
