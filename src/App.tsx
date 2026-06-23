/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import BerandaTab from "./components/BerandaTab";
import DietTab from "./components/DietTab";
import MenuTab from "./components/MenuTab";
import MenuRsdTab from "./components/MenuRsdTab";
import EdukasiTab from "./components/EdukasiTab";
import UmpanBalikTab from "./components/UmpanBalikTab";
import HubungiTab from "./components/HubungiTab";
import { Utensils, Heart, BookOpen, MessageSquare, PhoneCall, Sparkles, Activity, Menu, X, FileText } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab ] = useState("beranda");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Highlight specific tab change trigger from inside tabs (e.g. CTA buttons)
  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "beranda", label: "Beranda", icon: Activity },
    { id: "diet", label: "Diet Khusus Saya", icon: Heart },
    { id: "menu_rsd", label: "Siklus Menu RSD Kalabahi", icon: FileText },
    { id: "menu", label: "Siklus Menu Gizi", icon: Utensils },
    { id: "edukasi", label: "Edukasi & Konsul AI", icon: BookOpen },
    { id: "feedback", label: "Umpan Balik Pasien", icon: MessageSquare },
    { id: "hubungi", label: "Hubungi Petugas", icon: PhoneCall },
  ];

  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900 pb-16 flex flex-col font-sans" id="sigadis-app-root">
      
      {/* Hospital Masthead Header in Vibrant Palette */}
      <header className="bg-white border-b-4 border-emerald-400 sticky top-0 z-50 shadow-sm" id="sigadis-main-header">
        
        {/* Mobile Header Row (Visible only on mobile/tablet) */}
        <div className="md:hidden flex items-center justify-between px-3 sm:px-4 py-2.5" id="mobile-header-bar">
          <div className="flex items-center gap-1.5">
            {/* Mobile Menu Button - Positioned exactly at top left */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-850 hover:text-emerald-700 active:scale-95 transition-all border border-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
            
            {/* Brand identity next to top-left menu trigger */}
            <div className="flex flex-col ml-0.5 items-start justify-center">
              <div className="flex items-center gap-1">
                <span className="font-black text-emerald-900 text-[15px] xs:text-base tracking-tight uppercase leading-none">SIGADIS</span>
                <span className="bg-emerald-500 text-white text-[7px] font-black uppercase px-1 py-0.5 rounded-md select-none leading-none">PORTAL</span>
              </div>
              <p className="text-emerald-600 text-[8px] xs:text-[9px] font-black uppercase tracking-wider mt-0.5 leading-none">
                Siklus Menu Gizi Diet Khusus
              </p>
            </div>
          </div>

          {/* Government & Ministry Logos - Top Right of mobile header bar */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-100 shadow-3xs scale-90 sm:scale-100 origin-right">
            <img 
              src="https://lh3.googleusercontent.com/d/1Dyy9JHeOqTWBVXquaHEkkQVrN0OQGznq" 
              alt="Logo Pemda Alor" 
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="w-[1px] h-6 bg-slate-200"></div>
            <img 
              src="https://lh3.googleusercontent.com/d/1jTUvbi-Ee3IA4tRsiGpB2IJpIrU7lB_Y" 
              alt="Logo Kemenkes RI" 
              className="h-7 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Mobile Sub-banner with Institutional Info & SIGADIS Meaning */}
        <div className="md:hidden bg-slate-50 border-t border-slate-100 px-3 py-2 flex flex-col gap-1.5 text-center text-slate-500 font-bold animate-fade-in" id="mobile-institution-strip">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[10px]">
            <div className="text-slate-755 font-black flex items-center justify-center sm:justify-start gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Instalasi Gizi RSUD Kalabahi
            </div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
              Pemerintah Kabupaten Alor, NTT
            </div>
          </div>
          <div className="text-[8px] sm:text-[9px] text-emerald-700 bg-emerald-50/70 border border-emerald-100 py-1.5 px-2 rounded-lg font-black uppercase tracking-wide">
            SIGADIS: Sistem Informasi Gizi Rawat Inap & Diet Sesuai Penyakit
          </div>
        </div>

        {/* Desktop Header Row (Visible only on desktop screens) */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 items-center justify-between gap-4" id="desktop-header-bar">
          
          {/* Brand Logo & Tagline with official entity logos */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            
            {/* Government & Ministry Logos */}
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-3xs">
              <img 
                src="https://lh3.googleusercontent.com/d/1Dyy9JHeOqTWBVXquaHEkkQVrN0OQGznq" 
                alt="Logo Pemda Alor" 
                className="h-12 w-auto object-contain hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="w-[1px] h-8 bg-slate-200"></div>
              <img 
                src="https://lh3.googleusercontent.com/d/1jTUvbi-Ee3IA4tRsiGpB2IJpIrU7lB_Y" 
                alt="Logo Kemenkes RI" 
                className="h-10 w-auto object-contain hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="h-10 w-[1.5px] bg-slate-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-md select-none">
                S
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="font-black text-emerald-900 text-2xl tracking-tight uppercase leading-none">SIGADIS</span>
                  <span className="bg-emerald-500 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full select-none">PORTAL</span>
                </div>
                <p className="text-emerald-600 text-[10px] font-black uppercase tracking-wider mt-1">
                  SIKLUS MENU GIZI DIET KHUSUS
                </p>
              </div>
            </div>
            
          </div>

          {/* Quick status information */}
          <div className="text-center md:text-right flex flex-col justify-center md:items-end">
            <p className="text-base font-black text-slate-800">Instalasi Gizi RSUD Kalabahi</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Pemerintah Kabupaten Alor, NTT</p>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 mt-1 uppercase w-fit mx-auto md:mr-0">
              Standar Pelayanan Gizi Kemenkes
            </span>
          </div>

        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer Panel */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          id="mobile-drawer-backdrop"
        >
          {/* Drawer content panel */}
          <div 
            className="w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col justify-between animate-slide-in-left"
            onClick={(e) => e.stopPropagation()} // Prevent clicking drawer from closing it
            id="mobile-drawer-content"
          >
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-emerald-100 bg-emerald-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base">S</span>
                  <div>
                    <h4 className="font-black text-emerald-950 text-sm">SIGADIS MENU</h4>
                    <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">RSUD Kalabahi</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 rounded-lg active:scale-95 transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="p-2.5 space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block px-3 py-1">
                  MAIN NAVIGATION
                </span>
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleNavigate(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-black transition-all cursor-pointer ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                      }`}
                    >
                      <IconComp className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer Information */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-1.5 text-center text-[10px] text-slate-400 font-bold">
              <p className="text-emerald-700 font-extrabold text-[9px]">PELAYANAN GIZI TERSTANDAR</p>
              <p className="leading-snug text-slate-500 font-medium text-[9px]">Asuhan Nutrisi & Diet khusus Pasien Rawat Inap RSUD Kalabahi</p>
              <p className="text-emerald-600 pt-1 text-[9px]">RSUD Kalabahi Alor • NTT</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu Tabs Bar with Vibrant Highlighting (Sticky only on desktop screens now) */}
      <nav className="hidden md:block bg-white border-b border-emerald-100 sticky top-[92px] z-40 shadow-xs" id="sigadis-navigation-tabs">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-none py-1 gap-1" id="nav-tabs-wrapper">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`tab-nav-btn-${item.id}`}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-3.5 border-b-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-all outline-none ${
                    isActive
                      ? "border-emerald-500 text-emerald-950 font-extrabold bg-emerald-50/50"
                      : "border-transparent text-slate-500 hover:text-emerald-700 hover:border-emerald-200"
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Stage container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full flex-1" id="sigadis-main-content-stage">
        
        {/* Render Active Tab */}
        {activeTab === "beranda" && <BerandaTab onNavigate={handleNavigate} />}
        {activeTab === "diet" && <DietTab />}
        {activeTab === "menu_rsd" && <MenuRsdTab />}
        {activeTab === "menu" && <MenuTab />}
        {activeTab === "edukasi" && <EdukasiTab />}
        {activeTab === "feedback" && <UmpanBalikTab />}
        {activeTab === "hubungi" && <HubungiTab />}

      </main>

      {/* Clean Hospital footer line with Vibrant aesthetics */}
      <footer className="mt-16 border-t border-emerald-200/60 bg-white py-8 text-center text-slate-500 text-xs space-y-4 select-none" id="sigadis-main-footer">
        
        {/* Footer Logos Container */}
        <div className="flex items-center justify-center gap-4 opacity-40 hover:opacity-75 transition-opacity duration-300">
          <img 
            src="https://lh3.googleusercontent.com/d/1Dyy9JHeOqTWBVXquaHEkkQVrN0OQGznq" 
            alt="Logo Pemda Alor" 
            className="h-8 w-auto object-contain grayscale"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://lh3.googleusercontent.com/d/1jTUvbi-Ee3IA4tRsiGpB2IJpIrU7lB_Y" 
            alt="Logo Kemenkes RI" 
            className="h-6 w-auto object-contain grayscale"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-1">
          <p className="font-extrabold uppercase text-[10px] tracking-widest text-emerald-700">SIGADIS RSUD KALABAHI</p>
          <p className="max-w-md mx-auto leading-relaxed px-4 text-slate-500 font-medium">
            Dinas Kesehatan & Pengendalian Gizi Pemerintah Kabupaten Alor, Nusa Tenggara Timur. Kebijakan menu makan terkontrol asuhan diet khusus demi kesembuhan paripurna pasien divalidasi Kemenkes RI.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 text-[10px] text-slate-400 font-bold pt-2">
          <span>Piket Gizi Ready: 07.00 - 19.00 WITA</span>
          <span>•</span>
          <span>v2.0 Beta Active</span>
        </div>
      </footer>

    </div>
  );
}
