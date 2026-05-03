import prisma from "@/lib/prisma";
import Carousel from "@/components/Carousel";

export default async function FasilitasDanProgram() {
    const settingsRecords = await prisma.setting.findMany();
    const s: Record<string, string> = {};
    settingsRecords.forEach(rec => { s[rec.key] = rec.value; });

    const fasilitasList = (s.fasilitas_list || "Gedung Ruang Kelas yang representatif.,Asrama Putra & Putri yang nyaman dan terjaga.,Laboratorium Komputer untuk literasi digital.,Perpustakaan dengan koleksi buku agama dan umum.,Sarana Olahraga dan Aula Serbaguna.,Masjid sebagai pusat aktivitas ibadah dan dakwah.,Unit Kesehatan Sebagai tempat Kesehatan santri 24 Jam.,Laboratorium Sains untuk Melaksanakan Praktik Kimia, Biologi dan Fisika.")
        .split(',').map(f => f.trim()).filter(Boolean);

    const progColors = ["bg-blue-50 text-blue-600","bg-emerald-50 text-emerald-600","bg-amber-50 text-amber-600","bg-purple-50 text-purple-600","bg-rose-50 text-rose-600","bg-cyan-50 text-cyan-600","bg-orange-50 text-orange-600"];
    const progIcons = ["school","menu_book","verified_user","public","stars","groups","home"];
    const defaultTitles = ["Pendidikan Terpadu (Agama + Umum)","Program Tahfidz Al-Qur'an","Pembinaan Akhlak & Kedisiplinan","Pengembangan Bahasa (Arab & Inggris)","Pengembangan Bakat & Keterampilan","Program Kemandirian & Leadership","Sistem Boarding (Asrama)"];
    const defaultItems = [
        "Menggabungkan kurikulum diniyah (agama) dan pelajaran umum\nMembentuk santri yang cerdas secara akademik dan kuat secara agama",
        "Fokus pada hafalan Al-Qur'an (tahfidz)\nMenjadi salah satu program inti untuk mencetak generasi Qur'ani",
        "Kegiatan harian yang terstruktur untuk membentuk karakter islami\nMelatih disiplin dan tanggung jawab",
        "Pembiasaan komunikasi dan pembelajaran bahasa\nMendukung kemampuan santri untuk go international",
        "Ekstrakurikuler: Akademik, Seni, Olahraga\nMengasah potensi santri sesuai minat masing-masing",
        "Melatih Kepemimpinan, Jiwa sosial, dan Kemandirian hidup\nSantri dibiasakan aktif dalam organisasi dan kegiatan sosial",
        "Pendidikan berlangsung 24 jam di lingkungan pesantren\nFokus pada: Pembinaan ibadah, Lingkungan islami, Kontrol pergaulan"
    ];

    const mainPrograms = Array.from({ length: 7 }, (_, i) => ({
        number: String(i + 1),
        title: s[`fasilitas_prog_${i+1}_title`] || defaultTitles[i],
        items: (s[`fasilitas_prog_${i+1}_items`] || defaultItems[i]).split('\n').filter(Boolean),
        icon: progIcons[i],
        color: progColors[i]
    }));

    const posterImages = [
        s.fasilitas_poster_1 || "/images/lingkungan-poster.jpg",
        s.fasilitas_poster_2 || "/images/fasilitas-poster-2.jpg",
        s.fasilitas_poster_3 || "/images/mou-poster-1.jpg",
        s.fasilitas_poster_4 || "/images/mou-poster-2.jpg",
    ];

    return (
        <main className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <div className="bg-primary-container text-white py-24 px-6 text-center">
                <h1 className="font-h1 text-h1 mb-4">{s.fasilitas_header_title || "Fasilitas & Program Unggulan"}</h1>
                <p className="font-body-lg opacity-80 max-w-2xl mx-auto">
                    {s.fasilitas_header_desc || "Informasi lengkap mengenai fasilitas penunjang madrasah dan program-program utama yang kami tawarkan."}
                </p>
            </div>

            {/* Fasilitas Pendukung */}
            <section className="py-24 bg-white -mt-8 rounded-t-[40px] relative z-10 shadow-sm">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-h2 text-h2 text-primary-container mb-12 text-center">{s.fasilitas_section_title || "Fasilitas Pendukung"}</h2>
                    <p className="text-on-surface-variant leading-relaxed text-center max-w-3xl mx-auto mb-12 text-lg">
                        {s.fasilitas_section_desc || "Untuk menunjang proses belajar mengajar dan kenyamanan santri, MAS Darul Ihsan dilengkapi dengan:"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {fasilitasList.map((item, i) => (
                            <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                <span className="material-symbols-outlined text-secondary text-2xl group-hover:scale-110 transition-transform mt-1">check_circle</span>
                                <span className="font-medium text-on-surface-variant">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Poster Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {posterImages.map((src, i) => (
                            <div key={i} className="relative rounded-[40px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border-8 border-slate-50 aspect-[4/3] bg-white p-4">
                                <Carousel images={src} overlay={false} objectFit="contain" className="w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-h2 text-h2 text-primary-container mb-16 text-center">{s.fasilitas_programs_title || "7 Program Utama Kami"}</h2>
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
