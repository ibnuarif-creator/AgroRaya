/* ============================================================
   SIG Pertanian Kubu Raya — script.js
   Light Theme · Leaflet Maps · Interactive Modal
   ============================================================ */

// ============================================================
// KOORDINAT KECAMATAN (lat, lng) — Kabupaten Kubu Raya
// ============================================================
const kecamatanCoords = {
  'sungai-raya':      { lat: -0.0522,  lng: 109.3620, zoom: 12 },
  'sungai-kakap':     { lat: -0.1700,  lng: 109.2200, zoom: 12 },
  'rasau-jaya':       { lat: -0.2100,  lng: 109.2750, zoom: 12 },
  'sungai-ambawang':  { lat:  0.0400,  lng: 109.4500, zoom: 12 },
  'kubu':             { lat: -0.3800,  lng: 109.4300, zoom: 11 },
  'batu-ampar':       { lat: -0.1000,  lng: 109.0800, zoom: 11 },
  'teluk-pakedai':    { lat: -0.2600,  lng: 109.1100, zoom: 12 },
  'terentang':        { lat: -0.5300,  lng: 109.3400, zoom: 11 },
  'kuala-mandor':     { lat:  0.1000,  lng: 109.2700, zoom: 12 },
};

// ============================================================
// DATA LENGKAP 9 KECAMATAN
// ============================================================
const kecamatanData = {
  'sungai-raya': {
    number: '01',
    name: 'Sungai Raya',
    tagline: 'Ibu Kota Kabupaten Kubu Raya',
    desc: 'Kecamatan Sungai Raya merupakan pusat pemerintahan Kabupaten Kubu Raya sekaligus kecamatan dengan pertumbuhan ekonomi paling pesat. Berbatasan langsung dengan Kota Pontianak, kecamatan ini menjadi hub utama perdagangan dan pertanian modern di wilayah Kubu Raya. Kawasan ini dikenal sebagai sentra penghasil nanas dan berbagai komoditas hortikultura.',
    stats: [
      { val: '±742 km²', key: 'Luas Wilayah' },
      { val: '17 Desa', key: 'Jumlah Desa' },
      { val: '~300 rb', key: 'Penduduk' },
      { val: 'Sungai Raya', key: 'Ibu Kota' }
    ],
    commodities: [
      { icon: '🍍', name: 'Nanas' }, { icon: '🌾', name: 'Padi Sawah' },
      { icon: '🌽', name: 'Jagung Manis' }, { icon: '🌶️', name: 'Cabai Rawit' },
      { icon: '🥦', name: 'Hortikultura' }, { icon: '🫐', name: 'Terong' }
    ],
    data: [
      { key: 'Kode Pos', val: '78234–78391' }, { key: 'Letak', val: 'Berbatasan Pontianak' },
      { key: 'Topografi', val: 'Dataran Rendah' }, { key: 'Sungai Utama', val: 'Sungai Raya' }
    ],
    potensi: [
      'Sentra produksi nanas terbesar di Kalimantan Barat dengan kualitas ekspor.',
      'Pengembangan kawasan agrowisata berbasis pertanian modern.',
      'Akses infrastruktur terbaik di antara 9 kecamatan untuk distribusi hasil pertanian.',
      'Potensi pengembangan industri pengolahan hasil pertanian (agroindustri).',
      'Pasar lokal dan regional yang kuat sebagai penopang ekonomi pertanian.'
    ]
  },
  'sungai-kakap': {
    number: '02',
    name: 'Sungai Kakap',
    tagline: 'Sentra Kelapa & Pinang Pesisir',
    desc: 'Kecamatan Sungai Kakap terletak di wilayah pesisir barat Kabupaten Kubu Raya, berbatasan langsung dengan Laut Natuna dan Selat Karimata. Daerah ini memiliki potensi besar dalam pertanian perkebunan terutama kelapa dan pinang, didukung oleh jaringan sungai dan rawa yang membentuk ekosistem unik bagi pertanian pasang surut.',
    stats: [
      { val: '±508 km²', key: 'Luas Wilayah' }, { val: '14 Desa', key: 'Jumlah Desa' },
      { val: '~68 rb', key: 'Penduduk' }, { val: 'Sungai Kakap', key: 'Ibu Kota' }
    ],
    commodities: [
      { icon: '🥥', name: 'Kelapa' }, { icon: '🌴', name: 'Pinang' },
      { icon: '🌾', name: 'Padi Pasut' }, { icon: '🐟', name: 'Perikanan' },
      { icon: '🫚', name: 'Minyak Kelapa' }, { icon: '🌱', name: 'Sagu' }
    ],
    data: [
      { key: 'Kode Pos', val: '78380' }, { key: 'Letak', val: 'Wilayah Pesisir' },
      { key: 'Topografi', val: 'Rawa & Pasang Surut' }, { key: 'Sungai Utama', val: 'Sungai Kakap' }
    ],
    potensi: [
      'Perkebunan kelapa seluas ribuan hektar dengan produksi kopra dan minyak kelapa.',
      'Industri turunan pinang untuk ekspor ke pasar Asia Selatan dan Asia Tenggara.',
      'Pertanian padi pasang surut dengan sistem tata air yang unik.',
      'Potensi ekowisata mangrove dan wisata sungai yang belum dikembangkan optimal.',
      'Perikanan budidaya dan tangkap sebagai pendukung ekonomi masyarakat pesisir.'
    ]
  },
  'rasau-jaya': {
    number: '03',
    name: 'Rasau Jaya',
    tagline: 'Kawasan Transmigrasi yang Produktif',
    desc: 'Kecamatan Rasau Jaya adalah salah satu kawasan transmigrasi yang paling berhasil di Kalimantan Barat. Dibuka sejak era 1970-an, kecamatan ini kini berkembang menjadi kawasan pertanian yang produktif dengan lahan gambut yang telah dikelola secara berkelanjutan. Buah semangka dan kelapa menjadi produk andalan yang diekspor ke berbagai daerah.',
    stats: [
      { val: '±243 km²', key: 'Luas Wilayah' }, { val: '5 Desa', key: 'Jumlah Desa' },
      { val: '~42 rb', key: 'Penduduk' }, { val: 'Rasau Jaya', key: 'Ibu Kota' }
    ],
    commodities: [
      { icon: '🍉', name: 'Semangka' }, { icon: '🥥', name: 'Kelapa' },
      { icon: '🌾', name: 'Padi' }, { icon: '🥜', name: 'Kacang Tanah' },
      { icon: '🫑', name: 'Sayuran' }, { icon: '🌽', name: 'Jagung' }
    ],
    data: [
      { key: 'Kode Pos', val: '78381–78382' }, { key: 'Letak', val: 'Kawasan Transmigrasi' },
      { key: 'Topografi', val: 'Lahan Gambut' }, { key: 'Sungai Utama', val: 'Sungai Rasau' }
    ],
    potensi: [
      'Model pertanian lahan gambut berkelanjutan yang dapat dijadikan percontohan nasional.',
      'Produksi semangka berkualitas tinggi dengan akses pasar ke Pontianak dan Kalbar.',
      'Kawasan pertanian terpadu dengan sistem irigasi teknis yang relatif mapan.',
      'Agrowisata transmigrasi yang memadukan sejarah dan potensi pertanian modern.',
      'Pengembangan pertanian organik pada lahan gambut yang ramah lingkungan.'
    ]
  },
  'sungai-ambawang': {
    number: '04',
    name: 'Sungai Ambawang',
    tagline: 'Pengembangan Kopi Robusta Kalimantan',
    desc: 'Kecamatan Sungai Ambawang dikenal sebagai kawasan dengan potensi pengembangan kopi robusta yang signifikan di Kalimantan Barat. Letaknya yang berbatasan dengan Kabupaten Kubu Raya bagian timur menjadikan kecamatan ini memiliki variasi topografi yang mendukung diversifikasi tanaman pertanian, dari tanaman pangan hingga tanaman tahunan bernilai tinggi.',
    stats: [
      { val: '±727 km²', key: 'Luas Wilayah' }, { val: '16 Desa', key: 'Jumlah Desa' },
      { val: '~57 rb', key: 'Penduduk' }, { val: 'Sei Ambawang', key: 'Ibu Kota' }
    ],
    commodities: [
      { icon: '☕', name: 'Kopi Robusta' }, { icon: '🌽', name: 'Jagung' },
      { icon: '🌶️', name: 'Cabai' }, { icon: '🌾', name: 'Padi' },
      { icon: '🥬', name: 'Sayuran Daun' }, { icon: '🍫', name: 'Kakao' }
    ],
    data: [
      { key: 'Kode Pos', val: '78393' }, { key: 'Letak', val: 'Perbatasan Timur' },
      { key: 'Topografi', val: 'Berbukit–Dataran' }, { key: 'Sungai Utama', val: 'Sungai Ambawang' }
    ],
    potensi: [
      'Pengembangan sentra kopi robusta dengan target ekspor ke pasar Eropa dan Asia.',
      'Diversifikasi pertanian dengan kakao sebagai tanaman bernilai tinggi.',
      'Peningkatan produktivitas jagung untuk mendukung industri pakan ternak lokal.',
      'Kawasan pengembangan pertanian terpadu dengan dukungan perguruan tinggi.',
      'Potensi wisata kebun kopi dan edukasi pertanian kopi tropika.'
    ]
  },
  'kubu': {
    number: '05',
    name: 'Kubu',
    tagline: 'Kelapa Hibrida & Gula Merah Gambut',
    desc: 'Kecamatan Kubu merupakan kecamatan terluas kedua di Kabupaten Kubu Raya dengan luas sekitar 1.211,60 km². Wilayah ini sebagian besar berupa lahan gambut yang dimanfaatkan untuk pertanian perkebunan. Kelapa hibrida menjadi komoditas unggulan dengan produk turunan berupa gula merah dan gula semut yang memiliki nilai jual tinggi di pasar domestik dan internasional.',
    stats: [
      { val: '±1.212 km²', key: 'Luas Wilayah' }, { val: '20 Desa', key: 'Jumlah Desa' },
      { val: '~47 rb', key: 'Penduduk' }, { val: 'Kubu', key: 'Ibu Kota' }
    ],
    commodities: [
      { icon: '🥥', name: 'Kelapa Hibrida' }, { icon: '🍬', name: 'Gula Merah' },
      { icon: '🌿', name: 'Gula Semut' }, { icon: '🌾', name: 'Padi Gambut' },
      { icon: '🐄', name: 'Peternakan' }, { icon: '🐟', name: 'Perikanan Rawa' }
    ],
    data: [
      { key: 'Kode Pos', val: '78384' }, { key: 'Letak', val: 'Wilayah Tengah-Barat' },
      { key: 'Topografi', val: 'Lahan Gambut Dalam' }, { key: 'Sungai Utama', val: 'Sungai Kubu' }
    ],
    potensi: [
      'Produksi kelapa hibrida dengan rendemen tinggi untuk industri minyak kelapa murni.',
      'Gula semut organik sebagai produk premium dengan pasar ekspor ke Eropa dan Jepang.',
      'Pengelolaan lahan gambut berkelanjutan sebagai program unggulan pemerintah.',
      'Wisata alam gambut dan konservasi ekosistem gambut tropis.',
      'Pengembangan budi daya ikan dalam lahan gambut (fish peat culture).'
    ]
  },
  'batu-ampar': {
    number: '06',
    name: 'Batu Ampar',
    tagline: 'Wilayah Pesisir Kalimantan Barat',
    desc: 'Kecamatan Batu Ampar terletak di wilayah paling barat laut Kabupaten Kubu Raya, berbatasan langsung dengan Laut Natuna dan Kabupaten Mempawah. Wilayah ini memiliki ekosistem mangrove yang luas dan merupakan kawasan konservasi penting. Masyarakat setempat menggabungkan pertanian dengan perikanan sebagai mata pencaharian utama.',
    stats: [
      { val: '±1.680 km²', key: 'Luas Wilayah' }, { val: '17 Desa', key: 'Jumlah Desa' },
      { val: '~30 rb', key: 'Penduduk' }, { val: 'Batu Ampar', key: 'Ibu Kota' }
    ],
    commodities: [
      { icon: '🥥', name: 'Kelapa' }, { icon: '🌿', name: 'Sagu' },
      { icon: '🐟', name: 'Perikanan Laut' }, { icon: '🦐', name: 'Udang' },
      { icon: '🌾', name: 'Padi Pasut' }, { icon: '🦀', name: 'Kepiting' }
    ],
    data: [
      { key: 'Kode Pos', val: '78385' }, { key: 'Letak', val: 'Pesisir Barat Laut' },
      { key: 'Topografi', val: 'Rawa Mangrove' }, { key: 'Sungai Utama', val: 'Sungai Batu Ampar' }
    ],
    potensi: [
      'Kawasan mangrove terluas di Kubu Raya dengan potensi karbon biru (blue carbon) tinggi.',
      'Silvofishery — integrasi hutan mangrove dengan budi daya ikan dan udang.',
      'Pengembangan wisata bahari dan ekowisata mangrove bertaraf internasional.',
      'Produksi sagu sebagai bahan pangan alternatif dan bahan baku industri.',
      'Sentra perikanan tangkap dan budi daya udang vaname di wilayah pesisir.'
    ]
  },
  'teluk-pakedai': {
    number: '07',
    name: 'Teluk Pakedai',
    tagline: 'Potensi Perairan & Pertanian Pesisir',
    desc: 'Kecamatan Teluk Pakedai adalah salah satu kecamatan kepulauan di Kabupaten Kubu Raya yang terdiri dari daratan dan pulau-pulau kecil. Letak geografisnya yang strategis di pesisir Kalimantan Barat menjadikannya kawasan yang kaya akan sumber daya perairan. Pertanian sagu dan kelapa menjadi tulang punggung ekonomi masyarakat.',
    stats: [
      { val: '±506 km²', key: 'Luas Wilayah' }, { val: '10 Desa', key: 'Jumlah Desa' },
      { val: '~27 rb', key: 'Penduduk' }, { val: 'Teluk Pakedai', key: 'Ibu Kota' }
    ],
    commodities: [
      { icon: '🌿', name: 'Sagu' }, { icon: '🥥', name: 'Kelapa' },
      { icon: '🐟', name: 'Perikanan' }, { icon: '🦐', name: 'Udang' },
      { icon: '🌾', name: 'Padi' }, { icon: '🐚', name: 'Kerang' }
    ],
    data: [
      { key: 'Kode Pos', val: '78383' }, { key: 'Letak', val: 'Kepulauan Pesisir' },
      { key: 'Topografi', val: 'Rawa & Kepulauan' }, { key: 'Perairan', val: 'Selat Karimata' }
    ],
    potensi: [
      'Produksi tepung sagu sebagai komoditas pangan alternatif bernilai strategis.',
      'Budi daya perikanan laut dan tambak dalam skala menengah.',
      'Potensi wisata bahari dengan pemandangan khas pulau-pulau pesisir Kalimantan.',
      'Pengembangan kuliner khas berbahan sagu dan hasil laut sebagai daya tarik wisata.',
      'Energi terbarukan berbasis biomassa sagu untuk kemandirian energi lokal.'
    ]
  },
  'terentang': {
    number: '08',
    name: 'Terentang',
    tagline: 'Kawasan Hutan & Perkebunan Karet',
    desc: 'Kecamatan Terentang terletak di bagian selatan Kabupaten Kubu Raya, berbatasan dengan Kabupaten Ketapang. Dengan tutupan hutan yang masih cukup luas, kecamatan ini menjadi salah satu penyangga ekosistem penting di Kalimantan Barat. Pertanian karet dan kelapa menjadi sumber penghidupan utama bagi masyarakat yang sebagian besar bermukim di sepanjang sungai.',
    stats: [
      { val: '±1.270 km²', key: 'Luas Wilayah' }, { val: '14 Desa', key: 'Jumlah Desa' },
      { val: '~18 rb', key: 'Penduduk' }, { val: 'Terentang', key: 'Ibu Kota' }
    ],
    commodities: [
      { icon: '🌳', name: 'Karet' }, { icon: '🥥', name: 'Kelapa' },
      { icon: '🌾', name: 'Padi Ladang' }, { icon: '🍌', name: 'Pisang' },
      { icon: '🌿', name: 'Rotan' }, { icon: '🍯', name: 'Madu Hutan' }
    ],
    data: [
      { key: 'Kode Pos', val: '78392' }, { key: 'Letak', val: 'Perbatasan Ketapang' },
      { key: 'Topografi', val: 'Berbukit & Hutan' }, { key: 'Sungai Utama', val: 'Sungai Terentang' }
    ],
    potensi: [
      'Perkebunan karet rakyat dengan potensi peningkatan produktivitas melalui klon unggul.',
      'Hasil hutan bukan kayu (HHBK) seperti rotan dan madu hutan sebagai produk premium.',
      'Ekowisata hutan tropis Kalimantan yang masih terjaga keasliannya.',
      'Pengembangan pertanian organik padi ladang berbasis kearifan lokal Dayak.',
      'Budidaya lebah madu hutan sebagai alternatif sumber pendapatan berkelanjutan.'
    ]
  },
  'kuala-mandor': {
    number: '09',
    name: 'Kuala Mandor B',
    tagline: 'Pengembangan Pertanian Organik',
    desc: 'Kecamatan Kuala Mandor B merupakan kecamatan di bagian utara Kabupaten Kubu Raya yang berbatasan dengan Kabupaten Mempawah. Kecamatan ini memiliki potensi pertanian yang beragam, dari tanaman pangan padi hingga perkebunan karet. Upaya pengembangan pertanian organik mulai digalakkan untuk meningkatkan nilai produk dan kesejahteraan petani.',
    stats: [
      { val: '±396 km²', key: 'Luas Wilayah' }, { val: '10 Desa', key: 'Jumlah Desa' },
      { val: '~25 rb', key: 'Penduduk' }, { val: 'Kuala Mandor', key: 'Ibu Kota' }
    ],
    commodities: [
      { icon: '🌳', name: 'Karet' }, { icon: '🥬', name: 'Sayuran Organik' },
      { icon: '🌾', name: 'Padi Organik' }, { icon: '🥕', name: 'Umbi-umbian' },
      { icon: '🫘', name: 'Kedelai' }, { icon: '🌻', name: 'Bunga Matahari' }
    ],
    data: [
      { key: 'Kode Pos', val: '78355' }, { key: 'Letak', val: 'Perbatasan Mempawah' },
      { key: 'Topografi', val: 'Berbukit Rendah' }, { key: 'Sungai Utama', val: 'Sungai Mandor' }
    ],
    potensi: [
      'Pertanian organik bersertifikat dengan potensi pasar premium di Pontianak dan ekspor.',
      'Kawasan sekitar Cagar Alam Mandor sebagai daya tarik ekowisata dan penelitian.',
      'Perkebunan karet rakyat yang dapat ditingkatkan dengan teknologi budidaya modern.',
      'Pengembangan desa wisata agro berbasis kearifan lokal masyarakat setempat.',
      'Budidaya sayuran organik untuk memenuhi permintaan pasar modern Pontianak.'
    ]
  }
};

// ============================================================
// CUSTOM LEAFLET MARKER ICON
// ============================================================
function createMarkerIcon(color = '#2B7A4E', label = '') {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="46" viewBox="0 0 36 46">
      <filter id="shadow" x="-30%" y="-20%" width="160%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.5)"/>
      </filter>
      <path d="M18 1C9.163 1 2 8.163 2 17c0 10.75 16 28 16 28S34 27.75 34 17C34 8.163 26.837 1 18 1z"
        fill="${color}" filter="url(#shadow)"/>
      <circle cx="18" cy="17" r="7.5" fill="rgba(3,12,6,0.92)"/>
      <text x="18" y="21" text-anchor="middle" font-size="8" font-weight="800"
        font-family="Outfit,sans-serif" fill="#4CA872">${label}</text>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [36, 46],
    iconAnchor: [18, 46],
    popupAnchor: [0, -46]
  });
}

// ============================================================
// PETA IMAGE MAP
// ============================================================
const petaImages = {
  'sungai-raya':     'gambar/Peta_Sungai_Raya.png',
  'sungai-kakap':    'gambar/Peta_Sungai_Kakap.png',
  'rasau-jaya':      'gambar/Peta_Rasau_Jaya.png',
  'sungai-ambawang': 'gambar/Peta_Sungai_Ambawang.png',
  'kubu':            'gambar/Peta_Kubu.png',
  'batu-ampar':      'gambar/Peta_Batu_Ampar.png',
  'teluk-pakedai':   'gambar/Peta_Teluk_Pakedai.png',
  'terentang':       'gambar/Peta_Terentang.png',
  'kuala-mandor':    'gambar/Peta_Kuala_Mandor_B.png',
};

// ============================================================
// MODAL LEAFLET MAP INSTANCE
// ============================================================
let modalMap = null;
let modalMapMarker = null;
let modalMapCircle = null;

function initOrUpdateModalMap(kecId) {
  try {
    const coords = kecamatanCoords[kecId];
    const d = kecamatanData[kecId];
    if (!coords || !d) return;

    // Update coordinate badge (overlay on map)
    const badge = document.getElementById('mapCoordBadge');
    if (badge) {
      const latDir = coords.lat < 0 ? 'LS' : 'LU';
      const latVal = Math.abs(coords.lat).toFixed(4);
      const lngVal = coords.lng.toFixed(4);
      badge.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
        ${latVal}\u00b0 ${latDir} \u00b7 ${lngVal}\u00b0 BT
      `;
    }

    // Populate coord info bar below map
    const bar = document.getElementById('coordInfoBar');
    if (bar) {
      const latDir  = coords.lat < 0 ? 'Lintang Selatan' : 'Lintang Utara';
      const latSym  = coords.lat < 0 ? 'LS' : 'LU';
      const latVal  = Math.abs(coords.lat).toFixed(4);
      const lngVal  = coords.lng.toFixed(4);
      bar.innerHTML = `
        <div class="coord-box">
          <div class="coord-box-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
              <polyline points="12,2 15,6 12,10 9,6 12,2"/>
            </svg>
          </div>
          <div class="coord-box-label">${latDir}</div>
          <div class="coord-box-value">${latVal}\u00b0</div>
          <div class="coord-box-sub">${latSym} \u00b7 Komponen Vertikal</div>
        </div>
        <div class="coord-box">
          <div class="coord-box-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="2" y1="12" x2="22" y2="12"/>
              <polyline points="22,12 18,9 14,12 18,15 22,12"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div class="coord-box-label">Bujur Timur</div>
          <div class="coord-box-value">${lngVal}\u00b0</div>
          <div class="coord-box-sub">BT \u00b7 Komponen Horizontal</div>
        </div>
        <div class="coord-box">
          <div class="coord-box-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <div class="coord-box-label">Sistem Koordinat</div>
          <div class="coord-box-value">49S \u00b7 UTM</div>
          <div class="coord-box-sub">WGS 84 \u00b7 Kalimantan Barat</div>
        </div>
      `;
    }

    // Init Leaflet map if not yet created
    if (!modalMap) {
      modalMap = L.map('modalLeafletMap', {
        center: [coords.lat, coords.lng],
        zoom: coords.zoom,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '\u00a9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> \u00a9 <a href="https://carto.com/">CARTO</a>',
        maxZoom: 18,
      }).addTo(modalMap);
    } else {
      modalMap.setView([coords.lat, coords.lng], coords.zoom, { animate: true });
    }

    // Remove old marker / circle
    if (modalMapMarker) { modalMap.removeLayer(modalMapMarker); }
    if (modalMapCircle) { modalMap.removeLayer(modalMapCircle); }

    // Add pulsing circle
    modalMapCircle = L.circle([coords.lat, coords.lng], {
      radius: 3500,
      color: '#2B7A4E',
      fillColor: '#4CA872',
      fillOpacity: 0.14,
      weight: 2
    }).addTo(modalMap);

    // Add custom marker
    const icon = createMarkerIcon('#2B7A4E', d.number);
    modalMapMarker = L.marker([coords.lat, coords.lng], { icon })
      .addTo(modalMap)
      .bindPopup(`<strong>${d.name}</strong><br/>Kecamatan ${d.number}`, { maxWidth: 200 })
      .openPopup();

    // Force re-render after visibility change
    setTimeout(() => { if (modalMap) modalMap.invalidateSize(); }, 150);
  } catch (e) {
    console.warn('Modal map error:', e);
  }
}

// ============================================================
// HERO MAP — Full-screen Leaflet
// ============================================================
function initHeroMap() {
  try {
    const heroMap = L.map('heroMap', {
      center: [-0.18, 109.30],
      zoom: 10,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      keyboard: false,
      attributionControl: true
    });

    // CartoDB Dark Matter — modern dark map
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '\u00a9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> \u00a9 <a href="https://carto.com/">CARTO</a>',
      maxZoom: 18
    }).addTo(heroMap);

    // Add all 9 kecamatan markers on hero map
    Object.entries(kecamatanCoords).forEach(([kecId, coord]) => {
      const d = kecamatanData[kecId];
      const smallIcon = L.divIcon({
        html: `
          <div style="
            width:28px; height:28px;
            background: #2B7A4E;
            border: 2px solid rgba(255,255,255,0.85);
            border-radius: 50%;
            display:flex; align-items:center; justify-content:center;
            font-size:9px; font-weight:700; color:#F0FDF4;
            font-family:'Space Grotesk',sans-serif;
            box-shadow: 0 0 10px rgba(43,122,78,0.60), 0 2px 8px rgba(0,0,0,0.5);
            cursor:pointer;
          ">${d.number}</div>
        `,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -18]
      });

      L.marker([coord.lat, coord.lng], { icon: smallIcon })
        .addTo(heroMap)
        .bindPopup(`<strong>${d.name}</strong>`, { maxWidth: 160, closeButton: false });
    });

    // Approximate Kubu Raya boundary outline
    const kubuRayaBounds = [
      [-0.65, 108.90], [-0.65, 109.65],
      [0.22, 109.65],  [0.22, 108.90]
    ];
    L.polygon(kubuRayaBounds, {
      color: '#4CA872',
      weight: 1.5,
      fillColor: '#2B7A4E',
      fillOpacity: 0.07,
      dashArray: '8, 6'
    }).addTo(heroMap);

    // Label
    L.marker([-0.18, 109.30], {
      icon: L.divIcon({
        html: `<div style="font-weight:700;font-size:13px;color:#B8DFCB;font-family:'Space Grotesk',sans-serif;text-shadow:0 0 16px rgba(43,122,78,0.9),0 2px 8px rgba(0,0,0,0.95);letter-spacing:0.06em;white-space:nowrap;">Kabupaten Kubu Raya</div>`,
        className: '',
        iconAnchor: [80, 10]
      })
    }).addTo(heroMap);
  } catch (e) {
    console.warn('Hero map could not be initialized:', e);
    // Fallback: show a gradient background
    const heroMapEl = document.getElementById('heroMap');
    if (heroMapEl) {
      heroMapEl.style.background = 'linear-gradient(160deg, #c8e6c9 0%, #e8f5e9 100%)';
    }
  }
}

// ============================================================
// NAVBAR SCROLL
// ============================================================
function initNavbar() {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  }, { passive: true });
}

// ============================================================
// HAMBURGER MENU
// ============================================================
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ============================================================
// CARD STAGGER
// ============================================================
function initCardStagger() {
  const cards = document.querySelectorAll('.kec-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const idx = [...cards].indexOf(card);
        setTimeout(() => card.classList.add('visible'), idx * 75);
        obs.unobserve(card);
      }
    });
  }, { threshold: 0.08 });
  cards.forEach(c => obs.observe(c));
}

// ============================================================
// CARD CLICK → MODAL
// ============================================================
function initCardClicks() {
  document.querySelectorAll('.kec-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.kec));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.kec); }
    });
  });
}

// ============================================================
// MODAL OPEN / CLOSE
// ============================================================
function openModal(kecId) {
  const d = kecamatanData[kecId];
  if (!d) return;

  // --- Populate text content ---
  document.getElementById('modalNumber').textContent  = `Kecamatan · ${d.number}`;
  document.getElementById('modalTitle').textContent   = d.name;
  document.getElementById('modalTagline').textContent = d.tagline;
  document.getElementById('modalDesc').textContent    = d.desc;

  // Tampilkan gambar peta kecamatan di header modal
  const modalIconEl = document.getElementById('modalMapIcon');
  modalIconEl.innerHTML = '';
  const petaSrc = petaImages[kecId];
  if (petaSrc) {
    const img = document.createElement('img');
    img.src = petaSrc;
    img.alt = `Peta ${kecamatanData[kecId]?.name || kecId}`;
    modalIconEl.appendChild(img);
  }

  // Stats
  document.getElementById('modalStatsRow').innerHTML = d.stats.map(s => `
    <div class="modal-stat">
      <div class="modal-stat-val">${s.val}</div>
      <div class="modal-stat-key">${s.key}</div>
    </div>
  `).join('');

  // Commodities
  document.getElementById('modalCommodities').innerHTML = d.commodities.map(c => `
    <span class="comm-badge">${c.icon} ${c.name}</span>
  `).join('');

  // Data rows
  document.getElementById('modalDataGrid').innerHTML = d.data.map(row => `
    <div class="data-row">
      <span class="data-key">${row.key}</span>
      <span class="data-val">${row.val}</span>
    </div>
  `).join('');

  // Potensi
  document.getElementById('modalPotensi').innerHTML = d.potensi.map(p => `<li>${p}</li>`).join('');

  // Open overlay
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalBox').scrollTop = 0;

  // Init/update Leaflet map inside modal
  initOrUpdateModalMap(kecId);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initModal() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================
function initCounters() {
  const items = document.querySelectorAll('.stat-number[data-target]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  items.forEach(el => obs.observe(el));
}

function animateCounter(el) {
  if (el.classList.contains('stat-static')) return;
  const target = parseInt(el.dataset.target, 10);
  const start  = target > 1900 ? target - 12 : 0;
  const duration = 1800;
  const step = 16;
  const increment = (target - start) / (duration / step);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString('id-ID');
  }, step);
}

// ============================================================
// INIT
// ============================================================
function initCardImages() {
  document.querySelectorAll('.kec-map-icon').forEach(icon => {
    const bg = document.createElement('div');
    bg.className = 'kec-img';
    icon.prepend(bg);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCardImages();
  initHeroMap();
  initNavbar();
  initHamburger();
  initReveal();
  initCardStagger();
  initCardClicks();
  initModal();
  initCounters();
});
