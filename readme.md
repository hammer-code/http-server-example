# http-server-example

## Requirements
- Node JS 8.11+

## Setup

Untuk menjalankan server, lakukan hal berikut:
- Install dependencies `npm install`
- Jalankan server `npm run dev`

## Endpoints

### GET /students

Mendapatkan semua data mahasiswa

### POST /students

Membuat data mahasiswa baru

Request Payload / Body Request: `name`, `email`

### PUT /students/:id

Mengganti seluruh data mahasiswa yang spesifik

Payload: `id`, `name`, `email`

### PATCH /students/:id

Mengubah sebagian data mahasiswa yang spesifik

Payload: `id` atau `name` atau `email`

### GET /students/:id

Mendapatkan data mahasiswa yang spesifik

### DELETE /students/:id

Menghapus data mahasiswa yang spesifik

### GET /students/:id/classes

Mendapatakan data kelas dari mahasiswa yang spesifik
