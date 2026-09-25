let cart = [];

function addToCart(name, price, img = "images/burger.png") {
  let item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1, img });
  }

  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart-items");
  cartDiv.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div class="item-info">
          <h4>${item.name} (${item.qty}x)</h4>
          <p>• Extra Sauce</p>
        </div>
        <div class="item-right">
          <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
      </div>
    `;
  });

  let tax = subtotal * 0.1;
  let total = subtotal + tax;

  document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById("tax").innerText = `$${tax.toFixed(2)}`;
  document.getElementById("total").innerText = `$${total.toFixed(2)}`;
}
document.addEventListener("DOMContentLoaded", function () {

    const menuItems = document.querySelectorAll('.menu-item');
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    menuItems.forEach(item => {
        const addBtn = item.querySelector('.add-btn');

        addBtn.addEventListener('click', () => {
            const name = item.querySelector('.item-name p').textContent;
            const price = parseFloat(item.querySelector('.price').textContent.replace('$',''));
            const imgSrc = item.querySelector('img').src;

            addToCart(name, price, imgSrc);
        });
    });

    function addToCart(name, price, imgSrc) {
        let existingItem = [...document.querySelectorAll('.cart-item')]
            .find(cartItem => cartItem.dataset.name === name);

        if (existingItem) {
            let qtyEl = existingItem.querySelector('.qty');
            let qty = parseInt(qtyEl.textContent);
            qty++;
            qtyEl.textContent = qty;

            existingItem.classList.add('pulse');
            setTimeout(() => existingItem.classList.remove('pulse'), 200);
        } 
        else {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.dataset.name = name;

            cartItem.innerHTML = `
                <img src="${imgSrc}" alt="${name}">
                <div class="item-info">
                    <h4>${name}</h4>
                    <p>$${price.toFixed(2)}</p>
                </div>

                <div class="item-right">
                    <span class="qty">1</span>
                    <button class="remove-btn">✖</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.remove-btn').addEventListener('click', () => {
                cartItem.classList.add('fade-out');
                setTimeout(() => cartItem.remove(), 200);
                updateCart();
            });
        }

        updateCart();
    }

    function updateCart() {
        let subtotal = 0;

        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.item-info p').textContent.replace('$',''));
            const qty = parseInt(item.querySelector('.qty').textContent);
            subtotal += price * qty;
        });

        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        subtotalEl.textContent = '$' + subtotal.toFixed(2);
        taxEl.textContent = '$' + tax.toFixed(2);
        totalEl.textContent = '$' + total.toFixed(2);
    }

    const searchInput = document.querySelector('.search-bar');

searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase().trim();

    menuItems.forEach(item => {
        const name = item.querySelector('.item-name p')
            .textContent.toLowerCase();

        item.style.display = name.includes(value) ? '' : 'none';
    });
});


});
// 🔍 Search food by name
const printBtn = document.querySelector('.print-btn');

printBtn.addEventListener('click', () => {
  const billItems = document.getElementById('bill-items');
  billItems.innerHTML = '';

  // Copy cart items into bill
  document.querySelectorAll('.cart-item').forEach(item => {
    const name = item.querySelector('h4').textContent;
    const qty = item.querySelector('.qty').textContent;
    const price = item.querySelector('.item-info p').textContent;

    const row = document.createElement('p');
    row.textContent = `${name} x${qty} — ${price}`;
    billItems.appendChild(row);
  });

  // Copy totals
  document.getElementById('bill-subtotal').textContent =
    document.getElementById('subtotal').textContent;
  document.getElementById('bill-tax').textContent =
    document.getElementById('tax').textContent;
  document.getElementById('bill-total').textContent =
    document.getElementById('total').textContent;

  generatePDF();
  const billItemsContainer = document.getElementById("bill-items");
billItemsContainer.innerHTML = ""; // clear previous

document.querySelectorAll(".cart-item").forEach(item => {
  const name = item.querySelector(".item-info h4").textContent;
  const price = parseFloat(item.querySelector(".item-info p").textContent.replace('$',''));
  const qty = parseInt(item.querySelector(".qty").textContent);

  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.justifyContent = "space-between";
  div.style.marginBottom = "5px";

  div.innerHTML = `
    <span>${name} (${qty}x)</span>
    <span>$${(price*qty).toFixed(2)}</span>
  `;

  billItemsContainer.appendChild(div);
});
});

function generatePDF() {
  const bill = document.getElementById('bill');

  bill.style.display = 'block';

  const options = {
    margin: 0.5,
    filename: 'Savora_Bill.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(bill).save().then(() => {
    bill.style.display = 'none';
  });
  
}
