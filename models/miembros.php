<?php
require_once 'conexion.php';

class miembro extends Conexion
{
    public $miembro_id;
    public $mi_nombres;
    public $mi_apellidos;
    public $mi_telefono;
    public $mi_correo;
    public $miembro_situacion;


    public function __construct($args = [])
    {
        $this->miembro_id = $args['miembro_id'] ?? null;
        $this->mi_nombres = $args['mi_nombres'] ?? '';
        $this->mi_apellidos = $args['mi_apellidos'] ?? '';
        $this->mi_telefono = $args['mi_telefono'] ?? '';
        $this->mi_correo = $args['mi_correo'] ?? '';
        $this->miembro_situacion = $args['miembro_situacion'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO miembros(mi_nombres, mi_apellidos, mi_telefono, mi_correo) values('$this->mi_nombres', '$this->mi_apellidos', '$this->mi_telefono', '$this->mi_correo')";
        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * from miembros where miembro_situacion = 1 ";

        if ($this->mi_nombres != '') {
            $sql .= " and mi_nombres like '%$this->mi_nombres%' ";
        }

        if ($this->mi_apellidos != '') {
            $sql .= " and mi_apellidos like '%$this->mi_apellidos%' ";
        }

        if ($this->mi_telefono != '') {
            $sql .= " and mi_telefono = $this->mi_telefono ";
        }

        if ($this->mi_correo != '') {
            $sql .= " and mi_correo = $this->mi_correo ";
        }

        if ($this->miembro_id != null) {
            $sql .= " and miembro_id = $this->miembro_id ";
        }

        $resultado = self::servir($sql);
        return $resultado;
        
    }

    public function modificar()
    {
    $sql = "UPDATE miembros SET mi_nombres = '$this->mi_nombres', mi_apellidos = '$this->mi_apellidos', mi_telefono = '$this->mi_telefono', mi_correo = '$this->mi_correo' where miembro_id = '$this->miembro_id'";

    $resultado = self::ejecutar($sql);
    return $resultado;
    }

    public function eliminar()
    {
         $sql = "UPDATE miembros SET miembro_situacion = 0 where miembro_id = $this->miembro_id";

         $resultado = self::ejecutar($sql);
         return $resultado;
     }
}
