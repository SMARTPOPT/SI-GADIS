/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  Send, Sparkles, BookOpen, AlertCircle, RefreshCw, ChevronDown, Check, 
  GraduationCap, Download, AlertTriangle, Info, BookCheck, ShieldCheck 
} from "lucide-react";
import { ChatMessage } from "../types";

export default function EdukasiTab() {
  const [activeArticleId, setActiveArticleId] = useState<string | null>("leaflet-hipertensi");
  const [showEduRef, setShowEduRef] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: "Halo! Saya adalah **SIGADIS Konsul AI**, asisten virtual ahli gizi RSUD Kalabahi.\n\nSaya siap membantu menjawab pertanyaan Anda atau keluarga Anda seputar program diet rumah sakit, kandungan gizi bahan makanan, pantangan penyakit harian, atau takaran asupan nutrisi seimbang selama masa perawatan berbasis standar gizi **PAGS Kemenkes RI**.\n\nAda asuhan diet apa yang sedang ingin Anda tanyakan hari ini, Basodara?",
      timestamp: new Date()
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions list
  const samplePrompts = [
    "Apa makanan pantangan untuk sakit maag/lambung?",
    "Bagaimana aturan makan penderita kencing manis (Diabetes)?",
    "Berapa batas konsumsi garam bagi penderita tekanan darah tinggi?",
    "Mengapa pasien pasca operasi butuh putih telur putih rebus?"
  ];

  // Official references from Kemenkes
  const kemenkesDocs = [
    { code: "PMK-78-2013", source: "PMK No.78/2013 tentang Pelayanan Gizi RS" },
    { code: "PGS-2014", source: "Pedoman Gizi Seimbang Kemenkes RI" },
    { code: "GERMAS-2017", source: "Warta Gerakan Masyarakat Hidup Sehat" },
    { code: "PJK-2021", source: "Panduan Diet Penyakit Kronis Kemenkes RI" },
    { code: "AKG-2019", source: "Nilai Kecukupan Gizi Indonesia (Permenkes 28/2019)" }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-10).map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Gagal memperoleh respon server.");
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      // Fallback response inside client if server API itself crashes or is unreachable
      const fallbackReply = "Kami mohon maaf, saat ini asisten AI sedang sibuk merumuskan komposisi menu harian Pasien RSUD Kalabahi. " +
        "Namun secara umum, silakan ikuti petunjuk diet terstruktur pada tab **Diet Khusus Saya** sesuai diagnosa Anda, " +
        "atau klik tab **Hubungi Petugas** untuk berkonsultasi langsung dengan Ahli Gizi piket kami via WhatsApp.";
      
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: fallbackReply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Leaflet Education articles data
  const articles = [
    {
      id: "leaflet-hipertensi",
      title: "Leaflet Diet Hipertensi (Tensi Tinggi)",
      icon: "❤️",
      summary: "Mengurangi asupan Natrium (garam) demi menghindarkan resiko stroke dan gagal jantung sesuai Panduan Germas Kemenkes.",
      sections: [
        {
          heading: "Mengapa Diet Garam Penting?",
          content: "Kandungan Garam Natrium memicu retensi (penimbunan) air di dinding pembuluh darah, mempersempit lajunya, sehingga mendongkrak denyut tekanan pompa jantung secara berlebihan."
        },
        {
          heading: "Aturan Pembagian Garam RSUD Kalabahi (SOP Kemenkes):",
          content: "• Diet RG I: Tanpa garam dapur sama sekali (untuk bengkak parah/tensi sangat ekstrim)\n• Diet RG II: Boleh maksimal 1/2 sendok teh garam dapur per hari (~2 gram)\n• Diet RG III: Boleh maksimal 1 sendok teh garam dapur per hari (~4 gram)."
        },
        {
          heading: "Penukar Rasa Alami yang Aman (Rempah Sehat):",
          content: "Gunakan rempah kaya rasa nusantara: bawang merah, bawang putih sangrai, jahe geprek, kapulaga, dan perasan jeruk limau segar untuk memberikan citarasa gurih yang asri tanpa sodium."
        }
      ]
    },
    {
      id: "leaflet-diabetes",
      title: "Leaflet Diet Diabetes Melitus (Kencing Manis)",
      icon: "🥗",
      summary: "Kunci mengontrol gula darah agar tubuh bebas lemas, kebas, dan luka lambat sembuh sesuai Tatalaksana Gizi DM Kemenkes.",
      sections: [
        {
          heading: "Pilar Utama 3J Gizi Diabetes Melitus:",
          content: "• Tepat JADWAL: 3 kali makan utama, 2 kali selingan sehat secara teratur.\n• Tepat JUMLAH: Kalori disesuaikan tinggi & berat badan ideal.\n• Tepat JENIS: Konsumsi karbohidrat kompleks berserat tinggi."
        },
        {
          heading: "Bahan Sukrosa Tersembunyi:",
          content: "Waspadai kecap manis, saus sambal kemasan, kental manis, roti tawar putih, puding instan, dan minuman berenergi karena memiliki kadar glukosa pekat yang langsung menaikkan gula darah."
        },
        {
          heading: "Anjuran Pemulihan Sel Tubuh:",
          content: "Pilih rebusan ubi jalar, labu siam kukus, kacang panjang serta ikan kuah asam segar khas Kalabahi NTT sebagai pengisi energi yang aman."
        }
      ]
    },
    {
      id: "leaflet-gastritis",
      title: "Leaflet Diet Lambung (Maag & Gerd)",
      icon: "🥣",
      summary: "Meremajakan dinding mukosa lambung teriritasi melalui pemilihan asupan non-asam & non-pedas sesuai Panduan Klinis Kemenkes.",
      sections: [
        {
          heading: "Perlindungan Fisik Utama Lambung:",
          content: "Hindari tekstur makanan yang terlalu garing/keras yang beresiko melukai mukosa lambung. Pilih nasi tim lembut atau bubur saring hangat."
        },
        {
          heading: "Musuh Makanan Asam Lambung:",
          content: "• Cabai rawit/merah pekat\n• Buah kecut (jeruk asam, nanas, kedondong)\n• Sayuran pemicu gas berlebih (kol kubis, sawi manis, brokoli mentah, lobak ragi)\n• Kafein pekat pada kopi hitam hangat."
        },
        {
          heading: "Pola Mengunyah Sempurna:",
          content: "Kunyah makanan minimal 32 kali sampai benar-benar cair sebelum ditelan. Langkah sederhana ini meringankan 50% kerja asam pencernaan lambung."
        }
      ]
    }
  ];

  const downloadLeafletHTML = (art: any) => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${art.title} - RSUD Kalabahi</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background-color: #f0fdf4; color: #1e293b; padding: 20px; max-width: 650px; margin: 0 auto; line-height: 1.5; }
    .card { background: white; padding: 28px; border-radius: 24px; border: 3px solid #10b981; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); }
    .header { text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 18px; margin-bottom: 20px; }
    .icon { font-size: 40px; margin-bottom: 10px; }
    .hospital { font-weight: 900; font-size: 13px; text-transform: uppercase; color: #059669; letter-spacing: 0.1em; }
    .title { font-weight: 900; font-size: 20px; color: #0f172a; margin: 6px 0; }
    .badge { display: inline-block; background-color: #d1fae5; color: #065f46; font-size: 11px; font-weight: 800; padding: 6px 16px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; }
    .summary { font-size: 13px; color: #64748b; font-style: italic; margin-bottom: 20px; text-align: center; }
    .info-box { background: #f8fafc; padding: 16px; border-radius: 16px; border: 1px solid #e2e8f0; margin-bottom: 16px; }
    .heading { font-size: 14px; font-weight: 800; color: #065f46; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
    .content { font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.6; }
    .footer { text-align: center; margin-top: 30px; font-size: 11px; color: #94a3b8; font-weight: 750; border-top: 1px solid #f1f5f9; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="icon">${art.icon}</div>
      <div class="hospital">Instalasi Gizi RSUD Kalabahi</div>
      <h1 class="title">${art.title}</h1>
      <span class="badge">Leaflet Gizi Terverifikasi Kemenkes RI</span>
    </div>
    
    <p class="summary">"${art.summary}"</p>

    ${art.sections.map((sect: any) => `
      <div class="info-box">
        <div class="heading">📌 ${sect.heading}</div>
        <div class="content">${sect.content.replace(/\n/g, '<br>')}</div>
      </div>
    `).join('')}

    <div class="footer">
      SIGADIS - Sistem Informasi & Edukasi Gizi RSUD Kalabahi NTT<br>
      Simpan berkas offline ini di ponsel Anda untuk dibaca & dipraktikkan tanpa kuota internet bersama keluarga.
    </div>
  </div>
</body>
</html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${art.id}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderInfographics = (id: string) => {
    if (id === "leaflet-hipertensi") {
      return (
        <div className="space-y-4 p-4 border-t border-slate-100 bg-white shadow-2xs" id="hipertensi-infographic">
          {/* Visual salt meter */}
          <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 space-y-2.5">
            <span className="text-[10px] font-black uppercase text-orange-850 tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              REKOMENDASI KEKOMPOSISIAN GARAM HARIAN KEMENKES:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-slate-850">
              <div className="bg-red-50 p-2.5 rounded-xl border border-red-100 shadow-3xs">
                <p className="text-[9px] font-bold text-red-650">RG Tipe I</p>
                <p className="text-sm font-black text-red-800">0 Gram</p>
                <p className="text-[8px] text-slate-500 font-bold">Tanpa Garam Dapur</p>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-100 shadow-3xs">
                <p className="text-[9px] font-bold text-amber-650">RG Tipe II</p>
                <p className="text-sm font-black text-amber-800">2 Gram</p>
                <p className="text-[8px] text-slate-500 font-bold">1/2 Sendok Teh</p>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 shadow-3xs">
                <p className="text-[9px] font-bold text-emerald-650">RG Tipe III</p>
                <p className="text-sm font-black text-emerald-800">4 Gram</p>
                <p className="text-[8px] text-slate-500 font-bold">1 Sendok Teh</p>
              </div>
            </div>
          </div>

          {/* Green / Red Grid Card info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="hipertensi-grid-items">
            <div className="bg-emerald-50/45 p-3.5 rounded-2xl border-2 border-emerald-100/60 space-y-2">
              <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">🟢 ANJURAN KEMENKES</span>
              <ul className="text-xs text-emerald-950/85 space-y-1.5 font-bold list-disc pl-4 leading-relaxed">
                <li>Bawang merah & putih sangrai</li>
                <li>Jahe geprek & serai rimpang</li>
                <li>Perasan jeruk nipis alami</li>
                <li>Makanan kukus / tim kuah</li>
              </ul>
            </div>
            <div className="bg-rose-50/45 p-3.5 rounded-2xl border-2 border-rose-100/60 space-y-2">
              <span className="text-xs font-black text-rose-800 flex items-center gap-1.5">🔴 KONTROL / BATASI</span>
              <ul className="text-xs text-rose-950/85 space-y-1.5 font-bold list-disc pl-4 leading-relaxed">
                <li>Ikan asin Alor & sarden</li>
                <li>Garam meja & penyedap MSG</li>
                <li>Kecap asin pekat botol</li>
                <li>Kerupuk asin jajanan luar</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-600 italic font-bold text-center leading-relaxed">
              &ldquo;Membatasi natrium secara teratur melindungi kesehatan dinding jantung dan pembuluh perifer.&rdquo;
            </p>
          </div>
        </div>
      );
    }

    if (id === "leaflet-diabetes") {
      return (
        <div className="space-y-4 p-4 border-t border-slate-100 bg-white" id="diabetes-infographic">
          {/* Aturan 3J */}
          <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-2.5">
            <span className="text-[10px] font-black uppercase text-sky-850 tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              PILAR NUTRISI DIABETES (3J KEMENKES):
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-slate-800">
              <div className="bg-white p-2.5 rounded-xl border border-sky-100 shadow-3xs">
                <p className="text-lg">🕒</p>
                <p className="text-[10px] font-black text-slate-850">Tepat JADWAL</p>
                <p className="text-[8px] text-slate-500 font-bold">3x Utama & 2x Selingan</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-sky-100 shadow-3xs">
                <p className="text-lg">⚖️</p>
                <p className="text-[10px] font-black text-slate-850">Tepat JUMLAH</p>
                <p className="text-[8px] text-slate-500 font-bold">Kecukupan Energi Sesuai IMT</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-sky-100 shadow-3xs">
                <p className="text-lg">🌾</p>
                <p className="text-[10px] font-black text-slate-850">Tepat JENIS</p>
                <p className="text-[8px] text-slate-500 font-bold">Karbohidrat Serat Kompleks</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="diabetes-grid-items">
            <div className="bg-emerald-50/45 p-3.5 rounded-2xl border-2 border-emerald-100/60 space-y-2">
              <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">🟢 KONSUMSI SEHAT</span>
              <ul className="text-xs text-emerald-950/85 space-y-1.5 font-bold list-disc pl-4 leading-relaxed">
                <li>Ubi jalar kukus & talas segar</li>
                <li>Ikan kuah asam Alor asri</li>
                <li>Sup buncis & wortel segar</li>
                <li>Labu siam kukus & apel hijau</li>
              </ul>
            </div>
            <div className="bg-rose-50/45 p-3.5 rounded-2xl border-2 border-rose-100/60 space-y-2">
              <span className="text-xs font-black text-rose-800 flex items-center gap-1.5">🔴 BATASI PEKAT</span>
              <ul className="text-xs text-rose-950/85 space-y-1.5 font-bold list-disc pl-4 leading-relaxed">
                <li>Kecap manis & kental manis</li>
                <li>Minuman bersoda & teh manis</li>
                <li>Roti putih olahan biasa</li>
                <li>Kue basah tinggi sukrosa</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (id === "leaflet-gastritis") {
      return (
        <div className="space-y-4 p-4 border-t border-slate-100 bg-white" id="gastritis-infographic">
          {/* Kunyah badge */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex items-center gap-3.5">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl border border-amber-200 shadow-2xs shrink-0 font-black text-amber-600 animate-pulse">
              32x
            </div>
            <div>
              <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block">Mengunyah 32 Kali Sempurna:</span>
              <p className="text-xs text-slate-700 font-bold leading-relaxed">
                Meringankan penetrasi asam lambung dengan melumatkan asupan secara maksimal di rongga mulut.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="gastritis-grid-items">
            <div className="bg-emerald-50/45 p-3.5 rounded-2xl border-2 border-emerald-100/60 space-y-2">
              <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">🟢 RAMAH LAMBUNG</span>
              <ul className="text-xs text-emerald-950/85 space-y-1.5 font-bold list-disc pl-4 leading-relaxed">
                <li>Nasi tim hangat & bubur halus</li>
                <li>Sup kaldu bening rimpang</li>
                <li>Susu kedelai hangat tawar</li>
                <li>Pisang ambon matang & labu</li>
              </ul>
            </div>
            <div className="bg-rose-50/45 p-3.5 rounded-2xl border-2 border-rose-100/60 space-y-2">
              <span className="text-xs font-black text-rose-800 flex items-center gap-1.5">🔴 HINDARI / JAUHI</span>
              <ul className="text-xs text-rose-950/85 space-y-1.5 font-bold list-disc pl-4 leading-relaxed">
                <li>Cabai pedas & lada pekat</li>
                <li>Kopi hitam pekat & asam</li>
                <li>Kol kubis, tapai pemicu gas</li>
                <li>Cuka encer & rujak kecut</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6" id="edukasi-tab-panel">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="edukasi-main-grid">
        
        {/* Left Side: Leaflet Articles and Guidelines (Span 5) */}
        <div className="lg:col-span-5 space-y-4" id="edukasi-leaflets-panel">
          <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 space-y-2 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-2 -translate-y-2 p-8 bg-emerald-50 text-emerald-250 opacity-20 text-6xl font-black">
              Leaflet
            </div>
            <h2 className="text-slate-900 font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>Infografis Edukasi Gizi</span>
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold">
              Media edukasi berbasis lembar informasi visual Kemenkes RI yang dapat diunduh bebas biaya langsung ke HP Anda untuk dipandu secara offline harian.
            </p>
          </div>

          <div className="space-y-3 font-semibold" id="leaflets-accordion">
            {articles.map((art) => {
              const isActive = activeArticleId === art.id;
              return (
                <div key={art.id} id={art.id} className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden shadow-2xs">
                  {/* Accordion header */}
                  <div 
                    onClick={() => setActiveArticleId(isActive ? null : art.id)}
                    className="p-4 bg-slate-50 hover:bg-slate-100/70 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 flex-1">
                      <span className="text-xl" role="img" aria-label="icon">{art.icon}</span>
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-sm">{art.title}</h4>
                        <p className="text-slate-500 text-[10px] line-clamp-1 mt-0.5 font-bold">{art.summary}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isActive ? "rotate-180" : ""}`} />
                  </div>

                  {/* Accordion Content with Custom Beautiful Infographics Layout & Download PDF link */}
                  {isActive && (
                    <div className="animate-fade-in border-t border-slate-100">
                      {renderInfographics(art.id)}
                      
                      {/* Integrated Download Action Footer */}
                      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadLeafletHTML(art);
                          }}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                          id={`btn-download-${art.id}`}
                        >
                          <Download className="w-4 h-4" />
                          <span>Unduh Leaflet Gizi HP (.html)</span>
                        </button>
                        <p className="text-[10px] text-slate-400 text-center font-bold">
                          *Setelah diunduh, buka file langsung di HP tanpa kuota internet!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Info Kemenkes Badges */}
          <div className="bg-emerald-50/45 p-4 rounded-2xl border border-emerald-100 space-y-2">
            <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block">
              DAFTAR RUJUKAN ACUAN EDUKASI GIZI KEMENKES RI:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {kemenkesDocs.map((doc) => (
                <span key={doc.code} className="bg-white border border-emerald-100 text-[9px] text-emerald-950 font-black px-2 py-1 rounded-lg">
                  📋 {doc.source}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Gemini Chatbot Clinic Info - Styled in Vibrant Palette (Span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl shadow-sm border-2 border-emerald-100 h-[560px] overflow-hidden" id="chatbot-container">
          
          {/* Header of Bot with modern emerald background */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between" id="chatbot-header">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-xs relative">
                <Sparkles className="w-5 h-5 text-emerald-250 animate-pulse" />
                <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-emerald-600"></span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base leading-tight">SIGADIS Konsul AI</h3>
                <span className="text-[10px] text-emerald-100 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                  <span>Validator Gizi Kemenkes Ahli RSUD Kalabahi</span>
                </span>
              </div>
            </div>
            
            <button
              id="btn-clear-chat"
              title="Mulai Ulang Chat"
              onClick={() => {
                if (window.confirm("Apakah Anda ingin menghapus obrolan ini dan memulai ulang?")) {
                  setMessages([
                    {
                      id: `init-${Date.now()}`,
                      sender: "bot",
                      text: "Obrolan berhasil diatur ulang.\n\nAda asuhan diet apa yang sedang ingin Anda tanyakan hari ini, Basodara?",
                      timestamp: new Date()
                    }
                  ]);
                }
              }}
              className="p-1 px-3.5 bg-emerald-700 hover:bg-emerald-800 rounded-full text-emerald-100 hover:text-white transition-all text-[11px] flex items-center gap-1 font-extrabold cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Ulang</span>
            </button>
          </div>

          {/* Chat Bubble Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40" id="chatbot-bubbles-flow">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2 max-w-full`}
                  id={`bubble-${msg.id}`}
                >
                  {!isUser && (
                    <span className="text-lg p-1.5 bg-emerald-100/90 text-emerald-850 rounded-xl shrink-0 mt-0.5 font-bold">👩‍⚕️</span>
                  )}
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-3xs leading-relaxed flex flex-col justify-between ${
                    isUser
                      ? "bg-emerald-650 text-white rounded-tr-none font-bold"
                      : "bg-white text-slate-800 border-2 border-slate-100 rounded-tl-none font-semibold"
                  }`}>
                    <p className="whitespace-pre-wrap">
                      {msg.text.split("**").map((part, index) => 
                        index % 2 === 1 ? (
                          <span key={index} className="font-extrabold text-emerald-950 bg-emerald-100/70 px-1 rounded-sm">
                            {part}
                          </span>
                        ) : part
                      )}
                    </p>
                    <span className={`text-[9px] mt-2 block text-right font-mono font-bold ${isUser ? "text-emerald-250" : "text-slate-400"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Simulated typing loading bubble */}
            {isLoading && (
              <div className="flex justify-start items-center gap-2" id="typing-indicator-loading">
                <span className="text-lg p-1.5 bg-emerald-100/80 text-emerald-880 rounded-xl shrink-0">👩‍⚕️</span>
                <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-100 rounded-tl-none flex items-center gap-1 shadow-2xs">
                  <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Quick Prompts List */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 space-y-1.5" id="chatbot-chips-suggestion">
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">REKOMENDASI PERTANYAAN CEPAT CEPAT:</span>
            <div className="flex flex-wrap gap-1.5 max-h-[75px] overflow-y-auto pr-1">
              {samplePrompts.map((prompt, prIdx) => (
                <button
                  key={prIdx}
                  id={`chip-prompt-${prIdx}`}
                  onClick={() => handleSendMessage(prompt)}
                  className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-emerald-950 font-black text-[10px] sm:text-xs px-2.5 py-1.5 rounded-full transition-all text-left cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input Form */}
          <form 
            id="chatbot-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white"
          >
            <input
              id="chatbot-input-text"
              type="text"
              value={inputVal}
              disabled={isLoading}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Tanyakan pola makan penderita tensi tinggi, gizi maag..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl text-xs sm:text-sm focus:bg-white text-slate-800 font-extrabold transition-all"
            />
            <button
              id="btn-chatbot-submit"
              type="submit"
              disabled={!inputVal.trim() || isLoading}
              className="p-2.5 bg-emerald-500 text-white rounded-xl shadow-xs hover:bg-emerald-600 disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
