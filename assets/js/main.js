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
