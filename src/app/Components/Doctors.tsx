'use client'
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

interface Doctor {
  name: string;
  specialty: string;
  image: string;
}

interface Particle {
  size: number;
  x: number;
  y: number;
  opacity: number;
}

const doctors: Doctor[] = [
  { 
    name: "Dr. Sarah Connor", 
    specialty: "Cardiologist", 
    image: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg" 
  },
  { 
    name: "Dr. John Smith", 
    specialty: "Neurologist", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwhFqqbtOTAmK-E9GKRF43z1vDa6GxBkLlA&s" 
  },
  { 
    name: "Dr. Emily Watson", 
    specialty: "Pediatrician", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4OJMR-gYDLao4PDhR-P5sjEbR-uuTY5vMqQ&s" 
  },
];

export default function Doctors() {
  const [particles] = useState<Particle[]>(() => 
    Array.from({ length: 20 }, () => ({
      size: Math.random() * 10 + 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1
    }))
  );

  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await controls.start({
          backgroundPosition: ["0% 50%", "100% 50%"],
          transition: { duration: 15, ease: "linear" }
        });
        await controls.start({
          backgroundPosition: ["100% 50%", "0% 50%"],
          transition: { duration: 15, ease: "linear" }
        });
      }
    };
    sequence();
  }, [controls]);

  return (
    <div className="bg-[#0f0c29]">
      <section className="relative py-20 px-6 overflow-hidden bg-[#ca5861]">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={controls}
        style={{
          background: "linear-gradient(270deg, #0f0c29, #302b63, #24243e, #0f0c29)",
          backgroundSize: "400% 400%",
        }}
      />
      
      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#0f0c29]"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: 1,
            opacity: particle.opacity
          }}
          animate={{
            y: [`${particle.y}%`, `${particle.y + 10}%`, `${particle.y}%`],
            transition: {
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}

      <div className="text-center z-10 relative">
        {/* Heading + ECG Container */}
        <div className="relative inline-block mb-12">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-pink-500 mb-4 pb-2"
            animate={{
              scale: [1, 1.05, 1],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
          >
            Our Specialized Doctors
          </motion.h2>
          
          {/* ECG Line */}
          <motion.div
            className="absolute -bottom-4 left-0 right-0 h-12 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.8 }}
          >
            <svg
              viewBox="0 0 500 20"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <motion.path
                d="M0,10 L20,10 L30,5 L40,15 L50,5 L60,15 L70,5 L80,15 L90,10 L500,10"
                stroke="url(#ecgGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <defs>
                <linearGradient id="ecgGradient">
                  <stop offset="0%" stopColor="#3d6cb9" />
                  <stop offset="50%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#3d6cb9" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="text-xl font-medium text-orange-200 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Delivering exceptional care across a wide range of medical specialties.
        </motion.p>
      </div>
      {/* Multiple Rotating Torus Knots */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#0f0c29]">
              {/* Container for multiple knots */}
              <div className="torus-knot-container relative w-full h-full">
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className={`torus-knot animate-rotate${index % 2 === 0 ? ' left-to-right' : ' right-to-left'}`}
                    style={{
                      animationDuration: `${8 + index * 2}s`,
                      top: `${Math.random() * 80}%`,  // Random positioning
                      left: `${Math.random() * 80}%`, // Random positioning
                      opacity: 0.9 + Math.random() * 0.5, // Random opacity
                    }}
                  ></div>
                ))}
              </div>
            </div>
      {/* Doctors Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {doctors.map((doctor, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800/80 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{ y: -10 }}
          >
            {/* Animated Rings */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <motion.div
                className="relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-80"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-0 left-0 w-full h-full border-2 border-purple-300/50 rounded-full"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Doctor Image */}
            <div className="relative w-full h-64 overflow-hidden">
              <motion.img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            </div>

            {/* Doctor Info */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-white">{doctor.name}</h3>
              <p className="mt-2 text-blue-200">{doctor.specialty}</p>
              <motion.button
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Profile
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </div>
    
  );
}