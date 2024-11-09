const assets = [
    "Tanah",
    "Peralatan dan Mesin",
    "Gedung dan Bangunan",
    "Jalan Jaringan dan Irigasi",
    "Aset Tetap Lainnya",
    "Konstruksi Dalam Pengerjaan",
    "Aset Tak Berwujud",
    "Aset Lain Lain",
    "Properti Investasi"
];

function getRandomAsset() {
    return assets[Math.floor(Math.random() * assets.length)];
}

function spin() {
    document.getElementById("slot1").innerText = getRandomAsset();
    document.getElementById("slot2").innerText = getRandomAsset();
    document.getElementById("slot3").innerText = getRandomAsset();

    // Cek jika semua slot menampilkan aset yang sama untuk menang
    if (
        document.getElementById("slot1").innerText === document.getElementById("slot2").innerText &&
        document.getElementById("slot2").innerText === document.getElementById("slot3").innerText
    ) {
        alert("Selamat! Anda Menang!");
    }
}

function maxBet() {
    alert("Max Bet Dipasang!");
    spin(); // Fungsi tambahan untuk Max Bet
}
