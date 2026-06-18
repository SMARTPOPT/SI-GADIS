/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { OFFICIAL_UNIT_GIZI_MENUS } from "../data/nutritionData";
import { Calendar, Apple, Clock, Check, Utensils, Coffee, Moon, Award, FileText, CheckCircle, Printer } from "lucide-react";

export default function MenuRsdTab() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeMenuDiet, setActiveMenuDiet] = useState("biasa");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const dietTypeLabels: Record<string, string> = {
    biasa: "Makanan Biasa (Normal)",
    lambung: "Diet Lambung / Lunak",
    rendahGaram: "Diet Rendah Garam (RG)",
    diabetes: "Diet Rendah Gula (DM)"
  };

  const currentDayMenu = OFFICIAL_UNIT_GIZI_MENUS.find(m => m.day === selectedDay) || OFFICIAL_UNIT_GIZI_MENUS[0];

  const effectiveSnackPagi = "Roti + Teh dan Kacang Hijau + Delima (Disesuaikan)";

  // Helper adjustment function to simulate how food modifications work in RSUD Kalabahi
  const adjustForDiet = (foodName: string, category: 'karbo' | 'hewani' | 'nabati' | 'sayur' | 'buah' | 'snack') => {
    if (!foodName || foodName === "-") return { name: "-", status: "Normal" };
    if (activeMenuDiet === "biasa") return { name: foodName, status: "Normal" };

    if (activeMenuDiet === "lambung") {
      if (category === 'karbo') {
        return { name: "Bubur Kasar / Nasi Tim Lembut", status: "Kukus Lunak" };
      }
      if (category === 'hewani') {
        if (foodName.includes("Goreng") || foodName.includes("Crispy") || foodName.includes("goreng")) {
          return { name: foodName.replace(/Goreng/g, "Tim Semur").replace(/goreng/g, "tim").replace("Crispy", "Lembut"), status: "Tanpa Penggorengan" };
        }
        if (foodName.includes("Ceplok") || foodName.includes("mata sapi")) {
          return { name: "Telur Rebus / Tim Lembut", status: "Rebus Lunak" };
        }
      }
      if (category === 'sayur') {
        if (foodName.includes("Sawi") || foodName.includes("Satan") || foodName.includes("Lodeh") || foodName.includes("Rumpu")) {
          return { name: "Sup Wortel Labu Siam Tim Saring", status: "Bebas Serat Kasar & Gas" };
        }
      }
      if (category === 'buah') {
        return { name: "Pisang Masak Lumat / Jus Apel", status: "Mudah Dicerna" };
      }
      if (category === 'snack') {
        return { name: "Susu Halus / Tepung Saring", status: "Porsi Ringan" };
      }
    }

    if (activeMenuDiet === "rendahGaram") {
      if (foodName.includes("Goreng") || foodName.includes("Balado") || foodName.includes("Kecap") || foodName.includes("goreng") || foodName.includes("Rica")) {
        return { name: `${foodName} (Tanpa Garam / RG)`, status: "Diproses Tanpa NaCl" };
      }
      return { name: `${foodName} (Rendah Sodium)`, status: "Minimal Natrium" };
    }

    if (activeMenuDiet === "diabetes") {
      if (category === 'karbo') {
        return { name: "Nasi Merah Gizi Seimbang / Oat", status: "Indeks Glikemik Rendah" };
      }
      if (category === 'snack') {
        return { name: "Camilan Buah Segar Pepaya / Apel Tanpa Gula", status: "Tanpa Karbo Sederhana" };
      }
      if (foodName.includes("Manis") || foodName.includes("Bacem") || foodName.includes("Kolek") || foodName.includes("Kecap")) {
        return { name: foodName.replace("Manis", "Rendah Kalori").replace("Bacem", "Kukus Rempah").replace("Kecap", "Sari Kedelai Rendah Gula"), status: "Tanpa Gula Merah/Pasir" };
      }
    }

    return { name: foodName, status: "Normal" };
  };

  const printDocument = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="menu-rsd-tab-panel">
      
      {/* Intro info card - Styled in Vivid Rose Theme */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4" id="rsd-menu-intro">
        <div className="space-y-1">
          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
            JADWAL RESMI INSTALASI GIZI
          </span>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 mt-1">
            <Award className="w-5.5 h-5.5 text-emerald-600 animate-pulse" />
            <span>Siklus Menu Unit Gizi Hari RSD Kalabahi</span>
          </h2>
          <p className="text-slate-500 text-xs font-semibold">
            Menampilkan jadwal menu resmi dari Unit Gizi RSD Kalabahi untuk pasien rawat inap dalam siklus 7 hari.
          </p>
        </div>
        
        {/* View Mode & Actions Group */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode("card")}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-2 flex items-center gap-1.5 cursor-pointer ${
              viewMode === "card"
                ? "bg-slate-800 border-slate-800 text-white shadow-xs"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Clock className="w-4 h-4" />
            Tampilan Interaktif
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-2 flex items-center gap-1.5 cursor-pointer ${
              viewMode === "table"
                ? "bg-slate-800 border-slate-800 text-white shadow-xs"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <FileText className="w-4 h-4" />
            Tabel Format Dokumen
          </button>
          <button
            onClick={printDocument}
            className="px-3.5 py-2 rounded-2xl text-xs font-black uppercase border-2 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Cetak Menu
          </button>
        </div>
      </div>

      {viewMode === "card" ? (
        <>
          {/* Diet filters for Interactive Mode */}
          <div className="bg-slate-50/70 p-4 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="text-[10px] uppercase font-black text-slate-500 tracking-wider">
              Kategori Diet Pasien:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(dietTypeLabels).map(([role, label]) => (
                <button
                  key={role}
                  onClick={() => setActiveMenuDiet(role)}
                  className={`text-[10px] sm:text-xs px-3 py-1.5 rounded-full border-2 font-black transition-all cursor-pointer ${
                    activeMenuDiet === role
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Day selection pills */}
          <div className="bg-white p-5 rounded-3xl border-2 border-emerald-100 space-y-4 shadow-sm" id="rsd-calendar-bar">
            <span className="text-slate-600 text-[10px] uppercase font-black tracking-widest block">
              PILIH HARI SIKLUS (7 HARI SIKLUS UTAMA):
            </span>
            <div className="flex flex-wrap gap-2.5 justify-start lg:justify-between items-center">
              {Array.from({ length: 7 }).map((_, index) => {
                const dayNum = index + 1;
                const isSelected = selectedDay === dayNum;
                const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];
                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`flex-1 min-w-[70px] py-3 rounded-2xl border-2 font-black text-xs sm:text-sm flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-md scale-105"
                        : "bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border-slate-200 text-slate-700"
                    }`}
                  >
                    <span>Hari {dayNum}</span>
                    <span className="text-[8px] opacity-80 font-bold">Siklus {romanNumerals[index]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Meals Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="rsd-dishes-grid">
            
            {/* Breakfast Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-orange-100 hover:shadow-md transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-orange-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] text-orange-500 font-extrabold uppercase tracking-wider block">WAKTU MAKAN</span>
                      <h4 className="font-black text-slate-800 text-sm">PAGI (07:00 WITA)</h4>
                    </div>
                  </div>
                  <span className="bg-orange-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">UTAMA</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Makanan Dasar</span>
                    <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.karbohidrat, 'karbo').name}</p>
                    {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-orange-50 text-orange-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.breakfast.karbohidrat, 'karbo').status}</span>}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Hewani / Protein</span>
                    <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.laukHewani, 'hewani').name}</p>
                    {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-orange-50 text-orange-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.breakfast.laukHewani, 'hewani').status}</span>}
                  </div>

                  {currentDayMenu.breakfast.laukNabati !== "-" && (
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Nabati</span>
                      <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.laukNabati, 'nabati').name}</p>
                    </div>
                  )}

                  {currentDayMenu.breakfast.sayur !== "-" && (
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Sayur</span>
                      <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.sayur, 'sayur').name}</p>
                      {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-orange-50 text-orange-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.breakfast.sayur, 'sayur').status}</span>}
                    </div>
                  )}

                  {currentDayMenu.breakfast.buah !== "-" && (
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Buah</span>
                      <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.buah, 'buah').name}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Snack Pagi bar */}
              <div className="bg-orange-50/50 p-3.5 rounded-2xl border-2 border-orange-100 flex items-center gap-2">
                <Apple className="w-5 h-5 text-orange-600 shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-orange-850 block">Selingan Pagi (10:00 WITA)</span>
                  <p className="text-xs text-slate-800 font-bold leading-normal">{effectiveSnackPagi}</p>
                  {activeMenuDiet !== "biasa" && <span className="text-[8.5px] text-orange-700 font-bold block">Disaring halus / Porsi Diet</span>}
                </div>
              </div>
            </div>

            {/* Lunch Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-150 hover:shadow-md transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] text-emerald-500 font-extrabold uppercase tracking-wider block">WAKTU MAKAN</span>
                      <h4 className="font-black text-slate-800 text-sm">SIANG (12:00 WITA)</h4>
                    </div>
                  </div>
                  <span className="bg-emerald-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">UTAMA</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Karbohidrat</span>
                    <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.lunch.karbohidrat, 'karbo').name}</p>
                    {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-emerald-50 text-emerald-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.lunch.karbohidrat, 'karbo').status}</span>}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Hewani / Protein</span>
                    <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.lunch.laukHewani, 'hewani').name}</p>
                    {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-emerald-50 text-emerald-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.lunch.laukHewani, 'hewani').status}</span>}
                  </div>

                  {currentDayMenu.lunch.laukNabati !== "-" && (
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Nabati</span>
                      <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.lunch.laukNabati, 'nabati').name}</p>
                    </div>
                  )}

                  {currentDayMenu.lunch.sayur !== "-" && (
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Sayur</span>
                      <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.lunch.sayur, 'sayur').name}</p>
                      {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-emerald-50 text-emerald-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.lunch.sayur, 'sayur').status}</span>}
                    </div>
                  )}

                  {currentDayMenu.lunch.buah !== "-" && (
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Buah Segar</span>
                      <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.lunch.buah, 'buah').name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-emerald-50/55 p-3.5 rounded-2xl border-2 border-emerald-100 flex items-center justify-center text-center text-[10px] text-emerald-900 font-bold">
                🍎 Buah Brangan atau Pisang Ambon berkualitas tinggi untuk gizi seimbang.
              </div>
            </div>

            {/* Dinner Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-blue-100 hover:shadow-md transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                      <Moon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] text-blue-500 font-extrabold uppercase tracking-wider block">WAKTU MAKAN</span>
                      <h4 className="font-black text-slate-800 text-sm">MALAM (18:30 WITA)</h4>
                    </div>
                  </div>
                  <span className="bg-blue-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">UTAMA</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Karbohidrat</span>
                    <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.dinner.karbohidrat, 'karbo').name}</p>
                    {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-blue-50 text-blue-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.dinner.karbohidrat, 'karbo').status}</span>}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Hewani / Protein</span>
                    <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.dinner.laukHewani, 'hewani').name}</p>
                    {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-blue-50 text-blue-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.dinner.laukHewani, 'hewani').status}</span>}
                  </div>

                  {currentDayMenu.dinner.laukNabati !== "-" && (
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Nabati</span>
                      <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.dinner.laukNabati, 'nabati').name}</p>
                    </div>
                  )}

                  {currentDayMenu.dinner.sayur !== "-" && (
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Sayur</span>
                      <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.dinner.sayur, 'sayur').name}</p>
                      {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-blue-50 text-blue-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.dinner.sayur, 'sayur').status}</span>}
                    </div>
                  )}

                  {currentDayMenu.dinner.buah !== "-" && (
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Buah</span>
                      <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.dinner.buah, 'buah').name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-55/40 p-3.5 rounded-2xl border-2 border-blue-100 flex items-center justify-center text-center text-[10px] text-blue-800 font-bold">
                🥦 Karbohidrat beras pulen atau bubur saring lembut membantu pemulihan cepat.
              </div>
            </div>

          </div>
        </>
      ) : (
        /* Document sheet view (Printable & Grid format) */
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-200 shadow-md space-y-8 overflow-x-auto" id="printable-rsd-sheet">
          <div className="text-center border-b-4 border-double border-slate-800 pb-6 space-y-2 min-w-[700px]">
            <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-wider">PEMERINTAH KABUPATEN ALOR</h3>
            <h2 className="font-black text-slate-900 text-2xl uppercase tracking-widest">RUMAH SAKIT DAERAH (RSD) KALABAHI</h2>
            <p className="text-slate-500 font-serif font-semibold italic text-xs">Jln. Dr. Sutomo No. 8 Kalabahi - Alor, Nusa Tenggara Timur</p>
            <div className="h-0.5 bg-slate-800 mt-2 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-black text-slate-800">
                UNIT INSTALASI GIZI / DAFTAR DIET SIKLU HARIAN
              </div>
            </div>
          </div>

          <div className="space-y-4 min-w-[800px]">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <p>Daftar Jadwal: Siklus Menu Rawat Inap (Siklus Hari I - VII)</p>
              <p>Model Format: Lembar Distribusi Gizi</p>
            </div>
            
            <table className="w-full text-slate-800 text-[11px] sm:text-xs border-collapse border border-slate-400">
              <thead>
                <tr className="bg-slate-100 font-black border border-slate-400">
                  <th className="border border-slate-400 p-2 text-center w-12">HARI SIKLUS</th>
                  <th className="border border-slate-400 p-2.5 text-left w-1/3 bg-orange-50/75">MENU PAGI (07:00 WITA)</th>
                  <th className="border border-slate-400 p-2.5 text-left w-1/3 bg-emerald-50/75">MENU SIANG (12:00 WITA)</th>
                  <th className="border border-slate-400 p-2.5 text-left w-1/3 bg-blue-50/75">MENU MALAM (18:30 WITA)</th>
                </tr>
              </thead>
              <tbody>
                {OFFICIAL_UNIT_GIZI_MENUS.map((m, idx) => {
                  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];
                  return (
                    <tr key={m.day} className="border border-slate-400 hover:bg-slate-50 transition-all">
                      <td className="border border-slate-400 p-2.5 font-black text-center align-middle bg-slate-50">
                        <div className="text-xs text-emerald-800">{romanNumerals[idx]}</div>
                        <div className="text-[9px] text-slate-400 uppercase">H-{m.day}</div>
                      </td>
                      <td className="border border-slate-400 p-3 vertical-top space-y-1 bg-orange-50/[0.15]">
                        <p className="font-extrabold text-slate-900">• {m.breakfast.karbohidrat}</p>
                        <p className="font-bold text-slate-700">• {m.breakfast.laukHewani}</p>
                        {m.breakfast.laukNabati !== "-" && <p className="text-slate-600">• {m.breakfast.laukNabati}</p>}
                        {m.breakfast.sayur !== "-" && <p className="text-slate-600 italic">• {m.breakfast.sayur}</p>}
                        {m.breakfast.buah !== "-" && <p className="text-slate-600">• {m.breakfast.buah}</p>}
                        <div className="mt-2 text-[9px] text-slate-400 border-t border-dashed border-slate-200 pt-1 font-mono">
                          Snack: Roti, Teh, Kc hijau
                        </div>
                      </td>
                      <td className="border border-slate-400 p-3 vertical-top space-y-1 bg-emerald-50/[0.15]">
                        <p className="font-extrabold text-slate-900">• {m.lunch.karbohidrat}</p>
                        <p className="font-bold text-slate-700">• {m.lunch.laukHewani}</p>
                        {m.lunch.laukNabati !== "-" && <p className="text-slate-600">• {m.lunch.laukNabati}</p>}
                        {m.lunch.sayur !== "-" && <p className="text-slate-600 italic">• {m.lunch.sayur}</p>}
                        {m.lunch.buah !== "-" && <p className="text-indigo-800 font-bold">• {m.lunch.buah}</p>}
                      </td>
                      <td className="border border-slate-400 p-3 vertical-top space-y-1 bg-blue-50/[0.15]">
                        <p className="font-extrabold text-slate-900">• {m.dinner.karbohidrat}</p>
                        <p className="font-bold text-slate-700">• {m.dinner.laukHewani}</p>
                        {m.dinner.laukNabati !== "-" && <p className="text-slate-600">• {m.dinner.laukNabati}</p>}
                        {m.dinner.sayur !== "-" && <p className="text-slate-600 italic">• {m.dinner.sayur}</p>}
                        {m.dinner.buah !== "-" && <p className="text-slate-600">• {m.dinner.buah}</p>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Official Signatures & N.B notes for RSD Kalabahi Menu */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6" id="rsd-menu-notes-footer">
        <div className="space-y-3">
          <h4 className="text-slate-900 font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
            Catatan Penting (NB):
          </h4>
          <ol className="list-decimal list-inside text-slate-600 text-xs sm:text-sm font-semibold space-y-2 leading-relaxed">
            <li>Snack pagi disesuaikan dengan bahan (Roti+Teh dan Kacang Hijau+Delima).</li>
            <li>Petugas yang belanja menyesuaikan bahan dan melaporkan kepada Penanggung Jawab (PJ).</li>
          </ol>
        </div>
        
        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Verifikasi Keaslian Dokumen</p>
            <p className="text-emerald-700 font-extrabold text-xs">Jadwal Diet & Siklus Makan RSD Kalabahi</p>
          </div>
          <div className="text-left md:text-right space-y-1.5">
            <p className="text-slate-500 text-xs font-semibold font-mono">Mengetahui,</p>
            <p className="text-slate-800 font-black text-xs sm:text-sm">Kepala Ruangan Gizi RSD Kalabahi</p>
            <div className="py-2 inline-block">
              <span className="border-2 border-emerald-400 border-dashed text-emerald-600 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-sm select-none rotate-[-1deg] inline-block opacity-85">
                RSD KALABAHI • VALIDATED STAMP
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-slate-900 font-black text-sm uppercase">Elkar Meliati B. Fobia, S.Gz</p>
              <p className="text-slate-400 font-bold text-xs font-mono">NIP. 19970202 202203 2 010</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
