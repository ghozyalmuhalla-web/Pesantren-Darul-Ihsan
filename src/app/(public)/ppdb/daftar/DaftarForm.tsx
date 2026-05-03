"use client";
import { useActionState, useState, useRef } from "react";
import { submitPendaftaran } from "@/app/actions/cms";

export default function DaftarForm() {
    const [state, formAction, pending] = useActionState(submitPendaftaran, null);
    const [step, setStep] = useState(1);
    const formRef = useRef<HTMLFormElement>(null);

    const nextStep = (e: React.MouseEvent) => {
        e.preventDefault();
        // Basic validation before moving to next step
        const currentInputs = formRef.current?.querySelectorAll(`[data-step="${step}"] input, [data-step="${step}"] select, [data-step="${step}"] textarea`) as NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
        let isValid = true;
        currentInputs?.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                isValid = false;
            }
        });
        if (isValid) setStep(prev => prev + 1);
    };

    const prevStep = (e: React.MouseEvent) => {
        e.preventDefault();
        setStep(prev => prev - 1);
    };

    if (state?.success) {
        const registrationId = `DI-${Date.now().toString().slice(-6)}`;
        return (
            <div className="bg-white rounded-[48px] p-12 text-center shadow-2xl shadow-blue-900/5 border border-slate-100 animate-fade-in">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <span className="material-symbols-outlined text-5xl">task_alt</span>
                </div>
                <h2 className="text-2xl font-bold text-primary-container mb-2">Pendaftaran Berhasil!</h2>
                <div className="inline-block px-4 py-2 bg-slate-50 rounded-full text-xs font-black text-secondary tracking-widest uppercase mb-6">
                    ID PENDAFTARAN: {registrationId}
                </div>
                <p className="text-on-surface-variant mb-8 leading-relaxed max-w-md mx-auto">
                    Data Anda telah kami terima dengan ID <span className="font-bold">{registrationId}</span>. Panitia PPDB MAS Darul Ihsan akan segera melakukan verifikasi dan menghubungi Anda melalui WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => window.print()} className="px-10 py-4 bg-white border-2 border-slate-100 text-on-surface-variant rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">print</span>
                        Cetak Bukti
                    </button>
                    <button onClick={() => window.location.href = "/"} className="px-10 py-4 bg-secondary text-white rounded-2xl font-bold hover:bg-blue-900 transition-all shadow-lg shadow-secondary/20">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between max-w-md mx-auto mb-12">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2 relative flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 z-10 ${
                            step >= s ? "bg-secondary text-white shadow-lg shadow-secondary/20" : "bg-slate-100 text-slate-400"
                        }`}>
                            {step > s ? <span className="material-symbols-outlined text-sm">check</span> : s}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${step >= s ? "text-secondary" : "text-slate-400"}`}>
                            {s === 1 ? "Santri" : s === 2 ? "Orang Tua" : "Selesai"}
                        </span>
                        {s < 3 && (
                            <div className={`absolute left-1/2 top-5 w-full h-[2px] -z-0 ${step > s ? "bg-secondary" : "bg-slate-100"}`}></div>
                        )}
                    </div>
                ))}
            </div>

            <form ref={formRef} action={formAction} className="bg-white rounded-[48px] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden transition-all">
                <div className="p-8 lg:p-12">
                    {/* Step 1: Data Santri */}
                    {step === 1 && (
                        <div className="space-y-10 animate-fade-in" data-step="1">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <h3 className="text-xl font-bold text-primary-container">Data Calon Santri</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nama Lengkap Santri</label>
                                        <input name="namaLengkap" type="text" required placeholder="Contoh: Ahmad Fauzi" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Jenis Kelamin</label>
                                        <select name="jenisKelamin" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all appearance-none cursor-pointer">
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tempat Lahir</label>
                                        <input name="tempatLahir" type="text" required placeholder="Contoh: Deli Serdang" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tanggal Lahir</label>
                                        <input name="tanggalLahir" type="date" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Sekolah Asal (SMP/MTs)</label>
                                        <input name="asalSekolah" type="text" required placeholder="Contoh: MTs Darul Ihsan" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 flex justify-end">
                                <button onClick={nextStep} className="px-10 py-4 bg-primary-container text-white rounded-2xl font-bold hover:bg-secondary transition-all shadow-xl shadow-blue-900/10 flex items-center gap-2">
                                    Lanjut ke Data Orang Tua
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Data Orang Tua */}
                    {step === 2 && (
                        <div className="space-y-10 animate-fade-in" data-step="2">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <h3 className="text-xl font-bold text-primary-container">Data Orang Tua / Wali</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nama Ayah Kandung</label>
                                        <input name="namaAyah" type="text" required placeholder="Contoh: Abdullah" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nama Ibu Kandung</label>
                                        <input name="namaIbu" type="text" required placeholder="Contoh: Fatimah" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nomor WhatsApp Aktif</label>
                                        <input name="nomorWhatsapp" type="tel" required placeholder="Contoh: 081234567890" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Alamat Lengkap</label>
                                        <textarea name="alamat" required rows={3} placeholder="Dusun, Desa, Kecamatan, Kabupaten..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all resize-none" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 flex justify-between gap-4">
                                <button onClick={prevStep} className="px-8 py-4 bg-white border-2 border-slate-100 text-on-surface-variant rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Kembali
                                </button>
                                <button onClick={nextStep} className="px-10 py-4 bg-primary-container text-white rounded-2xl font-bold hover:bg-secondary transition-all shadow-xl shadow-blue-900/10 flex items-center gap-2">
                                    Lanjut ke Konfirmasi
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Review & Submit */}
                    {step === 3 && (
                        <div className="space-y-10 animate-fade-in" data-step="3">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <h3 className="text-xl font-bold text-primary-container">Review & Konfirmasi</h3>
                                </div>
                                <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
                                    <p className="text-sm text-on-surface-variant leading-relaxed">
                                        Silakan periksa kembali data yang telah Anda masukkan. Pastikan nomor WhatsApp sudah benar karena panitia akan menghubungi Anda melalui nomor tersebut.
                                    </p>
                                    <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                                        <span className="material-symbols-outlined text-amber-600">info</span>
                                        <p className="text-xs font-bold text-amber-800">Data tidak dapat diubah setelah formulir dikirim.</p>
                                    </div>
                                </div>
                            </div>

                            {state?.error && <p className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center">{state.error}</p>}

                            <div className="pt-6 flex justify-between gap-4">
                                <button onClick={prevStep} disabled={pending} className="px-8 py-4 bg-white border-2 border-slate-100 text-on-surface-variant rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2 disabled:opacity-50">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Edit Data
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={pending}
                                    className="flex-1 py-5 bg-secondary text-white rounded-2xl font-bold hover:bg-blue-900 transition-all shadow-xl shadow-secondary/20 disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    {pending ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                            Mengirim...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">how_to_reg</span>
                                            Konfirmasi & Daftar
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                    <p className="text-xs text-on-surface-variant italic">&quot;Bismillah, melangkah menuju masa depan Qur&apos;ani.&quot;</p>
                </div>
            </form>
        </div>
    );
}

