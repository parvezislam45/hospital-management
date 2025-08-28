import About from "./Components/About";
import Banner from "./Components/Banner";
import Booking from "./Components/Booking";
import Contact from "./Components/Contact";
import CTA from "./Components/Cta";
import Features from "./Components/Features";
import Hero from "./Components/Hero";
import Profile from "./Components/Profile";
import Service from "./Components/Service";
import Status from "./Components/Stats";
import Testimonials from "./Components/Testimonials";


export default function Home() {
  return (
    <div className="bg-[#0f0c29]">
      <Banner/>
      <About/>
      <Service/>
      <Profile/>
      <Hero/>
      <Features/>
      <Testimonials/>
      <Status/>
      <Booking/>
      <CTA/>
      <Contact/>
    </div>
  );
}
