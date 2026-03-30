import Callout from './Callout'
import StepCard from './StepCard'

export default function Phase({ phase, onImageClick }) {
  return (
    <div id={phase.id} className="mb-12">
      <div className="flex items-baseline gap-2 mb-5 pb-2.5 border-b border-gray-300">
        <span className="text-[#3b5bdb] text-[15px] font-bold shrink-0">{phase.num}</span>
        <h2 className="text-xl font-bold text-gray-900">{phase.title}</h2>
      </div>

      {phase.notice && (
        <Callout type={phase.notice.type} html={phase.notice.content} />
      )}

      {phase.steps.map((step, i) => (
        <div key={i}>
          <StepCard step={step} onImageClick={onImageClick} />
          {step.afterCallout && phase.dangerCallout && (
            <Callout type="danger" html={`<b>주의사항</b><br>${phase.dangerCallout.content}`} />
          )}
        </div>
      ))}
    </div>
  )
}
