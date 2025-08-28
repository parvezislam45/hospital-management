'use client'
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Node = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
};

const HospitalFooter = () => {
  const [currentTime, setCurrentTime] = useState('');
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const nodesRef = useRef<Node[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);

  // Initialize scene with network animation
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / 150, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, 150);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create network nodes
    const createNetwork = () => {
      const nodeCount = 25;
      const nodes: Node[] = [];
      const nodeGroup = new THREE.Group();
      
      // Create nodes with random positions and velocities
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: (Math.random() - 0.5) * 40,
          y: (Math.random() - 0.5) * 20,
          z: (Math.random() - 0.5) * 40,
          vx: Math.random() * 0.02 - 0.01,
          vy: Math.random() * 0.02 - 0.01,
          vz: Math.random() * 0.02 - 0.01
        });

        const geometry = new THREE.SphereGeometry(0.3, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
          color: i % 3 === 0 ? 0x3b82f6 : (i % 3 === 1 ? 0x10b981 : 0xffffff),
          transparent: true,
          opacity: 0.8
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(nodes[i].x, nodes[i].y, nodes[i].z);
        nodeGroup.add(sphere);
      }
      nodesRef.current = nodes;
      scene.add(nodeGroup);

      // Create connections between nodes
      const lineGroup = new THREE.Group();
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          // Only connect nodes that are close enough
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (dist < 15) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z),
              new THREE.Vector3(nodes[j].x, nodes[j].y, nodes[j].z)
            ]);
            const material = new THREE.LineBasicMaterial({ 
              color: 0x93c5fd,
              transparent: true,
              opacity: 0.4
            });
            const line = new THREE.Line(geometry, material);
            lineGroup.add(line);
            linesRef.current.push(line);
          }
        }
      }
      scene.add(lineGroup);
    };

    createNetwork();

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Update node positions
      const nodeGroup = scene.children[0];
      if (nodeGroup instanceof THREE.Group) {
        nodesRef.current.forEach((node, i) => {
          // Update position with velocity
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;
          
          // Bounce off boundaries
          if (node.x < -20 || node.x > 20) node.vx *= -1;
          if (node.y < -10 || node.y > 10) node.vy *= -1;
          if (node.z < -20 || node.z > 20) node.vz *= -1;
          
          // Update sphere position
          const sphere = nodeGroup.children[i] as THREE.Mesh;
          sphere.position.set(node.x, node.y, node.z);
        });
      }

      // Update connections
      const lineGroup = scene.children[1];
      if (lineGroup instanceof THREE.Group) {
        let lineIndex = 0;
        const nodes = nodesRef.current;
        
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dz = nodes[i].z - nodes[j].z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            if (dist < 15 && lineIndex < linesRef.current.length) {
              const line = linesRef.current[lineIndex];
              const positions = (line.geometry.attributes.position as THREE.BufferAttribute);
              
              positions.setXYZ(0, nodes[i].x, nodes[i].y, nodes[i].z);
              positions.setXYZ(1, nodes[j].x, nodes[j].y, nodes[j].z);
              positions.needsUpdate = true;
              
              // Adjust opacity based on distance
              (line.material as THREE.LineBasicMaterial).opacity = 0.6 - (dist / 15) * 0.4;
              lineIndex++;
            }
          }
        }
      }

      // Gentle camera rotation
      camera.position.x = Math.sin(Date.now() * 0.0005) * 30;
      camera.position.z = Math.cos(Date.now() * 0.0005) * 30;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / 150;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ... (rest of the component remains the same as previous example)

  return (
    <footer className="relative bg-[#0c4a6e]/90 text-white w-full overflow-hidden">
      {/* Three.js Network Background */}
      <div 
        ref={mountRef} 
        className="absolute top-0 left-0 w-full h-[150px] pointer-events-none z-0"
      />
      
      {/* Content overlay */}
      <div className="relative z-10 py-8 px-4 mt-[150px] backdrop-blur-sm">
        {/* ... (footer content remains the same) ... */}
      </div>
    </footer>
  );
};

export default HospitalFooter;

