import prisma from "@/lib/prisma";

export default async function AcademicPage() {
    const settingsRecords = await prisma.setting.findMany();
    const s: Record<string, string> = {};
    settingsRecords.forEach(rec => { s[rec.key] = rec.value; });

    const focusAreas = [
        {
            title: s.academic_focus_1_title || "Tahfidz Al-Qur'an",
            desc: s.academic_focus_1_desc || "Program setoran hafalan rutin dengan target capaian yang terukur.",
            icon: "auto_stories"
        },
        {
            title: s.academic_focus_2_title || "Penguasaan Kitab Kuning",
            desc: s.academic_focus_2_desc || "Pendalaman literatur klasik Islam untuk memperkuat fondasi keagamaan.",
            icon: "menu_book"
        },
        {
            title: s.academic_focus_3_title || "Language Environment",
            desc: s.academic_focus_3_desc || "Penerapan area wajib bahasa Arab dan Inggris dalam percakapan sehari-hari.",
            icon: "language"
        },
        {
            title: s.academic_focus_4_title || "Ekstrakurikuler Multimedia & Seni",
            desc: s.academic_focus_4_desc || "Mengasah kreativitas santri di bidang teknologi informasi, seni Islam, dan olahraga.",
            icon: "palette"
        }
    ];

    const progColors = ["bg-blue-50 text-blue-600","bg-emerald-50 text-emerald-600","bg-amber-50 text-amber-600","bg-purple-50 text-purple-600","bg-rose-50 text-rose-600","bg-cyan-50 text-cyan-600","bg-orange-50 text-orange-600"];
    const progIcons = ["school","menu_book","verified_user","public","stars","groups","home"];
    const defaultTitles = ["Pendidikan Terpadu (Agama + Umum)","Program Tahfidz Al-Qur'an","Pembinaan Akhlak & Kedisiplinan","Pengembangan Bahasa (Arab & Inggris)","Pengembangan Bakat & Keterampilan","Program Kemandirian & Leadership","Sistem Boarding (Asrama)"];
    const defaultItems = [
        "Menggabungkan kurikulum diniyah (agama) dan pelajaran umum\nMembentuk santri yang cerdas secara akademik dan kuat secara agama",
        "Fokus pada hafalan Al-Qur'an (tahfidz)\nMenjadi salah satu program inti untuk mencetak generasi Qur'ani",
        "Kegiatan harian yang terstruktur untuk membentuk karakter islami\nMelatih disiplin dan tanggung jawab",
        "Pembiasaan komunikasi dan pembelajaran bahasa\nMendukung kemampuan santri untuk go international",
        "Ekstrakurikuler: Akademik, Seni, Olahraga\nMengasah potensi santri sesuai minat masing-masing",
        "Melatih kepemimpinan dan jiwa sosial\nSantri dibiasakan aktif dalam organisasi dan kegiatan sosial",
        "Pendidikan berlangsung 24 jam di lingkungan pesantren\nFokus pada pembinaan ibadah dan kontrol pergaulan"
    ];

    const mainPrograms = Array.from({ length: 7 }, (_, i) => ({
        number: String(i + 1),
        title: s[`academic_prog_${i+1}_title`] || defaultTitles[i],
        items: (s[`academic_prog_${i+1}_items`] || defaultItems[i]).split('\n').filter(Boolean),
        icon: progIcons[i],
        color: progColors[i]
    }));

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-primary-container text-white py-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                <div className="relative z-10 max-w-[1000px] mx-auto">
                    <h1 className="font-h1 text-h1 mb-6">{s.academic_header_title || "Program Unggulan"}</h1>
                    <p className="font-body-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
                        {s.academic_header_desc || "Kami menawarkan lingkungan belajar yang kondusif dengan fokus pada pembentukan generasi yang unggul dalam akademik dan spiritual."}
                    </p>
                </div>
            </div>

            {/* Focus Areas */}
            <section className="py-24 max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {focusAreas.map((area, i) => (
                        <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <span className="material-symbols-outlined text-secondary text-2xl">{area.icon}</span>
                            </div>
                            <h4 className="font-bold text-primary-container mb-3">{area.title}</h4>
                            <p className="text-on-surface-variant text-sm leading-relaxed">{area.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Detailed Programs Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-h2 text-h2 text-primary-container mb-16 text-center underline decoration-secondary decoration-4 underline-offset-8">7 Program Utama Kami</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mainPrograms.map((p, i) => (
                            <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`w-14 h-14 ${p.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-3xl">{p.icon}</span>
                                    </div>
                                    <span className="text-4xl font-black text-slate-100 group-hover:text-secondary/10 transition-colors">0{p.number}</span>
                                </div>
                                <h3 className="font-h3 text-h3 text-primary-container mb-6 leading-tight">{p.title}</h3>
                                <ul className="space-y-4 mt-auto">
                                    {p.items.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-on-surface-variant text-sm leading-relaxed">
                                            <span className="text-secondary mt-1">
                                                <span className="material-symbols-outlined text-base">check_circle</span>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-[800px] mx-auto bg-primary-container text-white p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-3xl font-bold mb-6">{s.academic_cta_title || "Siap Menjadi Bagian dari Kami?"}</h2>
                    <p className="opacity-80 mb-10 text-lg">{s.academic_cta_desc || "Pendaftaran Santri Baru (PPDB) Tahun Ajaran 2026/2027 telah dibuka."}</p>
                    <a
                        href={s.academic_cta_btn_url || "#"}
                        className="inline-block bg-secondary text-primary-container px-10 py-4 rounded-full font-bold hover:bg-white hover:scale-105 transition-all shadow-lg"
                    >
                        {s.academic_cta_btn_text || "Daftar Sekarang"}
                    </a>
                </div>
            </section>
        </main>
    );
}
