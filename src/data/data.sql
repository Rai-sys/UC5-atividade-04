-- create table cliente (
--   id serial primary key,
--   usuario varchar(40) not null,
--   email varchar(60) not null unique
-- );

-- create table reserva (
--   id serial primary key,
--   usuario varchar(30) not null,
--   sala char(3) not null,
--   data_hora_inicio timestamp default current_timestamp not null,
--   data_hora_termino timestamp default current_timestamp not null,
--   status varchar(20) not null,
--   constraint fk_usuario foreign key (usuario) references cliente(usuario)
-- );
---------------------------------------------------------------------------------------


-- Criaçao da tabela 'cliente'
create table cliente (
  id serial primary key,
  usuario varchar(40) not null,
  email varchar(60) not null unique
);

-- Insert de dados da tabela 'cliente'
insert into cliente(id, usuario, email) values(1, 'Samuel Lima', 'samuelelima@gmail.com');
insert into cliente(id, usuario, email) values(2, 'Junior Souza', 'juniorsouza01@gmail.com');

-- Criação da tabela 'reserva'
create table reserva (
  id serial primary key,
  cliente_id int not null, 
  sala char(3) not null,
  data_hora_inicio timestamp default current_timestamp not null,
  data_hora_termino timestamp default current_timestamp not null,
  status varchar(20) not null,
  constraint fk_cliente_id foreign key (cliente_id) references cliente(id) on delete cascade
);

-- Insert de dados da tabela 'reserva'
insert into reserva(id, cliente_id, sala, data_hora_inicio, data_hora_termino, status)
values(1, 1, 'A10', '2025-04-07 09:30:00','2025-04-07 12:30:00', 'reservado');
insert into reserva(id, cliente_id, sala, data_hora_inicio, data_hora_termino, status)
values(2, 2, 'B01', '2025-04-06 13:00:00', '2025-04-06 15:40:00', 'cancelado');

-- Criaçao da tabela 'endereço'
create table endereco (
  id serial primary key,
  cliente_id int not null,
  cep char(9) not null,
  logradouro varchar(27) not null,
  complemento varchar(40),
  numero varchar(3) not null,
  bairro varchar(27) not null,
  localidade varchar(20) not null,
  uf char(2) not null,
  constraint fk_cliente_id foreign key (cliente_id) references cliente(id) on delete cascade
);

-- Insert de dados da tabela ''
insert into endereco(id, cliente_id, cep, logradouro, complemento, numero, bairro, localidade, uf) 
values (1, 1, '59855-000', 'Praça do Centro', null, '192', 'Centro', 'Rio Grande do Norte', 'RN');