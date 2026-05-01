"use client";

import { useActionState, useEffect, useState } from "react";
import { saveHomeSettings } from "@/app/actions/settings";

export default function SettingsPage() {
    const [state, formAction, pending] = useActionState(saveHomeSettings, null);
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                const settingsMap: Record<string, string> = {};
                data.forEach((s: any) => {
                    settingsMap[s.key] = s.value;
                });
                setSettings(settingsMap);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Memuat pengaturan...</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-primary-container font-h2">Pengaturan Website</h1>
                <p className="text-on-surface-variant text-sm mt-1">Kelola konten teks dan gambar yang tampil di website utama.</p>
            </div>

            {state?.success && (
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded-xl text-sm font-medium">
                    {state.success}
                </div>
            )}
            {state?.error && (
                <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
                    {state.error}
                </div>
            )}

            <form action={formAction} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-8">
                
                {/* Hero Section */}
                <div>
                    <h2 className="text-lg font-bold text-primary-container border-b pb-2 mb-4">Bagian Beranda (Hero)</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-on-surface-variant mb-2">Judul Website</label>
                            <input name="home_title" defaultValue={settings.home_title || "Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan"} className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-on-surface-variant mb-2">Tagline Singkat</label>
                            <input name="home_tagline" defaultValue={settings.home_tagline || "\"Membentuk Generasi Qur’ani, Berwawasan Global, dan Berakhlakul Karimah\""} className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Logo Kemenag (Opsional ganti)</label>
                                {settings.home_logo_kemenag && <img src={settings.home_logo_kemenag} alt="Kemenag" className="h-16 mb-2 object-contain" />}
                                <input type="file" name="home_logo_kemenag" accept="image/*" className="text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Logo Akreditasi (Opsional ganti)</label>
                                {settings.home_logo_akreditasi && <img src={settings.home_logo_akreditasi} alt="Akreditasi" className="h-16 mb-2 object-contain" />}
                                <input type="file" name="home_logo_akreditasi" accept="image/*" className="text-sm" />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Gambar Background Utama (Hero)</label>
                                {settings.home_hero_image && <img src={settings.home_hero_image} alt="Hero" className="h-32 mb-2 object-cover rounded-xl" />}
                                <input type="file" name="home_hero_image" accept="image/*" className="text-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Section */}
                <div>
                    <h2 className="text-lg font-bold text-primary-container border-b pb-2 mb-4">Bagian Visi & Misi</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-on-surface-variant mb-2">Deskripsi Visi & Misi</label>
                            <textarea name="home_about" rows={4} defaultValue={settings.home_about || "MAS Pesantren Modern Darul Ihsan merupakan lembaga pendidikan tingkat menengah atas yang terintegrasi dengan sistem pondok pesantren di Deli Serdang. Kami berkomitmen menyeimbangkan keunggulan akademik dan kedalaman spiritual untuk mencetak santri yang cerdas, tangguh, dan mandiri."} className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary resize-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4 p-4 border rounded-xl bg-slate-50">
                                <h3 className="font-bold text-sm">Status Akreditasi</h3>
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">Grade</label>
                                    <input name="home_accreditation_grade" defaultValue={settings.home_accreditation_grade || "Grade A"} className="w-full px-3 py-2 bg-white rounded-lg border text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">Institusi</label>
                                    <input name="home_accreditation_inst" defaultValue={settings.home_accreditation_inst || "Kemendikbud Ristek"} className="w-full px-3 py-2 bg-white rounded-lg border text-sm" />
                                </div>
                            </div>
                            <div className="space-y-4 p-4 border rounded-xl bg-slate-50">
                                <h3 className="font-bold text-sm">NPSN</h3>
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">Nomor NPSN</label>
                                    <input name="home_npsn_number" defaultValue={settings.home_npsn_number || "69981240"} className="w-full px-3 py-2 bg-white rounded-lg border text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">Status</label>
                                    <input name="home_npsn_status" defaultValue={settings.home_npsn_status || "Nasional Terdaftar"} className="w-full px-3 py-2 bg-white rounded-lg border text-sm" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Gambar Samping (Visi Misi)</label>
                                {settings.home_about_image && <img src={settings.home_about_image} alt="About" className="h-32 mb-2 object-cover rounded-xl" />}
                                <input type="file" name="home_about_image" accept="image/*" className="text-sm" />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">Kutipan (Quote) di Gambar</label>
                                    <textarea name="home_quote" rows={2} defaultValue={settings.home_quote || "\"Adab lebih tinggi dari ilmu. Kami menanamkan akar yang kuat agar dahan masa depan mereka tegak.\""} className="w-full px-3 py-2 bg-white rounded-lg border text-sm resize-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface-variant mb-1">Tokoh Kutipan</label>
                                    <input name="home_quote_author" defaultValue={settings.home_quote_author || "— KH. Ahmad Mukhtar"} className="w-full px-3 py-2 bg-white rounded-lg border text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <button type="submit" disabled={pending} className="px-6 py-3 bg-secondary text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50">
                        {pending ? "Menyimpan..." : "Simpan Pengaturan"}
                    </button>
                </div>
            </form>
        </div>
    );
}
