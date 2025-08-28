'use client'
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

export default function HospitalManagementPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  
  // Section scroll progress
  const section1Progress = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const section2Progress = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const section3Progress = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const section4Progress = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  // Active section state
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.25) setActiveSection(1);
      else if (latest < 0.5) setActiveSection(2);
      else if (latest < 0.75) setActiveSection(3);
      else setActiveSection(4);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Three.js animation setup
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);

    // Create medical-themed particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;

    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Medical-themed colors (blues, whites, greens)
    const colors = [
      new THREE.Color(0x4fc3f7), // light blue
      new THREE.Color(0xffffff), // white
      new THREE.Color(0x81c784), // light green
      new THREE.Color(0x64b5f6), // blue
      new THREE.Color(0xe0f7fa), // very light blue
    ];

    const colorArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Navigation dots
  const navItems = [
    { id: 1, label: 'Home' },
    { id: 2, label: 'Services' },
    { id: 3, label: 'Technology' },
    { id: 4, label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>Advanced Hospital Management System</title>
        <meta name="description" content="Innovative healthcare solutions for modern hospitals" />
      </Head>

      {/* Three.js background */}
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                const section = document.getElementById(`section-${item.id}`);
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative flex items-center justify-end w-8 h-8 focus:outline-none"
              whileHover={{ scale: 1.2 }}
            >
              <motion.span
                className={`block w-3 h-3 rounded-full ${activeSection === item.id ? 'bg-white' : 'bg-gray-400'}`}
                initial={false}
                animate={{
                  scale: activeSection === item.id ? 1.5 : 1,
                  opacity: activeSection === item.id ? 1 : 0.6
                }}
                transition={{ type: 'spring', stiffness: 500 }}
              />
              <motion.span 
                className="absolute right-8 text-white text-sm font-medium pr-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: activeSection === item.id ? 1 : 0,
                  x: activeSection === item.id ? 0 : 20
                }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                {item.label}
              </motion.span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10">
        {/* Section 1: Hero */}
        <section 
          id="section-1" 
          className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f0c29]"
        >
          <div className="container mx-auto px-6 py-20 z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                style={{ opacity: section1Progress }}
              >
                <span className="block">Revolutionizing</span>
                <span className="block text-blue-300">Healthcare</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
                style={{ opacity: section1Progress }}
              >
                Advanced hospital management solutions for better patient care and operational efficiency
              </motion.p>
              
              <motion.div
                style={{ opacity: section1Progress }}
              >
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explore Solutions
                </button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>

          {/* Animated medical icons */}
          <AnimatePresence>
            <motion.div 
              className="absolute top-1/4 left-1/4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1, rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <MedicalIcon className="w-16 h-16 text-blue-400" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/3 right-1/4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.2, scale: 1, rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <HeartPulseIcon className="w-20 h-20 text-pink-400" />
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Section 2: Services */}
        <section 
          id="section-2" 
          className="min-h-screen flex items-center justify-center bg-[#0f0c29] relative overflow-hidden"
        >
          <div className="container mx-auto px-6 py-20 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-white mb-4"
                style={{ opacity: section2Progress }}
              >
                Our <span className="text-blue-300">Services</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                style={{ opacity: section2Progress }}
              >
                Comprehensive solutions tailored for modern healthcare facilities
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1a1a2e] rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="text-blue-400 mb-4">
                    <service.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Technology */}
        <section 
          id="section-3" 
          className="min-h-screen flex items-center justify-center bg-[#0f0c29] relative overflow-hidden"
        >
          <div className="container mx-auto px-6 py-20 z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <motion.h2 
                  className="text-4xl md:text-6xl font-bold text-white mb-6"
                  style={{ opacity: section3Progress }}
                >
                  Cutting-Edge <span className="text-blue-300">Technology</span>
                </motion.h2>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-8"
                  style={{ opacity: section3Progress }}
                >
                  Leveraging the latest advancements to deliver superior healthcare management
                </motion.p>
                
                <motion.div
                  style={{ opacity: section3Progress }}
                >
                  <ul className="space-y-4">
                    {technologies.map((tech) => (
                      <li key={tech} className="flex items-center">
                        <CheckCircleIcon className="w-6 h-6 text-green-400 mr-3" />
                        <span className="text-gray-200 text-lg">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-xl bg-blue-500 opacity-20 blur-lg"></div>
                  <div className="relative bg-[#1a1a2e] rounded-xl p-8 shadow-xl">
                    <div className="aspect-w-16 aspect-h-9">
                      <div className="w-full h-96 bg-[#2a2a42] rounded-lg flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            rotateY: [0, 180, 360],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ 
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="text-center"
                        >
                          <ChipIcon className="w-32 h-32 text-blue-400 mx-auto" />
                          <h4 className="text-white text-xl mt-4">Hospital Management AI</h4>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      {techStats.map((stat) => (
                        <motion.div
                          key={stat.label}
                          whileHover={{ y: -5 }}
                          className="text-center p-4 bg-[#2a2a42] rounded-lg"
                        >
                          <div className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                          <div className="text-sm text-gray-300">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 4: Contact */}
        <section 
          id="section-4" 
          className="min-h-screen flex items-center justify-center bg-[#0f0c29] relative overflow-hidden"
        >
          <div className="container mx-auto px-6 py-20 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-white mb-4"
                style={{ opacity: section4Progress }}
              >
                Get In <span className="text-blue-300">Touch</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                style={{ opacity: section4Progress }}
              >
                Ready to transform your healthcare facility? Contact us today.
              </motion.p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12">
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#1a1a2e] rounded-xl p-8 shadow-xl h-full">
                  <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-start">
                        <div className="text-blue-400 mr-4 mt-1">
                          <info.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-gray-300 font-medium">{info.label}</h4>
                          <p className="text-gray-400">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-gray-300 font-medium mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href="#"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          whileHover={{ y: -3 }}
                        >
                          <social.icon className="w-6 h-6" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#1a1a2e] rounded-xl p-8 shadow-xl h-full">
                  <h3 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full bg-[#2a2a42] border border-[#3a3a5e] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full bg-[#2a2a42] border border-[#3a3a5e] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full bg-[#2a2a42] border border-[#3a3a5e] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                      <textarea 
                        id="message" 
                        rows={5}
                        className="w-full bg-[#2a2a42] border border-[#3a3a5e] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Icons (using Heroicons as examples)
function MedicalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.5 1.5 0 00-.82 1.317v6.642a1.5 1.5 0 00.828 1.343l.664.33a.75.75 0 01.224 1.104l-.068.068a48.97 48.97 0 00-.814.814.75.75 0 01-1.06.01l-.354-.353a.75.75 0 01.01-1.06c.24-.24.462-.454.668-.645a.75.75 0 01.372-.25 1.5 1.5 0 001.21-1.467v-6.642a3 3 0 00-1.638-2.658l-.66-.33a.75.75 0 01-.225-1.104l.068-.068a48.423 48.423 0 00.814-.814.75.75 0 011.06-.01l.354.353a.75.75 0 01-.01 1.06 51.69 51.69 0 00-.668.645.75.75 0 01-.372.25 1.5 1.5 0 00-1.21 1.467v.224c0 .131-.067.248-.172.311a54.615 54.615 0 01-4.653 2.52.75.75 0 00-.654 1.352 56.128 56.128 0 004.78-2.589 1.5 1.5 0 00.82-1.317v-6.642a1.5 1.5 0 00-.828-1.343l-.664-.33a.75.75 0 01-.224-1.104l.068-.068a48.515 48.515 0 00.814-.814.75.75 0 011.06-.01l.354.353a.75.75 0 01-.01 1.06c-.24.24-.462.454-.668.645a.75.75 0 01-.372.25 1.5 1.5 0 00-1.21 1.467v6.642a3 3 0 001.638 2.658l.66.33a.75.75 0 01.225 1.104l-.068.068a48.422 48.422 0 00-.814.814.75.75 0 01-1.06.01l-.354-.354a.75.75 0 01.01-1.06c.24-.24.462-.454.668-.645a.75.75 0 01.372-.25 1.5 1.5 0 001.21-1.467v-.224a60.203 60.203 0 012.228-5.616z" />
    </svg>
  );
}

function HeartPulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      <path d="M12.552 10.224h3.066v1.5h-3.066l1.32 1.894.75-1.072L16.5 8.25l-1.898-2.696-.75 1.072-1.32-1.894v3.066h-1.5V5.304l-1.32 1.894-.75-1.072L7.5 8.25l1.898 2.696.75-1.072 1.32-1.894h3.066v1.5h-3.066l-1.32 1.894-.75-1.072L7.5 12.75l1.898 2.696.75-1.072 1.32-1.894v3.066h1.5v-3.066l1.32 1.894.75-1.072L16.5 12.75l-1.898-2.696-.75 1.072-1.32-1.894z" />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}

function ChipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 7.5h-9v9h9v-9z" />
      <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
    </svg>
  );
}

// Social media icons
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

// Data
const services = [
  {
    title: "Patient Management",
    description: "Comprehensive patient records, appointment scheduling, and history tracking for better care.",
    icon: MedicalIcon
  },
  {
    title: "Electronic Health Records",
    description: "Secure digital records accessible to authorized personnel anytime, anywhere.",
    icon: HeartPulseIcon
  },
  {
    title: "Billing & Insurance",
    description: "Automated billing systems with insurance claim processing for seamless financial operations.",
    icon: ChipIcon
  },
  {
    title: "Pharmacy Integration",
    description: "Real-time medication tracking and prescription management with pharmacy systems.",
    icon: CheckCircleIcon
  },
  {
    title: "Staff Management",
    description: "Efficient scheduling, payroll, and performance tracking for hospital staff.",
    icon: MedicalIcon
  },
  {
    title: "Analytics Dashboard",
    description: "Powerful data visualization tools for hospital performance and patient outcomes.",
    icon: ChipIcon
  }
];

const technologies = [
  "AI-powered diagnostics assistance",
  "Blockchain for secure health records",
  "IoT for real-time patient monitoring",
  "Cloud-based infrastructure",
  "Predictive analytics for patient care",
  "Mobile integration for doctors and patients"
];

const techStats = [
  { label: "Hospitals Using", value: "250+" },
  { label: "Patients Served", value: "10M+" },
  { label: "Data Accuracy", value: "99.9%" }
];

const contactInfo = [
  {
    label: "Email",
    value: "info@hospitalmgmt.com",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    )
  },
  {
    label: "Phone",
    value: "+1 (555) 123-4567",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    label: "Address",
    value: "123 Healthcare Ave, Medcity, MC 12345",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    )
  }
];

const socialLinks = [
  { name: "Twitter", icon: TwitterIcon },
  { name: "Facebook", icon: FacebookIcon },
  { name: "LinkedIn", icon: LinkedinIcon },
  { name: "Instagram", icon: InstagramIcon }
];