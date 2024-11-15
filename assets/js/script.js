// Daftar aset dengan gambar dan nilai
const assets = [
    { name: "Tanah", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/a.png?raw=true", value: 100.50 },
    { name: "Peralatan dan Mesin", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/b.png?raw=true", value: 200.75 },
    { name: "Gedung dan Bangunan", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/c.png?raw=true", value: 300.30 },
    { name: "Jalan Jaringan dan Irigasi", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/d.png?raw=true", value: 400.10 },
    { name: "Aset Tetap Lainnya", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/e.png?raw=true", value: 500.60 },
    { name: "Konstruksi Dalam Pengerjaan", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/f.png?raw=true", value: 600.90 },
    { name: "Aset Tak Berwujud", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/komputer.png?raw=true", value: 700.25 },
    { name: "Aset Lain Lain", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/rusaknian.png?raw=true", value: 800.45 },
    { name: "Properti Investasi", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/nADFG.png?raw=true", value: 1000.99 },
    { name: "Zonk", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/zonk.png?raw=true", value: -2.93 },
    { name: "PING", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/GAME.png?raw=true", value: 900.30 }
];

// Variabel untuk saldo dan pengaturan awal
let saldo = 10000.00;
const costPerSpin = 33.33; // Biaya per putaran
let isSpinning = false; // Status apakah mesin sedang berputar
let usedQuestions = []; // Daftar pertanyaan yang sudah dijawab
const spinDuration = 2000; // Durasi spin dalam milidetik

// Fungsi untuk memperbarui tampilan saldo
function updateStatus() {
    const saldoElement = document.getElementById("saldo");
    if (saldoElement) {
        saldoElement.innerText = `Saldo: ${saldo.toFixed(2)}`;
    } else {
        console.error("Element saldo tidak ditemukan.");
    }
}

// Mulai musik setelah ada interaksi pengguna pertama kali
document.addEventListener("click", function () {
    const backgroundMusic = document.getElementById("background-music");
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play().catch((error) => console.error("Gagal memutar musik: ", error));
    }
}, { once: true });

// Fungsi untuk memulai kuis pengisian saldo
function startQuiz() {
    const questions = [
        { question: "Apa kepanjangan dari DIPAYANG?", options: ["Digitalisasi Pengamanan Aset Kepahiang", "Digitalisasi Pengelolaan Aset Kepahiang"], answer: 1 },
        { question: "Platform apa yang digunakan oleh DIPAYANG untuk memberikan kemudahan akses?", options: ["AppSheet", "AppMaker"], answer: 0 },
        { question: "Apa tujuan utama dari aplikasi DIPAYANG?", options: ["Mengamankan dan mengelola aset daerah secara digital", "Mengelola keuangan daerah"], answer: 0 },
        { question: "Fitur apa yang digunakan DIPAYANG untuk menilai tingkat keamanan fisik aset?", options: ["Indikator berwarna", "Grafik batang"], answer: 0 },
        { question: "Apa fungsi dari fitur KIBAR dalam DIPAYANG?", options: ["Mencatat inventaris barang aset daerah", "Mengelola keuangan daerah"], answer: 0 },
        { question: "Dokumen legal apa yang dijamin keberadaannya oleh fitur pengamanan hukum DIPAYANG?", options: ["Sertifikat tanah dan surat hibah", "Surat izin usaha"], answer: 0 },
        { question: "Apa manfaat dari fitur autentikasi pengguna dalam DIPAYANG?", options: ["Memastikan keamanan data dari akses yang tidak sah", "Mempercepat proses login"], answer: 0 },
        { question: "Bagaimana DIPAYANG memastikan data yang diinput dan disimpan aman?", options: ["Menggunakan enkripsi data dan kontrol akses", "Menggunakan password sederhana"], answer: 0 },
        { question: "Apa yang dimaksud dengan RKBMD dalam konteks DIPAYANG?", options: ["Rencana Kebutuhan Barang Milik Daerah", "Rencana Keuangan Barang Milik Daerah"], answer: 0 },
        { question: "Fitur apa yang ditambahkan dalam update terbaru DIPAYANG untuk memantau aktivitas pengguna?", options: ["Changelog", "Dashboard"], answer: 1 },
    ];

    const availableQuestions = questions.filter(q => !usedQuestions.includes(q.question));
    if (availableQuestions.length === 0) {
        alert("Kuis sudah selesai!");
        return;
    }

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    const userAnswer = prompt(`${randomQuestion.question}\nPilihan:\n${randomQuestion.options.map((option, index) => `${index}: ${option}`).join("\n")}`);

    if (parseInt(userAnswer) === randomQuestion.answer) {
        alert("Jawaban benar! Anda mendapatkan saldo tambahan.");
        saldo += 50;
        usedQuestions.push(randomQuestion.question);
    } else {
        alert("Jawaban salah. Coba lagi!");
    }

    updateStatus();
}

// Fungsi inisialisasi gambar awal ke slot
function initializeSlots() {
    const slots = document.querySelectorAll(".slot img");
    slots.forEach((slot, index) => {
        const asset = assets[index % assets.length]; // Rotasi gambar
        slot.src = asset.img; // Masukkan URL gambar
        slot.alt = asset.name; // Teks alternatif
    });
}

// Fungsi untuk memutar roda slot
function spin(times) {
    if (isSpinning) {
        alert("Mesin sedang berputar, tunggu sebentar.");
        return;
    }

    if (saldo < costPerSpin * times) {
        alert("Saldo tidak cukup untuk spin ini.");
        return;
    }

    isSpinning = true;
    saldo -= costPerSpin * times;
    updateStatus();

    const slots = document.querySelectorAll(".slot img");
    const spinInterval = setInterval(() => {
        slots.forEach(slot => {
            const randomAsset = assets[Math.floor(Math.random() * assets.length)];
            slot.src = randomAsset.img;
            slot.alt = randomAsset.name;
        });
    }, 100);

    setTimeout(() => {
        clearInterval(spinInterval);
        let totalValue = 0;

        slots.forEach(slot => {
            const finalAsset = assets[Math.floor(Math.random() * assets.length)];
            slot.src = finalAsset.img;
            slot.alt = finalAsset.name;
            totalValue += finalAsset.value;
        });

        saldo += totalValue;
        updateStatus();
        isSpinning = false;

        alert(`Spin selesai! Anda mendapatkan total nilai: ${totalValue.toFixed(2)}`);
    }, spinDuration * times);
}

// Event listener untuk tombol
document.querySelector(".button-group").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        if (e.target.innerText.includes("Spin")) {
            const spinCount = parseInt(e.target.innerText.match(/\d+/)[0]);
            spin(spinCount);
        } else if (e.target.innerText.includes("Isi Saldo")) {
            startQuiz();
        }
    }
});

// Update saldo saat halaman dimuat
updateStatus();
