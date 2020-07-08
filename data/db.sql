drop database if exists formation_express;

create database formation_express default character set utf8; 

use formation_express;

create table professions
(
    id tinyint unsigned auto_increment, 
    profession_name varchar(50) not null, 
    primary key (id)
);

create table persons
(
    id smallint unsigned auto_increment, 
    person_name varchar(30) not null, 
    first_name varchar(30) null, 
    profession_id tinyint unsigned not null, 
    primary key (id),
    constraint persons_to_professions
        foreign key (profession_id)
        references professions (id)
);

-- vue pour les personnes
CREATE OR REPLACE VIEW view_person AS
SELECT p.*, prof.profession_name FROM persons as p INNER JOIN professions as prof ON p.profession_id= prof.id;

INSERT INTO professions (profession_name)
VALUES ('Développeur'), ('Photographe'), ('Poète'), ('Peintre');

INSERT INTO persons (first_name, person_name, profession_id) 
VALUES
('Pablo', 'Picasso', 4),('Paul', 'Eluard', 3),('Paul', 'Cézanne', 4),
('Paul', 'Verlaine', 3),('Joachim', 'du Bellay', 3),('Emily', 'Dickinson', 3), ('Annie', 'Lebovitz', 2),('Diane', 'Arbus', 2),('Bettina', 'Rheims', 2), ('Edouard', 'Boubat', 2),('André', 'Kertesz', 2),('Robert', 'Capa', 2), ('James', 'Gosling', 1),('Guido', 'van Rossum', 1),('Bjarne', 'Stroustrup', 1), ('Donald', 'Knuth', 1),('Ada', 'Lovelace', 1),('Grace', 'Hopper', 1);