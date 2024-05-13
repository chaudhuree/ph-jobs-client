import { Helmet } from "react-helmet"
import HeroSection from "../components/HeroSection"
export default function Home() {

  return (
    <div className=' container mx-auto   font-poppins'>
      <Helmet>
        <title>Jobs - your destiny is here</title>
      </Helmet>

      <HeroSection />
    </div>
  )
}
