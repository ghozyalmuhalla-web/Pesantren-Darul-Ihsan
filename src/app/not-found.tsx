import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-primary-container/20 to-slate-950 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Animated number */}
        <div className="relative mb-8">
          <div className="text-[12rem] font-black text-white/5 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-2">
              <div className="w-20 h-20 bg-secondary/20 rounded-3xl flex items-center justify-center mx-auto border border-secondary/30 backdrop-blur-sm">
                <span className="material-symbols-outlined text-4xl text-secondary">search_off</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-black text-white mb-4 tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-slate-400 text-base leading-relaxed mb-10">
          Maaf, halaman yang Anda cari tidak ada atau mungkin sudah dipindahkan.
          Kembali ke beranda dan temukan informasi yang Anda butuhkan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-secondary text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-secondary/20 flex items-center gap-2 justify-center group"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">home</span>
            Kembali ke Beranda
          </Link>
          <Link
            href="/news"
            className="px-8 py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2 justify-center"
          >
            <span className="material-symbols-outlined">newspaper</span>
            Lihat Berita
          </Link>
        </div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-secondary/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-32 right-24 w-3 h-3 bg-secondary/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-16 w-2 h-2 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>
    </div>
  );
}
