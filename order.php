<?php
require_once __DIR__ . '/config.php';

// Fetch all menu items
$query = "SELECT * FROM menu_items";
$result = $conn->query($query);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submit Order</title>
    <link rel="stylesheet" href="order.css">
</head>
<body>
    <a href="index.html" class="back-btn top-right">
  ← Home
</a>
    <div class="container">

        <div class="menu-section">
           <div class="menu-header">
                <div class="title-box">
                    <h1 class="title">Order Your Food</h1>
                    <p class="date-text" id="current-date"></p>
                </div>

                <input type="text" class="search-bar" placeholder="Search food...">
            </div>

            <div class="menu-nav" >
                <button class="nav-btn" data-filter="burger">
                    <img src="images/burger.png" class="nav-icon"> Burger
                </button>

                <button class="nav-btn" data-filter="pizza">
                    <img src="images/pizza.png" class="nav-icon"> Pizza
                </button>

                <button class="nav-btn" data-filter="drink">
                    <img src="images/drink.png" class="nav-icon"> Drinks
                </button>

                <button class="nav-btn" data-filter="dessert">
                    <img src="images/gelato.png" class="nav-icon"> Desserts
                </button>

                <button class="nav-btn" data-filter="plate">
                    <img src="images/dinner.png" class="nav-icon"> Plates
                </button>
            </div>

            <div class="menu-grid">
                <?php if ($result->num_rows > 0): ?>
                    <?php while($row = $result->fetch_assoc()): ?>
                        
                        <div class="menu-item" data-category="<?php echo $row['category']; ?>">
                            <div class="item-img">
                                <img src="<?php echo $row['image_path']; ?>" alt="<?php echo $row['item_name']; ?>">
                                <div class="add-btn">+</div>
                            </div>

                            <div class="item-name">
                                <p><?php echo $row['item_name']; ?></p>
                            </div>

                            <div class="item-bottom">
                                <span class="price"> $<?php echo $row['price']; ?></span>
                                <span class="count"> <?php echo $row['item_count']; ?> items</span>
                            </div>
                        </div>

                   <?php endwhile; ?>
                     <?php else: ?>
                      <p>No menu items found.</p>
                      <?php endif; ?>
            </div>
                     </div>
        <div class="cart-section">

            <div class="cart-header">
                <div>
                <h2>Order</h2>
                <p class="table">Order N°31</p>
                </div>
            </div>

            <div class="cart-items" id="cart-items">
                
            </div>

            <div class="cart-summary">
                <div class="summary-row">
                    <span>Sub Total</span>
                    <span id="subtotal">$0.00</span>
                </div>

                <div class="summary-row">
                    <span>Tax (10%)</span>
                    <span id="tax">$0.00</span>
                </div>

                <div class="summary-row total-row">
                    <span>Total</span>
                    <span id="total">$0.00</span>
                </div>

            <button class="print-btn">🧾 Print bills</button>
            </div>

        </div>

    </div>

   <div id="bill" style="display:none; font-family: Arial, sans-serif; width: 300px; padding: 20px; background: #fff; color: #222; border-radius: 12px; box-shadow: 0 0 15px rgba(0,0,0,0.2);">
  
  <!-- Logo / Header -->
  <div style="text-align:center; margin-bottom: 15px;">
    <img src="ChatGPT_Image_Jan_31__2026__04_15_25_PM-removebg-preview.png" alt="Savora Logo" style="width:80px; margin-bottom:5px;">
    <h2 style="margin:0; font-size:22px;">Savora</h2>
    <p style="margin:0; font-size:14px; color:#555;">Order N°31</p>
  </div>

  <hr style="border: none; border-top: 1px dashed #aaa; margin: 10px 0;">

  <!-- Items container -->
  <div id="bill-items" style="margin-bottom: 10px;"></div>
  <div class="bill-summary">

  <hr style="border: none; border-top: 1px dashed #aaa; margin: 10px 0;">

  <!-- Totals -->
  <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
    <span>Subtotal</span>
    <span id="bill-subtotal">$0.00</span>
  </div>

  <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
    <span>Tax (10%)</span>
    <span id="bill-tax">$0.00</span>
  </div>

  <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:18px; margin-bottom:10px; ">
    <span>Total</span>
    <span id="bill-total">$0.00</span>
  </div>

  <p style="text-align:center; font-size:13px; color:#555; margin-top:15px;">
    Thank you for your order ❤️
  </p>
</div>
</div>



        
    <script>
  const dateElement = document.getElementById("current-date");

  const options = { day: "numeric", month: "long", year: "numeric" };
  const today = new Date().toLocaleDateString("en-US", options);

  dateElement.textContent = today;

  const navButtons = document.querySelectorAll(".nav-btn");
const menuItems = document.querySelectorAll(".menu-item");

let activeFilter = null;

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // If clicking the same button → unselect
    if (activeFilter === filter) {
      activeFilter = null;
      btn.classList.remove("active");

      menuItems.forEach(item => {
        item.style.display = "block";
      });
      return;
    }

    // New selection
    activeFilter = filter;

    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    menuItems.forEach(item => {
      item.style.display =
        item.dataset.category === filter ? "block" : "none";
    });
  });
});


  
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script src="order.js"></script>

</body>
</html>