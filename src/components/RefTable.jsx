import { regularTable, supervisorTable, etcTable } from '../data/guideData'

function DataTable({ title, headers, rows }) {
  return (
    <>
      {title && <h3 className="text-base font-semibold mb-4 mt-6 text-gray-900">{title}</h3>}
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h} className="bg-[#f1f3f9] px-3.5 py-2.5 text-left font-semibold border-b-2 border-gray-300">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-[#f8f9fc]">
                {row.map((cell, j) => (
                  <td key={j} className="px-3.5 py-2.5 border-b border-gray-100">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default function RefTable() {
  return (
    <div id="ref" className="mb-12">
      <div className="flex items-baseline gap-2 mb-5 pb-2.5 border-b border-gray-300">
        <span className="text-[#3b5bdb] text-[15px] font-bold shrink-0">참고.</span>
        <h2 className="text-xl font-bold text-gray-900">참고: 과정마스터 업종별 조합표</h2>
      </div>

      <div className="bg-[#f4f6fa] mx-0 mb-5 px-4 py-3 text-xs leading-7 text-gray-600">
        산업안전보건교육은 업종별, 시간별로 과정마스터를 각각 생성해야 합니다.<br />
        아래 표를 참고하여 필요한 과정마스터를 생성해주세요.
      </div>

      <div className="bg-white rounded p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <DataTable title="상반기 정기교육" headers={regularTable.headers} rows={regularTable.rows} />
        <DataTable title="관리감독자교육" headers={supervisorTable.headers} rows={supervisorTable.rows} />
        <DataTable title="기타 교육" headers={etcTable.headers} rows={etcTable.rows} />
      </div>
    </div>
  )
}
