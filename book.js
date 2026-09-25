document.addEventListener('DOMContentLoaded', () => {
  const tables = document.querySelectorAll('.table.available');
  const selectedText = document.querySelector('.selected-table-text');
  const errorText = document.querySelector('.error-text');
  const confirmBtn = document.querySelector('.confirm-btn');

  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const hiddenTable = document.getElementById('selectedTable');

  // Restaurant hours
  const OPEN_HOUR = 12;
  const CLOSE_HOUR = 23;

  // Disable past dates
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  // TABLE SELECTION
  tables.forEach(table => {
    table.addEventListener('click', () => {
      tables.forEach(t => t.classList.remove('selected'));
      table.classList.add('selected');
      hiddenTable.value = table.dataset.table;
      selectedText.textContent = `✔ You selected: ${table.dataset.table}`;
      errorText.textContent = "";
    });
  });

  // CONFIRM LOGIC
  confirmBtn.addEventListener('click', () => {
    errorText.textContent = "";

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;
    const table = hiddenTable.value;

    // Basic validation
    if (!name || !phone || !date || !time || !table) {
      errorText.textContent = "Please fill all fields and select a table.";
      return;
    }

    if (!/^[0-9]{8,15}$/.test(phone)) {
      errorText.textContent = "Please enter a valid phone number.";
      return;
    }

    const selectedHour = parseInt(time.split(":")[0], 10);

    if (selectedHour < OPEN_HOUR || selectedHour >= CLOSE_HOUR) {
      errorText.textContent = "Reservations are only available between 12:00 and 23:00.";
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (selectedDateTime < now) {
      errorText.textContent = "Please select a valid future date and time for your reservation.";
      return;
    }

    // CREATE RESERVATION OBJECT
    const reservation = {
      name,
      phone,
      date,
      time,
      table,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // CONFIRMATION POPUP
    const confirmReservation = confirm(
      `📋 Please confirm your reservation:\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Date: ${date}\n` +
      `Time: ${time}\n` +
      `Table: ${table}\n\n` +
      `Do you want to submit this reservation?`
    );

    if (!confirmReservation) {
      return; // User clicked Cancel
    }

    fetch("api/save_reservation.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, phone, date, time, table })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    alert("✅ Your reservation has been successfully saved!");
    window.location.href = "index.html";
  } else {
    errorText.textContent = "❌ Error: " + data.message;
  }
})
.catch(err => {
  errorText.textContent = "❌ Error: " + err.message;
});
  });
});

