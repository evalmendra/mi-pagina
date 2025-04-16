<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['nombre'] ?? '';
$email = $data['email'] ?? '';
$fechas = $data['fechas'] ?? '';

$mail = new PHPMailer(true);

try {
    // Configuración SMTP (usando Gmail como ejemplo)
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'evalmendra@gmail.com'; // Cambia esto
    $mail->Password   = 'jvbi zukl kjvh fdht'; // Cambia esto
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Configuración del mensaje
    $mail->setFrom('evalmendra@gmail.com', 'Reserva Web');
    $mail->addAddress('info@marina-de-casares.com');

    $mail->Subject = "Nueva reserva de $nombre";
    $mail->Body    = "Nombre: $nombre\nEmail: $email\nFechas: $fechas";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Correo enviado']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al enviar: ' . $mail->ErrorInfo]);
}
?>