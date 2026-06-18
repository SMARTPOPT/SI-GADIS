/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { NUTRITIONISTS } from "../data/nutritionData";
import { Phone, Calendar, UserCheck, MessageSquare, ExternalLink, ShieldAlert, Heart, HelpCircle } from "lucide-react";
import { Officer } from "../types";

export default function HubungiTab() {
  const [patientRoomName, setPatientRoomName] = useState("");
  const [selectedStaffPhone, setSelectedStaffPhone] = useState(NUTRITIONISTS[0].phone);

  const getWhatsAppLink = (staff: Officer) => {
    const defaultText = `Halo ${staff.name},\nSaya merupakan pasien/keluarga pasien dari Ruang Rawat: ${patientRoomName || "[Tulis Kamar/Wad Anda di sini]"} di RSUD Kalabahi.\n\nSaya ingin berkonsultasi seputar pembagian menu gizi dan asuhan diet khusus penyesuaian tubuh saya. Terima kasih.`;
    return `https://wa.me/${staff.phone}?text=${encodeURIComponent(defaultText)}`;
  };

  const faqs = [
    {
      q: "Bagaimana cara pasien rawat inap didaftarkan untuk diet khusus?",
      a: "Setiap pasien yang masuk melalui IGD atau Poliklinik mendapat asesmen awal oleh Dokter Penanggung Jawab (DPJP) dan Ahli Gizi piket. Diagnosa Dokter akan otomatis dikirim ke Instalasi Gizi untuk mengubah siklus menu reguler menjadi diet khusus (misal: rendah garam, rendah purin/asam urat, lunak bubur)."
    },
    {
      q: "Bolehkah keluarga membawakan makanan atau lauk dari luar rumah sakit?",
      a: "Sangat tidak disarankan bagi penderita diet ketat (seperti Gagal Ginjal atau Pasca Operasi Mayor). Makanan dari luar beresiko tinggi mengandung kadar garam tak terukur, higienitas yang rentan memicu kuman perut, atau gula berlebih yang langsung menaikkan tensi/glukosa darah."
    },
    {
      q: "Kapan loket konseling gizi rawat jalan RSUD Kalabahi dibuka?",
      a: "Poliklinik Konseling Gizi Terpadu RSUD Kalabahi aktif beroperasi setiap hari Senin hingga Sabtu pukul 08:30 WITA hingga 13:00 WITA. Anda dapat berkonsultasi langsung membawa surat rujukan Dokter."
    }
  ];

  return (
    <div className="space-y-6" id="hubungi-tab-panel">
      
      {/* Intro Box */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 space-y-2" id="hubungi-intro">
        <h2 className="text-slate-900 font-black text-xl tracking-tight">
          Hubungi Petugas Gizi & Nutrisionis RSUD Kalabahi
        </h2>
        <p className="text-slate-500 text-xs leading-relaxed font-semibold">
          Keluarga pasien atau perawat pendamping dapat berkonsultasi langsung dengan petugas dietetik penanggung jawab asuhan gizi ruangan Anda secara aman lewat pesan singkat WhatsApp.
        </p>
      </div>

      {/* Grid: Staff Directory left, WhatsApp Link customizable builder right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="hubungi-main-grid font-semibold">
        
        {/* Left: Staff Cards List (Span 7) */}
        <div className="md:col-span-12 lg:col-span-7 space-y-4" id="staff-roster-section">
          <h3 className="text-slate-500 font-extrabold text-xs uppercase tracking-wider px-1">
            Petugas Ahli Gizi yang Bertugas Antar Rawat
          </h3>
          
          <div className="space-y-3" id="staff-cards-list">
            {NUTRITIONISTS.map((staff, idx) => (
              <div 
                key={idx} 
                id={`staff-card-${idx}`}
                onClick={() => setSelectedStaffPhone(staff.phone)}
                className={`p-5 rounded-2xl border-2 transition-all text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer relative ${
                  selectedStaffPhone === staff.phone
                    ? "bg-emerald-50/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                    : "bg-white hover:bg-slate-50 border-slate-100"
                }`}
              >
                {/* Visual Status Indicator Indicator */}
                <span className={`absolute top-4 right-4 text-[9px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${
                  staff.isAvailable 
                    ? "bg-emerald-100 text-emerald-850" 
                    : "bg-amber-100 text-amber-850"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${staff.isAvailable ? "bg-emerald-500 animate-pulse" : "bg-amber-400"}`}></span>
                  {staff.isAvailable ? "AKTIF PIKET" : "Luar Sesi"}
                </span>

                <div className="flex items-start gap-3.5 flex-1 pr-12">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold shrink-0 text-lg">
                    👩‍⚕️
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-850 text-sm sm:text-base">{staff.name}</h4>
                    <p className="text-slate-500 text-xs font-semibold">{staff.role}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400 font-mono font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {staff.schedule}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Link trigger button */}
                <a
                  id={`wa-staff-link-${idx}`}
                  href={getWhatsAppLink(staff)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-black px-4 py-3 rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Kirim Pesan</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

              </div>
            ))}
          </div>
        </div>

        {/* Right: Custom Message template helper (Span 5) */}
        <div className="md:col-span-12 lg:col-span-5 bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-sm space-y-4" id="custom-wa-editor">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-base">Atur Karakter Pendamping Pasien</h3>
            <p className="text-slate-500 text-xs leading-relaxed mt-1 font-semibold">
              Isi no kamar/nama wad di bawah, sistem SIGADIS akan memformulasikan pesan rapi otomatis sebelum dikirim menuju whatsapp ahli gizi.
            </p>
          </div>

          <div className="space-y-4" id="wa-preset-fields">
            
            <div className="space-y-1">
              <label className="text-slate-700 font-bold text-xs" htmlFor="input-pt-room-wa">Kamar / Wad Rawat Inap Pasien</label>
              <input
                id="input-pt-room-wa"
                type="text"
                placeholder="Contoh: Kamar Melati Nomor 4"
                value={patientRoomName}
                onChange={(e) => setPatientRoomName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl text-xs sm:text-sm focus:bg-white text-slate-800 transition-all font-semibold"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-2" id="wa-live-preview">
              <span className="text-[9px] font-black uppercase text-emerald-850 tracking-wider">PRATINJAU DOKUMEN PESAN DIET:</span>
              <p className="text-[11px] text-slate-600 leading-relaxed italic select-all whitespace-pre-wrap font-semibold">
                &ldquo;Halo [Nama Petugas]... Saya merupakan pasien/keluarga pasien dari Ruang Rawat: <span className="font-bold underline text-emerald-900 bg-emerald-50 px-1 rounded-xs">{patientRoomName || "[Kamar Melati...]"}</span> di RSUD Kalabahi...&rdquo;
              </p>
            </div>

            <div className="p-3.5 bg-rose-50/50 text-rose-850 rounded-2xl border border-rose-100 text-xs leading-normal flex items-start gap-2 font-semibold">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p>Meninggalkan pesan atau menghubungi di luar jam piket (pukul 20:00 - 06:00 WITA) hanya akan ditanggapi keesokan harinya kecuali kondisi darurat asupan gizi kritis.</p>
            </div>

          </div>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-sm space-y-4" id="hubungi-faqs-section">
        <h3 className="text-slate-900 font-black text-lg flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <span>Tanya Jawab Seputar Makan Gizi RSUD</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="faqs-grid">
          {faqs.map((faq, idx) => (
            <div key={idx} id={`faq-item-${idx}`} className="space-y-1.5 p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-300 bg-white hover:bg-emerald-50/10 transition-colors">
              <h4 className="font-extrabold text-emerald-900 text-xs sm:text-sm leading-snug">{faq.q}</h4>
              <p className="text-slate-600 text-xs leading-relaxed font-semibold">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
