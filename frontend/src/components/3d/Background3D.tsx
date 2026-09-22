'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/components/providers/ThemeContext';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDaytime } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL Check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) throw new Error('WebGL not supported');
    } catch (e) {
      console.warn('WebGL disabled, fallback to ambient gradient');
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    // Day vs Night Coding Theme Color Configurations
    const isDay = isDaytime;
    const bgHex = isDay ? 0x0e1726 : 0x050811;
    const fogDensity = isDay ? 0.0035 : 0.007;

    scene.fog = new THREE.FogExp2(bgHex, fogDensity);

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
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '0';

    // Clear old elements if re-mounting
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 1. Coding Glyphs Texture Atlas Canvas
    const createCodeGlyphTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Draw grid of code symbols on canvas
      const glyphs = ['</>', '{}', '=>', '01', '0x', ';', '&&', 'fn', 'dev', 'git', 'if', 'const', '!=', '[]', '->', '++'];
      ctx.font = 'bold 36px "JetBrains Mono", "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = 4;
      const rows = 4;
      const cellW = 128;
      const cellH = 128;

      glyphs.forEach((glyph, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = col * cellW + cellW / 2;
        const y = row * cellH + cellH / 2;

        // Glow effect
        ctx.shadowColor = isDay ? 'rgba(56, 189, 248, 0.9)' : 'rgba(34, 197, 94, 0.9)';
        ctx.shadowBlur = 12;

        ctx.fillStyle = '#ffffff';
        ctx.fillText(glyph, x, y);
      });

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const glyphTexture = createCodeGlyphTexture();

    // 2. Interactive Code Particles (3D Code Symbols & Floating Binary Nodes)
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    // Coding IDE Color Palettes:
    // Day (Bright Cyber IDE): Solar Cyan, Bright Gold, Lime Green, Electric Violet
    // Night (Dark Matrix Hacker): Neon Matrix Green, Cyan Cyber, Hot Pink, Royal Purple
    const palette = isDay
      ? [new THREE.Color(0x38bdf8), new THREE.Color(0xf59e0b), new THREE.Color(0x10b981), new THREE.Color(0xa855f7)]
      : [new THREE.Color(0x22c55e), new THREE.Color(0x06b6d4), new THREE.Color(0xec4899), new THREE.Color(0x8b5cf6)];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      velocities[i * 3] = (Math.random() - 0.5) * (isDay ? 0.035 : 0.025);
      velocities[i * 3 + 1] = (Math.random() - 0.5) * (isDay ? 0.035 : 0.025) - 0.01; // subtle downward code fall
      velocities[i * 3 + 2] = (Math.random() - 0.5) * (isDay ? 0.035 : 0.025);

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isDay ? 3.2 : 2.6,
      vertexColors: true,
      map: glyphTexture,
      transparent: true,
      opacity: isDay ? 0.95 : 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 3. Perspective Cyber Code Grid Floor
    const gridGeometry = new THREE.PlaneGeometry(160, 160, 60, 60);
    const gridPositions = gridGeometry.attributes.position;

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: isDay ? 0x0284c7 : 0x15803d,
      wireframe: true,
      transparent: true,
      opacity: isDay ? 0.52 : 0.35, // High contrast grid visibility
    });

    const cyberGrid = new THREE.Mesh(gridGeometry, gridMaterial);
    cyberGrid.rotation.x = -Math.PI / 2.6;
    cyberGrid.position.y = -22;
    cyberGrid.position.z = -10;
    scene.add(cyberGrid);

    // 4. Floating 3D Code Container Blocks (Representing Microservices / Docker Containers)
    const containerGroup = new THREE.Group();
    const boxGeometry = new THREE.BoxGeometry(6, 6, 6);

    const boxMaterials = [
      new THREE.MeshBasicMaterial({ color: isDay ? 0x38bdf8 : 0x22c55e, wireframe: true, transparent: true, opacity: isDay ? 0.6 : 0.4 }),
      new THREE.MeshBasicMaterial({ color: isDay ? 0xf59e0b : 0x8b5cf6, wireframe: true, transparent: true, opacity: isDay ? 0.55 : 0.38 }),
      new THREE.MeshBasicMaterial({ color: isDay ? 0x10b981 : 0xec4899, wireframe: true, transparent: true, opacity: isDay ? 0.58 : 0.42 }),
    ];

    const boxes: THREE.Mesh[] = [];
    const boxOffsets = [
      { x: -32, y: 14, z: -16 },
      { x: 34, y: -12, z: -12 },
      { x: 0, y: 22, z: -25 },
    ];

    boxOffsets.forEach((pos, idx) => {
      const box = new THREE.Mesh(boxGeometry, boxMaterials[idx % boxMaterials.length]);
      box.position.set(pos.x, pos.y, pos.z);
      containerGroup.add(box);
      boxes.push(box);
    });

    scene.add(containerGroup);

    // Mouse Lerp & Interaction
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

      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 8;
      camera.position.y = mouseY * 8;
      camera.lookAt(0, 0, 0);

      // Particle Code Stream Physics
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += Math.sin(elapsedTime * 0.8 + i) * 0.015 + velocities[i3];
        posArray[i3 + 1] += Math.cos(elapsedTime * 0.8 + i) * 0.015 + velocities[i3 + 1];

        // Reset code particles when they fall off screen bottom
        if (posArray[i3 + 1] < -70) {
          posArray[i3 + 1] = 70;
        }

        // Repulsion around mouse cursor
        const dx = posArray[i3] - mouseX * 28;
        const dy = posArray[i3 + 1] - mouseY * 28;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 22) {
          const force = (22 - dist) / 22;
          posArray[i3] += (dx / dist) * force * 0.6;
          posArray[i3 + 1] += (dy / dist) * force * 0.6;
        }
      }
      posAttr.needsUpdate = true;

      particleSystem.rotation.y = elapsedTime * 0.03 + mouseX * 0.2;
      particleSystem.rotation.x = mouseY * 0.1;

      // Cyber Grid Code Waves
      for (let i = 0; i < gridPositions.count; i++) {
        const u = gridPositions.getX(i);
        const v = gridPositions.getY(i);
        const z =
          Math.sin(u * 0.12 + elapsedTime * 1.8) * 2.8 +
          Math.cos(v * 0.12 + elapsedTime * 1.4) * 2.8;
        gridPositions.setZ(i, z);
      }
      gridPositions.needsUpdate = true;

      // Rotate Microservice Code Blocks
      boxes.forEach((box, i) => {
        box.rotation.x = elapsedTime * (0.3 + i * 0.1);
        box.rotation.y = elapsedTime * (0.4 + i * 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

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
  }, [isDaytime]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-1000"
      aria-hidden="true"
    />
  );
}
