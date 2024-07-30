<?php include_once '../../includes/header.php' ?>
<div class="container">
    <h1 class="text-center">Formulario de Miembros</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-8 border bg-light p-3">
            <input type="hidden" name="miembro_id" id="miembro_id">
            <div class="row mb-3">
                <div class="col">
                    <label for="mi_nombres">Nombre del miebro</label>
                    <input type="text" name="mi_nombres" id="mi_nombres" class="form-control" required>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="mi_apellidos">Apellido del miembro</label>
                    <input type="text" name="mi_apellidos" id="mi_apellidos" class="form-control" required>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="mi_telefono">Telefono del miembro</label>
                    <input type="number" name="mi_telefono" id="mi_telefono" class="form-control" required>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="mi_correo">Correo del miembro</label>
                    <input type="text" name="mi_correo" id="mi_correo" class="form-control" required>
                </div>
            </div>
            <div class="row justify-content-center mb-3">
                <div class="col">
                    <button type="submit" id="btnGuardar" class="btn btn-primary w-100">Guardar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnBuscar" class="btn btn-info w-100">Buscar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnModificar" class="btn btn-warning w-100">Modificar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnCancelar" class="btn btn-secondary w-100">Cancelar</button>
                </div>
                <div class="col">
                    <button type="reset" id="btnLimpiar" class="btn btn-secondary w-100">Limpiar</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-8 table-responsive">
            <h2 class="text-center">Listado de miembros</h2>
            <table class="table table-bordered table-hover" id="tablaMiembros">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>telefono</th>
                        <th>Correo</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="7">No hay miembros disponibles</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script defer src="/mencos_GYM/src/js/funciones.js"></script>
<script defer src="/mencos_GYM/src/js/miembros/index.js"></script>
<?php include_once '../../includes/footer.php' ?>