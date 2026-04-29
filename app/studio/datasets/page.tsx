"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Database, ChevronLeft, Plus, Eye, Tag, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRequireAuth } from "@/lib/auth/use-require-auth"

const STUDIO_API = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:8054"

interface Dataset {
  dataset_id: string
  name: string
  description: string
  format: string
  size_mb: number
  record_count: number
  language: string
  tags: string[]
  created_at: string
  source?: string
}

interface PreviewResponse {
  dataset_id: string
  sample: unknown[]
  total_records: number
}

export default function DatasetsPage() {
  useRequireAuth()
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [tagFilter, setTagFilter] = useState("")
  const [preview, setPreview] = useState<PreviewResponse | null>(null)
  const [previewTarget, setPreviewTarget] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", description: "", format: "jsonl", language: "th", size_mb: "0", record_count: "0", tags: "", source: "" })
  const [formError, setFormError] = useState("")

  const fetchDatasets = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (tagFilter) params.set("tag", tagFilter)
      const res = await fetch(`${STUDIO_API}/datasets?${params}`)
      if (res.ok) setDatasets(await res.json())
    } catch { /* offline */ } finally { setLoading(false) }
  }, [tagFilter])

  async function previewDataset(id: string) {
    setPreviewTarget(id)
    setPreview(null)
    try {
      const res = await fetch(`${STUDIO_API}/datasets/${id}/preview`)
      if (res.ok) setPreview(await res.json())
    } catch { /* offline */ }
  }

  async function registerDataset() {
    setFormError("")
    try {
      const body = {
        ...form,
        size_mb: parseFloat(form.size_mb),
        record_count: parseInt(form.record_count, 10),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }
      const res = await fetch(`${STUDIO_API}/datasets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) { setFormError(`Error: ${res.status}`); return }
      setShowForm(false)
      setForm({ name: "", description: "", format: "jsonl", language: "th", size_mb: "0", record_count: "0", tags: "", source: "" })
      void fetchDatasets()
    } catch { setFormError("Backend offline") }
  }

  useEffect(() => { void fetchDatasets() }, [fetchDatasets])

  const allTags = Array.from(new Set(datasets.flatMap((d) => d.tags)))
  const filtered = datasets.filter((d) =>
    search === "" || d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/studio" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Studio</Link>
          <span>/</span>
          <span className="text-white">Datasets</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><Database className="w-8 h-8 text-purple-400" />Datasets</h1>
            <p className="text-gray-400 mt-1 text-sm">Training and evaluation dataset catalog</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-purple-700 hover:bg-purple-600 text-white">
            <Plus className="w-4 h-4 mr-2" />Register Dataset
          </Button>
        </div>

        {/* Register form */}
        {showForm && (
          <div className="bg-[#0d1117] border border-purple-500/30 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Register Dataset</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {[
                { label: "Name", key: "name", placeholder: "Dataset name" },
                { label: "Description", key: "description", placeholder: "What this dataset contains" },
                { label: "Language", key: "language", placeholder: "e.g. th, en, multilingual" },
                { label: "Size (MB)", key: "size_mb", placeholder: "0.0", type: "number" },
                { label: "Record Count", key: "record_count", placeholder: "0", type: "number" },
                { label: "Source URL", key: "source", placeholder: "Optional source" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                  <input
                    type={type || "text"}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Format</label>
                <select
                  value={form.format}
                  onChange={(e) => setForm({ ...form, format: e.target.value })}
                  className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option>jsonl</option><option>csv</option><option>parquet</option><option>json</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Tags (comma-separated)</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="nlp, finance, evaluation"
                  className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            {formError && <p className="text-red-400 text-xs mb-3">{formError}</p>}
            <div className="flex gap-3">
              <Button onClick={registerDataset} className="bg-purple-700 hover:bg-purple-600 text-white text-sm">Register</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-sm">Cancel</Button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search datasets…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0d1117] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 w-56"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setTagFilter("")}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${tagFilter === "" ? "bg-purple-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tagFilter === tag ? "" : tag)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${tagFilter === tag ? "bg-purple-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Dataset grid */}
        {loading ? (
          <div className="py-16 text-center text-gray-500">Loading datasets…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((ds) => (
              <div key={ds.dataset_id} className="bg-[#0d1117] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-gray-600">{ds.dataset_id}</span>
                  <span className="text-xs text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-0.5 rounded-full">{ds.format}</span>
                </div>
                <h3 className="font-semibold mb-1">{ds.name}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">{ds.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{ds.record_count.toLocaleString()} records</span>
                  <span>{ds.size_mb} MB</span>
                  <span className="text-yellow-400">{ds.language}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {ds.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] text-purple-400 bg-purple-400/10 border border-purple-400/20 px-1.5 py-0.5 rounded-full">
                      <Tag className="w-2.5 h-2.5" />{tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => previewDataset(ds.dataset_id)}
                  className="text-xs text-gray-400 hover:text-white hover:bg-white/10 w-full"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />Preview Sample
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Preview modal */}
        {previewTarget && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6" onClick={() => { setPreviewTarget(null); setPreview(null) }}>
            <div className="bg-[#0d1117] border border-white/20 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Dataset Preview — {previewTarget}</h3>
                {preview && <span className="text-xs text-gray-500">{preview.total_records.toLocaleString()} total records</span>}
              </div>
              {!preview ? (
                <div className="py-10 text-center text-gray-500">Loading preview…</div>
              ) : (
                <pre className="text-xs font-mono text-green-300 leading-relaxed">{JSON.stringify(preview.sample, null, 2)}</pre>
              )}
              <Button variant="ghost" size="sm" onClick={() => { setPreviewTarget(null); setPreview(null) }} className="mt-4 text-gray-400 hover:text-white">
                Close
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
