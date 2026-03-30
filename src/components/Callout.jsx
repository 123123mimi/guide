const bgMap = {
  info: 'bg-[#f4f6fa]',
  warn: 'bg-[#faf6ef]',
  danger: 'bg-[#faf0f0]',
}

export default function Callout({ type = 'info', children, html }) {
  const bg = bgMap[type] || bgMap.info
  return (
    <div className={`mx-6 mb-5 px-4 py-3 text-xs leading-7 text-gray-600 ${bg}`}>
      {html ? (
        <span dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        children
      )}
    </div>
  )
}
