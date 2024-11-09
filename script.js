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

// Update saldo dan perolehan di HTML
function updateStatus() {
    document.getElementById("saldo").innerText = saldo;
    document.getElementById("perolehan").innerText = perolehan;
}

// Fungsi untuk mendapatkan aset acak
function getRandomAsset() {
    return assets[Math.floor(Math.random() * assets.length)];
}

// Fungsi untuk Spin
function spin() {
    perolehan = 0; // Reset perolehan setiap spin baru
    for (let i = 1; i <= 5; i++) {
        const asset = getRandomAsset();
        document.getElementById(`slot${i}`).style.backgroundImage = `url(${asset.img})`;
        perolehan += asset.value; // Tambahkan nilai perolehan berdasarkan nilai aset
    }

    saldo += perolehan; // Tambahkan perolehan ke saldo
    updateStatus(); // Update tampilan saldo dan perolehan
}

// Fungsi untuk Max Bet (contohnya akan menggandakan nilai perolehan)
function maxBet() {
    alert("Max Bet Dipasang!");
    spin();
    saldo -= 1000; // Biaya max bet
    perolehan *= 2; // Gandakan nilai perolehan sebagai contoh max bet
    saldo += perolehan;
    updateStatus();
}
