###Dokumentasi Program###

A. Struktur Program

1. Library Proto
   Untuk mendefinsikan protolkol komunikasi
2. Client.js
   Berfungsi menerima input user dari terminal dengan readline. Dimana menggunakan/disesuaikan dengan protokol yang sudah di atur pada library.proto
3. Server.js
   Befungsi sebagai penghubung antara client dengan database firebase dengan firebase-admin dan grPc server. data yang didapat dari client akan di push ke firebase database.
4. ServiceAccountKey.json
   Berfungsi sebagai key untuk menghubungkan dengan firebase console

B. Cara Kerja

1. Run server.js dengan `node server.js`
2. Run client dengan `node client.js`
3. Pada terminal akan muncul pilihan add delete rename dan getAll
4. Tampilan Jika add
5. Tampilan Rename
6. Tampilan delete
7. Tampilan getAll
