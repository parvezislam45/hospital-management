"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Patient Records",
    description:
      "Secure digital records accessible anytime, anywhere encryption and compliance.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Appointment Scheduling",
    description:
      "Easy online booking with automated reminders to reduce no-shows.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Billing & Insurance",
    description:
      "Automated billing with insurance claim processing and real-time eligibility checks.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    title: "Inventory Management",
    description:
      "Track medical supplies, medications, and equipment with automated reordering.",
  },
];

const PulseDot = ({ delay = 0 }) => (
  <motion.div
    className="w-3 h-2 bg-blue-400 rounded-full absolute"
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1.1, 0],
      opacity: [0, 0.8, 0],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const AnimatedCardBorder = () => (
  <motion.div
    className="absolute inset-0 rounded-xl overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.9 }}
  >
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-gradient-to-r from-blue-400 to-cyan-400"
        style={{
          height: "7px",
          width: "25%",
          left: `${i * 12.5}%`,
          top: 0,
          opacity: 0.9,
        }}
        animate={{
          y: ["-100%", "120%", "120%"],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 3.5,
          delay: i * 0.2,
          repeat: Infinity,
          ease: "easeIn",
        }}
      />
    ))}
  </motion.div>
);

export default function Features() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const heartbeat = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const scanline = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: "100%",
      opacity: [0, 0.7, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
        delay: 0.5,
      },
    },
  };

  return (
    <section ref={ref} className="relative py-20 bg-[#0f0c29] overflow-hidden">
      {/* Animated medical pulse dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <PulseDot key={i} delay={i * 0.15} />
        ))}
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 10,
            },
          }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl head md:text-5xl font-black bg-gradient-to-bl from-[#f5707e] to-[#fc32c2] text-transparent bg-clip-text mb-4"
            animate={heartbeat}
          >
            Comprehensive Healthcare Solutions
          </motion.h2>
          <motion.div
            className="relative inline-block mt-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.p className="text-4xl font-extrabold bg-gradient-to-bl from-[#833AB4] to-[#FCB045] text-transparent bg-clip-text sub max-w-3xl mx-auto relative mt-5">
              Our hospital management system integrates all aspects of
              healthcare operations into one seamless platform.
            </motion.p>
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-blue-500"
              variants={scanline}
              initial="hidden"
              animate="visible"
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -8,
                transition: {
                  type: "spring",
                  stiffness: 400,
                },
              }}
              className="bg-black p-8 rounded-xl shadow-lg border-2 border-gray-100 relative overflow-hidden group"
            >
              <AnimatedCardBorder />

              {/* ECG line animation */}
              <motion.div
                className="absolute top-8 left-4 right-4 h-20 opacity-70"
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
                    opacity="0.9"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="ecgGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                      <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              <motion.div
                className="text-cyan-600 mt-20 mx-auto relative z-10 w-20"
                whileHover={{
                  rotate: [0, 5, -5, 0],
                  transition: {
                    duration: 0.6,
                    repeat: 1,
                  },
                }}
              >
                {feature.icon}
              </motion.div>

              <motion.h3
                className="text-xl font-bold text-amber-600 mt-3 relative z-10 head"
                whileHover={{
                  x: [0, 2, -2, 0],
                  transition: {
                    duration: 0.6,
                  },
                }}
              >
                {feature.title}
                <motion.span
                  className="block w-24 h-1 bg-blue-400 mt-3"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{
                    scaleX: 1,
                    transition: {
                      delay: 0.3 + index * 0.1,
                      duration: 0.8,
                    },
                  }}
                />
              </motion.h3>

              <motion.p
                className="text-teal-400 relative z-10 mt-3 sub text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.4 + index * 0.1,
                  },
                }}
              >
                {feature.description}
              </motion.p>

              {/* Floating medical icons */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-gray-50 text-4xl"
                  style={{
                    top: `${Math.random() * 60 + 20}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    zIndex: 0,
                  }}
                  animate={{
                    y: [0, (Math.random() - 0.5) * 20],
                    x: [0, (Math.random() - 0.5) * 20],
                    rotate: [0, Math.random() * 360],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                >
                  {i % 3 === 0 ? "✚" : i % 3 === 1 ? "⛑" : "🩺"}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
