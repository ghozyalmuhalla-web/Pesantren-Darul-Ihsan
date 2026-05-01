import prisma from "@/lib/prisma";

export default async function ProfilePage() {
    const settingsRecords = await prisma.setting.findMany();
    const s: Record<string, string> = {};
    settingsRecords.forEach(rec => { s[rec.key] = rec.value; });

    const misiItems = (s.profile_misi_items || "Menumbuhkan iman dan membangun adab santri.\nMengembangkan potensi santri melalui kurikulum modern tanpa meninggalkan nilai-nilai keislaman.\nPendalaman Al-Qur'an dan Hadist.\nMewujudkan generasi yang berwawasan Imtak (Iman dan Taqwa) dan Iptek (Ilmu Pengetahuan dan Teknologi).").split('\n').filter(Boolean);

    const defaultPrestasiTitles = ["🏆 Bidang Akademik", "🕌 Bidang Keagamaan", "⚽ Bidang Olahraga", "🎨 Bidang Seni & Kreativitas", "🌍 Bahasa & Internasional"];
    const defaultPrestasiItems = [
        "Juara olimpiade (Matematika, IPA, Bahasa)\nLomba karya tulis ilmiah\nPrestasi ujian nasional / asesmen",
        "Juara Musabaqah Tilawatil Qur'an (MTQ)\nHafalan Al-Qur'an (tahfidz)\nLomba pidato bahasa Arab / Inggris\nFahmil Qur'an atau syarhil Qur'an",
        "Sepak bola, futsal\nPencak silat\nBadminton, voli, dll",
        "Desain poster / kaligrafi\nLomba nasyid atau hadroh\nDrama / teater",
        "Debate bahasa Inggris / Arab\nSpeech contest"
    ];

    const prestasiCategories = Array.from({ length: 5 }, (_, i) => ({
        title: s[`profile_prestasi_${i+1}_title`] || defaultPrestasiTitles[i],
        items: (s[`profile_prestasi_${i+1}_items`] || defaultPrestasiItems[i]).split('\n').filter(Boolean)
    }));

    const prestasiImages = Array.from({ length: 4 }, (_, i) =>
        s[`profile_prestasi_img_${i+1}`] || `/images/prestasi/prestasi-${i+1}.jpg`
    );

    const defaultAsatidz = [
        { name: "Ustazah Widya Rada Utami, SE", role: "Tata Usaha/Operator Madrasah" },
        { name: "Ustad H. Amir Hasan, Lc", role: "WKM Kesiswaan" },
        { name: "Ustad Irfan Kurniansyah, M.Pd.", role: "WKM Bid. Kurikulum" },
        { name: "Ustad Julianto, S.Pd. Gr.", role: "Kepala Madrasah" },
    ];

    const asatidz = Array.from({ length: 4 }, (_, i) => ({
        name: s[`profile_asatidz_${i+1}_name`] || defaultAsatidz[i].name,
        role: s[`profile_asatidz_${i+1}_role`] || defaultAsatidz[i].role,
        img: s[`profile_asatidz_${i+1}_img`] || `/images/asatidz/asatidz-${i+1}.jpg`,
    }));

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-primary-container text-white py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                <div className="max-w-[800px] mx-auto text-center relative z-10">
                    <h1 className="font-h1 text-h1 mb-6 text-balance">
                        {s.profile_header_title || "Profil Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan"}
                    </h1>
                    <p className="font-body-lg opacity-90 leading-relaxed">
                        {s.profile_header_tagline || "Membentuk Generasi Qur'ani, Berwawasan Global, dan Berakhlakul Karimah"}
                    </p>
                </div>
            </div>

            {/* Tentang Kami */}
            <section className="py-24 max-w-[1000px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="font-h2 text-h2 text-primary-container">{s.profile_tentang_title || "Tentang Kami"}</h2>
                        <div className="prose prose-slate prose-p:leading-relaxed prose-p:text-on-surface-variant">
                            <p>{s.profile_tentang_p1 || "MAS Pesantren Modern Darul Ihsan merupakan lembaga pendidikan tingkat menengah atas yang terintegrasi dengan sistem pondok pesantren. Terletak di Desa Selemak Kecamatan Hamparan Perak, Kabupaten Deli Serdang, Sumatera Utara, madrasah ini hadir sebagai jawaban atas kebutuhan masyarakat akan institusi pendidikan yang mampu menyeimbangkan antara keunggulan akademik dan kedalaman spiritual."}</p>
                            <p>{s.profile_tentang_p2 || "Dengan memadukan kurikulum Kementerian Agama RI dan kurikulum khas pesantren modern, kami berkomitmen mencetak santri yang tidak hanya cerdas secara intelektual, tetapi juga tangguh secara mental dan memiliki kemandirian hidup."}</p>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl skew-y-2">
                        <img
                            src={s.profile_tentang_image || "/images/modern-campus.png"}
                            alt="Darul Ihsan Modern Campus"
                            className="w-full h-full object-cover -skew-y-2 scale-110"
                        />
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-secondary-container rounded-2xl flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-3xl text-secondary">visibility</span>
                            </div>
                            <h3 className="font-h2 text-h2 text-primary-container mb-6">Visi</h3>
                            <p className="text-on-surface-variant text-lg leading-relaxed">
                                {s.profile_visi_text || "Mewujudkan lembaga pendidikan Islam yang unggul, modern, dan berkarakter, menghasilkan generasi berakhlak mulia, cerdas, serta berdaya saing global."}
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-3xl text-tertiary-fixed-dim">task_alt</span>
                            </div>
                            <h3 className="font-h2 text-h2 text-primary-container mb-6">Misi</h3>
                            <ul className="space-y-4 text-on-surface-variant">
                                {misiItems.map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="text-secondary font-bold">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prestasi & Keunggulan */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-h2 text-h2 text-primary-container mb-12 text-center">Prestasi & Keunggulan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {prestasiCategories.map((category, i) => (
                            <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                                <h3 className="font-bold text-xl text-primary-container mb-4">{category.title}</h3>
                                <ul className="space-y-2">
                                    {category.items.map((item, j) => (
                                        <li key={j} className="text-on-surface-variant text-sm flex gap-2">
                                            <span className="text-secondary">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {prestasiImages.map((src, i) => (
                            <div key={i} className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                                <img
                                    src={src}
                                    alt={`Prestasi ${i + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Struktur Organisasi */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="font-h2 text-h2 text-primary-container mb-12">Struktur Organisasi</h2>
                    <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-slate-50">
                        <img
                            src={s.profile_struktur_image || "/images/struktur-organisasi.jpg"}
                            alt="Struktur Organisasi MAS Pesantren Modern Darul Ihsan"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-container/20 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </section>

            {/* Dewan Asatidz */}
            <section className="py-24 max-w-[1200px] mx-auto px-6 text-center">
                <h2 className="font-h2 text-h2 text-primary-container mb-12">Dewan Asatidz</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {asatidz.map((member, i) => (
                        <div key={i} className="group">
                            <div className="aspect-square bg-surface-container-low rounded-full mb-6 overflow-hidden border-4 border-white shadow-md group-hover:border-secondary transition-all">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="font-bold text-primary-container">{member.name}</h4>
                            <p className="text-sm text-on-surface-variant">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
