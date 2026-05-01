import Link from "next/link";

export default function FasilitasDanProgram() {
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
            items: ["Melatih Kepemimpinan, Jiwa sosial, dan Kemandirian hidup", "Santri dibiasakan aktif dalam organisasi dan kegiatan sosial"],
            icon: "groups",
            color: "bg-cyan-50 text-cyan-600"
        },
        {
            number: "7",
            title: "Sistem Boarding (Asrama)",
            items: ["Pendidikan berlangsung 24 jam di lingkungan pesantren", "Fokus pada: Pembinaan ibadah, Lingkungan islami, Kontrol pergaulan"],
            icon: "home",
            color: "bg-orange-50 text-orange-600"
        }
    ];

    const fasilitas = [
        "Gedung Ruang Kelas yang representatif.",
        "Asrama Putra & Putri yang nyaman dan terjaga.",
        "Laboratorium Komputer untuk literasi digital.",
        "Perpustakaan dengan koleksi buku agama dan umum.",
        "Sarana Olahraga dan Aula Serbaguna.",
        "Masjid sebagai pusat aktivitas ibadah dan dakwah.",
        "Unit Kesehatan Sebagai tempat Kesehatan santri 24 Jam.",
        "Laboratorium Sains untuk Melaksanakan Praktik Kimia, Biologi dan Fisika."
    ];

    return (
        <main className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <div className="bg-primary-container text-white py-24 px-6 text-center">
                <h1 className="font-h1 text-h1 mb-4">Fasilitas & Program Unggulan</h1>
                <p className="font-body-lg opacity-80 max-w-2xl mx-auto">
                    Informasi lengkap mengenai fasilitas penunjang madrasah dan program-program utama yang kami tawarkan.
                </p>
            </div>

            {/* Fasilitas Pendukung */}
            <section className="py-24 bg-white -mt-8 rounded-t-[40px] relative z-10 shadow-sm">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-h2 text-h2 text-primary-container mb-12 text-center">Fasilitas Pendukung</h2>
                    <p className="text-on-surface-variant leading-relaxed text-center max-w-3xl mx-auto mb-12 text-lg">
                        Untuk menunjang proses belajar mengajar dan kenyamanan santri, MAS Darul Ihsan dilengkapi dengan:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {fasilitas.map((item, i) => (
                            <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                <span className="material-symbols-outlined text-secondary text-2xl group-hover:scale-110 transition-transform mt-1">check_circle</span>
                                <span className="font-medium text-on-surface-variant">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Programs Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-h2 text-h2 text-primary-container mb-16 text-center">7 Program Utama Kami</h2>
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
                                                <span className="material-symbols-outlined text-base">arrow_right_alt</span>
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
        </main>
    );
}
