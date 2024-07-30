CREATE TABLE inscripcion (
    inscripcion_id SERIAL PRIMARY KEY,
    miembro_id INTEGER,
    instructor_id INTEGER,
    plan_id INTEGER,        
    inscripcion_situacion SMALLINT DEFAULT 1,
    FOREIGN KEY (instructor_id) REFERENCES instructores(instructor_id),
    FOREIGN KEY (plan_id) REFERENCES planes(plan_id),
    FOREIGN KEY (miembro_id) REFERENCES miembros(miembro_id)
);

CREATE TABLE miembros (
    miembro_id SERIAL PRIMARY KEY,
    mi_nombres VARCHAR(50),
    mi_apellidos VARCHAR(50),
    mi_telefono VARCHAR(20),
    mi_correo VARCHAR(100),        
    miembro_situacion SMALLINT DEFAULT 1
);

CREATE TABLE planes(
   plan_id SERIAL PRIMARY KEY,
   nombre_plan VARCHAR(40),
   plan_situacion SMALLINT DEFAULT 1
);


SELECT * FROM planes

CREATE TABLE instructores (
   instructor_id SERIAL PRIMARY KEY,
   in_nombres VARCHAR(50),
   in_apellidos VARCHAR(50),
   in_telefono VARCHAR(20),
   in_correo VARCHAR (100),
   instructor_situacion SMALLINT DEFAULT 1 
);