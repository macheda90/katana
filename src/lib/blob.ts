// lib/blob.ts
import { put, del, list } from '@vercel/blob'
import { randomUUID } from 'crypto'

export async function uploadImage(file: File, folder = 'berita') {
    const extension = file.name.split('.').pop()
    const key = `${folder}/${randomUUID()}.${extension}`
    const blob = await put(key, file, {
        access: 'public',
        addRandomSuffix: false, // kita sudah pakai UUID
    })
    return blob.url
}

export async function deleteImage(url: string) {
    if (!url) return
    try {
        await del(url)
    } catch (error) {
        console.error('Gagal hapus gambar dari Blob:', error)
    }
}