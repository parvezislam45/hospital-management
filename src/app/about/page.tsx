"use client";
// components/AboutSection.tsx
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  const isSection1InView = useInView(section1Ref, { once: false, amount: 0.5 });
  const isSection2InView = useInView(section2Ref, { once: false, amount: 0.5 });
  const isSection3InView = useInView(section3Ref, { once: false, amount: 0.5 });
  const isSection4InView = useInView(section4Ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Medical-themed particles
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Medical-themed colors (blues, whites, soft greens)
      colors[i * 3] = Math.random() * 0.2 + 0.7; // R
      colors[i * 3 + 1] = Math.random() * 0.3 + 0.7; // G
      colors[i * 3 + 2] = Math.random() * 0.5 + 0.5; // B
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // DNA Helix for medical theme
    const dnaGeometry = new THREE.BufferGeometry();
    const dnaCount = 100;
    const dnaPositions = new Float32Array(dnaCount * 3);
    const dnaColors = new Float32Array(dnaCount * 3);

    for (let i = 0; i < dnaCount; i++) {
      const t = (i / dnaCount) * Math.PI * 4;
      const x = Math.sin(t) * 1.5;
      const y = Math.cos(t) * 1.5;
      const z = i * 0.1 - dnaCount * 0.05;

      dnaPositions[i * 3] = x;
      dnaPositions[i * 3 + 1] = y;
      dnaPositions[i * 3 + 2] = z;

      // Alternating colors for DNA
      const isEven = i % 2 === 0;
      dnaColors[i * 3] = isEven ? 0.1 : 0.9;
      dnaColors[i * 3 + 1] = isEven ? 0.3 : 0.2;
      dnaColors[i * 3 + 2] = isEven ? 0.8 : 0.1;
    }

    dnaGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dnaPositions, 3)
    );
    dnaGeometry.setAttribute("color", new THREE.BufferAttribute(dnaColors, 3));

    const dnaMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      linewidth: 2,
    });
    const dnaLine = new THREE.Line(dnaGeometry, dnaMaterial);
    scene.add(dnaLine);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;

      dnaLine.rotation.y += 0.01;
      dnaLine.position.y = Math.sin(Date.now() * 0.001) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const featureVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#0f0c29] overflow-hidden">
      {/* Three.js Background */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Transforming Healthcare Management
          </motion.h1>
          <motion.p
            className="text-xl text-white max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Our comprehensive hospital management system integrates cutting-edge
            technology with patient-centered care to streamline operations and
            improve outcomes.
          </motion.p>
        </motion.div>

        {/* Section 1: Overview */}
        <motion.section
          ref={section1Ref}
          className="mb-32 grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isSection1InView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-6">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-lg text-white mb-6">
              Our hospital management system provides end-to-end solutions for
              modern healthcare facilities, combining patient care,
              administrative functions, and clinical operations into a seamless
              platform.
            </p>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start"
                variants={featureVariants}
              >
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-3 mt-1">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white">
                  Integrated patient records management
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={featureVariants}
              >
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-3 mt-1">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white">
                  Real-time appointment scheduling
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                variants={featureVariants}
              >
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-3 mt-1">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white">
                  Automated billing and insurance processing
                </span>
              </motion.li>
            </ul>
          </motion.div>
          <motion.div
            className="relative h-96 bg-blue-950/60 rounded-xl overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-block p-8 bg-sky-800 rounded-full shadow-lg mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-amber-700"
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
                </div>
                <h3 className="text-4xl font-bold text-white">
                  Interactive Dashboard
                </h3>
                <p className="text-white mt-2 font-semibold text-xl">
                  Visualize hospital operations in real-time
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 2: Technology */}
        <motion.section
          ref={section2Ref}
          className="mb-32 grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isSection2InView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="relative h-96 bg-blue-950/60 rounded-xl overflow-hidden order-2 md:order-1"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-block p-8 bg-blue-800 rounded-full shadow-lg mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Advanced Analytics
                </h3>
                <p className="text-white mt-2">
                  Data-driven insights for better decision making
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="order-1 md:order-2" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-6">
              Cutting-Edge Technology
            </h2>
            <p className="text-lg text-white mb-6">
              Leveraging the latest advancements in healthcare technology to
              deliver secure, scalable, and intuitive solutions for medical
              professionals and patients alike.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="p-6 bg-blue-800/60 rounded-lg shadow-md"
                variants={featureVariants}
                whileHover={{ y: -5 }}
              >
                <div className="mb-3 inline-flex items-center justify-center p-3 bg-cyan-700 rounded-full text-white shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <h3 className="font-semibold text-lg mb-2 text-white">
                  HIPAA Compliant
                </h3>
                <p className="text-white">
                  Enterprise-grade security for patient data
                </p>
              </motion.div>
              <motion.div
                className="p-6 bg-blue-800/60 rounded-lg shadow-md"
                variants={featureVariants}
                whileHover={{ y: -5 }}
              >
                <div className="mb-3 inline-flex items-center justify-center p-3 bg-cyan-700 rounded-full text-white shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
                <p className="text-white">
                  Smart diagnostics and predictive analytics
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 3: Patient Care */}
        <motion.section
          ref={section3Ref}
          className="mb-32"
          initial="hidden"
          animate={isSection3InView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-4">
              Enhancing Patient Care
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Our system puts patients at the center, improving their experience
              and outcomes through technology-enabled care coordination.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-blue-950/60 p-8 rounded-xl shadow-lg"
              variants={featureVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Patient Portal</h3>
              <p className="text-white">
                Secure access to medical records, test results, and
                communication with providers.
              </p>
            </motion.div>
            <motion.div
              className="bg-blue-950/60 p-8 rounded-xl shadow-lg"
              variants={featureVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
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
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Appointment Management
              </h3>
              <p className="text-white">
                Easy scheduling, reminders, and telehealth options for better
                access to care.
              </p>
            </motion.div>
            <motion.div
              className="bg-blue-950/60 p-8 rounded-xl shadow-lg"
              variants={featureVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
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
              </div>
              <h3 className="text-xl font-semibold mb-3">Care Coordination</h3>
              <p className="text-white">
                Seamless communication between care teams for comprehensive
                treatment plans.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 4: Benefits */}
        <motion.section
          ref={section4Ref}
          className="mb-32 grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isSection4InView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-6">
              Operational Excellence
            </h2>
            <p className="text-lg text-white mb-6">
              Our hospital management system drives efficiency across all
              departments, reducing administrative burden and allowing staff to
              focus on what matters most - patient care.
            </p>
            <div className="space-y-6">
              <motion.div
                className="flex items-start"
                variants={featureVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 bg-blue-800 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    30% Faster Admissions
                  </h3>
                  <p className="text-white">
                    Streamlined processes reduce patient wait times
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start"
                variants={featureVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 bg-cyan-800 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    25% Cost Reduction
                  </h3>
                  <p className="text-white">
                    Automation eliminates redundant tasks
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start"
                variants={featureVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 bg-teal-800 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    95% Satisfaction
                  </h3>
                  <p className="text-white">
                    Both patients and staff report higher satisfaction
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="relative h-96 bg-blue-950/60 rounded-xl overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-block p-8 bg-blue-800 rounded-full shadow-lg mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Performance Metrics
                </h3>
                <p className="text-white mt-2">
                  Track and improve key operational indicators
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutSection;
