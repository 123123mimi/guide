import { useEffect } from 'react'

export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!src) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/88 cursor-pointer"
      onClick={onClose}
    >
      <img
        src={src}
        className="max-w-[95%] max-h-[92%] rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        alt=""
      />
      <span className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs">
        클릭하여 닫기 | ESC
      </span>
    </div>
  )
}
