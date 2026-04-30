export default function AcademicPage() {
    const programs = [
        {
            title: "MAS Kurikulum",
            desc: "Kurikulum Madrasah Aliyah Swasta yang terakreditasi, menggabungkan kurikulum nasional dengan materi keislaman intensif.",
            items: ["Fiqih & Ushul Fiqih", "Aqidah Akhlak", "Bahasa Arab", "Sejarah Kebudayaan Islam"],
            icon: "menu_book",
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Program Tahfidz",
            desc: "Fokus pada hafalan Al-Qur'an dengan bimbingan makhraj dan tajwid yang ketat untuk mencapai standar hafalan mutqin.",
            items: ["Ziyadah (Tambah hafalan)", "Murojaah (Mengulang)", "Tasmi' Publik", "Tahsin Tilawah"],
            icon: "auto_stories",
            color: "bg-emerald-50 text-emerald-600"
        },
        {
            title: "Sains & Teknologi",
            desc: "Mempersiapkan santri menghadapi era digital melalui pembelajaran komputer, robotika, dan praktikum sains.",
            items: ["Laboratorium Komputer", "Klub Robotika", "English Club", "Science Project"],
            icon: "biotech",
            color: "bg-amber-50 text-amber-600"
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-primary-container text-white py-24 px-6 text-center">
                <h1 className="font-h1 text-h1 mb-4">Academic Program</h1>
                <p className="font-body-lg opacity-80 max-w-2xl mx-auto">
                    Membangun keseimbangan antara kecerdasan intelektual, kematangan emosional, dan keteguhan spiritual.
                </p>
            </div>

            {/* Curriculum Grid */}
            <section className="py-24 max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {programs.map((p, i) => (
                        <div key={i} className="flex flex-col h-full bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className={`w-14 h-14 ${p.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
                            </div>
                            <h3 className="font-h3 text-h3 text-primary-container mb-4">{p.title}</h3>
                            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
                                {p.desc}
                            </p>
                            <div className="mt-auto space-y-3">
                                <p className="text-xs font-bold text-secondary uppercase tracking-widest">Core Subjects</p>
                                <div className="flex flex-wrap gap-2">
                                    {p.items.map((item, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-slate-100 text-on-surface text-[11px] font-semibold rounded-full">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Schedule Info */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-[1000px] mx-auto px-6">
                    <div className="bg-white p-12 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="font-h2 text-h2 text-primary-container">Keseharian Santri</h2>
                            <p className="text-on-surface-variant leading-relaxed">
                                Kegiatan belajar mengajar dimulai dari shalat shubuh berjamaah, diikuti halaqah Al-Qur&apos;an, hingga kelas formal dan kegiatan ekstrakurikuler di sore hari. Malam hari diisi dengan murojaah dan pengayaan materi keislaman.
                            </p>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-secondary">04:30</p>
                                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Bangun Pagi</p>
                                </div>
                                <div className="h-10 w-[1px] bg-slate-200"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-secondary">07:30</p>
                                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Kelas Formal</p>
                                </div>
                                <div className="h-10 w-[1px] bg-slate-200"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-secondary">21:00</p>
                                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Istirahat</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full md:w-[350px] aspect-square rounded-3xl overflow-hidden shadow-xl rotate-3 transform hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Ib4B11CNKB2mVjDGNHNeFuXc_rFEuMwy-mekXebxPC-nV6uvup9kf4PHa5BEVjJ-u-hoC8bhFTP4IUL3JjEUhls5nRNxPZw1xSwa8U6dlriwkkdqnRRKAU2c4JlDIAfksyFwt0s2FOjHCS23n2Yp24-g86i_ZspKelzSfSZOaF9xVAdB6NLSh_MN3dT0o8Sz25NLayaAYZ22NaKrtlOihAIx5cP9cVgzw5rQafDb-OTUUIYpVwcQBRjGgdWcG5HWaVsp3e-olCw"
                                alt="Students learning"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
