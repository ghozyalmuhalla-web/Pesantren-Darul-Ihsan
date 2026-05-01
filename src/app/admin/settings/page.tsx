"use client";
import { useActionState, useEffect, useState } from "react";
import { saveSettings } from "@/app/actions/settings";

const tabs = ["🏠 Home","📚 Academic","👤 Profile","🏫 Fasilitas","📌 Footer"];

function F({ label, name, cur }: { label: string; name: string; cur?: string }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">{label}</label>
            {cur && <img src={cur} alt={label} className="h-20 mb-2 object-cover rounded-xl border border-slate-200" />}
            <input type="file" name={name} accept="image/*" className="text-sm w-full file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-secondary file:text-white" />
        </div>
    );
}
function T({ label, name, val, ph }: { label: string; name: string; val: string; ph?: string }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">{label}</label>
            <input name={name} defaultValue={val} placeholder={ph} className="w-full px-3 py-2 bg-slate-50 rounded-lg text-sm border border-slate-200 focus:ring-2 focus:ring-secondary outline-none" />
        </div>
    );
}
function TA({ label, name, val, rows = 3 }: { label: string; name: string; val: string; rows?: number }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">{label}</label>
            <textarea name={name} rows={rows} defaultValue={val} className="w-full px-3 py-2 bg-slate-50 rounded-lg text-sm border border-slate-200 focus:ring-2 focus:ring-secondary outline-none resize-none" />
        </div>
    );
}
function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-primary-container border-b pb-2">{title}</h3>
            {children}
        </div>
    );
}

export default function SettingsPage() {
    const [state, formAction, pending] = useActionState(saveSettings, null);
    const [s, setS] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        fetch("/api/settings").then(r => r.json()).then(data => {
            const m: Record<string, string> = {};
            data.forEach((d: any) => { m[d.key] = d.value; });
            setS(m); setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8 text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined animate-spin">progress_activity</span>Memuat...</div>;

    const g = (key: string, def: string) => s[key] || def;

    return (
        <div className="space-y-4 max-w-4xl pb-32">
            <div>
                <h1 className="text-2xl font-bold text-primary-container">Pengaturan Website</h1>
                <p className="text-sm text-on-surface-variant mt-1">Kelola semua konten website dari satu tempat.</p>
            </div>

            {state?.success && <div className="bg-green-100 text-green-800 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"><span className="material-symbols-outlined text-base">check_circle</span>{state.success}</div>}
            {state?.error && <div className="bg-red-100 text-red-800 px-4 py-3 rounded-xl text-sm font-semibold">{state.error}</div>}

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map((t, i) => (
                    <button key={i} type="button" onClick={() => setTab(i)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${tab === i ? "bg-secondary text-white" : "bg-white border border-slate-200 text-on-surface-variant hover:bg-slate-50"}`}>
                        {t}
                    </button>
                ))}
            </div>

            <form action={formAction} className="space-y-4">
                {/* ── TAB HOME ── */}
                {tab === 0 && <>
                    <Card title="🖼️ Hero">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2"><T label="Judul Website" name="home_title" val={g("home_title","Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan")} /></div>
                            <div className="md:col-span-2"><T label="Tagline" name="home_tagline" val={g("home_tagline",`"Membentuk Generasi Qur'ani, Berwawasan Global, dan Berakhlakul Karimah"`)} /></div>
                            <T label="Teks Tombol Pendaftaran" name="home_btn_ppdb_text" val={g("home_btn_ppdb_text","Mulai Pendaftaran")} />
                            <T label="URL Tombol Pendaftaran" name="home_btn_ppdb_url" val={g("home_btn_ppdb_url","#")} ph="https://..." />
                            <div className="md:col-span-2"><T label="Teks Tombol Kurikulum" name="home_btn_curriculum_text" val={g("home_btn_curriculum_text","Lihat Kurikulum")} /></div>
                            <F label="Gambar Hero" name="home_hero_image" cur={s.home_hero_image} />
                            <F label="Logo Kemenag" name="home_logo_kemenag" cur={s.home_logo_kemenag} />
                            <F label="Logo Akreditasi" name="home_logo_akreditasi" cur={s.home_logo_akreditasi} />
                        </div>
                    </Card>
                    <Card title="📋 Visi & Misi">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2"><T label="Judul Bagian" name="home_visi_heading" val={g("home_visi_heading","Visi & Misi Kami")} /></div>
                            <div className="md:col-span-2"><TA label="Deskripsi" name="home_about" val={g("home_about","MAS Pesantren Modern Darul Ihsan merupakan lembaga pendidikan tingkat menengah atas yang terintegrasi dengan sistem pondok pesantren di Deli Serdang.")} rows={3} /></div>
                            <T label="Label Akreditasi" name="home_accreditation_label" val={g("home_accreditation_label","Status Akreditasi")} />
                            <T label="Grade Akreditasi" name="home_accreditation_grade" val={g("home_accreditation_grade","Grade A")} />
                            <T label="Institusi Akreditasi" name="home_accreditation_inst" val={g("home_accreditation_inst","Kemendikbud Ristek")} />
                            <T label="Label NPSN" name="home_npsn_label" val={g("home_npsn_label","NPSN")} />
                            <T label="Nomor NPSN" name="home_npsn_number" val={g("home_npsn_number","69981240")} />
                            <T label="Status NPSN" name="home_npsn_status" val={g("home_npsn_status","Nasional Terdaftar")} />
                            <F label="Gambar Visi Misi" name="home_about_image" cur={s.home_about_image} />
                            <div className="space-y-3">
                                <TA label="Kutipan (Quote)" name="home_quote" val={g("home_quote",`"Adab lebih tinggi dari ilmu."`)} rows={2} />
                                <T label="Tokoh Kutipan" name="home_quote_author" val={g("home_quote_author","— KH. Ahmad Mukhtar")} />
                            </div>
                        </div>
                    </Card>
                    <Card title="📰 Section Berita">
                        <div className="grid md:grid-cols-3 gap-4">
                            <T label="Label Kecil" name="home_news_eyebrow" val={g("home_news_eyebrow","Update Terbaru")} />
                            <T label="Judul" name="home_news_heading" val={g("home_news_heading","Berita & Informasi")} />
                            <T label="Teks Link" name="home_news_link_text" val={g("home_news_link_text","Lihat Semua Berita")} />
                        </div>
                        <p className="text-xs bg-blue-50 rounded-lg px-3 py-2 text-blue-700">💡 Konten berita dikelola di menu <strong>Berita</strong>.</p>
                    </Card>
                    <Card title="🏫 Section Fasilitas (Home)">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2"><T label="Judul" name="home_fasilitas_heading" val={g("home_fasilitas_heading","Fasilitas Pendukung")} /></div>
                            <div className="md:col-span-2"><TA label="Deskripsi" name="home_fasilitas_desc" val={g("home_fasilitas_desc","Untuk menunjang proses belajar mengajar dan kenyamanan santri, MAS Darul Ihsan dilengkapi dengan fasilitas modern.")} rows={2} /></div>
                            <div className="md:col-span-2"><TA label="Daftar Fasilitas (pisah koma)" name="home_fasilitas_list" val={g("home_fasilitas_list","Gedung Ruang Kelas,Asrama Putra & Putri,Laboratorium Komputer,Perpustakaan Lengkap,Sarana Olahraga,Masjid Pusat Ibadah,Unit Kesehatan 24 Jam,Laboratorium Sains")} rows={2} /></div>
                            <div className="md:col-span-2"><F label="Gambar Fasilitas" name="home_fasilitas_image" cur={s.home_fasilitas_image} /></div>
                        </div>
                    </Card>
                    <Card title="🤝 Section MOU">
                        <T label="Judul" name="home_mou_heading" val={g("home_mou_heading","Kerja Sama (MOU) Dengan Lembaga")} />
                        <div className="grid md:grid-cols-3 gap-4">
                            <F label="Gambar MOU 1" name="home_mou_image_1" cur={s.home_mou_image_1} />
                            <F label="Gambar MOU 2" name="home_mou_image_2" cur={s.home_mou_image_2} />
                            <F label="Gambar MOU 3" name="home_mou_image_3" cur={s.home_mou_image_3} />
                        </div>
                    </Card>
                    <Card title="🖼️ Section Galeri (Home)">
                        <div className="grid md:grid-cols-3 gap-4">
                            <T label="Label Kecil" name="home_gallery_eyebrow" val={g("home_gallery_eyebrow","Life at Darul Ihsan")} />
                            <T label="Judul" name="home_gallery_heading" val={g("home_gallery_heading","Galeri Aktivitas Santri")} />
                            <T label="Teks Link" name="home_gallery_link_text" val={g("home_gallery_link_text","Lihat Selengkapnya")} />
                        </div>
                        <p className="text-xs bg-blue-50 rounded-lg px-3 py-2 text-blue-700">💡 Foto galeri dikelola di menu <strong>Galeri</strong>.</p>
                    </Card>
                </>}

                {/* ── TAB ACADEMIC ── */}
                {tab === 1 && <>
                    <Card title="🖼️ Header">
                        <T label="Judul Halaman" name="academic_header_title" val={g("academic_header_title","Program Unggulan")} />
                        <TA label="Deskripsi Header" name="academic_header_desc" val={g("academic_header_desc","Kami menawarkan lingkungan belajar yang kondusif dengan fokus pada pembentukan generasi yang unggul.")} rows={2} />
                    </Card>
                    <Card title="✨ 4 Focus Areas">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="grid md:grid-cols-2 gap-3 pb-3 border-b border-slate-100 last:border-0">
                                <T label={`Judul #${i}`} name={`academic_focus_${i}_title`} val={g(`academic_focus_${i}_title`,["Tahfidz Al-Qur'an","Penguasaan Kitab Kuning","Language Environment","Ekstrakurikuler Multimedia & Seni"][i-1])} />
                                <T label={`Deskripsi #${i}`} name={`academic_focus_${i}_desc`} val={g(`academic_focus_${i}_desc`,"")} />
                            </div>
                        ))}
                    </Card>
                    <Card title="📌 7 Program Utama">
                        {[1,2,3,4,5,6,7].map(i => {
                            const defs = ["Pendidikan Terpadu (Agama + Umum)","Program Tahfidz Al-Qur'an","Pembinaan Akhlak & Kedisiplinan","Pengembangan Bahasa (Arab & Inggris)","Pengembangan Bakat & Keterampilan","Program Kemandirian & Leadership","Sistem Boarding (Asrama)"];
                            return (
                                <div key={i} className="pb-4 border-b border-slate-100 last:border-0 space-y-2">
                                    <T label={`Judul Program ${i}`} name={`academic_prog_${i}_title`} val={g(`academic_prog_${i}_title`, defs[i-1])} />
                                    <TA label="Poin-poin (1 baris = 1 poin)" name={`academic_prog_${i}_items`} val={g(`academic_prog_${i}_items`,"")} rows={2} />
                                </div>
                            );
                        })}
                    </Card>
                    <Card title="📢 Call to Action">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2"><T label="Judul CTA" name="academic_cta_title" val={g("academic_cta_title","Siap Menjadi Bagian dari Kami?")} /></div>
                            <div className="md:col-span-2"><T label="Deskripsi CTA" name="academic_cta_desc" val={g("academic_cta_desc","Pendaftaran Santri Baru (PPDB) Tahun Ajaran 2026/2027 telah dibuka.")} /></div>
                            <T label="Teks Tombol" name="academic_cta_btn_text" val={g("academic_cta_btn_text","Daftar Sekarang")} />
                            <T label="URL Tombol" name="academic_cta_btn_url" val={g("academic_cta_btn_url","#")} ph="https://..." />
                        </div>
                    </Card>
                </>}

                {/* ── TAB PROFILE ── */}
                {tab === 2 && <>
                    <Card title="🖼️ Header">
                        <T label="Judul" name="profile_header_title" val={g("profile_header_title","Profil Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan")} />
                        <T label="Tagline" name="profile_header_tagline" val={g("profile_header_tagline","Membentuk Generasi Qur'ani, Berwawasan Global, dan Berakhlakul Karimah")} />
                    </Card>
                    <Card title="📖 Tentang Kami">
                        <T label="Judul" name="profile_tentang_title" val={g("profile_tentang_title","Tentang Kami")} />
                        <TA label="Paragraf 1" name="profile_tentang_p1" val={g("profile_tentang_p1","MAS Pesantren Modern Darul Ihsan merupakan lembaga pendidikan tingkat menengah atas yang terintegrasi dengan sistem pondok pesantren.")} rows={3} />
                        <TA label="Paragraf 2" name="profile_tentang_p2" val={g("profile_tentang_p2","Dengan memadukan kurikulum Kementerian Agama RI dan kurikulum khas pesantren modern, kami berkomitmen mencetak santri yang tidak hanya cerdas secara intelektual.")} rows={3} />
                        <F label="Gambar Samping" name="profile_tentang_image" cur={s.profile_tentang_image} />
                    </Card>
                    <Card title="🎯 Visi & Misi">
                        <TA label="Teks Visi" name="profile_visi_text" val={g("profile_visi_text","Mewujudkan lembaga pendidikan Islam yang unggul, modern, dan berkarakter, menghasilkan generasi berakhlak mulia, cerdas, serta berdaya saing global.")} rows={3} />
                        <TA label="Poin-poin Misi (1 baris = 1 poin)" name="profile_misi_items" val={g("profile_misi_items","Menumbuhkan iman dan membangun adab santri.\nMengembangkan potensi santri melalui kurikulum modern.\nPendalaman Al-Qur'an dan Hadist.\nMewujudkan generasi Imtak dan Iptek.")} rows={4} />
                    </Card>
                    <Card title="🏆 Prestasi & Keunggulan">
                        {[1,2,3,4,5].map(i => {
                            const defs = ["🏆 Bidang Akademik","🕌 Bidang Keagamaan","⚽ Bidang Olahraga","🎨 Bidang Seni & Kreativitas","🌍 Bahasa & Internasional"];
                            return (
                                <div key={i} className="pb-4 border-b border-slate-100 last:border-0 space-y-2">
                                    <T label={`Kategori ${i} - Judul`} name={`profile_prestasi_${i}_title`} val={g(`profile_prestasi_${i}_title`, defs[i-1])} />
                                    <TA label="Poin-poin (1 baris = 1 poin)" name={`profile_prestasi_${i}_items`} val={g(`profile_prestasi_${i}_items`,"")} rows={2} />
                                </div>
                            );
                        })}
                        <div className="grid md:grid-cols-2 gap-4 pt-2">
                            {[1,2,3,4].map(i => <F key={i} label={`Foto Prestasi ${i}`} name={`profile_prestasi_img_${i}`} cur={s[`profile_prestasi_img_${i}`]} />)}
                        </div>
                    </Card>
                    <Card title="🏛️ Struktur Organisasi">
                        <F label="Gambar Struktur" name="profile_struktur_image" cur={s.profile_struktur_image} />
                    </Card>
                    <Card title="👨‍🏫 Dewan Asatidz">
                        {[1,2,3,4].map(i => {
                            const defs = [["Ustazah Widya Rada Utami, SE","Tata Usaha/Operator Madrasah"],["Ustad H. Amir Hasan, Lc","WKM Kesiswaan"],["Ustad Irfan Kurniansyah, M.Pd.","WKM Bid. Kurikulum"],["Ustad Julianto, S.Pd. Gr.","Kepala Madrasah"]];
                            return (
                                <div key={i} className="grid md:grid-cols-3 gap-3 pb-3 border-b border-slate-100 last:border-0 items-end">
                                    <T label={`Nama #${i}`} name={`profile_asatidz_${i}_name`} val={g(`profile_asatidz_${i}_name`, defs[i-1][0])} />
                                    <T label={`Jabatan #${i}`} name={`profile_asatidz_${i}_role`} val={g(`profile_asatidz_${i}_role`, defs[i-1][1])} />
                                    <F label={`Foto #${i}`} name={`profile_asatidz_${i}_img`} cur={s[`profile_asatidz_${i}_img`]} />
                                </div>
                            );
                        })}
                    </Card>
                </>}

                {/* ── TAB FASILITAS ── */}
                {tab === 3 && <>
                    <Card title="🖼️ Header">
                        <T label="Judul" name="fasilitas_header_title" val={g("fasilitas_header_title","Fasilitas & Program Unggulan")} />
                        <TA label="Deskripsi" name="fasilitas_header_desc" val={g("fasilitas_header_desc","Informasi lengkap mengenai fasilitas penunjang madrasah dan program-program utama yang kami tawarkan.")} rows={2} />
                    </Card>
                    <Card title="🏫 Daftar Fasilitas">
                        <T label="Judul Section" name="fasilitas_section_title" val={g("fasilitas_section_title","Fasilitas Pendukung")} />
                        <TA label="Deskripsi" name="fasilitas_section_desc" val={g("fasilitas_section_desc","Untuk menunjang proses belajar mengajar dan kenyamanan santri, MAS Darul Ihsan dilengkapi dengan:")} rows={2} />
                        <TA label="Daftar Fasilitas (pisah koma)" name="fasilitas_list" val={g("fasilitas_list","Gedung Ruang Kelas yang representatif.,Asrama Putra & Putri yang nyaman dan terjaga.,Laboratorium Komputer untuk literasi digital.,Perpustakaan dengan koleksi buku agama dan umum.,Sarana Olahraga dan Aula Serbaguna.,Masjid sebagai pusat aktivitas ibadah dan dakwah.,Unit Kesehatan Sebagai tempat Kesehatan santri 24 Jam.,Laboratorium Sains untuk Melaksanakan Praktik Kimia, Biologi dan Fisika.")} rows={3} />
                        <div className="grid md:grid-cols-2 gap-4">
                            {[1,2,3,4].map(i => <F key={i} label={`Foto Poster ${i}`} name={`fasilitas_poster_${i}`} cur={s[`fasilitas_poster_${i}`]} />)}
                        </div>
                    </Card>
                    <Card title="📌 7 Program Utama">
                        <T label="Judul Section" name="fasilitas_programs_title" val={g("fasilitas_programs_title","7 Program Utama Kami")} />
                        {[1,2,3,4,5,6,7].map(i => {
                            const defs = ["Pendidikan Terpadu (Agama + Umum)","Program Tahfidz Al-Qur'an","Pembinaan Akhlak & Kedisiplinan","Pengembangan Bahasa (Arab & Inggris)","Pengembangan Bakat & Keterampilan","Program Kemandirian & Leadership","Sistem Boarding (Asrama)"];
                            return (
                                <div key={i} className="pb-4 border-b border-slate-100 last:border-0 space-y-2">
                                    <T label={`Judul Program ${i}`} name={`fasilitas_prog_${i}_title`} val={g(`fasilitas_prog_${i}_title`, defs[i-1])} />
                                    <TA label="Poin-poin (1 baris = 1 poin)" name={`fasilitas_prog_${i}_items`} val={g(`fasilitas_prog_${i}_items`,"")} rows={2} />
                                </div>
                            );
                        })}
                    </Card>
                </>}

                {/* ── TAB FOOTER ── */}
                {tab === 4 && <>
                    <Card title="📌 Informasi Footer">
                        <T label="Nama Madrasah" name="footer_school_name" val={g("footer_school_name","MAS Pesantren Modern Darul Ihsan")} />
                        <TA label="Alamat (gunakan <br/> untuk baris baru)" name="footer_address" val={g("footer_address","Desa Selemak, Kec. Hamparan Perak,<br/>Kab. Deli Serdang, Sumatera Utara")} rows={2} />
                        <T label="Email" name="footer_email" val={g("footer_email","maspmdi@gmail.com")} />
                    </Card>
                    <Card title="📱 Media Sosial">
                        <div className="grid md:grid-cols-2 gap-4">
                            <T label="URL Instagram" name="footer_instagram_url" val={g("footer_instagram_url","https://www.instagram.com/maspmdi")} />
                            <T label="Label Instagram" name="footer_instagram_label" val={g("footer_instagram_label","IG: @maspmdi")} />
                            <T label="URL TikTok" name="footer_tiktok_url" val={g("footer_tiktok_url","https://www.tiktok.com/@mas_pmdi")} />
                            <T label="Label TikTok" name="footer_tiktok_label" val={g("footer_tiktok_label","Tiktok: mas_pmdi")} />
                        </div>
                    </Card>
                    <Card title="©️ Copyright">
                        <T label="Teks Copyright" name="footer_copyright" val={g("footer_copyright","© 2024 MAS Pesantren Modern Darul Ihsan. All rights reserved.")} />
                    </Card>
                </>}

                {/* Sticky Save Button */}
                <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-slate-200 py-4 flex items-center gap-4">
                    <button type="submit" disabled={pending}
                        className="px-8 py-3 bg-secondary text-white rounded-xl text-sm font-bold hover:bg-blue-900 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg">
                        <span className="material-symbols-outlined text-base">{pending ? "progress_activity" : "save"}</span>
                        {pending ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                    <p className="text-xs text-on-surface-variant">Perubahan langsung tampil di website setelah disimpan.</p>
                </div>
            </form>
        </div>
    );
}
