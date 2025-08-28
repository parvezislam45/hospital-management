"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiActivity,
  FiX,
} from "react-icons/fi";

type DoctorAvailability = {
  day: string; // e.g. "Monday"
  time: string; // e.g. "09:00"
};

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  availability: DoctorAvailability[];
};

type Service = {
  id: number;
  name: string;
  doctors: Doctor[];
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  symptoms: string;
};

export default function Booking() {
  const services: Service[] = [
    {
      id: 1,
      name: "General Medicine",
      doctors: [
        {
          id: "doc1",
          name: "Dr. Sarah Johnson",
          specialty: "Internal Medicine",
          availability: [
            { day: "Monday", time: "09:00" },
            { day: "Thursday", time: "14:00" },
          ],
        },
        {
          id: "doc2",
          name: "Dr. Michael Chen",
          specialty: "Family Medicine",
          availability: [
            { day: "Tuesday", time: "10:30" },
            { day: "Friday", time: "11:00" },
          ],
        },
        {
          id: "doc3",
          name: "Dr. Emily Wilson",
          specialty: "Preventive Care",
          availability: [
            { day: "Wednesday", time: "13:00" },
            { day: "Saturday", time: "09:30" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Cardiology",
      doctors: [
        {
          id: "doc4",
          name: "Dr. Robert Zhang",
          specialty: "Interventional Cardiology",
          availability: [
            { day: "Monday", time: "10:00" },
            { day: "Thursday", time: "15:00" },
          ],
        },
        {
          id: "doc5",
          name: "Dr. Lisa Patel",
          specialty: "Electrophysiology",
          availability: [
            { day: "Tuesday", time: "11:00" },
            { day: "Friday", time: "16:00" },
          ],
        },
        {
          id: "doc6",
          name: "Dr. David Kim",
          specialty: "Heart Failure",
          availability: [
            { day: "Wednesday", time: "14:00" },
            { day: "Saturday", time: "10:30" },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Pediatrics",
      doctors: [
        {
          id: "doc7",
          name: "Dr. Jessica Lee",
          specialty: "Neonatology",
          availability: [
            { day: "Monday", time: "08:30" },
            { day: "Thursday", time: "13:30" },
          ],
        },
        {
          id: "doc8",
          name: "Dr. Thomas Brown",
          specialty: "Adolescent Medicine",
          availability: [
            { day: "Tuesday", time: "09:30" },
            { day: "Friday", time: "14:30" },
          ],
        },
        {
          id: "doc9",
          name: "Dr. Maria Garcia",
          specialty: "Developmental Pediatrics",
          availability: [
            { day: "Wednesday", time: "10:00" },
            { day: "Saturday", time: "11:30" },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Orthopedics",
      doctors: [
        {
          id: "doc10",
          name: "Dr. James Wilson",
          specialty: "Sports Medicine",
          availability: [
            { day: "Monday", time: "07:30" },
            { day: "Thursday", time: "12:00" },
          ],
        },
        {
          id: "doc11",
          name: "Dr. Olivia Martin",
          specialty: "Joint Replacement",
          availability: [
            { day: "Tuesday", time: "08:00" },
            { day: "Friday", time: "13:00" },
          ],
        },
        {
          id: "doc12",
          name: "Dr. Daniel Taylor",
          specialty: "Spine Surgery",
          availability: [
            { day: "Wednesday", time: "09:00" },
            { day: "Saturday", time: "14:00" },
          ],
        },
      ],
    },
    {
      id: 5,
      name: "Neurology",
      doctors: [
        {
          id: "doc13",
          name: "Dr. Sophia Clark",
          specialty: "Epilepsy",
          availability: [
            { day: "Monday", time: "10:30" },
            { day: "Thursday", time: "15:30" },
          ],
        },
        {
          id: "doc14",
          name: "Dr. Ethan White",
          specialty: "Stroke",
          availability: [
            { day: "Tuesday", time: "11:30" },
            { day: "Friday", time: "16:30" },
          ],
        },
        {
          id: "doc15",
          name: "Dr. Ava Harris",
          specialty: "Movement Disorders",
          availability: [
            { day: "Wednesday", time: "12:30" },
            { day: "Saturday", time: "09:00" },
          ],
        },
      ],
    },
    {
      id: 6,
      name: "Dermatology",
      doctors: [
        {
          id: "doc16",
          name: "Dr. Noah Martinez",
          specialty: "Medical Dermatology",
          availability: [
            { day: "Monday", time: "08:00" },
            { day: "Thursday", time: "13:00" },
          ],
        },
        {
          id: "doc17",
          name: "Dr. Isabella Robinson",
          specialty: "Cosmetic Dermatology",
          availability: [
            { day: "Tuesday", time: "09:00" },
            { day: "Friday", time: "14:00" },
          ],
        },
        {
          id: "doc18",
          name: "Dr. Lucas Walker",
          specialty: "Pediatric Dermatology",
          availability: [
            { day: "Wednesday", time: "10:00" },
            { day: "Saturday", time: "15:00" },
          ],
        },
      ],
    },
    {
      id: 7,
      name: "Ophthalmology",
      doctors: [
        {
          id: "doc19",
          name: "Dr. Mia Young",
          specialty: "Retina",
          availability: [
            { day: "Monday", time: "07:00" },
            { day: "Thursday", time: "12:30" },
          ],
        },
        {
          id: "doc20",
          name: "Dr. Benjamin King",
          specialty: "Glaucoma",
          availability: [
            { day: "Tuesday", time: "08:30" },
            { day: "Friday", time: "13:30" },
          ],
        },
        {
          id: "doc21",
          name: "Dr. Charlotte Scott",
          specialty: "Cornea",
          availability: [
            { day: "Wednesday", time: "09:30" },
            { day: "Saturday", time: "14:30" },
          ],
        },
      ],
    },
    {
      id: 8,
      name: "ENT",
      doctors: [
        {
          id: "doc22",
          name: "Dr. William Green",
          specialty: "Otology",
          availability: [
            { day: "Monday", time: "10:00" },
            { day: "Thursday", time: "15:00" },
          ],
        },
        {
          id: "doc23",
          name: "Dr. Amelia Adams",
          specialty: "Rhinology",
          availability: [
            { day: "Tuesday", time: "11:00" },
            { day: "Friday", time: "16:00" },
          ],
        },
        {
          id: "doc24",
          name: "Dr. Henry Nelson",
          specialty: "Laryngology",
          availability: [
            { day: "Wednesday", time: "12:00" },
            { day: "Saturday", time: "10:00" },
          ],
        },
      ],
    },
    {
      id: 9,
      name: "Gynecology",
      doctors: [
        {
          id: "doc25",
          name: "Dr. Evelyn Baker",
          specialty: "Reproductive Endocrinology",
          availability: [
            { day: "Monday", time: "08:00" },
            { day: "Thursday", time: "13:00" },
          ],
        },
        {
          id: "doc26",
          name: "Dr. Alexander Carter",
          specialty: "Urogynecology",
          availability: [
            { day: "Tuesday", time: "09:00" },
            { day: "Friday", time: "14:00" },
          ],
        },
        {
          id: "doc27",
          name: "Dr. Harper Mitchell",
          specialty: "Gynecologic Oncology",
          availability: [
            { day: "Wednesday", time: "10:00" },
            { day: "Saturday", time: "15:00" },
          ],
        },
      ],
    },
    {
      id: 10,
      name: "Dentistry",
      doctors: [
        {
          id: "doc28",
          name: "Dr. Mason Roberts",
          specialty: "Orthodontics",
          availability: [
            { day: "Monday", time: "07:30" },
            { day: "Thursday", time: "12:30" },
          ],
        },
        {
          id: "doc29",
          name: "Dr. Lily Turner",
          specialty: "Endodontics",
          availability: [
            { day: "Tuesday", time: "08:30" },
            { day: "Friday", time: "13:30" },
          ],
        },
        {
          id: "doc30",
          name: "Dr. Oliver Phillips",
          specialty: "Periodontics",
          availability: [
            { day: "Wednesday", time: "09:30" },
            { day: "Saturday", time: "14:30" },
          ],
        },
      ],
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
  });

  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [availableSlots, setAvailableSlots] = useState<DoctorAvailability[]>(
    []
  );
  const [selectedDoctorDetails, setSelectedDoctorDetails] =
    useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      doctor: "",
      date: "",
      time: "",
      symptoms: "",
    });
    setAvailableDoctors([]);
    setAvailableSlots([]);
    setSelectedDoctorDetails(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "service") {
      const selectedService = services.find((s) => s.id === Number(value));
      const doctors = selectedService ? selectedService.doctors : [];
      setAvailableDoctors(doctors);
      setFormData((prev) => ({ ...prev, doctor: "", date: "", time: "" }));
      setAvailableSlots([]);
      setSelectedDoctorDetails(null);
    }

    if (name === "doctor") {
      const selectedDoctor = availableDoctors.find((d) => d.id === value);
      if (selectedDoctor) {
        setAvailableSlots(selectedDoctor.availability);
        setSelectedDoctorDetails(selectedDoctor);
      } else {
        setAvailableSlots([]);
        setSelectedDoctorDetails(null);
      }
      setFormData((prev) => ({ ...prev, date: "", time: "" }));
    }

    if (name === "date") {
      const selectedDate = new Date(value);
      const dayName = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const slot = availableSlots.find((s) => s.day === dayName);

      setFormData((prev) => ({
        ...prev,
        date: value,
        time: slot ? slot.time : "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment booked:", formData);

    // Set modal content
    setModalContent({
      title: "Appointment Booked!",
      message: `Your appointment with ${selectedDoctorDetails?.name} on ${formData.date} at ${formData.time} has been confirmed.`,
    });

    // Open modal
    setIsModalOpen(true);

    // Reset form
    resetForm();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Animation variants
  const fieldVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  // Get minimum date for date picker (today)
  const today = new Date().toISOString().split("T")[0];

  const heartbeat = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
  return (
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
              className="text-3xl head md:text-5xl font-black bg-gradient-to-bl from-[#FF61D2] to-[#FE9090] text-transparent bg-clip-text mb-4 pb-2" // Added pb-2 for breathing room
              animate={heartbeat}
            >
              Get Appointment Now
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
            <motion.p className="text-4xl sub font-bold text-[#FE9090] max-w-3xl mx-auto mt-5">
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
      <div className="relative min-h-[50rem] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black mt-10">
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Galaxy-like Animation */}
          <motion.div
            className="absolute w-[300%] h-[300%] -top-1/2 -left-1/2 bg-gradient-to-br from-purple-800 via-indigo-700 to-black opacity-30 rounded-full"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          ></motion.div>

          {/* Bubble Animation */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-purple-500 opacity-50 rounded-full"
              style={{
                width: `${Math.random() * 50 + 50}px`,
                height: `${Math.random() * 50 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                y: [0, -200, 0],
                x: [0, 100, -100, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
          ))}
        </motion.div>

        {/* Booking Section */}

        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0f0c29]/60 rounded-xl shadow-2xl overflow-hidden border border-gray-500"
          >
            <div className="p-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-center text-white mb-2 service"
              >
                For Specialize Doctor
              </motion.h2>
              <p className="text-center text-white text-2xl font-bold mb-6 sub">
                Book your visit with our specialists
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <motion.div
                    variants={fieldVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <label htmlFor="name" className="block text-gray-300 mb-1 head">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-300">
                        <FiUser />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all head"
                      />
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    variants={fieldVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <label htmlFor="email" className="block text-gray-300 mb-1 head">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FiMail />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all head"
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <motion.div
                    variants={fieldVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <label htmlFor="phone" className="block text-gray-300 mb-1 head">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FiPhone />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all head"
                      />
                    </div>
                  </motion.div>

                  {/* Service Selection */}
                  <motion.div
                    variants={fieldVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <label
                      htmlFor="service"
                      className="block text-gray-300 mb-1 head"
                    >
                      Medical Service
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FiActivity />
                      </div>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none head"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                </div>

                {/* Doctor Selection */}
                {availableDoctors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-6"
                  >
                    <motion.div
                      variants={fieldVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: 0.7 }}
                      className="relative"
                    >
                      <label
                        htmlFor="doctor"
                        className="block text-gray-300 mb-1 head"
                      >
                        Select Doctor
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <FiUser />
                        </div>
                        <select
                          id="doctor"
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none head"
                        >
                          <option value="">Select a doctor</option>
                          {availableDoctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.name} ({doctor.specialty})
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>

                    {/* Doctor Availability */}
                    {selectedDoctorDetails && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-800 p-4 rounded-lg"
                      >
                        <h3 className="font-medium text-white mb-2 head">
                          Dr. {selectedDoctorDetails.name.split(" ")[1]}s
                          Availability:
                        </h3>
                        <ul className="space-y-1">
                          {selectedDoctorDetails.availability.map(
                            (slot, index) => (
                              <li key={index} className="text-gray-300 head">
                                {slot.day} at {slot.time}
                              </li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Date and Time Selection */}
                {formData.doctor && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {/* Date Field */}
                    <motion.div
                      variants={fieldVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: 0.8 }}
                      className="relative"
                    >
                      <label
                        htmlFor="date"
                        className="block text-gray-300 mb-1 head"
                      >
                        Appointment Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <FiCalendar />
                        </div>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          min={today}
                          className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none head"
                        />
                      </div>
                    </motion.div>

                    {/* Time Field (read-only, auto-filled based on date) */}
                    {formData.date && (
                      <motion.div
                        variants={fieldVariants}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.9 }}
                        className="relative"
                      >
                        <label
                          htmlFor="time"
                          className="block text-gray-300 mb-1 head"
                        >
                          Appointment Time
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FiClock />
                          </div>
                          <input
                            type="text"
                            id="time"
                            name="time"
                            value={formData.time || "Not available"}
                            readOnly
                            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 head"
                          />
                        </div>
                        {!formData.time && (
                          <p className="text-red-400 text-sm mt-1 head">
                            Doctor not available on selected day
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Symptoms Field */}
                <motion.div
                  variants={fieldVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 1.0 }}
                  className="relative"
                >
                  <label
                    htmlFor="symptoms"
                    className="block text-gray-300 mb-1 head"
                  >
                    Symptoms (Optional)
                  </label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all head"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="pt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={
                      !formData.service ||
                      !formData.doctor ||
                      !formData.date ||
                      !formData.time
                    }
                    className={`w-52 flex items-center justify-center py-4 mx-auto px-4 bg-gradient-to-r from-blue-600 to-purple-600 sub text-2xl text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all ${
                      !formData.service ||
                      !formData.doctor ||
                      !formData.date ||
                      !formData.time
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Book Appointment
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="ml-2"
                    >
                      <FiArrowRight />
                    </motion.span>
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 name">
                  {modalContent.title}
                </h3>
                <p className="text-gray-600 mb-6 name">{modalContent.message}</p>
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
