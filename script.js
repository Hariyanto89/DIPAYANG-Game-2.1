// Daftar aset dengan gambar, nilai, dan warna latar belakang
const assets = [
    { name: "Tanah", img: "https://via.placeholder.com/100?text=Tanah", value: 100.50, color: "#FFD700" }, // Kuning emas
    { name: "Peralatan dan Mesin", img: "https://via.placeholder.com/100?text=Mesin", value: 200.75, color: "#8A2BE2" }, // Ungu
    { name: "Gedung dan Bangunan", img: "https://via.placeholder.com/100?text=Gedung", value: 300.30, color: "#FF4500" }, // Oranye kemerahan
    { name: "Jalan Jaringan", img: "https://via.placeholder.com/100?text=Jalan", value: 400.10, color: "#32CD32" }, // Hijau limau
    { name: "Aset Tetap Lainnya", img: "https://via.placeholder.com/100?text=Lainnya", value: 500.60, color: "#1E90FF" }, // Biru Dodger
    { name: "Konstruksi Dalam Pengerjaan", img: "https://via.placeholder.com/100?text=Konstruksi", value: 600.90, color: "#FF69B4" }, // Pink panas
    { name: "Aset Tak Berwujud", img: "https://via.placeholder.com/100?text=Tak+Berwujud", value: 700.25, color: "#A52A2A" }, // Coklat
    { name: "Aset Lain Lain", img: "https://via.placeholder.com/100?text=Lain", value: 800.45, color: "#00CED1" }, // Biru cerah
    { name: "Properti Investasi", img: "https://via.placeholder.com/100?text=Properti", value: 1000.99, color: "#FF8C00" } // Oranye gelap
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
                slot.style.backgroundColor = asset.color; // Atur warna sesuai aset
                slot.innerText = asset.name; // Tampilkan nama aset di slot
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

// Fungsi untuk memulai kuis pengisian saldo
function startQuiz() {
    if (availableQuestions.length === 0) {
        // Reset pertanyaan jika semua telah digunakan
        availableQuestions = [...questions];
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions.splice(randomIndex, 1)[0]; // Hapus pertanyaan yang dipilih

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
        const reward = 1000; // Jumlah saldo yang ditambahkan
        saldo += reward;
        updateStatus();
        alert(`Jawaban benar! Anda mendapatkan saldo tambahan sebesar ${reward}.`);
    } else {
        alert("Jawaban salah. Coba lagi lain kali.");
    }
}

// Fungsi untuk mendapatkan aset acak
function getRandomAsset() {
    return assets[Math.floor(Math.random() * assets.length)];
}

// Update status pertama kali
updateStatus();
