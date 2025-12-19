import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Babatao - 北北桃影院票價整理',
  description: '專業整理台北、新北、桃園影院票價與購票攻略',
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