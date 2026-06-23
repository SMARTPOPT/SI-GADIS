/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Coffee, 
  Apple, 
  Award, 
  CheckCircle, 
  Printer, 
  ChevronRight, 
  Info,
  Cookie
} from "lucide-react";

interface SnackDetail {
  name: string;
  weight: string;
  calories: string;
  description: string;
}

interface SnackDayMenu {
  day: string;
  romanDay: string;
  pagi: SnackDetail;
  siang: SnackDetail;
}

const SNACK_CYCLE: SnackDayMenu[] = [
  {
    day: "Siklus I",
    romanDay: "I",
    pagi: {
      name: "Puding Labu Kuning",
      weight: "100 gr",
      calories: "110 kalori",
      description: "Puding lembut berserat tinggi tinggi zat beta-karoten untuk kesehatan lambung."
    },
    siang: {
      name: "Bubur sum-sum",
      weight: "100 gr",
      calories: "164 kalori",
      description: "Bubur tepung beras tradisional yang halus, sangat mudah dicerna sebagai asupan energi."
    }
  },
  {
    day: "Siklus II",
    romanDay: "II",
    pagi: {
      name: "Bolu gulung ubi ungu",
      weight: "100 gr",
      calories: "135 kalori",
      description: "Kue bolu lembut dari ubi ungu kaya antosianin sebagai antioksidan alami seluler."
    },
    siang: {
      name: "Pancake pisang",
      weight: "100 gr",
      calories: "141 kalori",
      description: "Pancake pisang lumat berserat sedang tanpa pemanis buatan, kaya akan kalium alami."
    }
  },
  {
    day: "Siklus III",
    romanDay: "III",
    pagi: {
      name: "Ongol-ongol",
      weight: "100 gr",
      calories: "128 kalori",
      description: "Kue kenyal tradisional berbahan pati alami yang nyaman untuk pencernaan sensitif."
    },
    siang: {
      name: "Klepon ubi ungu",
      weight: "100 gr",
      calories: "125 kalori",
      description: "Klepon ubi ungu kukus bertabur kelapa parut rendah lemak dengan isian gula aren alami."
    }
  },
  {
    day: "Siklus IV",
    romanDay: "IV",
    pagi: {
      name: "Cantik manis",
      weight: "100 gr",
      calories: "148 kalori",
      description: "Kadar pati hunkwe seimbang dengan santan encer steril untuk perlindungan mukosa."
    },
    siang: {
      name: "Bolu labu kuning",
      weight: "100 gr",
      calories: "138 kalori",
      description: "Bolu kukus labu kuning tinggi serat mikro sel dan rendah kandungan natrium."
    }
  },
  {
    day: "Siklus V",
    romanDay: "V",
    pagi: {
      name: "Puding jagung",
      weight: "100 gr",
      calories: "129 kalori",
      description: "Puding manis alami jagung manis kaya akan lutein and mineral esensial harian."
    },
    siang: {
      name: "Perkedel talas kukus",
      weight: "100 gr",
      calories: "112 kalori",
      description: "Sajian gurih rendah kalori pati talas kukus, bebas kolesterol, aman bagi jantung."
    }
  },
  {
    day: "Siklus VI",
    romanDay: "VI",
    pagi: {
      name: "Roti isi sayur",
      weight: "100 gr",
      calories: "158 kalori",
      description: "Roti gandum isi cincangan wortel dan labu siam kukus ringan bernutrisi fiber tinggi."
    },
    siang: {
      name: "Puding ubi ungu",
      weight: "100 gr",
      calories: "125 kalori",
      description: "Sajian puding gelatin serat ubi ungu penenang pencernaan dengan rasa manis lembut."
    }
  },
  {
    day: "Siklus VII",
    romanDay: "VII",
    pagi: {
      name: "Puding kelor",
      weight: "100 gr",
      calories: "110 kalori",
      description: "Ekstrak daun kelor (Moringa) kaya vitamin C & kalsium tinggi sebagai imunitas."
    },
    siang: {
      name: "Cookies kelor",
      weight: "100 gr",
      calories: "148 kalori",
      description: "Cookies rendah gula olahan daun kelor segar bergizi murni pendamping pemulihan."
    }
  }
];

export default function MenuSnackTab() {
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const activeMenu = SNACK_CYCLE[selectedDayIdx];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in" id="menu-snack-tab-panel">
      
      {/* Intro info card - Styled in Vibrant Rose/Pink Medical Palette */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4" id="snack-menu-intro">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-rose-100 text-rose-800 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
              SIKLUS 7 HARI
            </span>
            <span className="bg-pink-100 text-pink-800 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
              DIET KHUSUS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-emerald-950 flex items-center gap-2 mt-1">
            <Cookie className="w-6 h-6 text-emerald-600 animate-pulse" />
            <span>Siklus Menu Snack Pasien dengan Diet Khusus</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-2xl">
            Daftar asuhan makanan selingan (Snack) pagi dan siang untuk menunjang kebutuhan gizi kalori mikro bagi pasien dengan terapi diet khusus rawat inap RSUD Kalabahi.
          </p>
        </div>

        <button 
          onClick={handlePrint}
          className="px-3.5 py-2.5 rounded-2xl text-xs font-black uppercase border-2 border-emerald-250 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Printer className="w-4 h-4" />
          Cetak Daftar Snack
        </button>
      </div>

      {/* Days Selection Map */}
      <div className="bg-white p-5 rounded-3xl border-2 border-emerald-100 space-y-4 shadow-sm" id="snack-day-selector">
        <span className="text-slate-600 text-[10px] uppercase font-black tracking-widest block">
          Pilih Siklus Hari (Klik untuk melihat sajian snack harian):
        </span>
        <div className="flex flex-wrap gap-2.5 justify-start lg:justify-between items-center" id="snack-days-row">
          {SNACK_CYCLE.map((item, index) => {
            const isSelected = selectedDayIdx === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedDayIdx(index)}
                className={`flex-1 min-w-[70px] h-12 sm:h-14 rounded-2xl border-2 font-black text-xs sm:text-sm flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-md scale-105"
                    : "bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border-slate-200 text-slate-700"
                }`}
              >
                <span>Hari {item.romanDay}</span>
                <span className="text-[8px] opacity-85 font-mono font-bold">100 gr</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="snack-day-feature-grid">
        
        {/* Snack Pagi Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-amber-100 hover:shadow-md transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
                  <Coffee className="w-5 h-5 shrink-0" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-amber-500 font-extrabold uppercase tracking-wider block">WAKTU SAJI</span>
                  <h4 className="font-black text-slate-800 text-sm">SNACK PAGI (10:00 WITA)</h4>
                </div>
              </div>
              <span className="bg-amber-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">HARIAN</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Nama Menu Snack</span>
                <p className="text-slate-900 font-black text-base sm:text-lg">{activeMenu.pagi.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[9px] uppercase font-mono font-bold block">Takaran Porsi</span>
                  <p className="text-slate-800 font-black text-sm">{activeMenu.pagi.weight}</p>
                </div>
                <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                  <span className="text-amber-800 text-[9px] uppercase font-mono font-bold block">Kandungan Energi</span>
                  <p className="text-amber-900 font-black text-sm">{activeMenu.pagi.calories}</p>
                </div>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-normal text-slate-600 text-[11px] font-semibold">
                <span className="text-slate-400 font-mono text-[9px] uppercase block mb-0.5">Informasi Manfaat Klinis</span>
                {activeMenu.pagi.description}
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/55 p-3.5 rounded-2xl border border-emerald-100 flex items-center justify-center text-center text-[10px] text-emerald-900 font-bold">
            Direkomendasikan disajikan hangat oleh petugas pramusaji bangsal.
          </div>
        </div>

        {/* Snack Siang Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-pink-100 hover:shadow-md transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-pink-100 text-pink-600 rounded-xl">
                  <Apple className="w-5 h-5 shrink-0" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-pink-500 font-extrabold uppercase tracking-wider block">WAKTU SAJI</span>
                  <h4 className="font-black text-slate-800 text-sm">SNACK SIANG/SORE (16:00 WITA)</h4>
                </div>
              </div>
              <span className="bg-pink-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">HARIAN</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Nama Menu Snack</span>
                <p className="text-slate-900 font-black text-base sm:text-lg">{activeMenu.siang.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[9px] uppercase font-mono font-bold block">Takaran Porsi</span>
                  <p className="text-slate-800 font-black text-sm">{activeMenu.siang.weight}</p>
                </div>
                <div className="bg-pink-50/50 p-2.5 rounded-xl border border-pink-100">
                  <span className="text-pink-800 text-[9px] uppercase font-mono font-bold block">Kandungan Energi</span>
                  <p className="text-pink-900 font-black text-sm">{activeMenu.siang.calories}</p>
                </div>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-normal text-slate-600 text-[11px] font-semibold">
                <span className="text-slate-400 font-mono text-[9px] uppercase block mb-0.5">Informasi Manfaat Klinis</span>
                {activeMenu.siang.description}
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/55 p-3.5 rounded-2xl border border-emerald-100 flex items-center justify-center text-center text-[10px] text-emerald-900 font-bold">
            Menu lunak berkalori khusus untuk menjaga kadar gula darah & imunitas tubuh.
          </div>
        </div>

      </div>

      {/* Printable Master Sheet Table representing the entire 7 dias cycle */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-200 shadow-md space-y-8 overflow-x-auto" id="printable-snack-sheet">
        <div className="text-center space-y-1.5" id="snack-sheet-header">
          <div className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">MATRIKS REKAPITULASI RESMI SIKLUS SNACK</div>
          <h3 className="text-lg sm:text-xl font-black text-slate-800 uppercase">
            Siklus Menu Snack Pasien Dengan Diet Khusus RSUD Kalabahi
          </h3>
          <p className="text-xs text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Acuan baku olah bahan makanan lembut, puding, bolu kukus, dan camilan kelor bermutu asuhan gizi terstandarisasi.
          </p>
          <div className="h-0.5 bg-slate-800 mt-2 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-black text-slate-800">
              UNIT GIZI KLINIS
            </div>
          </div>
        </div>

        <table className="w-full border-collapse border border-slate-400" id="snack-matrix-table">
          <thead>
            <tr className="bg-slate-150 font-black border border-slate-400">
              <th className="border border-slate-400 p-2.5 text-center text-xs w-[12%] bg-slate-100">SIKLUS</th>
              <th className="border border-slate-400 p-2.5 text-left text-xs bg-amber-50/75">SNACK PAGI (10:00 WITA)</th>
              <th className="border border-slate-400 p-2.5 text-left text-xs bg-pink-50/75">SNACK SIANG (16:00 WITA)</th>
            </tr>
          </thead>
          <tbody>
            {SNACK_CYCLE.map((m, idx) => (
              <tr key={idx} className="border border-slate-400 hover:bg-slate-50 transition-all">
                <td className="border border-slate-400 p-2.5 font-black text-center align-middle bg-slate-50 text-xs sm:text-sm">
                  Hari {m.romanDay}
                </td>
                <td className="border border-slate-400 p-3 vertical-top bg-amber-50/[0.15]">
                  <div className="font-extrabold text-slate-800 text-xs sm:text-sm">{m.pagi.name}</div>
                  <div className="flex gap-1.5 items-center mt-1">
                    <span className="bg-amber-100 text-amber-900 text-[8.5px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wide">{m.pagi.weight}</span>
                    <span className="bg-slate-100 text-slate-600 text-[8.5px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wide">{m.pagi.calories}</span>
                  </div>
                </td>
                <td className="border border-slate-400 p-3 vertical-top bg-pink-50/[0.15]">
                  <div className="font-extrabold text-slate-800 text-xs sm:text-sm">{m.siang.name}</div>
                  <div className="flex gap-1.5 items-center mt-1">
                    <span className="bg-pink-100 text-pink-900 text-[8.5px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wide">{m.siang.weight}</span>
                    <span className="bg-slate-100 text-slate-600 text-[8.5px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wide">{m.siang.calories}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Official Signatures for printable form style */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6" id="snack-menu-notes-footer">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
            <p className="text-emerald-700 font-extrabold text-xs">Jadwal Snack Diet Resmi Instalasi Gizi RSD Kalabahi</p>
          </div>
          <span className="border-2 border-emerald-400 border-dashed text-emerald-600 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-sm select-none rotate-[-1deg] inline-block opacity-85">
            TERVERIFIKASI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-slate-600 text-xs font-semibold leading-relaxed">
          <div className="space-y-1.5">
            <p className="font-extrabold text-slate-800 uppercase text-[10px] tracking-wider">Akurasi Gizi Tinggi</p>
            <p>Makanan selingan (snack) dirancang kaya akan karbohidrat kompleks lunak dan serat saring. Berguna mempertahankan pasokan energi sel tubuh tanpa merugikan lambung atau memperburuk inflamasi organ.</p>
          </div>
          <div className="space-y-1.5">
            <p className="font-extrabold text-slate-800 uppercase text-[10px] tracking-wider">Variasi Lokal Kalabahi</p>
            <p>Memasukkan bahan pangan berdaya lokal seperti Ubi Ungu, Labu Kuning Alor, dan Ekstrak Moringa (Daun Kelor) segar khas Nusa Tenggara Timur yang terbukti tinggi mikronutrien.</p>
          </div>
        </div>

        {/* Signature Box */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-1 text-center font-bold text-xs">
          <div className="space-y-16">
            <p className="text-slate-500 uppercase tracking-wider text-[9px]">Mengetahui</p>
            <div>
              <p className="text-slate-800 font-black text-xs sm:text-sm">Elkar Meliati B Fobia, S.Gz</p>
              <p className="text-slate-400 font-bold text-[10px]">Kepala Instalasi Gizi</p>
            </div>
          </div>
          <div className="space-y-16">
            <p className="text-slate-500 uppercase tracking-wider text-[9px]">Dibuat & Diverifikasi Oleh</p>
            <div>
              <p className="text-slate-800 font-black text-xs sm:text-sm">Debora Maata, Amd.Gz</p>
              <p className="text-slate-400 font-bold text-[10px]">Penanggung Jawab Diet & Menu Pasien</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
