"use client";
import React, { useState, useMemo } from 'react';
import { X, Info, MapPin, ChevronUp, ChevronDown, ChevronsUpDown, Tv, Building2, MapIcon, Navigation } from 'lucide-react';
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] max-w-lg w-full shadow-2xl relative overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
            <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 p-8 flex items-end relative">
              <button 
                onClick={() => setSelectedCinema(null)} 
                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all"
              >
                <X size={20} />
              </button>
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase rounded-lg mb-2">
                  {selectedCinema.info.address?.substring(0, 2) + '電影院'}
                </span>
                <h2 className="text-3xl font-black text-white leading-tight">{selectedCinema.name}</h2>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-1 text-indigo-600">
                      <Building2 size={16} />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">影城類型</span>
                    </div>
                    <p className="text-slate-800 font-bold">{selectedCinema.info.type}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-1 text-indigo-600">
                      <Tv size={16} />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">特殊影廳</span>
                    </div>
                    <p className="text-slate-800 font-bold truncate">{selectedCinema.info.cinema}</p>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden group">
                  <MapPin size={100} className="absolute -right-8 -bottom-8 text-white/5 rotate-12" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={18} className="text-indigo-400" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">地理位置</span>
                    </div>
                    <p className="text-slate-200 text-sm mb-6 leading-relaxed">
                      {selectedCinema.info.address}
                    </p>
                    <a 
                      href={`https://www.google.com/maps/search/${encodeURIComponent(selectedCinema.name + ' ' + selectedCinema.info.address)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-indigo-400 hover:text-white transition-all active:scale-95"
                    >
                      <Navigation size={18} />
                      開啟 Google 地圖導航
                    </a>
                  </div>
                </div>
                <div className="flex justify-between items-center px-4 py-2 border-y border-slate-100">
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400">全票</p>
                      <p className="text-lg font-black text-slate-800">${selectedCinema.prices.full}</p>
                   </div>
                   <div className="text-center border-x border-slate-100 px-8">
                      <p className="text-[10px] font-bold text-slate-400">早場</p>
                      <p className="text-lg font-black text-slate-800">${selectedCinema.prices.early}</p>
                   </div>
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400">優待</p>
                      <p className="text-lg font-black text-slate-800">${selectedCinema.prices.concession}</p>
                   </div>
                </div>
                <div className="space-y-6">
                  <button 
                    onClick={() => setSelectedCinema(null)} 
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-2xl hover:bg-black transition-all active:scale-95 text-sm tracking-widest"
                  >
                    關閉視窗
                  </button>
                </div>

              </div>
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