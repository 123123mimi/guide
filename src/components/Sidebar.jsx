import { useState, useEffect } from 'react'

const BASE = import.meta.env.BASE_URL

const menuData = [
  {
    label: '총괄관리자 가이드',
    href: `${BASE}admin/`,
    children: [],
  },
  {
    label: '교육담당자 가이드',
    href: `${BASE}manager/`,
    children: [],
  },
  {
    label: '연동 가이드',
    href: null,
    active: true,
    children: [
      { label: '개요', href: '#overview' },
      { label: '1. 콘텐츠 등록', href: '#phase1' },
      { label: '2. 과정마스터 등록', href: '#phase2' },
      { label: '3. 과정 생성', href: '#phase3' },
      { label: '4. 연동 관리', href: '#phase4' },
      { label: '5. 학습자 등록', href: '#phase5' },
      { label: '업종별 조합표', href: '#ref' },
    ],
  },
]

export default function Sidebar() {
  const [activeHash, setActiveHash] = useState('#overview')
  const [expanded, setExpanded] = useState({ 2: true })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const ids = ['overview', 'phase1', 'phase2', 'phase3', 'phase4', 'phase5', 'ref']
    const onScroll = () => {
      let current = '#overview'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop - 140 <= window.scrollY) current = '#' + id
      }
      setActiveHash(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggle = (idx) => setExpanded((p) => ({ ...p, [idx]: !p[idx] }))

  const menu = (
    <div className="w-52 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/80 overflow-hidden leading-[1.4]">
      <div className="px-4 pt-4 pb-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
        가이드 목록
      </div>

      <nav className="px-2 pb-3">
        {menuData.map((group, idx) => (
          <div key={idx}>
            {/* 대메뉴 */}
            {group.children.length > 0 ? (
              <button
                onClick={() => toggle(idx)}
                className={`
                  w-full flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[13px] font-semibold text-left transition-colors
                  ${group.active ? 'text-[#3b5bdb]' : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                <svg
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${expanded[idx] ? 'rotate-90' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {group.label}
              </button>
            ) : (
              <a
                href={group.href}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-3.5 h-3.5 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {group.label}
              </a>
            )}

            {/* 소메뉴 */}
            {group.children.length > 0 && expanded[idx] && (
              <div className="ml-3 pl-3 border-l-2 border-gray-100 mb-1">
                {group.children.map((child) => {
                  const isActive = activeHash === child.href
                  return (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        block px-2.5 py-1.5 rounded-md text-[12px] transition-all
                        ${isActive
                          ? 'text-[#3b5bdb] font-semibold bg-[#eef1ff]'
                          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                        }
                      `}
                    >
                      {child.label}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )

  return (
    <>
      {/* 데스크톱: 플로팅 TOC */}
      <div className="hidden min-[1440px]:block fixed top-[148px] z-50" style={{ left: 'calc(50% - 708px)' }}>
        {menu}
      </div>

      {/* 모바일/태블릿: 플로팅 버튼 */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="min-[1440px]:hidden fixed top-3 left-3 z-[200] bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* 모바일 오버레이 */}
      {mobileOpen && (
        <div className="min-[1440px]:hidden fixed inset-0 bg-black/20 z-[150]" onClick={() => setMobileOpen(false)} />
      )}

      {/* 모바일 플로팅 메뉴 */}
      {mobileOpen && (
        <div className="min-[1440px]:hidden fixed top-16 left-3 z-[160]">
          {menu}
        </div>
      )}
    </>
  )
}
