import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const galleryItems = await prisma.gallery.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' }
  });

  const recentNews = await prisma.news.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[751px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Campus"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKcu8YXrgymCRP78gEadoz5zuOmGkCSL937KEIQWunVcBBdIYtBXaBKaDqgEbXAR2sPdeRP9qR1aKiqWgGLd6DJpLOYCujnZIRh9_mH5BXYvdORjhYDMke-BeiLOMV51wKHN_bkDhhv3JSxm4EsPv0A6z6Qjer-b1TqknvLjpbp7ot4fD9yMCFFPJOWtF8fILwWPkvG1tr-5mki8NdY5g77N6G4rnIVsPUa8tfwr_qRtn0fyUjvV1GAu3q-Izhaj99NZdeL6Ikllg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full py-20">
          <div className="max-w-2xl space-y-stack-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-label-caps uppercase tracking-widest">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              Akreditasi A
            </div>
            <h2 className="font-h1 text-h1 text-primary-container leading-[1.1]">
              Madrasah Aliyah Swasta Pesantren Modern Darul Ihsan
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed italic">
              &quot;Membentuk Generasi Qur’ani yang Beradab, Berilmu, dan Berwawasan Global di Era Digital.&quot;
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-secondary text-on-secondary rounded-xl font-button shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 group">
                Mulai Pendaftaran
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
              <button className="px-8 py-4 bg-white border-2 border-secondary text-secondary rounded-xl font-button hover:bg-secondary-fixed transition-colors">
                Lihat Kurikulum
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="section-gap bg-surface-container-lowest relative overflow-hidden">
        <div className="geometric-pattern absolute inset-0 opacity-40"></div>
        <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-stack-md">
            <h3 className="font-h2 text-h2 text-primary-container">Mendidik dengan Adab</h3>
            <p className="font-body-md text-on-surface-variant">
              Di Darul Ihsan, kami percaya bahwa ilmu tanpa adab adalah hampa. Visi kami adalah mengintegrasikan tradisi kesantunan Islam dengan ketangkasan intelektual modern. Setiap santri dibimbing untuk memiliki karakter yang luhur sebelum mereka menguasai sains dan teknologi.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="text-label-caps text-secondary mb-2 uppercase">Status Akreditasi</p>
                <p className="font-h3 text-h3 text-on-background">Grade A</p>
                <p className="text-body-sm text-on-surface-variant">Kemendikbud Ristek</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="text-label-caps text-secondary mb-2 uppercase">NPSN</p>
                <p className="font-h3 text-h3 text-on-background">69981240</p>
                <p className="text-body-sm text-on-surface-variant">Nasional Terdaftar</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
              <img
                alt="Student Life"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlx5EZK8cE5Fprqdm5RKx8_yxbMRjznhCpsr6VkVfUahG89rQjgRqQU-mXEsUuSsSTF4QskBYyQOYs83RecO6_F5LUoAGyxIj6k-lvy1xrtIcoMDz81eOTVyHPgdZwNtYCP2qt2vk-WhMo0LTvGONgrVnJITJdv0rw9OpKTubKioy4fKf72-KDX9lhjDU_KnPZEM1xtW4zbpms2qdXUM1704BFdVrIR0JJ_xYgrvi4S-BbBRGM41Jwzo6n_BsWhE5P9qrQvfiuw4A"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 p-8 bg-primary-container text-white rounded-3xl shadow-xl max-w-xs -rotate-3">
              <span className="material-symbols-outlined text-4xl text-tertiary-fixed-dim mb-4">format_quote</span>
              <p className="italic font-serif">&quot;Adab lebih tinggi dari ilmu. Kami menanamkan akar yang kuat agar dahan masa depan mereka tegak.&quot;</p>
              <p className="mt-4 font-bold text-sm">— KH. Ahmad Mukhtar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Gallery */}
      <section className="py-section-gap max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-secondary font-bold tracking-widest text-label-caps uppercase mb-2">Life at Darul Ihsan</p>
            <h3 className="font-h2 text-h2">Galeri Aktivitas Santri</h3>
          </div>
          <Link href="/gallery" className="flex items-center gap-2 text-secondary font-bold hover:underline">
            Lihat Selengkapnya
            <span className="material-symbols-outlined">trending_flat</span>
          </Link>
        </div>

        {galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item: any) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-bold text-lg">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] md:h-[700px]">
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl">
              <img
                alt="Tahfidz Quran"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKHs3KSu5k94tgoGry27IJ1wLbWgtVZPY5T0qk3iRbcedW3dreG1R5MtoP9ApXcKtwz4GZChXYW4PVW8yyE_12oYkvNpj4zrNwxhmvMVgEwHgkIUEjtx-vrAi8hGLzS5g7h4wluDeUsNb_90z1xVVeIyQesTokIN_zk7LCaP18QxXx2sCOyyMox4dQvNuGT0iiIeqFk21G1i1KX8zop2s7iaFKshRrWuqEkbqxhzaeboK1CKjkjlFg9kYD20Gwt73X4izpu2tYuus"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <div>
                  <p className="text-white font-h3 text-h3">Tahfidz &amp; Tilawah</p>
                  <p className="text-slate-300">Menghafal Al-Qur&apos;an dengan metode mutqin.</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-2xl">
              <img
                alt="Science Lab"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Ib4B11CNKB2mVjDGNHNeFuXc_rFEuMwy-mekXebxPC-nV6uvup9kf4PHa5BEVjJ-u-hoC8bhFTP4IUL3JjEUhls5nRNxPZw1xSwa8U6dlriwkkdqnRRKAU2c4JlDIAfksyFwt0s2FOjHCS23n2Yp24-g86i_ZspKelzSfSZOaF9xVAdB6NLSh_MN3dT0o8Sz25NLayaAYZ22NaKrtlOihAIx5cP9cVgzw5rQafDb-OTUUIYpVwcQBRjGgdWcG5HWaVsp3e-olCw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-white font-bold">Eksperimen Sains</p>
              </div>
            </div>
            <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
              <img
                alt="Archery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2OtH6V9IOjYtRcR05mhU6vLlwaZahZxYnQske4FCZb1Y1fWhnB81W2xqSVeZZvSOcoNE_aWRIyOGRwH457RZfVdflzBUv79DTgUtGxBMcTDp4T3047_izBvrGC-Kz_bb3ElDs8nHD03n-C_A1a7lQZCzGHaEIaaYyWYBwdTYcSN_o3YTIYryu8UtLW8u-jD4au8NbTIkK3Y1YKJgiOnb9yJsY2qNo40IgBxE3bjbmEthEgz6LVHw-_q8L62ud9N4VVeo6gcz2ARQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-sm font-bold">Memanah</p>
              </div>
            </div>
            <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
              <img
                alt="Robotics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCawJbTii6bW4yGwTWYjXk-TmfJwyTXqUac5KY_ptNTC7YzioScx4Mt3UrvzIYckUtTUi5Y32nV92uyhBxHZjyoSF0qELXWw6gOK884FcKraOO-1kQkmf8ZAY8LZfVU_Z8-SOZiNWWe2Ft-Ni1xisPBji3mqMQy0o95nNb5wlYNXRnOse8BO_c5GO7DdVQOWcEABuWwnLQ1WH37Q-m4hnao_wMExUGkIioIZ2BiYJ_uWJ-Rbh0K5Tr8YnCanotyThdpFEJs_o5eIm4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-sm font-bold">Robotics</p>
              </div>
            </div>
          </div>
        )}
      </section>


    </main>
  );
}
