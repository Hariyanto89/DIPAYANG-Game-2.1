<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mesin Slot DIPAYANG</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Mesin Slot DIPAYANG</h1>

        <div class="status">
            <div id="saldo">Saldo: 0.00</div>
            <div id="perolehan">Perolehan: 0.00</div>
        </div>

        <div class="slot-machine">
            <div class="slot" id="slot1"></div>
            <div class="slot" id="slot2"></div>
            <div class="slot" id="slot3"></div>
            <div class="slot" id="slot4"></div>
            <div class="slot" id="slot5"></div>
        </div>

        <button onclick="spin(5)">Spin 5x</button>
        <button onclick="stopSpin()">Stop Spin</button>
        <button onclick="startQuiz()">Isi Saldo (Kuis)</button>
        <button onclick="addBalance(1000)">Tambah Saldo +1000</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
