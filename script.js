// Gambar aset untuk slot
const assets = [
    { name: "Tanah", img: "https://via.placeholder.com/100?text=Tanah", value: 100.50 },
    { name: "Peralatan dan Mesin", img: "https://via.placeholder.com/100?text=Mesin", value: 200.75 },
    { name: "Gedung dan Bangunan", img: "https://via.placeholder.com/100?text=Gedung", value: 300.30 },
    { name: "Jalan Jaringan", img: "https://via.placeholder.com/100?text=Jalan", value: 400.10 },
    { name: "Aset Tetap Lainnya", img: "https://via.placeholder.com/100?text=Lainnya", value: 500.60 },
    { name: "Konstruksi Dalam Pengerjaan", img: "https://via.placeholder.com/100?text=Konstruksi", value: 600.90 },
    { name: "Aset Tak Berwujud", img: "https://via.placeholder.com/100?text=Tak+Berwujud", value: 700.25 },
    { name: "Aset Lain Lain", img: "https://via.placeholder.com/100?text=Lain", value: 800.45 },
    { name: "Properti Investasi", img: "https://via.placeholder.com/100?text=Properti", value: 1000.99 }
];

// Variabel untuk saldo dan perolehan
let saldo = 10000.00;
let perolehan = 0.00;
const costPerSpin = 500; // Biaya per spin dasar

// Update saldo dan perolehan di HTML
function updateStatus() {
    document.getElementById("saldo").innerText = saldo.toFixed(2);
    document.getElementById("perolehan").innerText = perolehan.toFixed(2);
}

// Fungsi untuk mendapatkan aset acak
function getRandomAsset() {
    return assets[Math.floor(Math.random() * assets.length)];
}

// Fungsi animasi spin dengan kecepatan berbeda untuk setiap slot
function startSpinAnimation(slots) {
    slots[0].classList.add("spin1");
    slots[1].classList.add("spin2");
    slots[2].classList.add("spin3");
    slots[3].classList.add("spin4");
    slots[4].classList.add("spin5");
}

// Hentikan animasi
function stopSpinAnimation(slots) {
    slots.forEach(slot => {
        slot.classList.remove("spin1", "spin2", "spin3", "spin4", "spin5");
    });
}

// Fungsi untuk Spin dengan jumlah putaran
function spin(times) {
    const totalCost = costPerSpin * times;
    if (saldo < totalCost) {
        alert("Saldo tidak cukup untuk spin ini!");
        return;
    }

    saldo -= totalCost; // Kurangi saldo setiap spin
    perolehan = 0; // Reset perolehan setiap spin baru

    const slots = Array.from(document.querySelectorAll(".slot"));
    startSpinAnimation(slots);

    for (let i = 0; i < times; i++) {
        setTimeout(() => {
            slots.forEach((slot, index) => {
                const asset = getRandomAsset();
                slot.style.backgroundImage = `url(${asset.img})`;
                perolehan += asset.value; // Tambahkan nilai perolehan berdasarkan nilai aset
            });

            if (isWinningCombination()) {
                saldo += perolehan; // Tambahkan perolehan ke saldo jika menang
                alert("Selamat! Anda Menang!");
            } else if (i === times - 1) {
                alert("Tidak berhasil. Coba lagi!");
            }

            if (i === times - 1) {
                stopSpinAnimation(slots);
                updateStatus(); // Update tampilan saldo dan perolehan setelah spin selesai
            }
        }, i * 1000); // Jeda antar spin untuk efek animasi
    }
}

// Fungsi untuk Max Bet
function maxBet() {
    const maxBetCost = costPerSpin * 10; // Biaya max bet
    if (saldo < maxBetCost) {
        alert("Saldo tidak cukup untuk max bet!");
        return;
    }

    saldo -= maxBetCost;
    perolehan = 0;
    spin(10);
}

// Fungsi untuk cek kombinasi menang (contoh sederhana: semua slot sama)
function isWinningCombination() {
    const slotValues = Array.from(document.querySelectorAll(".slot")).map(slot => slot.style.backgroundImage);
    return new Set(slotValues).size === 1; // Menang jika semua gambar di slot sama
}

// Fungsi untuk menambah saldo
function topUpSaldo() {
    const topUpAmount = parseFloat(prompt("Masukkan jumlah saldo tambahan:", "5000"));
    if (!isNaN(topUpAmount) && topUpAmount > 0) {
        saldo += topUpAmount;
        updateStatus();
    } else {
        alert("Jumlah tidak valid!");
    }
}

// Update status pertama kali
updateStatus();
