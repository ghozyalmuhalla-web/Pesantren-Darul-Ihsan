"use client";

import { useActionState, useEffect, useState } from "react";
import { saveHomeSettings } from "@/app/actions/settings";

function FileField({ label, name, current }: { label: string; name: string; current?: string }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2">{label}</label>
            {current && (
                <img src={current} alt={label} className="h-24 mb-2 object-cover rounded-xl border border-slate-200" />
            )}
            <input type="file" name={name} accept="image/*" className="text-sm w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-secondary file:text-white hover:file:bg-blue-900" />
        </div>
    );
}

function TextField({ label, name, defaultVal, placeholder }: { label: string; name: string; defaultVal: string; placeholder?: string }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2">{label}</label>
            <input name={name} defaultValue={defaultVal} placeholder={placeholder} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary border border-slate-200" />
        </div>
    );
}

function TextareaField({ label, name, defaultVal, rows = 3, placeholder }: { label: string; name: string; defaultVal: string; rows?: number; placeholder?: string }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2">{label}</label>
            <textarea name={name} rows={rows} defaultValue={defaultVal} placeholder={placeholder} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary resize-none border border-slate-200" />
        </div>
    );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
            <h2 className="text-base font-bold text-primary-container border-b border-slate-100 pb-3 mb-4">{title}</h2>
            {children}
        </div>
    );
}

export default function SettingsPage() {
    const [state, formAction, pending] = useActionState(saveHomeSettings, null);
    const [s, setS] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                const map: Record<string, string> = {};
                data.forEach((item: any) => { map[item.key] = item.value; });
                setS(map);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center gap-3 text-on-surface-variant p-8">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
            Memuat pengaturan...
        </div>
    );

    return (
        <div className="space-y-6 max-w-4xl pb-24">
            <div>
                <h1 className="text-2xl font-bold text-primary-container font-h2">Pengaturan Website</h1>
                <p className="text-on-surface-variant text-sm mt-1">Kelola semua teks dan gambar yang tampil di halaman beranda (Home).</p>
            </div>

            {state?.success && (
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    {state.success}
                </div>
            )}
            {state?.error && (
                <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-semibold">
                    {state.error}
                </div>
            )}

            <form action={formAction} className="space-y-6">

                {/* ── HERO ── */}
                <SectionCard title="🖼️ Bagian Hero (Beranda Atas)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <TextField label="Judul Website" name="home_title"
                                defaultVal={s.home_title || "Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan"} />
                        </div>
                        <div className="md:col-span-2">
                            <TextField label="Tagline / Moto" name="home_tagline"
                                defaultVal={s.home_tagline || "\"Membentuk Generasi Qur'ani, Berwawasan Global, dan Berakhlakul Karimah\""} />
                        </div>
                        <TextField label="Teks Tombol Pendaftaran" name="home_btn_ppdb_text"
                            defaultVal={s.home_btn_ppdb_text || "Mulai Pendaftaran"} />
                        <TextField label="Link Tombol Pendaftaran (URL)" name="home_btn_ppdb_url"
                            defaultVal={s.home_btn_ppdb_url || "#"} placeholder="https://..." />
                        <div className="md:col-span-2">
                            <TextField label="Teks Tombol Kurikulum" name="home_btn_curriculum_text"
                                defaultVal={s.home_btn_curriculum_text || "Lihat Kurikulum"} />
                        </div>
                        <FileField label="Gambar Background Hero" name="home_hero_image" current={s.home_hero_image} />
                        <FileField label="Logo Kemenag" name="home_logo_kemenag" current={s.home_logo_kemenag} />
                        <FileField label="Logo Akreditasi" name="home_logo_akreditasi" current={s.home_logo_akreditasi} />
                    </div>
                </SectionCard>

                {/* ── VISI MISI ── */}
                <SectionCard title="📋 Bagian Visi & Misi">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <TextField label="Judul Bagian" name="home_visi_heading" defaultVal={s.home_visi_heading || "Visi & Misi Kami"} />
                        </div>
                        <div className="md:col-span-2">
                            <TextareaField label="Paragraf Deskripsi" name="home_about" rows={4}
                                defaultVal={s.home_about || "MAS Pesantren Modern Darul Ihsan merupakan lembaga pendidikan tingkat menengah atas yang terintegrasi dengan sistem pondok pesantren di Deli Serdang. Kami berkomitmen menyeimbangkan keunggulan akademik dan kedalaman spiritual untuk mencetak santri yang cerdas, tangguh, dan mandiri."} />
                        </div>
                        <div className="space-y-3 p-4 border rounded-xl bg-slate-50">
                            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Kotak Akreditasi</p>
                            <TextField label="Label" name="home_accreditation_label" defaultVal={s.home_accreditation_label || "Status Akreditasi"} />
                            <TextField label="Grade" name="home_accreditation_grade" defaultVal={s.home_accreditation_grade || "Grade A"} />
                            <TextField label="Institusi" name="home_accreditation_inst" defaultVal={s.home_accreditation_inst || "Kemendikbud Ristek"} />
                        </div>
                        <div className="space-y-3 p-4 border rounded-xl bg-slate-50">
                            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Kotak NPSN</p>
                            <TextField label="Label" name="home_npsn_label" defaultVal={s.home_npsn_label || "NPSN"} />
                            <TextField label="Nomor NPSN" name="home_npsn_number" defaultVal={s.home_npsn_number || "69981240"} />
                            <TextField label="Status" name="home_npsn_status" defaultVal={s.home_npsn_status || "Nasional Terdaftar"} />
                        </div>
                        <FileField label="Gambar Samping (Square)" name="home_about_image" current={s.home_about_image} />
                        <div className="space-y-3">
                            <TextareaField label="Teks Kutipan (Quote)" name="home_quote" rows={2}
                                defaultVal={s.home_quote || "\"Adab lebih tinggi dari ilmu. Kami menanamkan akar yang kuat agar dahan masa depan mereka tegak.\""} />
                            <TextField label="Nama Tokoh" name="home_quote_author" defaultVal={s.home_quote_author || "— KH. Ahmad Mukhtar"} />
                        </div>
                    </div>
                </SectionCard>

                {/* ── BERITA ── */}
                <SectionCard title="📰 Bagian Berita & Informasi">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextField label="Label Kecil (Eyebrow)" name="home_news_eyebrow" defaultVal={s.home_news_eyebrow || "Update Terbaru"} />
                        <TextField label="Judul Bagian" name="home_news_heading" defaultVal={s.home_news_heading || "Berita & Informasi"} />
                        <TextField label="Teks Link Selengkapnya" name="home_news_link_text" defaultVal={s.home_news_link_text || "Lihat Semua Berita"} />
                    </div>
                    <p className="text-xs text-on-surface-variant bg-blue-50 rounded-lg px-3 py-2">💡 Konten berita dikelola di menu <strong>Berita</strong> pada sidebar.</p>
                </SectionCard>

                {/* ── FASILITAS ── */}
                <SectionCard title="🏫 Bagian Fasilitas Pendukung">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <TextField label="Judul Bagian" name="home_fasilitas_heading" defaultVal={s.home_fasilitas_heading || "Fasilitas Pendukung"} />
                        </div>
                        <div className="md:col-span-2">
                            <TextareaField label="Paragraf Deskripsi" name="home_fasilitas_desc" rows={2}
                                defaultVal={s.home_fasilitas_desc || "Untuk menunjang proses belajar mengajar dan kenyamanan santri, MAS Darul Ihsan dilengkapi dengan fasilitas modern yang representatif."} />
                        </div>
                        <div className="md:col-span-2">
                            <TextareaField label="Daftar Fasilitas (pisahkan dengan koma)" name="home_fasilitas_list" rows={3}
                                defaultVal={s.home_fasilitas_list || "Gedung Ruang Kelas,Asrama Putra & Putri,Laboratorium Komputer,Perpustakaan Lengkap,Sarana Olahraga,Masjid Pusat Ibadah,Unit Kesehatan 24 Jam,Laboratorium Sains"}
                                placeholder="Fasilitas 1, Fasilitas 2, ..." />
                            <p className="text-xs text-on-surface-variant mt-1">Pisahkan setiap nama fasilitas dengan koma (,)</p>
                        </div>
                        <div className="md:col-span-2">
                            <FileField label="Gambar Fasilitas (kanan)" name="home_fasilitas_image" current={s.home_fasilitas_image} />
                        </div>
                    </div>
                </SectionCard>

                {/* ── MOU ── */}
                <SectionCard title="🤝 Bagian Kerja Sama (MOU)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <TextField label="Judul Bagian" name="home_mou_heading" defaultVal={s.home_mou_heading || "Kerja Sama (MOU) Dengan Lembaga"} />
                        </div>
                        <FileField label="Gambar MOU 1" name="home_mou_image_1" current={s.home_mou_image_1} />
                        <FileField label="Gambar MOU 2" name="home_mou_image_2" current={s.home_mou_image_2} />
                        <FileField label="Gambar MOU 3" name="home_mou_image_3" current={s.home_mou_image_3} />
                    </div>
                </SectionCard>

                {/* ── GALERI ── */}
                <SectionCard title="🖼️ Bagian Galeri Aktivitas">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextField label="Label Kecil (Eyebrow)" name="home_gallery_eyebrow" defaultVal={s.home_gallery_eyebrow || "Life at Darul Ihsan"} />
                        <TextField label="Judul Bagian" name="home_gallery_heading" defaultVal={s.home_gallery_heading || "Galeri Aktivitas Santri"} />
                        <TextField label="Teks Link Selengkapnya" name="home_gallery_link_text" defaultVal={s.home_gallery_link_text || "Lihat Selengkapnya"} />
                    </div>
                    <p className="text-xs text-on-surface-variant bg-blue-50 rounded-lg px-3 py-2">💡 Foto galeri dikelola di menu <strong>Galeri</strong> pada sidebar.</p>
                </SectionCard>

                {/* ── SAVE ── */}
                <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 -mx-0 px-0 py-4 flex items-center gap-4">
                    <button type="submit" disabled={pending}
                        className="px-8 py-3 bg-secondary text-white rounded-xl text-sm font-bold hover:bg-blue-900 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg">
                        <span className="material-symbols-outlined text-base">{pending ? "progress_activity" : "save"}</span>
                        {pending ? "Menyimpan..." : "Simpan Semua Pengaturan"}
                    </button>
                    <p className="text-xs text-on-surface-variant">Perubahan langsung tampil di website setelah disimpan.</p>
                </div>
            </form>
        </div>
    );
}
