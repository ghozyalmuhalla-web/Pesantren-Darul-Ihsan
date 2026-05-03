import { Metadata } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "PPDB - MAS Pesantren Modern Darul Ihsan",
    description: "Informasi Pendaftaran Peserta Didik Baru (PPDB) MAS Pesantren Modern Darul Ihsan. Bergabunglah bersama kami membentuk generasi Qur'ani.",
};

export default async function PPDBPage() {
    const settingsList = await prisma.setting.findMany();
    const s: Record<string, string> = {};
    settingsList.forEach(item => { s[item.key] = item.value; });

    const g = (key: string, def: string) => s[key] || def;

    const alur = [
        { icon: "app_registration", title: "Pendaftaran Online", desc: "Mengisi formulir pendaftaran melalui website resmi PPDB Darul Ihsan." },
        { icon: "description", title: "Verifikasi Berkas", desc: "Menyerahkan kelengkapan dokumen administrasi ke panitia pendaftaran." },
        { icon: "psychology", title: "Ujian Seleksi", desc: "Mengikuti tes tertulis (Akademik & Agama) serta tes wawancara santri & orang tua." },
        { icon: "task_alt", title: "Pengumuman", desc: "Hasil seleksi akan diumumkan melalui website dan papan pengumuman madrasah." },
        { icon: "payments", title: "Daftar Ulang", desc: "Melakukan penyelesaian administrasi dan pengambilan perlengkapan santri." },
    ];

    const syarat = g("ppdb_syarat", "Fotocopy Ijazah/SKL dilegalisir (3 lembar).,Fotocopy Akta Kelahiran (3 lembar).,Fotocopy Kartu Keluarga (3 lembar).,Pas Foto 3x4 & 2x3 (masing-masing 5 lembar).,Fotocopy KIP/PKH (Jika ada).,Surat Keterangan Berkelakuan Baik.").split(",");

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navigation />
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src="/images/hero-main.png" alt="PPDB Background" fill className="object-cover brightness-[0.25]" priority unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-container/60 to-slate-50"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-black uppercase tracking-[0.3em] mb-6 animate-fade-in">
                        Penerimaan Santri Baru
                    </span>
                    <h1 className="text-4xl lg:text-7xl font-bold text-primary-container font-h2 leading-tight mb-6">
                        {g("ppdb_title", "Mari Bergabung Menjadi")} <br/>
                        <span className="text-secondary italic">Generasi Qur&apos;ani</span>
                    </h1>
                    <p className="text-on-surface-variant max-w-2xl mx-auto text-lg mb-10 opacity-80">
                        {g("ppdb_subtitle", "Membuka pendaftaran santri baru tahun ajaran 2025/2026. MAS Pesantren Modern Darul Ihsan mencetak santri yang cerdas, mandiri, dan berakhlakul karimah.")}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/ppdb/daftar" className="px-10 py-5 bg-secondary text-white rounded-2xl font-bold hover:bg-blue-900 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 flex items-center gap-2">
                            <span className="material-symbols-outlined">edit_note</span>
                            Buka Formulir Pendaftaran
                        </Link>
                        <Link href="#alur" className="px-10 py-5 bg-white text-primary-container border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95">
                            Lihat Alur & Syarat
                        </Link>
                    </div>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl font-bold">calendar_month</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-container mb-3">Jadwal Pendaftaran</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                                Gelombang 1: 01 Jan - 31 Mar 2025<br/>
                                Gelombang 2: 01 Apr - 30 Jun 2025
                            </p>
                            <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Buka Sekarang</span>
                        </div>
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group">
                            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl font-bold">school</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-container mb-3">Kuota Terbatas</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">
                                Kami menjaga kualitas pendidikan dengan membatasi jumlah santri per kelas agar proses belajar lebih efektif dan personal.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group">
                            <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl font-bold">support_agent</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-container mb-3">Layanan Informasi</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                                Butuh bantuan? Tim PPDB kami siap membantu menjawab pertanyaan Anda setiap hari kerja pukul 08:00 - 16:00 WIB.
                            </p>
                            <Link href="https://wa.me/6281234567890" className="text-xs font-bold text-green-600 flex items-center gap-1 hover:underline">
                                <span className="material-symbols-outlined text-sm font-bold">chat</span>
                                Hubungi Admin PPDB
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alur Pendaftaran */}
            <section id="alur" className="py-20 bg-primary-container relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white font-h2 mb-4">Alur Pendaftaran</h2>
                        <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
                    </div>

                    <div className="relative">
                        {/* Connection Line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-white/20 -translate-y-1/2"></div>
                        
                        <div className="grid lg:grid-cols-5 gap-8">
                            {alur.map((item, i) => (
                                <div key={i} className="relative group">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[40px] text-center hover:bg-white/20 transition-all duration-500">
                                        <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-secondary/20 relative z-20">
                                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                            <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-primary-container text-xs font-black flex items-center justify-center border-4 border-primary-container">
                                                0{i+1}
                                            </span>
                                        </div>
                                        <h4 className="text-white font-bold mb-3">{item.title}</h4>
                                        <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Syarat & Biaya */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Requirements */}
                        <div className="lg:col-span-7">
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary-container font-h2 mb-8">Persyaratan Administrasi</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {syarat.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-slate-100 hover:border-secondary transition-colors group">
                                        <span className="material-symbols-outlined text-secondary group-hover:scale-125 transition-transform">check_circle</span>
                                        <span className="text-on-surface-variant text-sm font-medium leading-relaxed">{item.trim()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cost / Info Box */}
                        <div className="lg:col-span-5">
                            <div className="bg-gradient-to-br from-secondary to-blue-900 p-1 rounded-[48px] shadow-2xl">
                                <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[44px] text-white">
                                    <h3 className="text-2xl font-bold mb-6">Informasi Biaya</h3>
                                    <p className="text-white/80 text-sm leading-relaxed mb-8">
                                        Detail rincian biaya pendaftaran, uang pangkal, asrama, dan perlengkapan dapat diunduh melalui brosur digital kami.
                                    </p>
                                    
                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10">
                                            <span className="text-xs font-bold uppercase tracking-widest">Biaya Pendaftaran</span>
                                            <span className="font-bold text-secondary">Gratis</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10">
                                            <span className="text-xs font-bold uppercase tracking-widest">Uang Pangkal</span>
                                            <span className="font-bold">Cek Brosur</span>
                                        </div>
                                    </div>

                                    <button className="w-full py-5 bg-white text-secondary rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">download_for_offline</span>
                                        Unduh Brosur (PDF)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ / Simple Section */}
            <section className="pb-32">
                <div className="container mx-auto px-6">
                    <div className="bg-slate-100 rounded-[64px] p-12 lg:p-20 text-center">
                        <h2 className="text-3xl font-bold text-primary-container mb-6">Punya Pertanyaan Lain?</h2>
                        <p className="text-on-surface-variant max-w-xl mx-auto mb-10">
                            Jangan ragu untuk menghubungi panitia PPDB kami jika ada hal yang kurang jelas mengenai proses pendaftaran santri baru.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200">
                                <span className="material-symbols-outlined text-secondary">phone_in_talk</span>
                                <span className="font-bold text-sm text-primary-container">0812-3456-7890 (Call Center)</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200">
                                <span className="material-symbols-outlined text-green-600">forum</span>
                                <span className="font-bold text-sm text-primary-container">WhatsApp PPDB Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
