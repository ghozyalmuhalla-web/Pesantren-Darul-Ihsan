import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function ProfilePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-primary-container text-white py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                <div className="max-w-[800px] mx-auto text-center relative z-10">
                    <h1 className="font-h1 text-h1 mb-6 text-balance">Profil Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan</h1>
                    <p className="font-body-lg opacity-90 leading-relaxed">
                        Membentuk Generasi Qur’ani, Berwawasan Global, dan Berakhlakul Karimah
                    </p>
                </div>
            </div>

            {/* History Section */}
            <section className="py-24 max-w-[1000px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="font-h2 text-h2 text-primary-container">Tentang Kami</h2>
                        <div className="prose prose-slate prose-p:leading-relaxed prose-p:text-on-surface-variant">
                            <p>
                                MAS Pesantren Modern Darul Ihsan merupakan lembaga pendidikan tingkat menengah atas yang terintegrasi dengan sistem pondok pesantren. Terletak di Desa Selemak Kecamatan Hamparan Perak, Kabupaten Deli Serdang, Sumatera Utara, madrasah ini hadir sebagai jawaban atas kebutuhan masyarakat akan institusi pendidikan yang mampu menyeimbangkan antara keunggulan akademik dan kedalaman spiritual.
                            </p>
                            <p>
                                Dengan memadukan kurikulum Kementerian Agama RI dan kurikulum khas pesantren modern, kami berkomitmen mencetak santri yang tidak hanya cerdas secara intelektual, tetapi juga tangguh secara mental dan memiliki kemandirian hidup.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl skew-y-2">
                        <img
                            src="/images/modern-campus.png"
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
                                Mewujudkan lembaga pendidikan Islam yang unggul, modern, dan berkarakter, menghasilkan generasi berakhlak mulia, cerdas, serta berdaya saing global.
                            </p>
                        </div>

                        <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-3xl text-tertiary-fixed-dim">task_alt</span>
                            </div>
                            <h3 className="font-h2 text-h2 text-primary-container mb-6">Misi</h3>
                            <ul className="space-y-4 text-on-surface-variant">
                                {[
                                    "Menumbuhkan iman dan membangun adab santri.",
                                    "Mengembangkan potensi santri melalui kurikulum modern tanpa meninggalkan nilai-nilai keislaman.",
                                    "Pendalaman Al-Qur'an dan Hadist.",
                                    "Mewujudkan generasi yang berwawasan Imtak (Iman dan Taqwa) dan Iptek (Ilmu Pengetahuan dan Teknologi)."
                                ].map((item, i) => (
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
                        {[
                            {
                                title: "🏆 Bidang Akademik",
                                items: ["Juara olimpiade (Matematika, IPA, Bahasa)", "Lomba karya tulis ilmiah", "Prestasi ujian nasional / asesmen"]
                            },
                            {
                                title: "🕌 Bidang Keagamaan",
                                items: ["Juara Musabaqah Tilawatil Qur’an (MTQ)", "Hafalan Al-Qur’an (tahfidz)", "Lomba pidato bahasa Arab / Inggris", "Fahmil Qur’an atau syarhil Qur’an"]
                            },
                            {
                                title: "⚽ Bidang Olahraga",
                                items: ["Sepak bola, futsal", "Pencak silat", "Badminton, voli, dll"]
                            },
                            {
                                title: "🎨 Bidang Seni & Kreativitas",
                                items: ["Desain poster / kaligrafi", "Lomba nasyid atau hadroh", "Drama / teater"]
                            },
                            {
                                title: "🌍 Bahasa & Internasional",
                                items: ["Debate bahasa Inggris / Arab", "Speech contest"]
                            }
                        ].map((category, i) => (
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
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                                <img
                                    src={`/images/prestasi/prestasi-${i}.jpg`}
                                    alt={`Prestasi ${i}`}
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
                            src="/images/struktur-organisasi.jpg"
                            alt="Struktur Organisasi MAS Pesantren Modern Darul Ihsan"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-container/20 to-transparent pointer-events-none"></div>
                </div>
            </section>

            {/* Faculty / Asatidz */}
            <section className="py-24 max-w-[1200px] mx-auto px-6 text-center">
                <h2 className="font-h2 text-h2 text-primary-container mb-12">Dewan Asatidz</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { name: "Ustazah Widya Rada Utami, SE", role: "Tata Usaha/Operator Madrasah", img: "/images/asatidz/asatidz-1.jpg" },
                        { name: "Ustad H. Amir Hasan, Lc", role: "WKM Kesiswaan", img: "/images/asatidz/asatidz-2.jpg" },
                        { name: "Ustad Irfan Kurniansyah, M.Pd.", role: "WKM Bid. Kurikulum", img: "/images/asatidz/asatidz-3.jpg" },
                        { name: "Ustad Julianto, S.Pd. Gr.", role: "Kepala Madrasah", img: "/images/asatidz/asatidz-4.jpg" }
                    ].map((member, i) => (
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
