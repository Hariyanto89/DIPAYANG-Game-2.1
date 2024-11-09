// Gambar aset untuk slot
const assets = [
    { name: "Tanah", img: "https://via.placeholder.com/100?text=Tanah", value: 100 },
    { name: "Peralatan dan Mesin", img: "https://via.placeholder.com/100?text=Mesin", value: 200 },
    { name: "Gedung dan Bangunan", img: "https://via.placeholder.com/100?text=Gedung", value: 300 },
    { name: "Jalan Jaringan", img: "https://via.placeholder.com/100?text=Jalan", value: 400 },
    { name: "Aset Tetap Lainnya", img: "https://via.placeholder.com/100?text=Lainnya", value: 500 },
    { name: "Konstruksi Dalam Pengerjaan", img: "https://via.placeholder.com/100?text=Konstruksi", value: 600 },
    { name: "Aset Tak Berwujud", img: "https://via.placeholder.com/100?text=Tak+Berwujud", value: 700 },
    { name: "Aset Lain Lain", img: "https://via.placeholder.com/100?text=Lain", value: 800 },
    { name: "Properti Investasi", img: "https://via.placeholder.com/100?text=Properti", value: 1000 }
];

// Variabel untuk saldo dan perolehan
let saldo = 10000;
let perolehan = 0;
const costPerSpin = 500; // Biaya per spin

// Update saldo dan perolehan di HTML
function updateStatus() {
    document.getElementById("saldo").innerText = saldo;
    document.getElementById("perolehan").innerText = perolehan;
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

// Fungsi utama untuk Spin
function spin() {
    if (saldo < costPerSpin) {
        alert("Saldo tidak cukup untuk spin!");
        return;
    }

    saldo -= costPerSpin; // Kurangi saldo setiap spin
    perolehan = 0; // Reset perolehan setiap spin baru

    const slots = Array.from(document.querySelectorAll(".slot"));
    animateSpin(slots);

    setTimeout(() => {
        slots.forEach((slot, index) => {
            const asset = getRandomAsset();
            slot.style.backgroundImage = `url(${asset.img})`;
            perolehan += asset.value; // Tambahkan nilai perolehan berdasarkan nilai aset
        });

        if (isWinningCombination()) {
            saldo += perolehan; // Tambahkan perolehan ke saldo jika menang
            alert("Selamat! Anda Menang!");
        } else {
            alert("Tidak berhasil. Coba lagi!");
        }

        stopAnimation(slots);
        updateStatus(); // Update tampilan saldo dan perolehan
    }, 2000); // Durasi animasi spin
}

// Fungsi untuk Max Bet
function maxBet() {
    if (saldo < costPerSpin * 2) {
        alert("Saldo tidak cukup untuk max bet!");
        return;
    }

    saldo -= costPerSpin * 2; // Biaya max bet
    spin();
}

// Fungsi untuk cek kombinasi menang (contoh sederhana: semua slot sama)
function isWinningCombination() {
    const slotValues = Array.from(document.querySelectorAll(".slot")).map(slot => slot.style.backgroundImage);
    return new Set(slotValues).size === 1; // Menang jika semua gambar di slot sama
}

// Update status pertama kali
updateStatus();
