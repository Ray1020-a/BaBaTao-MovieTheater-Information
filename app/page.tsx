"use client";
import React, { useState, useMemo } from 'react';
import { X, Info, MapPin, ChevronUp, ChevronDown, ChevronsUpDown, Tv, Building2 } from 'lucide-react';
import cinemaDataRaw from '@/data/cinemas.json';
import Link from 'next/link';

interface Cinema {
  id: number;
  name: string;
  prices: { full: number; early: number; concession: number; disability: number; };
  info: { address: string; type: string; cinema: string; description: string; };
}

type SortConfig = { key: keyof Cinema['prices'] | 'name'; direction: 'asc' | 'desc' | null; };

export default function BabataoPage() {
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: null });

  const sortedCinemas = useMemo(() => {
    let sortableItems = [...cinemaDataRaw] as Cinema[];
    if (sortConfig.direction !== null) {
      sortableItems.sort((a, b) => {
        let aVal = sortConfig.key === 'name' ? a.name : a.prices[sortConfig.key];
        let bVal = sortConfig.key === 'name' ? b.name : b.prices[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const requestSort = (key: SortConfig['key']) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortConfig['key']) => {
    if (sortConfig.key !== key || sortConfig.direction === null) return <ChevronsUpDown size={14} className="text-slate-300" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-black text-slate-800">影院票價</h1>
        <p className="text-slate-500">點擊欄位標題可進行排序選擇，點擊名稱可查看詳細資訊</p>
        <p className="text-slate-500 text-sm">以下皆為 2D 影城最低標準影廳票價，若資訊有誤歡迎到最下方 GitHub 發 PR 或連繫我</p>
      </header>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-indigo-600 text-white">
                {[
                  { label: '電影院名稱', key: 'name' as const },
                  { label: '全票', key: 'full' as const },
                  { label: '早場', key: 'early' as const },
                  { label: '優待', key: 'concession' as const },
                  { label: '愛心', key: 'disability' as const },
                ].map((col) => (
                  <th key={col.key} onClick={() => requestSort(col.key)} className="p-5 cursor-pointer hover:bg-indigo-700 transition-colors">
                    <div className="flex items-center gap-2">{col.label} {getSortIcon(col.key)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedCinemas.map((cinema) => (
                <tr key={cinema.id} className="hover:bg-slate-50 group">
                  <td className="p-5">
                    <button onClick={() => setSelectedCinema(cinema)} className="text-indigo-600 font-bold flex items-center gap-2">
                      {cinema.name} <Info size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </td>
                  <td className="p-5 font-medium text-slate-600">${cinema.prices.full}</td>
                  <td className="p-5 font-medium text-slate-600">${cinema.prices.early}</td>
                  <td className="p-5 font-medium text-slate-600">${cinema.prices.concession}</td>
                  <td className="p-5 font-medium text-slate-600">${cinema.prices.disability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedCinema && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl relative animate-in zoom-in duration-200">
            <button onClick={() => setSelectedCinema(null)} className="absolute top-5 right-5 text-slate-400 hover:bg-slate-100 p-2 rounded-full"><X size={20} /></button>
            <div className="p-10">
              <h2 className="text-3xl font-black text-slate-800 mb-6">{selectedCinema.name}</h2>
              <div className="space-y-5">
                <div className="flex gap-4"><MapPin className="text-indigo-500 shrink-0" /><div><p className="text-xs font-bold text-slate-400">地址</p><p>{selectedCinema.info.address}</p></div></div>
                <div className="flex gap-4"><Building2 className="text-indigo-500 shrink-0" /><div><p className="text-xs font-bold text-slate-400">類型</p><p>{selectedCinema.info.type}</p></div></div>
                <div className="flex gap-4"><Tv className="text-indigo-500 shrink-0" /><div><p className="text-xs font-bold text-slate-400">特殊影廳</p><p>{selectedCinema.info.cinema}</p></div></div>
                <div className="mt-6 p-4 bg-slate-50 rounded-xl text-sm text-slate-600 leading-relaxed">{selectedCinema.info.description}</div>
              </div>
              <button onClick={() => setSelectedCinema(null)} className="w-full mt-8 bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-black transition-all">關閉資訊</button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-16 pb-10 text-center border-t border-slate-200 pt-8">
        <p className="text-slate-400 text-sm">© 2025 Babatao - 北北桃影城比價 | <Link href="https://github.com/Ray1020-a/BaBaTao-MovieTheater-Information" className="hover:text-indigo-600 underline">GitHub</Link></p>
      </footer>
    </div>
  );
}