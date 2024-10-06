
const HargaSusu = {
    Dancow: { Besar: 80000, Sedang: 55000, Kecil: 30000 },
    Milo: { Besar: 65000, Kaleng: 70000, Kecil: 25000, Sachet: 25000 },
    Sustagen: { Besar: 100000, Kaleng: 90000, Kecil: 45000, Sachet: 35000 },
    Ovaltine: { Besar: 70000, Kaleng: 60000, Kecil: 30000, Sachet: 30000 },
    Promina: { Besar: 120000, Kaleng: 110000, Kecil: 45000 }
};

let namasusu = document.getElementById("nama-susu");
let radiokemasan = document.getElementsByName("radio-kemasan");
let radioukuran = document.getElementsByName("radio-ukuran");
let btnmulai = document.querySelector(".btn-mulai");
let btnhitung = document.querySelector(".btn-hitung");
let inputJumlahBeli = document.getElementById("input-jumlah-beli");
let inputBayar = document.getElementById("input-bayar");

function itembisadigunakan() {
    namasusu.disabled = false;
    inputJumlahBeli.disabled = false;
    inputBayar.disabled = false;

    for (let i = 0; i < radiokemasan.length; i++) {
        radiokemasan[i].disabled = false;
    }

    for (let j = 0; j < radioukuran.length; j++) {
        radioukuran[j].disabled = false;
    }

    btnhitung.disabled = false;
}

function itemtidakbisadigunakan() {
    namasusu.disabled = true;
    inputJumlahBeli.disabled = true;
    inputBayar.disabled = true;

    for (let i = 0; i < radiokemasan.length; i++) {
        radiokemasan[i].disabled = true;
    }

    for (let j = 0; j < radioukuran.length; j++) {
        radioukuran[j].disabled = true;
    }

    btnhitung.disabled = true;
}

itemtidakbisadigunakan();

btnmulai.addEventListener("click", function () {
    itembisadigunakan();
});

function validateNumberInput(event) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, '');
}

inputJumlahBeli.addEventListener('input', validateNumberInput);
inputBayar.addEventListener('input', validateNumberInput);

btnhitung.addEventListener("click", function () {
    let susu = namasusu.options[namasusu.selectedIndex].text;
    let ukuran = "";
    let kemasan = "";

    for (let i = 0; i < radioukuran.length; i++) {
        if (radioukuran[i].checked) {
            ukuran = radioukuran[i].value;
        }
    }

    for (let j = 0; j < radiokemasan.length; j++) {
        if (radiokemasan[j].checked) {
            kemasan = radiokemasan[j].value;
        }
    }

    let harga = 0;

    switch (susu) {
        case "Dancow":
            harga = HargaSusu.Dancow[ukuran];
            break;
        case "Milo":
            harga = HargaSusu.Milo[ukuran];
            break;
        case "Sustagen":
            harga = HargaSusu.Sustagen[ukuran];
            break;
        case "Ovaltine":
            harga = HargaSusu.Ovaltine[ukuran];
            break;
        case "Promina":
            harga = HargaSusu.Promina[ukuran];
            break;
        default:
            harga = 0;
    }

    let jumlahBeli = parseInt(inputJumlahBeli.value) || 0;
    let totalHarga = harga * jumlahBeli;

    document.getElementById("hasil-harga-susu").innerHTML = `Harga per item: Rp ${harga}`;
    document.getElementById("hasil-total-beli").innerHTML = `Total pembelian: Rp ${totalHarga}`;

    let bayar = parseInt(inputBayar.value) || 0;
    let kembalian = bayar - totalHarga;

    if (kembalian < 0) {
        document.getElementById("hasil-kembali").innerHTML = "Uang yang diberikan tidak cukup.";
    } else {
        document.getElementById("hasil-kembali").innerHTML = `Kembalian: Rp ${kembalian}`;
    }
});