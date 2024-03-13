import { createRouter, createWebHistory } from 'vue-router'
import DashboardViewVue from '@/views/DashboardView.vue'
import KatalogViewVue from '@/views/KatalogView.vue'
import AnggotaViewVue from '@/views/AnggotaView.vue'
import UsulanBukuViewVue from '@/views/UsulanBukuView.vue'
import UmpanBalikViewVue from '@/views/UmpanBalikView.vue'
import LaporanMasalahViewVue from '@/views/LaporanMasalahView.vue'
import GuestLayoutVue from '@/layouts/GuestLayout.vue'
import AuthLayoutVue from '@/layouts/AuthLayout.vue'
import PinjamKembaliViewVue from '@/views/PinjamKembaliView.vue'
import NotFoundViewVue from '@/views/NotFoundView.vue'
import DaftarKunjunganView from '@/views/DaftarKunjunganView.vue'
import RiwayatPeminjamanViewVue from '@/views/RiwayatPeminjamanView.vue'
import RiwayatDendaViewVue from '@/views/RiwayatDendaView.vue'
import KonfigurasiViewVue from '@/views/KonfigurasiView.vue'
import PengumumanViewVue from '@/views/PengumumanView.vue'
import LoginAdminViewVue from '@/views/LoginAdminView.vue'
import LoginPustakawanViewVue from '@/views/LoginPustakawanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Guest',
      component: GuestLayoutVue,
      redirect: '/login-pustakawan',
      children: [
        {
          path: '/login-admin',
          name: 'Login Admin',
          component: LoginAdminViewVue
        },
        {
          path: '/login-pustakawan',
          name: 'Login Pustakawan',
          component: LoginPustakawanViewVue
        },
        {
          path: '/daftar-kunjungan',
          name: 'Daftar Kunjungan',
          component: DaftarKunjunganView
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'Not Found',
          component: NotFoundViewVue
        }
      ]
    },
    {
      path: '/',
      name: 'Auth',
      component: AuthLayoutVue,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: DashboardViewVue
        },
        {
          path: '/pinjam',
          name: 'Pinjam Kembali',
          component: PinjamKembaliViewVue
        },
        {
          path: '/katalog',
          name: 'Katalog',
          component: KatalogViewVue
        },
        {
          path: '/anggota',
          name: 'Anggota',
          component: AnggotaViewVue
        },
        {
          path: '/riwayat-denda',
          name: 'Riwayat Denda',
          component: RiwayatDendaViewVue
        },
        {
          path: '/riwayat-peminjaman',
          name: 'Riwayat Peminjaman',
          component: RiwayatPeminjamanViewVue
        },
        {
          path: '/usulan-buku',
          name: 'Usulan Buku',
          component: UsulanBukuViewVue
        },
        {
          path: '/umpan-balik',
          name: 'Umpan Balik',
          component: UmpanBalikViewVue
        },
        {
          path: '/laporan-masalah',
          name: 'Laporan Masalah',
          component: LaporanMasalahViewVue
        },
        {
          path: '/konfigurasi',
          name: 'Konfigurasi',
          component: KonfigurasiViewVue
        },
        {
          path: '/pengumuman',
          name: 'Pengumuman',
          component: PengumumanViewVue
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'Not Found',
          component: NotFoundViewVue
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `E-Perpus | ${to.name}`
  next()
})

export default router
