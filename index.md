---
layout: default
title: "Game Slot Aset Tetap"
---

<link rel="stylesheet" href="style.css">

<div class="container">
    <h1>Game Slot Aset Tetap</h1>
    
    <!-- Saldo dan Perolehan -->
    <div class="status">
        <p>Saldo: <span id="saldo">10000.00</span></p>
        <p>Perolehan: <span id="perolehan">0.00</span></p>
    </div>

    <!-- Mesin Slot -->
    <div class="slot-machine">
        <div id="slot1" class="slot"></div>
        <div id="slot2" class="slot"></div>
        <div id="slot3" class="slot"></div>
        <div id="slot4" class="slot"></div>
        <div id="slot5" class="slot"></div>
    </div>

    <!-- Tombol Kontrol -->
    <div class="controls">
        <button onclick="spin(1)">Spin 1x</button>
        <button onclick="spin(2)">Spin 2x</button>
        <button onclick="spin(5)">Spin 5x</button>
        <button onclick="maxBet()">Max Bet</button>
        <button onclick="startQuiz()">Isi Saldo</button> <!-- Tombol Isi Saldo Interaktif -->
    </div>
</div>

<script src="script.js"></script>
