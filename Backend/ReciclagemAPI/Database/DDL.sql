CREATE TABLE erros (
    id SERIAL PRIMARY KEY,
    processos_id INTEGER REFERENCES processos(id),
    materiais_id INTEGER REFERENCES materiais(id),
    quantidade INTEGER NOT NULL,
    tipo VARCHAR(30) NOT NULL
);

CREATE TABLE materiais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    tipo VARCHAR(30) NOT NULL
);

CREATE TABLE processos (
    id SERIAL PRIMARY KEY,
    processos_id INTEGER REFERENCES processos(id),
    data_processo DATE NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    quantidade INTEGER NOT NULL
)

CREATE TABLE sensores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    tipo VARCHAR(30) NOT NULL
)

CREATE TABLE densempenho (
    id SERIAL PRIMARY KEY,
    processos_id INTEGER REFERENCES processos(id),
    volume NUMERIC NOT NULL,
    Inatividade BOOLEAN NOT NULL DEFAULT TRUE,
    horas_trabalhadas NUMERIC NOT NULL,
    homem_horas NUMERIC NOT NULL,
    eficiencia NUMERIC NOT NULL,
    produtividade NUMERIC NOT NULL
)