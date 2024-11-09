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

    // Check if all three slots are the same to win
    if (
        document.getElementById("slot1").innerText === document.getElementById("slot2").innerText &&
        document.getElementById("slot2").innerText === document.getElementById("slot3").innerText
    ) {
        alert("Selamat! Anda Menang!");
    }
}

function maxBet() {
    alert("Max Bet Dipasang!");
    spin(); // Example: you can add additional functionality for max bet here
}
