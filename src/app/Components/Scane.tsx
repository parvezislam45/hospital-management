'use client'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';


const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f9ff);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Controls
   
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);
    
    // Hospital building
    const createBuilding = (width, height, depth, color, x, z) => {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshPhongMaterial({ color });
      const building = new THREE.Mesh(geometry, material);
      building.position.set(x, height/2, z);
      scene.add(building);
      
      // Add windows
      if (height > 3) {
        const windowColor = 0xadd8e6;
        const windowMaterial = new THREE.MeshPhongMaterial({ color: windowColor });
        
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const windowGeometry = new THREE.PlaneGeometry(0.8, 0.8);
            const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
            windowMesh.position.set(
              x - width/2 + (j+1) * (width/4),
              i * 2 + 1.5,
              z + depth/2 + 0.01
            );
            windowMesh.rotation.y = Math.PI;
            scene.add(windowMesh);
          }
        }
      }
      
      return building;
    };
    
    // Main hospital building
    const mainBuilding = createBuilding(8, 6, 6, 0xffffff, 0, 0);
    
    // Wings
    createBuilding(4, 4, 8, 0xe6e6e6, -6, 0);
    createBuilding(4, 4, 8, 0xe6e6e6, 6, 0);
    
    // Emergency entrance
    const emergencyGeometry = new THREE.ConeGeometry(1, 2, 4);
    const emergencyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const emergency = new THREE.Mesh(emergencyGeometry, emergencyMaterial);
    emergency.position.set(0, 7, -3);
    emergency.rotation.x = Math.PI / 2;
    scene.add(emergency);
    
    // Helicopter pad
    const padGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
    const padMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const pad = new THREE.Mesh(padGeometry, padMaterial);
    pad.position.set(-5, 0.2, 7);
    scene.add(pad);
    
    // H symbol for helipad
    const hGeometry = new THREE.BoxGeometry(1.5, 0.2, 0.2);
    const hBarGeometry = new THREE.BoxGeometry(0.2, 0.2, 1);
    const hMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    
    const h1 = new THREE.Mesh(hGeometry, hMaterial);
    const h2 = new THREE.Mesh(hGeometry, hMaterial);
    const hBar = new THREE.Mesh(hBarGeometry, hMaterial);
    
    h1.position.set(-5, 0.4, 7);
    h2.position.set(-5, 0.4, 7);
    hBar.position.set(-5, 0.4, 7);
    
    scene.add(h1);
    scene.add(h2);
    scene.add(hBar);
    
    // Animated ambulance
    const ambulanceGeometry = new THREE.BoxGeometry(1.5, 1, 3);
    const ambulanceMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const ambulance = new THREE.Mesh(ambulanceGeometry, ambulanceMaterial);
    ambulance.position.set(3, 0.5, -8);
    scene.add(ambulance);
    
    // Light on top of ambulance
    const lightGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.2);
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 2 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(3, 1.2, -8);
    scene.add(light);
    
    // Animation loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate emergency light
      emergency.rotation.z += 0.02;
      
      // Flash ambulance light
      lightMaterial.emissiveIntensity = 2 + Math.sin(Date.now() * 0.01) * 2;
      
      // Move ambulance
      ambulance.position.z += 0.02;
      if (ambulance.position.z > 10) {
        ambulance.position.z = -8;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  
  return <div ref={mountRef} className="w-full h-full" />;
};

export default Scene;