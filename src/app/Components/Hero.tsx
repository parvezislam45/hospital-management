"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Connection {
  from: number;
  to: number;
}

const MedicalNetworkBackground = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;
    const nodeCount = 15;
    const connectionCount = 25;

    // Generate nodes
    const newNodes: Node[] = Array.from({ length: nodeCount }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: 3 + Math.random() * 5,
      color: i % 3 === 0 ? "#3b82f6" : i % 2 === 0 ? "#10b981" : "#6366f1",
    }));

    // Generate connections
    const newConnections: Connection[] = [];
    for (let i = 0; i < connectionCount; i++) {
      const from = Math.floor(Math.random() * nodeCount);
      let to = Math.floor(Math.random() * nodeCount);
      while (to === from) {
        to = Math.floor(Math.random() * nodeCount);
      }
      newConnections.push({ from, to });
    }

    setNodes(newNodes);
    setConnections(newConnections);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full">
        {/* Connections */}
        {connections.map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`conn-${i}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth={0.9}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                strokeWidth: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill={node.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const AnimatedText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: delay,
      duration: 1.5,
    });

    return controls.stop;
  }, [count, delay, text.length]);

  return <motion.span>{displayText}</motion.span>;
};

export default function Hero() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Animated medical network background */}
      <MedicalNetworkBackground />

      {/* Pulsing grid overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-grid-white/[0.03]"
      />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="service text-amber-600">
                <AnimatedText text="We Ready " />
              </span>

              <span className="text-blue-400 service">
                <AnimatedText text="Always to" delay={0.2} />
              </span>
              <span className="service mx-3 text-orange-600">
                <AnimatedText text="Give Service" delay={0.4} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl font-bold text-gray-400 mb-8 comment"
            >
              <AnimatedText
                text="Streamlining healthcare operations with cutting-edge technology for better patient care."
                delay={0.8}
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                onHoverStart={() => setHoveredButton("primary")}
                onHoverEnd={() => setHoveredButton(null)}
                animate={{
                  y: hoveredButton === "primary" ? -5 : 0,
                  boxShadow:
                    hoveredButton === "primary"
                      ? "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-amber-700 text-white head hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold text-md"
              >
                Get Started
              </motion.button>

              <motion.button
                onHoverStart={() => setHoveredButton("secondary")}
                onHoverEnd={() => setHoveredButton(null)}
                animate={{
                  y: hoveredButton === "secondary" ? -5 : 0,
                  boxShadow:
                    hoveredButton === "secondary"
                      ? "0 10px 25px -5px rgba(255, 255, 255, 0.2)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 px-8 py-3 rounded-lg head font-semibold text-md"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <motion.img
                src="https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8441.jpg"
                alt="Hospital"
                className="w-3/4 h-[35rem] rounded-xl shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 20px 25px -5px rgba(59, 130, 246, 0.1)",
                    "0 20px 50px -5px rgba(59, 130, 246, 0.3)",
                    "0 20px 25px -5px rgba(59, 130, 246, 0.1)",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-10 -left-10 bg-amber-800 p-4 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    delay: 1,
                    type: "spring",
                    stiffness: 200,
                  },
                }}
              >
                <div className="text-white font-bold text-xl comment">
                  24/7 Emergency
                </div>
                <div className="text-white/80">
                  Immediate care when you need it
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-10 -right-10 bg-white p-4 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, 10, 0],
                }}
                transition={{
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                  scale: {
                    delay: 1.2,
                    type: "spring",
                    stiffness: 200,
                  },
                }}
              >
                <div className="text-blue-600 font-bold text-xl">
                  150+ Doctors
                </div>
                <div className="text-gray-600">
                  Expert medical professionals
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scanning pulse effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
          initial={{ y: 0 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ height: "5px" }}
        />
      </motion.div>
    </section>
  );
}
