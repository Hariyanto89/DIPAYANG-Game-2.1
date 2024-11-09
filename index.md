<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Slot Aset Tetap</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Game Slot Aset Tetap</h1>
        
        <!-- Kolom Saldo dan Perolehan -->
        <div class="status">
            <div id="saldo">10000.00</div>
            <div id="perolehan">0.00</div>
        </div>
        
        <!-- Slot Mesin -->
        <div class="slot-machine">
            <div id="slot1" class="slot"></div>
            <div id="slot2" class="slot"></div>
            <div id="slot3" class="slot"></div>
            <div id="slot4" class="slot"></div>
            <div id="slot5" class="slot"></div>
        </div>
        
        <!-- Tombol Kontrol -->
        <div class="controls">
            <button onclick="spin(1)">Spin</button>
            <button onclick="maxBet()">Max Bet</button>
            <button onclick="startQuiz()">Isi Saldo</button>
        </div>

        <!-- Suara Spin -->
        <audio id="spinSound" src="https://example.com/spin-sound.mp3"></audio> <!-- Ganti dengan URL audio Anda -->
    </div>

    <script src="script.js"></script>
</body>
</html>
