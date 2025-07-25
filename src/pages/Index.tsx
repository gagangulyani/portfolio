import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProfessionalJourney from "@/components/ProfessionalJourney";
import Projects from "@/components/Projects";
// import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import useAnalytics from "@/hooks/useAnalytics";


const Index = () => {
  useAnalytics(); // Track page views and analytics

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <ProfessionalJourney />
      <Projects />
      {/* <Blog /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
