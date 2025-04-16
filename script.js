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
  
  // --- CARGA DE FECHAS DESDE JSON --- //
  fetch('fechas-ocupadas.json')
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar fechas ocupadas");
      return response.json();
    })
    .then(fechasOcupadas => {
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
    })
    .catch(error => {
      console.error("Error cargando fechas ocupadas:", error);
      alert("Erreur lors du chargement des dates. Réessayez plus tard.");
    });
  
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
  
    const mensaje = `
  ✅ Merci, ${nombre} !
  
  Votre demande de réservation a bien été reçue pour les dates suivantes :
  📅 ${fechas}
  
  Nous vous contacterons sous peu à 📧 ${email}.
    `;
    alert(mensaje);
    this.reset();

    fetch('enviar-reserva.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, fechas })
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  