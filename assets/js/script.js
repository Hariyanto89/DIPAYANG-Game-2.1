// Daftar aset dengan gambar dari GitHub dan nilai
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
const costPerSpin = 500;
let isSpinning = false;
let stopSpinRequested = false;
let spinIntervals = [];

// Update tampilan saldo dan perolehan di HTML
function updateStatus() {
    document.getElementById("saldo").innerText = `Saldo: ${saldo.toFixed(2)}`;
    document.getElementById("perolehan").innerText = `Perolehan: ${perolehan.toFixed(2)}`;
}

// Fungsi untuk menambahkan saldo secara manual
function addBalance(amount) {
    saldo += amount;
    updateStatus();
    alert(`Saldo berhasil ditambah sebesar ${amount}.`);
}

// Fungsi untuk memulai kuis pengisian saldo dengan pilihan acak
function startQuiz() {
    const questions = [
        { question: "Apakah warna bendera Indonesia?", options: ["Merah Putih", "Putih Merah"], answer: 0 },
        { question: "Siapa presiden pertama Indonesia?", options: ["Soekarno", "Soeharto"], answer: 0 }
    ];

    if (questions.length === 0) {
        alert("Tidak ada lagi pertanyaan.");
        return;
    }

    const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
    const shuffledOptions = selectedQuestion.options.map((option, index) => ({ option, index }))
        .sort(() => Math.random() - 0.5);

    const userAnswer = prompt(
        `${selectedQuestion.question}\n` +
        shuffledOptions.map((opt, i) => `${i + 1}. ${opt.option}`).join("\n") +
        `\nKetik nomor jawaban Anda:`
    );

    if (userAnswer === null) {
        alert("Kuis dibatalkan.");
        return;
    }

    const userAnswerIndex = shuffledOptions[parseInt(userAnswer) - 1]?.index;
    if (userAnswerIndex === selectedQuestion.answer) {
        const reward = 1000;
        saldo += reward;
        updateStatus();
        alert(`Jawaban benar! Anda mendapatkan saldo tambahan sebesar ${reward}.`);
    } else {
        alert("Jawaban salah. Coba lagi lain kali.");
    }
}

// Fungsi animasi spin
function startSpinAnimation(slots) {
    slots.forEach(slot => slot.classList.add("shake"));
}

// Hentikan animasi spin
function stopSpinAnimation(slots) {
    slots.forEach(slot => slot.classList.remove("shake"));
}

// Fungsi untuk mendapatkan aset acak
function getRandomAsset() {
    return assets[Math.floor(Math.random() * assets.length)];
}

// Fungsi untuk memperbarui tampilan slot
function updateSlotAppearance(slot, asset) {
    slot.style.backgroundImage = `url(${asset.img})`;
    slot.innerText = "";
}

// Fungsi untuk spin slot
function spin(times) {
    if (isSpinning) return;
    isSpinning = true;
    stopSpinRequested = false;
    perolehan = 0;

    if (saldo < costPerSpin * times) {
        alert("Saldo tidak cukup untuk spin ini!");
        isSpinning = false;
        return;
    }

    saldo -= costPerSpin * times;
    const slots = Array.from(document.querySelectorAll(".slot"));
    startSpinAnimation(slots);

    for (let i = 0; i < times; i++) {
        const intervalId = setTimeout(() => {
            if (stopSpinRequested) {
                clearAllSpinIntervals();
                stopSpinAnimation(slots);
                updateStatus();
                isSpinning = false;
                return;
            }

            slots.forEach(slot => {
                const asset = getRandomAsset();
                updateSlotAppearance(slot, asset);
                perolehan += asset.value;
            });

            if (i === times - 1 || stopSpinRequested) {
                stopSpinAnimation(slots);
                saldo += perolehan;
                updateStatus();
                isSpinning = false;
            }
        }, i * 1000);

        spinIntervals.push(intervalId);
    }
}

// Fungsi untuk menghentikan semua spin
function clearAllSpinIntervals() {
    spinIntervals.forEach(intervalId => clearTimeout(intervalId));
    spinIntervals = [];
}

// Fungsi tombol Stop Spin
function stopSpin() {
    stopSpinRequested = true;
    clearAllSpinIntervals();
    stopSpinAnimation(Array.from(document.querySelectorAll(".slot")));
    isSpinning = false;
}

// Fungsi untuk cek kombinasi menang
function isWinningCombination() {
    const slotValues = Array.from(document.querySelectorAll(".slot")).map(slot => slot.style.backgroundColor);
    return new Set(slotValues).size === 1;
}

// Update status pertama kali
updateStatus();
