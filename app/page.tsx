"use client";

import React, { useState, useMemo } from 'react';
import { X, Info, ExternalLink, Phone, MapPin, ChevronUp, ChevronDown, ChevronsUpDown, Tv } from 'lucide-react';
import cinemaDataRaw from '@/data/cinemas.json';
import Link from 'next/link';

// 定義類型
interface Cinema {
  id: number;
  name: string;
  prices: {
    full: number;
    early: number;
    concession: number;
    disability: number;
  };
  info: {
    address: string;
    type: string;
    cinema: string;
    description: string;
  };
}

type SortConfig = {
  key: keyof Cinema['prices'] | 'name';
  direction: 'asc' | 'desc' | null;
};

export default function BabataoPage() {
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: null });

  // 排序處理函式
  const sortedCinemas = useMemo(() => {
    let sortableItems = [...cinemaDataRaw] as Cinema[];
    if (sortConfig.direction !== null) {
      sortableItems.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        // 判斷是排名稱還是排價格
        if (sortConfig.key === 'name') {
          aValue = a.name;
          bValue = b.name;
        } else {
          aValue = a.prices[sortConfig.key];
          bValue = b.prices[sortConfig.key];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const requestSort = (key: SortConfig['key']) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null; // 循環：升序 -> 降序 -> 無
    }
    setSortConfig({ key, direction });
  };

  // 渲染排序圖示
  const getSortIcon = (key: SortConfig['key']) => {
    if (sortConfig.key !== key || sortConfig.direction === null) {
      return <ChevronsUpDown size={14} className="text-indigo-300" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ChevronUp size={14} className="text-white" /> : 
      <ChevronDown size={14} className="text-white" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-2 tracking-tight">Babatao</h1>
        <p className="text-slate-500 font-medium">台北、新北、桃園影院票價整理</p>
      </header>

      <main className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl shadow-indigo-100 overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white select-none">
                {[
                  { label: '電影院名稱', key: 'name' as const },
                  { label: '全票', key: 'full' as const },
                  { label: '早場', key: 'early' as const },
                  { label: '優待', key: 'concession' as const },
                  { label: '愛心', key: 'disability' as const },
                ].map((col) => (
                  <th 
                    key={col.key}
                    onClick={() => requestSort(col.key)}
                    className="p-5 font-semibold cursor-pointer hover:bg-indigo-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {getSortIcon(col.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedCinemas.map((cinema) => (
                <tr key={cinema.id} className="hover:bg-indigo-50/50 transition-colors group">
                  <td className="p-5">
                    <button
                      onClick={() => setSelectedCinema(cinema)}
                      className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-2"
                    >
                      {cinema.name}
                      <Info size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </td>
                  <td className="p-5 text-slate-600 font-medium">${cinema.prices.full}</td>
                  <td className="p-5 text-slate-600 font-medium">${cinema.prices.early}</td>
                  <td className="p-5 text-slate-600 font-medium">${cinema.prices.concession}</td>
                  <td className="p-5 text-slate-600 font-medium">${cinema.prices.disability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {selectedCinema && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden relative border border-slate-100">
            <button 
              onClick={() => setSelectedCinema(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="p-10">
              <span className="text-indigo-600 text-xs font-bold tracking-widest uppercase mb-2 block">影城資訊</span>
              <h2 className="text-3xl font-black text-slate-800 mb-6">{selectedCinema.name}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><MapPin size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">地址</p>
                    <p className="text-slate-700 leading-relaxed">{selectedCinema.info.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><Info size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">影城類型</p>
                    <p className="text-slate-700">{selectedCinema.info.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><Tv size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">猛廳</p>
                    <p className="text-slate-700">{selectedCinema.info.cinema}</p>
                  </div>
                </div>

                <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedCinema.info.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCinema(null)}
                className="w-full mt-10 bg-slate-800 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-transform active:scale-95"
              >
                關閉資訊
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="max-w-6xl mx-auto mt-16 pb-10 text-center">
        <div className="h-px w-20 bg-indigo-200 mx-auto mb-6"></div>
        <p className="text-slate-400 text-sm font-medium">© 2025 Babatao - 北北桃電影城</p>
        <p className="text-slate-400 text-sm font-medium"><Link href="https://github.com/Ray1020-a/BaBaTao-MovieTheater-Information">GitHub</Link></p>
      </footer>
    </div>
  );
}