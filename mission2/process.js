var totalHarga = 0;
    var totalPajak =0;
    var totalBayar =0;

const menus = [
    {
        num :1,
        nama: "Burger 1",
        harga: 35000
    },
    {
        num :2,
        nama: "Burger 2",
        harga: 40000
    },
    {
        num :3,
        nama: "Burger 3",
        harga: 50000
    },
    {
        num :4,
        nama: "Burger 4",
        harga: 45000
    }
];

let listMenus='';

menus.forEach(function(menu) {
	listMenus += 
    `<div id="${menu.num}" class="card" style="width:250px">
    <div class="card-body center-item">
    <img src="gambar-${menu.num}.png" alt="Card image" style="width:200px">
    <h4 class="card-title" id="nama-${menu.num}">${menu.nama}</h4>
    <p class="card-text">Rp <span id ="harga-${menu.num}">${menu.harga}</p>
    <div class="grid-container">
        <button type="button" class="btn btn-primary" onclick='kurangBarang(this)'>-</button>
        <input type="text" name="kuantitas" id="kuantitas-${menu.num}" value="0">
        <button type="button" class="btn btn-primary" onclick='tambahBarang(this)'>+</button>
    </div>
    <button type="button" class="btn btn-success" id="${menu.num}" onclick='tambahOrder(this)'>Tambah Barang</button>
    </div>
    </div>`;
});

document.getElementById("content").innerHTML += listMenus;

function tambahBarang(buttonElement) {
    var inputElement = buttonElement.previousElementSibling;
    var inputId = inputElement.id;

    inputElement.value = parseInt(inputElement.value) + 1;
} 

function kurangBarang(buttonElement) {
    var inputElement = buttonElement.nextElementSibling;
    var inputId = inputElement.id;
    if(parseInt(inputElement.value) >1)
    {
        inputElement.value = parseInt(inputElement.value) - 1;
    }

    
} 

const orders = [];
function tambahOrder(buttonElement) {
    var buttonId = buttonElement.id;
    var button = buttonElement.parentElement.parentElement;

    const namaElem = document.getElementById(`nama-${buttonId}`);
    const hargaElem = document.getElementById(`harga-${buttonId}`);
    const kuantitasElem = document.getElementById(`kuantitas-${buttonId}`);
    const GambarBarang = buttonId;
    const NamaBarang = namaElem.textContent;
    const HargaBarang = hargaElem.textContent;
    const BanyakBarang = kuantitasElem.value;
    const total = HargaBarang*BanyakBarang;

    var found = false;
    var index =0;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].nama === NamaBarang) {
            found = true;
            index = i;
        }
    }

    if (found == true) {
        orders[index].kuantitas += parseInt(BanyakBarang) ;
        orders[index].total = orders[index].kuantitas  * orders[index].harga;
    } 
    else
    {
        orders.push({
            gambar : GambarBarang,
            nama: NamaBarang,
            harga: HargaBarang,
            kuantitas: parseInt(BanyakBarang),
            total:parseInt(HargaBarang)  * parseInt(BanyakBarang)
        });
    }
    
    totalHarga = 0;
    for (let i = 0; i < orders.length; i++) {
        totalHarga += parseInt(orders[i].total);
    }
    totalPajak = 0.11 * totalHarga;
    totalBayar = totalHarga + totalPajak;

    document.getElementById("totalHarga").innerHTML = 'Rp. ' + totalHarga;
    document.getElementById("totalPajak").innerHTML = 'Rp. ' +totalPajak;
    document.getElementById("totalBayar").innerHTML = 'Rp. ' +totalBayar;

        let listOrders = '<ul id="list-orders">';

        orders.forEach(function(order) {
            listOrders += 
            `<li>
            <table>
                <tr>
                    <td rowspan="2">
                        <img class="card-img-cart" src="gambar-${order.gambar}.png" alt="Card image">
                    </td>
                    <td width="300px">
                        ${order.nama} 
                    </td>
                    <td rowspan="2">
                        Rp. ${order.total}
                    </td>
                </tr>
                <tr>
                    <td width="300px">
                        Rp. ${order.harga} x ${order.kuantitas}
                    </td>
                </tr>
            </table>
            <hr />
        </li>`;
        });

        listOrders += '</ul>';

        document.getElementById("order").innerHTML = listOrders;
        console.log(orders);
}

