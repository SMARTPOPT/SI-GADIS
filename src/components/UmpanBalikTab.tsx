/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { MessageSquare, Star, CheckSquare, Activity, ShieldCheck, Heart } from "lucide-react";
import { Feedback } from "../types";

export default function UmpanBalikTab() {
  const [patientName, setPatientName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [dietType, setDietType] = useState("Makanan Biasa (Normal)");
  
  // Rating States
  const [tasteRating, setTasteRating] = useState(5);
  const [presentationRating, setPresentationRating] = useState(5);
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [timeRating, setTimeRating] = useState(5);

  const [comments, setComments] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);

  // Pre-configured list of default reviews to populate the feed
  const defaultFeedbacks: Feedback[] = [
    {
      id: "feed-1",
      patientName: "Bapak Yohanis L.",
      roomNumber: "Cendrawasih Bed 3",
      dietType: "Diet Lambung / Lunak",
      tasteRating: 5,
      presentationRating: 4,
      cleanlinessRating: 5,
      timeRating: 5,
      comments: "Makanan bubur tim disajikan hangat dan tidak perih di lambung sama sekali. Sayur labu siamnya manis segar alami. Terima kasih pelayanan dapur gizi RSUD Kalabahi!",
      createdAt: "2026-06-09T08:30:00.000Z"
    },
    {
      id: "feed-2",
      patientName: "Ibu Maria M. A.",
      roomNumber: "Melati Kelas 2",
      dietType: "Diet Rendah Garam (RG)",
      tasteRating: 4,
      presentationRating: 5,
      cleanlinessRating: 5,
      timeRating: 4,
      comments: "Meskipun rendah garam, ikan bakar ketumbarnya tetap beraroma wangi daun kemangi segar, jadi nafsu makan bapak tetap tinggi walau tensi kemarin sempat naik.",
      createdAt: "2026-06-08T12:15:00.000Z"
    }
  ];

  // Load and merge feedbacks on mount
  useEffect(() => {
    const saved = localStorage.getItem("sigadis_patient_feedbacks");
    if (saved) {
      try {
        setFeedbacks(JSON.parse(saved));
      } catch (e) {
        setFeedbacks(defaultFeedbacks);
      }
    } else {
      setFeedbacks(defaultFeedbacks);
      localStorage.setItem("sigadis_patient_feedbacks", JSON.stringify(defaultFeedbacks));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim() || !roomNumber.trim()) {
      alert("Nama Pasien dan Nomor Ruang wajib diisi untuk mengoptimalkan layanan asuhan.");
      return;
    }

    const newFeedback: Feedback = {
      id: `feed-user-${Date.now()}`,
      patientName: patientName.trim(),
      roomNumber: roomNumber.trim(),
      dietType: dietType,
      tasteRating,
      presentationRating,
      cleanlinessRating,
      timeRating,
      comments: comments.trim() || "Sajian makanan gizi sangat baik dan higienis.",
      createdAt: new Date().toISOString()
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem("sigadis_patient_feedbacks", JSON.stringify(updated));

    // Reset Form
    setPatientName("");
    setRoomNumber("");
    setComments("");
    setTasteRating(5);
    setPresentationRating(5);
    setCleanlinessRating(5);
    setTimeRating(5);

    // Show success banner
    setShowSuccessBadge(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setShowSuccessBadge(false);
    }, 6000);
  };

  const renderStarRatingField = (
    label: string, 
    value: number, 
    onChange: (v: number) => void, 
    desc: string,
    idPrefix: string
  ) => {
    return (
      <div className="space-y-1.5" id={`rating-field-${idPrefix}`}>
        <div className="flex items-center justify-between">
          <label className="text-slate-700 font-bold text-xs sm:text-sm">{label}</label>
          <span className="text-[10px] text-emerald-600 font-bold">{value} dari 5 Bintang</span>
        </div>
        <p className="text-[10px] text-slate-400 italic">{desc}</p>
        <div className="flex items-center gap-2 pt-0.5">
          {Array.from({ length: 5 }).map((_, idx) => {
            const index = idx + 1;
            const isGold = index <= value;
            return (
              <button
                key={index}
                id={`btn-star-${idPrefix}-${index}`}
                type="button"
                onClick={() => onChange(index)}
                className="hover:scale-125 transition-transform p-0.5 focus:outline-none cursor-pointer"
              >
                <Star className={`w-6 h-6 sm:w-7 sm:h-7 ${isGold ? "fill-amber-400 text-amber-500" : "text-slate-200"}`} />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6" id="umpan-balik-tab-panel">
      
      {/* Success notifier banner */}
      {showSuccessBadge && (
        <div className="bg-emerald-50 border-2 border-emerald-200 p-5 rounded-2xl flex items-start gap-3 text-emerald-900 animate-bounce shadow-xs" id="success-banner">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-sm sm:text-base">Matur Nuwun / Terima Kasih!</h4>
            <p className="text-xs">Umpan balik asuhan gizi Anda berhasil kami rekam secara rapi. Kritik dan saran konstruktif Anda sangat membantu menjaga kualitas pelayanan pangan Instalasi Gizi RSUD Kalabahi.</p>
          </div>
        </div>
      )}

      {/* Grid: Form Left, Showcase reviews Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="umpan-balik-grid">
        
        {/* Left Side: Form entry (Span 5) */}
        <form onSubmit={handleSubmit} className="lg:col-span-12 xl:col-span-5 bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-sm space-y-5" id="feedback-entry-form">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-slate-900 font-black text-lg flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
              <span>Formulir Kepuasan Makanan</span>
            </h2>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed font-semibold">
              Bantu tim pengawas gizi memonitor kebersihan, rasa, kehangatan, serta ketepatan piring makan Anda di rumah sakit.
            </p>
          </div>

          {/* Patient identification info */}
          <div className="space-y-3.5" id="patient-identification-fields">
            
            <div className="space-y-1">
              <label className="text-slate-700 font-bold text-xs" htmlFor="input-pt-name">Nama Pasien / Inisial</label>
              <input
                id="input-pt-name"
                type="text"
                required
                placeholder="Contoh: Bapak Anton / Inisial A"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl text-xs sm:text-sm focus:bg-white text-slate-800 transition-all font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold text-xs" htmlFor="input-room-no">Kamar Rawat / Nama Wad / Kelas</label>
              <input
                id="input-room-no"
                type="text"
                required
                placeholder="Contoh: Wad Cendrawasih Bed 5 / Kelas 2"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl text-xs sm:text-sm focus:bg-white text-slate-800 transition-all font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold text-xs" htmlFor="select-diet-type">Jenis Diet yang Diterima</label>
              <select
                id="select-diet-type"
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl text-xs focus:bg-white text-slate-800 font-semibold"
              >
                <option value="Makanan Biasa (Normal)">Makanan Biasa (Normal)</option>
                <option value="Diet Lambung / Lunak">Diet Lambung / Lunak</option>
                <option value="Diet Rendah Garam (Hipertensi)">Diet Rendah Garam (Hipertensi)</option>
                <option value="Diet Diabetes Melitus (DM)">Diet Diabetes Melitus (DM)</option>
                <option value="Diet Tinggi Kalori Tinggi Protein (TKTP)">Diet Tinggi Kalori Tinggi Protein (TKTP)</option>
                <option value="Diet Rendah Protein (Ginjal)">Diet Rendah Protein (Ginjal)</option>
              </select>
            </div>

          </div>

          {/* Interactive Star fields block */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-4" id="feedback-stars-block">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block mb-1">PROFIL EVALUASI MENU SAJI:</span>
            {renderStarRatingField("Kelezatan / Rasa Makanan", tasteRating, setTasteRating, "Menilai bumbu, kematangan lauk, kesegaran sup.", "taste")}
            {renderStarRatingField("Suhu Makanan / Pendistribusian", presentationRating, setPresentationRating, "Menilai apakah sayur & lauk disajikan hangat/kondusif.", "present")}
            {renderStarRatingField("Kebersihan Wastafel & Wadah Saji", cleanlinessRating, setCleanlinessRating, "Menilai kebersihan nampan, mangkok bertutup, sendok.", "cleanliness")}
            {renderStarRatingField("Ketepatan Waktu Pembagian", timeRating, setTimeRating, "Menilai pemenuhan jadwal antar (Pagi, Siang, Sore).", "time")}
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-bold text-xs" htmlFor="input-feedback-comment">Catatan Tambahan, Kritik atau Saran</label>
            <textarea
              id="input-feedback-comment"
              rows={3}
              placeholder="Tulis kritik membangun contoh: rasa nasi tim sudah pas, tolong sup sore disajikan lebih hangat..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl text-xs sm:text-sm focus:bg-white text-slate-800 transition-all leading-normal font-semibold text-slate-700"
            ></textarea>
          </div>

          <button
            id="btn-feedback-submit"
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all uppercase cursor-pointer"
          >
            Kirim Penilaian Gizi Saya
          </button>
        </form>

        {/* Right Side: Showcase patient feed (Span 7) */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-4" id="feedback-display-panel">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 space-y-1">
            <h3 className="text-slate-900 font-black text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>Suara Pasien RSUD Kalabahi ({feedbacks.length})</span>
            </h3>
            <p className="text-slate-500 text-xs font-semibold">
              Ulasan nyata dari pasien & pendamping mengenai hidangan sayur, buah, serta keheningan asuhan diet.
            </p>
          </div>

          {/* Feeds loop */}
          <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1" id="reviews-scroll-container">
            {feedbacks.map((item) => (
              <div key={item.id} id={`review-card-${item.id}`} className="bg-white p-5 rounded-2xl border-2 border-slate-100 space-y-3 shadow-2xs">
                
                {/* Meta header */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <h4 className="font-extrabold text-slate-850 text-sm">{item.patientName}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[10px] text-slate-500 font-semibold">
                      <span>{item.roomNumber}</span>
                      <span className="text-slate-300">•</span>
                      <span className="bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded-sm">{item.dietType}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                </div>

                {/* Score Indicators Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50" id="ratings-badge-grid">
                  
                  <div className="text-center space-y-0.5 border-r border-slate-150 last:border-0">
                    <span className="text-[9px] text-slate-400 uppercase font-mono block">Rasa</span>
                    <span className="font-bold text-xs text-amber-600 flex items-center justify-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {item.tasteRating}
                    </span>
                  </div>

                  <div className="text-center space-y-0.5 sm:border-r border-slate-150">
                    <span className="text-[9px] text-slate-400 uppercase font-mono block">Suhu</span>
                    <span className="font-bold text-xs text-amber-600 flex items-center justify-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {item.presentationRating}
                    </span>
                  </div>

                  <div className="text-center space-y-0.5 border-r border-slate-150">
                    <span className="text-[9px] text-slate-400 uppercase font-mono block">Bersih</span>
                    <span className="font-bold text-xs text-amber-600 flex items-center justify-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {item.cleanlinessRating}
                    </span>
                  </div>

                  <div className="text-center space-y-0.5">
                    <span className="text-[9px] text-slate-400 uppercase font-mono block">Waktu</span>
                    <span className="font-bold text-xs text-amber-600 flex items-center justify-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {item.timeRating}
                    </span>
                  </div>

                </div>

                {/* Comments text body */}
                <p className="text-xs text-slate-700 leading-relaxed px-1">
                  &ldquo;{item.comments}&rdquo;
                </p>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
