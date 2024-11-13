<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mesin Slot DIPAYANG</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
         <h1 class="center-title">Mesin Slot DIPAYANG</h1>

        <!-- Suara Latar Belakang -->
        <audio id="background-music" src="https://github.com/Hariyanto89/DIPAYANG-Game-2.1/raw/main/material/pookatori-and-friends-kevin-macleod-main-version-24903-04-07.mp3" autoplay loop></audio>

        <div id="saldo">Saldo: 10000.00</div>

        <div class="slot-machine">
            <!-- Membuat 25 slot dalam tampilan grid 5x5 -->
            <div class="slot" id="slot1"></div>
            <div class="slot" id="slot2"></div>
            <div class="slot" id="slot3"></div>
            <div class="slot" id="slot4"></div>
            <div class="slot" id="slot5"></div>
            <div class="slot" id="slot6"></div>
            <div class="slot" id="slot7"></div>
            <div class="slot" id="slot8"></div>
            <div class="slot" id="slot9"></div>
            <div class="slot" id="slot10"></div>
            <div class="slot" id="slot11"></div>
            <div class="slot" id="slot12"></div>
            <div class="slot" id="slot13"></div>
            <div class="slot" id="slot14"></div>
            <div class="slot" id="slot15"></div>
            <div class="slot" id="slot16"></div>
            <div class="slot" id="slot17"></div>
            <div class="slot" id="slot18"></div>
            <div class="slot" id="slot19"></div>
            <div class="slot" id="slot20"></div>
            <div class="slot" id="slot21"></div>
            <div class="slot" id="slot22"></div>
            <div class="slot" id="slot23"></div>
            <div class="slot" id="slot24"></div>
            <div class="slot" id="slot25"></div>
        </div>

        <div class="button-group">
            <button onclick="spin(1)">Spin 1x</button>
            <button onclick="spin(3)">Spin 3x</button>
            <button onclick="spin(5)">Spin 5x</button>
            <button onclick="spin(100)">Max Bet</button>
        </div>

        <button onclick="startQuiz()">Isi Saldo (Kuis)</button>
    </div>
    <div id="start-message" class="start-message">Mulai</div>
    <script src="script.js"></script>
</body>
</html>
