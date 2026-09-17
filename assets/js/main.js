/**
 * main.js
 * Data tools + utilitas UI yang dipakai di semua halaman.
 */

const TOOLS_DATA = [
  {
    id: "persentase",
    name: "Kalkulator Persentase",
    category: "Matematika",
    description: "Hitung persentase dari suatu angka dengan cepat.",
    url: "/calculators/persentase.html",
    icon: "percent",
    popular: true,
  },
  {
    id: "diskon",
    name: "Kalkulator Diskon",
    category: "Keuangan",
    description: "Cek harga setelah diskon dan besaran potongannya.",
    url: "/calculators/diskon.html",
    icon: "sell",
    popular: true,
  },
  {
    id: "cicilan",
    name: "Kalkulator Cicilan",
    category: "Keuangan",
    description: "Estimasi cicilan bulanan berdasarkan DP, tenor, dan bunga.",
    url: "/calculators/cicilan.html",
    icon: "credit_card",
    popular: true,
  },
  {
    id: "bbm",
    name: "Kalkulator BBM",
    category: "Kendaraan",
    description: "Hitung kebutuhan dan biaya BBM untuk perjalananmu.",
    url: "/calculators/bbm.html",
    icon: "local_gas_station",
    popular: true,
  },
  {
    id: "gaji",
    name: "Kalkulator Gaji Bersih",
    category: "Keuangan",
    description: "Estimasi gaji bersih setelah tunjangan dan potongan.",
    url: "/calculators/gaji.html",
    icon: "account_balance_wallet",
    popular: true,
  },
  {
    id: "thr",
    name: "Kalkulator THR",
    category: "Keuangan",
    description: "Estimasi Tunjangan Hari Raya berdasarkan masa kerja.",
    url: "/calculators/thr.html",
    icon: "redeem",
    popular: false,
  },
  {
    id: "ipk",
    name: "Kalkulator IPK",
    category: "Pendidikan",
    description: "Hitung IPK dari daftar mata kuliah dan nilai.",
    url: "/calculators/ipk.html",
    icon: "school",
    popular: true,
  },
  {
    id: "qr-code",
    name: "QR Code Generator",
    category: "Tools",
    description: "Buat QR Code dari teks, URL, atau nomor WhatsApp.",
    url: "/tools/qr-code.html",
    icon: "qr_code_2",
    popular: true,
  },
  {
    id: "luas-tanah",
    name: "Kalkulator Luas Tanah",
    category: "Rumah",
    description: "Hitung luas tanah dan estimasi nilainya per meter persegi.",
    url: "/calculators/luas-tanah.html",
    icon: "square_foot",
    popular: false,
  },
  {
    id: "cat",
    name: "Kalkulator Kebutuhan Cat",
    category: "Rumah",
    description: "Hitung liter cat yang dibutuhkan untuk mengecat ruangan.",
    url: "/calculators/cat.html",
    icon: "format_paint",
    popular: false,
  },
  {
    id: "keramik",
    name: "Kalkulator Kebutuhan Keramik",
    category: "Rumah",
    description: "Hitung jumlah keping keramik yang dibutuhkan untuk lantai.",
    url: "/calculators/keramik.html",
    icon: "grid_view",
    popular: false,
  },

  {
    id: "kpr",
    name: "Kalkulator KPR",
    category: "Keuangan",
    description: "Estimasi cicilan KPR memakai metode anuitas.",
    url: "/calculators/kpr.html",
    icon: "home",
    popular: true,
  },
  {
    id: "bmi",
    name: "Kalkulator BMI",
    category: "Personal",
    description: "Hitung Indeks Massa Tubuh dan kategorinya.",
    url: "/calculators/bmi.html",
    icon: "monitor_weight",
    popular: true,
  },
  {
    id: "bmr",
    name: "Kalkulator BMR",
    category: "Personal",
    description: "Hitung kalori dasar tubuh saat istirahat.",
    url: "/calculators/bmr.html",
    icon: "local_fire_department",
    popular: false,
  },
  {
    id: "tdee",
    name: "Kalkulator TDEE",
    category: "Personal",
    description: "Hitung kebutuhan kalori harian sesuai aktivitas.",
    url: "/calculators/tdee.html",
    icon: "directions_run",
    popular: false,
  },
  {
    id: "kalori",
    name: "Kalkulator Kalori",
    category: "Personal",
    description: "Target kalori harian sesuai tujuan berat badan.",
    url: "/calculators/kalori.html",
    icon: "restaurant",
    popular: true,
  },
  {
    id: "rata-rata",
    name: "Kalkulator Rata-rata",
    category: "Matematika",
    description: "Hitung nilai rata-rata dari sekumpulan angka.",
    url: "/calculators/rata-rata.html",
    icon: "functions",
    popular: false,
  },
  {
    id: "pecahan",
    name: "Kalkulator Pecahan",
    category: "Matematika",
    description: "Tambah, kurang, kali, bagi dua pecahan.",
    url: "/calculators/pecahan.html",
    icon: "pie_chart",
    popular: false,
  },
  {
    id: "pangkat",
    name: "Kalkulator Pangkat",
    category: "Matematika",
    description: "Hitung hasil pangkat/eksponen suatu bilangan.",
    url: "/calculators/pangkat.html",
    icon: "superscript",
    popular: false,
  },
  {
    id: "akar",
    name: "Kalkulator Akar",
    category: "Matematika",
    description: "Hitung akar kuadrat atau akar derajat lain.",
    url: "/calculators/akar.html",
    icon: "square_foot",
    popular: false,
  },
  {
    id: "rasio",
    name: "Kalkulator Rasio",
    category: "Matematika",
    description: "Sederhanakan rasio dua angka.",
    url: "/calculators/rasio.html",
    icon: "balance",
    popular: false,
  },
  {
    id: "perbandingan",
    name: "Kalkulator Perbandingan",
    category: "Matematika",
    description: "Selesaikan soal perbandingan senilai (proporsi).",
    url: "/calculators/perbandingan.html",
    icon: "compare_arrows",
    popular: false,
  },
  {
    id: "lingkaran",
    name: "Kalkulator Luas Lingkaran",
    category: "Matematika",
    description: "Hitung luas dan keliling lingkaran.",
    url: "/calculators/lingkaran.html",
    icon: "circle",
    popular: false,
  },
  {
    id: "segitiga",
    name: "Kalkulator Segitiga",
    category: "Matematika",
    description: "Hitung luas segitiga dari alas dan tinggi.",
    url: "/calculators/segitiga.html",
    icon: "change_history",
    popular: false,
  },
  {
    id: "persegi",
    name: "Kalkulator Persegi",
    category: "Matematika",
    description: "Hitung luas dan keliling persegi.",
    url: "/calculators/persegi.html",
    icon: "crop_square",
    popular: false,
  },
  {
    id: "persegi-panjang",
    name: "Kalkulator Persegi Panjang",
    category: "Matematika",
    description: "Hitung luas dan keliling persegi panjang.",
    url: "/calculators/persegi-panjang.html",
    icon: "crop_5_4",
    popular: false,
  },
  {
    id: "volume-kubus",
    name: "Kalkulator Volume Kubus",
    category: "Matematika",
    description: "Hitung volume dan luas permukaan kubus.",
    url: "/calculators/volume-kubus.html",
    icon: "deployed_code",
    popular: false,
  },
  {
    id: "volume-balok",
    name: "Kalkulator Volume Balok",
    category: "Matematika",
    description: "Hitung volume balok dari panjang, lebar, tinggi.",
    url: "/calculators/volume-balok.html",
    icon: "view_in_ar",
    popular: false,
  },
  {
    id: "volume-tabung",
    name: "Kalkulator Volume Tabung",
    category: "Matematika",
    description: "Hitung volume tabung dari jari-jari dan tinggi.",
    url: "/calculators/volume-tabung.html",
    icon: "donut_large",
    popular: false,
  },
  {
    id: "kecepatan",
    name: "Kalkulator Kecepatan",
    category: "Matematika",
    description: "Hitung kecepatan rata-rata dari jarak dan waktu.",
    url: "/calculators/kecepatan.html",
    icon: "speed",
    popular: false,
  },
  {
    id: "jarak",
    name: "Kalkulator Jarak",
    category: "Matematika",
    description: "Hitung jarak tempuh dari kecepatan dan waktu.",
    url: "/calculators/jarak.html",
    icon: "social_distance",
    popular: false,
  },
  {
    id: "bep",
    name: "Kalkulator BEP",
    category: "UMKM",
    description: "Hitung titik impas usaha (Break Even Point).",
    url: "/calculators/bep.html",
    icon: "target",
    popular: true,
  },
  {
    id: "roi",
    name: "Kalkulator ROI",
    category: "UMKM",
    description: "Hitung Return on Investment usahamu.",
    url: "/calculators/roi.html",
    icon: "trending_up",
    popular: false,
  },
  {
    id: "roas",
    name: "Kalkulator ROAS",
    category: "UMKM",
    description: "Hitung efektivitas biaya iklan (Return on Ad Spend).",
    url: "/calculators/roas.html",
    icon: "ads_click",
    popular: false,
  },
  {
    id: "profit",
    name: "Kalkulator Profit",
    category: "UMKM",
    description: "Hitung profit dan margin keuntungan usaha.",
    url: "/calculators/profit.html",
    icon: "payments",
    popular: true,
  },
  {
    id: "hpp",
    name: "Kalkulator HPP",
    category: "UMKM",
    description: "Hitung Harga Pokok Produksi per unit.",
    url: "/calculators/hpp.html",
    icon: "inventory_2",
    popular: false,
  },
];

/* Analytics placeholder — tidak mengirim data pribadi apa pun */
function trackToolUsage(toolId) {
  // Nantinya dihubungkan ke Google Analytics / Vercel Analytics
  if (window.gtag) {
    window.gtag("event", "use_tool", { tool_id: toolId });
  }
}

/* Toast notification sederhana */
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const bg = type === "success" ? "bg-inverse-surface" : "bg-error";
  toast.className = `${bg} text-on-primary text-sm font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-toast-in`;
  toast.innerHTML = `<span>${type === "success" ? "✓" : "!"}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    toast.style.transition = "all .25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 2200);
}

/* Copy text ke clipboard */
async function copyToClipboard(text, successMessage = "Hasil berhasil disalin") {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage, "success");
    return true;
  } catch (err) {
    showToast("Gagal menyalin, coba salin manual", "error");
    return false;
  }
}

/* Share hasil, fallback ke copy jika Web Share API tidak tersedia */
async function shareResult(title, text, url = window.location.href) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch (err) {
      /* user cancel share, diamkan saja */
    }
  } else {
    await copyToClipboard(`${text}\n${url}`, "Link hasil disalin, siap dibagikan");
  }
}

/* Mobile menu toggle, dipanggil dari header tiap halaman */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
}

/* Real-time search sederhana, dipakai di kotak pencarian */
function searchTools(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return TOOLS_DATA.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
  );
}

function initSearchBox() {
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  if (!input || !results) return;

  input.addEventListener("input", () => {
    const query = input.value;
    if (!query.trim()) {
      results.classList.add("hidden");
      results.innerHTML = "";
      return;
    }
    const found = searchTools(query);
    results.classList.remove("hidden");
    if (found.length === 0) {
      results.innerHTML = `
        <div class="p-4 text-body-sm text-on-surface-variant">
          <p class="font-medium text-on-surface">Tool yang kamu cari belum tersedia.</p>
          <p class="mt-1">Coba cari: gaji, BBM, diskon, IPK, KPR</p>
        </div>`;
      return;
    }
    results.innerHTML = found
      .map(
        (t) => `
        <a href="${t.url}" class="flex items-center gap-3 p-3 hover:bg-surface-container-low rounded-xl transition-colors">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary">
            <span class="material-symbols-outlined text-[18px]">${t.icon}</span>
          </span>
          <span>
            <span class="block text-body-md font-medium text-on-surface">${t.name}</span>
            <span class="block text-body-sm text-on-surface-variant">${t.category}</span>
          </span>
        </a>`
      )
      .join("");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSearchBox();
});
