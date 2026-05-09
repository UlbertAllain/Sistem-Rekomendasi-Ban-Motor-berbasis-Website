import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-600 rounded-md flex items-center justify-center">
              <span className="text-white font-black text-xs">S</span>
            </div>
            <span className="font-bold text-sm text-gray-900">CariBanMu</span>
          </div>
          <Link
            href="/recommend"
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-md transition-colors"
          >
            Mulai Rekomendasi
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full mb-8">
            <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
            <span className="text-xs font-medium text-amber-700 uppercase tracking-wider">
              ngga ada lagi ban kegedean atau kekecilan 
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-gray-900 mb-5">
            Ban Motor<br />
            <span className="text-amber-600">Yang Tepat</span>,<br />
            Bukan Yang Mahal
          </h1>

          <p className="text-base md:text-lg max-w-lg leading-relaxed text-gray-500 mb-8">
            Dapatkan rekomendasi ban yang sesuai dengan motor, kondisi jalan, dan gaya berkendara kamu — berdasarkan data, bukan tebakan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/recommend"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-md transition-colors"
            >
              Cari Ban Untuk Motorku
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/cara-kerja"
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 font-medium text-sm rounded-md transition-colors"
            >
              Lihat Cara Kerja
            </Link>
          </div>

          <div className="flex gap-10 mt-14 pt-8 border-t border-gray-200">
            <div>
              <div className="text-2xl font-black text-gray-900">100+</div>
              <div className="text-xs text-gray-400 mt-1">Ban Tersedia</div>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">100+</div>
              <div className="text-xs text-gray-400 mt-1">Tipe Motor</div>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">5</div>
              <div className="text-xs text-gray-400 mt-1">Kriteria Skor</div>
            </div>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="py-16 px-6 bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Cara Kerja</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mt-2">
              Tiga Langkah, Ban Dapat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Pilih Motor Kamu", desc: "Pilih tipe motor dari database, atau input ukuran ban secara manual." },
              { step: "02", title: "Tentukan Kebutuhan", desc: "Kondisi jalan, gaya berkendara, budget — sesuaikan dengan kebutuhan lo." },
              { step: "03", title: "Lihat Rekomendasi", desc: "Sistem hitung skor tiap ban dan kasih rekomendasi terbaik buat lo." },
            ].map((item) => (
              <div key={item.step} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <span className="text-3xl font-black text-gray-200">{item.step}</span>
                <h3 className="text-base font-bold text-gray-900 mt-2 mb-1.5">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALGORITMA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Algoritma</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mt-2">
              Bukan Random, Ini Skor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Kondisi Jalan", desc: "Pola ban & compound disesuaikan dengan aspal halus, kasar, gravel, atau campuran.", icon: "🛣️" },
              { label: "Gaya Berkendara", desc: "Komuter harian, cornering agresif, touring jauh, atau trabas ringan.", icon: "🏍️" },
              { label: "Prioritas Pengguna", desc: "Grip, daya tahan, kenyamanan, atau harga? Bobot skor berubah sesuai pilihan.", icon: "⚖️" },
              { label: "Rating & Harga", desc: "Rating pengguna dan kesesuaian budget masuk hitungan.", icon: "💰" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-xl mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{item.label}</h3>
                  <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="py-16 px-6 bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mb-3">
            Siap Ganti Ban?
          </h2>
          <p className="max-w-sm mx-auto mb-8 text-sm text-gray-500">
            Cari tahu ban mana yang paling cocok untuk motor dan kebutuhan kamu.
          </p>
          <Link
            href="/recommend"
            className="inline-flex items-center gap-2 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-base rounded-md transition-colors"
          >
            Mulai Rekomendasi
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-amber-600 rounded flex items-center justify-center">
              <span className="text-white font-black" style={{ fontSize: "9px" }}>S</span>
            </div>
            <span className="text-xs font-semibold text-gray-400">CariBanMu</span>
          </div>
          <p className="text-xs text-gray-300">
            Sistem Rekomendasi Ban Motor · Next.js & Firebase
          </p>
        </div>
      </footer>

    </div>
  );
}