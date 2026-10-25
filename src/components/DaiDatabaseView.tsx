import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Building, 
  Filter, 
  Download, 
  Printer, 
  RotateCcw, 
  Users, 
  Eye, 
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { DaiUtusan } from '../types/dai';

interface DaiDatabaseViewProps {
  daiList: DaiUtusan[];
  onSelectDai: (dai: DaiUtusan) => void;
  onOpenAddModal: () => void;
  onOpenBulkImport: () => void;
  onOpenGoogleSheets?: () => void;
}

export const DaiDatabaseView: React.FC<DaiDatabaseViewProps> = ({
  daiList,
  onSelectDai,
  onOpenAddModal,
  onOpenBulkImport,
  onOpenGoogleSheets,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvinsi, setSelectedProvinsi] = useState('Semua Provinsi');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');

  // Pagination states for 300+ Da'i
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Extract unique provinces
  const provinceList = useMemo(() => {
    const set = new Set<string>();
    daiList.forEach((d) => {
      if (d.provinsi) set.add(d.provinsi);
    });
    return ['Semua Provinsi', ...Array.from(set).sort()];
  }, [daiList]);

  // Filtered Da'i List
  const filteredList = useMemo(() => {
    return daiList.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        d.nama.toLowerCase().includes(q) ||
        d.titikDakwah.toLowerCase().includes(q) ||
        d.kabupaten.toLowerCase().includes(q) ||
        d.provinsi.toLowerCase().includes(q) ||
        (d.asalDaerah && d.asalDaerah.toLowerCase().includes(q)) ||
        (d.asalLembaga && d.asalLembaga.toLowerCase().includes(q));

      const matchProvinsi =
        selectedProvinsi === 'Semua Provinsi' || d.provinsi === selectedProvinsi;

      const matchStatus =
        selectedStatus === 'Semua Status' || d.statusTugas === selectedStatus;

      return matchSearch && matchProvinsi && matchStatus;
    });
  }, [daiList, searchQuery, selectedProvinsi, selectedStatus]);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedProvinsi, selectedStatus, pageSize]);

  // Pagination slice
  const totalPages = Math.ceil(filteredList.length / pageSize) || 1;
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, currentPage, pageSize]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'No',
      'Nama Da\'i Utusan',
      'Tempat Pengutusan (Termasuk Nama Provinsi)',
      'Asal Daerah (Kota/Provinsi Asal)',
      'Provinsi Pengutusan (Tempat Diutus)',
      'Pulau',
      'Status Tugas',
      'Kontak Telepon',
    ];

    const rows = filteredList.map((d, i) => {
      const tempatLengkap = d.titikDakwah.includes(d.provinsi)
        ? d.titikDakwah
        : `${d.titikDakwah}, ${d.kabupaten}, Prov. ${d.provinsi}`;

      return [
        i + 1,
        `"${d.nama}${d.gelar ? ', ' + d.gelar : ''}"`,
        `"${tempatLengkap}"`,
        `"${d.asalDaerah || d.asalLembaga || '-'}"`,
        `"${d.provinsi}"`,
        `"${d.pulau}"`,
        `"${d.statusTugas}"`,
        `"${d.telepon || '-'}"`,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `database_dai_utusan_nasional_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Section Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>DIREKTORI RESMI DA'I UTUSAN NASIONAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Database Da'i Utusan Indonesia
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Memuat data lengkap nama seluruh da'i utusan, titik tempat pengutusan (3T, pedalaman, pesisir), asal lembaga pengutus, dan provinsi penugasan di seluruh penjuru Indonesia.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
            {/* BULK IMPORT BUTTON (Direct answer to user's need) */}
            <button
              onClick={onOpenBulkImport}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors border border-blue-400 shadow-md whitespace-nowrap"
              title="Import 300+ Da'i sekaligus dari Excel / CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-white" />
              <span>Import Massal (300+ Sekaligus)</span>
            </button>

            {/* GOOGLE SHEETS BUTTON */}
            {onOpenGoogleSheets && (
              <button
                onClick={onOpenGoogleSheets}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors border border-emerald-500 shadow-sm whitespace-nowrap"
                title="Buka Integrasi Google Sheets (Ekspor & Impor)"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
                <span>Google Sheets</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 shadow-sm whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 shadow-sm whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Cetak</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 shadow-sm whitespace-nowrap"
            >
              <span>+ Da'i Baru</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-4 border-t border-slate-800/80">
          {/* Search Input (6 cols) */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama da'i, tempat pengutusan, asal lembaga, atau provinsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Provinsi (3 cols) */}
          <div className="sm:col-span-3">
            <select
              value={selectedProvinsi}
              onChange={(e) => setSelectedProvinsi(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {provinceList.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          {/* Filter Status (2 cols) */}
          <div className="sm:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Persiapan">Persiapan</option>
              <option value="Cuti / Istirahat">Cuti</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          {/* Reset (1 col) */}
          <div className="sm:col-span-1">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedProvinsi('Semua Provinsi');
                setSelectedStatus('Semua Status');
              }}
              className="w-full h-full py-2 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors border border-slate-700"
              title="Reset Filter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Counter Badge & Page Size Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 pt-1 font-mono">
          <div>
            TOTAL TERDATA: <strong className="text-white font-bold">{daiList.length} DA'I UTUSAN</strong>
            {selectedProvinsi !== 'Semua Provinsi' && (
              <span className="text-blue-400 ml-2">({filteredList.length} di {selectedProvinsi})</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span>Tampilkan per halaman:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main High-Density Table with Pagination */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Nama Da'i Utusan</th>
                <th className="py-3.5 px-4">Tempat Pengutusan (Termasuk Provinsi)</th>
                <th className="py-3.5 px-4">Asal Daerah</th>
                <th className="py-3.5 px-4">Provinsi Pengutusan (Tempat Diutus)</th>
                <th className="py-3.5 px-3">Status Tugas</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Tidak ada data da'i yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                paginatedList.map((dai) => (
                  <tr
                    key={dai.id}
                    className="hover:bg-slate-800/50 transition-colors group"
                  >
                    {/* 1. Nama Seluruh Da'i Utusan */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectDai(dai)}
                          className="hover:underline text-left font-bold text-sm text-white"
                        >
                          {dai.nama}
                        </button>
                        {dai.gelar && (
                          <span className="font-normal text-slate-400 text-xs">
                            ({dai.gelar})
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        ID: {dai.id} · Kontak: {dai.telepon || '-'}
                      </div>
                    </td>

                    {/* 2. Tempat Pengutusan (Termasuk Provinsi) */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{dai.titikDakwah}</span>
                      </div>
                      <div className="text-[11px] text-blue-300 font-medium mt-0.5 flex items-center gap-1.5">
                        <span className="text-slate-400 font-normal">Provinsi:</span>
                        <span className="bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-800 text-blue-300 font-mono text-[10px]">
                          {dai.provinsi}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Kabupaten: <strong className="text-slate-300 font-normal">{dai.kabupaten}</strong>
                        {dai.kecamatan && <span> ({dai.kecamatan})</span>}
                      </div>
                      <span className="inline-block text-[10px] text-slate-500 font-mono mt-0.5">
                        {dai.kategoriWilayah}
                      </span>
                    </td>

                    {/* 3. Asal Daerah */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-100 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-semibold">{dai.asalDaerah || dai.asalLembaga}</span>
                      </div>
                      {dai.asalLembaga && dai.asalDaerah && (
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Lembaga: {dai.asalLembaga}
                        </div>
                      )}
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                        Kontrak: {dai.durasiKontrakBulan} Bulan
                      </div>
                    </td>

                    {/* 4. Provinsi Pengutusan (Tempat Diutus) */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                        <span>{dai.provinsi}</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-medium mt-0.5">
                        Provinsi Tempat Diutus
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Kepulauan: {dai.pulau}
                      </div>
                    </td>

                    {/* Status Tugas */}
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        dai.statusTugas === 'Aktif'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : dai.statusTugas === 'Persiapan'
                          ? 'bg-sky-950 text-sky-300 border-sky-800'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {dai.statusTugas}
                      </span>
                    </td>

                    {/* Aksi Button */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onSelectDai(dai)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-blue-300 bg-blue-950/80 hover:bg-blue-900 border border-blue-800 rounded-md transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detail</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {filteredList.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="font-mono">
              Halaman <strong className="text-white">{currentPage}</strong> dari{' '}
              <strong className="text-white">{totalPages}</strong> (Menampilkan {paginatedList.length} dari {filteredList.length} da'i)
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              {/* Page Number Chips */}
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = Math.min(totalPages - 4 + i, currentPage - 2 + i);
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-7 h-7 rounded text-xs font-mono font-semibold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 flex items-center gap-1"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
