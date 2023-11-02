const dummyData = {
  name: 'JayShri',
  email: 'Namo@doe.com',
  merek: 'MyProduct',
  nomor_registrasi: '121121',
  nama_pemilik: 'Adam bosh',
  hubungan_pelapor: 'Car Onwer',
  nama_perusahaan: 'XYZ Corporation',
  pemilik_haki_: 'Tidak (No)',
  website_perusahaan: 'https://www.xyzcorp.com',
  alamat_perusahaan: '123 Main Street, City',
  alamat_email_pemilik_merek: 'jane@xyzcorp.com',
  no_telepon_pelapor: '5551234567',
  link_barang: 'https://www.crop.com/prod123',
  body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took',
  link_barang_banyak: './../../img.png',
  surat_kepemilikan_merek: './../../img.png',
  bukti_surat_kuasa: './../../img.png',
  bukti_surat_izin_usaha: './../../img.png',
};

const data = [];

for (const key in dummyData) {
  let type = 'input';
  if (key === 'body') {
    type = 'textarea';
  } else if (key === 'pemilik_haki_') {
    type = 'radio';
  } else if (
    [
      'link_barang_banyak',
      'surat_kepemilikan_merek',
      'bukti_surat_kuasa',
      'bukti_surat_izin_usaha',
    ].includes(key)
  ) {
    type = 'img';
  }

  data.push({
    type,
    name: key,
    value: dummyData[key],
  });
}

export default data;
