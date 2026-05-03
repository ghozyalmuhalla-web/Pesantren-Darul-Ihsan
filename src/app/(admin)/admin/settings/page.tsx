"use client";
import { useActionState, useEffect, useState } from "react";
import { saveSettings } from "@/app/actions/settings";

const tabs = ["🏠 Home","📚 Academic","👤 Profile","🏫 Fasilitas","📝 PPDB","📌 Footer"];

function F({ label, name, cur }: { label: string; name: string; cur?: string }) {
    const [previews, setPreviews] = useState<string[]>([]);
    const [existing, setExisting] = useState<string[]>([]);

    useEffect(() => {
        let initial: string[] = [];
        try {
            if (cur?.startsWith("[")) initial = JSON.parse(cur);
            else if (cur) initial = [cur];
        } catch (e) {
            if (cur) initial = [cur];
        }
        setPreviews(initial);
        setExisting(initial);
    }, [cur]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const urls = files.map(f => URL.createObjectURL(f));
            setPreviews(prev => [...existing, ...urls]);
        } else {
            setPreviews(existing);
        }
    };

    const removeExisting = (url: string) => {
        const updated = existing.filter(u => u !== url);
        setExisting(updated);
        setPreviews(updated);
    };

    return (
        <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">{label}</label>
            <div className="flex flex-wrap gap-2 mb-2">
                {previews.map((url, i) => (
                    <div key={i} className="relative group">
                        <img src={url} alt={`${label} ${i}`} className="h-20 w-20 object-cover rounded-xl border border-slate-200" />
                        {existing.includes(url) && (
                            <button type="button" onClick={() => removeExisting(url)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                                <span className="material-symbols-outlined text-[10px] leading-none">close</span>
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <input type="file" name={name} multiple accept="image/*" onChange={handleChange} className="text-sm w-full file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-secondary file:text-white" />
            <input type="hidden" name={`${name}_existing`} value={JSON.stringify(existing)} />
        </div>
    );
}
function R({ label, name, val, min = 0, max = 100, step = 1 }: { label: string; name: string; val: string; min?: number; max?: number; step?: number }) {
    const [v, setV] = useState(val || "100");
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-on-surface-variant">{label}</label>
                <span className="text-xs font-bold text-secondary">{v}%</span>
            </div>
            <input type="range" name={name} min={min} max={max} step={step} value={v} onChange={(e) => setV(e.target.value)} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary" />
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

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-secondary rounded-full animate-spin"></div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">Initializing Command Center...</p>
        </div>
    );

    const g = (key: string, def: string) => s[key] || def;

    return (
        <div className="space-y-12 max-w-5xl pb-40 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black text-primary-container font-h2 tracking-tight">System Configuration</h1>
                    <p className="text-on-surface-variant text-base mt-2 font-medium opacity-70 italic">&quot;Customize the core identity and content of Darul Ihsan.&quot;</p>
                </div>
            </div>

            {state?.success && (
                <div className="bg-emerald-50 text-emerald-700 px-8 py-5 rounded-[24px] text-sm font-black flex items-center gap-4 border border-emerald-100 animate-slide-up shadow-lg shadow-emerald-900/5">
                    <span className="material-symbols-outlined font-bold text-xl">check_circle</span>
                    {state.success}
                </div>
            )}
            
            {state?.error && (
                <div className="bg-rose-50 text-rose-700 px-8 py-5 rounded-[24px] text-sm font-black flex items-center gap-4 border border-rose-100 animate-slide-up shadow-lg shadow-rose-900/5">
                    <span className="material-symbols-outlined font-bold text-xl">error</span>
                    {state.error}
                </div>
            )}

            {/* Premium Tabs */}
            <div className="flex gap-3 flex-wrap p-2 bg-slate-100/50 rounded-[32px] border border-slate-200/50 backdrop-blur-sm">
                {tabs.map((t, i) => (
                    <button key={i} type="button" onClick={() => setTab(i)}
                        className={`px-8 py-4 rounded-[24px] text-xs font-black transition-all duration-500 uppercase tracking-widest ${
                            tab === i 
                            ? "bg-secondary text-white shadow-xl shadow-secondary/20 scale-105" 
                            : "text-slate-400 hover:text-primary-container hover:bg-white"
                        }`}>
                        {t}
                    </button>
                ))}
            </div>

            <form action={formAction} className="space-y-10">
                {/* ── TAB HOME ── */}
                {tab === 0 && (
                    <div className="space-y-8 animate-fade-in">
                        <Card title="🖼️ Hero Experience">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="md:col-span-2"><T label="Main Headline" name="home_title" val={g("home_title","Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan")} /></div>
                                <div className="md:col-span-2"><T label="Inspirational Tagline" name="home_tagline" val={g("home_tagline",`"Membentuk Generasi Qur'ani, Berwawasan Global, dan Berakhlakul Karimah"`)} /></div>
                                <T label="Primary CTA Text" name="home_btn_ppdb_text" val={g("home_btn_ppdb_text","Mulai Pendaftaran")} />
                                <T label="Secondary CTA Text" name="home_btn_curriculum_text" val={g("home_btn_curriculum_text","Lihat Kurikulum")} />
                                <div className="md:col-span-2"><F label="Hero Background Asset" name="home_hero_image" cur={s.home_hero_image || "/images/hero-main.png"} /></div>
                                <div className="space-y-6">
                                    <R label="Visual Brightness" name="home_hero_brightness" val={g("home_hero_brightness","100")} />
                                    <R label="Overlay Intensity" name="home_hero_overlay_opacity" val={g("home_hero_overlay_opacity","90")} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <F label="Kemenag Logo" name="home_logo_kemenag" cur={s.home_logo_kemenag || "/images/logo-kemenag.jpg"} />
                                    <F label="Accreditation Logo" name="home_logo_akreditasi" cur={s.home_logo_akreditasi || "/images/logo-akreditasi.jpg"} />
                                </div>
                            </div>
                        </Card>
                        <Card title="📋 Core Vision & Mission">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="md:col-span-2"><T label="Section Heading" name="home_visi_heading" val={g("home_visi_heading","Visi & Misi Kami")} /></div>
                                <div className="md:col-span-2"><TA label="Institutional Narrative" name="home_about" val={g("home_about","MAS Pesantren Modern Darul Ihsan merupakan lembaga pendidikan tingkat menengah atas yang terintegrasi dengan sistem pondok pesantren di Deli Serdang.")} rows={4} /></div>
                                <div className="grid grid-cols-3 gap-4 md:col-span-2">
                                    <T label="Grade" name="home_accreditation_grade" val={g("home_accreditation_grade","Grade A")} />
                                    <T label="NPSN Number" name="home_npsn_number" val={g("home_npsn_number","69981240")} />
                                    <T label="Inst. Name" name="home_accreditation_inst" val={g("home_accreditation_inst","Kemendikbud Ristek")} />
                                </div>
                                <F label="Visionary Image" name="home_about_image" cur={s.home_about_image || "/images/pesantren-vibe.png"} />
                                <div className="space-y-6">
                                    <TA label="Leadership Quote" name="home_quote" val={g("home_quote",`"Adab lebih tinggi dari ilmu."`)} rows={2} />
                                    <T label="Quote Author" name="home_quote_author" val={g("home_quote_author","— KH. Ahmad Mukhtar")} />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* ── TAB ACADEMIC ── */}
                {tab === 1 && (
                    <div className="space-y-8 animate-fade-in">
                        <Card title="🎓 Curriculum Strategy">
                            <div className="grid md:grid-cols-2 gap-8">
                                <T label="Page Title" name="academic_header_title" val={g("academic_header_title","Program Unggulan")} />
                                <TA label="Program Philosophy" name="academic_header_desc" val={g("academic_header_desc","Kami menawarkan lingkungan belajar yang kondusif dengan fokus pada pembentukan generasi yang unggul.")} rows={2} />
                            </div>
                        </Card>
                        <Card title="✨ 4 Strategic Pillars">
                            <div className="grid md:grid-cols-2 gap-6">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 space-y-3">
                                        <T label={`Pillar #${i} Title`} name={`academic_focus_${i}_title`} val={g(`academic_focus_${i}_title`,["Tahfidz Al-Qur'an","Penguasaan Kitab Kuning","Language Environment","Ekstrakurikuler Multimedia & Seni"][i-1])} />
                                        <TA label="Pillar Description" name={`academic_focus_${i}_desc`} val={g(`academic_focus_${i}_desc`,"")} rows={2} />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {/* ── TAB PROFILE ── */}
                {tab === 2 && (
                    <div className="space-y-8 animate-fade-in">
                        <Card title="🏛️ Organizational Legacy">
                            <div className="grid md:grid-cols-2 gap-8">
                                <T label="Official Name" name="profile_header_title" val={g("profile_header_title","Profil Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan")} />
                                <T label="Tagline" name="profile_header_tagline" val={g("profile_header_tagline","Membentuk Generasi Qur'ani, Berwawasan Global, dan Berakhlakul Karimah")} />
                                <div className="md:col-span-2">
                                    <TA label="Detailed History" name="profile_tentang_p1" val={g("profile_tentang_p1","MAS Pesantren Modern Darul Ihsan merupakan lembaga pendidikan tingkat menengah atas yang terintegrasi dengan sistem pondok pesantren.")} rows={4} />
                                </div>
                                <F label="Campus Visual" name="profile_tentang_image" cur={s.profile_tentang_image || "/images/modern-campus.png"} />
                                <div className="space-y-4">
                                    <T label="Organization Chart" name="profile_struktur_image_label" val="Preview Struktur" />
                                    <F label="Struktur Asset" name="profile_struktur_image" cur={s.profile_struktur_image || "/images/struktur-organisasi.jpg"} />
                                </div>
                            </div>
                        </Card>
                        <Card title="👨‍🏫 Distinguished Educators (Top 4)">
                            <div className="grid md:grid-cols-2 gap-6">
                                {[1,2,3,4].map(i => {
                                    const defs = [
                                        ["Ustazah Widya Rada Utami, SE","Tata Usaha/Operator"],
                                        ["Ustad H. Amir Hasan, Lc","WKM Kesiswaan"],
                                        ["Ustad Irfan Kurniansyah, M.Pd.","WKM Kurikulum"],
                                        ["Ustad Julianto, S.Pd. Gr.","Kepala Madrasah"]
                                    ];
                                    return (
                                        <div key={i} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center gap-6">
                                            <div className="w-24 h-24 flex-shrink-0">
                                                <F label="" name={`profile_asatidz_${i}_img`} cur={s[`profile_asatidz_${i}_img`] || `/images/asatidz/asatidz-${i}.jpg`} />
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <T label="Full Name" name={`profile_asatidz_${i}_name`} val={g(`profile_asatidz_${i}_name`, defs[i-1][0])} />
                                                <T label="Position" name={`profile_asatidz_${i}_role`} val={g(`profile_asatidz_${i}_role`, defs[i-1][1])} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>
                )}

                {/* ── TAB FASILITAS ── */}
                {tab === 3 && (
                    <div className="space-y-8 animate-fade-in">
                        <Card title="🏫 Fasilitas Utama">
                            <div className="grid md:grid-cols-2 gap-8">
                                <T label="Section Heading" name="fasilitas_header_title" val={g("fasilitas_header_title", "Fasilitas Unggulan")} />
                                <TA label="Section Description" name="fasilitas_header_desc" val={g("fasilitas_header_desc", "Didukung fasilitas modern untuk menunjang proses belajar dan kehidupan santri.")} rows={3} />
                                <div className="md:col-span-2">
                                    <F label="Hero Image Fasilitas" name="fasilitas_hero_image" cur={s.fasilitas_hero_image || "/images/fasilitas-poster.jpg"} />
                                </div>
                            </div>
                        </Card>
                        <Card title="📋 Daftar Fasilitas (pisahkan dengan koma)">
                            <div className="space-y-4">
                                <p className="text-xs text-slate-400">Tulis nama fasilitas dipisahkan koma. Contoh: Gedung Ruang Kelas, Asrama Putra &amp; Putri, Masjid</p>
                                <TA label="Daftar Fasilitas" name="home_fasilitas_list" val={g("home_fasilitas_list", "Gedung Ruang Kelas,Asrama Putra & Putri,Laboratorium Komputer,Perpustakaan Lengkap,Sarana Olahraga,Masjid Pusat Ibadah,Unit Kesehatan 24 Jam,Laboratorium Sains")} rows={5} />
                            </div>
                        </Card>
                        <Card title="🖼️ Galeri Fasilitas (4 Foto)">
                            <div className="grid md:grid-cols-2 gap-6">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                                        <T label={`Nama Fasilitas #${i}`} name={`fasilitas_item_${i}_title`} val={g(`fasilitas_item_${i}_title`, ["Masjid Al-Ikhlas", "Asrama Modern", "Lab Komputer", "Perpustakaan Digital"][i-1])} />
                                        <TA label="Deskripsi Singkat" name={`fasilitas_item_${i}_desc`} val={g(`fasilitas_item_${i}_desc`, "")} rows={2} />
                                        <F label="Foto Fasilitas" name={`fasilitas_item_${i}_image`} cur={s[`fasilitas_item_${i}_image`] || ""} />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {/* ── TAB PPDB ── */}
                {tab === 4 && (
                    <div className="space-y-8 animate-fade-in">
                        <Card title="📝 Admission Workflow">
                            <div className="grid md:grid-cols-2 gap-8">
                                <T label="Admission Heading" name="ppdb_title" val={g("ppdb_title", "Mari Bergabung Menjadi")} />
                                <TA label="Call to Action Narrative" name="ppdb_subtitle" val={g("ppdb_subtitle", "Membuka pendaftaran santri baru tahun ajaran 2025/2026. MAS Pesantren Modern Darul Ihsan mencetak santri yang cerdas, mandiri, dan berakhlakul karimah.")} rows={3} />
                                <div className="md:col-span-2">
                                    <TA label="Admission Requirements (comma separated)" name="ppdb_syarat" val={g("ppdb_syarat", "Fotocopy Ijazah/SKL dilegalisir (3 lembar).,Fotocopy Akta Kelahiran (3 lembar).,Fotocopy Kartu Keluarga (3 lembar).,Pas Foto 3x4 & 2x3 (masing-masing 5 lembar).,Fotocopy KIP/PKH (Jika ada).,Surat Keterangan Berkelakuan Baik.")} rows={6} />
                                </div>
                                <T label="Official WhatsApp Contact" name="ppdb_wa_number" val={g("ppdb_wa_number", "6281234567890")} />
                                <T label="Prospectus/Brosur URL" name="ppdb_brosur_url" val={g("ppdb_brosur_url", "#")} />
                            </div>
                        </Card>
                    </div>
                )}

                {/* ── TAB FOOTER ── */}
                {tab === 5 && (
                    <div className="space-y-8 animate-fade-in">
                        <Card title="📌 Global Footprint">
                            <div className="grid md:grid-cols-2 gap-8">
                                <T label="School Full Name" name="footer_school_name" val={g("footer_school_name","MAS Pesantren Modern Darul Ihsan")} />
                                <T label="Primary Contact Email" name="footer_email" val={g("footer_email","maspmdi@gmail.com")} />
                                <div className="md:col-span-2">
                                    <TA label="Office Address (HTML allowed)" name="footer_address" val={g("footer_address","Desa Selemak, Kec. Hamparan Perak,<br/>Kab. Deli Serdang, Sumatera Utara")} rows={3} />
                                </div>
                                <T label="Instagram Handle" name="footer_instagram_label" val={g("footer_instagram_label","IG: @maspmdi")} />
                                <T label="TikTok Handle" name="footer_tiktok_label" val={g("footer_tiktok_label","Tiktok: mas_pmdi")} />
                            </div>
                        </Card>
                    </div>
                )}

                {/* Sticky Luxury Action Bar */}
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl animate-slide-up">
                    <div className="bg-primary-container/90 backdrop-blur-2xl border border-white/10 p-6 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between gap-6 group hover:scale-[1.02] transition-all duration-500">
                        <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${pending ? "bg-amber-500 animate-spin" : "bg-emerald-500"}`}>
                                <span className="material-symbols-outlined text-white font-black">{pending ? "sync" : "verified_user"}</span>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Safety Check</p>
                                <p className="text-sm font-black text-white">System Secure & Ready</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                type="button"
                                onClick={async () => {
                                    if (confirm("⚠️ FACTORY RESET: Revert all settings to original state? This cannot be undone.")) {
                                        const res = await fetch("/api/settings", { method: 'DELETE' });
                                        if (res.ok) window.location.reload();
                                    }
                                }}
                                className="px-8 py-4 bg-white/5 text-white/40 rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all active:scale-95 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-lg">restart_alt</span>
                                <span className="hidden md:inline">Reset</span>
                            </button>
                            
                            <button type="submit" disabled={pending}
                                className="px-12 py-4 bg-secondary text-white rounded-[24px] text-sm font-black hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center gap-3 shadow-2xl shadow-secondary/40 active:scale-95 group/btn">
                                <span className="material-symbols-outlined text-xl group-hover/btn:rotate-12 transition-transform">{pending ? "progress_activity" : "auto_fix_high"}</span>
                                {pending ? "SYNCHRONIZING..." : "PUBLISH CHANGES"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
