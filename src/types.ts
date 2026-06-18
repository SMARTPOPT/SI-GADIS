/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DietInfo {
  id: string;
  name: string;
  shortDesc: string;
  purpose: string[];
  recommended: string[];
  restricted: string[];
  avoid: string[];
  tips: string[];
}

export interface MenuItem {
  karbohidrat: string;
  laukHewani: string;
  laukNabati: string;
  sayur: string;
  buah: string;
}

export interface DailyMenu {
  day: number;
  breakfast: MenuItem;
  lunch: MenuItem;
  dinner: MenuItem;
  snackPagi?: string;
  snackSore?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface Feedback {
  id: string;
  patientName: string;
  roomNumber: string;
  dietType: string;
  tasteRating: number;
  presentationRating: number;
  cleanlinessRating: number;
  timeRating: number;
  comments: string;
  createdAt: string;
}

export interface Officer {
  name: string;
  role: string;
  phone: string;
  isAvailable: boolean;
  schedule: string;
}
