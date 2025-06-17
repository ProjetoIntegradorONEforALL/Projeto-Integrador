CREATE TABLE pecas (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(30) NOT NULL
);

CREATE TABLE erros (
    id SERIAL PRIMARY KEY,
    quantidade_erros INTEGER NOT NULL,
    tipo_erro VARCHAR(30) NOT NULL
);

CREATE TABLE processos (
    id SERIAL PRIMARY KEY,
    peca_id INTEGER REFERENCES pecas(id),
    inicio_processo DATE NOT NULL,
    fim_processo DATE,
    quantidade_processo INTEGER,
    data_hora TIMESTAMP NOT NULL,
    tempo_medio TIME
);

CREATE TABLE processo_erro (
    processo_id INTEGER REFERENCES processos(id),
    erros_id INTEGER REFERENCES erros(id),
    hora_data_erro TIMESTAMP,
    PRIMARY KEY (processo_id, erros_id)
);