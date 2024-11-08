const assets = ["Aset Tetap", "Saham", "Obligasi", "Properti", "Kendaraan"];

function getRandomAsset() {
    return assets[Math.floor(Math.random() * assets.length)];
}

function spin() {
    document.getElementById("slot1").innerText = getRandomAsset();
    document.getElementById("slot2").innerText = getRandomAsset();
    document.getElementById("slot3").innerText = getRandomAsset();

    if (document.getElementById("slot1").innerText === document.getElementById("slot2").innerText &&
        document.getElementById("slot2").innerText === document.getElementById("slot3").innerText) {
        alert("Selamat! Anda Menang!");
    }
}
