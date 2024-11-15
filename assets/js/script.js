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
    { name: "Properti Investasi", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/nADFG.png?raw=true", value: 1000.99 },
    { name: "Zonk", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/zonk.png?raw=true", value: -2.93 },
    { name: "Gedung dan Bangunan", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/GAME.png?raw=true", value: 900.30 }
];

// Variabel untuk saldo
let saldo = 10000.00;
const costPerSpin = 33.33; // Biaya per putaran
let isSpinning = false;
let spinIntervals = [];
let usedQuestions = [];

// Update tampilan saldo di HTML
function updateStatus() {
    document.getElementById("saldo").innerText = `Saldo: ${saldo.toFixed(2)}`;
}

// Mulai musik setelah ada interaksi pengguna
document.addEventListener("click", function() {
    const backgroundMusic = document.getElementById("background-music");
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => console.log("Gagal memutar musik: " + error));
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
    { question: "Apa tujuan dari penambahan fitur changelog dalam DIPAYANG?", options: ["Memantau setiap aktivitas pengguna secara real-time", "Menambah fitur permainan"], answer: 0 },
    { question: "Bagaimana fitur changelog membantu dalam pengelolaan aset daerah?", options: ["Menciptakan sistem yang lebih transparan dan akuntabel", "Mempercepat proses pengadaan barang"], answer: 0 },
    { question: "Apa fungsi dari fitur lepas ASN dalam DIPAYANG?", options: ["Menghapus status ASN dari aset daerah yang terkait", "Menambah ASN baru"], answer: 0 },
    { question: "Mengapa fitur lepas ASN penting dalam pengelolaan aset?", options: ["Untuk memastikan ASN yang pindah, pensiun, atau meninggal tidak lagi terikat dengan tanggung jawab aset daerah", "Untuk menambah tanggung jawab ASN"], answer: 0 },
    { question: "Apa manfaat dari fitur pengingat pajak dalam DIPAYANG?", options: ["Memastikan pembayaran pajak aset daerah dilakukan tepat waktu", "Mengingatkan jadwal rapat"], answer: 0 },
    { question: "Bagaimana DIPAYANG membantu dalam proses audit dan pengawasan aset?", options: ["Dengan fitur changelog yang memantau seluruh aktivitas pengguna", "Dengan fitur permainan"], answer: 0 },
    { question: "Apa yang dimaksud dengan KIBAR dalam DIPAYANG?", options: ["Kartu Inventaris Barang Aset Daerah", "Kartu Identitas Barang"], answer: 0 },
    { question: "Bagaimana DIPAYANG membantu dalam pengelolaan RKBMD?", options: ["Memungkinkan penginputan dan rekapitulasi data secara digital", "Menyediakan template dokumen"], answer: 0 },
    { question: "Apa manfaat dari fitur rekapitulasi fisik RKBMD dalam DIPAYANG?", options: ["Memudahkan pengunduhan dan verifikasi data usulan RKBMD", "Menyediakan laporan keuangan"], answer: 1 },
    { question: "Mengapa OPD diwajibkan membuat laporan RKBMD NIHIL jika tidak memiliki usulan?", options: ["Sebagai bukti kepatuhan administrasi", "Untuk mendapatkan anggaran tambahan"], answer: 0 },
    { question: "Bagaimana DIPAYANG membantu dalam pengelolaan aset kendaraan dinas?", options: ["Dengan fitur pajak kendaraan yang memantau status pembayaran pajak", "Dengan fitur pemesanan kendaraan"], answer: 0 },
    { question: "Apa fungsi dari sub-menu 'Lunas Pajak' dalam DIPAYANG?", options: ["Menampilkan daftar kendaraan yang telah melunasi pajak", "Menampilkan daftar kendaraan yang belum membayar pajak"], answer: 0 },
    { question: "Bagaimana fitur 'Ingat Pajak' dalam DIPAYANG membantu pengelola aset?", options: ["Memberikan notifikasi saat kendaraan mendekati jatuh tempo pembayaran pajak", "Mengingatkan jadwal servis kendaraan"], answer: 0 },
    { question: "Apa tujuan dari penambahan fitur kurva dalam DIPAYANG?", options: ["Menyajikan gambaran detail terkait kondisi dan nilai aset", "Menyediakan grafik keuangan"], answer: 0 },
    { question: "Bagaimana fitur cetak rekapitulasi RKBMD dalam format Excel dan PDF membantu OPD?", options: ["Mempermudah penyusunan laporan yang akurat dan sesuai standar", "Menyediakan template presentasi"], answer: 0 },
    { question: "Apa manfaat dari fitur QR Code untuk setiap aset dalam DIPAYANG?", options: ["Menghubungkan langsung dengan database pusat", "Menyediakan akses ke media sosial"], answer: 0 },
    { question: "Bagaimana DIPAYANG membantu dalam perencanaan pengelolaan aset daerah?", options: ["Dengan fitur kurva yang memetakan dan mengevaluasi kondisi aset", "Dengan fitur kalender"], answer: 0 },
    { question: "Apa yang dimaksud dengan fitur 'Kurva Pajak' dalam DIPAYANG?", options: ["Menampilkan tren pembayaran pajak kendaraan dinas secara visual", "Menampilkan grafik keuangan daerah"], answer: 0 },
    { question: "Bagaimana DIPAYANG meningkatkan transparansi dalam pengelolaan aset?", options: ["Dengan fitur changelog yang mencatat setiap aktivitas pengguna", "Dengan fitur chat"], answer: 0 },
    { question: "Apa manfaat dari fitur autentikasi pengguna dalam DIPAYANG?", options: ["Memastikan hanya pengguna terdaftar yang dapat mengakses aplikasi", "Mempercepat proses login"], answer: 0 },
    { question: "Bagaimana DIPAYANG membantu dalam pengelolaan aset gedung dan bangunan?", options: ["Dengan fitur kurva yang menyajikan detail kondisi dan nilai aset", "Dengan fitur pemesanan ruangan"], answer: 0 },
];

if (questions.length === usedQuestions.length) {
        alert("Tidak ada lagi pertanyaan.");
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));

    usedQuestions.push(randomIndex);
    const selectedQuestion = questions[randomIndex];
    const shuffledOptions = selectedQuestion.options.map((option, index) => ({ option, index })).sort(() => Math.random() - 0.5);

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
        saldo += 1000;
        updateStatus();
        alert("Jawaban benar! Anda mendapatkan saldo tambahan sebesar 1000.");
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
    slot.setAttribute("data-asset", asset.name);
}

// Fungsi untuk spin slot dengan jumlah putaran berdasarkan pilihan tombol
function spin(spinType) {
    let times;
    switch (spinType) {
        case 1:
            times = 5;
            break;
        case 3:
            times = 15;
            break;
        case 5:
            times = 25;
            break;
        case 100:
            times = 200;
            break;
        default:
            times = 1;
    }

    if (isSpinning) return;
    isSpinning = true;
    let totalBetCost = costPerSpin * times;

    if (saldo < totalBetCost) {
        alert("Saldo tidak cukup untuk spin ini!");
        isSpinning = false;
        return;
    }

    saldo -= totalBetCost;
    const slots = Array.from(document.querySelectorAll(".slot"));
    startSpinAnimation(slots);

    for (let i = 0; i < times; i++) {
        const intervalId = setTimeout(() => {
            let counts = {};
            slots.forEach(slot => {
                const asset = getRandomAsset();
                updateSlotAppearance(slot, asset);
                counts[asset.name] = (counts[asset.name] || 0) + 1;
            });

            if (i === times - 1) {
                stopSpinAnimation(slots);
                calculateWin(counts);
                updateStatus();
                isSpinning = false;
            }
        }, i * 200);

        spinIntervals.push(intervalId);
    }
}

// Fungsi menghitung kemenangan berdasarkan aturan
function calculateWin(counts) {
    let winAmount = 0;
    let message = "";

    if (counts["Zonk"]) {
        let zonkPenalty = counts["Zonk"] * 2.93;
        winAmount -= zonkPenalty;
        message += `Zonk muncul ${counts["Zonk"]}x! Saldo berkurang ${zonkPenalty.toFixed(2)} poin.\n`;
    }

    if (counts["Tanah"] === 10) {
        winAmount += 1000;
        message += "Tanah muncul 10x! Anda menang 1000 poin.\n";
    }
    if (counts["Properti Investasi"] === 10) {
        winAmount += 5000;
        message += "Properti Investasi muncul 10x! Jackpot 5000 poin!\n";
    }
    if (Object.values(counts).every(count => count === 20)) {
        winAmount += 5000;
        message += "Semua aset muncul 20x! Anda menang 5000 poin!\n";
    }
    if (Object.values(counts).every(count => count < 10)) {
        winAmount -= 1000;
        message += "Tidak ada aset yang muncul 10x. Anda kehilangan 1000 poin.\n";
    }

    saldo += winAmount;
    alert(message || "Tidak ada kemenangan. Coba lagi!");
}

// Fungsi untuk menghentikan semua spin
function clearAllSpinIntervals() {
    spinIntervals.forEach(intervalId => clearTimeout(intervalId));
    spinIntervals = [];
}

// Fungsi untuk tombol Stop Spin
function stopSpin() {
    clearAllSpinIntervals();
    stopSpinAnimation(Array.from(document.querySelectorAll(".slot")));
    isSpinning = false;
}

// Update status pertama kali
updateStatus();
