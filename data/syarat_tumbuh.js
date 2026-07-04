// ============================================================
// Database Syarat Tumbuh Tanaman & Data Iklim Kecamatan
// AgroRaya PDM — Universitas Tanjungpura
// Sumber: FAO, BBSDLP, Direktorat Jenderal Pertanian RI
// Iklim: CHIRPS v2 + ERA5-Land + SRTM + OpenLandMap (GEE 2022–2024)
// ============================================================

// Data iklim & fisik per kecamatan
// dataStatus: 'real' = langsung dari GEE, 'estimasi' = interpolasi regional
const iklimKecamatan = {
  'sungai-raya': {
    curahHujan: 3262, suhu: 26.2, elevasi: 6, kodeTanah: 5,
    namaTanah: 'Silty Clay Loam', dataStatus: 'real'
  },
  'sungai-kakap': {
    curahHujan: 2743, suhu: 26.5, elevasi: 3, kodeTanah: 4,
    namaTanah: 'Clay Loam', dataStatus: 'real'
  },
  'rasau-jaya': {
    curahHujan: 2984, suhu: 26.4, elevasi: 7, kodeTanah: 6,
    namaTanah: 'Sandy Clay Loam', dataStatus: 'real'
  },
  'sungai-ambawang': {
    curahHujan: 3249, suhu: 26.1, elevasi: 8, kodeTanah: 6,
    namaTanah: 'Sandy Clay Loam', dataStatus: 'real'
  },
  'kubu': {
    curahHujan: 2750, suhu: 26.4, elevasi: 2, kodeTanah: 4,
    namaTanah: 'Clay Loam (Gambut)', dataStatus: 'estimasi'
  },
  'batu-ampar': {
    curahHujan: 2620, suhu: 26.6, elevasi: 2, kodeTanah: 5,
    namaTanah: 'Silty Clay Loam (Mangrove)', dataStatus: 'estimasi'
  },
  'teluk-pakedai': {
    curahHujan: 2980, suhu: 26.5, elevasi: 3, kodeTanah: 4,
    namaTanah: 'Clay Loam (Pesisir)', dataStatus: 'estimasi'
  },
  'terentang': {
    curahHujan: 2849, suhu: 26.5, elevasi: 14, kodeTanah: 6,
    namaTanah: 'Sandy Clay Loam', dataStatus: 'real'
  },
  'kuala-mandor': {
    curahHujan: 3040, suhu: 26.4, elevasi: 19, kodeTanah: 6,
    namaTanah: 'Sandy Clay Loam', dataStatus: 'real'
  }
};

// ============================================================
// Database syarat tumbuh per komoditas
// curah_hujan & suhu: { min, optMin, optMax, max }
//   cocok  = nilai dalam [optMin, optMax]
//   batas  = nilai dalam [min, max] tapi di luar optimal
//   tidak  = nilai di luar [min, max]
// elevasi: { min, max } — cocok jika dalam range, tidak jika di luar
// tanah: { cocok: [kode USDA], batas: [kode USDA] }
//   Kode USDA: 1=Clay, 2=SiltyClay, 3=SandyClay,
//              4=ClayLoam, 5=SiltyClayLoam, 6=SandyClayLoam,
//              7=Loam, 8=SiltyLoam, 9=SandyLoam,
//              10=Silt, 11=LoamySand, 12=Sand
// ============================================================
const syaratTumbuhDB = {
  padi_sawah: {
    nama: 'Padi Sawah', icon: '🌾', kategori: 'Tanaman Pangan',
    curah_hujan: { min: 1200, optMin: 1500, optMax: 3000, max: 4000 },
    suhu:        { min: 22,   optMin: 24,   optMax: 30,   max: 35   },
    elevasi:     { min: 0,    max: 1500 },
    tanah:       { cocok: [1,2,4,5,7,8], batas: [3,6] }
  },
  kelapa: {
    nama: 'Kelapa', icon: '🥥', kategori: 'Tanaman Perkebunan',
    curah_hujan: { min: 1300, optMin: 1500, optMax: 2500, max: 5000 },
    suhu:        { min: 20,   optMin: 25,   optMax: 30,   max: 35   },
    elevasi:     { min: 0,    max: 600 },
    tanah:       { cocok: [8,9,11], batas: [4,6,7,12] }
  },
  karet: {
    nama: 'Karet', icon: '🌳', kategori: 'Tanaman Perkebunan',
    curah_hujan: { min: 1500, optMin: 1800, optMax: 2500, max: 4000 },
    suhu:        { min: 22,   optMin: 25,   optMax: 30,   max: 32   },
    elevasi:     { min: 0,    max: 600 },
    tanah:       { cocok: [4,6,7,8], batas: [5,9] }
  },
  sagu: {
    nama: 'Sagu', icon: '🌿', kategori: 'Tanaman Pangan',
    curah_hujan: { min: 2000, optMin: 2500, optMax: 4000, max: 5000 },
    suhu:        { min: 25,   optMin: 27,   optMax: 30,   max: 35   },
    elevasi:     { min: 0,    max: 700 },
    tanah:       { cocok: [1,2,4,5], batas: [7,8,3] }
  },
  pisang: {
    nama: 'Pisang', icon: '🍌', kategori: 'Tanaman Buah',
    curah_hujan: { min: 1200, optMin: 1500, optMax: 2500, max: 4000 },
    suhu:        { min: 20,   optMin: 25,   optMax: 30,   max: 35   },
    elevasi:     { min: 0,    max: 2000 },
    tanah:       { cocok: [4,7,8], batas: [5,6,9] }
  },
  nanas: {
    nama: 'Nanas', icon: '🍍', kategori: 'Tanaman Buah',
    curah_hujan: { min: 1000, optMin: 1500, optMax: 2500, max: 3500 },
    suhu:        { min: 20,   optMin: 23,   optMax: 30,   max: 35   },
    elevasi:     { min: 0,    max: 800 },
    tanah:       { cocok: [6,7,9], batas: [4,5,8,11] }
  },
  pinang: {
    nama: 'Pinang', icon: '🌴', kategori: 'Tanaman Perkebunan',
    curah_hujan: { min: 1500, optMin: 2000, optMax: 3000, max: 4500 },
    suhu:        { min: 22,   optMin: 25,   optMax: 32,   max: 40   },
    elevasi:     { min: 0,    max: 1000 },
    tanah:       { cocok: [4,7,8], batas: [5,6,9,11] }
  },
  kakao: {
    nama: 'Kakao', icon: '🍫', kategori: 'Tanaman Perkebunan',
    curah_hujan: { min: 1500, optMin: 1800, optMax: 2500, max: 3500 },
    suhu:        { min: 20,   optMin: 24,   optMax: 28,   max: 32   },
    elevasi:     { min: 0,    max: 600 },
    tanah:       { cocok: [4,7,8], batas: [5,6,9] }
  },
  jagung: {
    nama: 'Jagung', icon: '🌽', kategori: 'Tanaman Pangan',
    curah_hujan: { min: 1000, optMin: 1200, optMax: 2000, max: 3000 },
    suhu:        { min: 18,   optMin: 24,   optMax: 30,   max: 38   },
    elevasi:     { min: 0,    max: 1800 },
    tanah:       { cocok: [6,7,8,9], batas: [4,5,10] }
  },
  cabai: {
    nama: 'Cabai / Sayuran', icon: '🌶️', kategori: 'Hortikultura',
    curah_hujan: { min: 600,  optMin: 1000, optMax: 2000, max: 3000 },
    suhu:        { min: 20,   optMin: 24,   optMax: 30,   max: 35   },
    elevasi:     { min: 0,    max: 800 },
    tanah:       { cocok: [6,7,8,9], batas: [4,5,10] }
  },
  semangka: {
    nama: 'Semangka', icon: '🍉', kategori: 'Tanaman Buah',
    curah_hujan: { min: 400,  optMin: 600,  optMax: 1200, max: 2000 },
    suhu:        { min: 23,   optMin: 25,   optMax: 33,   max: 38   },
    elevasi:     { min: 0,    max: 1000 },
    tanah:       { cocok: [7,9,11], batas: [6,8,12] }
  },
  kopi_robusta: {
    nama: 'Kopi Robusta', icon: '☕', kategori: 'Tanaman Perkebunan',
    curah_hujan: { min: 1500, optMin: 2000, optMax: 3000, max: 4000 },
    suhu:        { min: 18,   optMin: 22,   optMax: 26,   max: 28   },
    elevasi:     { min: 100,  max: 1500 },
    tanah:       { cocok: [6,7,8], batas: [4,5,9] }
  },
  ubi_kayu: {
    nama: 'Ubi Kayu', icon: '🍠', kategori: 'Tanaman Pangan',
    curah_hujan: { min: 500,  optMin: 1000, optMax: 2000, max: 4000 },
    suhu:        { min: 18,   optMin: 25,   optMax: 30,   max: 35   },
    elevasi:     { min: 0,    max: 1800 },
    tanah:       { cocok: [6,7,9], batas: [4,5,8,11,12] }
  },
  pepaya: {
    nama: 'Pepaya', icon: '🍈', kategori: 'Tanaman Buah',
    curah_hujan: { min: 1200, optMin: 1500, optMax: 2500, max: 3500 },
    suhu:        { min: 22,   optMin: 25,   optMax: 32,   max: 35   },
    elevasi:     { min: 0,    max: 1000 },
    tanah:       { cocok: [6,7,8,9], batas: [4,5,11] }
  },
  jeruk_siam: {
    nama: 'Jeruk Siam', icon: '🍊', kategori: 'Tanaman Buah',
    curah_hujan: { min: 1000, optMin: 1500, optMax: 3000, max: 5000 },
    suhu:        { min: 15,   optMin: 22,   optMax: 30,   max: 35   },
    elevasi:     { min: 0,    max: 1200 },
    tanah:       { cocok: [5,6,7,8], batas: [4,9,10] }
  },
  lada: {
    nama: 'Lada / Merica', icon: '🫙', kategori: 'Tanaman Perkebunan',
    curah_hujan: { min: 2000, optMin: 2500, optMax: 3000, max: 4000 },
    suhu:        { min: 20,   optMin: 24,   optMax: 30,   max: 34   },
    elevasi:     { min: 0,    max: 500 },
    tanah:       { cocok: [6,7,9], batas: [4,8,11] }
  },
  durian: {
    nama: 'Durian', icon: '🌰', kategori: 'Tanaman Buah',
    curah_hujan: { min: 1500, optMin: 2000, optMax: 3000, max: 3500 },
    suhu:        { min: 22,   optMin: 24,   optMax: 30,   max: 33   },
    elevasi:     { min: 0,    max: 800 },
    tanah:       { cocok: [6,7,8], batas: [4,5,9] }
  },
  jahe: {
    nama: 'Jahe', icon: '🌱', kategori: 'Tanaman Biofarmaka',
    curah_hujan: { min: 1500, optMin: 2000, optMax: 3000, max: 4000 },
    suhu:        { min: 19,   optMin: 25,   optMax: 30,   max: 35   },
    elevasi:     { min: 0,    max: 1500 },
    tanah:       { cocok: [6,7,8,9], batas: [4,5,10] }
  },
  daun_bawang: {
    nama: 'Daun Bawang', icon: '🥬', kategori: 'Tanaman Sayuran',
    curah_hujan: { min: 500,  optMin: 800,  optMax: 1500, max: 3000 },
    suhu:        { min: 15,   optMin: 18,   optMax: 26,   max: 32   },
    elevasi:     { min: 0,    max: 2500 },
    tanah:       { cocok: [6,7,8,9], batas: [4,5,10] }
  },
  langsat: {
    nama: 'Langsat', icon: '🍋', kategori: 'Tanaman Buah',
    curah_hujan: { min: 1500, optMin: 2000, optMax: 3000, max: 4000 },
    suhu:        { min: 22,   optMin: 25,   optMax: 32,   max: 38   },
    elevasi:     { min: 0,    max: 800 },
    tanah:       { cocok: [4,5,7,8], batas: [6,9,10] }
  },
  jambu_biji: {
    nama: 'Jambu Biji', icon: '🍐', kategori: 'Tanaman Buah',
    curah_hujan: { min: 1000, optMin: 1500, optMax: 2500, max: 4000 },
    suhu:        { min: 18,   optMin: 25,   optMax: 32,   max: 38   },
    elevasi:     { min: 0,    max: 1500 },
    tanah:       { cocok: [6,7,8,9], batas: [4,5,10,11] }
  },
  alpukat: {
    nama: 'Alpukat', icon: '🥑', kategori: 'Tanaman Buah',
    curah_hujan: { min: 1000, optMin: 1200, optMax: 2000, max: 3000 },
    suhu:        { min: 15,   optMin: 20,   optMax: 28,   max: 33   },
    elevasi:     { min: 0,    max: 2000 },
    tanah:       { cocok: [6,7,8,9], batas: [4,5,10] }
  }
};
