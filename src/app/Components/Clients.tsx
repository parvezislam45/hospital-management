'use client'
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

type Client = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

const Client = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentClient, setCurrentClient] = useState(0);
  const [direction, setDirection] = useState(1);

  // Sample client data
  const clients: Client[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "👩‍💼",
      quote: "This service completely transformed our customer engagement metrics. Absolutely phenomenal results!"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Startup CEO",
      avatar: "👨‍💻",
      quote: "The implementation was seamless and the support team is incredibly responsive. 10/10 would recommend."
    },
    {
      id: 3,
      name: "David Wilson",
      role: "E-commerce Manager",
      avatar: "🧔‍♂️",
      quote: "Our conversion rates increased by 45% within the first month. Game changing solution!"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Creative Director",
      avatar: "👩‍🎨",
      quote: "The design flexibility allowed us to maintain our brand identity while getting all the functionality we needed."
    }
  ];

  // Rotate through clients
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentClient((prev) => (prev + 1) % clients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [clients.length]);

  // Three.js background setup
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating shapes
    const geometry = new THREE.IcosahedronGeometry(0.3, 0);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });

    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const shape = new THREE.Mesh(geometry, material.clone());
      shape.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      shape.userData = {
        speed: Math.random() * 0.002 + 0.001,
        rotationSpeed: Math.random() * 0.01 + 0.005
      };
      scene.add(shape);
      shapes.push(shape);
    }

    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotationSpeed;
        shape.rotation.y += shape.userData.rotationSpeed;
        shape.position.y += shape.userData.speed;
        if (shape.position.y > 2.5) {
          shape.position.y = -2.5;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl"
    >
      {/* Three.js background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Card content */}
      <div className="relative z-10 p-8 backdrop-blur-sm bg-black/40 text-white">
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Happy Clients
          </motion.h2>
          
          <div className="w-full max-w-lg min-h-64">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentClient}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 4 
                  }}
                  className="text-6xl mb-4"
                >
                  {clients[currentClient].avatar}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full"
                >
                  <motion.p 
                    className="text-xl italic mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {clients[currentClient].quote}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-xl font-semibold">{clients[currentClient].name}</p>
                    <p className="text-indigo-300">{clients[currentClient].role}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex mt-8 space-x-2">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentClient ? 1 : -1);
                  setCurrentClient(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${index === currentClient ? 'bg-indigo-500 scale-125' : 'bg-gray-500'}`}
              />
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg transition-colors"
          >
            View All Testimonials
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Client;