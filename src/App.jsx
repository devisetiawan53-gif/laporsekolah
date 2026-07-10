import { useState } from 'react'

function App() {
  const [page, setPage] = useState('beranda') 
  const [role, setRole] = useState('pelapor') // pelapor / admin
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [daftarLaporan, setDaftarLaporan] = useState([])
  const [daftarSaran, setDaftarSaran] = useState([])
  const [showTanggapan, setShowTanggapan] = useState(null)
  
  // state form laporan
  const [anonim, setAnonim] = useState(false)
  const [nama, setNama] = useState('')
  const [status, setStatus] = useState('Siswa')
  const [kelas, setKelas] = useState('')
  const [kategori, setKategori] = useState('Bullying')
  const [prioritas, setPrioritas] = useState('Sedang')
  const [tanggal, setTanggal] = useState('')
  const [waktu, setWaktu] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [judul, setJudul] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [saran, setSaran] = useState('')
  const [tanggapan, setTanggapan] = useState('')

  const handleLogin = () => {
    if(password === 'argomulyo1'){
      setRole('admin')
      setShowLogin(false)
      setPassword('')
      alert('Login berhasil!')
    } else {
      alert('Password salah!')
    }
  }

  const handleLogout = () => {
    setRole('pelapor')
    alert('Logout berhasil!')
  }

  const handleSubmitLaporan = () => {
    if(!anonim && nama === '') return alert('Nama wajib diisi!')
    if(judul === '' || deskripsi === '' || tanggal === '' || waktu === '' || lokasi === '') return alert('Field wajib diisi!')
    
    const laporanBaru = {
      id: Date.now(), anonim, nama, status, kelas, kategori, prioritas, tanggal, waktu, lokasi, judul, deskripsi,
      statusLapor: 'Menunggu', tanggapan: ''
    }
    setDaftarLaporan([laporanBaru, ...daftarLaporan])
    alert('Laporan berhasil dikirim!')
    setPage('beranda')
    setAnonim(false); setNama(''); setJudul(''); setDeskripsi(''); setTanggal(''); setWaktu(''); setLokasi('')
  }

  const handleSubmitSaran = () => {
    if(saran === '') return alert('Saran wajib diisi!')
    setDaftarSaran([{id: Date.now(), isi: saran}, ...daftarSaran])
    setSaran(''); alert('Saran terkirim!')
    setPage('beranda')
  }

  const kirimTanggapan = (id) => {
    if(tanggapan === '') return alert('Tanggapan wajib diisi!')
    setDaftarLaporan(daftarLaporan.map(l => l.id === id ? {...l, tanggapan: tanggapan, statusLapor: 'Selesai'} : l))
    setTanggapan(''); setShowTanggapan(null)
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* HEADER BIRU */}
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-white text-blue-600 font-bold p-2 rounded-lg">🛡️</div>
          <div>
            <h1 className="font-bold">LAPOR SEKOLAH</h1>
            <p className="text-xs">UPT SDN 01 ARGOMULYO</p>
          </div>
        </div>
        
        {role === 'pelapor' ? (
          <button onClick={() => setShowLogin(true)} className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-lg">Login Admin</button>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg">Logout</button>
        )}
      </div>

      {/* KONTEN */}
      <div className="max-w-3xl mx-auto p-4">
        
        {/* BERANDA */}
        {page === 'beranda' && (
          <div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl mb-4">
              <h2 className="text-xl font-bold">Suara Anda Adalah Bagian Dari Kemajuan Sekolah!</h2>
              <p className="text-sm opacity-90">Laporkan masalah dengan aman dan rahasia</p>
            </div>
            <h2 className="font-bold text-lg mb-3">Daftar Laporan ({daftarLaporan.length})</h2>
            {daftarLaporan.length === 0 ? (
              <div className="bg-white p-10 rounded-xl text-center text-gray-400">Belum ada laporan</div>
            ) : (
              daftarLaporan.map(l => (
                <div key={l.id} className="bg-white p-4 rounded-xl shadow-sm mb-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{l.judul}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${l.statusLapor==='Selesai'? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{l.statusLapor}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{l.deskripsi}</p>
                  <p className="text-xs mt-2 text-gray-500">Pelapor: {l.anonim ? 'Anonim' : l.nama} | {l.kategori} | {l.tanggal}</p>
                  {l.tanggapan && <div className="bg-blue-50 border-l-4 border-blue-500 p-2 mt-2 rounded"><b className="text-blue-700 text-sm">Tanggapan:</b> <p className="text-sm">{l.tanggapan}</p></div>}
                  {role === 'admin' && l.statusLapor === 'Menunggu' && <button onClick={() => setShowTanggapan(l.id)} className="bg-blue-500 text-white text-xs px-3 py-1 rounded mt-2">Tanggapi</button>}
                </div>
              ))
            )}
          </div>
        )}

        {/* LAPOR */}
        {page === 'lapor' && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-1">Buat Laporan / Pengaduan Baru</h2>
            <p className="text-center text-gray-500 text-sm mb-6">Silakan isi kejadian secara jujur.</p>
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div><p className="font-semibold">Kirim Sebagai Anonim?</p><p className="text-xs text-gray-500">Nama tidak ditampilkan</p></div>
                <input type="checkbox" checked={anonim} onChange={(e) => setAnonim(e.target.checked)} className="w-5 h-5"/>
              </div>
              {!anonim && <div><label className="font-semibold text-sm">Nama Lengkap Pelapor *</label><input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Contoh: Fahri Ramadhan" className="border rounded-lg p-2 w-full mt-1"/></div>}
              <div className="grid grid-cols-2 gap-4">
                <div><label className="font-semibold text-sm">Status Pelapor *</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-lg p-2 w-full mt-1"><option>Siswa</option><option>Guru</option><option>Orang Tua</option></select></div>
                <div><label className="font-semibold text-sm">Kelas / Bidang</label><input type="text" value={kelas} onChange={(e) => setKelas(e.target.value)} placeholder="XII IPA 2" className="border rounded-lg p-2 w-full mt-1"/></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="font-semibold text-sm">Jenis / Kategori *</label><select value={kategori} onChange={(e) => setKategori(e.target.value)} className="border rounded-lg p-2 w-full mt-1"><option>Bullying</option><option>Sarana Rusak</option><option>Kurikulum</option><option>Lainnya</option></select></div>
                <div><label className="font-semibold text-sm">Tingkat Prioritas *</label><select value={prioritas} onChange={(e) => setPrioritas(e.target.value)} className="border rounded-lg p-2 w-full mt-1"><option>Rendah</option><option>Sedang</option><option>Tinggi</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="font-semibold text-sm">Tanggal Kejadian *</label><input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="border rounded-lg p-2 w-full mt-1"/></div>
                <div><label className="font-semibold text-sm">Waktu Kejadian *</label><input type="time" value={waktu} onChange={(e) => setWaktu(e.target.value)} className="border rounded-lg p-2 w-full mt-1"/></div>
              </div>
              <div><label className="font-semibold text-sm">Lokasi Spesifik *</label><input type="text" value={lokasi} onChange={(e) => setLokasi(e.target.value)} placeholder="Belakang Mushola" className="border rounded-lg p-2 w-full mt-1"/></div>
              <div><label className="font-semibold text-sm">Judul Laporan *</label><input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} className="border rounded-lg p-2 w-full mt-1"/></div>
              <div><label className="font-semibold text-sm">Deskripsi *</label><textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows="4" className="border rounded-lg p-2 w-full mt-1"></textarea></div>
              <button onClick={handleSubmitLaporan} className="bg-blue-600 text-white font-bold w-full py-3 rounded-lg">Kirim Laporan</button>
            </div>
          </div>
        )}

        {/* ASPIRASI */}
        {page === 'aspirasi' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Beri Saran / Aspirasi</h2>
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <textarea value={saran} onChange={(e) => setSaran(e.target.value)} placeholder="Tulis saran Anda untuk kemajuan sekolah..." className="border rounded-lg p-3 h-32 w-full mb-3"></textarea>
              <button onClick={handleSubmitSaran} className="bg-green-600 text-white font-bold w-full py-3 rounded-lg">Kirim Saran</button>
            </div>
            <h3 className="font-bold mt-6 mb-2">Saran Masuk ({daftarSaran.length})</h3>
            {daftarSaran.map(s => <div key={s.id} className="bg-white p-3 rounded mb-2 shadow-sm">{s.isi}</div>)}
          </div>
        )}

        {/* LACAK TIKET */}
        {page === 'lacak' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Lacak Status Laporan</h2>
            {daftarLaporan.length === 0 ? <div className="bg-white p-10 rounded-xl text-center text-gray-400">Belum ada laporan</div> :
            daftarLaporan.map(l => (
              <div key={l.id} className="bg-white p-4 rounded-xl shadow-sm mb-3">
                <p className="font-bold">#{l.id} - {l.judul}</p>
                <p>Status: <span className={`font-bold ${l.statusLapor==='Selesai'? 'text-green-600' : 'text-yellow-600'}`}>{l.statusLapor}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NAVBAR BAWAH */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <button onClick={() => setPage('beranda')} className={`flex flex-col items-center text-xs ${page==='beranda'? 'text-blue-600' : 'text-gray-500'}`}>🏠<span>Beranda</span></button>
        <button onClick={() => setPage('lapor')} className={`flex flex-col items-center text-xs ${page==='lapor'? 'text-blue-600' : 'text-gray-500'}`}>📢<span>Lapor</span></button>
        <button onClick={() => setPage('aspirasi')} className={`flex flex-col items-center text-xs ${page==='aspirasi'? 'text-blue-600' : 'text-gray-500'}`}>💡<span>Aspirasi</span></button>
        <button onClick={() => setPage('lacak')} className={`flex flex-col items-center text-xs ${page==='lacak'? 'text-blue-600' : 'text-gray-500'}`}>📄<span>Lacak</span></button>
        <button className="flex flex-col items-center text-xs text-gray-500">🏫<span>Sekolah</span></button>
      </div>

      {/* POPUP LOGIN */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">Login Kepala Sekolah</h2>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" className="border rounded-lg p-3 w-full mb-3"/>
            <div className="flex gap-3">
              <button onClick={() => setShowLogin(false)} className="bg-gray-200 px-4 py-2 rounded-lg w-full">Batal</button>
              <button onClick={handleLogin} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg w-full">Login</button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">*Password: argomulyo1</p>
          </div>
        </div>
      )}

      {/* POPUP TANGGAPAN */}
      {showTanggapan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Beri Tanggapan</h2>
            <textarea value={tanggapan} onChange={(e) => setTanggapan(e.target.value)} placeholder="Tulis tanggapan..." className="border rounded-lg p-3 h-32 w-full mb-3"></textarea>
            <div className="flex gap-3">
              <button onClick={() => setShowTanggapan(null)} className="bg-gray-200 px-4 py-2 rounded-lg w-full">Batal</button>
              <button onClick={() => kirimTanggapan(showTanggapan)} className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg w-full">Kirim</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App