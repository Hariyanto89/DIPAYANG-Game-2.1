---
layout: default
title: Game Slot Aset Tetap
remote_theme: pages-themes/time-machine@v0.2.0
plugins:
  - jekyll-remote-theme
---

# Game Slot Aset Tetap

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

<!-- Tombol Kontrol untuk berbagai jenis spin -->
<div class="controls">
    <button onclick="spin(1)">Spin 1x</button>
    <button onclick="spin(2)">Spin 2x</button>
    <button onclick="spin(3)">Spin 3x</button> <!-- Mengubah tombol spin 5x menjadi 3x -->
    <button onclick="maxBet()">Max Bet</button>
    <button onclick="startQuiz()">Isi Saldo</button>
</div>

<!-- Suara Spin -->
<audio id="spinSound" src="https://example.com/spin-sound.mp3"></audio> <!-- Ganti dengan URL audio Anda -->

<!-- Menyertakan JavaScript -->
<script src="{{ site.baseurl }}/assets/js/script.js"></script>
