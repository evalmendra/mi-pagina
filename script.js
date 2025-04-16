// --- CONFIGURACIÓN INICIAL --- //
const fechasOcupadas = [
    "2025-04-20",
    "2025-04-21",
    "2025-04-27",
    "2025-05-01",
    "2025-05-02",
    "2025-05-05"
  ];
  
  // --- CALENDARIO FLATPICKR --- //
  flatpickr("#rangoFechas", {
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    locale: "fr",
    disable: fechasOcupadas,
    onChange: function(selectedDates, dateStr, instance) {
      if (selectedDates.length === 2) {
        const [start, end] = selectedDates;
        const dias = eachDayBetween(start, end);
        const conflicto = dias.find(date =>
          fechasOcupadas.includes(flatpickr.formatDate(date, "Y-m-d"))
        );
  
        if (conflicto) {
          alert("⚠️ Une ou plusieurs dates sélectionnées ne sont pas disponibles.");
          instance.clear();
        }
      }
    }
  });
  
  // --- FUNCIONES AUXILIARES --- //
  function eachDayBetween(start, end) {
    const dates = [];
    const curr = new Date(start);
    while (curr <= end) {
      dates.push(new Date(curr));
      curr.setDate(curr.getDate() + 1);
    }
    return dates;
  }
  
  // --- FORMULARIO DE RESERVA --- //
  document.getElementById("formReserva").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const fechas = document.getElementById("rangoFechas").value.trim();
  
    if (!nombre || !email || !fechas) {
      alert("❗ Veuillez remplir tous les champs.");
      return;
    }
  
    // Confirmación de reserva simulada
    const mensaje = `
  ✅ Merci, ${nombre} !
  
  Votre demande de réservation a bien été reçue pour les dates suivantes :
  📅 ${fechas}
  
  Nous vous contacterons sous peu à 📧 ${email}.
    `;
    alert(mensaje);
    this.reset();
  });
  ✅ Enlázalo desde tu HTML
  En tu archivo index-fr.html (u otros), justo antes del </body> pon:
  
  html
  Copiar
  Editar
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
  <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/fr.js"></script>
  <script src="script.js"></script>
  </body>
  </html>