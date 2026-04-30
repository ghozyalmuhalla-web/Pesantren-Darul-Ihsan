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
                        Email: info@darulihsan.sch.id
                    </p>
                    <div className="flex gap-4">
                        <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-secondary transition-colors" href="#">
                            <span className="material-symbols-outlined text-lg">social_leaderboard</span>
                        </a>
                        <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-secondary transition-colors" href="#">
                            <span className="material-symbols-outlined text-lg">photo_camera</span>
                        </a>
                    </div>
                </div>
                <div className="space-y-6">
                    <h5 className="text-white font-bold uppercase text-xs tracking-[0.2em]">Quick Links</h5>
                    <div className="flex flex-col gap-3">
                        <a className="text-slate-400 font-serif text-sm hover:text-white transition-colors underline" href="#">Academic Calendar</a>
                        <a className="text-slate-400 font-serif text-sm hover:text-white transition-colors underline" href="#">Privacy Policy</a>
                        <a className="text-slate-400 font-serif text-sm hover:text-white transition-colors underline" href="#">Alumni Portal</a>
                        <a className="text-slate-400 font-serif text-sm hover:text-white transition-colors underline" href="#">Support Us</a>
                    </div>
                </div>
                <div className="space-y-6">
                    <h5 className="text-white font-bold uppercase text-xs tracking-[0.2em]">Newsletter</h5>
                    <p className="text-slate-400 font-serif text-sm">Dapatkan update terbaru seputar pendaftaran dan kegiatan santri.</p>
                    <div className="flex gap-2">
                        <input className="bg-slate-800 border-none rounded-lg text-white px-4 py-2 w-full focus:ring-2 focus:ring-secondary" placeholder="Email Anda" type="email" />
                        <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold">Gabung</button>
                    </div>
                </div>
            </div>
            <p className="text-slate-500 text-xs border-t border-slate-800 pt-8 w-full">
                © 2024 MAS Pesantren Modern Darul Ihsan. All rights reserved.
            </p>
        </footer>
    );
}
