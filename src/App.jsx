import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
