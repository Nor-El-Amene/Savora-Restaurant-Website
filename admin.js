// ==== Get reservations from localStorage ====
let data = [];

fetch("./api/get_reservations.php")
  .then(res => res.json())
  .then(reservations => {
    data = reservations;
    renderReservations();
    renderWeeklySummary();
  });

// ==== DOM Elements ====
const list = document.getElementById("list");
const totalEl = document.getElementById("total");
const todayEl = document.getElementById("today");
const yesterdayEl = document.getElementById("yesterday");
const weeklyGrid = document.getElementById("weekly-grid");

// ==== Date Helpers ====
const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

// ==== Render Reservations Table ====
function renderReservations() {
  list.innerHTML = "";

  let todayCount = 0;
  let yesterdayCount = 0;

  data.forEach((r, index) => {
    if (!r.status) r.status = "Pending";
r.status = r.status.charAt(0).toUpperCase() + r.status.slice(1).toLowerCase();

    if (r.date === today) todayCount++;
    if (r.date === yesterday) yesterdayCount++;

    const row = document.createElement("tr");

    let actions = "";
    if (r.status === "Pending") {
      actions = `
        <button class="confirm-btn" onclick="handleAction(${index}, 'Confirmed')">Confirm</button>
        <button class="refuse-btn" onclick="handleAction(${index}, 'Canceled')">Cancel</button>
      `;
    }

    row.innerHTML = `
      <td>${r.name}</td>
      <td>${r.phone}</td>
      <td>${r.date}</td>
      <td>${r.time}</td>
      <td>${r.table}</td>
      <td style="color:${
        r.status === "Confirmed" ? "#4caf50" :
        r.status === "Canceled" ? "#f44336" : "#ffc107"
      }">${r.status}</td>
      <td>${actions}</td>
    `;

    list.appendChild(row);
  });

  totalEl.textContent = data.length;
  todayEl.textContent = todayCount;
  yesterdayEl.textContent = yesterdayCount;

  // Save status updates
  localStorage.setItem("reservations", JSON.stringify(data));
}

// ==== Handle Confirm / Cancel Action ====
function handleAction(index, newStatus) {
  data[index].status = newStatus;
  localStorage.setItem("reservations", JSON.stringify(data));
  renderReservations();
}

// ==== Sidebar Navigation ====
// ==== Sidebar Navigation ====
function showSection(id) {
  // 1. Hide all sections
  const sections = document.querySelectorAll('.main-content section');
  sections.forEach(sec => {
    sec.style.display = 'none';
  });

  // 2. Show the selected section
  const activeSection = document.getElementById(id);
  if (activeSection) {
    activeSection.style.display = 'block';
  } else {
    console.error("Section with ID " + id + " not found!");
  }

  // 3. Update Sidebar Active Class
  document.querySelectorAll('.sidebar li').forEach(li => {
    li.classList.remove('active');
  });

  // Find the clicked li and make it active
  const activeLi = document.querySelector(`.sidebar li[onclick*="${id}"]`);
  if (activeLi) {
    activeLi.classList.add('active');
  }

  // 4. Special logic: If opening menu-management, fetch the menu data
  if(id === 'menu-management') {
    fetchMenu();
  }
}

// ==== Weekly Summary Calendar ====
function renderWeeklySummary() {
  weeklyGrid.innerHTML = "";

  const todayDate = new Date();
  const weekStart = new Date(todayDate.setDate(todayDate.getDate() - todayDate.getDay()));

  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);

    const dateStr = day.toISOString().split("T")[0];
    const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });

    const reservationsCount = data.filter(
      r => r.date === dateStr && r.status !== 'Canceled'
    ).length;

    const availableTables = 22 - reservationsCount;
    const customers = reservationsCount;

    const card = document.createElement("div");
    card.className = "weekly-card";
    card.innerHTML = `
      <h4>${dayName}</h4>
      <p>Reserved: ${reservationsCount}</p>
      <p>Available: ${availableTables}</p>
      <p>Customers: ${customers}</p>
    `;

    weeklyGrid.appendChild(card);
  }
}

// ==== Fetch and Render Menu Items ====
function fetchMenu() {
    fetch("api/get_menu.php")
      .then(res => res.json())
      .then(menuData => {
        const menuList = document.getElementById("menu-list");
        if (!menuList) return;
        
        menuList.innerHTML = "";
        
        menuData.forEach(item => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.item_name}</td>
            <td>${item.category}</td>
            <td>$${item.price}</td>
            <td>
              <button class="refuse-btn" onclick="deleteItem(${item.id})">Delete</button>
            </td>
          `;
          menuList.appendChild(row);
        });
      })
      .catch(err => console.error("Error fetching menu:", err));
}

// ==== Delete Menu Item ====
function deleteItem(id) {
    if(confirm("Are you sure you want to delete this item?")) {
        window.location.href = `api/delete_menu_item.php?id=${id}`;
    }
}

// ==== Initial Render ====
renderReservations();
renderWeeklySummary();