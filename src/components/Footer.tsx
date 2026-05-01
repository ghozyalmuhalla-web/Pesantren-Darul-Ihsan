import Image from "next/image";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center px-6 max-w-[1280px] mx-auto text-center bg-slate-900 dark:bg-black w-full pt-32 pb-24 md:pb-8 border-t border-slate-800">
            <div className="grid md:grid-cols-3 w-full gap-12 text-left mb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Logo Darul Ihsan" width={48} height={48} className="object-contain" />
                        <span className="text-white text-lg font-bold">MAS Pesantren Modern Darul Ihsan</span>
                    </div>
                    <p className="text-slate-400 font-serif text-sm leading-relaxed">
                        Desa Selemak, Kec. Hamparan Perak,<br />
                        Kab. Deli Serdang, Sumatera Utara<br />
                        Email: maspmdi@gmail.com
                    </p>
                    <div className="flex gap-4">
                        <a 
                            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-secondary transition-colors" 
                            href="https://www.tiktok.com/@mas_pmdi"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="TikTok @mas_pmdi"
                        >
                            <span className="material-symbols-outlined text-lg">social_leaderboard</span>
                        </a>
                        <a 
                            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-secondary transition-colors" 
                            href="https://www.instagram.com/maspmdi"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram @maspmdi"
                        >
                            <span className="material-symbols-outlined text-lg">photo_camera</span>
                        </a>
                    </div>
                </div>
                <div className="space-y-6">
                    <h5 className="text-white font-bold uppercase text-xs tracking-[0.2em]">Media Sosial</h5>
                    <div className="flex flex-col gap-4">
                        <a className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors" href="https://www.instagram.com/maspmdi" target="_blank" rel="noopener noreferrer">
                            <span className="material-symbols-outlined text-xl text-secondary">photo_camera</span>
                            <span className="text-sm font-serif">IG: @maspmdi</span>
                        </a>
                        <a className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors" href="https://www.tiktok.com/@mas_pmdi" target="_blank" rel="noopener noreferrer">
                            <span className="material-symbols-outlined text-xl text-secondary">social_leaderboard</span>
                            <span className="text-sm font-serif">Tiktok: mas_pmdi</span>
                        </a>
                    </div>
                </div>
                <div className="space-y-6">
                    <h5 className="text-white font-bold uppercase text-xs tracking-[0.2em]">Hubungi Kami</h5>
                    <div className="flex flex-col gap-4">
                        <a className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors" href="mailto:maspmdi@gmail.com">
                            <span className="material-symbols-outlined text-xl text-secondary">mail</span>
                            <span className="text-sm font-serif">Email: maspmdi@gmail.com</span>
                        </a>
                    </div>
                </div>
            </div>
            <p className="text-slate-500 text-xs border-t border-slate-800 pt-8 w-full">
                © 2024 MAS Pesantren Modern Darul Ihsan. All rights reserved.
            </p>
        </footer>
    );
}
