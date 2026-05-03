import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Footer() {
    const settingsRecords = await prisma.setting.findMany();
    const s: Record<string, string> = {};
    settingsRecords.forEach(rec => { s[rec.key] = rec.value; });

    return (
        <footer className="bg-slate-950 text-white pt-24 pb-12 w-full border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-xl">
                                <img src="/logo.png" alt="Logo Darul Ihsan" width={40} height={40} className="object-contain" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">{s.footer_school_name || "MAS DARUL IHSAN"}</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: (s.footer_address || "Desa Selemak, Kec. Hamparan Perak,<br/>Kab. Deli Serdang, Sumatera Utara") }} />
                        <div className="flex gap-4">
                            <a href={s.footer_instagram_url || "#"} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-all group">
                                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">photo_camera</span>
                            </a>
                            <a href={s.footer_tiktok_url || "#"} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-all group">
                                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">social_leaderboard</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h5 className="font-bold uppercase text-xs tracking-widest text-secondary">Tautan Cepat</h5>
                        <ul className="space-y-3">
                            {["Home", "Profil", "Akademik", "Fasilitas", "PPDB", "News", "Galeri"].map((link) => (
                                <li key={link}>
                                    <Link 
                                        href={link === "Home" ? "/" : `/${link.toLowerCase()}`} 
                                        className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Media Sosial */}
                    <div className="space-y-6">
                        <h5 className="font-bold uppercase text-xs tracking-widest text-secondary">Media Sosial</h5>
                        <div className="flex flex-col gap-4">
                            <a className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group" href={s.footer_instagram_url || "#"} target="_blank" rel="noopener noreferrer">
                                <span className="material-symbols-outlined text-xl text-secondary/60 group-hover:text-secondary">photo_camera</span>
                                <span className="text-sm">{s.footer_instagram_label || "@maspmdi"}</span>
                            </a>
                            <a className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group" href={s.footer_tiktok_url || "#"} target="_blank" rel="noopener noreferrer">
                                <span className="material-symbols-outlined text-xl text-secondary/60 group-hover:text-secondary">social_leaderboard</span>
                                <span className="text-sm">{s.footer_tiktok_label || "@mas_pmdi"}</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h5 className="font-bold uppercase text-xs tracking-widest text-secondary">Hubungi Kami</h5>
                        <div className="flex flex-col gap-4">
                            <a className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group" href={`mailto:${s.footer_email || "maspmdi@gmail.com"}`}>
                                <span className="material-symbols-outlined text-xl text-secondary/60 group-hover:text-secondary">mail</span>
                                <span className="text-sm truncate">{s.footer_email || "maspmdi@gmail.com"}</span>
                            </a>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Informasi PPDB Online</p>
                                <Link href="/ppdb" className="text-secondary font-bold hover:underline">darulihsan.sch.id/ppdb</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 pt-12 border-t border-white/5">
                    <div className="lg:col-span-8">
                        <h5 className="font-bold uppercase text-xs tracking-widest text-secondary mb-6">Lokasi Kampus</h5>
                        <div className="rounded-[32px] overflow-hidden grayscale invert opacity-50 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700 h-[300px] border border-white/10">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15931.112104593184!2d98.5721184!3d3.7495552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f0015555555%3A0x8888888888888888!2sPesantren%20Modern%20Darul%20Ihsan!5e0!3m2!1sid!2sid!4v1714690000000!5m2!1sid!2sid" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col justify-center">
                        <div className="bg-primary-container p-10 rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                            <h4 className="text-2xl font-black mb-6 relative z-10">Punya Pertanyaan?</h4>
                            <p className="text-slate-400 text-sm mb-8 relative z-10 leading-relaxed">Tim administrasi kami siap membantu Anda memberikan informasi yang dibutuhkan mengenai program pendidikan dan pendaftaran.</p>
                            <a href={`mailto:${s.footer_email || "maspmdi@gmail.com"}`} className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-2xl font-bold hover:bg-blue-600 transition-all relative z-10">
                                <span className="material-symbols-outlined">send</span>
                                Kirim Email
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest text-center md:text-left">
                        {s.footer_copyright || "© 2026 MAS PESANTREN MODERN DARUL IHSAN. ALL RIGHTS RESERVED."}
                    </p>
                    <p className="text-slate-600 text-[10px] uppercase tracking-widest flex items-center gap-2">
                        Build with <span className="text-rose-500">❤️</span> by Darul Ihsan Tech
                    </p>
                </div>
            </div>
        </footer>
    );
}

