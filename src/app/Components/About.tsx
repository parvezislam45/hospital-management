"use client";
import { motion } from "framer-motion";
export default function About() {
  const heartbeat = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div>
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
              className="text-3xl head md:text-4xl font-black bg-gradient-to-bl from-[#E2D1C3] to-[#f3c08e] text-transparent bg-clip-text mb-4 pb-2" // Added pb-2 for breathing room
              animate={heartbeat}
            >
              Our Specialized Services
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
            <motion.p className="text-4xl sub font-bold text-[#dbd4cb] max-w-3xl mx-auto mt-5">
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
    </div>
  );
}
