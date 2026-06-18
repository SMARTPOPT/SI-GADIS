/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DietInfo, DailyMenu, Officer } from "../types";

export const DIET_LIST: DietInfo[] = [
  {
    id: "dm",
    name: "Diet Diabetes Melitus (DM)",
    shortDesc: "Diet untuk membantu menjaga kadar gula darah dalam batas normal bagi penderita kencing manis.",
    purpose: [
      "Menurunkan atau mempertahankan kadar glukosa darah mendekati normal",
      "Mencapai dan mempertahankan berat badan yang ideal",
      "Mencegah komplikasi akut dan kronik kencing manis",
      "Meningkatkan kualitas hidup penderita"
    ],
    recommended: [
      "Bayam, brokoli, kembang kol, labu siam, kacang panjang",
      "Nasi merah, oat, kentang (porsi dibatasi), roti gandum",
      "Ikan segar, ayam tanpa kulit, tahu, tempe",
      "Buah tinggi serat: pepaya, buah naga, apel, pir",
      "Minyak sehat seperti minyak zaitun untuk memasak"
    ],
    restricted: [
      "Nasi putih porsi besar, roti tawar putih",
      "Semangka, mangga manis, kurma porsi berlebih",
      "Santan kental, margarin biasa",
      "Kandungan garam berlebih atau MSG"
    ],
    avoid: [
      "Gula pasir, gula merah, sirup, madu asli/buatan",
      "Minuman ringan manis (boba, kola, teh kemasan)",
      "Kue-kue manis, bolu, donat, es krim",
      "Buah kalengan dengan sirup manis",
      "Gorengan kering dengan tepung tebal"
    ],
    tips: [
      "Terapkan aturan 3J: Tepat JADWAL (makan teratur), Tepat JUMLAH (porsi kalori pas), Tepat JENIS (hindari gula murni).",
      "Makan porsi kecil tapi sering (3 kali makan utama, 2 kali makanan selingan/snack).",
      "Konsultasikan kebutuhan kalori harian Anda (biasanya dimulai dari 1500, 1700, atau 1900 Kkal) dengan petugas gizi."
    ]
  },
  {
    id: "rg",
    name: "Diet Rendah Garam / Hipertensi",
    shortDesc: "Ditargetkan untuk penderita tekanan darah tinggi demi mengurangi retensi cairan tubuh.",
    purpose: [
      "Membantu menurunkan tekanan darah sistolik dan diastolik",
      "Mencegah penimbunan cairan tubuh (edema/bengkak)",
      "Menurunkan beban kerja jantung"
    ],
    recommended: [
      "Semua bahan makanan segar tanpa modifikasi garam natrium",
      "Beras, kentang singkong, terigu, tapioka tanpa sodium",
      "Kacang-kacangan mentah, tahu porsi tawar, tempe",
      "Sayuran segar dan buah-buahan segar asli",
      "Rempah alami: bawang merah, bawang putih, jahe, kunyit, ketumbar untuk penambah rasa aman"
    ],
    restricted: [
      "Penggunaan kecap rasa manis/asin, saus tomat kemasan",
      "Mentega atau keju asin olahan pabrik",
      "Garam dapur maksimal 1/2 sendok teh per hari (khusus Diet RG II)"
    ],
    avoid: [
      "Makanan kaleng: sarden, kornet, buah kaleng berpemanis",
      "Ikan asin, telur asin, teri, keripik asin, crackers gurih",
      "Bumbu instan sup, kaldu bubuk bermesin MSG tinggi",
      "Makanan awetan menggunakan natrium benzoat/soda"
    ],
    tips: [
      "Gunakan bumbu beraroma kuat seperti jeruk nipis, serai, daun salam, bawang putih bakar sebagai pengganti gurihnya garam.",
      "Selalu baca label kemasan untuk melacak kandungan Sodium / Natrium.",
      "Hindari makanan cepat saji atau produk olahan instan."
    ]
  },
  {
    id: "rp",
    name: "Diet Rendah Protein (Gagal Ginjal)",
    shortDesc: "Meringankan kerja organ ginjal dengan mengurangi produksi sisa metabolisme protein (ureum).",
    purpose: [
      "Memperlambat progresivitas penurunan fungsi ginjal",
      "Mengurangi penumpukan sisa nitrogen (ureum darah)",
      "Mengatur keseimbangan cairan dan elektrolit tubuh"
    ],
    recommended: [
      "Sumber karbohidrat murni: bihun, kentang, beras, madu asli",
      "Protein hewani nilai biologis tinggi (porsi terkontrol): kuning telur harian, ikan patin, dada ayam",
      "Minyak jagung, minyak sawit dalam jumlah wajar",
      "Air putih sesuai anjuran takaran dokter"
    ],
    restricted: [
      "Tahu, tempe, kacang kedelai, kacang tanah",
      "Sayuran tinggi kalium seperti pisang, alpukat jika urin menurun",
      "Susu protein tinggi komersial"
    ],
    avoid: [
      "Makanan olahan awetan bergaram tinggi",
      "Makanan tinggi fosfor: jeroan, udang, kepiting, sosis",
      "Minuman berkarbonasi, suplemen energi instan"
    ],
    tips: [
      "Konsumsi protein harus sangat presisi sesuai hitungan berat badan (biasanya 0.6 - 0.8g per kg berat badan harian).",
      "Bila kuantitas urin Anda sedikit atau bengkak, batasi asupan cairan setara jumlah urin kemarin ditambah 500 mL."
    ]
  },
  {
    id: "tktp",
    name: "Diet Tinggi Kalori Tinggi Protein (TKTP)",
    shortDesc: "Diberikan untuk kondisi gizi kurang, masa pemulihan pasca operasi, luka bakar berat, atau penyakit infeksi (TBC).",
    purpose: [
      "Memenuhi kebutuhan kalori dan protein yang meningkat",
      "Mencegah kerusakan jaringan tubuh berlebih",
      "Membangun kembali massa sel dan antibodi",
      "Mempercepat proses penyembuhan luka pasca operasi"
    ],
    recommended: [
      "Semua makanan biasa ditambah ekstra sumber telur rebus, susu penuh, yoghurt",
      "Lauk pauk tinggi protein: ayam goreng, ikan tongkol, daging sapi sup",
      "Camilan padat gizi: bubur kacang hijau, bolu, puding susu",
      "Tahu, tempe goreng isi gizi lengkap",
      "Aneka jus buah segar"
    ],
    restricted: [
      "Banyakknya minum sebelum makan karena bisa mengurangi nafsu makan",
      "Makanan rendah kalori yang terlalu berkuah bening kosong"
    ],
    avoid: [
      "Makanan berserat terlalu tinggi yang mudah memicu rasa kenyang semu sebelum kalori utama terpenuhi",
      "Jajanan kosong gizi yang hanya mengandung perasa kimia"
    ],
    tips: [
      "Konsumsi minimal 2 butir telur rebus (bagian putih paling utama) setiap hari untuk mendongkrak albumin.",
      "Makan dalam kondisi hangat agar membangkitkan nafsu makan pasca trauma operasi."
    ]
  },
  {
    id: "lambung",
    name: "Diet Lambung / Saluran Pencernaan",
    shortDesc: "Diberikan untuk penderita Maag, GERD, Gastritis harian, atau pasien pasca bedah saluran cerna.",
    purpose: [
      "Menghindari gesekan fisik & kimia pada dinding mukosa lambung",
      "Mencegah sekresi asam lambung berlebih",
      "Menetralkan kelebihan asam lambung",
      "Makanan harus mudah dicerna dan diserap tubuh"
    ],
    recommended: [
      "Beras ditim, kentang rebus haluskan, maizena, bubur saring",
      "Tahu rebus, tempe kukus, telur rebus tim",
      "Sayuran lunak rendah serat: wortel muda kukus, labu kuning",
      "Pisang ambon, pepaya matang segar",
      "Sari kacang hijau hangat"
    ],
    restricted: [
      "Roti gandum utuh padat, beras ketan",
      "Susu kental manis porsi pekat",
      "Sayuran setengah matang atau sayur mentah coleslaw"
    ],
    avoid: [
      "Makanan pedas menggelegar, sambal cabai",
      "Makanan asam: jeruk nipis murni, cuka, acar segar",
      "Gorengan keras garing berminyak jenuh tinggi",
      "Kopi hitam, teh kental pekat, soda berkarbonat",
      "Sayuran pemicu gas lambung: kol, sawi, brokoli renyah, lobak"
    ],
    tips: [
      "Kunyah makanan hingga benar-benar halus (idealnya 32 kali).",
      "Makan dengan porsi kecil secara perlahan, jangan berbaring langsung dalam waktu 2 jam pasca makan."
    ]
  }
];

export const CYCLE_MENUS: DailyMenu[] = [
  {
    day: 1,
    snackPagi: "Bubur Kacang Hijau Gizi",
    breakfast: {
      karbohidrat: "Nasi Putih / Tim Lembut",
      laukHewani: "Telur Ceplok Bumbu Terik",
      laukNabati: "Tempe Goreng Bumbu Kuning",
      sayur: "Sup Wortel Labu Siam",
      buah: "Pisang Ambon"
    },
    snackSore: "Puding Mangga Vanila",
    lunch: {
      karbohidrat: "Nasi Putih / Kentang Tim",
      laukHewani: "Ayam Panggang Kecap RSUD",
      laukNabati: "Tahu Bacem Gurih",
      sayur: "Sayur Bening Bayam Jagung",
      buah: "Pepaya Iris Sehat"
    },
    dinner: {
      karbohidrat: "Nasi Putih Sehat",
      laukHewani: "Ikan Tongkol Bumbu Pepes",
      laukNabati: "Semur Tahu Sutra",
      sayur: "Cah Sayur Sawi Wortel",
      buah: "Melon Segar"
    }
  },
  {
    day: 2,
    snackPagi: "Sentiling Singkong Warna Warni",
    breakfast: {
      karbohidrat: "Nasi Kuning Gizi Rendah Garam / Tim",
      laukHewani: "Daging Sapi Suwir Manis",
      laukNabati: "Tahu Goreng Tepung Tipis",
      sayur: "Sup Labu Air Bening",
      buah: "Jeruk Manis"
    },
    snackSore: "Bolu Kukus Gula Aren",
    lunch: {
      karbohidrat: "Nasi Putih Hangat",
      laukHewani: "Ikan Kembung Goreng Bumbu Kuning",
      laukNabati: "Tempe Mendoan Sehat",
      sayur: "Sayur Lodeh Labu Siam (Santan Encer)",
      buah: "Semangka Merah"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ayam Semur Tim",
      laukNabati: "Tahu Kombinasi Wortel",
      sayur: "Tumis Kacang Panjang Muda",
      buah: "Pepaya Segar"
    }
  },
  {
    day: 3,
    snackPagi: "Bubur Sumsum Saus Gula Kelapa Encer",
    breakfast: {
      karbohidrat: "Nasi Putih / Tim Bubur",
      laukHewani: "Ikan Mujair Goreng Tepung Crispy",
      laukNabati: "Orek Tempe Basah Manis",
      sayur: "Sup Oyong Soun Bening",
      buah: "Pisang Mas"
    },
    snackSore: "Puding Cokelat Saus Susu Rendah Lemak",
    lunch: {
      karbohidrat: "Nasi Putih / Nasi Merah",
      laukHewani: "Daging Sapi Bumbu Lapis Gizi",
      laukNabati: "Tahu Goreng Sajian Hangat",
      sayur: "Cah Brokoli Wortel Labu",
      buah: "Apel Manis Kupas"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Telur Rebus Balado RSUD",
      laukNabati: "Tempe Koktail Kukus",
      sayur: "Sayur Bobor Daun Labu",
      buah: "Melon Manis"
    }
  },
  {
    day: 4,
    snackPagi: "Jasuke (Jagung Susu Keju Rendah Garam)",
    breakfast: {
      karbohidrat: "Nasi Uduk Diet / Tim",
      laukHewani: "Ayam Goreng Lengkuas Gizi",
      laukNabati: "Tahu Goreng Kuning",
      sayur: "Sayur Asem Segar Kalabahi",
      buah: "Pepaya Matang"
    },
    snackSore: "Kolek Pisang Gula Singkong",
    lunch: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ikan Tenggiri Asam Manis",
      laukNabati: "Tempe Orek Serai",
      sayur: "Tumis Labu Siam Jagung Pipil",
      buah: "Semangka"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Rolade Daging Sapi Tim",
      laukNabati: "Tahu Sutra Siram Saus Tiram",
      sayur: "Sup Kimlo Bakso Sayur",
      buah: "Pisang Raja"
    }
  },
  {
    day: 5,
    snackPagi: "Bubur Ketan Hitam Gizi",
    breakfast: {
      karbohidrat: "Nasi Putih / Tim",
      laukHewani: "Gulai Telur Daun Mangkokan (Santan Sangat Cair)",
      laukNabati: "Semur Tempe Segar",
      sayur: "Sup Wortel Makaroni",
      buah: "Jeruk Manis Alor"
    },
    snackSore: "Kue Talam Labu Kuning",
    lunch: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ayam Goreng Tepung Mentega",
      laukNabati: "Perkedel Tahu Kukus Panggang",
      sayur: "Pecel Sayuran Rebus (Saus Kacang Ringan)",
      buah: "Melon Cantaloupe"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ikan Fillet Saus Tomat Segar",
      laukNabati: "Tempe Goreng Ketumbar",
      sayur: "Sayur Bening Kacang Hijau Kecambah",
      buah: "Apel Kupas"
    }
  },
  {
    day: 6,
    snackPagi: "Kue Mangkok Kukus Hangat",
    breakfast: {
      karbohidrat: "Nasi Putih / Tim Kentang",
      laukHewani: "Daging Sapi Sate Goreng Tanpa Lemak",
      laukNabati: "Tahu Bacem Kalabahi Terbaik",
      sayur: "Bening Bayam Labu Kuning",
      buah: "Pisang Ambon"
    },
    snackSore: "Puding Stroberi Susu Gizi",
    lunch: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ikan Tongkol Bakar Bumbu Kemangi",
      laukNabati: "Tempe Goreng Bumbu Ketumbar",
      sayur: "Sup Bakso Ikan Sayur Sawi Wortel",
      buah: "Nanas Madu Iris Sehat"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ayam Suwir Saus Kecap Manis",
      laukNabati: "Tahu Sutra Kukus Telur",
      sayur: "Tumis Sawi Putih Wortel",
      buah: "Pepaya"
    }
  },
  {
    day: 7,
    snackPagi: "Bubur Kacang Hijau Tanpa Santan Berlebih",
    breakfast: {
      karbohidrat: "Nasi Putih / Bubur Lambung",
      laukHewani: "Telur Rebus Bumbu Rujak Halus",
      laukNabati: "Orek Tempe Basah",
      sayur: "Sayur Bening Jagung Muda Kelor (Khas NTT)",
      buah: "Pepaya Segar"
    },
    snackSore: "Kue Ku Ketan Merah Hiasan Gizi",
    lunch: {
      karbohidrat: "Nasi Putih Hangat",
      laukHewani: "Ayam Bakar Bumbu Kuning RSUD",
      laukNabati: "Tahu Goreng Tepung Kunyit",
      sayur: "Tumis Kangkung Belacan Ringan",
      buah: "Pisang Emas"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ikan Bandeng Tanpa Duri Presto",
      laukNabati: "Tempe Bacem Lembut",
      sayur: "Sup Labu Air Baso Ayam",
      buah: "Semangka Merah Segar"
    }
  },
  {
    day: 8,
    snackPagi: "Nagasari Pisang Kukus Daun Pandan",
    breakfast: {
      karbohidrat: "Nasi Putih / Tim",
      laukHewani: "Daging Sapi Iris Teriyaki Gizi",
      laukNabati: "Tahu Sutra Goreng Bumbu Kaldu",
      sayur: "Sayur Bening Wortel Oyong",
      buah: "Jeruk Kupas"
    },
    snackSore: "Puding Kelapa Muda Vanila",
    lunch: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ayam Goreng Crispy Kalabahi",
      laukNabati: "Perkedel Tempe Panggang",
      sayur: "Cah Kembang Kol Wortel",
      buah: "Pepaya Manis"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ikan Nila Asam Pedas Lembut",
      laukNabati: "Tahu Semur Hangat",
      sayur: "Sup Jagung Manis Kental Tim Telur",
      buah: "Melon Kupas"
    }
  },
  {
    day: 9,
    snackPagi: "Getuk Lindri Singkong Keju",
    breakfast: {
      karbohidrat: "Nasi Putih / Tim Bubur",
      laukHewani: "Telur Dadar Gulung Sayuran",
      laukNabati: "Tempe Mendoan Hangat Gizi",
      sayur: "Bening Bayam Wortel Makaroni",
      buah: "Pisang Ambon"
    },
    snackSore: "Bolu Steamed Pelangi",
    lunch: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ikan Patin Sup Asam Belimbing",
      laukNabati: "Tahu Goreng Gurih Bumbu Temulawak",
      sayur: "Capcay Sayur Sawi Baso",
      buah: "Semangka Iris"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ayam Bumbu Garang Asem RSUD (Tidak Pedas)",
      laukNabati: "Tempe Bacem Tim",
      sayur: "Sup Labu Siam Bakso Sapi",
      buah: "Melon Orange"
    }
  },
  {
    day: 10,
    snackPagi: "Bubur Sumsum Kuah Gula Merah",
    breakfast: {
      karbohidrat: "Nasi Putih / Tim Lembut",
      laukHewani: "Ikan Fillet Goreng Saus Lemon Segar",
      laukNabati: "Tahu Segar Kukus Wortel",
      sayur: "Bening Kangkung Sawi Hijau",
      buah: "Jeruk Keprok Alor"
    },
    snackSore: "Kolek Waluh Labu Kuning",
    lunch: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ayam Bakar Madu Rendah Garam",
      laukNabati: "Tempe Goreng Tepung Crispy",
      sayur: "Sup Kimlo Soun Bakso Ikan",
      buah: "Apel Fuji Manis"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Daging Sapi Semur Kentang",
      laukNabati: "Tahu Bacem Goreng",
      sayur: "Cah Sayur Kacang Panjang Wortel",
      buah: "Pepaya Manis"
    }
  },
  {
    day: 11,
    snackPagi: "Kue Talam Pandan Istimewa",
    breakfast: {
      karbohidrat: "Nasi Goreng Diet Gizi Rendah Garam / Tim",
      laukHewani: "Telur Rebus Iris Sehat",
      laukNabati: "Tahu Goreng Tepung Tipis",
      sayur: "Sayur Bening Bayam Wortel",
      buah: "Pisang Raja"
    },
    snackSore: "Puding Karamel Susu Gizi",
    lunch: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ayam Goreng Rempah Lengkuas",
      laukNabati: "Tempe Orek Basah Serai",
      sayur: "Sup Bakso Sayur Segar",
      buah: "Melon Segar"
    },
    dinner: {
      karbohidrat: "Nasi Putih",
      laukHewani: "Ikan Tongkol Bumbu Rujak Halus",
      laukNabati: "Tahu Sutra Kukus Daun Bawang",
      sayur: "Cah Kacang Panjang Muda Tepung",
      buah: "Pepaya Iris Sehat"
    }
  }
];

export const OFFICIAL_UNIT_GIZI_MENUS: DailyMenu[] = [
  {
    day: 1,
    breakfast: {
      karbohidrat: "Bubur",
      laukHewani: "Telur Balado",
      laukNabati: "-",
      sayur: "Tumis Sawi",
      buah: "-"
    },
    lunch: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Asam Manis, Sate Ayam",
      laukNabati: "Tempe/Tahu Mendoan",
      sayur: "Sop Makaroni",
      buah: "Pisang / Pepaya"
    },
    dinner: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Goreng Tepung, Ayam Goreng Saos",
      laukNabati: "Tahu/Tempe Bumbu Saos",
      sayur: "Orak-arik Sayuran",
      buah: "-"
    }
  },
  {
    day: 2,
    breakfast: {
      karbohidrat: "Bubur",
      laukHewani: "Telur Rebus",
      laukNabati: "-",
      sayur: "Tumis (Kacang Panjang, Jagung, Toge)",
      buah: "-"
    },
    lunch: {
      karbohidrat: "Nasi / Bubur",
      laukHewani: "Ikan Goreng, Semur Daging",
      laukNabati: "Perkedel Tahu/Tempe",
      sayur: "Capcay",
      buah: "Pisang / Pepaya"
    },
    dinner: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Brengkes, Ayam Bumbu Kuning",
      laukNabati: "Orak-arik Tahu/Tempe",
      sayur: "Bening Bayam Jagung",
      buah: "-"
    }
  },
  {
    day: 3,
    breakfast: {
      karbohidrat: "Bubur",
      laukHewani: "Telur Mata Sapi",
      laukNabati: "-",
      sayur: "Tumis (Bayam, Tauge)",
      buah: "-"
    },
    lunch: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Bumbu Tomat, Ayam Goreng Tepung",
      laukNabati: "Tahu/Tempe Bacem",
      sayur: "Tumis (Sawi, Jagung)",
      buah: "Pisang / Pepaya"
    },
    dinner: {
      karbohidrat: "Nasi / Bubur",
      laukHewani: "Ikan Goreng Rica-rica, Semur Ayam",
      laukNabati: "Tahu/Tempe Goreng",
      sayur: "Sop Kacang Merah",
      buah: "-"
    }
  },
  {
    day: 4,
    breakfast: {
      karbohidrat: "Bubur Ayam",
      laukHewani: "Ayam Suwir (Sajian Bubur Ayam)",
      laukNabati: "-",
      sayur: "-",
      buah: "-"
    },
    lunch: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Goreng Bumbu Semur, Ayam Rica-rica",
      laukNabati: "Tahu/Tempe Balado",
      sayur: "Sayur Lodeh",
      buah: "Pisang / Pepaya"
    },
    dinner: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Brengkes, Ayam Goreng",
      laukNabati: "Oseng Tahu/Tempe",
      sayur: "Sop Jagung Manis",
      buah: "-"
    }
  },
  {
    day: 5,
    breakfast: {
      karbohidrat: "Bubur",
      laukHewani: "Telur Dadar",
      laukNabati: "-",
      sayur: "Tumis (Labu Siam, Sawi)",
      buah: "-"
    },
    lunch: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Goreng Rica-rica, Ayam Bakar",
      laukNabati: "Tahu/Tempe Tumis",
      sayur: "Soto",
      buah: "Pisang / Pepaya"
    },
    dinner: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Pepes Ikan, Ayam Bumbu Rendang",
      laukNabati: "Sambal Goreng Tahu/Tempe",
      sayur: "Tumis Sawi",
      buah: "-"
    }
  },
  {
    day: 6,
    breakfast: {
      karbohidrat: "Bubur",
      laukHewani: "Telur Bumbu Saos",
      laukNabati: "-",
      sayur: "Tumis (Kacang Panjang, Tauge)",
      buah: "-"
    },
    lunch: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Goreng Bumbu Tomat, Ayam Goreng Tepung",
      laukNabati: "Nuget Tahu/Tempe",
      sayur: "Sop (Oyong, Labu, Wortel, Mie)",
      buah: "Pisang / Pepaya"
    },
    dinner: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Asam Manis, Opor Ayam",
      laukNabati: "Tahu/Tempe Bumbu Balado",
      sayur: "Rumpu-rampe",
      buah: "-"
    }
  },
  {
    day: 7,
    breakfast: {
      karbohidrat: "Bubur",
      laukHewani: "Telur Semur",
      laukNabati: "-",
      sayur: "Bayam + Jagung Manis",
      buah: "-"
    },
    lunch: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Goreng Biasa, Ayam Asam Manis",
      laukNabati: "Tempe/Tahu Semur",
      sayur: "Sayur Sawi",
      buah: "Buah Brangan (Baranga) / Ambon"
    },
    dinner: {
      karbohidrat: "Bubur / Nasi",
      laukHewani: "Ikan Rica-rica, Ayam Kecap",
      laukNabati: "Tahu/Tempe Mendoan",
      sayur: "Sayuran Mie Putih",
      buah: "-"
    }
  }
];

export const NUTRITIONISTS: Officer[] = [
  {
    name: "Ibu Maria L. Mau, S.Tr.Gizi",
    role: "Kepala Instalasi Gizi RSUD Kalabahi",
    phone: "6281234567890",
    isAvailable: true,
    schedule: "Senin - Sabtu (08:00 - 15:00)"
  },
  {
    name: "Bapak Robertus K. Pen, S.Gz",
    role: "Penanggung Jawab Diet & Menu Pasien",
    phone: "6282198765432",
    isAvailable: true,
    schedule: "Senin - Sabtu (07:30 - 14:00)"
  },
  {
    name: "Ibu Kristina Wel, Amd.Gz",
    role: "Ahli Gizi Konseling & Poliklinik Gizi",
    phone: "6285211223344",
    isAvailable: false,
    schedule: "Selasa & Kamis (09:00 - 13:00)"
  }
];
