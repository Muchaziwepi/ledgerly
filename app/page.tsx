'use client'

import { useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  FileText,
  FolderOpen,
  LockKeyhole,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Upload,
  X,
  Zap,
} from 'lucide-react'

const initialFiles = [
  { id: 1, name: 'Notion · annual plan.pdf', vendor: 'Notion', category: 'Software', amount: '$96.00', date: 'Oct 12, 2026', color: 'bg-[#f3d6b4]', icon: 'N' },
  { id: 2, name: 'Whole Foods Market.jpg', vendor: 'Whole Foods', category: 'Meals', amount: '$74.82', date: 'Oct 09, 2026', color: 'bg-[#d7e3c2]', icon: 'W' },
  { id: 3, name: 'WeWork · hot desk.pdf', vendor: 'WeWork', category: 'Workspace', amount: '$35.00', date: 'Oct 06, 2026', color: 'bg-[#c8d9e9]', icon: 'W' },
  { id: 4, name: 'Adobe Creative Cloud.pdf', vendor: 'Adobe', category: 'Software', amount: '$59.99', date: 'Oct 01, 2026', color: 'bg-[#ecd0d0]', icon: 'A' },
]

export default function Page() {
  const [files, setFiles] = useState(initialFiles)
  const [selected, setSelected] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const selectedFile = files.find((file) => file.id === selected) ?? files[0]
  const filteredFiles = useMemo(() => files.filter((file) => `${file.name} ${file.category}`.toLowerCase().includes(query.toLowerCase())), [files, query])

  function addFiles(fileList: FileList | null) {
    if (!fileList?.length) return
    setIsUploading(true)
    window.setTimeout(() => {
      const additions = Array.from(fileList).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        vendor: file.name.split(/[ ·.]/)[0] || 'New file',
        category: 'Needs review',
        amount: '—',
        date: 'Just now',
        color: 'bg-[#e4d7c8]',
        icon: '·',
      }))
      setFiles((current) => [...additions, ...current])
      setSelected(additions[0]?.id ?? selected)
      setIsUploading(false)
    }, 650)
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#242321]">
      <header className="flex h-[72px] items-center justify-between border-b border-[#dedbd4] px-6 lg:px-10">
        <div className="flex items-center gap-3"><div className="grid size-8 place-items-center rounded-[10px] bg-[#ee6c3a] text-white"><Sparkles size={16} fill="currentColor" /></div><span className="text-[17px] font-semibold tracking-[-0.03em]">ledgerly</span><span className="hidden rounded-full bg-[#ece9e1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77736b] sm:block">local beta</span></div>
        <div className="flex items-center gap-4 text-[#77736b]"><button className="hidden items-center gap-2 text-sm sm:flex"><Settings2 size={16} /> Preferences</button><div className="size-8 rounded-full bg-[#1e3331] text-center text-xs font-semibold leading-8 text-white">JD</div></div>
      </header>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[224px_1fr]">
        <aside className="hidden border-r border-[#dedbd4] px-5 py-8 lg:block"><div className="mb-9 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#99958c]">Workspace</div><nav className="space-y-1"><NavItem icon={<FolderOpen size={17} />} label="All documents" count={files.length} active /><NavItem icon={<Zap size={17} />} label="Needs review" count={1} /><NavItem icon={<Check size={17} />} label="Reviewed" count={12} /></nav><div className="mb-3 mt-12 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#99958c]">Categories</div><div className="space-y-1 text-sm text-[#65625b]"><Category color="bg-[#ee6c3a]" label="Software" count="2" /><Category color="bg-[#7a9b72]" label="Meals" count="1" /><Category color="bg-[#6d8fac]" label="Workspace" count="1" /></div><div className="mt-24 rounded-2xl bg-[#eee9df] p-4"><div className="mb-3 flex size-7 items-center justify-center rounded-lg bg-white text-[#ee6c3a]"><LockKeyhole size={14} /></div><p className="text-xs font-semibold">Your files stay yours.</p><p className="mt-1 text-[11px] leading-4 text-[#77736b]">Nothing leaves this device. Powered by Qwen2.5-VL, running locally.</p></div></aside>

        <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-12"><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#ee6c3a]">October 2026</p><h1 className="text-[32px] font-semibold tracking-[-0.05em] sm:text-[42px]">Your paperwork,<br /><span className="text-[#99958c]">without the paperwork.</span></h1></div><button onClick={() => inputRef.current?.click()} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#242321] px-5 text-sm font-semibold text-white transition hover:bg-[#3c3a36]"><Plus size={17} /> Add documents</button><input ref={inputRef} type="file" multiple className="hidden" onChange={(event) => addFiles(event.target.files)} /></div>

          <div className="mb-7 grid gap-3 sm:grid-cols-3"><Stat label="This month" value="$265.81" sub="across 4 documents" /><Stat label="Tax deductible" value="$265.81" sub="100% categorized" /><Stat label="Time saved" value="42 min" sub="since you started" /></div>

          <div className="mb-5 flex flex-col justify-between gap-3 border-b border-[#dedbd4] pb-4 sm:flex-row sm:items-center"><div className="flex items-center gap-5"><h2 className="text-sm font-semibold">Documents <span className="ml-1 text-[#99958c]">{files.length}</span></h2><button className="flex items-center gap-1 text-xs text-[#77736b]">Latest first <ChevronDown size={14} /></button></div><label className="flex h-9 w-full items-center gap-2 rounded-lg border border-[#dedbd4] bg-white px-3 text-[#99958c] sm:w-56"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents" className="w-full bg-transparent text-xs text-[#242321] outline-none placeholder:text-[#aaa69d]" /></label></div>

          {isUploading && <div className="mb-3 flex items-center gap-3 rounded-xl border border-[#f0c4ad] bg-[#fff6f0] px-4 py-3 text-sm text-[#9f4825]"><Sparkles size={16} className="animate-pulse" /> Reading locally with Qwen2.5-VL…</div>}
          <div className="overflow-hidden rounded-2xl border border-[#dedbd4] bg-white"><div className="hidden grid-cols-[1fr_140px_140px_80px_36px] gap-4 border-b border-[#eeeae3] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#aaa69d] sm:grid"><span>Document</span><span>Category</span><span>Date</span><span>Amount</span><span /></div>{filteredFiles.map((file) => <button key={file.id} onClick={() => setSelected(file.id)} className={`grid w-full grid-cols-[1fr_36px] items-center gap-4 border-b border-[#eeeae3] px-4 py-4 text-left transition last:border-0 hover:bg-[#fcfaf6] sm:grid-cols-[1fr_140px_140px_80px_36px] sm:px-5 ${selected === file.id ? 'bg-[#fff9f3]' : ''}`}><div className="flex min-w-0 items-center gap-3"><div className={`grid size-9 shrink-0 place-items-center rounded-lg text-sm font-bold text-[#4a443d] ${file.color}`}>{file.icon}</div><div className="min-w-0"><p className="truncate text-sm font-medium">{file.name}</p><p className="mt-0.5 text-xs text-[#99958c]">{file.vendor}</p></div></div><span className="hidden text-xs text-[#65625b] sm:block">{file.category}</span><span className="hidden text-xs text-[#77736b] sm:block">{file.date}</span><span className="hidden text-sm font-medium sm:block">{file.amount}</span><MoreHorizontal size={17} className="text-[#aaa69d]" /></button>)}</div>

          <div onClick={() => inputRef.current?.click()} className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#cfcac0] bg-[#fbfaf7] px-5 py-8 text-center transition hover:border-[#ee6c3a] hover:bg-[#fff9f3]"><div className="mb-3 grid size-9 place-items-center rounded-full bg-white text-[#ee6c3a] shadow-sm"><Upload size={16} /></div><p className="text-sm font-semibold">Drop receipts or invoices here</p><p className="mt-1 text-xs text-[#99958c]">PDF, JPG, or PNG · processed on your device</p></div>
        </section>

        {selectedFile && <aside className="hidden border-l border-[#dedbd4] bg-[#fbfaf7] px-7 py-12 xl:block"><div className="mb-9 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#99958c]">Document details</span><button aria-label="Close details"><X size={16} className="text-[#aaa69d]" /></button></div><div className={`mb-5 grid aspect-[4/3] place-items-center rounded-xl ${selectedFile.color}`}><FileText size={42} strokeWidth={1.3} className="text-[#5e554a]" /></div><p className="text-sm font-semibold leading-5">{selectedFile.name}</p><p className="mt-1 text-xs text-[#99958c]">Added {selectedFile.date.toLowerCase()}</p><div className="my-7 h-px bg-[#dedbd4]" /><div className="space-y-5"><Detail label="Vendor" value={selectedFile.vendor} /><Detail label="Category" value={selectedFile.category} /><Detail label="Amount" value={selectedFile.amount} /><Detail label="Tax status" value="Deductible" /></div><button className="mt-9 flex w-full items-center justify-center gap-2 rounded-xl border border-[#d8d3c9] bg-white py-2.5 text-xs font-semibold text-[#4d4942] hover:bg-[#f4f0e9]"><ArrowUpRight size={14} /> Open original</button></aside>}
      </div>
    </main>
  )
}

function NavItem({ icon, label, count, active }: { icon: React.ReactNode; label: string; count: number; active?: boolean }) { return <button className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm ${active ? 'bg-[#eee9df] font-semibold text-[#242321]' : 'text-[#77736b] hover:bg-[#f2efe8]'}`}><span className="flex items-center gap-3">{icon}{label}</span><span className="text-xs text-[#aaa69d]">{count}</span></button> }
function Category({ color, label, count }: { color: string; label: string; count: string }) { return <div className="flex items-center justify-between rounded-lg px-3 py-2"><span className="flex items-center gap-3"><i className={`size-2 rounded-full ${color}`} />{label}</span><span className="text-xs text-[#aaa69d]">{count}</span></div> }
function Stat({ label, value, sub }: { label: string; value: string; sub: string }) { return <div className="rounded-2xl border border-[#dedbd4] bg-white p-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#99958c]">{label}</p><p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{value}</p><p className="mt-1 text-xs text-[#99958c]">{sub}</p></div> }
function Detail({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between gap-4"><span className="text-xs text-[#99958c]">{label}</span><span className="text-right text-xs font-medium text-[#4d4942]">{value}</span></div> }
