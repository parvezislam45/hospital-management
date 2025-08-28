"use client";
import { motion } from "framer-motion";
export default function Contact(){
  const heartbeat = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
    return(
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
              className="text-3xl head md:text-5xl font-black bg-gradient-to-bl from-[#FF512F] to-[#DD2476] text-transparent bg-clip-text mb-4 pb-2" // Added pb-2 for breathing room
              animate={heartbeat}
            >
              Contact Us
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
            <motion.p className="text-4xl sub font-bold text-[#FF512F] max-w-3xl mx-auto mt-5">
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
      <div className="relative h-[40rem] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Layer 1: Dynamic Flowing Waves */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-r from-blue-600 via-sky-600 to-purple-600 opacity-10"
          animate={{ x: ['-50%', '50%'], y: [0, 10, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <svg
            className="absolute w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            fill="none"
          >
            <path
              fillOpacity="0.5"
              d="M0,256L48,245.3C96,235,192,213,288,192C384,171,480,149,576,165.3C672,181,768,235,864,261.3C960,288,1056,288,1152,261.3C1248,235,1344,181,1392,149.3L1440,117.3L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="text-blue-500"
            />
          </svg>
        </motion.div>

        {/* Layer 2: Rotating Geometric Pattern */}
        <motion.div
          className="absolute w-[200%] h-[200%] bg-gradient-to-br from-pink-700 to-amber-600 opacity-20 rounded-full"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        ></motion.div>

        {/* Layer 3: Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: Math.random() * 5 + 2, repeat: Infinity }}
          ></motion.div>
        ))}
      </motion.div>

      {/* Contact Us Section */}
      <motion.div
  className="relative z-10 bg-[#0f0c29] rounded-xl shadow-lg p-8 text-center w-full max-w-xl"
  initial={{ opacity: 0, y: 50 }}
  animate={{ 
    opacity: 1, 
    y: 0,
    boxShadow: ["0 10px 15px -3px rgba(0,0,0,0.3)", "0 10px 20px -3px rgba(159, 43, 255, 0.3)", "0 10px 15px -3px rgba(0,0,0,0.3)"]
  }}
  transition={{ 
    duration: 1,
    boxShadow: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 3
    }
  }}
>
  <motion.h2 
    className="text-2xl font-bold text-white mb-4 service"
    animate={{
      scale: [1, 1.02, 1],
      textShadow: ["0 0 0px #fff", "0 0 5px #fff", "0 0 0px #fff"]
    }}
    transition={{
      repeat: Infinity,
      duration: 4,
      ease: "easeInOut"
    }}
  >
    Get Any Service & Information
  </motion.h2>
  
  <motion.p 
    className="text-gray-300 mb-8 comment"
    animate={{
      opacity: [0.9, 1, 0.9]
    }}
    transition={{
      repeat: Infinity,
      duration: 5
    }}
  >
    Have questions or want to work with us? Fill out the form below,<br/> and we ll get back to you as soon as possible.
  </motion.p>
  
  <form className="space-y-6">
    <motion.div 
      className="flex flex-col"
      whileHover={{
        x: [0, -3, 3, 0]
      }}
      transition={{
        duration: 0.5
      }}
    >
      <label htmlFor="name" className="text-gray-300 text-md font-black mb-2 text-left head">Name</label>
      <motion.input
        type="text"
        id="name"
        className="w-full px-4 py-4 bg-gray-900 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 name"
        placeholder="Enter your name"
        whileFocus={{
          scale: 1.01,
          borderColor: "rgba(159, 43, 255, 0.8)"
        }}
      />
    </motion.div>
    
    <motion.div 
      className="flex flex-col"
      whileHover={{
        x: [0, 3, -3, 0]
      }}
      transition={{
        duration: 0.5,
        delay: 0.1
      }}
    >
      <label htmlFor="email" className="text-gray-300 text-md font-black mb-2 text-left head">Email</label>
      <motion.input
        type="email"
        id="email"
        className="w-full px-4 py-4 bg-gray-900 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 name"
        placeholder="Enter your email"
        whileFocus={{
          scale: 1.01,
          borderColor: "rgba(159, 43, 255, 0.8)"
        }}
      />
    </motion.div>
    
    <motion.div 
      className="flex flex-col"
      whileHover={{
        y: [0, -2, 2, 0]
      }}
      transition={{
        duration: 0.5,
        delay: 0.2
      }}
    >
      <label htmlFor="message" className="text-gray-300 text-md font-black mb-2 text-left head">Message</label>
      <motion.textarea
        id="message"
        className="w-full px-4 py-2 bg-gray-900 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 not-indeterminate:"
        placeholder="Type your message here"
        whileFocus={{
          scale: 1.01,
          borderColor: "rgba(159, 43, 255, 0.8)"
        }}
      ></motion.textarea>
    </motion.div>
    
    <motion.button
      type="submit"
      className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 head"
      animate={{
        scale: [1, 1.01, 1],
        backgroundColor: ["#7e22ce", "#8b5cf6", "#7e22ce"]
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }}
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.98
      }}
    >
      Send Message
    </motion.button>
  </form>
</motion.div>
    </div>
      </div>
        
    )
}