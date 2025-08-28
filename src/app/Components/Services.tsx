'use client'

import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion'
import { useEffect } from 'react'

const services = [
  {
    title: "Emergency Care",
    description: "24/7 emergency services with rapid response teams and advanced life support.",
    icon: "🚑",
    colorFrom: "#f87171", // red-400
    colorTo: "#dc2626",   // red-600
    animation: "ambulance"
  },
  {
    title: "Cardiology",
    description: "Comprehensive heart care with advanced diagnostic and treatment options.",
    icon: "❤️",
    colorFrom: "#f472b6", // pink-400
    colorTo: "#db2777",   // pink-600
    animation: "heartbeat"
  },
  // ... (keep other services with direct color codes)
]

const AnimatedBackground = ({ type, colorFrom, colorTo }: { 
  type: string, 
  colorFrom: string, 
  colorTo: string 
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0.1)
  
  useEffect(() => {
    const animateBackground = () => {
      switch(type) {
        case 'heartbeat':
          animate(opacity, [0.05, 0.2, 0.05], {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          })
          break
        case 'ambulance':
          animate(x, [0, 10, -10, 0], {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          })
          break
        default:
          animate(opacity, [0.05, 0.1, 0.05], {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          })
      }
    }
    
    animateBackground()
  }, [type, x, y, opacity])

  const background = useMotionTemplate`linear-gradient(135deg, ${colorFrom}, ${colorTo})`

  return (
    <motion.div 
      className="absolute inset-0 rounded-xl"
      style={{
        background,
        x,
        y,
        opacity
      }}
    />
  )
}

const ServiceIcon = ({ icon, type }: { icon: string, type: string }) => {
  const scale = useMotionValue(1)

  useEffect(() => {
    if (type === 'heartbeat') {
      animate(scale, [1, 1.2, 1], {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      })
    }
  }, [type, scale])

  return (
    <motion.div 
      className="text-3xl"
      style={{ scale }}
    >
      {icon}
    </motion.div>
  )
}

export default function Services() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Specialized Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering exceptional care across a wide range of medical specialties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden relative h-full"
            >
              <AnimatedBackground 
                type={service.animation} 
                colorFrom={service.colorFrom}
                colorTo={service.colorTo}
              />
              
              <div className="relative z-10 h-full flex flex-col p-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                  <ServiceIcon icon={service.icon} type={service.animation} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white font-semibold px-4 py-2 rounded-lg mt-auto"
                  style={{
                    background: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo})`
                  }}
                >
                  Learn more
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}