export default function Header() {
  return (
    <div className="header-hero relative overflow-hidden bg-linear-to-br from-[#0f1023] via-[#1a1a2e] to-[#16213e] text-white py-16 text-center">
      {/* 배경 글로우 */}
      <div className="header-glow" />
      <div className="header-glow-2" />

      <h1 className="header-title relative z-10 text-4xl font-extrabold mb-3 tracking-tight">
        포켓클래스 LMS 연동 가이드
      </h1>
      <p className="relative z-10 text-sm text-blue-200/60 tracking-wide">
        파트너사를 위한 과정 개설 및 연동 매뉴얼
      </p>

      {/* 하단 그라데이션 라인 */}
      <div className="header-line" />
    </div>
  )
}
