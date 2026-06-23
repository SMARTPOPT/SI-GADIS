/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Printer, 
  Heart, 
  Calendar, 
  Smartphone, 
  BookOpen, 
  MessageSquare, 
  PhoneCall, 
  FileText, 
  CheckCircle, 
  Download, 
  Info, 
  Sparkles, 
  MapPin, 
  ShieldAlert,
  Menu,
  ChevronRight,
  Activity,
  Award
} from "lucide-react";
import { NUTRITIONISTS } from "../data/nutritionData";

export default function PamfletTab() {
  const [pamphletFormat, setPamphletFormat] = useState<"tri-fold" | "poster">("tri-fold");

  const handlePrint = () => {
    window.print();
  };

  const featureHighlights = [
    {
      title: "Diet Khusus Rawat Inap",
      desc: "Menyesuaikan asupan kalori & komposisi gizi presisi sesuai dengan diagnosis medis dokter penanggung jawab pelayanan (DPJP).",
      icon: Heart,
      color: "bg-rose-50 text-rose-600 border-rose-150"
    },
    {
      title: "Siklus Menu Gizi Terkontrol",
      desc: "Sistem rotasi menu 10 hari gizi klinis standar Kemenkes serta Menu Khusus RSD Kalabahi untuk memastikan variasi hidangan segar.",
      icon: FileText,
      color: "bg-emerald-50 text-emerald-600 border-emerald-150"
    },
    {
      title: "Edukasi & Konseling Gizi AI",
      desc: "Diskusi virtual interaktif 24 jam mengenai penyakit, takaran pantangan, dan konsultasi asupan makanan harian dipandu asisten cerdas.",
      icon: BookOpen,
      color: "bg-amber-50 text-amber-600 border-amber-150"
    },
    {
      title: "Umpan Balik Real-Time",
      desc: "Menampung penilaian kualitas, rasa, kehangatan, dan ketepatan jam penyajian menu langsung dari ranjang pasien untuk peningkatan kualitas dapur gizi.",
      icon: MessageSquare,
      color: "bg-sky-50 text-sky-600 border-sky-150"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="pamflet-tab-container">
      
      {/* Intro Header & Action Banner */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6" id="pamphlet-intro">
        <div id="pamphlet-intro-text" className="space-y-2 text-center md:text-left">
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase inline-block">
            BARU & INTERAKTIF
          </span>
          <h2 className="text-2xl font-black text-emerald-950 flex items-center justify-center md:justify-start gap-2">
            <Printer className="w-6 h-6 text-emerald-600" />
            Pamflet Info Digital SIGADIS
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
            Unduh atau cetak pamflet resmi Rumah Sakit Umum Daerah Kalabahi. Pamflet ini didesain agar mudah dilipat menjadi brosur tiga warna (Tri-Fold) atau dijadikan selebaran informasi gizi di ruangan rawat inap.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0" id="pamphlet-actions">
          {/* Layout Selector */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setPamphletFormat("tri-fold")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                pamphletFormat === "tri-fold"
                  ? "bg-white text-emerald-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Brosur Lipat (Tri-Fold)
            </button>
            <button
              onClick={() => setPamphletFormat("poster")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                pamphletFormat === "poster"
                  ? "bg-white text-emerald-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Selebaran Poster
            </button>
          </div>

          {/* Action Trigger Buttons */}
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wide rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95 border-2 border-emerald-500"
            id="btn-print-leaflet"
          >
            <Printer className="w-4 h-4" />
            Cetak Brosur
          </button>
        </div>
      </div>

      {pamphletFormat === "tri-fold" ? (
        /* ================= TRI-FOLD BROCHURE IMPLEMENTATION ================= */
        <div className="space-y-6" id="pamphlet-trifold-wrapper">
          <div className="text-center text-[11px] text-slate-500 font-bold bg-amber-50 border border-amber-200 p-3 rounded-2xl max-w-xl mx-auto flex items-center gap-2.5 justify-center">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Petunjuk Lipat: Brosur dicetak landscape. Lipat sisi kanan ke dalam, lalu sisi kiri sebagai sampul utama depan.</span>
          </div>

          <div 
            className="bg-slate-50 border-4 border-dashed border-slate-300 p-4 sm:p-8 rounded-5xl shadow-inner select-none transition-all overflow-x-auto" 
            id="pamphlet-body-container"
          >
            {/* The printable dimension wrapper */}
            <div 
              className="bg-white text-slate-800 rounded-3xl p-6 md:p-10 border border-slate-200 shadow-2xl min-w-[760px] max-w-[1100px] mx-auto grid grid-cols-3 gap-6 relative divide-x-2 divide-dashed divide-rose-200" 
              style={{ minHeight: "680px" }}
              id="leaflet-printable-canvas"
            >
              
              {/* PANEL 1: SISI DALAM KIRI / PROGRAM PEMULIHAN NUTRISIONAL */}
              <div className="px-5 space-y-6 flex flex-col justify-between" id="leaflet-panel-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                    <Heart className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-extrabold text-sm uppercase tracking-wide text-emerald-950">
                      Asuhan Gizi & Pemulihan
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                    Makanan yang tepat adalah bagian integral esensial dari proses penyembuhan pasien di RSUD Kalabahi. Kami merancang diet khusus agar sel-sel tubuh mendapat nutrisi yang tepat.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-2.5">
                      <span className="p-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black">01</span>
                      <div>
                        <h4 className="text-[11px] font-black text-slate-800">Diet Lambung (Sakit Maag/Asam Lambung)</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Bahan makanan bertekstur lunak, disaring, serta rendah serat kasar untuk mencegah peradangan mukosa lambung.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="p-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black">02</span>
                      <div>
                        <h4 className="text-[11px] font-black text-slate-800">Diet Rendah Garam (RG / Hipertensi)</h4>
                        <p className="text-[10px] text-slate-500 font-medium font-semibold text-emerald-800">Membatasi sodium & pengolahan tanpa garam NaCl tambahan demi meredakan tekanan dinding pembuluh darah.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="p-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black">03</span>
                      <div>
                        <h4 className="text-[11px] font-black text-slate-800">Diet Diabetes Melitus (DM)</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Penggunaan asupan rendah indeks glikemik seperti nasi merah dan sayuran berserat tinggi guna kestabilan insulin.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient Safety Badge inside Panel */}
                <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 text-[10px] text-emerald-900 font-bold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Diet divalidasi oleh Ahli Gizi Berizin (SIPA) RSUD Kalabahi.</span>
                </div>
              </div>

              {/* PANEL 2: SISI TENGAH / JADWAL & KONTAK (BAGIAN BELAKANG BROSUR KETIKA DILIPAT) */}
              <div className="px-5 pl-7 space-y-6 flex flex-col justify-between" id="leaflet-panel-center">
                <div className="space-y-5">
                  <div className="flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-extrabold text-sm uppercase tracking-wide text-emerald-950">
                      Sesi Distribusi Saji
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] font-black text-slate-700">🌅 SARAPAN PAGI</span>
                      <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md">06:30 - 08:00</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] font-black text-slate-700">🍊 SELINGAN SNACK</span>
                      <span className="bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md">09:30 & 15:30</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] font-black text-slate-700">☀️ MAKAN SIANG</span>
                      <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md">11:30 - 13:00</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] font-black text-slate-700">🌙 MAKAN MALAM</span>
                      <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md">17:30 - 19:00</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Layanan Hubungi Gizi</h4>
                    <div className="space-y-1.5">
                      {NUTRITIONISTS.slice(0, 3).map((n, idx) => (
                        <div key={idx} className="text-[10px]">
                          <span className="font-black text-slate-800 block">{n.name}</span>
                          <span className="text-[9px] text-emerald-700 font-extrabold block">{n.role} • {n.phone.replace("62", "0")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center text-[9px] text-slate-400 font-semibold border-t border-slate-100 pt-2">
                  Komite Mutu Pelayanan Medik & Keperawatan RSUD Kalabahi
                </div>
              </div>

              {/* PANEL 3: SISI KANAN / COVER (SAMPUL DEPAN BROSUR) */}
              <div className="px-5 pl-7 bg-emerald-50/[0.15] py-2 space-y-6 flex flex-col justify-between items-center text-center" id="leaflet-panel-right">
                
                {/* Top Logos decor */}
                <div className="flex items-center gap-3 opacity-80">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1Dyy9JHeOqTWBVXquaHEkkQVrN0OQGznq" 
                    alt="Logo Pemda Alor" 
                    className="h-8 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="h-6 w-0.5 bg-slate-300"></div>
                  <img 
                    src="https://lh3.googleusercontent.com/d/1jTUvbi-Ee3IA4tRsiGpB2IJpIrU7lB_Y" 
                    alt="Logo Kemenkes" 
                    className="h-6 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Big Title branding */}
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-emerald-600 rounded-3xl mx-auto flex items-center justify-center text-white text-3xl font-black shadow-md">
                    🥗
                  </div>
                  
                  <div className="space-y-1">
                    <h1 className="text-2xl font-black text-emerald-950 tracking-tight leading-none uppercase">
                      SIGADIS
                    </h1>
                    <span className="inline-block py-0.5 px-3 bg-emerald-500 text-white font-black text-[9px] uppercase tracking-widest rounded-full">
                      PORTAL GIZI PASIEN
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider max-w-[200px]">
                    Sistem Informasi Gizi Rawat Inap & Diet Sesuai Penyakit
                  </p>
                </div>

                {/* Hospital Badge info */}
                <div className="space-y-2">
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-full"></div>
                  <p className="font-extrabold text-[11px] text-emerald-950 uppercase tracking-widest leading-none">
                    RSUD KALABAHI
                  </p>
                  <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider leading-none">
                    Kabupaten Alor - NTT
                  </p>
                  <p className="text-[8px] text-slate-400">Scan QR Code atau Kunjungi website di ruang rawat.</p>
                </div>

                {/* Mock QR placeholder */}
                <div className="p-1 px-3 border-2 border-dashed border-emerald-400 rounded-md rotate-[1.5deg] select-none text-[8.5px] font-black text-emerald-700 tracking-wider">
                  SOP UNIT GIZI TERNETRALISASI
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* ================= DISPLAY AS POSTER LEAFLET ================= */
        <div className="bg-white p-8 sm:p-14 rounded-5xl border-2 border-slate-200 shadow-md max-w-4xl mx-auto space-y-12 select-none" id="pamphlet-poster-view">
          
          {/* Poster Top Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-b-4 border-emerald-500 pb-8 gap-6 sm:gap-2">
            <div className="flex items-center gap-4">
              <img 
                src="https://lh3.googleusercontent.com/d/1Dyy9JHeOqTWBVXquaHEkkQVrN0OQGznq" 
                alt="Logo Pemda Alor" 
                className="h-14 sm:h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">PEMERINTAH KABUPATEN ALOR</h2>
                <h3 className="text-md sm:text-lg font-extrabold text-emerald-900 leading-none">RUMAH SAKIT UMUM DAERAH KALABAHI</h3>
                <p className="text-[10px] text-slate-500 font-medium">Jl. Dr. Sutomo No. 8 Kalabahi, Alor, Nusa Tenggara Timur (NTT)</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span className="bg-emerald-600 text-white font-black text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                LAYANAN GIZI TERPADU
              </span>
            </div>
          </div>

          {/* Slogan */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-950 uppercase leading-none">
              PAMFLET RESMI SIGADIS
            </h1>
            <p className="text-xs sm:text-sm font-bold text-emerald-700 uppercase tracking-widest">
              Sistem Informasi Gizi Rawat Inap & Diet Sesuai Penyakit
            </p>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Sebuah inovasi integrasi data diet khusus pasien rawat inap rumah sakit guna mempercepat pemulihan organ tubuh, asuhan medis terkontrol, serta pendistribusian gizi yang higienis dan tepat waktu.
            </p>
          </div>

          {/* Grid Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="poster-features-grid">
            {featureHighlights.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 flex items-start gap-4">
                  <div className={`p-3 rounded-2xl ${feat.color} shrink-0`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-black text-slate-800">{feat.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Distribution Schedule Highlight */}
          <div className="bg-emerald-50/50 p-6 rounded-4xl border-2 border-emerald-100 space-y-4" id="poster-schedule">
            <h4 className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wider text-center flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Alur Waktu Distribusi Makanan Pasien Rawat Inap
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-150 text-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase">PAGI</span>
                <p className="text-sm font-black text-slate-800">06:30 - 08:00</p>
                <span className="text-[9px] text-slate-500 block">Sajian Hangat Utama</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-150 text-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase">SELINGAN PAGI</span>
                <p className="text-sm font-black text-slate-800">09:30 - 10:30</p>
                <span className="text-[9px] text-slate-500 block">Bubur Kacang/Snack</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-150 text-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase">SIANG</span>
                <p className="text-sm font-black text-slate-800">11:30 - 13:00</p>
                <span className="text-[9px] text-slate-500 block">Gizi Seimbang Komplet</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-150 text-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase">MALAM</span>
                <p className="text-sm font-black text-slate-800">17:30 - 19:00</p>
                <span className="text-[9px] text-slate-500 block">Porsi Ringan Bergizi</span>
              </div>
            </div>
          </div>

          {/* Officers Footer Contact */}
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-wider">Tim Pengawas Layanan Gizi</p>
              <p className="text-sm font-black text-emerald-950">Intalasi Gizi Rumah Sakit Umum Daerah Kalabahi</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {NUTRITIONISTS.map((n, idx) => (
                <div key={idx} className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-left">
                  <span className="text-[10px] font-black text-slate-800 block leading-tight">{n.name}</span>
                  <span className="text-[9px] text-slate-500 font-bold block">{n.role}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Styled Printable rules for Print Layout */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #leaflet-printable-canvas, #leaflet-printable-canvas * {
            visibility: visible;
          }
          #pamphlet-poster-view, #pamphlet-poster-view * {
            visibility: visible;
          }
          #leaflet-printable-canvas {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            min-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #pamphlet-poster-view {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          #sigadis-main-header, #sigadis-navigation-tabs, #sigadis-main-footer, #pamphlet-intro, #mobile-header-bar, #mobile-institution-strip, #mobile-tab-navigation-bottom {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
