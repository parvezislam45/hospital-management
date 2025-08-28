"use client";
import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  available: boolean;
  image: string;
}

// Consistent animation for all cards - DNA Helix with particles
const CardAnimation = () => {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);
  const count = 150;

  // Create particle positions
  const particlesPosition = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 4;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 4;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
    if (particles.current) {
      particles.current.rotation.x = clock.getElapsedTime() * 0.1;
      particles.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <>
      <group ref={group}>
        <mesh>
          <torusKnotGeometry args={[0.6, 0.2, 64, 32, 2, 3]} />
          <meshPhongMaterial
            color="#ca5861"
            emissive="#ca5861"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
      <Points ref={particles} positions={particlesPosition}>
        <PointMaterial
          color="#3b82f6"
          size={0.1}
          sizeAttenuation={true}
          transparent
          opacity={0.6}
        />
      </Points>
    </>
  );
};

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  return (
    <motion.div
      className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative h-64 w-full">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 2]} intensity={0.8} />
          <CardAnimation />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-36 h-36 rounded-full bg-gray-800/80 border-2 border-blue-500/50 overflow-hidden backdrop-blur-sm">
            <img
              className="w-full h-full object-cover"
              src={doctor.image}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-t from-gray-900 to-gray-900/80">
        <h3 className="text-2xl font-bold text-white sub">{doctor.name}</h3>
        <p className="text-blue-400 text-md font-semibold mt-1 banner">{doctor.specialty}</p>

        <div className="flex items-center mt-3">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < doctor.rating ? "text-yellow-400" : "text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-400 text-sm head">
            {doctor.experience} yrs exp
          </span>
        </div>

        <button
          className={`w-full mt-4 py-2 head rounded-lg font-medium transition-colors ${
            doctor.available
              ? "bg-pink-500 hover:bg-rose-700 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {doctor.available ? "Book Appointment" : "Unavailable"}
        </button>
      </div>
    </motion.div>
  );
};

export default function Profile() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 12; // Total number of doctors
  const cardsPerView = 4; // Cards visible at once

  useEffect(() => {
    // Doctor data with images (replace with your actual image paths)
    const mockDoctors: Doctor[] = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        experience: 12,
        rating: 5,
        available: true,
        image:
          "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?semt=ais_hybrid&w=740",
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Neurologist",
        experience: 8,
        rating: 4,
        available: true,
        image:
          "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=640:*",
      },
      {
        id: 3,
        name: "Dr. Emily Wilson",
        specialty: "Pediatrician",
        experience: 15,
        rating: 5,
        available: false,
        image:
          "https://medi-center.nl/wp-content/uploads/2022/10/Female-Doctor-PNG-Transparent-1.png",
      },
      {
        id: 4,
        name: "Dr. Robert Garcia",
        specialty: "Dermatologist",
        experience: 10,
        rating: 4,
        available: true,
        image:
          "https://st4.depositphotos.com/1017986/21088/i/450/depositphotos_210888716-stock-photo-happy-doctor-with-clipboard-at.jpg",
      },
      {
        id: 5,
        name: "Dr. Jennifer Lee",
        specialty: "Surgeon",
        experience: 18,
        rating: 5,
        available: true,
        image:
          "https://content.jdmagicbox.com/comp/ongole/t4/9999p8592.8592.110117161239.z4t4/catalogue/sai-first-aid-clinic-ongole-ho-ongole-hospitals-ubbfnzwr6b.jpg",
      },
      {
        id: 6,
        name: "Dr. David Kim",
        specialty: "Radiologist",
        experience: 7,
        rating: 4,
        available: true,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUd1-NB9XGPVg_bAOvd3aFQymhQK625fiIag&s",
      },
      {
        id: 7,
        name: "Dr. Amanda Rodriguez",
        specialty: "Oncologist",
        experience: 11,
        rating: 5,
        available: false,
        image:
          "https://content.jdmagicbox.com/v2/comp/bangalore/c9/080pxx80.xx80.201130203810.r4c9/catalogue/sagar-clinic-and-daycare-jp-nagar-7th-phase-bangalore-general-physician-doctors-1pdlw8nadl-250.jpg",
      },
      {
        id: 8,
        name: "Dr. James Smith",
        specialty: "Psychiatrist",
        experience: 9,
        rating: 4,
        available: true,
        image: "https://media.emirates247.com/images/2016/01/doc2.JPG",
      },
      {
        id: 9,
        name: "Dr. Olivia Martinez",
        specialty: "Orthopedist",
        experience: 14,
        rating: 5,
        available: true,
        image:
          "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?semt=ais_hybrid&w=740",
      },
      {
        id: 10,
        name: "Dr. William Brown",
        specialty: "Endocrinologist",
        experience: 6,
        rating: 4,
        available: true,
        image:
          "https://snibbs.co/cdn/shop/articles/What_are_the_Challenges_of_Being_a_Doctor.jpg?v=1684314843",
      },
      {
        id: 11,
        name: "Dr. Sophia Davis",
        specialty: "Gastroenterologist",
        experience: 13,
        rating: 5,
        available: false,
        image:
          "https://static.vecteezy.com/system/resources/previews/002/881/697/large_2x/asian-female-doctor-giving-thumbs-up-on-white-background-photo.jpg",
      },
      {
        id: 12,
        name: "Dr. Daniel Wilson",
        specialty: "Pulmonologist",
        experience: 10,
        rating: 4,
        available: true,
        image:
          "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
      },
    ];

    setDoctors(mockDoctors);

    // Auto-rotate every 2 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (totalCards - cardsPerView + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Get current visible cards
  const visibleDoctors = doctors.slice(
    currentIndex,
    currentIndex + cardsPerView
  );
  const heartbeat = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="bg-[#0f0c29] py-12 px-4 overflow-hidden">
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
              className="text-3xl head md:text-5xl font-black bg-gradient-to-bl from-[#FFDB01] to-[#5761B2] text-transparent bg-clip-text mb-4 pb-2" // Added pb-2 for breathing room
              animate={heartbeat}
            >
              Special Doctors
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
            <motion.p className="text-4xl sub font-bold text-[#e0dcbc] max-w-3xl mx-auto mt-5">
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
      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalCards - cardsPerView + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex ? "bg-blue-500 w-6" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
