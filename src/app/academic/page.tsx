export default function AcademicPage() {
    const focusAreas = [
        {
            title: "Tahfidz Al-Qur’an",
            desc: "Program setoran hafalan rutin dengan target capaian yang terukur.",
            icon: "auto_stories"
        },
        {
            title: "Penguasaan Kitab Kuning",
            desc: "Pendalaman literatur klasik Islam untuk memperkuat fondasi keagamaan.",
            icon: "menu_book"
        },
        {
            title: "Language Environment",
            desc: "Penerapan area wajib bahasa Arab dan Inggris dalam percakapan sehari-hari.",
            icon: "language"
        },
        {
            title: "Ekstrakurikuler Multimedia & Seni",
            desc: "Mengasah kreativitas santri di bidang teknologi informasi, seni Islam, dan olahraga.",
            icon: "palette"
        }
    ];

    const mainPrograms = [
        {
            number: "1",
            title: "Pendidikan Terpadu (Agama + Umum)",
            items: ["Menggabungkan kurikulum diniyah (agama) dan pelajaran umum", "Membentuk santri yang cerdas secara akademik dan kuat secara agama"],
            icon: "school",
            color: "bg-blue-50 text-blue-600"
        },
        {
            number: "2",
            title: "Program Tahfidz Al-Qur’an",
            items: ["Fokus pada hafalan Al-Qur’an (tahfidz)", "Menjadi salah satu program inti untuk mencetak generasi Qur’ani"],
            icon: "menu_book",
            color: "bg-emerald-50 text-emerald-600"
        },
        {
            number: "3",
            title: "Pembinaan Akhlak & Kedisiplinan",
            items: ["Kegiatan harian yang terstruktur untuk membentuk karakter islami", "Melatih disiplin dan tanggung jawab"],
            icon: "verified_user",
            color: "bg-amber-50 text-amber-600"
        },
        {
            number: "4",
            title: "Pengembangan Bahasa (Arab & Inggris)",
            items: ["Pembiasaan komunikasi dan pembelajaran bahasa", "Mendukung kemampuan santri untuk go international"],
            icon: "public",
            color: "bg-purple-50 text-purple-600"
        },
        {
            number: "5",
            title: "Pengembangan Bakat & Keterampilan",
            items: ["Ekstrakurikuler: Akademik, Seni, Olahraga", "Mengasah potensi santri sesuai minat masing-masing"],
            icon: "stars",
            color: "bg-rose-50 text-rose-600"
        },
        {
            number: "6",
            title: "Program Kemandirian & Leadership",
            items: ["Melatih kepemimpinan dan jiwa sosial", "Santri dibiasakan aktif dalam organisasi dan kegiatan sosial"],
            icon: "groups",
            color: "bg-cyan-50 text-cyan-600"
        },
        {
            number: "7",
            title: "Sistem Boarding (Asrama)",
            items: ["Pendidikan berlangsung 24 jam di lingkungan pesantren", "Fokus pada pembinaan ibadah dan kontrol pergaulan"],
            icon: "home",
            color: "bg-orange-50 text-orange-600"
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-primary-container text-white py-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                <div className="relative z-10 max-w-[1000px] mx-auto">
                    <h1 className="font-h1 text-h1 mb-6">Program Unggulan</h1>
                    <p className="font-body-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
                        Kami menawarkan lingkungan belajar yang kondusif dengan fokus pada pembentukan generasi yang unggul dalam akademik dan spiritual.
                    </p>
                </div>
            </div>

            {/* Focus Areas Intro */}
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
                    <h2 className="text-3xl font-bold mb-6">Siap Menjadi Bagian dari Kami?</h2>
                    <p className="opacity-80 mb-10 text-lg">Pendaftaran Santri Baru (PPDB) Tahun Ajaran 2026/2027 telah dibuka.</p>
                    <a 
                        href="#" 
                        className="inline-block bg-secondary text-primary-container px-10 py-4 rounded-full font-bold hover:bg-white hover:scale-105 transition-all shadow-lg"
                    >
                        Daftar Sekarang
                    </a>
                </div>
            </section>
        </main>
    );
}
