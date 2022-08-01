# BNMO-UI

## Cara Menjalankan

- Siapkan file `.env` dengan mengkopi template dari file `.env.example` dan value `REACT_APP_APILAYER_API_KEY` diisi dengan apikey yang didapat <a href="https://apilayer.com/account">di sini</a>.

- Untuk menjalankan aplikasi, jalankan perintah berikut pada terminal.

`> npm install`

`> npm start`

## Tech Stack yang digunakan

Tech Stack yang digunakan adalah <strong>React.js</strong> dengan versi node 16.14.2 dan npm 8.5.0.

## Cara Menggunakan Sistem

- Registrasi dan login dapat dilakukan tanpa menggunakan <strong>authorization bearer token</strong>.
- Setelah login sukses, token yang dikirim sebagai response dapat digunakan sebagai <strong>authorization bearer token</strong> dalam pemanggilan API selain registrasi dan login.

## Endpoint yang dibuat

- Admin
1. Melakukan login
2. Melakukan verifikasi akun customer
3. Melakukan verifikasi request penambahan/pengurangan saldo oleh customer
4. Melakukan pencarian data customer

- Customer
1. Melakukan registrasi dan login
2. Melakukan request penambahan/pengurangan saldo
3. Melihat informasi profil dan saldo
4. Melakukan transfer saldo ke rekening lain
5. Melihat riwayat transaksi

## Fitur Tambahan

- Customer
<br>
Melihat riwayat request penambahan/pengurangan saldo beserta status dan waktu verifikasi dari request tersebut