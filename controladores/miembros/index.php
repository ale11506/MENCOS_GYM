<?php

require '../../models/miembros.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$tipo = $_REQUEST['tipo'];

try {
    switch ($metodo) {
        case 'POST':
            $miembro = new miembro($_POST);
            switch ($tipo) {
                case '1':

                    $ejecucion = $miembro->guardar();
                    $mensaje = "Guardado correctamente";
                    break;
                case '2':

                    $ejecucion = $miembro->modificar();
                    $mensaje = "Modificado correctamente";
                    break;

                case '3':

                    $ejecucion = $miembro->eliminar();
                    $mensaje = "Eliminado correctamente";
                    break;

                default:

                    break;
            }
            http_response_code(200);
            echo json_encode([
                "mensaje" => $mensaje,
                "codigo" => 1,
            ]);

            break;
        case 'GET':
            http_response_code(200);
            $miembro = new miembro($_GET);
            $miembros = $miembro->buscar();
            echo json_encode($miembros);
            break;

        default:
            http_response_code(405);
            echo json_encode([
                "mensaje" => "Método no permitido",
                "codigo" => 9,
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "detalle" => $e->getMessage(),
        "mensaje" => "Error de ejecución",
        "codigo" => 0,
    ]);
}

exit;
