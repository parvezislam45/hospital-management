"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

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
      quote:
        "This service completely transformed our customer engagement metrics. Absolutely phenomenal results!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Startup CEO",
      avatar: "👨‍💻",
      quote:
        "The implementation was seamless and the support team is incredibly responsive. 10/10 would recommend.",
    },
    {
      id: 3,
      name: "David Wilson",
      role: "E-commerce Manager",
      avatar: "🧔‍♂️",
      quote:
        "Our conversion rates increased by 45% within the first month. Game changing solution!",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Creative Director",
      avatar: "👩‍🎨",
      quote:
        "The design flexibility allowed us to maintain our brand identity while getting all the functionality we needed.",
    },
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
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Create floating shapes
    const geometry = new THREE.IcosahedronGeometry(0.3, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
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
        rotationSpeed: Math.random() * 0.01 + 0.005,
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

      shapes.forEach((shape) => {
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
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const heartbeat = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="bg-[#0f0c29] overflow-hidden">
      <section
        id="services"
        className="relative py-20 bg-[#0f0c29] overflow-hidden bg-fixed"
      >
        {/* Rotating cube background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 transform-gpu">
            <div className="cube">
              <div className="side front"></div>
              <div className="side back"></div>
              <div className="side left"></div>
              <div className="side right"></div>
              <div className="side top"></div>
              <div className="side bottom"></div>
            </div>
          </div>
        </div>
        {/* Services Content */}
        <div className="text-center z-10">
          {/* Heading + ECG Container */}
          <div className="relative inline-block mb-8">
            {" "}
            {/* Added mb-8 for spacing */}
            <motion.h1
              className="text-3xl head md:text-5xl font-black bg-gradient-to-bl from-[#FD8451] to-[#FFBD6F] text-transparent bg-clip-text mb-4 pb-2" // Added pb-2 for breathing room
              animate={heartbeat}
            >
              Happy Clients
            </motion.h1>
            {/* ECG Line - Positioned at bottom of h2 */}
            <motion.div
              className="absolute top-14 left-0 right-0 h-16 opacity-100" // Adjusted height/position
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.8 }}
            >
              <svg
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <motion.path
                  d="M0,10 L10,10 L15,5 L20,15 L25,5 L30,15 L35,5 L40,15 L45,10 L100,10"
                  stroke="url(#ecgGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <defs>
                  <linearGradient
                    id="ecgGradient"
                    x1="100%"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3d6cb9" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#00fff0" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div className="relative" whileHover={{ scale: 1.02 }}>
            <motion.p className="text-4xl sub font-bold text-[#FD8451] max-w-3xl mx-auto mt-5">
              Delivering exceptional care across a wide range of medical
              specialties.We Provide World Class Service
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/3 w-64 h-64 transform-gpu">
            <div className="cube">
              <div className="side front"></div>
              <div className="side back"></div>
              <div className="side left"></div>
              <div className="side right"></div>
              <div className="side top"></div>
              <div className="side bottom"></div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative h-[40rem] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-bl from-blue-900 via-gray-800 to-black mt-10">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Layer 1: Pulsating gradient circles */}
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-r from-purple-800 via-pink-800 to-yellow-800 opacity-20 rounded-full"
            animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 right-0 w-[150%] h-[150%] bg-gradient-to-l from-green-700 via-orange-700 to-indigo-700 opacity-30 rounded-full"
            animate={{ scale: [1, 1.8, 1], rotate: [360, 0, 360] }}
            transition={{ duration: 20, repeat: Infinity }}
          ></motion.div>

          {/* Layer 2: Rotating star-like shapes */}
          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 25, repeat: Infinity }}
          >
            <div className="w-96 h-96 bg-gradient-to-r from-red-700 to-yellow-800 opacity-10 skew-x-12 rounded-full"></div>
          </motion.div>

          {/* Layer 3: Slowly moving light gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-800 via-purple-800 to-green-700 opacity-10"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 30, repeat: Infinity }}
          ></motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl"
        >
          {/* Three.js background */}
          <div
            ref={mountRef}
            className="absolute inset-0 w-full h-full bg-[#0f0c29]"
          />

          {/* Card content */}
          <div className="relative z-10 p-8 backdrop-blur-sm bg-black/40 text-white">
            <div className="flex flex-col items-center text-center head">
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
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 4,
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
                        className="text-xl italic mb-6 leading-relaxed comment"
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
                        <p className="text-xl font-semibold name">
                          {clients[currentClient].name}
                        </p>
                        <p className="text-indigo-300">
                          {clients[currentClient].role}
                        </p>
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
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentClient
                        ? "bg-indigo-500 scale-125"
                        : "bg-gray-500"
                    }`}
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
      </div>
    </div>
  );
};

export default Client;
