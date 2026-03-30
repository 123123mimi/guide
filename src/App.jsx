import { useState } from 'react'
import Header from './components/Header'
import Nav from './components/Nav'
import Overview from './components/Overview'
import Phase from './components/Phase'
import RefTable from './components/RefTable'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import { phases } from './data/guideData'

export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState(null)

  return (
    <div className="font-['Noto_Sans_KR','Malgun_Gothic',sans-serif] bg-[#f8f9fc] text-gray-700 leading-7 min-h-screen">
      <Header />
      <Nav />

      <div className="max-w-[960px] mx-auto px-6 py-10">
        <Overview />
        {phases.map((phase) => (
          <Phase key={phase.id} phase={phase} onImageClick={setLightboxSrc} />
        ))}
        <RefTable />
      </div>

      <Footer />
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  )
}
