<?php
$to = "evalmendra@gmail.com"; // Cámbialo por uno tuyo real
$subject = "Test de correo desde PHP";
$message = "Este es un mensaje de prueba desde el servidor.";
$headers = "From: noreply@tudominio.com";

if (mail($to, $subject, $message, $headers)) {
  echo "Correo enviado correctamente.";
} else {
  echo "Error al enviar el correo.";
}
?>