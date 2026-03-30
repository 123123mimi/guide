const flowSteps = ['1. 콘텐츠 등록', '2. 과정마스터 등록', '3. 과정 생성', '4. 연동 관리', '5. 학습자 등록']

export default function Overview() {
  return (
    <div id="overview" className="bg-white p-7 mb-10 border-b border-gray-300">
      <h2 className="text-lg font-bold mb-3.5 text-gray-900">전체 진행 흐름</h2>
      <p className="text-sm text-gray-600 leading-7">
        연동 과정을 처음 개강할 때는 아래 5단계를 순서대로 진행합니다.<br />
        이미 콘텐츠와 과정마스터가 등록되어 있다면 <b className="text-gray-900">3단계(과정 생성)</b>부터 시작하면 됩니다.
      </p>

      <div className="flex items-center justify-center flex-wrap gap-0 my-6">
        {flowSteps.map((step, i) => (
          <div key={step} className="contents">
            <div className={`flex-1 min-w-0 text-center text-xs font-semibold py-2.5 px-3.5 rounded-lg
              ${i === 2 ? 'bg-[#3b5bdb] text-white' : 'bg-[#f1f3f9] text-gray-700'}`}>
              {step}
            </div>
            {i < flowSteps.length - 1 && (
              <span className="text-gray-400 px-1 shrink-0">→</span>
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#f4f6fa] px-4 py-3 text-xs leading-7 text-gray-600">
        <b className="text-gray-900">사전 준비</b><br />
        개강 일정 및 학습자 정보를 포켓에 공유하여 개강을 요청합니다.<br />
        개강 요청 후 안내받은 일정(+2일)에 맞춰 아래 과정 생성을 진행합니다.
      </div>
    </div>
  )
}
