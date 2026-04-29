// app/cara-kerja/page.tsx

import Link from "next/link";

export default function CaraKerjaPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-600 rounded-md flex items-center justify-center">
              <span className="text-white font-black text-xs">C</span>
            </div>
            <span className="font-bold text-sm text-gray-900">CariBanMu</span>
          </Link>
          <Link href="/recommend" className="text-xs font-medium text-amber-600 hover:underline">
            Langsung ke Rekomendasi →
          </Link>
        </div>
      </nav>

      <main className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="mb-12">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">← Kembali ke Beranda</Link>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mt-3 mb-3">
              Bagaimana Sistem Ini Bekerja?
            </h1>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed">
              Penjelasan sederhana tentang cara sistem kami merekomendasikan ban motor yang tepat untuk kamu. Tanpa jargon teknis, kami janji.
            </p>
          </div>

          {/* === SECTION 1: MASALAHNYA APA === */}
          <section className="mb-12">
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <h2 className="text-lg font-bold text-red-700 mb-3">😐 Masalahnya</h2>
              <div className="space-y-3 text-sm text-red-600 leading-relaxed">
                <p>Kayak gini, lo mau ganti ban motor. Lo buka marketplace, ketik <strong>"ban beat"</strong>, muncul 50+ pilihan. Lalu?</p>
                <p>• <strong>Bingung bedain.</strong> Ban NR91, RX-01, Duro, FX808 — bedanya apa?</p>
                <p>• <strong>Takut salah ukuran.</strong> Kekecilan nggak bisa dipasang, kegedean ngebul doang.</p>
                <p>• <strong>Takut salah pilih.</strong> Ban murah tapi gak awet, ban mahal tapi gak cocok sama jalan lo.</p>
                <p>• <strong>Review menyesatkan.</strong> Yang kasih bintang 5 mungkin rider track day, padahal lo cuma komuter.</p>
              </div>
            </div>
          </section>

          {/* === SECTION 2: SOLUSI KAMI === */}
          <section className="mb-12">
            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
              <h2 className="text-lg font-bold text-green-700 mb-3">😊 Solusinya</h2>
              <p className="text-sm text-green-600 leading-relaxed mb-4">
                Kami bikin sistem yang <strong>memahami kebutuhan lo secara spesifik</strong>, lalu mencari ban yang <strong>paling mirip</strong> dengan kebutuhan itu. Bukan asal rekomendasi, tapi berdasarkan kesamaan.
              </p>
              <div className="bg-white border border-green-100 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Analogi sederhana:</strong> Bayangkan lo lagi di toko sepatu. Lo bilang ke penjual, <em>"Aku butuh sepatu buat lari pagi di jalan aspal, yang empuk, budget 300rb."</em> Penjual yang bagus akan mencari sepatu yang paling sesuai dengan deskripsi lo — bukan sekadar menyodorkan sepatu termahal atau terlaris. <strong>Itu yang sistem kami lakukan, tapi secara otomatis.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* === SECTION 3: CARA KERJA 4 LANGKAH === */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-gray-900 mb-6">Cara Kerjanya (4 Langkah)</h2>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-black text-amber-600">1</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Lo Pilih Motor & Kondisi Jalan</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Contoh: "Honda Beat, jalan aspal halus di Jakarta." Dari sini sistem udah tau <strong>ukuran ban yang dibutuhkan</strong> (80/90-14 depan, 90/90-14 belakang). Ini jadi filter pertama — ban yang ukurannya gak cocok langsung gak masuk daftar.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-black text-amber-600">2</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Lo Atur 6 Slider Preferensi</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Ini bagian penting. Lo ngasih tahu ke sistem: <strong>"Apa yang paling lo prioritasin?"</strong>
                  </p>
                  <div className="mt-3 bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Grip / Cengkeraman</span>
                      <span className="text-xs font-mono font-bold text-amber-600">0.30</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full"><div className="h-full bg-amber-500 rounded-full" style={{ width: "30%" }} /></div>
                    <p className="text-xs text-gray-400 mt-1">Contoh: Slider di 0.30 artinya "grip gak terlalu penting buat saya"</p>
                  </div>
                  <div className="mt-2 bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Harga Terjangkau</span>
                      <span className="text-xs font-mono font-bold text-amber-600">0.90</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full"><div className="h-full bg-amber-500 rounded-full" style={{ width: "90%" }} /></div>
                    <p className="text-xs text-gray-400 mt-1">Contoh: Slider di 0.90 artinya "saya butuh ban yang murah"</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    6 slider ini membentuk <strong>"profil kepribadian" lo sebagai pengendara</strong>. Setiap orang punya profil berbeda.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-black text-amber-600">3</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Sistem Ubah Ban Jadi Angka</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Setiap ban di database kami diubah jadi <strong>"profil ban"</strong> — juga 6 angka. Contoh:
                  </p>
                  <div className="mt-3 bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-600 mb-2">IRC Duro (ban matic murah & awet):</p>
                    <div className="grid grid-cols-6 gap-2 text-center">
                      {[
                        { label: "Grip", val: "0.25" },
                        { label: "Tahan", val: "1.00" },
                        { label: "Nyaman", val: "0.45" },
                        { label: "Jalan", val: "0.80" },
                        { label: "Harga", val: "0.88" },
                        { label: "Rating", val: "0.82" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="text-xs text-gray-400">{item.label}</div>
                          <div className="text-sm font-mono font-bold text-gray-700">{item.val}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Angka mendekati 1.0 = ban ini sangat kuat di aspek itu. Duro dapat skor tahan lama sempurna (1.00) tapi grip rendah (0.25) karena compound keras.
                    </p>
                  </div>
                  <div className="mt-2 bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-600 mb-2">Michelin Pilot Street (ban sport mahal & grip tinggi):</p>
                    <div className="grid grid-cols-6 gap-2 text-center">
                      {[
                        { label: "Grip", val: "1.00" },
                        { label: "Tahan", val: "0.20" },
                        { label: "Nyaman", val: "0.40" },
                        { label: "Jalan", val: "0.95" },
                        { label: "Harga", val: "0.26" },
                        { label: "Rating", val: "0.94" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="text-xs text-gray-400">{item.label}</div>
                          <div className="text-sm font-mono font-bold text-gray-700">{item.val}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Ban ini grip sempurna (1.00) tapi tahan lama rendah (0.20) dan harganya mahal (0.26 = murahnya rendah).
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-black text-amber-600">4</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Sistem Bandingkan Profil Lo vs Profil Ban</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Sekarang sistem punya 2 set angka: <strong>profil lo</strong> (dari slider) dan <strong>profil setiap ban</strong> (dari database). Sistem lalu ngukur <strong>"seberapa mirip"</strong> kedua profil itu.
                  </p>

                  <div className="mt-3 bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-bold text-gray-600 mb-3">Contoh Visualisasi:</p>
                    
                    {/* Visual comparison */}
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Profil Kamu (dari slider):</div>
                        <div className="flex gap-1 h-6">
                          <div className="flex-1 bg-amber-500 rounded" style={{ height: "27%" }} title="Grip: 0.30" />
                          <div className="flex-1 bg-amber-500 rounded" style={{ height: "45%" }} title="Tahan: 0.45" />
                          <div className="flex-1 bg-amber-500 rounded" style={{ height: "40%" }} title="Nyaman: 0.40" />
                          <div className="flex-1 bg-amber-500 rounded" style={{ height: "60%" }} title="Jalan: 0.60" />
                          <div className="flex-1 bg-amber-500 rounded" style={{ height: "90%" }} title="Harga: 0.90" />
                          <div className="flex-1 bg-amber-500 rounded" style={{ height: "70%" }} title="Rating: 0.70" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">IRC Duro:</div>
                        <div className="flex gap-1 h-6">
                          <div className="flex-1 bg-blue-500 rounded" style={{ height: "25%" }} />
                          <div className="flex-1 bg-blue-500 rounded" style={{ height: "100%" }} />
                          <div className="flex-1 bg-blue-500 rounded" style={{ height: "45%" }} />
                          <div className="flex-1 bg-blue-500 rounded" style={{ height: "80%" }} />
                          <div className="flex-1 bg-blue-500 rounded" style={{ height: "88%" }} />
                          <div className="flex-1 bg-blue-500 rounded" style={{ height: "82%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Michelin Pilot Street:</div>
                        <div className="flex gap-1 h-6">
                          <div className="flex-1 bg-red-400 rounded" style={{ height: "100%" }} />
                          <div className="flex-1 bg-red-400 rounded" style={{ height: "20%" }} />
                          <div className="flex-1 bg-red-400 rounded" style={{ height: "40%" }} />
                          <div className="flex-1 bg-red-400 rounded" style={{ height: "95%" }} />
                          <div className="flex-1 bg-red-400 rounded" style={{ height: "26%" }} />
                          <div className="flex-1 bg-red-400 rounded" style={{ height: "94%" }} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                      <p className="text-xs text-gray-600">
                        <strong>Similarity kamu vs IRC Duro: <span className="text-green-600 font-bold">87.2%</span></strong> — Banget mirip! Harga dan daya tahan kamu prioritasin, Duro juga kuat di situ.
                      </p>
                      <p className="text-xs text-gray-600">
                        <strong>Similarity kamu vs Michelin: <span className="text-red-500 font-bold">54.1%</span></strong> — Cukup beda. Michelin grip-nya tinggi tapi kamu gak terlalu butuh, harganya juga jauh dari preferensi kamu.
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mt-3">
                    Semakin mirip bentuk "bar"-nya, semakin tinggi persentase similarity, semakin cocok ban itu buat lo. Itu yang jadi <strong>dasar peringkat rekomendasi</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === SECTION 4: NAMA METODE === */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-gray-900 mb-3">Metode yang Dipakai</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">🔍 Content-Based Filtering (CBF)</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">
                    Artinya: sistem merekomendasikan berdasarkan <strong>kesamaan konten</strong>. Dalam kasus kita, "konten" = profil fitur ban (grip, daya tahan, harga, dll). Sistem mencari ban yang profilnya paling mirip dengan profil kebutuhan lo.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">📐 Cosine Similarity</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">
                    Ini <strong>rumus matematika</strong> buat ngukur "seberapa mirip" dua vektor (kumpulan angka). Nggak perlu paham rumusnya — yang perlu tahu: hasilnya angka 0% sampai 100%. 100% = identik, 0% = sama sekali beda.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                  <p className="text-xs text-amber-700">
                    <strong>Kenapa bukan AI / Machine Learning?</strong> Karena data yang kita punya terstruktur (angka, kategori), bukan teks bebas. Metode vektor + cosine similarity jauh lebih tepat dan transparan daripada model ML untuk kasus ini.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === SECTION 5: MEMBACA HASIL === */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-gray-900 mb-3">Cara Membaca Hasil Rekomendasi</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-bold text-gray-900">Persentase Similarity</h3>
                  <p className="text-gray-500 mt-1">Contoh: <span className="font-mono font-bold text-amber-600">87.2%</span>. Artinya profil ban ini 87.2% mirip dengan profil kebutuhan lo. Semakin tinggi, semakin cocok.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Rank #1, #2, #3...</h3>
                  <p className="text-gray-500 mt-1">Urutan dari yang paling mirip sampai yang paling beda. Rank #1 = rekomendasi terbaik.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Alasan</h3>
                  <p className="text-gray-500 mt-1">Setiap ban punya penjelasan singkat kenapa direkomendasikan. Contoh: <em>"Keunggulan utama: Daya Tahan (100%). Harga terjangkau. Compound keras untuk daya tahan maksimal."</em></p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Vektor Fitur (Toggle)</h3>
                  <p className="text-gray-500 mt-1">Kalau lo klik "Tampilkan Vektor", bakal muncul 6 angka per ban. Ini opsional, tapi berguna kalau lo pengen lihat secara detail kenapa ban A lebih cocok dari ban B.</p>
                </div>
              </div>
            </div>
          </section>

          {/* === SECTION 6: VS METODE LAMA === */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-gray-900 mb-3">Perbandingan dengan Metode Lama</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Metode Lama (Weighted Sum)</div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">Sistem Bobot</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  User pilih 1 prioritas (misal: "grip"), lalu sistem kasih bobot otomatis ke setiap kriteria. Skor akhir = jumlah semua kriteria × bobot.
                </p>
                <div className="mt-3 text-xs text-gray-400 space-y-1">
                  <p>✅ Sederhana</p>
                  <p>❌ User cuma bisa pilih 1 prioritas</p>
                  <p>❌ Gak bisa kontrol per aspek</p>
                  <p>❌ "Grip agak penting tapi gak 0" gak bisa diexpress</p>
                </div>
              </div>
              <div className="bg-white border-2 border-amber-300 rounded-xl p-5">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Metode Kami (CBF + Cosine)</div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">Sistem Kemiripan</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  User langsung atur tingkat kepentingan setiap aspek via slider (0-1). Sistem mencari ban yang "bentuk profilnya" paling mirip.
                </p>
                <div className="mt-3 text-xs text-gray-400 space-y-1">
                  <p>✅ User kontrol penuh (6 dimensi)</p>
                  <p>✅ Bisa express "agak penting tapi gak 0"</p>
                  <p>✅ Lebih natural (kayak konsultasi ke penjual)</p>
                  <p>✅ Transparan (bisa lihat vektor)</p>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
              <p className="text-xs text-blue-700">
                <strong>Coba sendiri:</strong> Di halaman rekomendasi, klik toggle <strong>"CBF vs WSM (Bandingkan)"</strong> untuk melihat perbedaan hasil kedua metode secara langsung dengan input yang sama.
              </p>
            </div>
          </section>

          {/* === SECTION 7: APA YANG GAK DILAKUKAN === */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-gray-900 mb-3">Yang Perlu Lo Tahu</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="text-red-500">✗</span>
                <p className="text-gray-500"><strong>Kami gak ngambil data pribadi.</strong> Gak ada login, gak ada riwayat pencarian yang disimpan. Slider cuma dipakai sekali untuk hitung.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-red-500">✗</span>
                <p className="text-gray-500"><strong>Kami bukan penjual ban.</strong> Kami gak menjual apapun. Rekomendasi murni berdasarkan data dan algoritma.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-red-500">✗</span>
                <p className="text-gray-500"><strong>Hasil bukan keputusan final.</strong> Ini referensi berdasarkan data. Tetap disarankan konsultasi ke bengkel langganan sebelum beli.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-500">✓</span>
                <p className="text-gray-500"><strong>Data bisa dicek.</strong> Semua ban di database kami adalah ban nyata yang dijual di Indonesia. Harga mungkin berbeda tergantung toko dan waktu.</p>
              </div>
            </div>
          </section>

          {/* === SECTION 8: 6 DIMENSI DIJELASKIN === */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-gray-900 mb-3">Penjelasan 6 Dimensi Slider</h2>
            <div className="space-y-3">
              {[
                {
                  dimensi: "Grip / Cengkeraman",
                  icon: "🤏",
                  pertanyaan: "Seberapa ngegrab ban saat bermanuver atau pengereman?",
                  rendah: "Soft compound (lentur) = grip tinggi, tapi cepat habis",
                  tinggi: "Lo butuh ban yang gak selip, terutama di tikungan",
                },
                {
                  dimensi: "Daya Tahan",
                  icon: "🛡️",
                  pertanyaan: "Seberapa lama ban bertahan sebelum harus ganti?",
                  rendah: "Hard compound (keras) = awet, tapi grip kurang",
                  tinggi: "Lo gak mau sering ganti ban, prioritas umur pakai",
                },
                {
                  dimensi: "Kenyamanan",
                  icon: "☁️",
                  pertanyaan: "Seberapa halus perjalanan? Gak getaran, gak berisik?",
                  rendah: "Pattern touring + compound medium = paling nyaman",
                  tinggi: "Lo prioritas kenyamanan di perjalanan harian",
                },
                {
                  dimensi: "Kesesuaian Jalan",
                  icon: "🛣️",
                  pertanyaan: "Seberapa penting ban cocok dengan jalan yang lo lalui?",
                  rendah: "Pattern sport cocok aspal halus, dual sport cocok tanah",
                  tinggi: "Lo sering lewat jalan rusak / non-aspal",
                },
                {
                  dimensi: "Harga Terjangkau",
                  icon: "💰",
                  pertanyaan: "Seberapa penting ban harganya murah/terjangkau?",
                  rendah: "Skor harga itu harga dibalik — murah = skor tinggi",
                  tinggi: "Budget ketat, pengen ban paling murah yang tetap layak",
                },
                {
                  dimensi: "Rating Pengguna",
                  icon: "⭐",
                  pertanyaan: "Seberapa penting ban punya review bagus dari pengguna lain?",
                  rendah: "Rating 1-5 dari database, dinormalisasi ke 0-1",
                  tinggi: "Lo percaya review pengguna sebagai indikator kualitas",
                },
              ].map((item) => (
                <div key={item.dimensi} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">{item.dimensi}</h3>
                      <p className="text-xs text-gray-400 italic mt-0.5">"{item.pertanyaan}"</p>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs font-bold text-gray-500 mb-0.5">Slider rendah (0.0 - 0.3)</div>
                          <p className="text-xs text-gray-400">{item.rendah}</p>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs font-bold text-gray-500 mb-0.5">Slider tinggi (0.7 - 1.0)</div>
                          <p className="text-xs text-gray-400">{item.tinggi}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === CTA === */}
          <section className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black text-gray-900 mb-3">Sudah Paham?</h2>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
              Langsung coba sistemnya dan lihat sendiri bagaimana rekomendasi bekerja berdasarkan preferensi kamu.
            </p>
            <Link
              href="/recommend"
              className="inline-flex items-center gap-2 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-base rounded-md transition-colors"
            >
              Coba Rekomendasi Sekarang
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 bg-amber-600 rounded flex items-center justify-center">
              <span className="text-white font-black" style={{ fontSize: "9px" }}>C</span>
            </div>
            <span className="text-xs font-semibold text-gray-400">CariBanMu</span>
          </Link>
          <p className="text-xs text-gray-300">
            Sistem Rekomendasi Ban Motor · Next.js & Firebase
          </p>
        </div>
      </footer>

    </div>
  );
}