<?php
require_once 'conexion.php';

class instructor extends Conexion
{
    public $instructor_id;
    public $in_nombres;
    public $in_apellidos;
    public $in_telefono;
    public $in_correo;
    public $instructor_situacion;


    public function __construct($args = [])
    {
        $this->instructor_id = $args['instructor_id'] ?? null;
        $this->in_nombres = $args['in_nombres'] ?? '';
        $this->in_apellidos = $args['in_apellidos'] ?? '';
        $this->in_telefono = $args['in_telefono'] ?? '';
        $this->in_correo = $args['in_correo'] ?? '';
        $this->instructor_situacion = $args['instructor_situacion'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO instructores(in_nombres, in_apellidos, in_telefono, in_correo) values('$this->in_nombres', '$this->in_apellidos', '$this->in_telefono', '$this->in_correo')";
        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * from instructores where instructor_situacion = 1 ";

        if ($this->in_nombres != '') {
            $sql .= " and in_nombres like '%$this->in_nombres%' ";
        }

        if ($this->in_apellidos != '') {
            $sql .= " and in_apellidos like '%$this->in_apellidos%' ";
        }

        if ($this->in_telefono != '') {
            $sql .= " and in_telefono = $this->in_telefono ";
        }

        if ($this->in_correo != '') {
            $sql .= " and in_correo = $this->in_correo ";
        }

        if ($this->instructor_id != null) {
            $sql .= " and instructor_id = $this->instructor_id ";
        }

        $resultado = self::servir($sql);
        return $resultado;
        
    }

    public function modificar()
    {
    $sql = "UPDATE instructores SET in_nombres = '$this->in_nombres', in_apellidos = '$this->in_apellidos', in_telefono = '$this->in_telefono', in_correo = '$this->in_correo' where instructor_id = '$this->instructor_id'";

    $resultado = self::ejecutar($sql);
    return $resultado;
    }

    public function eliminar()
    {
         $sql = "UPDATE instructores SET instructor_situacion = 0 where instructor_id = $this->instructor_id";

         $resultado = self::ejecutar($sql);
         return $resultado;
     }
}
