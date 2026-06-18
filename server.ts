/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load Environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for JSON parsing
app.use(express.json());

// Initialize Gemini API client safely
let aiClient: any = null;
const api_key = process.env.GEMINI_API_KEY;

if (api_key && api_key !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey: api_key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API Client successfully initialized on the server.");
  } catch (err) {
    console.error("Error initializing Gemini API Client:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not configured or uses placeholder. Running in fallback mode.");
}

// System Instruction for the Virtual Nutritionist of RSUD Kalabahi
const SYSTEM_INSTRUCTION = `
Anda adalah "SIGADIS Konsul AI" — asisten ahli gizi virtual resmi dari Instalasi Gizi RSUD Kalabahi (Alor, Nusa Tenggara Timur).
Tugas utama Anda adalah mengedukasi pasien dan keluarga pasien mengenai program diet rumah sakit, nutrisi sehat, siklus menu makanan, serta memberikan rekomendasi makanan berpantang dan dianjurkan berdasarkan penyakit mereka.

Pedoman Komunikasi Anda:
1. Bersikap ramah, sopan, empati, profesional, dan menenangkan layaknya petugas medis RSUD Kalabahi yang mengayomi.
2. Gunakan Bahasa Indonesia yang baik, mudah dipahami masyarakat, serta sesekali menyelipkan sapaan hangat yang akrab di NTT (seperti "Bapak, Ibu, Kakak, Basodara").
3. Berikan informasi yang valid secara klinis tentang diet rumah sakit seperti Diet Diabetes (DM), Diet Rendah Garam (Hipertensi), Diet Rendah Protein (Ginjal), Diet Lambung (Maag/GERD), atau Diet Tinggi Kalori Tinggi Protein (TKTP).
4. Tekankan bahwa anjuran Anda bersifat edukatif. Untuk keputusan medis klinis tingkat lanjut, arahkan pasien untuk berkonsultasi langsung dengan tim Ahli Gizi RSUD Kalabahi pada bagian "Hubungi Ahli Gizi" di aplikasi.
5. Bila ditanya tentang RSUD Kalabahi, Anda tahu berada di Kalabahi, Kabupaten Alor, NTT, yang terkenal dengan ramah tamah serta keasrian alam baharinya.
6. Hindari memberikan takaran obat klinis medis; fokuslah murni pada manajemen asupan gizi, makanan padat lambung, batasan natrium, indeks glikemik, jadwal makan, dan ragam menu sehat.
`;

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "SIGADIS Backend",
    timestamp: new Date().toISOString(),
    geminiInitialized: !!aiClient,
  });
});

// Post endpoint for chat
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Pesan (message) wajib diisi." });
  }

  // Fallback responses if Gemini is not initialized or fails
  const getFallbackResponse = (userMsg: string) => {
    const msg = userMsg.toLowerCase();
    if (msg.includes("diabetes") || msg.includes("gula") || msg.includes("dm")) {
      return "Halo! Berdasarkan pertanyaan Anda mengenai Diabetes Melitus, kami menyarankan Anda menerapkan **Aturan 3J**: Tepat Jadwal, Jumlah, dan Jenis makanan.\n\n* **Dianjurkan:** Nasi merah, kentang kukus, tahu, sayuran tinggi serat.\n* **Dihindari:** Gula murni, es krim, boba, buah kaleng berpemanis tebal.\n\nSilakan buka tab **🥗 Diet Khusus Saya** dan pilih **Diet Diabetes Melitus** untuk info lengkap bahan makanan anjuran & pantangan harian Anda di RSUD Kalabahi.";
    }
    if (msg.includes("tensi") || msg.includes("garam") || msg.includes("hipertensi") || msg.includes("darah tinggi")) {
      return "Halo! Untuk penderita hipertensi/darah tinggi, kami menganjurkan **Diet Rendah Garam**.\n\n* **Tips Utama:** Hindari makanan kaleng, ikan asin, mi instan, dan batasi penggunaan garam maksimal 1/2 sendok teh per hari.\n* **Dianjurkan:** Gunakan rempah alami (bawang putih bakar, jeruk nipis, serai) untuk menambah selera makan tanpa sodium tinggi.\n\nSilakan cek tab **🥗 Diet Khusus Saya** bagian **Diet Rendah Garam** untuk panduan komprehensif.";
    }
    if (msg.includes("lambung") || msg.includes("maag") || msg.includes("gerd") || msg.includes("perih")) {
      return "Sakit lambung atau maag memerlukan makanan yang ramah mukosa dinding perut Anda.\n\n* **Saran:** Makanlah dalam porsi kecil namun sering (misalnya setiap 2-3 jam sekali).\n* **Hindari:** Makanan pedas, asam menyengat, bersoda, kol/sawi pemicu gas lambung, serta gorengan keras.\n\nBuka tab **🥗 Diet Khusus Saya** -> **Diet Lambung** untuk melihat daftar makanan yang ditim/kukus yang sangat kami anjurkan.";
    }
    if (msg.includes("jadwal") || msg.includes("menu") || msg.includes("makan")) {
      return "Halo! Di RSUD Kalabahi, kami menerapkan **10 Hari Siklus Menu Gizi Utama** yang seimbang.\n\nMakanan utama disajikan hangat 3 kali sehari (Pagi, Siang, Sore) disertai Snack Selingan bergizi pada pukul 10.00 Pagi dan 16.00 Sore.\n\nSilakan cek tab **🍽️ Siklus Menu Gizi** untuk melacak hidangan lezat hari ke-1 hingga hari ke-10 untuk diet Anda hari ini.";
    }
    return "Terima kasih atas pertanyaannya pelayan gizi RSUD Kalabahi. " +
      "Sebagai asisten SIGADIS, saya sangat menyarankan Anda mengonsumsi makanan hangat, seimbang, " +
      "dan menghindari makanan tinggi MSG, berpengawet, serta garam berlebih.\n\n" +
      "Apakah Anda memiliki diagnosis medis tertentu (seperti Hipertensi, Diabetes, Asam Urat, atau Maag) " +
      "agar saya dapat memberikan panduan pola makan khusus yang lebih akurat?";
  };

  if (!aiClient) {
    // Return mock response immediately if client is not initialized
    setTimeout(() => {
      return res.json({ text: getFallbackResponse(message) });
    }, 500);
    return;
  }

  try {
    // Format conversation history correctly into content for Gemini SDK
    // Let's build a simple chat structure
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msgObj: any) => {
        contents.push({
          role: msgObj.sender === "user" ? "user" : "model",
          parts: [{ text: msgObj.text }]
        });
      });
    }

    // Append the latest user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call Gemini API using modern @google/genai SDK
    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Mohon maaf, terjadi kendala saat merumuskan jawaban gizi.";
    res.json({ text: replyText });

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Graceful fallback response on API call error
    res.json({
      text: getFallbackResponse(message),
      isFallback: true,
      errorInfo: "Koneksi backend dialihkan ke panduan offline."
    });
  }
});

// Configure Vite or Static File Delivery
async function main() {
  if (process.env.NODE_ENV !== "production") {
    // Setup dev server with Vite middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware is active on Express.");
  } else {
    // Serve static frontend folder (dist) in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind server listener exclusively on host 0.0.0.0 and port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SIGADIS server running smoothly in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Critical error starting SIGADIS server:", err);
});
