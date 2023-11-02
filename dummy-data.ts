const dummyData = {
  name: 'John Doe',
  email: 'john@doe.com',
  merek: 'MyProduct',
  nomor_registrasi: '121121',
  nama_pemilik: 'Jane Smith',
  hubungan_pelapor: 'Business Partner',
  nama_perusahaan: 'XYZ Corporation',
  pemilik_haki_: 'Tidak (No)',
  website_perusahaan: 'https://www.xyzcorp.com',
  alamat_perusahaan: '123 Main Street, City',
  alamat_email_pemilik_merek: 'jane@xyzcorp.com',
  no_telepon_pelapor: '5551234567',
  link_barang: 'https://www.xyzcorp.com/product123',
  body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
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
