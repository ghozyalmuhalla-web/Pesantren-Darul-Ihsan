import prisma from "@/lib/prisma";

export default async function AcademicPage() {
    const settingsRecords = await prisma.setting.findMany();
    const s: Record<string, string> = {};
    settingsRecords.forEach(rec => { s[rec.key] = rec.value; });

    const focusAreas = [
        {
            title: s.academic_focus_1_title || "Tahfidz Al-Qur'an",
            desc: s.academic_focus_1_desc || "Program setoran hafalan rutin dengan target capaian yang terukur (30 Juz).",
            icon: "auto_stories"
        },
        {
            title: s.academic_focus_2_title || "Kitab Turots",
            desc: s.academic_focus_2_desc || "Pendalaman literatur klasik Islam (Kitab Kuning) untuk memperkuat fondasi keagamaan.",
            icon: "menu_book"
        },
        {
            title: s.academic_focus_3_title || "Bilingual Environment",
            desc: s.academic_focus_3_desc || "Penerapan area wajib bahasa Arab dan Inggris dalam percakapan sehari-hari.",
            icon: "language"
        },
        {
            title: s.academic_focus_4_title || "Science & Tech",
            desc: s.academic_focus_4_desc || "Integrasi kurikulum Kemenag dengan penguasaan sains dan teknologi modern.",
            icon: "biotech"
        }
    ];

    const curriculum = [
        { name: "Kurikulum Nasional (Kemenag)", items: ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "Fisika/Ekonomi", "Kimia/Sosiologi", "Biologi/Geografi"] },
        { name: "Kurikulum Pesantren", items: ["Nahwu & Sharaf", "Fiqih & Ushul Fiqih", "Aqidah Akhlak", "Hadits & Mustholah", "Tafsir & Ulumul Quran", "Tarikh Islam"] },
        { name: "Program Khusus", items: ["Tahfidz Quran", "Muhadharah (Pidato)", "Pramuka & Beladiri", "Kajian Kitab Kuning", "Entrepreneurship", "IT & Multimedia"] }
    ];

    const progColors = ["bg-blue-50 text-blue-600","bg-emerald-50 text-emerald-600","bg-amber-50 text-amber-600","bg-purple-50 text-purple-600","bg-rose-50 text-rose-600","bg-cyan-50 text-cyan-600","bg-orange-50 text-orange-600"];
    const progIcons = ["school","menu_book","verified_user","public","stars","groups","home"];
    const defaultTitles = ["Pendidikan Terpadu MAS","Tahfidz Al-Qur'an Mutqin","Pembinaan Karakter Islami","Pengembangan Bahasa Asing","Ektrakurikuler Berprestasi","Leadership & Organisasi","Sistem Karantina (Boarding)"];
    const defaultItems = [
        "Integrasi kurikulum Madrasah Aliyah (Kemenag) dan sistem pondok modern\nLulusan mendapatkan ijazah nasional dan syahadah pesantren",
        "Target hafalan yang jelas dengan bimbingan ustadz/ustadzah berpengalaman\nEvaluasi rutin setiap semester untuk menjaga kualitas hafalan",
        "Penanaman adab dan akhlak melalui teladan langsung (uswah)\nLingkungan yang terjaga dari pengaruh negatif luar",
        "Language area untuk bahasa Arab dan Inggris (Daily Conversation)\nMendukung santri untuk melanjutkan studi ke Timur Tengah atau Barat",
        "Berbagai klub minat bakat: Olahraga, Seni Islam, hingga Robotik\nBerpartisipasi aktif dalam kompetisi tingkat daerah dan nasional",
        "Pelatihan kepemimpinan melalui organisasi santri (OSIS/ISDI)\nSantri dilatih mandiri, berani, dan memiliki jiwa sosial tinggi",
        "Pendidikan 24 jam dengan fasilitas asrama yang nyaman dan bersih\nKontrol penuh terhadap ibadah harian dan kedisiplinan santri"
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
            <div className="bg-primary-container text-white py-40 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                <div className="relative z-10 max-w-[1000px] mx-auto">
                    <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-black tracking-widest uppercase mb-6 border border-white/20">
                        Education Program
                    </div>
                    <h1 className="font-h1 text-h1 mb-6 lg:text-7xl">{s.academic_header_title || "Akademik & Kurikulum"}</h1>
                    <p className="font-body-lg opacity-80 max-w-2xl mx-auto leading-relaxed text-lg">
                        {s.academic_header_desc || "Mencetak kader ulama intelektual melalui integrasi kurikulum Madrasah Aliyah dan nilai-nilai luhur pesantren modern."}
                    </p>
                </div>
            </div>

            {/* Focus Areas */}
            <section className="py-24 max-w-[1200px] mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {focusAreas.map((area, i) => (
                        <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                            <div className="w-14 h-14 bg-slate-50 text-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-white transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-3xl font-bold">{area.icon}</span>
                            </div>
                            <h4 className="font-black text-primary-container mb-4 text-lg">{area.title}</h4>
                            <p className="text-on-surface-variant text-sm leading-relaxed opacity-70">{area.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Struktur Kurikulum Section */}
            <section className="py-32 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="font-h2 text-h2 text-primary-container mb-4">Struktur Kurikulum Terpadu</h2>
                        <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {curriculum.map((cat, i) => (
                            <div key={i} className="bg-slate-50/50 rounded-[48px] p-10 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                                <h3 className="text-xl font-black text-primary-container mb-8 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-secondary rounded-full group-hover:h-10 transition-all"></span>
                                    {cat.name}
                                </h3>
                                <ul className="space-y-4">
                                    {cat.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-on-surface-variant font-bold text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Programs Grid */}
            <section className="py-32 bg-slate-50/50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                        <div className="text-left">
                            <p className="text-secondary font-black tracking-[0.2em] text-xs uppercase mb-3">Core Excellence</p>
                            <h2 className="font-h2 text-h2 text-primary-container">7 Program Utama Kami</h2>
                        </div>
                        <p className="text-on-surface-variant max-w-md text-sm font-medium opacity-60">
                            Setiap santri didorong untuk menguasai kompetensi dasar agama dan ilmu umum secara seimbang.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mainPrograms.map((p, i) => (
                            <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div className={`w-16 h-16 ${p.color} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-sm`}>
                                        <span className="material-symbols-outlined text-3xl font-bold">{p.icon}</span>
                                    </div>
                                    <span className="text-5xl font-black text-slate-100/50 group-hover:text-secondary/10 transition-colors">0{p.number}</span>
                                </div>
                                <h3 className="text-xl font-black text-primary-container mb-6 leading-tight relative z-10">{p.title}</h3>
                                <ul className="space-y-4 mt-auto relative z-10">
                                    {p.items.map((item, idx) => (
                                        <li key={idx} className="flex gap-4 text-on-surface-variant text-sm leading-relaxed font-medium opacity-70">
                                            <span className="text-secondary mt-1">
                                                <span className="material-symbols-outlined text-lg">check_circle</span>
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
            <section className="py-32 px-6 text-center">
                <div className="max-w-[1100px] mx-auto bg-primary-container text-white p-16 md:p-24 rounded-[80px] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-secondary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
                    
                    <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 leading-tight">Mulai Perjalanan Qur&apos;ani <br className="hidden md:block"/> Anda Sekarang</h2>
                    <p className="opacity-70 mb-16 text-xl max-w-2xl mx-auto relative z-10 font-medium">
                        {s.academic_cta_desc || "Pendaftaran Santri Baru (PPDB) MAS Pesantren Modern Darul Ihsan Tahun Ajaran 2026/2027 telah dibuka secara online."}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-6 relative z-10">
                        <a
                            href={s.academic_cta_btn_url || "/ppdb/daftar"}
                            className="inline-block bg-secondary text-white px-12 py-6 rounded-3xl font-black hover:bg-white hover:text-primary-container hover:scale-105 transition-all shadow-xl shadow-blue-900/40 text-lg uppercase tracking-widest"
                        >
                            {s.academic_cta_btn_text || "Daftar Online"}
                        </a>
                        <a
                            href="/brosur-darulihsan.pdf"
                            className="inline-block bg-white/5 backdrop-blur-xl text-white border-2 border-white/10 px-12 py-6 rounded-3xl font-black hover:bg-white hover:text-primary-container transition-all flex items-center gap-3 text-lg uppercase tracking-widest"
                        >
                            <span className="material-symbols-outlined font-bold">download</span>
                            Brosur PDF
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

