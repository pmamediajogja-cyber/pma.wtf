// JUST BRO THINGS — comedy comic series by PMA Media, published on @imam_falahi.
// Auto-published by the just-bro-things cron. Newest first.
// Images are hosted on Google Drive (public thumbnails); the cron uploads each
// episode's slides to the 'JUST BRO THINGS - TikTok' folder and prepends an
// entry here. Only metadata lives in this repo, so it never fills up.
const comics = [
  {
    id: 'EP 15',
    title: 'BEGADANG REVISI',
    premise: 'Niat tidur cepat buyar gara-gara chat dosen: revisi bab 4 besok pagi — begadang sampai subuh.',
    date: '14 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=10omMEC1kYyfaxEH_Ow7tjbUGlChMGhnp&sz=w1080',
      'https://drive.google.com/thumbnail?id=12i9xEuV9PEgIy9jiCDwt3CoMr2GA1DcU&sz=w1080',
      'https://drive.google.com/thumbnail?id=1zAcRXU4J9jME9P1BTO-kKAOzQwEHpydm&sz=w1080',
      'https://drive.google.com/thumbnail?id=1y2dHTvIVAgC-rlNYB1nKYR7Ln9INlILX&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
  {
    id: 'EP 14',
    title: 'WIFI LEMOT PAS UJIAN',
    premise: 'UAS online SiberMu yg fleksibel berubah jadi perang sinyal: WiFi mati, tethering sebatang, tetangga karaoke, submit detik terakhir.',
    date: '14 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=1zos-5Hqv7Q0xyuIz1VTPXYmjl3l54IZB&sz=w1080',
      'https://drive.google.com/thumbnail?id=1nW_Es56soWI1yk4ynCLDBUTet3pGIM18&sz=w1080',
      'https://drive.google.com/thumbnail?id=1mGdTF2B2B9TJPQ3sMtoREuN9fEAqWxmi&sz=w1080',
      'https://drive.google.com/thumbnail?id=11eVc4uancpS4glKMBsNt01MbzOvUTlN2&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
  {
    id: 'EP 13',
    title: 'SKRIPSI VS KERJA',
    premise: 'Perang dua deadline: bos minta laporan Jumat, dosen minta revisi skripsi Senin — double lembur sampai jam 2 pagi.',
    date: '14 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=1k8AqcUULeGWiitKpW9Hp5rlHOJZEt77d&sz=w1080',
      'https://drive.google.com/thumbnail?id=12ucOnNOv9mlnk_BNnIXzNQk4VLyjRQuQ&sz=w1080',
      'https://drive.google.com/thumbnail?id=1Xe4hYF3jq2TpvonpHYRJ33GgSMdZtyCo&sz=w1080',
      'https://drive.google.com/thumbnail?id=1wZn0_Kne-fEdFlQngP65AaBZBFrKjbml&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
  {
    id: 'EP 12',
    title: 'QRIS ERROR',
    premise: 'Bro eats fried chicken at a warung, finds no QRIS barcode, begs to pay later leaving his KTP while hunting an ATM',
    date: '14 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=15HstagvBB_0gq2p8pkul_nP8gOq-uZ5U&sz=w1080',
      'https://drive.google.com/thumbnail?id=1yFb_2965tJSg15YVg6FR76B7sGcoC8Yo&sz=w1080',
      'https://drive.google.com/thumbnail?id=1gd7qB4FEkTu36MfEvDZzW3yiPM1JFs7T&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
  {
    id: 'EP 11',
    title: 'THE RAIN SUMMONER',
    premise: 'Bro washes his black caferacer until it sparkles, and the moment he finishes the sky opens up — washing your bike is basically a rain ritual.',
    date: '14 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=1y00DqMn1jujt7WrD9Sy3KB8GRJal8k76&sz=w1080',
      'https://drive.google.com/thumbnail?id=1ffnaELrmiridmUNP27ixiEEkEmAXFrmv&sz=w1080',
      'https://drive.google.com/thumbnail?id=1lm39jhD_4C0n3afpTEvL7v34no6vcVNW&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
  {
    id: 'EP 10',
    title: 'THE GYM MEMBERSHIP',
    premise: 'Bro pays for a gym membership and keeps finding excuses — until his only ’workout’ is a mirror selfie.',
    date: '13 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=1Ecf--C0soqW0xaS2b1kKGWTDrRS7D-fI&sz=w1080',
      'https://drive.google.com/thumbnail?id=1xH5vz9MA87jqiHQ9qGZ56dXACP3rVGKN&sz=w1080',
      'https://drive.google.com/thumbnail?id=1EkNCbq7DV6eXQI34w599k0_aWa7Z5ePh&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
  {
    id: 'EP 09',
    title: 'ON MY WAY',
    premise: 'The bro texts ’ON MY WAY!’ while still on the couch, prepares like an athlete in slow motion, and opens the door an hour later to his friend’s deadpan ’AN HOUR, BRO.’',
    date: '13 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=1fp4-FMgq5aKyVVCns1aPn_YnPxZTIScs&sz=w1080',
      'https://drive.google.com/thumbnail?id=1lygTibvTFNezsBh_f4oOsI2f1dOitesk&sz=w1080',
      'https://drive.google.com/thumbnail?id=1vAnK_1fu2vMKTuO6NxllIEBLC7dWRHAc&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
  {
    id: 'EP 08',
    title: 'ONE MORE GAME',
    premise: 'Bro says last game then sleep at midnight, can’t stop until sunrise, joins his 9AM video call as a zombie blaming wifi lag.',
    date: '12 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=1ASKidC_ZeB_-7Amcl9orwFb_1a7xHMa-&sz=w1080',
      'https://drive.google.com/thumbnail?id=1BoNx4MaPqRALD9T7j_sYCSLUd7k1gLqq&sz=w1080',
      'https://drive.google.com/thumbnail?id=18KlE4iSz8GkPQnrVKaxJ_E8gp_NRggcf&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
  {
    id: 'EP 07',
    title: 'THE POCKET LOTTERY',
    premise: 'bro finds forgotten cash in an old jacket pocket and celebrates like he won the lottery',
    date: '12 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=1ZCWIy7vb0SYwpCrBfU0Qpik6HyupFiy2&sz=w1080',
      'https://drive.google.com/thumbnail?id=1RVRo0EWpaxnbM7dFbfLSeh38Zs-ebhBK&sz=w1080',
      'https://drive.google.com/thumbnail?id=1qk7z-RBtSPstHXiaqslf8GUbd3kSI3uq&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
  {
    id: 'EP 06',
    title: 'THE 2AM FRIDGE RAID',
    premise: 'Bro denies hunger at 2AM, raids the fridge for cold chicken, falls asleep with the box on his head.',
    date: '12 OCT 2026',
    slides: [
      'https://drive.google.com/thumbnail?id=1q9AxKRvpeIrTMPR8BkThg9UuSKLadNJl&sz=w1080',
      'https://drive.google.com/thumbnail?id=1eD5YruISr1q52-6pXQWoPgZp_AN4_8ed&sz=w1080',
      'https://drive.google.com/thumbnail?id=1ArPH2u1loQFqrdRF5NCgmwAu1NK4C0Az&sz=w1080',
    ],
    instagram: 'https://www.instagram.com/imam_falahi/',
  },
];

export default comics;
