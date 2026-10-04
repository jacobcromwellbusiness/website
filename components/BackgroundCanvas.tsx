'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationId: number;
    let isDestroyed = false;

    let renderer: any, scene: any, camera: any;
    let networkGroup: any;
    let nodesMaterial: any, linesMaterial: any;

    let mouseX = 0;
    let mouseY = 0;

    if (!isDestroyed) initScene();

    function initScene() {
      const container = containerRef.current!;
      
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 15;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      networkGroup = new THREE.Group();
      const nodesCount = 400;
      const nodePositions = [];
      for(let i = 0; i < nodesCount; i++) {
        nodePositions.push(
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 20
        );
      }
      
      const nodesGeometry = new THREE.BufferGeometry();
      nodesGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(nodePositions), 3));
      nodesMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: 0x8eb5ff,
        transparent: true,
        opacity: 0.15,
        blending: THREE.NormalBlending
      });
      const nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
      networkGroup.add(nodesMesh);

      const linePositions = [];
      const maxDistance = 6.0;
      for(let i = 0; i < nodesCount; i++) {
        for(let j = i + 1; j < nodesCount; j++) {
          const dx = nodePositions[i*3] - nodePositions[j*3];
          const dy = nodePositions[i*3+1] - nodePositions[j*3+1];
          const dz = nodePositions[i*3+2] - nodePositions[j*3+2];
          const distSq = dx*dx + dy*dy + dz*dz;
          if(distSq < maxDistance * maxDistance) {
            linePositions.push(
              nodePositions[i*3], nodePositions[i*3+1], nodePositions[i*3+2],
              nodePositions[j*3], nodePositions[j*3+1], nodePositions[j*3+2]
            );
          }
        }
      }
      
      const linesGeometry = new THREE.BufferGeometry();
      linesGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
      linesMaterial = new THREE.LineBasicMaterial({
        color: 0x2f6bff,
        transparent: true,
        opacity: 0.04,
        blending: THREE.NormalBlending
      });
      const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
      networkGroup.add(linesMesh);
      scene.add(networkGroup);

      // Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Resize
      const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', resize);

      // Loader Finished Transition
      let targetOpacity = 1;
      let rotationSpeed = 1;
      let isDimmed = false;

      // Removed sessionStorage check to ensure fresh visit on every refresh

      const handleLoaderFinished = () => {
        if (isDimmed) return;
        isDimmed = true;
        // Network is already faint, just slow it down
        gsap.to({ val: 1 }, {
          val: 0,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() {
            rotationSpeed = 0.1 + this.targets()[0].val * 0.9;
          }
        });
      };
      window.addEventListener('loaderFinished', handleLoaderFinished);

      const handleCubeSolved = () => {
        if (isDimmed) return;
        const lightBlueNode = new THREE.Color(0xddebff);
        const lightBlueLine = new THREE.Color(0xaabbff);
        
        gsap.to(nodesMaterial.color, {
          r: lightBlueNode.r, g: lightBlueNode.g, b: lightBlueNode.b,
          duration: 0.4, ease: "power2.out", yoyo: true, repeat: 1
        });
        gsap.to(linesMaterial.color, {
          r: lightBlueLine.r, g: lightBlueLine.g, b: lightBlueLine.b,
          duration: 0.4, ease: "power2.out", yoyo: true, repeat: 1
        });
        gsap.to(nodesMaterial, {
          opacity: 1.0, duration: 0.4, yoyo: true, repeat: 1
        });
        gsap.to(linesMaterial, {
          opacity: 0.6, duration: 0.4, yoyo: true, repeat: 1
        });
      };
      window.addEventListener('cubeSolved', handleCubeSolved);

      const animate = () => {
        if (isDestroyed) return;
        animationId = requestAnimationFrame(animate);
        
        // Base rotation
        networkGroup.rotation.y += 0.0002 * rotationSpeed;
        networkGroup.rotation.x += 0.0001 * rotationSpeed;

        // Smooth parallax camera movement
        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animationId = requestAnimationFrame(animate);

      // Cleanup handlers
      (container as any).cleanup = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resize);
        window.removeEventListener('loaderFinished', handleLoaderFinished);
        window.removeEventListener('cubeSolved', handleCubeSolved);
      };
    }

    return () => {
      isDestroyed = true;
      if (animationId) cancelAnimationFrame(animationId);
      if (containerRef.current) {
        if ((containerRef.current as any).cleanup) (containerRef.current as any).cleanup();
        if (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: 'var(--bg-color)'
      }}
    />
  );
}
