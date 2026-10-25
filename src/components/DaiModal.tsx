import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { DaiUtusan, PulauWilayah, KategoriWilayah, StatusTugas } from '../types/dai';
import { DAFTAR_PULAU, DAFTAR_KATEGORI, DAFTAR_STATUS_TUGAS } from '../data/initialData';

interface DaiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dai: DaiUtusan) => void;
  editingDai: DaiUtusan | null;
}

export const DaiModal: React.FC<DaiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingDai,
}) => {
  const [formData, setFormData] = useState({
    nama: '',
    gelar: '',
    telepon: '',
    asalDaerah: '',
    asalLembaga: '',
    pulau: 'Sumatera' as PulauWilayah,
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    titikDakwah: '',
    kategoriWilayah: 'Pedalaman / Suku Terpencil' as KategoriWilayah,
    tanggalMulaiTugas: new Date().toISOString().slice(0, 10),
    durasiKontrakBulan: 24,
    statusTugas: 'Aktif' as StatusTugas,
    programFokus: ['Pendidikan Al-Qur\'an / TPQ', 'Pembinaan Muallaf'],
    honorKafalah: 3500000,
    operasionalTransport: 1500000,
    saranaDakwah: 700000,
    tunjanganKesehatanLogistik: 500000,
    sumberDonatur: 'Infaq Kaum Muslimin',
    rekeningBank: '',
    jamaahAwal: 20,
    jamaahKini: 20,
    jumlahMualaf: 5,
    jumlahSantriTPQ: 15,
    frekuensiKajianMingguan: 4,
    catatanProgresTerbaru: 'Mulai perintisan halaqah dan silaturahmi tokoh adat.',
    kendalaLapangan: 'Akses jalan tanah dan sinyal terbatas.',
  });

  const [newProgram, setNewProgram] = useState('');

  useEffect(() => {
    if (editingDai) {
      setFormData({
        nama: editingDai.nama,
        gelar: editingDai.gelar || '',
        telepon: editingDai.telepon,
        asalDaerah: editingDai.asalDaerah || '',
        asalLembaga: editingDai.asalLembaga || '',
        pulau: editingDai.pulau,
        provinsi: editingDai.provinsi,
        kabupaten: editingDai.kabupaten,
        kecamatan: editingDai.kecamatan,
        titikDakwah: editingDai.titikDakwah,
        kategoriWilayah: editingDai.kategoriWilayah,
        tanggalMulaiTugas: editingDai.tanggalMulaiTugas,
        durasiKontrakBulan: editingDai.durasiKontrakBulan,
        statusTugas: editingDai.statusTugas,
        programFokus: editingDai.programFokus || [],
        honorKafalah: editingDai.dana.honorKafalah,
        operasionalTransport: editingDai.dana.operasionalTransport,
        saranaDakwah: editingDai.dana.saranaDakwah,
        tunjanganKesehatanLogistik: editingDai.dana.tunjanganKesehatanLogistik,
        sumberDonatur: editingDai.dana.sumberDonatur,
        rekeningBank: editingDai.dana.rekeningBank || '',
        jamaahAwal: editingDai.tren.jamaahAwal,
        jamaahKini: editingDai.tren.jamaahKini,
        jumlahMualaf: editingDai.tren.jumlahMualaf,
        jumlahSantriTPQ: editingDai.tren.jumlahSantriTPQ,
        frekuensiKajianMingguan: editingDai.tren.frekuensiKajianMingguan,
        catatanProgresTerbaru: editingDai.tren.catatanProgresTerbaru,
        kendalaLapangan: editingDai.tren.kendalaLapangan,
      });
    } else {
      setFormData({
        nama: '',
        gelar: '',
        telepon: '',
        asalDaerah: '',
        asalLembaga: 'Biro Dakwah Pedalaman Nusantara',
        pulau: 'Sumatera',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        titikDakwah: '',
        kategoriWilayah: 'Pedalaman / Suku Terpencil',
        tanggalMulaiTugas: new Date().toISOString().slice(0, 10),
        durasiKontrakBulan: 24,
        statusTugas: 'Aktif',
        programFokus: ['Pendidikan Al-Qur\'an / TPQ', 'Pembinaan Muallaf'],
        honorKafalah: 3500000,
        operasionalTransport: 1500000,
        saranaDakwah: 700000,
        tunjanganKesehatanLogistik: 500000,
        sumberDonatur: 'Infaq Kaum Muslimin',
        rekeningBank: '',
        jamaahAwal: 20,
        jamaahKini: 20,
        jumlahMualaf: 5,
        jumlahSantriTPQ: 15,
        frekuensiKajianMingguan: 4,
        catatanProgresTerbaru: 'Mulai perintisan halaqah dan silaturahmi tokoh adat.',
        kendalaLapangan: 'Akses jalan tanah dan sinyal terbatas.',
      });
    }
  }, [editingDai, isOpen]);

  if (!isOpen) return null;

  const handleAddProgram = () => {
    if (!newProgram.trim()) return;
    if (!formData.programFokus.includes(newProgram.trim())) {
      setFormData({
        ...formData,
        programFokus: [...formData.programFokus, newProgram.trim()],
      });
    }
    setNewProgram('');
  };

  const handleRemoveProgram = (item: string) => {
    setFormData({
      ...formData,
      programFokus: formData.programFokus.filter((p) => p !== item),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalKebutuhan = 
      Number(formData.honorKafalah) + 
      Number(formData.operasionalTransport) + 
      Number(formData.saranaDakwah) + 
      Number(formData.tunjanganKesehatanLogistik);

    const generatedId = editingDai
      ? editingDai.id
      : `dai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    const newDai: DaiUtusan = {
      id: generatedId,
      nama: formData.nama.trim(),
      gelar: formData.gelar.trim() || undefined,
      telepon: formData.telepon.trim() || '-',
      asalDaerah: formData.asalDaerah.trim() || formData.asalLembaga.trim() || 'Indonesia',
      asalLembaga: formData.asalLembaga.trim() || 'Biro Dakwah Pedalaman Nusantara',
      pulau: formData.pulau,
      provinsi: formData.provinsi.trim() || 'Sumatera Barat',
      kabupaten: formData.kabupaten.trim() || 'Daerah 3T',
      kecamatan: formData.kecamatan.trim() || 'Kecamatan Penugasan',
      titikDakwah: formData.titikDakwah.trim() || 'Posko Dakwah Utama',
      kategoriWilayah: formData.kategoriWilayah,
      tanggalMulaiTugas: formData.tanggalMulaiTugas,
      durasiKontrakBulan: Number(formData.durasiKontrakBulan) || 12,
      statusTugas: formData.statusTugas,
      programFokus: formData.programFokus,
      dana: {
        honorKafalah: Number(formData.honorKafalah) || 0,
        operasionalTransport: Number(formData.operasionalTransport) || 0,
        saranaDakwah: Number(formData.saranaDakwah) || 0,
        tunjanganKesehatanLogistik: Number(formData.tunjanganKesehatanLogistik) || 0,
        totalKebutuhanPerBulan: totalKebutuhan,
        danaTersalurkan: editingDai ? editingDai.dana.danaTersalurkan : totalKebutuhan,
        statusPencairan: editingDai ? editingDai.dana.statusPencairan : 'Tersalurkan Penuh',
        sumberDonatur: formData.sumberDonatur.trim() || 'Infaq Kaum Muslimin',
        rekeningBank: formData.rekeningBank.trim(),
        catatanDana: editingDai?.dana.catatanDana || '',
      },
      tren: {
        jamaahAwal: Number(formData.jamaahAwal) || 0,
        jamaahKini: Number(formData.jamaahKini) || 0,
        jumlahMualaf: Number(formData.jumlahMualaf) || 0,
        jumlahSantriTPQ: Number(formData.jumlahSantriTPQ) || 0,
        frekuensiKajianMingguan: Number(formData.frekuensiKajianMingguan) || 0,
        catatanProgresTerbaru: formData.catatanProgresTerbaru.trim(),
        kendalaLapangan: formData.kendalaLapangan.trim(),
        riwayatBulanan: editingDai?.tren.riwayatBulanan || [
          {
            bulan: 'Bulan Pertama',
            jamaah: Number(formData.jamaahAwal) || 0,
            santriTPQ: Number(formData.jumlahSantriTPQ) || 0,
            danaTersalur: totalKebutuhan,
            catatanKegiatan: 'Pemberangkatan awal dan orientasi lapangan',
          },
        ],
        terakhirUpdate: new Date().toISOString().slice(0, 10),
      },
    };

    onSave(newDai);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-xl border border-slate-200 max-w-2xl w-full shadow-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {editingDai ? 'Edit Data Da\'i Utusan' : 'Tambah Da\'i Utusan Baru'}
            </h2>
            <p className="text-xs text-slate-500">
              Masukkan identitas, wilayah penempatan dakwah di Indonesia, serta alokasi dana
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-900">
          {/* Section 1: Identitas Da'i */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Identitas Da'i &amp; Lembaga
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">Nama Lengkap Da'i *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ustadz Ahmad Fauzi"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Gelar / Pendidikan</label>
                <input
                  type="text"
                  placeholder="Contoh: S.Pd.I / Lc. / S.Ag"
                  value={formData.gelar}
                  onChange={(e) => setFormData({ ...formData, gelar: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  type="text"
                  placeholder="0812-xxxx-xxxx"
                  value={formData.telepon}
                  onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Asal Daerah (Kota / Provinsi Asal Da'i) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Padang, Sumatera Barat / Solo, Jateng"
                  value={formData.asalDaerah}
                  onChange={(e) => setFormData({ ...formData, asalDaerah: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Asal Lembaga / Ormas Pengutus</label>
                <input
                  type="text"
                  placeholder="Contoh: Dewan Dakwah / Pesantren / Yayasan Bina Umat"
                  value={formData.asalLembaga}
                  onChange={(e) => setFormData({ ...formData, asalLembaga: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Wilayah Penempatan */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. Wilayah Penugasan di Indonesia
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Pulau Wilayah *</label>
                <select
                  value={formData.pulau}
                  onChange={(e) => setFormData({ ...formData, pulau: e.target.value as PulauWilayah })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                >
                  {DAFTAR_PULAU.filter((p) => p !== 'Semua Pulau').map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Provinsi Pengutusan (Tempat Diutus) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Papua Barat / Kalimantan Utara"
                  value={formData.provinsi}
                  onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Kabupaten / Kota *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kepulauan Mentawai"
                  value={formData.kabupaten}
                  onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tempat Pengutusan / Titik Dakwah (Cantumkan Nama Posko &amp; Provinsinya) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dusun Rogdok, Prov. Sumatera Barat"
                  value={formData.titikDakwah}
                  onChange={(e) => setFormData({ ...formData, titikDakwah: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Kategori Wilayah</label>
                <select
                  value={formData.kategoriWilayah}
                  onChange={(e) => setFormData({ ...formData, kategoriWilayah: e.target.value as KategoriWilayah })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                >
                  {DAFTAR_KATEGORI.filter((k) => k !== 'Semua Kategori').map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Status Penugasan</label>
                <select
                  value={formData.statusTugas}
                  onChange={(e) => setFormData({ ...formData, statusTugas: e.target.value as StatusTugas })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                >
                  {DAFTAR_STATUS_TUGAS.filter((s) => s !== 'Semua Status').map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Alokasi Anggaran Bulanan */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              3. Alokasi Dana Operasional / Bulan (Rp)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Honor Kafalah Pokok *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="50000"
                  value={formData.honorKafalah}
                  onChange={(e) => setFormData({ ...formData, honorKafalah: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Transport Medan / Sewa Perahu *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="50000"
                  value={formData.operasionalTransport}
                  onChange={(e) => setFormData({ ...formData, operasionalTransport: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Sarana Dakwah (Mushaf &amp; Iqra)</label>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={formData.saranaDakwah}
                  onChange={(e) => setFormData({ ...formData, saranaDakwah: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Tunjangan Logistik / P3K</label>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={formData.tunjanganKesehatanLogistik}
                  onChange={(e) => setFormData({ ...formData, tunjanganKesehatanLogistik: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Sumber Donatur</label>
                <input
                  type="text"
                  placeholder="Contoh: Donatur Tetap / BSI / CSR"
                  value={formData.sumberDonatur}
                  onChange={(e) => setFormData({ ...formData, sumberDonatur: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Rekening Bank Da'i</label>
                <input
                  type="text"
                  placeholder="Contoh: BSI 7123456789 an Ahmad Fauzi"
                  value={formData.rekeningBank}
                  onChange={(e) => setFormData({ ...formData, rekeningBank: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Data Awal Tren Dakwah */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              4. Data Tren Jamaah Binaan
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Jamaah Awal</label>
                <input
                  type="number"
                  min="0"
                  value={formData.jamaahAwal}
                  onChange={(e) => setFormData({ ...formData, jamaahAwal: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Jamaah Kini</label>
                <input
                  type="number"
                  min="0"
                  value={formData.jamaahKini}
                  onChange={(e) => setFormData({ ...formData, jamaahKini: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Santri TPQ</label>
                <input
                  type="number"
                  min="0"
                  value={formData.jumlahSantriTPQ}
                  onChange={(e) => setFormData({ ...formData, jumlahSantriTPQ: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Mualaf Terbina</label>
                <input
                  type="number"
                  min="0"
                  value={formData.jumlahMualaf}
                  onChange={(e) => setFormData({ ...formData, jumlahMualaf: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 tabular-nums shadow-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">Kendala Medan Lapangan</label>
              <textarea
                rows={2}
                value={formData.kendalaLapangan}
                onChange={(e) => setFormData({ ...formData, kendalaLapangan: e.target.value })}
                placeholder="Misal: Gelombang laut musim barat, jalan berlumpur, sinyal telepon minim..."
                className="w-full px-3 py-2 text-xs bg-white text-slate-900 font-medium placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-sm"
            >
              {editingDai ? 'Simpan Perubahan' : 'Tambahkan Da\'i'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
