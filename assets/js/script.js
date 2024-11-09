// Daftar aset dengan gambar dari GitHub, nilai, dan warna latar belakang
const assets = [
    { name: "Tanah", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/a.png?raw=true", value: 100.50 },
    { name: "Peralatan dan Mesin", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/b.png?raw=true", value: 200.75 },
    { name: "Gedung dan Bangunan", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/c.png?raw=true", value: 300.30 },
    { name: "Jalan Jaringan dan Irigasi", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/d.png?raw=true", value: 400.10 },
    { name: "Aset Tetap Lainnya", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/e.png?raw=true", value: 500.60 },
    { name: "Konstruksi Dalam Pengerjaan", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/f.png?raw=true", value: 600.90 },
    { name: "Aset Tak Berwujud", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/komputer.png?raw=true", value: 700.25 },
    { name: "Aset Lain Lain", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/rusaknian.png?raw=true", value: 800.45 },
    { name: "Properti Investasi", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/nADFG.png?raw=true", value: 1000.99 }
];

// Variabel untuk saldo dan perolehan
let saldo = 10000.00;
let perolehan = 0.00;
const costPerSpin = 500; // Biaya per spin dasar
let isSpinning = false; // Untuk cek apakah spin sedang berlangsung
let stopSpinRequested = false; // Untuk mengecek jika spin dihentikan oleh tombol stop
let spinIntervals = []; // Array untuk menyimpan interval ID agar dapat dihentikan

// Update saldo dan perolehan di HTML
function updateStatus() {
    document.getElementById("saldo").innerText = saldo.toFixed(2);
    document.getElementById("perolehan").innerText = perolehan.toFixed(2);
}

// Fungsi animasi spin
function startSpinAnimation(slots) {
    slots.forEach(slot => slot.classList.add("shake"));
}

// Hentikan animasi
function stopSpinAnimation(slots) {
    slots.forEach(slot => {
        slot.classList.remove("shake");
    });
}

// Fungsi untuk mendapatkan aset acak
function getRandomAsset() {
    return assets[Math.floor(Math.random() * assets.length)];
}

// Fungsi untuk memperbarui kolom slot saat spin berhenti
function updateSlotAppearance(slot, asset) {
    slot.style.backgroundImage = `url(${asset.img})`; // Menampilkan gambar
    slot.setAttribute("data-asset", asset.name);
    slot.innerText = ""; // Menghapus teks di dalam slot
}

// Fungsi untuk Spin dengan jumlah putaran
function spin(times) {
    if (isSpinning) return;  // Cegah spin ganda
    isSpinning = true;
    stopSpinRequested = false; // Reset status stop
    perolehan = 0;

    const totalCost = costPerSpin * times;
    if (saldo < totalCost) {
        alert("Saldo tidak cukup untuk spin ini!");
        isSpinning = false;
        return;
    }

    saldo -= totalCost; // Mengurangi saldo
    const slots = Array.from(document.querySelectorAll(".slot"));
    
    startSpinAnimation(slots);

    for (let i = 0; i < times; i++) {
        const intervalId = setTimeout(() => {
            // Jika tombol stop ditekan, hentikan spin segera
            if (stopSpinRequested) {
                clearAllSpinIntervals();
                stopSpinAnimation(slots);
                updateStatus();
                alert("Spin dihentikan.");
                isSpinning = false;
                return;
            }

            // Perbarui gambar di setiap slot
            slots.forEach((slot) => {
                const asset = getRandomAsset();
                updateSlotAppearance(slot, asset);
                perolehan += asset.value;
            });

            // Jika ini putaran terakhir atau stop spin diminta, hentikan animasi
            if (i === times - 1 || stopSpinRequested) {
                stopSpinAnimation(slots);
                updateStatus();
                if (!stopSpinRequested && isWinningCombination()) {
                    saldo += perolehan;
                    alert("Selamat! Anda Menang!");
                } else if (!stopSpinRequested) {
                    alert("Tidak berhasil. Coba lagi!");
                }
                isSpinning = false;
            }
        }, i * 1000); // Delay 1 detik per putaran

        // Simpan interval ID agar bisa dihentikan semua jika diperlukan
        spinIntervals.push(intervalId);
    }
}

// Fungsi untuk menghentikan semua interval spin
function clearAllSpinIntervals() {
    spinIntervals.forEach(intervalId => clearTimeout(intervalId));
    spinIntervals = [];
}

// Fungsi untuk memulai kuis pengisian saldo
function startQuiz() {
    if (availableQuestions.length === 0) {
        alert("Tidak ada lagi pertanyaan.");
        return;
    }

    // Ambil pertanyaan acak
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    // Tampilkan prompt pertanyaan kuis
    const userAnswer = prompt(
        `${selectedQuestion.question}\n` +
        `1. ${selectedQuestion.options[0]}\n` +
        `2. ${selectedQuestion.options[1]}\n` +
        `Ketik 1 atau 2 untuk jawaban Anda:`
    );

    if (userAnswer === null) {
        alert("Kuis dibatalkan.");
        return;
    }

    const userAnswerIndex = parseInt(userAnswer) - 1;
    if (userAnswerIndex === selectedQuestion.answer) {
        const reward = 1000;
        saldo += reward;
        updateStatus();
        alert(`Jawaban benar! Anda mendapatkan saldo tambahan sebesar ${reward}.`);
    } else {
        alert("Jawaban salah. Coba lagi lain kali.");
    }
}

// Tombol Stop untuk menghentikan spin
function stopSpin() {
    stopSpinRequested = true;
    clearAllSpinIntervals(); // Hentikan semua interval spin segera
    stopSpinAnimation(Array.from(document.querySelectorAll(".slot"))); // Hentikan animasi
    isSpinning = false; // Reset status spinning
}

// Fungsi untuk cek kombinasi menang
function isWinningCombination() {
    const slotValues = Array.from(document.querySelectorAll(".slot")).map(slot => slot.style.backgroundColor);
    return new Set(slotValues).size === 1;
}

// Update status pertama kali
updateStatus();
