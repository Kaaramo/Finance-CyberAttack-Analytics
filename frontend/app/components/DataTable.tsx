interface Column {
  key: string
  label: string
  format?: (value: any) => string
}

interface DataTableProps {
  title?: string
  columns: Column[]
  data: any[]
}

export default function DataTable({ title, columns, data }: DataTableProps) {
  return (
    <div className="relative rounded-xl border-2 border-cyan-500/30 bg-gradient-to-br from-card to-background overflow-hidden shadow-2xl shadow-cyan-500/10 group">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Scanning effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1500 pointer-events-none"></div>

      {title && (
        <div className="relative border-b-2 border-cyan-500/30 bg-gradient-to-r from-cyan-950/50 to-background px-6 py-4">
          <h3 className="text-lg font-bold font-mono tracking-wider text-cyan-400 uppercase flex items-center gap-2">
            {title}
          </h3>
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30"></div>
        </div>
      )}

      <div className="overflow-x-auto relative">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-cyan-500/20 bg-cyan-950/20">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10">
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="transition-all duration-200 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 group/row"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-muted-foreground font-mono group-hover/row:text-foreground transition-colors"
                  >
                    {column.format
                      ? column.format(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom corner accent */}
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30"></div>
    </div>
  )
}
