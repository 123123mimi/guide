import Callout from './Callout'

export default function StepCard({ step, onImageClick }) {
  return (
    <div className="bg-white rounded mb-5 overflow-hidden pb-1 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="px-6 pt-4.5 pb-2.5 flex items-start gap-2.5">
        <span className="text-[#3b5bdb] text-sm font-bold shrink-0 mt-px min-w-[18px]">
          {step.num}
        </span>
        <div className="flex-1">
          <h3 className="text-[15px] font-semibold mb-1 text-gray-900">{step.title}</h3>
          <p
            className="text-[13.5px] text-gray-600 leading-7"
            dangerouslySetInnerHTML={{ __html: step.desc }}
          />
        </div>
      </div>

      {step.callout && (
        <Callout type={step.callout.type} html={step.callout.content} />
      )}

      {step.img && (
        <div className="px-6 pb-6">
          <img
            src={step.img}
            className="w-full rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onImageClick(step.img)}
            alt={step.title}
          />
        </div>
      )}
    </div>
  )
}
