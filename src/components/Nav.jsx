import { useState, useEffect } from 'react'
import { navItems } from '../data/guideData'

export default function Nav() {
  const [active, setActive] = useState('#overview')

  useEffect(() => {
    const onScroll = () => {
      const ids = ['overview', 'phase1', 'phase2', 'phase3', 'phase4', 'phase5', 'ref']
      let current = '#overview'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop - 120 <= window.scrollY) {
          current = '#' + id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[960px] mx-auto flex overflow-x-auto">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-3 transition-colors
              ${active === item.href
                ? 'text-[#3b5bdb] border-[#3b5bdb]'
                : 'text-gray-500 border-transparent hover:text-[#3b5bdb] hover:border-[#3b5bdb]'
              }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}
