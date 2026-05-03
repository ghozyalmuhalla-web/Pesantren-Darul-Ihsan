import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DaftarForm from "./DaftarForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Formulir Pendaftaran - PPDB Darul Ihsan",
    description: "Silakan isi formulir pendaftaran santri baru MAS Pesantren Modern Darul Ihsan.",
};

export default function DaftarPPDBPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Navigation />

            <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-3xl lg:text-5xl font-bold text-primary-container font-h2 mb-4">Formulir Pendaftaran</h1>
                            <p className="text-on-surface-variant max-w-xl mx-auto">Silakan isi data calon santri dengan lengkap dan benar. Pastikan nomor WhatsApp aktif untuk keperluan konfirmasi.</p>
                        </div>

                        <DaftarForm />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
