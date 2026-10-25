export type KategoriWilayah = 
  | '3T (Terdepan, Terluar, Tertinggal)'
  | 'Pedalaman / Suku Terpencil'
  | 'Perbatasan Antar Negara'
  | 'Pesisir & Kepulauan Terluar'
  | 'Urban / Komunitas Marjinal';

export type PulauWilayah = 
  | 'Sumatera'
  | 'Jawa'
  | 'Kalimantan'
  | 'Sulawesi'
  | 'Bali & Nusa Tenggara'
  | 'Maluku'
  | 'Papua';

export type StatusTugas = 'Aktif' | 'Persiapan' | 'Cuti / Istirahat' | 'Selesai';

export type StatusDana = 'Tersalurkan Penuh' | 'Tersalurkan Sebagian' | 'Menunggu Pencairan' | 'Butuh Donatur';

export interface RiwayatBulanan {
  bulan: string; // e.g. "Jul 2026", "Agt 2026", etc.
  jamaah: number;
  santriTPQ: number;
  danaTersalur: number;
  catatanKegiatan: string;
}

export interface AlokasiDana {
  honorKafalah: number; // Kafalah pokok da'i
  operasionalTransport: number; // Transportasi medan sulit (perahu, sewa motor trail, bbm)
  saranaDakwah: number; // Buku Iqro, Al-Qur'an, sound system portable, papan tulis
  tunjanganKesehatanLogistik: number; // Logistik sembako & perlengkapan P3K
  totalKebutuhanPerBulan: number;
  danaTersalurkan: number;
  statusPencairan: StatusDana;
  sumberDonatur: string; // nama yayasan, donatur tetap, zakat, infaq umum
  catatanDana?: string;
  rekeningBank?: string;
}

export interface TrenPerkembangan {
  jamaahAwal: number;
  jamaahKini: number;
  jumlahMualaf: number;
  jumlahSantriTPQ: number;
  frekuensiKajianMingguan: number;
  catatanProgresTerbaru: string;
  kendalaLapangan: string;
  riwayatBulanan: RiwayatBulanan[];
  terakhirUpdate: string;
}

export interface DaiUtusan {
  id: string;
  nama: string;
  gelar?: string;
  telepon: string;
  asalDaerah: string; // Asal daerah / kota asal pengutus
  asalLembaga?: string; // Lembaga pengutus
  pulau: PulauWilayah;
  provinsi: string; // Provinsi tempat diutus
  kabupaten: string;
  kecamatan: string;
  titikDakwah: string;
  kategoriWilayah: KategoriWilayah;
  tanggalMulaiTugas: string;
  durasiKontrakBulan: number;
  statusTugas: StatusTugas;
  programFokus: string[];
  dana: AlokasiDana;
  tren: TrenPerkembangan;
}

export interface FilterState {
  searchQuery: string;
  pulau: string;
  kategori: string;
  statusTugas: string;
  statusDana: string;
}

export interface TombolConfig {
  tampilkanAksiCepatDana: boolean;
  tampilkanAksiUpdateTren: boolean;
  tampilkanTombolCetak: boolean;
  tampilkanTombolEkspor: boolean;
  tampilkanFilterKategori: boolean;
  modeTampilanKompak: boolean;
}

export interface Korwil {
  id: string;
  kodeWilayah: string;
  namaWilayah: string;
  namaKoordinator: string;
  gelar: string;
  telepon: string;
  email: string;
  poskoInduk: string;
  provinsiCakupan: string[];
  jumlahDaiSupervisi: number;
  jumlahTitik3T: number;
  frekuensiLaporan: string;
  kanalKomunikasi: string;
  statusOperasional: 'Siaga Penuh' | 'Operasi Rutin' | 'Siaga Bencana Cuaca';
  fokusStrategis: string;
}
