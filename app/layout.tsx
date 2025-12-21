import './globals.css';
import Navbar from '@/components/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Babatao - 北北桃影院票價比價 | 優惠攻略',
    template: '%s | Babatao'
  },
  description: '整理台北、新北、桃園影院票價與購票攻略',
  keywords: ['電影票價', '台北影院', '威秀票價', '便宜電影票', '信用卡電影優惠', '北北桃影城'],
  openGraph: {
    title: 'Babatao - 北北桃影院票價比價',
    description: '想省錢看電影？快來這裡吧！',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'Babatao',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="antialiased text-slate-900 bg-slate-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}