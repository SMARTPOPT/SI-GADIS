/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DIET_LIST } from "../data/nutritionData";
import { 
  Search, Heart, Check, AlertTriangle, X, CheckSquare, Sparkles, 
  HelpCircle, BookOpen, Utensils, Award, Info, ChevronDown, ChevronUp 
} from "lucide-react";

export default function DietTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDietId, setSelectedDietId] = useState(DIET_LIST[0].id);
  const [showReferences, setShowReferences] = useState(false);
  const [refSearch, setRefSearch] = useState("");

  // Detailed Ministry of Health (Kemenkes) References
  const kemenkesReferences = [
    {
      code: "PMK-78-2013",
      title: "PMK No. 78 Tahun 2013 tentang Pelayanan Gizi Rumah Sakit (PGRS)",
      desc: "Regulasi standar nasional untuk penyelenggaraan asuhan gizi, terapi diit, serta standardisasi ruang gizi di fasilitas kesehatan Indonesia.",
      category: "Asuhan Gizi Rumah Sakit",
      url: "https://gizi.kemkes.go.id"
    },
    {
      code: "PGS-KEMENKES-2014",
      title: "Pedoman Gizi Seimbang (PGS) Kementerian Kesehatan RI",
      desc: "Panduan asupan nutrisi harian nasional yang menggantikan semboyan 4 Sehat 5 Sempurna dengan prinsip 4 Pilar Gizi Seimbang.",
      category: "Pedoman Pokok",
      url: "https://kesmas.kemkes.go.id"
    },
    {
      code: "PIRING-MAKANKU",
      title: "Panduan Sekali Makan 'Piring Makanku' Kemenkes RI",
      desc: "Aturan membagi piring makan menjadi 1/2 piring sayur dan buah, 1/3 piring lauk pauk tinggi protein, dan 2/3 piring makanan pokok.",
      category: "Pedoman Makan",
      url: "https://ayosehat.kemkes.go.id"
    },
    {
      code: "PERMENKES-28-2019",
      title: "Permenkes RI No. 28 Tahun 2019 tentang Angka Kecukupan Gizi (AKG)",
      desc: "Standar kecukupan energi, protein, lemak, karbohidrat, air, serat harian untuk pemulihan dan kesehatan optimal penduduk Indonesia.",
      category: "Standar Nutrisi",
      url: "https://gizi.kemkes.go.id"
    },
    {
      code: "GERMAS-GGL",
      title: "Panduan Hidup Sehat GERMAS: Pembatasan Gula, Garam, Lemak (GGL)",
      desc: "Rekomendasi Kemenkes membatasi GGL harian per orang demi mencegah stroke dan maag: Maksimal Gula 4 sdm (50g), Garam 1 sdt (2g Natrium), Lemak 5 sdm (67g).",
      category: "Penyakit Degeneratif",
      url: "https://germas.kemkes.go.id"
    },
    {
      code: "PAGT-KEMENKES",
      title: "Panduan Proses Asuhan Gizi Terstandar (PAGT) Kementerian Kesehatan",
      desc: "Langkah asuhan terintegrasi mulai dari Skrining Gizi, Diagnosis, Intervensi Diet Klinik, hingga Monitoring Evaluasi gizi pasien rawat inap.",
      category: "Asuhan Gizi Rumah Sakit",
      url: "https://yankes.kemkes.go.id"
    },
    {
      code: "BUKU-MATS-2022",
      title: "Buku Saku Bahan Makanan Penukar Edisi Terbaru Kemenkes RI",
      desc: "Tabel klasifikasi takaran penukar karbohidrat, lauk pauk, golongan buah, sayur dan susu untuk merancang diet presisi.",
      category: "Bahan Makanan Penukar",
      url: "https://gizi.kemkes.go.id"
    },
    {
      code: "PANDUAN-KONSUL-DIET",
      title: "SOP Konseling Terapi Gizi Klinis Poliklinik Rawat Jalan Kemenkes",
      desc: "Acuan konseling edukasi gizi tatap muka yang dipraktikkan oleh tenaga nutrisionis bersertifikat di rumah sakit rujukan pemerintah.",
      category: "Konseling Gizi",
      url: "https://gizi.kemkes.go.id"
    },
    {
      code: "DIET-GASTRITIS-KEMENKES",
      title: "Panduan Diet Lambung Komprehensif Ditjen Pelayanan Kesehatan",
      desc: "Metode pemulihan mukosa gastrik mukosa dengan diet bubur saring hangat dan pelarangan asupan pemicu refluks dan gas lambung.",
      category: "Diet Spesifik Penyakit",
      url: "https://kemkes.go.id"
    },
    {
      code: "DIET-DM-GUIDE-2023",
      title: "Pedoman Penatalaksanaan Terapi Gizi Medis Diabetes Melitus Kemenkes RI",
      desc: "Algoritma asuhan diet diabetes terpadu guna mencapai euglikemia kronis dan menurunkan angka ketergantungan insulin.",
      category: "Diet Spesifik Penyakit",
      url: "https://gizi.kemkes.go.id"
    },
    {
      code: "DIET-GINJAL-REG",
      title: "Asuhan Gizi Rendah Protein Gagal Ginjal Kronis (GGK) Kemenkes RI",
      desc: "Formula penghitungan jumlah gram protein rendah biologis tinggi demi menjaga kestabilan ureum dan kreatinin darah pasien pre-dialisis.",
      category: "Diet Spesifik Penyakit",
      url: "https://yankes.kemkes.go.id"
    }
  ];

  // Filter diets based on search query
  const filteredDiets = DIET_LIST.filter(diet => 
    diet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    diet.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedDiet = DIET_LIST.find(d => d.id === selectedDietId) || DIET_LIST[0];

  // Filter references based on query
  const filteredReferences = kemenkesReferences.filter(ref =>
    ref.title.toLowerCase().includes(refSearch.toLowerCase()) ||
    ref.code.toLowerCase().includes(refSearch.toLowerCase()) ||
    ref.desc.toLowerCase().includes(refSearch.toLowerCase()) ||
    ref.category.toLowerCase().includes(refSearch.toLowerCase())
  );

  // Dynamic visual layout for "Piring Makanku Kemenkes" customized for each diet
  const getPiringMakankuAdvice = (dietId: string) => {
    switch (dietId) {
      case "dm":
        return {
          title: "Piring Makanku Spesial Diabetes Melitus (Kemenkes RI)",
          icon: "🥗",
          karbo: "25% Karbohidrat Kompleks (Ubi Rebus / Beras Merah)",
          lauk: "25% Lauk Rendah Lemak (Putih Telur / Ikan Panggang)",
          sayur: "35% Sayuran Kaya Serat (Bayam & Labu Siam)",
          buah: "15% Buah Rendah Glukosa (Pepaya / Apel Hijau)",
          warning: "Dilarang keras memakai sirup gula or madu!",
          color: "bg-emerald-50 text-emerald-800 border-emerald-200"
        };
      case "rg":
        return {
          title: "Piring Makanku Sehat Rendah Garam / Hipertensi (Kemenkes RI)",
          icon: "❤️",
          karbo: "30% Makanan Pokok Segar (Nasi Hangat Tanpa Garam)",
          lauk: "20% Lauk Segar Alami (Tahu / Ikan Kuah Kuning Asri)",
          sayur: "30% Sayuran Rebus Tanpa MSG (Sup Kimlo Bening)",
          buah: "20% Buah Kaya Kalium Pengusir Sodium (Pisang Mas / Semangka)",
          warning: "Maksimal garam setengah sendok teh per hari!",
          color: "bg-teal-50 text-teal-800 border-teal-200"
        };
      case "rp":
        return {
          title: "Piring Makanku Khusus Rendah Protein (Kemenkes RI)",
          icon: "⚡",
          karbo: "40% Sumber Karbohidrat Murni (Bihun Goreng Mentega / Kentang)",
          lauk: "15% Protein Berkualitas Tinggi Terbatas (Putih Telur Rebus)",
          sayur: "25% Sayuran Rendah Kalium (Labu Air Kukus / Sayur Bening)",
          buah: "20% Buah Segar yang Dibatasi Sesuai Volume Urin",
          warning: "Batasi konsumsi tahu tempe kedelai karena tinggi fosfor!",
          color: "bg-amber-50 text-amber-800 border-amber-200"
        };
      case "tktp":
        return {
          title: "Piring Makanku Tinggi Kalori Tinggi Protein (TKTP) (Kemenkes RI)",
          icon: "💪",
          karbo: "30% Karbo Padat Energi (Nasi Putih / Kentang Rebus)",
          lauk: "35% Protein Penyembuh Luka (Dua Butir Putih Telur + Dada Ayam)",
          sayur: "20% Sayur Sop Wortel Makaroni Bergizi",
          buah: "15% Buah Tinggi Vitamin C untuk Kolagen (Jeruk Manis Alor)",
          warning: "Makan secara hangat untuk mendongkrak nafsu makan harian!",
          color: "bg-blue-50 text-blue-800 border-blue-200"
        };
      case "lambung":
        return {
          title: "Piring Makanku Aman Lambung & Maag (Kemenkes RI)",
          icon: "🥣",
          karbo: "35% Karbohidrat Lunak (Bubur Beras Saring / Nasi Tim)",
          lauk: "25% Lauk Tekstur Lembut Mudah Lumat (Tahu Rebus / Ikan Tim)",
          sayur: "25% Sayur Serat Halus Non-Gas (Wortel Muda Kukus)",
          buah: "15% Buah Non-Asam Pelindung Mukosa (Pisang Ambon / Pepaya)",
          warning: "Kunyah 32 kali secara rileks agar terlumuri air liur sempurna!",
          color: "bg-rose-50 text-rose-800 border-rose-200"
        };
      default:
        return {
          title: "Piring Makanku Seimbang (Kemenkes RI)",
          icon: "🍽️",
          karbo: "30% Karbohidrat Sehat",
          lauk: "20% Lauk Pauk Bergizi",
          sayur: "30% Sayur-Mayur Segar",
          buah: "20% Buah-Buahan Alami",
          warning: "Konsumsi bervariasi setiap hari demi nutrisi makro mikro seimbang.",
          color: "bg-slate-50 text-slate-800 border-slate-205"
        };
    }
  };

  const piringGuide = getPiringMakankuAdvice(selectedDiet.id);

  return (
    <div className="space-y-6" id="diet-tab-panel">
      
      {/* 1. Header Minimal & Menarik: Cari Diet */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-5 rounded-3xl shadow-md text-white space-y-3" id="diet-header-banner">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="bg-white/25 text-emerald-100 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full tracking-wider">
              Pilihan Khusus Pasien
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <Utensils className="w-5.5 h-5.5 text-emerald-100" />
              <span>Diet Khusus Saya</span>
            </h2>
            <p className="text-emerald-100 text-xs font-semibold max-w-xl">
              Terapi diit klinis terstruktur yang dirancang resmi oleh Instalasi Gizi RSUD Kalabahi serta divalidasi berdasarkan Pedoman Gizi Seimbang Kemenkes RI.
            </p>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl hidden md:block animate-pulse">
            <Sparkles className="w-6 h-6 text-emerald-250" />
          </div>
        </div>

        {/* Search Bar - Modern Compact */}
        <div className="relative mt-2">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-600" />
          <input
            id="diet-search-input"
            type="text"
            placeholder="Cari diet gizi (misal: maag, kencing manis, tensi, jantung, ginjal...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border-0 rounded-2xl text-xs sm:text-sm text-slate-800 font-extrabold focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* 2. Horizontal Chip Filter: MEMBUAT MENARIK & MINIMIZE */}
      <div className="space-y-2" id="horizontal-diet-selector">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            Pilih Jenis Terapi Diit ({filteredDiets.length})
          </span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="text-[10px] font-bold text-emerald-600 hover:underline"
            >
              Hapus Filter
            </button>
          )}
        </div>

        {/* Scrollable Chips List with Beautiful Focus Styling */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-emerald-250 scrollbar-track-transparent">
          {filteredDiets.length > 0 ? (
            filteredDiets.map((diet) => {
              const isSelected = selectedDietId === diet.id;
              return (
                <button
                  key={diet.id}
                  id={`diet-chip-${diet.id}`}
                  onClick={() => setSelectedDietId(diet.id)}
                  className={`px-4 py-3 rounded-2xl font-black text-xs shrink-0 transition-all flex items-center gap-2 border-2 text-left cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white shadow-xs scale-102"
                      : "bg-white border-slate-100 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSelected ? "text-rose-400 fill-rose-400" : "text-slate-400"}`} />
                  <span className="truncate max-w-[170px] sm:max-w-none">{diet.name.replace("Diet ", "")}</span>
                </button>
              );
            })
          ) : (
            <div className="bg-slate-100 py-2.5 px-4 rounded-xl text-center w-full text-xs text-slate-505 font-bold" id="no-diet-found">
              Pencarian "{searchQuery}" tidak tersedia dalam database diet RSUD Kalabahi.
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Split View: Active Diet Card Details (Minimized & Engaging) + Piring Makanku Kemenkes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="diet-details-grid">
        
        {/* Diet Card (Span 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-emerald-100 shadow-xs overflow-hidden flex flex-col justify-between" id="active-diet-card">
          
          {/* Card Header */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 text-sm font-bold animate-bounce">🩺</span>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">{selectedDiet.name}</h3>
                <p className="text-[10px] text-emerald-700 uppercase font-bold tracking-widest mt-0.5 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Sesuai Panduan Gizi Kemenkes RI</span>
                </p>
              </div>
            </div>
            <p className="text-slate-600 text-xs font-semibold leading-relaxed pl-1 pt-1 italic">
              &ldquo;{selectedDiet.shortDesc}&rdquo;
            </p>
          </div>

          {/* Card Body - Minimized / Expandable Info Blocks */}
          <div className="p-5 space-y-4">
            
            {/* Tujuan Terapi */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                🎯 TUJUAN UTAMA TERAPI DIET:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
                {selectedDiet.purpose.map((purp, i) => (
                  <div key={i} className="bg-emerald-50/10 border border-emerald-100/40 p-2.5 rounded-xl flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-xs font-bold leading-relaxed">{purp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Rules - 3 Interactive Grids (Boleh, Batasi, Hindari) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              
              {/* DIANJURKAN - Hijau */}
              <div className="bg-emerald-50/20 border border-emerald-100 p-3 rounded-2xl flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-emerald-850 bg-emerald-100 px-2 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                    🟢 DIANJURKAN
                  </span>
                  <ul className="space-y-1.5 pl-1">
                    {selectedDiet.recommended.slice(0, 4).map((item, i) => (
                      <li key={i} className="text-[11px] text-slate-700 flex items-start gap-1 font-bold leading-relaxed">
                        <span className="text-emerald-600 font-extrabold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* BATASI - Kuning */}
              <div className="bg-amber-50/20 border border-amber-100 p-3 rounded-2xl flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-amber-850 bg-amber-100 px-2 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                    🟡 BATASI / KONTROL
                  </span>
                  <ul className="space-y-1.5 pl-1">
                    {selectedDiet.restricted.slice(0, 4).map((item, i) => (
                      <li key={i} className="text-[11px] text-slate-700 flex items-start gap-1 font-bold leading-relaxed">
                        <span className="text-amber-600 font-extrabold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* HINDARI - Merah */}
              <div className="bg-rose-50/20 border border-rose-100 p-3 rounded-2xl flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-rose-850 bg-rose-100 px-2 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                    🔴 PANTANGAN MUTLAK
                  </span>
                  <ul className="space-y-1.5 pl-1">
                    {selectedDiet.avoid.slice(0, 4).map((item, i) => (
                      <li key={i} className="text-[11px] text-rose-950 flex items-start gap-1 font-bold leading-relaxed">
                        <span className="text-rose-600 font-extrabold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Nutri-Tips Badge */}
            <div className="bg-amber-50/20 border border-amber-200 p-3.5 rounded-2xl space-y-1.5">
              <span className="text-[9px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
                NUTRISIONIS TIPS MANDIRI:
              </span>
              <p className="text-slate-800 text-xs font-bold leading-relaxed">
                {selectedDiet.tips[0]}
              </p>
            </div>

          </div>

          {/* Warning Footer */}
          <div className="bg-slate-100/50 p-3.5 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-bold italic leading-relaxed">
              *Koordinasikan setiap asupan nutrisi tambahan di luar piring saji RS dengan Ahli Gizi RSUD Kalabahi.*
            </p>
          </div>

        </div>

        {/* 4. Piring Makanku Kemenkes Visualizer (Span 5) - INTERAKTIF & MENARIK */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-emerald-100 shadow-xs overflow-hidden flex flex-col justify-between" id="piring-makanku-visualizer">
          
          <div className="p-5 border-b border-slate-100 bg-slate-50/60">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full tracking-wider block w-fit">
              Visualisasi Sekali Makan
            </span>
            <h4 className="font-extrabold text-slate-850 text-sm mt-1">Simulasi Piring Makanku Kemenkes</h4>
            <p className="text-slate-500 text-[10px] font-semibold mt-0.5 leading-relaxed">
              Panduan pembagian takaran isi piring makan Anda sekali makan untuk mempercepat proses kesembuhan.
            </p>
          </div>

          <div className="p-5 space-y-4">
            
            {/* The Visual Plate circle mock */}
            <div className={`p-4 rounded-2xl border-2 ${piringGuide.color} space-y-3`}>
              <div className="text-center space-y-1">
                <span className="text-2xl block">{piringGuide.icon}</span>
                <h5 className="text-xs font-black leading-snug">{piringGuide.title}</h5>
              </div>

              {/* Minimal Circle Layout representing standard meal slices */}
              <div className="relative w-36 h-36 mx-auto rounded-full border-4 border-slate-950 bg-slate-100 overflow-hidden shadow-xs flex items-center justify-center my-2">
                {/* Divide plate */}
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-slate-950"></div>
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-slate-950"></div>

                <div className="absolute top-2 left-2 text-[8px] font-black text-center text-slate-900 bg-white/90 px-1 rounded-sm shadow-3xs">
                  🍚 Karbo
                </div>
                <div className="absolute top-2 right-2 text-[8px] font-black text-center text-slate-900 bg-white/90 px-1 rounded-sm shadow-3xs">
                  Chicken Lauk
                </div>
                <div className="absolute bottom-2 left-2 text-[8px] font-black text-center text-slate-900 bg-white/90 px-1 rounded-sm shadow-3xs">
                  🥦 Sayur
                </div>
                <div className="absolute bottom-2 right-2 text-[8px] font-black text-center text-slate-900 bg-white/90 px-1 rounded-sm shadow-3xs">
                  🍎 Buah
                </div>

                <span className="text-[10px] font-black text-emerald-850 bg-white px-2 py-1 rounded-xl shadow-2xs z-10">Piring Sehat</span>
              </div>

              {/* Structured list explanation */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                  <span className="truncate">{piringGuide.karbo}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                  <span className="truncate">{piringGuide.lauk}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span className="truncate">{piringGuide.sayur}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                  <span className="truncate">{piringGuide.buah}</span>
                </div>
              </div>

            </div>

            {/* Piring makanku alert */}
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl space-y-1 flex items-start gap-2">
              <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-black text-rose-800 block">PANTANGAN & PERHATIAN:</span>
                <p className="text-[10px] text-rose-950 font-bold leading-relaxed">{piringGuide.warning}</p>
              </div>
            </div>

          </div>

          <p className="text-[9px] text-slate-400 p-4 pt-0 text-center font-bold">
            Direktori ini divalidasi berdasarkan Panduan Gizi Seimbang Ditjen Kesehatan Masyarakat Kemenkes RI.
          </p>

        </div>

      </div>

      {/* 5. GIGI SATUAN ACUAN KEMENKES REFRENS: REFRENS DI TAMBAH SEBANYAK-BEBANYAKNYA */}
      <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-2xs overflow-hidden" id="kemenkes-references-panel">
        
        {/* Toggleable Accordion Header */}
        <div 
          onClick={() => setShowReferences(prev => !prev)}
          className="p-5 bg-slate-50 hover:bg-slate-100/70 transition-all flex items-center justify-between cursor-pointer"
          id="btn-toggle-kemenkes-refs"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
                Repository Referensi Resmi Kemenkes RI ({kemenkesReferences.length} Sumber Terverifikasi)
              </h4>
              <p className="text-slate-500 text-[10px] font-bold mt-0.5">
                Kumpulam rujukan literatur klinis nasional, edaran kementerian, dan petunjuk teknis gizi tepercaya. Klik untuk menampilkan seluruh referensi.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              {showReferences ? "SEBANYAK" : "BUKA (" + kemenkesReferences.length + ")"}
            </span>
            {showReferences ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {/* References Content Body */}
        {showReferences && (
          <div className="p-4 sm:p-6 border-t border-slate-150 space-y-4 animate-fade-in">
            {/* Minimal Sub-search for reference elements */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-emerald-600" />
              <input
                type="text"
                value={refSearch}
                onChange={(e) => setRefSearch(e.target.value)}
                placeholder="Pencarian referensi Kemenkes (misal: PMK, tatalaksana, ginjal...)"
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-0 rounded-2xl text-xs text-slate-800 font-extrabold focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all shadow-3xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-1">
              {filteredReferences.map((ref) => (
                <div 
                  key={ref.code}
                  className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-200/60 hover:border-emerald-300 hover:bg-emerald-50/5 transition-all text-left space-y-2 flex flex-col justify-between"
                  id={`ref-box-${ref.code}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md tracking-wider">
                        {ref.category}
                      </span>
                      <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">{ref.code}</span>
                    </div>
                    <h5 className="text-[12px] font-black text-slate-850 leading-snug">{ref.title}</h5>
                    <p className="text-[10px] text-slate-500 font-semibold leading-relaxed line-clamp-2">{ref.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] font-black">
                    <span className="text-slate-400">Penerbit: Biro Hukum Kemenkes RI</span>
                    <a
                      href={ref.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="text-emerald-600 hover:underline flex items-center gap-0.5"
                    >
                      <span>Kunjungi Portal Resmi</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
              {filteredReferences.length === 0 && (
                <div className="col-span-full text-center py-6 text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 font-bold">
                  Referensi dengan kata kunci "{refSearch}" tidak ditemukan dalam sistem.
                </div>
              )}
            </div>

            <div className="bg-emerald-650 p-4 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase text-emerald-100 tracking-wider">
                  SULIT MENEMUKAN KONSUL YANG COCOK?
                </span>
                <p className="text-xs font-semibold text-emerald-50">
                  Basodara dapat mendiskusikan referensi resmi di atas langsung secara detail dengan Tim Ahli Gizi kami pada tab **Hubungi Petugas**.
                </p>
              </div>
              <span className="text-sm shrink-0 self-start sm:self-center font-bold">📚 RSUD Kalabahi NTT</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
