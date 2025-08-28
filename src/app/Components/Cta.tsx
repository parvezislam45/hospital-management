'use client'

import { motion } from 'framer-motion'

export default function CTA() {
  const heartbeat = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
  const scanline = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: "100%",
      opacity: [0, 0.7, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
        delay: 0.5
      }
    }
  }
  return (
    <section className="relative py-20 bg-[#0f0c29] text-white overflow-hidden">
      {/* Animated background elements */}
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.3 }} // More visible opacity
  transition={{ duration: 1 }}
  className="absolute inset-0 flex items-center justify-center z-0"
>
  <div className="grid grid-cols-5 gap-12">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 15 + Math.random() * 15,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 3,
        }}
        className="h-8 w-8 border-2 border-blue-400 rounded-full opacity-70"
      />
    ))}
  </div>
</motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { 
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl head md:text-4xl font-black bg-gradient-to-bl from-[#a8c0ff] to-[#6e54df] text-transparent bg-clip-text mb-4"
            animate={heartbeat}
          >
            Ready To Elevate Healthcare Services?
          </motion.h2>
          <motion.div 
            className="relative inline-block mt-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.p 
              className="text-4xl font-extrabold bg-gradient-to-bl from-[#833AB4] to-[#FCB045] text-transparent bg-clip-text sub max-w-3xl mx-auto relative mt-5"
            >
             Join hundreds of healthcare providers who trust our system to deliver exceptional patient care.
            </motion.p>
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-blue-500"
              variants={scanline}
              initial="hidden"
              animate="visible"
            />
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black bg-opacity-20 p-6 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-4 name">For Hospitals</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className='comment text-xl font-normal text-gray-300'>Streamlined operations</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className='comment text-xl font-normal text-gray-300'>Integrated patient records</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className='comment text-xl font-normal text-gray-300'>Advanced analytics</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-gray-900 text-white hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all name"
              >
                Hospital Solutions
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black bg-opacity-20 p-6 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-4 name">For Clinics</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className='comment text-xl font-normal text-gray-300'>Easy appointment scheduling</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className='comment text-xl font-normal text-gray-300'>Automated billing</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className='comment text-xl font-normal text-gray-300'>Patient portal</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-gray-900 text-white hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all name"
              >
                Clinic Solutions
              </motion.button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className='head'>Need help? Call our support team at (123) 456-7890</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}