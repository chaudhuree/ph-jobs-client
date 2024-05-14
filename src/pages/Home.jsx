import { Helmet } from "react-helmet";
import HeroSection from "../components/HeroSection";
import TabsSection from "../components/TabsSection";
import Cta from "../components/Cta";
import ValueSection from "../components/ValueSection";
export default function Home() {
  return (
    <div className=" container mx-auto px-5 overflow-x-hidden   font-poppins">
      <Helmet>
        <title>Jobs - your destiny is here</title>
      </Helmet>
      <HeroSection />
      <ValueSection />

      <TabsSection />
      <Cta />
    </div>
  );
}
