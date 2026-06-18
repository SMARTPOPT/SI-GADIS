/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Utensils, Heart, Clock, Activity, MessageSquare, BookOpen, ChevronRight, PhoneCall, Sparkles } from "lucide-react";

interface BerandaTabProps {
  onNavigate: (tab: string) => void;
}

export default function BerandaTab({ onNavigate }: BerandaTabProps) {
  const [currentMealStatus, setCurrentMealStatus] = useState({
    session: "Menunggu Jadwal",
    time: "--:--",
    icon: Utensils,
    color: "text-emerald-600 background-emerald-50",
    desc: "Persiapan sesi pembagian menu makanan berikutnya."
  });

  const [currentTimeStr, setCurrentTimeStr] = useState("");

  const nutritionFacts = [
    "Konsumsi garam berlebih dapat menyebabkan retensi cairan dan menaikkan tekanan darah sistolik.",
    "Bagi pasien Diabetes, mematuhi prinsip 3J (Jadwal, Jumlah, Jenis) sangat krusial agar kadar gula darah tetap stabil.",
    "Putih telur rebus merupakan sumber protein murni tinggi albumin yang sangat baik untuk pemulihan jaringan pasca operasi.",
    "Mengunyah makanan secara perlahan (sekitar 32 kali) membantu meringankan beban lambung dan menunjang penyerapan nutrisi maksimal.",
    "Zat kalium pada pisang sangat baik untuk jantung, namun penderita gagal ginjal stadium lanjut perlu membatasi konsumsinya."
  ];

  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    // Select a random fact on mount
    const idx = Math.floor(Math.random() * nutritionFacts.length);
    setRandomFact(nutritionFacts[idx]);

    // Live meal time indicator logic
    const updateMealIndicator = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInMins = hours * 60 + minutes;

      const pad = (n: number) => n.toString().padStart(2, "0");
      setCurrentTimeStr(`${pad(hours)}:${pad(minutes)} WITA`);

      // RSUD Kalabahi Meal Schedule Constants (in minutes from midnight)
      // Pagi: 06:30 (390) - 08:00 (480)
      // Snack Pagi: 09:30 (570) - 10:30 (630)
      // Siang: 11:30 (690) - 13:00 (780)
      // Snack Sore: 15:30 (930) - 16:30 (990)
      // Malam: 17:30 (1050) - 19:00 (1140)

      if (timeInMins >= 390 && timeInMins < 480) {
        setCurrentMealStatus({
          session: "Pendistribusian Sarapan Pagi",
          time: "06:30 - 08:00 WITA",
          icon: CoffeeIcon,
          color: "bg-amber-50 text-amber-700 border-amber-200",
          desc: "Sesi sarapan pagi sedang dibagikan ke Ruang Rawat Inap."
        });
      } else if (timeInMins >= 570 && timeInMins < 630) {
        setCurrentMealStatus({
          session: "Camilan / Snack Pagi",
          time: "09:30 - 10:30 WITA",
          icon: AppleIcon,
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          desc: "Selingan snack sehat pagi disajikan untuk menjaga metabolisme."
        });
      } else if (timeInMins >= 690 && timeInMins < 780) {
        setCurrentMealStatus({
          session: "Pendistribusian Makan Siang",
          time: "11:30 - 13:00 WITA",
          icon: Utensils,
          color: "bg-teal-50 text-teal-700 border-teal-200",
          desc: "Sajian lengkap makan siang bergizi tinggi disebarkan oleh petugas."
        });
      } else if (timeInMins >= 930 && timeInMins < 990) {
        setCurrentMealStatus({
          session: "Camilan / Snack Sore",
          time: "15:30 - 16:30 WITA",
          icon: CoffeeIcon,
          color: "bg-orange-50 text-orange-700 border-orange-200",
          desc: "Snack sore hangat disajikan untuk energi pemulihan tubuh."
        });
      } else if (timeInMins >= 1050 && timeInMins < 1140) {
        setCurrentMealStatus({
          session: "Pendistribusian Makan Malam",
          time: "17:30 - 19:00 WITA",
          icon: SoupIcon,
          color: "bg-sky-50 text-sky-700 border-sky-200",
          desc: "Sesi makan malam dibagikan sebelum istirahat pemulihan malam."
        });
      } else {
        setCurrentMealStatus({
          session: "Persiapan Saji Dapur Gizi",
          time: "Luar Jam Distribusi",
          icon: Sparkles,
          color: "bg-slate-50 text-slate-700 border-slate-200",
          desc: "Tim gizi RSUD Kalabahi sedang menyiapkan menu higienis berikutnya."
        });
      }
    };

    updateMealIndicator();
    const interval = setInterval(updateMealIndicator, 30000); // update every 30 secs
    return () => clearInterval(interval);
  }, []);

  // Simple local React components for inline icons to avoid type conflicts with dynamic Lucide
  const CoffeeIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 12h-12m12 0a2.5 2.5 0 11-5 0v-5h5v5zm-12 0a2.5 2.5 0 005 0v-5h-5v5zM12 2v3m-4-3v3m8-3v3" />
    </svg>
  );

  const AppleIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14a5 5 0 110-10 5 5 0 010 10zM12 5C9 5 7 7 7 10s2 5 5 5 5-2 5-5-2-5-5-5z" />
    </svg>
  );

  const SoupIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3m12 0h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
    </svg>
  );

  return (
    <div className="space-y-6" id="beranda-tab-panel">
      {/* Hero Welcome Banner with Custom Photographic Background */}
      <div 
        className="relative text-white rounded-3xl p-6 sm:p-10 overflow-hidden shadow-xl border-2 border-emerald-500 bg-cover bg-center min-h-[320px] flex items-center" 
        style={{ backgroundImage: "url('https://serverinsip.net/wp-content/uploads/2025/08/RSUD-Kalabahi-e1755870879593-768x432.png')" }}
        id="hero-welcome"
      >
        {/* Rich semi-transparent overlay to ensure text contrast and match the dusty rose/pink aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-black/20 z-0"></div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-block bg-emerald-500/90 text-white text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full font-black uppercase tracking-wider shadow-xs backdrop-blur-xs">
            Sistem Informasi Gizi Rawat Inap & Diet Sesuai Penyakit
          </span>
          <h2 className="text-2xl sm:text-4.5xl font-black tracking-tight leading-tight drop-shadow-md">
            Pelayanan Gizi Terpadu & Digital
          </h2>
          <p className="text-emerald-50 text-xs sm:text-sm md:text-base leading-relaxed font-semibold drop-shadow-sm max-w-xl">
            Akses informasi siklus menu, edukasi gizi, dan layanan diet khusus pasien secara cepat melalui perangkat digital Anda.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              id="btn-quick-check-diet"
              onClick={() => onNavigate("diet")}
              className="bg-white text-emerald-900 hover:bg-emerald-50 active:scale-95 px-5 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Cari Diet Khusus Saya
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              id="btn-quick-menu"
              onClick={() => onNavigate("menu")}
              className="bg-emerald-950/80 hover:bg-emerald-900/90 active:scale-95 text-white border border-emerald-400/50 px-5 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-xs transition-all backdrop-blur-3xs cursor-pointer"
            >
              Lihat Siklus Menu Hari Ini
            </button>
          </div>
        </div>
      </div>

      {/* Featured Navigation Grid Buttons in Vibrant Palette - PROMOTED TO TOP POSITION */}
      <div className="space-y-4 pt-2" id="dashboard-navigation-section">
        <h2 className="text-slate-800 font-black text-xl tracking-tight flex items-center gap-2">
          <span>Akses Layanan SIGADIS</span>
          <span className="w-8 h-1 bg-emerald-500 rounded-sm"></span>
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6" id="main-features-grid">
          
          {/* Card 1 */}
          <div 
            onClick={() => onNavigate("diet")}
            className="group bg-white hover:bg-orange-50/10 p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-orange-100 shadow-sm cursor-pointer transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
            id="card-nav-diet"
          >
            <div className="space-y-2.5 sm:space-y-4">
              <div className="w-11 h-11 sm:w-16 sm:h-16 bg-orange-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-orange-600 text-xl sm:text-3xl shrink-0 group-hover:scale-105 transition-transform">
                🥗
              </div>
              <div className="space-y-1 p-0 text-left">
                <h3 className="text-sm sm:text-xl font-black text-slate-800 group-hover:text-orange-600 transition-colors">Diet Khusus Saya</h3>
                <p className="text-slate-500 text-[10px] sm:text-xs leading-normal sm:leading-relaxed">Informasi detail rencana diet harian berdasarkan diagnosa medis.</p>
              </div>
            </div>
            <div className="text-left">
              <span className="inline-block px-2.5 py-1 sm:px-4 sm:py-1.5 bg-orange-500 text-white text-[10px] sm:text-xs font-bold rounded-full group-hover:bg-orange-600 transition-colors">Buka Layanan</span>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onNavigate("menu")}
            className="group bg-white hover:bg-emerald-50/25 p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-emerald-100 shadow-sm cursor-pointer transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
            id="card-nav-menu"
          >
            <div className="space-y-2.5 sm:space-y-4">
              <div className="w-11 h-11 sm:w-16 sm:h-16 bg-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-600 text-xl sm:text-3xl shrink-0 group-hover:scale-105 transition-transform">
                🍽️
              </div>
              <div className="space-y-1 p-0 text-left">
                <h3 className="text-sm sm:text-xl font-black text-slate-800 group-hover:text-emerald-600 transition-colors">Siklus Menu</h3>
                <p className="text-slate-500 text-[10px] sm:text-xs leading-normal sm:leading-relaxed">Jadwal menu makanan pasien untuk Siklus ke-1 s/d Siklus ke-10 RSUD.</p>
              </div>
            </div>
            <div className="text-left">
              <span className="inline-block px-2.5 py-1 sm:px-4 sm:py-1.5 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold rounded-full group-hover:bg-emerald-600 transition-colors">Lihat Menu</span>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onNavigate("edukasi")}
            className="group bg-white hover:bg-blue-50/25 p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-blue-100 shadow-sm cursor-pointer transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
            id="card-nav-edukasi"
          >
            <div className="space-y-2.5 sm:space-y-4">
              <div className="w-11 h-11 sm:w-16 sm:h-16 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 text-xl sm:text-3xl shrink-0 group-hover:scale-105 transition-transform">
                📚
              </div>
              <div className="space-y-1 p-0 text-left">
                <h3 className="text-sm sm:text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">Edukasi Gizi</h3>
                <p className="text-slate-500 text-[10px] sm:text-xs leading-normal sm:leading-relaxed">Kumpulan tips, leaflet digital, dan panduan pola makan sehat.</p>
              </div>
            </div>
            <div className="text-left">
              <span className="inline-block px-2.5 py-1 sm:px-4 sm:py-1.5 bg-blue-500 text-white text-[10px] sm:text-xs font-bold rounded-full group-hover:bg-blue-600 transition-colors">Baca Materi</span>
            </div>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => onNavigate("feedback")}
            className="group bg-white hover:bg-purple-50/25 p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-purple-100 shadow-sm cursor-pointer transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
            id="card-nav-feedback"
          >
            <div className="space-y-2.5 sm:space-y-4">
              <div className="w-11 h-11 sm:w-16 sm:h-16 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-purple-600 text-xl sm:text-3xl shrink-0 group-hover:scale-105 transition-transform">
                💬
              </div>
              <div className="space-y-1 p-0 text-left">
                <h3 className="text-sm sm:text-xl font-black text-slate-800 group-hover:text-purple-600 transition-colors">Umpan Balik</h3>
                <p className="text-slate-500 text-[10px] sm:text-xs leading-normal sm:leading-relaxed">Sampaikan kritik dan saran untuk perbaikan kualitas layanan gizi.</p>
              </div>
            </div>
            <div className="text-left">
              <span className="inline-block px-2.5 py-1 sm:px-4 sm:py-1.5 bg-purple-500 text-white text-[10px] sm:text-xs font-bold rounded-full group-hover:bg-purple-600 transition-colors">Kirim Saran</span>
            </div>
          </div>

        </div>
      </div>

      {/* Grid: Live Schedule & Interactive Fact Card - DYNAMIC WIDGET SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="dashboard-widgets-grid">
        
        {/* Live meal Schedule Card with Vibrant outlines */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 flex flex-col justify-between space-y-4" id="widget-meal-schedule">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-lg">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span>Pelacakan Jam Gizi Pasien</span>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-mono">
                {currentTimeStr || "WITA"}
              </span>
            </div>
            <p className="text-slate-500 text-xs">
              Sistem memonitor jam persiapan & pembagian makanan secara berkelanjutan di dapur gizi RSUD Kalabahi.
            </p>
          </div>

          <div className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${currentMealStatus.color}`}>
            <div className="p-2 bg-white/80 rounded-lg shadow-xs mt-1">
              <span className="text-lg"><Utensils className="w-5 h-5 text-emerald-700" /></span>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm sm:text-base">{currentMealStatus.session}</h3>
              <p className="text-xs font-semibold uppercase">{currentMealStatus.time}</p>
              <p className="text-xs opacity-90 leading-relaxed">{currentMealStatus.desc}</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 text-xs border-t border-slate-50">
            <span className="text-slate-400 font-medium">Penyajian Higienis • Ramah Gizi</span>
            <button
              id="lnk-whats-schedule"
              onClick={() => onNavigate("menu")}
              className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-0.5"
            >
              Detail Siklus Menu 10 Hari →
            </button>
          </div>
        </div>

        {/* Dynamic Edukasi Fact Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-blue-100 flex flex-col justify-between space-y-4" id="widget-nutritional-tips">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-lg">
              <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
              <span>Edu-Tips Gizi Hari Ini</span>
            </div>
            <p className="text-slate-500 text-xs">
              Kiat praktis kesehatan gizi klinis pilihan ahli diet RSUD Kalabahi.
            </p>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 relative shadow-3xs">
            <span className="absolute -top-3 left-3 bg-blue-500 text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> Berpikir Sehat
            </span>
            <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed pt-1 font-medium">
              &ldquo;{randomFact || "Pemenuhan diet khusus mempercepat kesembuhan organ tubuh."}&rdquo;
            </p>
          </div>

          <div className="flex justify-between items-center pt-2 text-xs">
            <button
              id="btn-shuffle-facts"
              onClick={() => {
                const idx = Math.floor(Math.random() * nutritionFacts.length);
                setRandomFact(nutritionFacts[idx]);
              }}
              className="text-blue-700 hover:text-blue-800 font-bold underline underline-offset-2"
            >
              Acak Tips Lainnya
            </button>
            <button
              id="lnk-nav-edukasi"
              onClick={() => onNavigate("edukasi")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all"
            >
              Konsul Tanya Gizi AI →
            </button>
          </div>
        </div>

      </div>

      {/* Hospital contact callout section - Vibrant Theme style */}
      <div className="bg-white p-6 rounded-3xl border-2 border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 shadow-xs" id="banner-contact-shortcut">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-3xs">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-slate-800 font-bold text-base">Butuh Bantuan Petugas Gizi?</h4>
            <p className="text-slate-500 text-xs leading-relaxed">Hubungi penanggung jawab asupan gizi rawat rujukan Anda secara langsung via WhatsApp.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-700">Piket Active: 07.00 - 19.00 WITA</span>
          </div>
          <button
            id="btn-nav-to-hubungi"
            onClick={() => onNavigate("hubungi")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 uppercase tracking-wider"
          >
            Hubungi Petugas Gizi
          </button>
        </div>
      </div>
    </div>
  );
}
