/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CYCLE_MENUS } from "../data/nutritionData";
import { Calendar, Apple, Clock, Check, Utensils, Coffee, Moon } from "lucide-react";

export default function MenuTab() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeMenuDiet, setActiveMenuDiet] = useState("biasa");

  const dietTypeLabels: Record<string, string> = {
    biasa: "Makanan Biasa (Normal)",
    lambung: "Diet Lambung / Lunak",
    rendahGaram: "Diet Rendah Garam (RG)",
    diabetes: "Diet Rendah Gula (DM)"
  };

  const currentDayMenu = CYCLE_MENUS.find(m => m.day === selectedDay) || CYCLE_MENUS[0];

  // Helper adjustment function to simulate how food modifications work in RSUD Kalabahi
  const adjustForDiet = (foodName: string, category: 'karbo' | 'hewani' | 'nabati' | 'sayur' | 'buah' | 'snack') => {
    if (activeMenuDiet === "biasa") return { name: foodName, status: "Normal" };

    if (activeMenuDiet === "lambung") {
      if (category === 'karbo') {
        return { name: "Bubur Kasar / Nasi Tim Lembut", status: "Kukus Lunak" };
      }
      if (category === 'hewani') {
        if (foodName.includes("Goreng") || foodName.includes("Crispy")) {
          return { name: foodName.replace("Goreng", "Tim Semur").replace("Crispy", "Lembut"), status: "Tanpa Penggorengan" };
        }
        if (foodName.includes("Ceplok")) {
          return { name: "Telur Ceplok Air (Poached) / Tim", status: "Rebus Lunak" };
        }
      }
      if (category === 'sayur') {
        if (foodName.includes("Kangkung") || foodName.includes("Sawi") || foodName.includes("Satan")) {
          return { name: "Sup Wortel Labu Siam Tim Saring", status: "Bebas Gas Lambung" };
        }
      }
      if (category === 'buah') {
        if (foodName.includes("Nanas") || foodName.includes("Jeruk")) {
          return { name: "Papaya Iris Matang Sehat", status: "Aman dari Asam" };
        }
      }
      if (category === 'snack') {
        if (foodName && (foodName.includes("Kolek") || foodName.includes("Santan"))) {
          return { name: "Puding Tepung Maizena Lembut", status: "Bahan Halus" };
        }
      }
    }

    if (activeMenuDiet === "rendahGaram") {
      if (foodName.includes("Goreng") || foodName.includes("Balado") || foodName.includes("Kecap")) {
        return { name: `${foodName} (Tanpa Garam Tambahan / RG)`, status: "Diproses Tanpa NaCl" };
      }
      return { name: `${foodName} (Rendah Sodium)`, status: "Minimal Natrium" };
    }

    if (activeMenuDiet === "diabetes") {
      if (category === 'karbo') {
        return { name: "Nasi Merah Gizi Seimbang / Oat", status: "Indeks Glikemik Rendah" };
      }
      if (category === 'snack') {
        return { name: "Camilan Buah Segar Pepaya / Apel Tanpa Gula Tambahan", status: "Tanpa Karbohidrat Sederhana" };
      }
      if (foodName.includes("Manis") || foodName.includes("Bacem") || foodName.includes("Kolek")) {
        return { name: foodName.replace("Manis", "Rendah Kalori").replace("Bacem", "Kukus Rempah"), status: "Tanpa Gula Merah/Pasir" };
      }
    }

    return { name: foodName, status: "Disesuaikan" };
  };

  return (
    <div className="space-y-6" id="menu-tab-panel">
      
      {/* Intro info card - Styled in Vibrant Palette */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4" id="menu-intro-bar">
        <div className="space-y-1">
          <h2 className="text-slate-900 font-black text-xl tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            <span>Siklus Menu Makanan 10 Hari Gizi</span>
          </h2>
          <p className="text-slate-500 text-xs font-semibold">
            Instalasi Gizi RSUD Kalabahi menyajikan menu sehat higienis bersiklus 10 hari + hari ke-11 khusus penyesuaian tanggal 31.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(dietTypeLabels).map(([role, label]) => (
            <button
              key={role}
              id={`btn-menu-diet-${role}`}
              onClick={() => setActiveMenuDiet(role)}
              className={`text-xs px-3.5 py-2 rounded-full border-2 font-bold transition-all ${
                activeMenuDiet === role
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Ten-Day navigation Calendar - Styled in Vibrant Theme */}
      <div className="bg-white p-5 rounded-3xl border-2 border-emerald-100 space-y-4 shadow-sm" id="calendar-bar">
        <span className="text-slate-600 text-[10px] uppercase font-black tracking-widest block">
          PILIH HARI SIKLUS (Klik tombol di bawah untuk melihat hidangan gizi):
        </span>
        <div className="flex flex-wrap gap-2.5 justify-start lg:justify-between items-center" id="calendar-days-row">
          {Array.from({ length: 11 }).map((_, index) => {
            const dayNum = index + 1;
            const isSelected = selectedDay === dayNum;
            return (
              <button
                key={dayNum}
                id={`btn-select-day-${dayNum}`}
                onClick={() => setSelectedDay(dayNum)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 font-black text-xs sm:text-sm flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-md scale-105"
                    : "bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border-slate-200 text-slate-700"
                }`}
              >
                <span>H-{dayNum}</span>
                <span className="text-[8px] opacity-80 font-bold">{dayNum === 11 ? "Tgl 31" : "Siklus"}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Menu Saji: Pagi (Orange), Siang (Emerald), Malam (Blue) - Styled in Vibrant Palette */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="menu-distribution-grid">
        
        {/* PAGI (Orange theme) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-orange-100 hover:shadow-md transition-all flex flex-col justify-between space-y-5" id="meal-pagi-card">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-orange-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Makan Pagi</h3>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">DISTRIBUSI: 06:30 WITA</span>
                </div>
              </div>
              <span className="bg-orange-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">SARAPAN</span>
            </div>

            {/* List components */}
            <div className="space-y-3.5 text-xs">
              
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Karbohidrat</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.karbohidrat, 'karbo').name}</p>
                {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-orange-50 text-orange-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.breakfast.karbohidrat, 'karbo').status}</span>}
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Hewani / Protein</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.laukHewani, 'hewani').name}</p>
                {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-orange-50 text-orange-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.breakfast.laukHewani, 'hewani').status}</span>}
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Nabati</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.laukNabati, 'nabati').name}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Sayur Hangat</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.sayur, 'sayur').name}</p>
                {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-orange-50 text-orange-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.breakfast.sayur, 'sayur').status}</span>}
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Buah Segar</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.breakfast.buah, 'buah').name}</p>
                {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-orange-50 text-orange-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.breakfast.buah, 'buah').status}</span>}
              </div>

            </div>
          </div>

          {/* Snack Pagi bar */}
          {currentDayMenu.snackPagi && (
            <div className="bg-orange-50/50 p-3.5 rounded-2xl border-2 border-orange-100 flex items-center gap-2">
              <Apple className="w-5 h-5 text-orange-600 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-orange-850 block">Selingan Pagi (10:00 WITA)</span>
                <p className="text-xs text-slate-800 font-bold leading-normal">{adjustForDiet(currentDayMenu.snackPagi, 'snack').name}</p>
                {activeMenuDiet !== "biasa" && <span className="text-[8.5px] text-orange-700 font-bold block">Disaring halus</span>}
              </div>
            </div>
          )}

        </div>

        {/* LUNCH / SIANG (Emerald theme) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-150 hover:shadow-md transition-all flex flex-col justify-between space-y-5" id="meal-siang-card">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Makan Siang</h3>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">DISTRIBUSI: 12:00 WITA</span>
                </div>
              </div>
              <span className="bg-emerald-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">UTAMA</span>
            </div>

            {/* List components */}
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

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Nabati</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.lunch.laukNabati, 'nabati').name}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Sayur Gizi</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.lunch.sayur, 'sayur').name}</p>
                {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-emerald-50 text-emerald-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.lunch.sayur, 'sayur').status}</span>}
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Buah Segar</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.lunch.buah, 'buah').name}</p>
                {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-emerald-50 text-emerald-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.lunch.buah, 'buah').status}</span>}
              </div>

            </div>
          </div>

          {/* Snack Sore bar */}
          {currentDayMenu.snackSore && (
            <div className="bg-emerald-50/55 p-3.5 rounded-2xl border-2 border-emerald-100 flex items-center gap-2">
              <Apple className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800 block">Selingan Sore (16:00 WITA)</span>
                <p className="text-xs text-slate-800 font-bold leading-normal">{adjustForDiet(currentDayMenu.snackSore, 'snack').name}</p>
                {activeMenuDiet !== "biasa" && <span className="text-[8.5px] text-emerald-700 font-bold block">Disaring halus</span>}
              </div>
            </div>
          )}

        </div>

        {/* DINNER / MALAM (Blue theme) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-blue-100 hover:shadow-md transition-all flex flex-col justify-between space-y-5" id="meal-malam-card">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Makan Malam</h3>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">DISTRIBUSI: 18:00 WITA</span>
                </div>
              </div>
              <span className="bg-blue-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">PULIH</span>
            </div>

            {/* List components */}
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

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Lauk Nabati</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.dinner.laukNabati, 'nabati').name}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Sayur Gizi Sehat</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.dinner.sayur, 'sayur').name}</p>
                {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-blue-50 text-blue-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.dinner.sayur, 'sayur').status}</span>}
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">Buah Ringan</span>
                <p className="text-slate-800 font-bold">{adjustForDiet(currentDayMenu.dinner.buah, 'buah').name}</p>
                {activeMenuDiet !== "biasa" && <span className="inline-block mt-0.5 bg-blue-50 text-blue-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full">{adjustForDiet(currentDayMenu.dinner.buah, 'buah').status}</span>}
              </div>

            </div>
          </div>

          <div className="p-3 bg-slate-50 text-slate-500 text-[10px] text-center rounded-2xl border-2 border-dashed border-slate-200 font-medium">
            *Semua menu diolah higienis dan disajikan tertutup hangat.*
          </div>

        </div>

      </div>

    </div>
  );
}
