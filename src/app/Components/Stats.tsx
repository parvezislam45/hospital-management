'use client'

import { motion } from 'framer-motion'
import CountUp from 'react-countup'

const stats = [
  { number: 150, label: "Expert Doctors", suffix: "+" },
  { number: 500, label: "Hospital Beds", suffix: "+" },
  { number: 24, label: "Hour Emergency", suffix: "/7" },
  { number: 100, label: "Medical Services", suffix: "+" }
]

export default function Status() {
  return (
    <section className="py-20 bg-[#0f0c29] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg bg-blue-950 bg-opacity-10 backdrop-blur-sm"
            >
              <div className="text-4xl md:text-7xl font-black mb-2 text-emerald-500 sub">
                <CountUp
                  end={stat.number}
                  duration={3}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-2xl font-black text-yellow-500 name">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-4xl font-bold mb-6 text-lime-500 banner"style={{ letterSpacing: "0.1em" }}>Trusted by Healthcare Professionals Worldwide</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <motion.div whileHover={{ scale: 1.1 }}>
              <img src="https://images.contentstack.io/v3/assets/blt3055f692fe7bf193/bltd45bd85b5457abf3/66f429f55ff09ae0df1cfcc0/7595_CWH_WhoWeAre_Icons6.png" alt="Hospital Logo" className="h-20 w-20 rounded-full" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <img src="https://www.ihie.org/wp-content/uploads/2023/01/IHIE_Icons-07-300x300.png" alt="Clinic Logo" className="h-20 w-20 rounded-full" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <img src="https://image.modiinapp.com/d57f007ce53a4b7e2da7391b6f6c375c_300_300_crop.jpg" alt="Medical Logo" className="h-20 w-20 rounded-full" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <img src="https://cdn-icons-png.freepik.com/512/14815/14815690.png" alt="Health Logo" className="h-20 w-20 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}