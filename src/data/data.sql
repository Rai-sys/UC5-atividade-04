create table cliente (
  id serial primary key,
  usuario varchar(40) not null,
  email varchar(60) not null unique
);

create table reserva (
  id serial primary key,
  usuario varchar(30) not null,
  sala char(3) not null,
  data_hora_inicio timestamp default current_timestamp not null,
  data_hora_termino timestamp default current_timestamp not null,
  status varchar(20) not null,
  constraint fk_usuario foreign key (usuario) references cliente(usuario)
);