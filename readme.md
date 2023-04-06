###Dokumentasi Program

1. Struktur Program
   a. Library Proto
   Untuk mendefinsikan protolkol komunikasi
   b. Client.js
   Berfungsi menerima input user dari terminal dengan readline. Dimana menggunakan/disesuaikan dengan protokol yang sudah di atur pada library.proto
   c. Server.js
   Befungsi sebagai penghubung antara client dengan database firebase dengan firebase-admin dan grPc server. data yang didapat dari client akan di push ke firebase database.
   d. ServiceAccountKey.json
   Berfungsi sebagai key untuk menghubungkan dengan firebase console

2. Cara Kerja
   a. Run server.js dengan `node server.js`
   b. Run client dengan `node client.js`
   c. Pada terminal akan muncul pilihan add delete rename dan getAll
   d. Tampilan Jika add
   e. Tampilan Rename
   f. Tampilan delete
   g. Tampilan getAll
