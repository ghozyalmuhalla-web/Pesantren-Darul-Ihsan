import prisma from '../src/lib/prisma';

async function main() {
  const content = `1. 🎓 Penerimaan Santri Baru 2026/2027
PMDI sedang membuka Pendaftaran Santri Baru (PSB) untuk tahun ajaran 2026/2027. Masih tersedia gelombang pendaftaran dan proses seleksi, termasuk tes kemampuan akademik & seleksi masuk.
👉 Ini jadi momen penting bagi calon santri yang ingin masuk PMDI.

IMAGE:/images/news-2026-1.jpg

2. 🧠 Pelaksanaan Tes Akademik & Seleksi
Dilaksanakan Tes Kemampuan Akademik (TKA) bagi calon atau santri tingkat lanjut. Tes ini disebut sebagai “langkah awal menuju masa depan gemilang”.

3. 🕌 Peringatan Isra’ Mi’raj 2026
PMDI mengadakan peringatan Isra’ Mi’raj Nabi Muhammad SAW. Kegiatan ini diisi dengan ceramah keagamaan dan pembinaan spiritual santri.

IMAGE:/images/news-2026-2.jpg

4. 📖 Kegiatan Amaliyah Tadris
Diadakan program Amaliyah Tadris (latihan mengajar). Bertujuan melatih kemampuan santri dalam berdakwah dan mengajar.

5. 📢 Kampanye Pendidikan & Motivasi Santri
PMDI aktif memberikan motivasi kepada santri untuk:
- Terus belajar
- Mengharumkan nama pesantren
- Menjadi generasi bermanfaat bagi umat

IMAGE:/images/news-2026-3.jpg`;

  await prisma.news.create({
    data: {
      title: "Berita & Kegiatan Terbaru PMDI (2026)",
      content: content,
      imageUrl: "/images/news-2026-1.jpg",
    },
  });

  console.log("News inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
