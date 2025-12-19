"use client";
import { CreditCard, Smartphone, Users, Gift, Star } from 'lucide-react';

export default function HowToBuyPage() {
  const strategies = [
    { title: "信用卡大法", icon: <CreditCard />, desc: "許多大影城都有與信用卡合作的優惠，若使用指定信用卡，可以省下不少錢。", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "購物網 / 書局 票 (轉賣票)", icon: <Smartphone />, desc: "購物網或實體書局常單賣「團體券」、「會員代訂票」，單張可以省下不少錢，票券不限平假日，也不用一次買一整本。", color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "會員專屬優惠", icon: <Gift />, desc: "許多大影城都有自己的會員制度，若使用會員優惠或自家儲值金購票可以省下不少錢。", color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "團體票", icon: <Users />, desc: "透過團體優惠，購買「團體券」、「團體票」、「包場」可以低價看電影，只不過除團體券外其他有人數下限。", color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-800 mb-4">購票省錢攻略</h1>
      </header>

        <div className="grid md:grid-cols-2 gap-6">
          {strategies.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-6`}>{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        
        <header className="mt-12 text-center">
            <h1 className="text-4xl font-black text-slate-800">舉例</h1>
            <p className="text-slate-500 mb-6 mt-2">台北京站威秀、欣欣秀泰、長春國賓</p>
        </header>
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="p-5 font-semibold">集團</th>
                  <th className="p-5 font-semibold">全票</th>
                  <th className="p-5 font-semibold">轉賣票</th>
                  <th className="p-5 font-semibold">團體票</th>
                  <th className="p-5 font-semibold">會員/儲值金</th>
                  <th className="p-5 font-semibold">信用卡合作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-indigo-600 font-bold">威秀影城</td>
                  <td className="p-5 text-x">NT$360</td>
                  <td className="p-5 text-x">NT$260</td>
                  <td className="p-5 text-x">NT$260</td>
                  <td className="p-5 text-x">NT$300</td>
                  <td className="p-5 text-x text-center">✅</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-indigo-600 font-bold">秀泰影城</td>
                  <td className="p-5 text-x">NT$330</td>
                  <td className="p-5 text-x">NT$230</td>
                  <td className="p-5 text-x">NT$240</td>
                  <td className="p-5 text-x">N/A</td>
                  <td className="p-5 text-x text-center">✅</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-indigo-600 font-bold">國賓影城</td>
                  <td className="p-5 text-x">NT$320</td>
                  <td className="p-5 text-x">NT$235</td>
                  <td className="p-5 text-x">NT$230</td>
                  <td className="p-5 text-x">NT$270</td>
                  <td className="p-5 text-x text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}