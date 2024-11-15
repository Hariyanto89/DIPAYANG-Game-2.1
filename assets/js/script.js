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
    { name: "PING", img: "https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/GAME.png?raw=true", value: 900.30 }
];

// Variabel untuk saldo
let saldo = 10000.00;
const costPerSpin = 33.33; // Biaya per putaran
let isSpinning = false;
let usedQuestions = [];
let winningSpin = "";

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
        { question: "Bagaimana DIPAYANG membantu dalam pengelolaan aset daerah?", options: ["Dengan fitur changelog yang memantau seluruh aktivitas pengguna", "Dengan fitur permainan"], answer: 0 },
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
        { question: "Bagaimana DIPAYANG membantu dalam perencanaan pengelolaan aset daerah?", options: ["Dengan fitur analitik dan laporan pengelolaan yang mendalam", "Dengan menyediakan data umum saja"], answer: 0 }
    ];

    // Memilih pertanyaan secara acak
    const availableQuestions = questions.filter(q => !usedQuestions.includes(q.question));
    if (availableQuestions.length === 0) {
        alert("Kuis sudah selesai!");
        return;
    }

    // Memilih pertanyaan secara acak dari yang belum digunakan
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    const userAnswer = prompt(`${randomQuestion.question}\nPilihan:\n${randomQuestion.options.join('\n')}`);

    // Cek jawaban pengguna
    if (parseInt(userAnswer) === randomQuestion.answer) {
        alert("Jawaban Anda benar! Anda mendapatkan saldo tambahan.");
        saldo += 50; // Menambahkan saldo jika jawaban benar
        usedQuestions.push(randomQuestion.question); // Menambahkan pertanyaan yang sudah dijawab ke daftar usedQuestions
    } else {
        alert("Jawaban Anda salah. Coba lagi!");
    }

    // Update tampilan saldo
    updateStatus();
}

// Fungsi putar roda
function spinWheel() {
    if (isSpinning) {
        alert("Sedang dalam putaran, coba lagi nanti.");
        return;
    }

    if (saldo < costPerSpin) {
        alert("Saldo tidak mencukupi untuk melakukan spin.");
        return;
    }

    saldo -= costPerSpin;
    updateStatus();
    isSpinning = true;

    // Mulai animasi putaran
    const spinInterval = setInterval(() => {
        const randomAsset = assets[Math.floor(Math.random() * assets.length)];
        document.getElementById("asset-image").src = randomAsset.img;
        document.getElementById("asset-name").innerText = randomAsset.name;
    }, 100);

    // Setelah putaran selesai, tentukan hasil akhir
    setTimeout(() => {
        clearInterval(spinInterval);

        // Pilih aset acak sebagai hasil putaran
        const spinResult = assets[Math.floor(Math.random() * assets.length)];

        // Update gambar dan nama aset
        document.getElementById("asset-image").src = spinResult.img;
        document.getElementById("asset-name").innerText = spinResult.name;

        // Update nilai saldo berdasarkan hasil putaran
        saldo += spinResult.value;

        // Update status saldo setelah putaran selesai
        updateStatus();
        isSpinning = false;

        // Tampilkan pesan hasil spin
        const resultMessage = spinResult.name === "Zonk" ? "Sayang sekali! Anda mendapat Zonk!" : `Anda mendapatkan: ${spinResult.name} (Nilai: ${spinResult.value.toFixed(2)})`;
        alert(resultMessage);
    }, 2000); // Durasi putaran
}

// Event listener untuk tombol spin dan kuis
document.getElementById("spin-button").addEventListener("click", spinWheel);
document.getElementById("quiz-button").addEventListener("click", startQuiz);

// Update status saldo pada awal
updateStatus();
