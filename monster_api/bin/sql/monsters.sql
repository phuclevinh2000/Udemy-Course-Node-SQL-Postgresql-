CREATE TABLE monsters(
  -- serial type is for id, counting from 1
  id serial,
  name character varying(50),
  personality character varying(50)
);

CREATE TABLE habitats(
  id serial,
  name character varying(50),
  climate character varying(50),
  temerature int
);

CREATE TABLE lives(
  monster character varying(50),
  habitat character varying(50)
);

INSERT INTO monsters(name, personality)
VALUES
('Fluffy', 'aggressive'),
('Noodles', 'impatient'),
('Rusty', 'passionate');

INSERT INTO habitats(name, climate, temerature)
VALUES
('desert', 'dry', 100),
('forrest', 'haunted', 70),
('mountain', 'icy', 30);

INSERT INTO lives(monsters, habitats)
VALUES
('Fluffy', 'desert'),
('Noodles', 'forrest'),
('Rusty', 'mountain');