'use client'
import { motion } from 'framer-motion';
import { FaHeartbeat, FaPills, FaStethoscope, FaAmbulance, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footers = () => {
  const medicalIcons = [
    { icon: <FaHeartbeat className="text-red-500" size={24} />, name: "Cardiology" },
    { icon: <FaPills className="text-blue-400" size={24} />, name: "Pharmacy" },
    { icon: <FaStethoscope className="text-green-500" size={24} />, name: "Consultation" },
    { icon: <FaAmbulance className="text-yellow-500" size={24} />, name: "Emergency" },
  ];

  return (
    <footer className="relative bg-[#0f0c29] text-white overflow-hidden py-12 mt-10">
      {/* Floating medical icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const icon = medicalIcons[Math.floor(Math.random() * medicalIcons.length)];
          const size = Math.random() * 24 + 16;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * 5;
          
          return (
            <motion.div
              key={i}
              className="absolute text-blue-300 opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${size}px`
              }}
              animate={{
                y: [0, -100, -200, -300],
                x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
                opacity: [0.7, 0.5, 0.3, 0],
                rotate: [0, Math.random() * 360]
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            >
              {icon.icon}
            </motion.div>
          );
        })}
      </div>

      {/* Footer content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-blue-400 name">Medi</span><span className='name'>Care+</span>
            </motion.h3>
            <motion.p 
              className="text-blue-200 comment text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Advanced healthcare solutions for modern needs.
            </motion.p>
          </div>
          
          {medicalIcons.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center md:items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <div className="p-3 bg-blue-800 rounded-full mb-2">
                {item.icon}
              </div>
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-blue-300 text-center md:text-left head">
                {index % 2 === 0 ? "24/7 Service" : "Expert Care"}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-blue-300 mb-4 md:mb-0 comment text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            &copy; {new Date().getFullYear()} MediCare+. All rights reserved.
          </motion.p>
          
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.a 
              href="#" 
              className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a 
              href="#" 
              className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition"
              whileHover={{ scale: 1.1, rotate: -10 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a 
              href="#" 
              className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <FaInstagram />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};