# Neon Dodge 🕹️
Neon Dodge adalah game browser sederhana dan adiktif dengan tema visual neon yang modern. Tujuannya adalah untuk menghindari kotak-kotak musuh selama mungkin dengan menggerakkan kursor Anda.

(Anda dapat mengganti gambar di atas dengan screenshot atau GIF gameplay Anda sendiri)

## ✨ Fitur
1. Gameplay Sederhana: Mudah dipelajari, cukup gerakkan mouse atau jari Anda untuk bermain.
2. Desain Neon Modern: Tampilan visual gelap dengan elemen-elemen yang bersinar terang.
3. Efek Suara: Audio imersif saat musuh muncul dan saat permainan berakhir.
4. Sistem Skor Tertinggi: Game akan menyimpan skor tertinggi Anda di browser menggunakan localStorage.
5. Responsif: Game berjalan dalam mode layar penuh dan beradaptasi dengan ukuran jendela browser.

## 🎮 Cara Bermain
1. Mulai Permainan: Klik tombol PLAY pada menu utama.
2. Kontrol:
   - Desktop: Gerakkan mouse Anda di sekitar layar. Lingkaran biru akan mengikuti kursor Anda.
   - Mobile: Sentuh dan geser jari Anda di layar.
3. Tujuan: Hindari semua kotak neon berwarna magenta yang muncul dan memantul di layar.
4. Game Over: Permainan berakhir jika lingkaran Anda bersentuhan dengan salah satu kotak.
5. Skor: Skor Anda akan terus bertambah seiring waktu bertahan. Cobalah untuk mengalahkan skor tertinggi Anda!

## 🚀 Instalasi & Menjalankan
Game ini tidak memerlukan instalasi atau build step yang rumit. Cukup ikuti langkah-langkah berikut:

Clone atau Unduh Repositori:
``git clone https://github.com/NAMA_USER/NAMA_REPO.git``
Atau unduh file .zip dan ekstrak.

Siapkan File Audio:
1. Letakkan file audio Anda di direktori root proyek.
2. Pastikan nama file-nya adalah spawn.mp3 (untuk suara musuh muncul) dan gameover.mp3 (untuk suara kalah).
3. Buka di Browser: 
4. Buka file index.html langsung di browser web favorit Anda (seperti Chrome, Firefox, atau Edge).

📂 Struktur File
- index.html: File utama yang berisi struktur halaman web, elemen canvas untuk game, menu, dan elemen audio.
- style.css: Berisi semua aturan styling untuk memberikan tampilan neon modern, tata letak menu, dan desain tombol.
- script.js: Inti dari game. Mengelola semua logika permainan, termasuk:
- Menggambar pemain dan musuh.
- Mendeteksi tabrakan.
- Mengontrol status permainan (menu, bermain, game over).
- Menghitung skor.
- Memutar efek suara.

Selamat bermain!