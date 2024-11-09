// Daftar aset dengan gambar dari GitHub, nilai, dan warna latar belakang
const assets = [
    { name: "Tanah", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/a.png", value: 100.50, color: "#FFD700" }, // Kuning emas
    { name: "Peralatan dan Mesin", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/b.png", value: 200.75, color: "#8A2BE2" }, // Ungu
    { name: "Gedung dan Bangunan", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/c.png", value: 300.30, color: "#FF4500" }, // Oranye kemerahan
    { name: "Jalan Jaringan dan Irigasi", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/d.png", value: 400.10, color: "#32CD32" }, // Hijau limau
    { name: "Aset Tetap Lainnya", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/e.png", value: 500.60, color: "#1E90FF" }, // Biru Dodger
    { name: "Konstruksi Dalam Pengerjaan", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/f.png", value: 600.90, color: "#FF69B4" }, // Pink panas
    { name: "Aset Tak Berwujud", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/komputer.png", value: 700.25, color: "#A52A2A" }, // Coklat
    { name: "Aset Lain Lain", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/rusaknian.png", value: 800.45, color: "#00CED1" }, // Biru cerah
    { name: "Properti Investasi", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/ADFG.png", value: 1000.99, color: "#FF8C00" } // Oranye gelap
];

// Pertanyaan kuis tentang DIPAYANG
let availableQuestions = [
    {
        question: "Apa kepanjangan dari DIPAYANG?",
        options: ["Digitalisasi Pengamanan Aset Kepahiang", "Digitalisasi Pengelolaan Aset Kepahiang"],
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

// Update saldo dan perolehan di HTML
function updateStatus() {
    document.getElementById("saldo").innerText = saldo.toFixed(2);
    document.getElementById("perolehan").innerText = perolehan.toFixed(2);
}

// Fungsi animasi spin
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

// Fungsi untuk mendapatkan aset acak
function getRandomAsset() {
    return assets[Math.floor(Math.random() * assets.length)];
}

// Fungsi untuk memperbarui kolom slot saat spin berhenti
function updateSlotAppearance(slot, asset) {
    slot.style.backgroundImage = `url(${asset.img})`; // Menggunakan gambar dari GitHub
    slot.style.backgroundColor = asset.color; // Warna latar sesuai aset
    slot.setAttribute("data-asset", asset.name); // Set data-attribute untuk CSS
    slot.innerText = ""; // Menghapus teks agar gambar terlihat jelas
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
                stopSpinAnimation(slots); // Hentikan animasi setelah putaran selesai
                updateStatus();
                if (isWinningCombination()) {
                    saldo += perolehan;
                    alert("Selamat! Anda Menang!");
                } else {
                    alert("Tidak berhasil. Coba lagi!");
                }
            }
        }, i * 3000); // Jeda diperpanjang untuk efek lebih lambat
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

// Fungsi untuk cek kombinasi menang (contoh sederhana: semua slot sama)
function isWinningCombination() {
    const slotValues = Array.from(document.querySelectorAll(".slot")).map(slot => slot.style.backgroundColor);
    return new Set(slotValues).size === 1; // Menang jika semua warna latar sama
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
        alert("Jawaban salah. Coba lagi lain kali.");
    }
}

// Update status pertama kali
updateStatus();
