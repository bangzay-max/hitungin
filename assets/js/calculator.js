/**
 * calculator.js
 * Kumpulan fungsi kalkulasi murni (pure function).
 * Tidak menyentuh DOM. Mudah diuji terpisah dari UI.
 */

const CalcUtils = {
  rupiah(value) {
    if (!isFinite(value)) return "Rp0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  },
  number(value, decimals = 2) {
    if (!isFinite(value)) return "0";
    return new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: decimals,
    }).format(value);
  },
  isValidNumber(value) {
    return typeof value === "number" && isFinite(value) && !isNaN(value);
  },
  toNumber(raw) {
    if (typeof raw === "number") return raw;
    if (!raw) return NaN;
    const cleaned = String(raw).replace(/[^0-9,-]/g, "").replace(",", ".");
    return parseFloat(cleaned);
  },
};

/* 1. KALKULATOR PERSENTASE */
function calculatePercentage(amount, percent) {
  if (!CalcUtils.isValidNumber(amount) || !CalcUtils.isValidNumber(percent)) {
    throw new Error("Angka dan persentase harus diisi dengan benar.");
  }
  const result = (amount * percent) / 100;
  return {
    result,
    formula: `${CalcUtils.number(percent)}% × ${CalcUtils.number(amount)} = ${CalcUtils.number(result)}`,
  };
}

/* 2. KALKULATOR DISKON */
function calculateDiscount(price, discountPercent) {
  if (!CalcUtils.isValidNumber(price) || price < 0) {
    throw new Error("Harga awal harus angka positif.");
  }
  if (!CalcUtils.isValidNumber(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    throw new Error("Diskon harus antara 0-100%.");
  }
  const discountAmount = (price * discountPercent) / 100;
  const finalPrice = price - discountAmount;
  return { discountAmount, finalPrice };
}

/* 3. KALKULATOR CICILAN (flat rate sederhana, umum dipakai leasing di Indonesia) */
function calculateInstallment(price, dp, tenorBulan, bungaPersenTahun) {
  if (!CalcUtils.isValidNumber(price) || price <= 0) {
    throw new Error("Harga barang harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(dp) || dp < 0) {
    throw new Error("DP tidak boleh negatif.");
  }
  if (dp >= price) {
    throw new Error("DP tidak boleh lebih besar atau sama dengan harga barang.");
  }
  if (!CalcUtils.isValidNumber(tenorBulan) || tenorBulan <= 0) {
    throw new Error("Tenor harus lebih dari 0 bulan.");
  }
  if (!CalcUtils.isValidNumber(bungaPersenTahun) || bungaPersenTahun < 0) {
    throw new Error("Bunga tidak boleh negatif.");
  }

  const pokokPinjaman = price - dp;
  const bungaTotal = pokokPinjaman * (bungaPersenTahun / 100) * (tenorBulan / 12);
  const totalPembayaran = pokokPinjaman + bungaTotal;
  const cicilanPerBulan = totalPembayaran / tenorBulan;

  return {
    pokokPinjaman,
    bungaTotal,
    totalPembayaran,
    cicilanPerBulan,
  };
}

/* 4. KALKULATOR BBM */
function calculateFuel(jarakKm, konsumsiKmPerLiter, hargaPerLiter, pulangPergi = false) {
  if (!CalcUtils.isValidNumber(jarakKm) || jarakKm <= 0) {
    throw new Error("Jarak perjalanan harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(konsumsiKmPerLiter) || konsumsiKmPerLiter <= 0) {
    throw new Error("Konsumsi BBM harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(hargaPerLiter) || hargaPerLiter <= 0) {
    throw new Error("Harga BBM harus lebih dari 0.");
  }

  const totalJarak = pulangPergi ? jarakKm * 2 : jarakKm;
  const literDibutuhkan = totalJarak / konsumsiKmPerLiter;
  const totalBiaya = literDibutuhkan * hargaPerLiter;
  const biayaPerKm = totalBiaya / totalJarak;

  return { totalJarak, literDibutuhkan, totalBiaya, biayaPerKm };
}

/* 5. KALKULATOR GAJI BERSIH */
function calculateNetSalary(gajiPokok, tunjangan, bonus, potongan, pajakPersen) {
  if (!CalcUtils.isValidNumber(gajiPokok) || gajiPokok < 0) {
    throw new Error("Gaji pokok harus diisi dengan angka valid.");
  }
  tunjangan = CalcUtils.isValidNumber(tunjangan) ? tunjangan : 0;
  bonus = CalcUtils.isValidNumber(bonus) ? bonus : 0;
  potongan = CalcUtils.isValidNumber(potongan) ? potongan : 0;
  pajakPersen = CalcUtils.isValidNumber(pajakPersen) ? pajakPersen : 0;

  if (pajakPersen < 0 || pajakPersen > 100) {
    throw new Error("Persentase pajak harus antara 0-100%.");
  }

  const totalPendapatan = gajiPokok + tunjangan + bonus;
  const pajak = (totalPendapatan * pajakPersen) / 100;
  const totalPotongan = potongan + pajak;
  const gajiBersih = totalPendapatan - totalPotongan;

  return { totalPendapatan, pajak, totalPotongan, gajiBersih };
}

/* 6. KALKULATOR THR (estimasi berdasar aturan umum: 1 tahun kerja = 1x gaji, proporsional jika < 1 tahun) */
function calculateTHR(gajiBulanan, masaKerjaBulan) {
  if (!CalcUtils.isValidNumber(gajiBulanan) || gajiBulanan <= 0) {
    throw new Error("Gaji bulanan harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(masaKerjaBulan) || masaKerjaBulan <= 0) {
    throw new Error("Masa kerja harus lebih dari 0 bulan.");
  }

  const masaKerjaDihitung = Math.min(masaKerjaBulan, 12);
  const estimasiTHR = (masaKerjaDihitung / 12) * gajiBulanan;

  return {
    estimasiTHR,
    proporsional: masaKerjaBulan < 12,
  };
}

/* 7. KALKULATOR IPK */
function calculateGPA(mataKuliahList) {
  if (!Array.isArray(mataKuliahList) || mataKuliahList.length === 0) {
    throw new Error("Tambahkan minimal 1 mata kuliah.");
  }

  let totalSKS = 0;
  let totalMutu = 0;

  const bobotNilai = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    D: 1.0,
    E: 0.0,
  };

  mataKuliahList.forEach((mk, idx) => {
    const sks = CalcUtils.toNumber(mk.sks);
    const bobot = bobotNilai[mk.nilai];
    if (!CalcUtils.isValidNumber(sks) || sks <= 0) {
      throw new Error(`SKS mata kuliah ke-${idx + 1} tidak valid.`);
    }
    if (bobot === undefined) {
      throw new Error(`Nilai mata kuliah ke-${idx + 1} tidak valid.`);
    }
    totalSKS += sks;
    totalMutu += sks * bobot;
  });

  const ipk = totalMutu / totalSKS;

  return { totalSKS, totalMutu, ipk };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CalcUtils,
    calculatePercentage,
    calculateDiscount,
    calculateInstallment,
    calculateFuel,
    calculateNetSalary,
    calculateTHR,
    calculateGPA,
  };
}
