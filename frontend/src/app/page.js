import Image from "next/image";
import JobPortalHero from "./components/JobPortalHero";
import AboutSection from "./components/Aboutsction";
import Browsercategory from "./components/Browsercategory";
// import FAQSection from "./components/Faqsection";
import Blog from "./components/Blog";


export default function Home() {
  return (


    <>

   <JobPortalHero/>

   {/* <AboutSection/> */}

     <Browsercategory/>
     {/* <FAQSection/> */}
     <Blog/>

    </>
  
  );
}
