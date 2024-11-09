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

// Fungsi animasi spin
function animateSpin(slots) {
    slots.forEach(slot => {
        slot.style.animation = "spin 0.5s ease-in-out infinite";
    });
}

// Fungsi untuk menghentikan animasi
function stopAnimation(slots) {
    slots.forEach(slot => {
        slot.style.animation = "";
    });
}

// Fungsi utama untuk Spin dengan jumlah putaran
function spin(times) {
    const totalCost = costPerSpin * times;
    if (saldo < totalCost) {
        alert("Saldo tidak cukup untuk spin ini!");
        return;
    }

    saldo -= totalCost; // Kurangi saldo setiap spin
    perolehan = 0; // Reset perolehan setiap spin baru

    const slots = Array.from(document.querySelectorAll(".slot"));
    animateSpin(slots);

    // Lakukan beberapa kali spin sesuai jumlah yang diminta
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
                stopAnimation(slots);
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

// Update status pertama kali
updateStatus();
