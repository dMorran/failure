# Dokumentasi Program

[Dyas Amorita R.N - 5027211009]

## A. Struktur Program

1. Library Proto
   Untuk mendefinsikan protolkol komunikasi
2. Client.js
   Berfungsi menerima input user dari terminal dengan readline. Dimana menggunakan/disesuaikan dengan protokol yang sudah di atur pada library.proto
3. Server.js
   Befungsi sebagai penghubung antara client dengan database firebase dengan firebase-admin dan grPc server. data yang didapat dari client akan di push ke firebase database.
4. ServiceAccountKey.json
   Berfungsi sebagai key untuk menghubungkan dengan firebase console

## B. Cara Kerja

1. Run server.js dengan `node server.js`
   ![image](https://user-images.githubusercontent.com/107184933/230273307-3b0850bf-99fd-4f18-9712-afab93e5acdc.png)
2. Run client dengan `node client.js`
   ![image](https://user-images.githubusercontent.com/107184933/230273455-c056bf63-44b1-49d2-9537-17dceb24f8cf.png)
3. Pada terminal akan muncul pilihan add delete rename dan getAll
   ![image](https://user-images.githubusercontent.com/107184933/230273587-10a9b0ef-8f94-43cc-9afd-b15af553ccd5.png)
4. Tampilan Jika add
   ![image](https://user-images.githubusercontent.com/107184933/230273719-a6231e35-2c7a-4063-a8b4-92949e32878a.png)

   tampilan firebase
   ![image](https://user-images.githubusercontent.com/107184933/230273846-b65502ce-246f-492d-8815-aa0057265cd2.png)

5. Tampilan get
   ![image](https://user-images.githubusercontent.com/107184933/230273940-274609df-0b4a-451d-a90e-8dc298b499a8.png)
6. Tampilan Update (rename)
   ![image](https://user-images.githubusercontent.com/107184933/230274071-bd693156-bf80-42d9-9643-74a117f865f6.png)

   tampilan firebase
   ![image](https://user-images.githubusercontent.com/107184933/230274142-e3888cea-344b-41fb-95d5-16686f9fd148.png)

7. Tampilan delete
   ![image](https://user-images.githubusercontent.com/107184933/230274420-b6e19907-9e49-4a4a-b1f6-d230d32f0637.png)

   Tampilan Firebase
   ![image](https://user-images.githubusercontent.com/107184933/230274505-0154f6b3-75da-474f-b33d-02fa4461062f.png)

8. Tampilan Get All
   ![image](https://user-images.githubusercontent.com/107184933/230274684-a8299a29-e1d0-4c22-a114-4db2f158d755.png)
