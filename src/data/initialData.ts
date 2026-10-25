import { DaiUtusan, TombolConfig, Korwil } from '../types/dai';

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRupiahSingkat(value: number): string {
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toFixed(1)} M`;
  }
  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(1)} Jt`;
  }
  if (value >= 1_000) {
    return `Rp ${(value / 1_000).toFixed(0)} Rb`;
  }
  return `Rp ${value}`;
}

export function hitungPersenTersalur(tersalur: number, butuh: number): number {
  if (butuh <= 0) return 100;
  return Math.min(100, Math.round((tersalur / butuh) * 100));
}

export function hitungPertumbuhan(awal: number, kini: number): { persen: number; delta: number } {
  const delta = kini - awal;
  if (awal === 0) return { persen: kini > 0 ? 100 : 0, delta };
  const persen = Math.round(((kini - awal) / awal) * 100);
  return { persen, delta };
}

export const INITIAL_DAI_LIST: DaiUtusan[] = [
  {
    id: 'dai-001',
    nama: 'Ustadz Ahmad Fauzi Ridwan',
    gelar: 'S.Pd.I',
    telepon: '0812-3489-1201',
    asalDaerah: 'Padang, Sumatera Barat',
    asalLembaga: 'Dewan Dakwah Islamiyah',
    pulau: 'Sumatera',
    provinsi: 'Sumatera Barat',
    kabupaten: 'Kepulauan Mentawai',
    kecamatan: 'Siberut Selatan',
    titikDakwah: 'Dusun Rogdok & Tiop',
    kategoriWilayah: 'Pedalaman / Suku Terpencil',
    tanggalMulaiTugas: '2025-08-01',
    durasiKontrakBulan: 24,
    statusTugas: 'Aktif',
    programFokus: ['Pembinaan Muallaf', 'TPQ Anak-Anak', 'Pendampingan Pertanian Padi'],
    dana: {
      honorKafalah: 3500000,
      operasionalTransport: 1800000,
      saranaDakwah: 700000,
      tunjanganKesehatanLogistik: 500000,
      totalKebutuhanPerBulan: 6500000,
      danaTersalurkan: 6500000,
      statusPencairan: 'Tersalurkan Penuh',
      sumberDonatur: 'Zakat PT Agro Makmur',
      catatanDana: 'Transportasi perahu pompong sungai Siberut membutuhkan BBM khusus.',
      rekeningBank: 'BSI 7123984129 an Ahmad Fauzi',
    },
    tren: {
      jamaahAwal: 18,
      jamaahKini: 62,
      jumlahMualaf: 24,
      jumlahSantriTPQ: 38,
      frekuensiKajianMingguan: 5,
      catatanProgresTerbaru: 'Musholla Al-Ikhlas dusun Rogdok telah selesai direnovasi atapnya. 14 anak baru lancar membaca Iqra 3.',
      kendalaLapangan: 'Jalur sungai sering surut di musim kemarau, memerlukan jalan kaki melintasi hutan 3 jam.',
      riwayatBulanan: [
        { bulan: 'Mei 2026', jamaah: 48, santriTPQ: 28, danaTersalur: 6500000, catatanKegiatan: 'Kajian pekanan muallaf dan pembagian mushaf' },
        { bulan: 'Jun 2026', jamaah: 54, santriTPQ: 32, danaTersalur: 6500000, catatanKegiatan: 'Penyembelihan hewan qurban dan bakti sosial' },
        { bulan: 'Jul 2026', jamaah: 58, santriTPQ: 35, danaTersalur: 6500000, catatanKegiatan: 'Pembentukan kelas TPQ remaja putra' },
        { bulan: 'Agt 2026', jamaah: 62, santriTPQ: 38, danaTersalur: 6500000, catatanKegiatan: 'Wisuda santri khatam Iqra jilid 6' },
      ],
      terakhirUpdate: '2026-08-20',
    },
  },
  {
    id: 'dai-002',
    nama: 'Ustadz Fathurrahman Al-Papuani',
    gelar: 'Lc.',
    telepon: '0852-7819-4412',
    asalDaerah: 'Jayapura, Papua',
    asalLembaga: 'Biro Dakwah Nusantara',
    pulau: 'Papua',
    provinsi: 'Papua Pegunungan',
    kabupaten: 'Jayawijaya',
    kecamatan: 'Kurulu',
    titikDakwah: 'Kampung Jiwika & Lembah Baliem',
    kategoriWilayah: 'Pedalaman / Suku Terpencil',
    tanggalMulaiTugas: '2025-10-15',
    durasiKontrakBulan: 36,
    statusTugas: 'Aktif',
    programFokus: ['Pendidikan Al-Qur\'an', 'Kesehatan Keluarga', 'Pemberdayaan Kebun Ubi'],
    dana: {
      honorKafalah: 4000000,
      operasionalTransport: 2500000,
      saranaDakwah: 1000000,
      tunjanganKesehatanLogistik: 800000,
      totalKebutuhanPerBulan: 8300000,
      danaTersalurkan: 8300000,
      statusPencairan: 'Tersalurkan Penuh',
      sumberDonatur: 'Komunitas Donatur Jakarta Peduli',
      catatanDana: 'Harga bahan pokok dan logistik di pedalaman Papua tinggi.',
      rekeningBank: 'Mandiri 1420098127361 an Fathurrahman',
    },
    tren: {
      jamaahAwal: 12,
      jamaahKini: 45,
      jumlahMualaf: 19,
      jumlahSantriTPQ: 29,
      frekuensiKajianMingguan: 4,
      catatanProgresTerbaru: 'Program rumah belajar Qur\'an Kampung Jiwika diikuti oleh pemuda suku Dani yang ramah dan antusias.',
      kendalaLapangan: 'Ketiadaan listrik PLN, bergantung pada panel surya 100 watt untuk penerangan malam.',
      riwayatBulanan: [
        { bulan: 'Mei 2026', jamaah: 32, santriTPQ: 20, danaTersalur: 8300000, catatanKegiatan: 'Pemeriksaan kesehatan gratis dan kajian fiqih wudhu' },
        { bulan: 'Jun 2026', jamaah: 36, santriTPQ: 22, danaTersalur: 8300000, catatanKegiatan: 'Panen ubi madu bersama warga kampung' },
        { bulan: 'Jul 2026', jamaah: 40, santriTPQ: 26, danaTersalur: 8300000, catatanKegiatan: 'Penambahan sarana papan tulis dan tikar sholat' },
        { bulan: 'Agt 2026', jamaah: 45, santriTPQ: 29, danaTersalur: 8300000, catatanKegiatan: 'Pemberian baju muslim dan jilbab bagi ibu-ibu mualaf' },
      ],
      terakhirUpdate: '2026-08-25',
    },
  },
  {
    id: 'dai-003',
    nama: 'Ustadz Muhsin Al-Banjari',
    gelar: 'S.Sos.I',
    telepon: '0821-6677-8899',
    asalDaerah: 'Banjarmasin, Kalimantan Selatan',
    asalLembaga: 'Yayasan Bina Da\'i Perbatasan',
    pulau: 'Kalimantan',
    provinsi: 'Kalimantan Utara',
    kabupaten: 'Nunukan',
    kecamatan: 'Krayan Selatan',
    titikDakwah: 'Desa Long Layu (Garis Batas Sabah-Sarawak)',
    kategoriWilayah: 'Perbatasan Antar Negara',
    tanggalMulaiTugas: '2025-06-10',
    durasiKontrakBulan: 24,
    statusTugas: 'Aktif',
    programFokus: ['Bimbingan Muallaf', 'Pembinaan Warga Perbatasan', 'Koperasi Beras Adan'],
    dana: {
      honorKafalah: 3750000,
      operasionalTransport: 2200000,
      saranaDakwah: 800000,
      tunjanganKesehatanLogistik: 600000,
      totalKebutuhanPerBulan: 7350000,
      danaTersalurkan: 5000000,
      statusPencairan: 'Tersalurkan Sebagian',
      sumberDonatur: 'Infaq Kaum Muslimin & Donatur Rutin',
      catatanDana: 'Masih kekurangan Rp 2.350.000 untuk bulan berjalan karena biaya carter pesawat perintis tinggi.',
      rekeningBank: 'BSI 7891230045 an Muhsin',
    },
    tren: {
      jamaahAwal: 25,
      jamaahKini: 78,
      jumlahMualaf: 15,
      jumlahSantriTPQ: 46,
      frekuensiKajianMingguan: 6,
      catatanProgresTerbaru: 'Jamaah sholat berjamaah 5 waktu di Posko Dakwah Perbatasan meningkat konsisten.',
      kendalaLapangan: 'Akses hanya bisa ditempuh pesawat terbang perintis MAF/Susi Air dari Tarakan.',
      riwayatBulanan: [
        { bulan: 'Mei 2026', jamaah: 65, santriTPQ: 38, danaTersalur: 7350000, catatanKegiatan: 'Kajian akidah dasar dan pembagian sembako perbatasan' },
        { bulan: 'Jun 2026', jamaah: 70, santriTPQ: 40, danaTersalur: 7350000, catatanKegiatan: 'Pelatihan tata cara sholat jenazah bagi warga' },
        { bulan: 'Jul 2026', jamaah: 74, santriTPQ: 42, danaTersalur: 5000000, catatanKegiatan: 'Penyaluran zakat produktif beras krayan' },
        { bulan: 'Agt 2026', jamaah: 78, santriTPQ: 46, danaTersalur: 5000000, catatanKegiatan: 'Pembukaan kelas tahfidz juz amma anak-anak' },
      ],
      terakhirUpdate: '2026-08-28',
    },
  },
  {
    id: 'dai-004',
    nama: 'Ustadz Syamsul Bahri Tidore',
    gelar: 'S.Th.I',
    telepon: '0813-9022-3145',
    asalDaerah: 'Tidore, Maluku Utara',
    asalLembaga: 'Lembaga Dakwah Kepulauan',
    pulau: 'Maluku',
    provinsi: 'Maluku Utara',
    kabupaten: 'Pulau Morotai',
    kecamatan: 'Morotai Selatan Barat',
    titikDakwah: 'Desa Tutuhu & Pulau Ngele-Ngele',
    kategoriWilayah: 'Pesisir & Kepulauan Terluar',
    tanggalMulaiTugas: '2025-11-01',
    durasiKontrakBulan: 24,
    statusTugas: 'Aktif',
    programFokus: ['Dakwah Maritim & Nelayan', 'Kajian Ibu-Ibu Pesisir', 'Pemberantasan Buta Huruf Al-Qur\'an'],
    dana: {
      honorKafalah: 3200000,
      operasionalTransport: 1500000,
      saranaDakwah: 600000,
      tunjanganKesehatanLogistik: 500000,
      totalKebutuhanPerBulan: 5800000,
      danaTersalurkan: 5800000,
      statusPencairan: 'Tersalurkan Penuh',
      sumberDonatur: 'Yayasan Wakaf Samudra',
      catatanDana: 'Transportasi speedboat antar pulau karang aman dan terjadwal.',
      rekeningBank: 'BRI 019283746192 an Syamsul Bahri',
    },
    tren: {
      jamaahAwal: 30,
      jamaahKini: 88,
      jumlahMualaf: 8,
      jumlahSantriTPQ: 55,
      frekuensiKajianMingguan: 7,
      catatanProgresTerbaru: 'Para nelayan pulau Ngele-Ngele kini rutin menggelar doa bersama dan kajian bada shubuh sebelum melaut.',
      kendalaLapangan: 'Gelombang laut musim barat membuat penyeberangan terkadang harus ditunda 2-3 hari.',
      riwayatBulanan: [
        { bulan: 'Mei 2026', jamaah: 72, santriTPQ: 45, danaTersalur: 5800000, catatanKegiatan: 'Pembentukan kelompok taklim nelayan teluk' },
        { bulan: 'Jun 2026', jamaah: 78, santriTPQ: 48, danaTersalur: 5800000, catatanKegiatan: 'Bantuan pelampung keselamatan dan kitab doa melaut' },
        { bulan: 'Jul 2026', jamaah: 82, santriTPQ: 50, danaTersalur: 5800000, catatanKegiatan: 'Perlombaan adzan dan hafalan surat pendek antar pulau' },
        { bulan: 'Agt 2026', jamaah: 88, santriTPQ: 55, danaTersalur: 5800000, catatanKegiatan: 'Kajian fiqih muamalah jual beli hasil laut halal' },
      ],
      terakhirUpdate: '2026-08-22',
    },
  },
  {
    id: 'dai-005',
    nama: 'Ustadz Ilham Pratama Lembata',
    gelar: 'S.Ag',
    telepon: '0812-4411-9988',
    asalDaerah: 'Solo, Jawa Tengah',
    asalLembaga: 'Peduli Muallaf Flobamora',
    pulau: 'Bali & Nusa Tenggara',
    provinsi: 'Nusa Tenggara Timur',
    kabupaten: 'Lembata',
    kecamatan: 'Buyasuri',
    titikDakwah: 'Desa Atan Gane & Lereng Gunung Ile Ape',
    kategoriWilayah: '3T (Terdepan, Terluar, Tertinggal)',
    tanggalMulaiTugas: '2025-09-01',
    durasiKontrakBulan: 24,
    statusTugas: 'Aktif',
    programFokus: ['Penyediaan Air Bersih Dakwah', 'TPQ Ramah Anak', 'Penguatan Aqidah Muallaf'],
    dana: {
      honorKafalah: 3200000,
      operasionalTransport: 1400000,
      saranaDakwah: 900000,
      tunjanganKesehatanLogistik: 500000,
      totalKebutuhanPerBulan: 6000000,
      danaTersalurkan: 6000000,
      statusPencairan: 'Tersalurkan Penuh',
      sumberDonatur: 'CSR Bank Syariah Indonesia',
      catatanDana: 'Penyaluran dana bulan ini tepat waktu untuk pembelian pipa air musholla.',
      rekeningBank: 'BSI 8820019283 an Ilham Pratama',
    },
    tren: {
      jamaahAwal: 20,
      jamaahKini: 68,
      jumlahMualaf: 31,
      jumlahSantriTPQ: 42,
      frekuensiKajianMingguan: 4,
      catatanProgresTerbaru: 'Pipatisasi air wudhu mengalir lancar ke musholla darurat. Hubungan antar umat beragama di desa sangat harmonis.',
      kendalaLapangan: 'Kekeringan saat puncak kemarau dan jalan bebatuan terjal menuju lereng atas.',
      riwayatBulanan: [
        { bulan: 'Mei 2026', jamaah: 52, santriTPQ: 32, danaTersalur: 6000000, catatanKegiatan: 'Gotong royong pembersihan bak penampungan air' },
        { bulan: 'Jun 2026', jamaah: 58, santriTPQ: 35, danaTersalur: 6000000, catatanKegiatan: 'Kajian sakinah mawaddah warahmah keluarga binaan' },
        { bulan: 'Jul 2026', jamaah: 64, santriTPQ: 38, danaTersalur: 6000000, catatanKegiatan: 'Bantuan paket nutrisi balita dan vitamin' },
        { bulan: 'Agt 2026', jamaah: 68, santriTPQ: 42, danaTersalur: 6000000, catatanKegiatan: 'Peluncuran perpustakaan mini Islami desa' },
      ],
      terakhirUpdate: '2026-08-26',
    },
  },
  {
    id: 'dai-006',
    nama: 'Ustadz Wahyudi Al-Bontani',
    gelar: 'M.Ag',
    telepon: '0853-2211-7788',
    asalDaerah: 'Bontang, Kalimantan Timur',
    asalLembaga: 'Sahabat Suku Dayak Meratus',
    pulau: 'Kalimantan',
    provinsi: 'Kalimantan Selatan',
    kabupaten: 'Hulu Sungai Tengah',
    kecamatan: 'Batang Alai Timur',
    titikDakwah: 'Balai Adat Kiyu & Suku Dayak Meratus',
    kategoriWilayah: 'Pedalaman / Suku Terpencil',
    tanggalMulaiTugas: '2025-07-15',
    durasiKontrakBulan: 24,
    statusTugas: 'Aktif',
    programFokus: ['Pemberdayaan Gula Aren', 'Majelis Ta\'lim Muallaf Dayak', 'Literasi Huruf Hijaiyah'],
    dana: {
      honorKafalah: 3300000,
      operasionalTransport: 1600000,
      saranaDakwah: 600000,
      tunjanganKesehatanLogistik: 500000,
      totalKebutuhanPerBulan: 6000000,
      danaTersalurkan: 6000000,
      statusPencairan: 'Tersalurkan Penuh',
      sumberDonatur: 'Hamba Allah Surabaya',
      catatanDana: 'Dibutuhkan dana tambahan untuk perbaikan motor trail yang sering rusak di tanjakan berbatu.',
      rekeningBank: 'BNI 0987123450 an Wahyudi',
    },
    tren: {
      jamaahAwal: 15,
      jamaahKini: 53,
      jumlahMualaf: 28,
      jumlahSantriTPQ: 31,
      frekuensiKajianMingguan: 5,
      catatanProgresTerbaru: 'Koperasi binaan gula aren organik mulai memasok ke kota Barabai, menambah pendapatan warga.',
      kendalaLapangan: 'Jalan tanah becek setinggi lutut jika hujan deras, sinyal telekomunikasi nihil.',
      riwayatBulanan: [
        { bulan: 'Mei 2026', jamaah: 41, santriTPQ: 24, danaTersalur: 6000000, catatanKegiatan: 'Kajian rukun iman dan praktik sholat fardhu' },
        { bulan: 'Jun 2026', jamaah: 46, santriTPQ: 26, danaTersalur: 6000000, catatanKegiatan: 'Pelatihan pengolahan aren bersih dan higienis' },
        { bulan: 'Jul 2026', jamaah: 50, santriTPQ: 28, danaTersalur: 6000000, catatanKegiatan: 'Pemberian seragam mengaji untuk santri binaan' },
        { bulan: 'Agt 2026', jamaah: 53, santriTPQ: 31, danaTersalur: 6000000, catatanKegiatan: 'Peringatan kemerdekaan RI bersama warga adat' },
      ],
      terakhirUpdate: '2026-08-24',
    },
  },
  {
    id: 'dai-007',
    nama: 'Ustadz Zulkifli Harahap',
    gelar: 'S.Ud',
    telepon: '0812-8899-7711',
    asalDaerah: 'Medan, Sumatera Utara',
    asalLembaga: 'Inisiatif Dakwah Pulau Terluar',
    pulau: 'Sumatera',
    provinsi: 'Bengkulu',
    kabupaten: 'Bengkulu Utara',
    kecamatan: 'Enggano',
    titikDakwah: 'Desa Kaana & Meok, Pulau Enggano',
    kategoriWilayah: '3T (Terdepan, Terluar, Tertinggal)',
    tanggalMulaiTugas: '2026-01-10',
    durasiKontrakBulan: 12,
    statusTugas: 'Aktif',
    programFokus: ['Remaja Masjid Pesisir', 'Pelatihan Imam & Khatib', 'Kajian Fiqih Ibadah'],
    dana: {
      honorKafalah: 3000000,
      operasionalTransport: 1400000,
      saranaDakwah: 500000,
      tunjanganKesehatanLogistik: 400000,
      totalKebutuhanPerBulan: 5300000,
      danaTersalurkan: 0,
      statusPencairan: 'Menunggu Pencairan',
      sumberDonatur: 'Zakat Fitrah & Infaq Terpadu',
      catatanDana: 'Surat pencairan telah diajukan ke bendahara, menunggu verifikasi transfer bank.',
      rekeningBank: 'BSI 6712349081 an Zulkifli Harahap',
    },
    tren: {
      jamaahAwal: 35,
      jamaahKini: 72,
      jumlahMualaf: 6,
      jumlahSantriTPQ: 41,
      frekuensiKajianMingguan: 4,
      catatanProgresTerbaru: 'Pelatihan calon khatib muda diikuti 8 pemuda pulau Enggano yang berpotensi menjadi kader lokal.',
      kendalaLapangan: 'Jadwal kapal feri perintis dari pelabuhan Baai Bengkulu hanya 2 kali sepekan jika cuaca samudra tenang.',
      riwayatBulanan: [
        { bulan: 'Mei 2026', jamaah: 58, santriTPQ: 33, danaTersalur: 5300000, catatanKegiatan: 'Pembentukan ikatan remaja masjid desa Kaana' },
        { bulan: 'Jun 2026', jamaah: 62, santriTPQ: 36, danaTersalur: 5300000, catatanKegiatan: 'Kajian tajwid dasar untuk bapak-bapak' },
        { bulan: 'Jul 2026', jamaah: 68, santriTPQ: 39, danaTersalur: 5300000, catatanKegiatan: 'Kerja bakti pembersihan makam dan halaman masjid' },
        { bulan: 'Agt 2026', jamaah: 72, santriTPQ: 41, danaTersalur: 0, catatanKegiatan: 'Pelatihan adzan merdu dan tahsin juz 30' },
      ],
      terakhirUpdate: '2026-08-27',
    },
  },
  {
    id: 'dai-008',
    nama: 'Ustadz Mansyur Al-Makassari',
    gelar: 'S.Sos',
    telepon: '0852-3344-5566',
    asalDaerah: 'Makassar, Sulawesi Selatan',
    asalLembaga: 'Bina Umat Kepulauan',
    pulau: 'Sulawesi',
    provinsi: 'Sulawesi Tengah',
    kabupaten: 'Banggai Laut',
    kecamatan: 'Bokan Kepulauan',
    titikDakwah: 'Dusun Toropot & Pulau Timpaus',
    kategoriWilayah: 'Pesisir & Kepulauan Terluar',
    tanggalMulaiTugas: '2026-02-01',
    durasiKontrakBulan: 18,
    statusTugas: 'Aktif',
    programFokus: ['Suku Bajo Nomaden', 'Pengajaran Sholat', 'Sanitasi Sehat Dusun Laut'],
    dana: {
      honorKafalah: 3200000,
      operasionalTransport: 1600000,
      saranaDakwah: 700000,
      tunjanganKesehatanLogistik: 500000,
      totalKebutuhanPerBulan: 6000000,
      danaTersalurkan: 0,
      statusPencairan: 'Butuh Donatur',
      sumberDonatur: 'Belum Ada Donatur Tetap',
      catatanDana: 'Sangat membutuhkan orang tua asuh dakwah atau donatur tetap untuk menjamin operasional perahu dakwah Bajo.',
      rekeningBank: 'BRI 332211009988 an Mansyur',
    },
    tren: {
      jamaahAwal: 22,
      jamaahKini: 49,
      jumlahMualaf: 12,
      jumlahSantriTPQ: 35,
      frekuensiKajianMingguan: 4,
      catatanProgresTerbaru: 'Anak-anak suku Bajo sangat gemar mengaji di atas perahu kayu yang dijadikan musholla terapung.',
      kendalaLapangan: 'Bahan bakar solar mahal di kepulauan terluar, belum ada donatur tetap untuk kafalah bulanan.',
      riwayatBulanan: [
        { bulan: 'Mei 2026', jamaah: 35, santriTPQ: 22, danaTersalur: 6000000, catatanKegiatan: 'Kunjungan silaturahmi ke rumah panggung laut' },
        { bulan: 'Jun 2026', jamaah: 40, santriTPQ: 26, danaTersalur: 6000000, catatanKegiatan: 'Pembagian sarung dan sajadah anak' },
        { bulan: 'Jul 2026', jamaah: 44, santriTPQ: 30, danaTersalur: 3000000, catatanKegiatan: 'Bimbingan bersuci dan wudhu hemat air tawar' },
        { bulan: 'Agt 2026', jamaah: 49, santriTPQ: 35, danaTersalur: 0, catatanKegiatan: 'Kajian sirah nabawiyah kisah para nabi di lautan' },
      ],
      terakhirUpdate: '2026-08-25',
    },
  },
];

export const DAFTAR_PULAU = [
  'Semua Pulau',
  'Sumatera',
  'Jawa',
  'Kalimantan',
  'Sulawesi',
  'Bali & Nusa Tenggara',
  'Maluku',
  'Papua',
];

export const DAFTAR_KATEGORI = [
  'Semua Kategori',
  '3T (Terdepan, Terluar, Tertinggal)',
  'Pedalaman / Suku Terpencil',
  'Perbatasan Antar Negara',
  'Pesisir & Kepulauan Terluar',
  'Urban / Komunitas Marjinal',
];

export const DAFTAR_STATUS_TUGAS = [
  'Semua Status',
  'Aktif',
  'Persiapan',
  'Cuti / Istirahat',
  'Selesai',
];

export const DAFTAR_STATUS_DANA = [
  'Semua Status Dana',
  'Tersalurkan Penuh',
  'Tersalurkan Sebagian',
  'Menunggu Pencairan',
  'Butuh Donatur',
];

export const DEFAULT_TOMBOL_CONFIG: TombolConfig = {
  tampilkanAksiCepatDana: true,
  tampilkanAksiUpdateTren: true,
  tampilkanTombolCetak: true,
  tampilkanTombolEkspor: true,
  tampilkanFilterKategori: true,
  modeTampilanKompak: false,
};

// Storage helper functions
const STORAGE_KEY_DAI = 'simdai_utusan_database_v1';
const STORAGE_KEY_CONFIG = 'simdai_tombol_config_v1';

export function loadDaiListFromStorage(): DaiUtusan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DAI);
    if (!raw) return INITIAL_DAI_LIST;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_DAI_LIST;
  } catch {
    return INITIAL_DAI_LIST;
  }
}

export function saveDaiListToStorage(list: DaiUtusan[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_DAI, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save dai list to localStorage', e);
  }
}

export function loadTombolConfig(): TombolConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) return DEFAULT_TOMBOL_CONFIG;
    return { ...DEFAULT_TOMBOL_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_TOMBOL_CONFIG;
  }
}

export function saveTombolConfig(config: TombolConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save button config to localStorage', e);
  }
}

export const INITIAL_KORWIL_LIST: Korwil[] = [
  {
    id: 'korwil-01',
    kodeWilayah: 'KORWIL-I',
    namaWilayah: 'Wilayah I — Sumatera & Kepulauan Samudra',
    namaKoordinator: 'Ustadz Dr. H. Marzuki Al-Azhari',
    gelar: 'M.A',
    telepon: '0812-7011-8899',
    email: 'korwil1.sumatera@sidau.id',
    poskoInduk: 'Padang / Posko Aju Siberut Mentawai',
    provinsiCakupan: ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kep. Riau', 'Bengkulu', 'Jambi', 'Sumatera Selatan', 'Kep. Bangka Belitung', 'Lampung'],
    jumlahDaiSupervisi: 24,
    jumlahTitik3T: 14,
    frekuensiLaporan: 'Harian 07:30 WIB & Rekap Tiap Jumat',
    kanalKomunikasi: 'Voice Relay, Radio SSB & WhatsApp Group',
    statusOperasional: 'Siaga Penuh',
    fokusStrategis: 'Penguatan Mualaf Suku Mentawai & Da\'i Pesisir Pulau Terluar Enggano',
  },
  {
    id: 'korwil-02',
    kodeWilayah: 'KORWIL-II',
    namaWilayah: 'Wilayah II — Jawa & Komunitas Marjinal',
    namaKoordinator: 'Ustadz H. Budi Santoso',
    gelar: 'Lc., M.Hum',
    telepon: '0811-9876-5432',
    email: 'korwil2.jawa@sidau.id',
    poskoInduk: 'Markas Komando Nasional Jakarta',
    provinsiCakupan: ['DKI Jakarta', 'Banten', 'Jawa Barat', 'Jawa Tengah', 'D.I. Yogyakarta', 'Jawa Timur'],
    jumlahDaiSupervisi: 22,
    jumlahTitik3T: 8,
    frekuensiLaporan: 'Harian 08:00 WIB (Pusat Komando)',
    kanalKomunikasi: 'VoIP SIM-DAU & Dedicated Command Line',
    statusOperasional: 'Operasi Rutin',
    fokusStrategis: 'Pemberdayaan Daerah Rawan Akidah & Kantong Kemiskinan Nelayan Pantura',
  },
  {
    id: 'korwil-03',
    kodeWilayah: 'KORWIL-III',
    namaWilayah: 'Wilayah III — Kalimantan & Garis Perbatasan Negara',
    namaKoordinator: 'Ustadz Syarifuddin Noor',
    gelar: 'S.Pd.I',
    telepon: '0821-5544-3322',
    email: 'korwil3.kalimantan@sidau.id',
    poskoInduk: 'Tarakan / Posko Aju Long Layu Krayan Nunukan',
    provinsiCakupan: ['Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara'],
    jumlahDaiSupervisi: 28,
    jumlahTitik3T: 16,
    frekuensiLaporan: 'Pagi 07:45 & Sore 17:30 WITA',
    kanalKomunikasi: 'Telepon Satelit Thuraya & Radio SSB Jalur Rimba',
    statusOperasional: 'Siaga Penuh',
    fokusStrategis: 'Penjagaan Akidah Batas Sabah/Sarawak & Pembinaan Suku Dayak Meratus',
  },
  {
    id: 'korwil-04',
    kodeWilayah: 'KORWIL-IV',
    namaWilayah: 'Wilayah IV — Sulawesi & Kepulauan Pesisir',
    namaKoordinator: 'Ustadz Dr. Irfan Al-Makassari',
    gelar: 'M.Ag',
    telepon: '0852-9900-1122',
    email: 'korwil4.sulawesi@sidau.id',
    poskoInduk: 'Makassar / Posko Laut Banggai Laut',
    provinsiCakupan: ['Sulawesi Selatan', 'Sulawesi Barat', 'Sulawesi Tengah', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Utara'],
    jumlahDaiSupervisi: 20,
    jumlahTitik3T: 11,
    frekuensiLaporan: 'Harian 08:15 WITA',
    kanalKomunikasi: 'Radio VHF Maritim & Seluler Posko',
    statusOperasional: 'Siaga Bencana Cuaca',
    fokusStrategis: 'Musholla Terapung Suku Bajo Nomaden & Da\'i Pegunungan Mamasa',
  },
  {
    id: 'korwil-05',
    kodeWilayah: 'KORWIL-V',
    namaWilayah: 'Wilayah V — Bali & Nusa Tenggara',
    namaKoordinator: 'Ustadz Nurhidayat Rahmat',
    gelar: 'S.Ag',
    telepon: '0813-3988-7711',
    email: 'korwil5.nusatenggara@sidau.id',
    poskoInduk: 'Kupang / Posko Aju Lembata',
    provinsiCakupan: ['Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur'],
    jumlahDaiSupervisi: 16,
    jumlahTitik3T: 9,
    frekuensiLaporan: 'Harian 18:30 WITA',
    kanalKomunikasi: 'Seluler & Radio Komunitas Lereng',
    statusOperasional: 'Operasi Rutin',
    fokusStrategis: 'Sanitasi Air Bersih Dakwah, TPQ Ramah Anak & Kerukunan Warga Lembata',
  },
  {
    id: 'korwil-06',
    kodeWilayah: 'KORWIL-VI',
    namaWilayah: 'Wilayah VI — Maluku & Maluku Utara',
    namaKoordinator: 'Ustadz M. Ridwan Tidore',
    gelar: 'S.Th.I',
    telepon: '0813-9022-4411',
    email: 'korwil6.maluku@sidau.id',
    poskoInduk: 'Ternate / Posko Pulau Morotai',
    provinsiCakupan: ['Maluku', 'Maluku Utara'],
    jumlahDaiSupervisi: 15,
    jumlahTitik3T: 8,
    frekuensiLaporan: 'Pagi 08:30 WIT',
    kanalKomunikasi: 'Radio Kelautan & Speedboat Relay',
    statusOperasional: 'Siaga Bencana Cuaca',
    fokusStrategis: 'Dakwah Maritim Pulau Karang, Morotai Terluar & Pembinaan Nelayan',
  },
  {
    id: 'korwil-07',
    kodeWilayah: 'KORWIL-VII',
    namaWilayah: 'Wilayah VII — Papua & Wilayah DOB',
    namaKoordinator: 'Ustadz Fathurrahman Al-Papuani',
    gelar: 'Lc.',
    telepon: '0852-7819-4412',
    email: 'korwil7.papua@sidau.id',
    poskoInduk: 'Jayapura / Posko Lembah Baliem Kurulu',
    provinsiCakupan: ['Papua', 'Papua Barat', 'Papua Selatan', 'Papua Tengah', 'Papua Pegunungan', 'Papua Barat Daya'],
    jumlahDaiSupervisi: 23,
    jumlahTitik3T: 10,
    frekuensiLaporan: 'Pagi 07:00 WIT & Sore 16:30 WIT',
    kanalKomunikasi: 'Solar-Powered Inmarsat & Radio Pesawat Perintis MAF',
    statusOperasional: 'Siaga Penuh',
    fokusStrategis: 'Rumah Belajar Qur\'an Suku Dani, Nutrisi Anak & Pangan Ubi Mandiri',
  },
];
