

create TABLE patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    phone VARCHAR(255),

)

create TABLE doctor (
    id SERIAL PRIMARY KEY,
    surname VARCHAR(255),
   name VARCHAR(255),

)

create TABLE visit (
    id SERIAL PRIMARY KEY,
    "visitDate" TIMESTAMP,
    "doctorId" INTEGER,
    FOREIGN KEY ("doctorId") REFERENCES users(id),
    "patientId" INTEGER,
    FOREIGN KEY ("patientId") REFERENCES patient(id),
    "procedureId" INTEGER,
    FOREIGN KEY ("procedureId") REFERENCES procedure(id),
    "authorId" INTEGER,
    FOREIGN KEY ("authorId") REFERENCES users(id),
    
)

create TABLE role (
    id SERIAL PRIMARY KEY,
 role VARCHAR(255)
)

create TABLE procedure (
    id SERIAL PRIMARY KEY,
 procedure VARCHAR(255)
)

create TABLE users (
    id SERIAL PRIMARY KEY,
    authorId INTEGER,
    doctorId INTEGER,
    visitDate VARCHAR(255),
    changes: json
    FOREIGN KEY ("authorId") REFERENCES users(id)
)


CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    "authorId" INTEGER REFERENCES users(id),
    "doctorId" INTEGER,
    "visitDate" VARCHAR(255),
    changes JSON
);





ALTER TABLE visit
ADD COLUMN procedure INTEGER;


FOREIGN KEY ("procedure")
REFERENCES procedure(id)
