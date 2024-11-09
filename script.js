// Daftar aset dengan gambar dari GitHub, nilai, dan warna latar belakang
const assets = [
    { name: "Tanah", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/a.png", value: 100.50, color: "#FFD700" },
    { name: "Peralatan dan Mesin", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/b.png", value: 200.75, color: "#8A2BE2" },
    { name: "Gedung dan Bangunan", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/c.png", value: 300.30, color: "#FF4500" },
    { name: "Jalan Jaringan dan Irigasi", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/d.png", value: 400.10, color: "#32CD32" },
    { name: "Aset Tetap Lainnya", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/e.png", value: 500.60, color: "#1E90FF" },
    { name: "Konstruksi Dalam Pengerjaan", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/f.png", value: 600.90, color: "#FF69B4" },
    { name: "Aset Tak Berwujud", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/komputer.png", value: 700.25, color: "#A52A2A" },
    { name: "Aset Lain Lain", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/rusaknian.png", value: 800.45, color: "#00CED1" },
    { name: "Properti Investasi", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/nADFG.png", value: 1000.99, color: "#FF8C00" }
];

// Pertanyaan kuis tentang DIPAYANG untuk menambah saldo
let availableQuestions = [
    {
        question: "Siapa inisiator aplikasi DIPAYANG?",
        options: ["Herwin noviansyah", "Mbah Mijan"],
        answer: 0
    },
    {
        question: "Siapa developer aplikasi DIPAYANG?",
        options: ["Hariyanto Ganteng", "Joko Winarto"],
        answer: 0
    },
    {
        question: "Platform apa yang digunakan oleh aplikasi DIPAYANG?",
        options: ["AppSheet", "AppMaker"],
        answer: 0
    },
    {
        question: "Fitur apa yang digunakan untuk menilai tingkat keamanan fisik aset?",
        options: ["Indikator berwarna", "Indikator angka"],
        answer: 0
    },
    {
        question: "Apa tujuan utama dari aplikasi DIPAYANG?",
        options: ["Mendigitalisasi dan mempermudah pengelolaan aset daerah", "Mendigitalisasi dan mempermudah pengelolaan keuangan daerah"],
        answer: 0
    },
    {
        question: "Siapa yang mengembangkan aplikasi DIPAYANG?",
        options: ["BKD Kab. Kepahiang", "BPK Kab. Kepahiang"],
        answer: 0
    }
];

// Variabel untuk saldo dan perolehan
let saldo = 10000.00;
let perolehan = 0.00;
const costPerSpin = 500; // Biaya per spin dasar

// Ambil elemen audio untuk suara spin
const spinSound = document.getElementById("spinSound");

// Update saldo dan perolehan di HTML
function updateStatus() {
    document.getElementById("saldo").innerText = saldo.toFixed(2);
    document.getElementById("perolehan").innerText = perolehan.toFixed(2);
}

// Fungsi animasi spin
function startSpinAnimation(slots) {
    slots.forEach(slot => slot.classList.add("shake"));
    spinSound.play();
}

// Hentikan animasi
function stopSpinAnimation(slots) {
    slots.forEach(slot => slot.classList.remove("shake"));
    spinSound.pause();
    spinSound.currentTime = 0;
}

// Fungsi untuk mendapatkan aset acak
function getRandomAsset() {
    return assets[Math.floor(Math.random() * assets.length)];
}

// Fungsi untuk memperbarui kolom slot saat spin berhenti
function updateSlotAppearance(slot, asset) {
    slot.style.backgroundImage = `url(${asset.img})`;
    slot.style.backgroundColor = asset.color;
    slot.setAttribute("data-asset", asset.name);
    slot.innerText = "";
}

// Fungsi untuk Spin dengan jumlah putaran
function spin(times) {
    const totalCost = costPerSpin * times;
    if (saldo < totalCost) {
        alert("Saldo tidak cukup untuk spin ini!");
        return;
    }

    saldo -= totalCost;
    perolehan = 0;

    const slots = Array.from(document.querySelectorAll(".slot"));
    startSpinAnimation(slots);

    for (let i = 0; i < times; i++) {
        setTimeout(() => {
            slots.forEach((slot) => {
                const asset = getRandomAsset();
                updateSlotAppearance(slot, asset);
                perolehan += asset.value;
            });

            if (i === times - 1) {
                stopSpinAnimation(slots);
                updateStatus();
                if (isWinningCombination()) {
                    saldo += perolehan;
                    alert("Selamat! Anda Menang!");
                } else {
                    alert("Tidak berhasil. Coba lagi!");
                }
            }
        }, i * 3000);
    }
}

// Fungsi untuk Max Bet
function maxBet() {
    const maxBetCost = costPerSpin * 10;
    if (saldo < maxBetCost) {
        alert("Saldo tidak cukup untuk max bet!");
        return;
    }

    saldo -= maxBetCost;
    perolehan = 0;
    spin(10);
}

// Fungsi untuk cek kombinasi menang
function isWinningCombination() {
    const slotValues = Array.from(document.querySelectorAll(".slot")).map(slot => slot.style.backgroundColor);
    return new Set(slotValues).size === 1;
}

// Fungsi untuk memulai kuis pengisian saldo
function startQuiz() {
    if (availableQuestions.length === 0) {
        availableQuestions = [...questions];
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions.splice(randomIndex, 1)[0];

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
        alert("Jawaban salah. Coba lagi lain kali.`);
    }
}

// Update status pertama kali
updateStatus();
