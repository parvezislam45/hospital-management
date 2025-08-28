'use client'
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
const services = [
  {
    title: "Emergency Care",
    description: "24/7 emergency services with rapid response teams and advanced life support.",
    icon: "🚑",
    colorFrom: "#0c0a3e",  // Deep navy
    colorTo: "#1a1a8a",    // Royal blue
  },
  {
    title: "Cardiology",
    description: "Comprehensive heart care with advanced diagnostic and treatment options.",
    icon: "❤️",
    colorFrom: "#800020",  // Burgundy
    colorTo: "#b3002d",    // Deep crimson
  },
  {
    title: "Neurology",
    description: "Specialized care for disorders of the nervous system and brain.",
    icon: "🧠",
    colorFrom: "#32174d",  // Deep purple
    colorTo: "#4a2582",    // Royal purple
  },
  {
    title: "Pediatrics",
    description: "Compassionate care for infants, children, and adolescents.",
    icon: "👶",
    colorFrom: "#004d40",  // Deep teal
    colorTo: "#00796b",    // Dark cyan
  },
  {
    title: "Orthopedics",
    description: "Expert care for musculoskeletal system including bones and joints.",
    icon: "🦴",
    colorFrom: "#5d4037",  // Deep brown
    colorTo: "#8d6e63",    // Dark taupe
  },
  {
    title: "Oncology",
    description: "Comprehensive cancer care with cutting-edge treatment options.",
    icon: "🦠",
    colorFrom: "#4a148c",  // Deep violet
    colorTo: "#7b1fa2",    // Dark orchid
  },
  {
    title: "Radiology",
    description: "Advanced imaging services for accurate diagnosis and treatment.",
    icon: "📷",
    colorFrom: "#01579b",  // Deep ocean blue
    colorTo: "#0277bd",    // Dark sky blue
  },
  {
    title: "Maternity",
    description: "Complete care for expectant mothers and newborn babies.",
    icon: "🤰",
    colorFrom: "#880e4f",  // Deep magenta
    colorTo: "#ad1457",    // Dark raspberry
  },
  {
    title: "Dermatology",
    description: "Specialized care for skin conditions and cosmetic procedures.",
    icon: "🧴",
    colorFrom: "#1b5e20",  // Deep forest green
    colorTo: "#2e7d32",    // Dark emerald
  },
];

const AnimatedBackground = ({ colorFrom, colorTo }: { 
  colorFrom: string, 
  colorTo: string 
}) => {
  const opacity = useMotionValue(0.8);
  const x = useMotionValue(0);
  
  useEffect(() => {
    animate(opacity, [0.7, 0.9, 0.7], {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    });
    animate(x, [-5, 5, -5], {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut"
    });
  }, [opacity, x]);

  const background = useMotionTemplate`linear-gradient(135deg, ${colorFrom}, ${colorTo})`;

  return (
    <motion.div 
      className="absolute inset-0 rounded-xl opacity-10"
      style={{
        background,
        opacity,
        x
      }}
    />
  );
};

const ServiceIcon = ({ icon }: { icon: string }) => {
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  useEffect(() => {
    animate(scale, [1, 1.15, 1], {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    });
    animate(rotate, [0, 5, -5, 0], {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    });
  }, [scale, rotate]);

  return (
    <motion.div 
      className="text-4xl"
      style={{ 
        scale,
        rotate 
      }}
    >
      {icon}
    </motion.div>
  );
};
  
export default function Service(){
    return(
        <div>
            <section id="technologies" className="relative py-20 bg-[#0f0c29] overflow-hidden ">


      {/* Content */}
      <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 rounded-2xl shadow-2xl overflow-hidden relative h-[20rem] backdrop-blur-xs border border-white/10"
              >
                <AnimatedBackground 
                  colorFrom={service.colorFrom}
                  colorTo={service.colorTo}
                />
                
                <div className="relative z-10 h-full flex flex-col p-8">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shadow-lg mb-6 backdrop-blur-md border border-white/10">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 banner"style={{ letterSpacing: "0.1em"}}>
                    {service.title}
                  </h3>
                  <p className="text-gray-100 font-normal mb-8 flex-grow service">
                    {service.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-white font-semibold px-6 py-3 rounded-xl mt-auto mx-auto w-full max-w-xs"
                    style={{
                      background: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo})`,
                      boxShadow: `0 4px 15px ${service.colorFrom}80`
                    }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
        </div>
    )
}