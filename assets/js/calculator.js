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

/* 8. KALKULATOR LUAS TANAH */
function calculateLandArea(panjang, lebar, hargaPerM2) {
  if (!CalcUtils.isValidNumber(panjang) || panjang <= 0) {
    throw new Error("Panjang tanah harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(lebar) || lebar <= 0) {
    throw new Error("Lebar tanah harus lebih dari 0.");
  }
  const luas = panjang * lebar;
  let estimasiNilai = null;
  if (hargaPerM2 !== null && hargaPerM2 !== undefined && hargaPerM2 !== "") {
    if (!CalcUtils.isValidNumber(hargaPerM2) || hargaPerM2 < 0) {
      throw new Error("Harga per meter persegi tidak valid.");
    }
    estimasiNilai = luas * hargaPerM2;
  }
  return { luas, estimasiNilai };
}

/* 9. KALKULATOR KEBUTUHAN CAT */
function calculatePaint(panjangRuangan, lebarRuangan, tinggiDinding, luasBukaan, jumlahLapisan, dayaSebarPerLiter) {
  if (!CalcUtils.isValidNumber(panjangRuangan) || panjangRuangan <= 0) {
    throw new Error("Panjang ruangan harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(lebarRuangan) || lebarRuangan <= 0) {
    throw new Error("Lebar ruangan harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(tinggiDinding) || tinggiDinding <= 0) {
    throw new Error("Tinggi dinding harus lebih dari 0.");
  }
  luasBukaan = CalcUtils.isValidNumber(luasBukaan) ? luasBukaan : 0;
  if (luasBukaan < 0) {
    throw new Error("Luas pintu/jendela tidak boleh negatif.");
  }
  if (!CalcUtils.isValidNumber(jumlahLapisan) || jumlahLapisan <= 0) {
    throw new Error("Jumlah lapisan cat minimal 1.");
  }
  if (!CalcUtils.isValidNumber(dayaSebarPerLiter) || dayaSebarPerLiter <= 0) {
    throw new Error("Daya sebar cat per liter harus lebih dari 0.");
  }

  const kelilingRuangan = 2 * (panjangRuangan + lebarRuangan);
  const luasDindingKotor = kelilingRuangan * tinggiDinding;
  const luasDindingBersih = Math.max(luasDindingKotor - luasBukaan, 0);
  if (luasDindingBersih === 0) {
    throw new Error("Luas dinding setelah dikurangi bukaan menjadi 0. Periksa kembali data yang dimasukkan.");
  }
  const totalLuasDicat = luasDindingBersih * jumlahLapisan;
  const literDibutuhkan = totalLuasDicat / dayaSebarPerLiter;

  return { luasDindingBersih, totalLuasDicat, literDibutuhkan };
}

/* 10. KALKULATOR KEBUTUHAN KERAMIK */
function calculateTile(panjangRuangan, lebarRuangan, ukuranKeramikCm, wastePercent) {
  if (!CalcUtils.isValidNumber(panjangRuangan) || panjangRuangan <= 0) {
    throw new Error("Panjang ruangan harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(lebarRuangan) || lebarRuangan <= 0) {
    throw new Error("Lebar ruangan harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(ukuranKeramikCm) || ukuranKeramikCm <= 0) {
    throw new Error("Ukuran sisi keramik harus lebih dari 0.");
  }
  wastePercent = CalcUtils.isValidNumber(wastePercent) ? wastePercent : 10;
  if (wastePercent < 0) {
    throw new Error("Persentase cadangan tidak boleh negatif.");
  }

  const luasRuangan = panjangRuangan * lebarRuangan;
  const luasPerKeping = (ukuranKeramikCm / 100) * (ukuranKeramikCm / 100);
  const kepingDibutuhkanBersih = luasRuangan / luasPerKeping;
  const kepingDenganCadangan = Math.ceil(kepingDibutuhkanBersih * (1 + wastePercent / 100));

  return { luasRuangan, luasPerKeping, kepingDenganCadangan };
}

/* 11. KALKULATOR KPR (metode anuitas) */
function calculateKPR(hargaRumah, dp, bungaTahunPersen, tenorTahun) {
  if (!CalcUtils.isValidNumber(hargaRumah) || hargaRumah <= 0) {
    throw new Error("Harga rumah harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(dp) || dp < 0) {
    throw new Error("DP tidak boleh negatif.");
  }
  if (dp >= hargaRumah) {
    throw new Error("DP tidak boleh lebih besar atau sama dengan harga rumah.");
  }
  if (!CalcUtils.isValidNumber(bungaTahunPersen) || bungaTahunPersen < 0) {
    throw new Error("Bunga tidak boleh negatif.");
  }
  if (!CalcUtils.isValidNumber(tenorTahun) || tenorTahun <= 0) {
    throw new Error("Tenor harus lebih dari 0 tahun.");
  }

  const pokokPinjaman = hargaRumah - dp;
  const tenorBulan = tenorTahun * 12;
  const rateBulanan = bungaTahunPersen / 100 / 12;

  let cicilanPerBulan;
  if (rateBulanan === 0) {
    cicilanPerBulan = pokokPinjaman / tenorBulan;
  } else {
    const factor = Math.pow(1 + rateBulanan, tenorBulan);
    cicilanPerBulan = (pokokPinjaman * rateBulanan * factor) / (factor - 1);
  }
  const totalPembayaran = cicilanPerBulan * tenorBulan;
  const totalBunga = totalPembayaran - pokokPinjaman;

  return { pokokPinjaman, tenorBulan, cicilanPerBulan, totalBunga, totalPembayaran };
}

/* 12. KALKULATOR BMI */
function calculateBMI(beratKg, tinggiCm) {
  if (!CalcUtils.isValidNumber(beratKg) || beratKg <= 0) {
    throw new Error("Berat badan harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(tinggiCm) || tinggiCm <= 0) {
    throw new Error("Tinggi badan harus lebih dari 0.");
  }
  const tinggiM = tinggiCm / 100;
  const bmi = beratKg / (tinggiM * tinggiM);
  let kategori;
  if (bmi < 18.5) kategori = "Berat badan kurang";
  else if (bmi < 25) kategori = "Berat badan normal";
  else if (bmi < 30) kategori = "Kelebihan berat badan";
  else kategori = "Obesitas";
  return { bmi, kategori };
}

/* 13. KALKULATOR BMR (Mifflin-St Jeor) */
function calculateBMR(beratKg, tinggiCm, umur, gender) {
  if (!CalcUtils.isValidNumber(beratKg) || beratKg <= 0) {
    throw new Error("Berat badan harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(tinggiCm) || tinggiCm <= 0) {
    throw new Error("Tinggi badan harus lebih dari 0.");
  }
  if (!CalcUtils.isValidNumber(umur) || umur <= 0) {
    throw new Error("Umur harus lebih dari 0.");
  }
  if (gender !== "pria" && gender !== "wanita") {
    throw new Error("Pilih jenis kelamin.");
  }
  const base = 10 * beratKg + 6.25 * tinggiCm - 5 * umur;
  const bmr = gender === "pria" ? base + 5 : base - 161;
  return { bmr };
}

const ACTIVITY_FACTORS = {
  sedentary: 1.2,
  ringan: 1.375,
  sedang: 1.55,
  aktif: 1.725,
  "sangat-aktif": 1.9,
};

/* 14. KALKULATOR TDEE */
function calculateTDEE(bmr, activityKey) {
  if (!CalcUtils.isValidNumber(bmr) || bmr <= 0) {
    throw new Error("BMR tidak valid.");
  }
  const factor = ACTIVITY_FACTORS[activityKey];
  if (!factor) {
    throw new Error("Pilih tingkat aktivitas.");
  }
  return { tdee: bmr * factor, factor };
}

/* 15. KALKULATOR KALORI (kebutuhan kalori harian sesuai target) */
function calculateCalorieTarget(beratKg, tinggiCm, umur, gender, activityKey, goal) {
  const { bmr } = calculateBMR(beratKg, tinggiCm, umur, gender);
  const { tdee } = calculateTDEE(bmr, activityKey);

  let target = tdee;
  if (goal === "turun") target = tdee - 500;
  else if (goal === "naik") target = tdee + 500;

  const minimumAman = gender === "pria" ? 1500 : 1200;
  const dibawahMinimum = target < minimumAman;
  if (dibawahMinimum) target = minimumAman;

  return { bmr, tdee, target, dibawahMinimum, minimumAman };
}

/* 16. KALKULATOR RATA-RATA */
function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Masukkan minimal 1 angka.");
  }
  const parsed = numbers.map((n) => CalcUtils.toNumber(n));
  if (parsed.some((n) => !CalcUtils.isValidNumber(n))) {
    throw new Error("Semua angka harus diisi dengan benar.");
  }
  const jumlah = parsed.reduce((a, b) => a + b, 0);
  const rataRata = jumlah / parsed.length;
  return { rataRata, jumlah, banyakData: parsed.length };
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

/* 17. KALKULATOR PECAHAN */
function calculateFraction(a, b, c, d, operator) {
  [a, b, c, d].forEach((v, i) => {
    if (!CalcUtils.isValidNumber(v)) throw new Error("Semua angka pecahan harus diisi dengan benar.");
  });
  if (b === 0 || d === 0) throw new Error("Penyebut pecahan tidak boleh 0.");

  let num, den;
  if (operator === "+") { num = a * d + c * b; den = b * d; }
  else if (operator === "-") { num = a * d - c * b; den = b * d; }
  else if (operator === "×") { num = a * c; den = b * d; }
  else if (operator === "÷") {
    if (c === 0) throw new Error("Tidak bisa membagi dengan pecahan bernilai 0.");
    num = a * d; den = b * c;
  } else {
    throw new Error("Operator tidak dikenali.");
  }

  if (den < 0) { den = -den; num = -num; }
  const divisor = gcd(num, den);
  const simplifiedNum = num / divisor;
  const simplifiedDen = den / divisor;
  const decimal = num / den;

  return { simplifiedNum, simplifiedDen, decimal };
}

/* 18. KALKULATOR PANGKAT */
function calculatePower(base, exponent) {
  if (!CalcUtils.isValidNumber(base)) throw new Error("Bilangan pokok harus diisi dengan benar.");
  if (!CalcUtils.isValidNumber(exponent)) throw new Error("Pangkat harus diisi dengan benar.");
  const result = Math.pow(base, exponent);
  if (!isFinite(result)) throw new Error("Hasil terlalu besar untuk dihitung.");
  return { result };
}

/* 19. KALKULATOR AKAR */
function calculateRoot(number, degree) {
  if (!CalcUtils.isValidNumber(number)) throw new Error("Angka harus diisi dengan benar.");
  if (!CalcUtils.isValidNumber(degree) || degree === 0) throw new Error("Derajat akar harus diisi dan tidak boleh 0.");
  if (number < 0 && degree % 2 === 0) {
    throw new Error("Akar genap dari bilangan negatif tidak menghasilkan bilangan real.");
  }
  const sign = number < 0 ? -1 : 1;
  const result = sign * Math.pow(Math.abs(number), 1 / degree);
  return { result };
}

/* 20. KALKULATOR RASIO */
function calculateRatioSimplify(a, b) {
  if (!CalcUtils.isValidNumber(a) || a <= 0) throw new Error("Nilai pertama harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(b) || b <= 0) throw new Error("Nilai kedua harus lebih dari 0.");
  const divisor = gcd(a, b);
  return { simplifiedA: a / divisor, simplifiedB: b / divisor };
}

/* 21. KALKULATOR PERBANDINGAN (proporsi senilai a:b = c:d, cari d) */
function calculateProportion(a, b, c) {
  if (!CalcUtils.isValidNumber(a) || a === 0) throw new Error("Nilai A harus diisi dan tidak boleh 0.");
  if (!CalcUtils.isValidNumber(b)) throw new Error("Nilai B harus diisi dengan benar.");
  if (!CalcUtils.isValidNumber(c)) throw new Error("Nilai C harus diisi dengan benar.");
  const d = (b * c) / a;
  return { d };
}

/* 22. KALKULATOR LUAS LINGKARAN */
function calculateCircle(jariJari) {
  if (!CalcUtils.isValidNumber(jariJari) || jariJari <= 0) throw new Error("Jari-jari harus lebih dari 0.");
  const luas = Math.PI * jariJari * jariJari;
  const keliling = 2 * Math.PI * jariJari;
  return { luas, keliling };
}

/* 23. KALKULATOR SEGITIGA */
function calculateTriangleArea(alas, tinggi) {
  if (!CalcUtils.isValidNumber(alas) || alas <= 0) throw new Error("Alas harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(tinggi) || tinggi <= 0) throw new Error("Tinggi harus lebih dari 0.");
  const luas = 0.5 * alas * tinggi;
  return { luas };
}

/* 24. KALKULATOR PERSEGI */
function calculateSquare(sisi) {
  if (!CalcUtils.isValidNumber(sisi) || sisi <= 0) throw new Error("Panjang sisi harus lebih dari 0.");
  return { luas: sisi * sisi, keliling: 4 * sisi };
}

/* 25. KALKULATOR PERSEGI PANJANG */
function calculateRectangle(panjang, lebar) {
  if (!CalcUtils.isValidNumber(panjang) || panjang <= 0) throw new Error("Panjang harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(lebar) || lebar <= 0) throw new Error("Lebar harus lebih dari 0.");
  return { luas: panjang * lebar, keliling: 2 * (panjang + lebar) };
}

/* 26. KALKULATOR VOLUME KUBUS */
function calculateCubeVolume(sisi) {
  if (!CalcUtils.isValidNumber(sisi) || sisi <= 0) throw new Error("Panjang sisi harus lebih dari 0.");
  return { volume: Math.pow(sisi, 3), luasPermukaan: 6 * sisi * sisi };
}

/* 27. KALKULATOR VOLUME BALOK */
function calculateBeamVolume(panjang, lebar, tinggi) {
  if (!CalcUtils.isValidNumber(panjang) || panjang <= 0) throw new Error("Panjang harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(lebar) || lebar <= 0) throw new Error("Lebar harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(tinggi) || tinggi <= 0) throw new Error("Tinggi harus lebih dari 0.");
  return { volume: panjang * lebar * tinggi };
}

/* 28. KALKULATOR VOLUME TABUNG */
function calculateCylinderVolume(jariJari, tinggi) {
  if (!CalcUtils.isValidNumber(jariJari) || jariJari <= 0) throw new Error("Jari-jari harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(tinggi) || tinggi <= 0) throw new Error("Tinggi harus lebih dari 0.");
  const volume = Math.PI * jariJari * jariJari * tinggi;
  return { volume };
}

/* 29. KALKULATOR KECEPATAN */
function calculateSpeed(jarak, waktu) {
  if (!CalcUtils.isValidNumber(jarak) || jarak <= 0) throw new Error("Jarak harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(waktu) || waktu <= 0) throw new Error("Waktu harus lebih dari 0.");
  return { kecepatan: jarak / waktu };
}

/* 30. KALKULATOR JARAK */
function calculateDistance(kecepatan, waktu) {
  if (!CalcUtils.isValidNumber(kecepatan) || kecepatan <= 0) throw new Error("Kecepatan harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(waktu) || waktu <= 0) throw new Error("Waktu harus lebih dari 0.");
  return { jarak: kecepatan * waktu };
}

/* 31. KALKULATOR BEP (Break Even Point) */
function calculateBEP(biayaTetap, hargaJualPerUnit, biayaVariabelPerUnit) {
  if (!CalcUtils.isValidNumber(biayaTetap) || biayaTetap <= 0) throw new Error("Biaya tetap harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(hargaJualPerUnit) || hargaJualPerUnit <= 0) throw new Error("Harga jual per unit harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(biayaVariabelPerUnit) || biayaVariabelPerUnit < 0) throw new Error("Biaya variabel per unit tidak boleh negatif.");
  if (biayaVariabelPerUnit >= hargaJualPerUnit) {
    throw new Error("Biaya variabel per unit harus lebih kecil dari harga jual per unit.");
  }
  const marginKontribusi = hargaJualPerUnit - biayaVariabelPerUnit;
  const bepUnit = biayaTetap / marginKontribusi;
  const bepRupiah = bepUnit * hargaJualPerUnit;
  return { bepUnit, bepRupiah, marginKontribusi };
}

/* 32. KALKULATOR ROI */
function calculateROI(labaBersih, modal) {
  if (!CalcUtils.isValidNumber(labaBersih)) throw new Error("Laba bersih harus diisi dengan benar.");
  if (!CalcUtils.isValidNumber(modal) || modal <= 0) throw new Error("Modal harus lebih dari 0.");
  const roiPercent = (labaBersih / modal) * 100;
  return { roiPercent };
}

/* 33. KALKULATOR ROAS */
function calculateROAS(pendapatanIklan, biayaIklan) {
  if (!CalcUtils.isValidNumber(pendapatanIklan) || pendapatanIklan < 0) throw new Error("Pendapatan dari iklan tidak boleh negatif.");
  if (!CalcUtils.isValidNumber(biayaIklan) || biayaIklan <= 0) throw new Error("Biaya iklan harus lebih dari 0.");
  const roas = pendapatanIklan / biayaIklan;
  return { roas, roasPercent: roas * 100 };
}

/* 34. KALKULATOR PROFIT */
function calculateProfit(pendapatan, biaya) {
  if (!CalcUtils.isValidNumber(pendapatan) || pendapatan < 0) throw new Error("Pendapatan tidak boleh negatif.");
  if (!CalcUtils.isValidNumber(biaya) || biaya < 0) throw new Error("Biaya tidak boleh negatif.");
  const profit = pendapatan - biaya;
  const marginPercent = pendapatan === 0 ? 0 : (profit / pendapatan) * 100;
  return { profit, marginPercent };
}

/* 35. KALKULATOR HPP */
function calculateHPP(totalBiayaProduksi, jumlahUnit) {
  if (!CalcUtils.isValidNumber(totalBiayaProduksi) || totalBiayaProduksi <= 0) throw new Error("Total biaya produksi harus lebih dari 0.");
  if (!CalcUtils.isValidNumber(jumlahUnit) || jumlahUnit <= 0) throw new Error("Jumlah unit harus lebih dari 0.");
  return { hppPerUnit: totalBiayaProduksi / jumlahUnit };
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
    calculateLandArea,
    calculatePaint,
    calculateTile,
    calculateKPR,
    calculateBMI,
    calculateBMR,
    calculateTDEE,
    calculateCalorieTarget,
    calculateAverage,
    calculateFraction,
    calculatePower,
    calculateRoot,
    calculateRatioSimplify,
    calculateProportion,
    calculateCircle,
    calculateTriangleArea,
    calculateSquare,
    calculateRectangle,
    calculateCubeVolume,
    calculateBeamVolume,
    calculateCylinderVolume,
    calculateSpeed,
    calculateDistance,
    calculateBEP,
    calculateROI,
    calculateROAS,
    calculateProfit,
    calculateHPP,
  };
}
