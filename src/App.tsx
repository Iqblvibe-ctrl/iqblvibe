import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  MapPin, 
  Users, 
  Radio, 
  Wallet, 
  Printer, 
  Clock, 
  Compass, 
  Database,
  Building2,
  Activity,
  Layers,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { NationalMap } from './components/NationalMap';
import { KpiMetrics } from './components/KpiMetrics';
import { CoordinationMethods } from './components/CoordinationMethods';
import { CoordinatorProfile } from './components/CoordinatorProfile';
import { DaiDatabaseView } from './components/DaiDatabaseView';
import { KorwilDatabaseView } from './components/KorwilDatabaseView';
import { BulkImportModal } from './components/BulkImportModal';
import { DaiModal } from './components/DaiModal';
import { DetailModal } from './components/DetailModal';
import { FundModal } from './components/FundModal';
import { ProgressModal } from './components/ProgressModal';
import { DaiUtusan, Korwil } from './types/dai';
import { 
  loadDaiListFromStorage, 
  saveDaiListToStorage, 
  INITIAL_DAI_LIST, 
  INITIAL_KORWIL_LIST 
} from './data/initialData';

const STORAGE_KEY_KORWIL = 'sidau_korwil_v1';

export default function App() {
  const [activeMenu, setActiveMenu] = useState<'beranda' | 'database-dai' | 'database-korwil' | 'kpi' | 'metode'>('beranda');
  const [daiList, setDaiList] = useState<DaiUtusan[]>(() => loadDaiListFromStorage());
  const [korwilList, setKorwilList] = useState<Korwil[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_KORWIL);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_KORWIL_LIST;
  });

  // Modal states
  const [selectedDaiForDetail, setSelectedDaiForDetail] = useState<DaiUtusan | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDai, setEditingDai] = useState<DaiUtusan | null>(null);
  const [fundModalDai, setFundModalDai] = useState<DaiUtusan | null>(null);
  const [progressModalDai, setProgressModalDai] = useState<DaiUtusan | null>(null);

  // Bulk Import state
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [bulkImportTarget, setBulkImportTarget] = useState<'dai' | 'korwil'>('dai');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync Korwil to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_KORWIL, JSON.stringify(korwilList));
    } catch (e) {
      console.error(e);
    }
  }, [korwilList]);

  const handleSaveDai = (savedDai: DaiUtusan) => {
    const exists = daiList.some((d) => d.id === savedDai.id);
    let updated: DaiUtusan[];
    if (exists) {
      updated = daiList.map((d) => (d.id === savedDai.id ? savedDai : d));
      showToast(`Data ${savedDai.nama} berhasil diperbarui.`);
    } else {
      updated = [savedDai, ...daiList];
      showToast(`Da'i baru ${savedDai.nama} berhasil didaftarkan.`);
    }
    setDaiList(updated);
    saveDaiListToStorage(updated);
  };

  // Bulk Import Handler for Da'i (supports 300+ entries)
  const handleBulkImportDai = (newData: DaiUtusan[], replaceAll: boolean) => {
    let result: DaiUtusan[];
    if (replaceAll) {
      result = newData;
      showToast(`Berhasil mengganti seluruh database dengan ${newData.length} data da'i baru.`);
    } else {
      // Append unique by ID or name
      const existingNames = new Set(daiList.map((d) => d.nama.toLowerCase().trim()));
      const filteredNew = newData.filter((d) => !existingNames.has(d.nama.toLowerCase().trim()));
      result = [...filteredNew, ...daiList];
      showToast(`Berhasil menambahkan ${filteredNew.length} da'i baru (Total: ${result.length} da'i).`);
    }
    setDaiList(result);
    saveDaiListToStorage(result);
  };

  // Bulk Import Handler for Korwil
  const handleBulkImportKorwil = (newData: Korwil[], replaceAll: boolean) => {
    let result: Korwil[];
    if (replaceAll) {
      result = newData;
    } else {
      result = [...newData, ...korwilList];
    }
    setKorwilList(result);
    showToast(`Berhasil mengimpor data Korwil (${result.length} wilayah komando).`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-blue-900 text-white text-xs rounded-xl shadow-2xl border border-blue-600 animate-fade-in font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-16">
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-black text-sm tracking-widest shadow-md border border-blue-500">
                SN
              </div>
              <button
                onClick={() => setActiveMenu('beranda')}
                className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-blue-400 transition-colors text-left"
              >
                SIDAU NUSANTARA
              </button>
            </div>

            {/* Zone 2: Navigation Links (5 Focused Menus) */}
            <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-300">
              <button
                onClick={() => setActiveMenu('beranda')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeMenu === 'beranda'
                    ? 'bg-blue-900/80 text-white font-bold border border-blue-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Beranda &amp; Peta
              </button>
              <button
                onClick={() => setActiveMenu('database-dai')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeMenu === 'database-dai'
                    ? 'bg-blue-900/80 text-white font-bold border border-blue-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Database Da'i ({daiList.length})</span>
              </button>
              <button
                onClick={() => setActiveMenu('database-korwil')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeMenu === 'database-korwil'
                    ? 'bg-blue-900/80 text-white font-bold border border-blue-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Database Korwil ({korwilList.length})</span>
              </button>
              <button
                onClick={() => setActiveMenu('kpi')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeMenu === 'kpi'
                    ? 'bg-blue-900/80 text-white font-bold border border-blue-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Metrik Kinerja (KPI)
              </button>
              <button
                onClick={() => setActiveMenu('metode')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeMenu === 'metode'
                    ? 'bg-blue-900/80 text-white font-bold border border-blue-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Metode Koordinasi
              </button>
            </nav>

            {/* Zone 3: Primary Action Button & Bulk Import Trigger */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  setBulkImportTarget(activeMenu === 'database-korwil' ? 'korwil' : 'dai');
                  setIsBulkImportOpen(true);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors border border-blue-500 shadow-sm whitespace-nowrap"
                title="Input massal dari Excel atau CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Import Massal</span>
              </button>

              <button
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700 shadow-sm whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Cetak</span>
              </button>

              <button
                onClick={() => {
                  setEditingDai(null);
                  setIsAddModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 shadow-sm whitespace-nowrap"
              >
                <span>+ Da'i Baru</span>
              </button>
            </div>
          </div>

          {/* Mobile Tab Bar */}
          <div className="lg:hidden flex items-center gap-2 py-2.5 overflow-x-auto border-t border-slate-800/80 text-xs">
            <button
              onClick={() => setActiveMenu('beranda')}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
                activeMenu === 'beranda' ? 'bg-blue-800 text-white font-bold' : 'text-slate-300'
              }`}
            >
              Beranda &amp; Peta
            </button>
            <button
              onClick={() => setActiveMenu('database-dai')}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
                activeMenu === 'database-dai' ? 'bg-blue-800 text-white font-bold' : 'text-slate-300'
              }`}
            >
              Database Da'i ({daiList.length})
            </button>
            <button
              onClick={() => setActiveMenu('database-korwil')}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
                activeMenu === 'database-korwil' ? 'bg-blue-800 text-white font-bold' : 'text-slate-300'
              }`}
            >
              Database Korwil ({korwilList.length})
            </button>
            <button
              onClick={() => setActiveMenu('kpi')}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
                activeMenu === 'kpi' ? 'bg-blue-800 text-white font-bold' : 'text-slate-300'
              }`}
            >
              Metrik KPI
            </button>
            <button
              onClick={() => setActiveMenu('metode')}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
                activeMenu === 'metode' ? 'bg-blue-800 text-white font-bold' : 'text-slate-300'
              }`}
            >
              Metode Koordinasi
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 flex-1">
        {/* VIEW 1: BERANDA & PETA KOMANDO */}
        {activeMenu === 'beranda' && (
          <div className="space-y-16 animate-fade-in">
            {/* Bagian Paling Atas: Judul "SIDAU NUSANTARA" & Peta Indonesia */}
            <section className="text-center space-y-6 pt-2 pb-2 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-800 text-blue-300 text-xs font-semibold shadow-inner">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>PORTOFOLIO KOORDINATOR NASIONAL DA'I UTUSAN INDONESIA</span>
                <span aria-hidden="true" className="text-blue-700">·</span>
                <span className="text-slate-400 font-mono">KOMANDO 3T</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
                  SIDAU NUSANTARA
                </h1>
                <p className="text-sm sm:text-base font-semibold text-blue-400 tracking-wide uppercase font-mono">
                  Sistem Informasi &amp; Komando Da'i Utusan Wilayah 3T se-Indonesia
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto" style={{ textWrap: 'balance' }}>
                Kerangka kepemimpinan terintegrasi yang menghubungkan {daiList.length} da'i utusan di garis perbatasan antar negara, pedalaman suku terpencil, dan pulau-pulau terluar melalui pemantauan peta nusantara, disiplin komunikasi harian, dan tata kelola dana yang akuntabel.
              </p>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-3xl mx-auto text-left text-xs">
                <button
                  onClick={() => setActiveMenu('database-dai')}
                  className="p-3 bg-slate-900 hover:bg-slate-800/90 rounded-xl border border-slate-800 hover:border-blue-600 transition-colors text-left group"
                >
                  <span className="text-slate-400 text-[11px] block flex items-center justify-between">
                    <span>Database Da'i</span>
                    <ArrowRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <strong className="text-white text-sm font-mono block mt-1">{daiList.length} Da'i Utusan</strong>
                  <span className="text-blue-400 text-[10px]">Nama, Tempat, Asal, Prov</span>
                </button>

                <button
                  onClick={() => setActiveMenu('database-korwil')}
                  className="p-3 bg-slate-900 hover:bg-slate-800/90 rounded-xl border border-slate-800 hover:border-sky-600 transition-colors text-left group"
                >
                  <span className="text-slate-400 text-[11px] block flex items-center justify-between">
                    <span>Database Korwil</span>
                    <ArrowRight className="w-3 h-3 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <strong className="text-white text-sm font-mono block mt-1">{korwilList.length} Korwil Wilayah</strong>
                  <span className="text-sky-400 text-[10px]">Posko Induk &amp; Supervisi</span>
                </button>

                <button
                  onClick={() => setActiveMenu('kpi')}
                  className="p-3 bg-slate-900 hover:bg-slate-800/90 rounded-xl border border-slate-800 hover:border-emerald-600 transition-colors text-left group"
                >
                  <span className="text-slate-400 text-[11px] block flex items-center justify-between">
                    <span>Metrik KPI</span>
                    <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <strong className="text-white text-sm font-mono block mt-1">3 Metrik Utama</strong>
                  <span className="text-emerald-400 text-[10px]">Formasi, Respon, Dana</span>
                </button>

                <button
                  onClick={() => setActiveMenu('metode')}
                  className="p-3 bg-slate-900 hover:bg-slate-800/90 rounded-xl border border-slate-800 hover:border-indigo-600 transition-colors text-left group"
                >
                  <span className="text-slate-400 text-[11px] block flex items-center justify-between">
                    <span>Metode Koordinasi</span>
                    <ArrowRight className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <strong className="text-white text-sm font-mono block mt-1">6 Jalur Harian</strong>
                  <span className="text-indigo-400 text-[10px]">Radio, Satelit &amp; Standup</span>
                </button>
              </div>
            </section>

            {/* PETA INDONESIA */}
            <section>
              <NationalMap />
            </section>

            {/* 3 KOTAK METRIK KINERJA (DATA KPI) */}
            <section>
              <KpiMetrics />
            </section>

            {/* METODE KOORDINASI DENGAN IKON KOMUNIKASI HARIAN */}
            <section>
              <CoordinationMethods />
            </section>

            {/* PROFIL KEPEMIMPINAN KOORDINATOR NASIONAL */}
            <section>
              <CoordinatorProfile />
            </section>
          </div>
        )}

        {/* VIEW 2: MENU DATABASE DA'I */}
        {activeMenu === 'database-dai' && (
          <div className="animate-fade-in space-y-6">
            <DaiDatabaseView
              daiList={daiList}
              onSelectDai={(dai) => setSelectedDaiForDetail(dai)}
              onOpenAddModal={() => {
                setEditingDai(null);
                setIsAddModalOpen(true);
              }}
              onOpenBulkImport={() => {
                setBulkImportTarget('dai');
                setIsBulkImportOpen(true);
              }}
            />
          </div>
        )}

        {/* VIEW 3: MENU INFORMASI DATABASE KORWIL */}
        {activeMenu === 'database-korwil' && (
          <div className="animate-fade-in space-y-6">
            <KorwilDatabaseView
              korwilList={korwilList}
              onOpenBulkImport={() => {
                setBulkImportTarget('korwil');
                setIsBulkImportOpen(true);
              }}
            />
          </div>
        )}

        {/* VIEW 4: METRIK KINERJA KPI */}
        {activeMenu === 'kpi' && (
          <div className="animate-fade-in space-y-8">
            <KpiMetrics />
            <div className="text-center pt-4">
              <button
                onClick={() => setActiveMenu('beranda')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
              >
                &larr; Kembali ke Beranda &amp; Peta Indonesia
              </button>
            </div>
          </div>
        )}

        {/* VIEW 5: METODE KOORDINASI */}
        {activeMenu === 'metode' && (
          <div className="animate-fade-in space-y-8">
            <CoordinationMethods />
            <div className="text-center pt-4">
              <button
                onClick={() => setActiveMenu('beranda')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
              >
                &larr; Kembali ke Beranda &amp; Peta Indonesia
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center text-white font-bold text-xs">
                SN
              </div>
              <span className="font-bold text-white text-sm tracking-tight">SIDAU NUSANTARA</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Direktori Da'i Utusan &amp; Informasi Korwil Nusantara</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <button onClick={() => setActiveMenu('beranda')} className="hover:text-blue-400 transition-colors">
                Beranda
              </button>
              <span>·</span>
              <button onClick={() => setActiveMenu('database-dai')} className="hover:text-blue-400 transition-colors">
                Database Da'i ({daiList.length})
              </button>
              <span>·</span>
              <button onClick={() => setActiveMenu('database-korwil')} className="hover:text-blue-400 transition-colors">
                Database Korwil ({korwilList.length})
              </button>
              <span>·</span>
              <button onClick={() => setActiveMenu('kpi')} className="hover:text-blue-400 transition-colors">
                KPI
              </button>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
            <p>
              &copy; 2026 SIDAU Nusantara. Didedikasikan untuk perjuangan da'i utusan dan koordinator wilayah se-Indonesia.
            </p>
            <p className="text-slate-400 font-mono">
              STATUS: {daiList.length} DA'I TERDATA · {korwilList.length} KORWIL AKTIF
            </p>
          </div>
        </div>
      </footer>

      {/* BULK IMPORT MODAL (300+ Da'i & Korwil Ingestion) */}
      <BulkImportModal
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        targetType={bulkImportTarget}
        onImportDai={handleBulkImportDai}
        onImportKorwil={handleBulkImportKorwil}
      />

      {/* Detail Modal */}
      <DetailModal
        isOpen={Boolean(selectedDaiForDetail)}
        onClose={() => setSelectedDaiForDetail(null)}
        dai={selectedDaiForDetail}
        onOpenFundModal={(dai) => setFundModalDai(dai)}
        onOpenProgressModal={(dai) => setProgressModalDai(dai)}
        onOpenEditModal={(dai) => {
          setEditingDai(dai);
          setIsAddModalOpen(true);
        }}
      />

      {/* Single Add Modal */}
      <DaiModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingDai(null);
        }}
        onSave={handleSaveDai}
        editingDai={editingDai}
      />

      {/* Fund Modal */}
      <FundModal
        isOpen={Boolean(fundModalDai)}
        onClose={() => setFundModalDai(null)}
        dai={fundModalDai}
        onSave={(daiId, updatedDana) => {
          setDaiList((prev) =>
            prev.map((d) => (d.id === daiId ? { ...d, dana: updatedDana } : d))
          );
          setFundModalDai(null);
        }}
      />

      {/* Progress Modal */}
      <ProgressModal
        isOpen={Boolean(progressModalDai)}
        onClose={() => setProgressModalDai(null)}
        dai={progressModalDai}
        onSave={(daiId, updatedTren) => {
          setDaiList((prev) =>
            prev.map((d) => (d.id === daiId ? { ...d, tren: updatedTren } : d))
          );
          setProgressModalDai(null);
        }}
      />
    </div>
  );
}
