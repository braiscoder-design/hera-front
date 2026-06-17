import Hero from '../components/sections/Hero/Hero'
import About from '../components/sections/About/About'
import Services from '../components/sections/Services/Services'
import Values from '../components/sections/Values/Values'
import Gallery from '../components/sections/Gallery/Gallery'
import Contact from '../components/sections/Contact/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Values />
      <Gallery />
      <Contact />
    </>
  )
}
