# Projeto-Integrador
Atividades do Projeto Integrador Calouros e veteranos


## Documentação:

1. [Padrões de Commits](PadraoCommit.md)
2. [Gerenciamento de Branches](GerenciamentoBranch.md)
3. [Ferramentas e Dependências](Ferramentas_e_dependencias.md)

## Diagrama de sequencia ## 
```mermaid
sequenceDiagram 
    participant CLP as CLP (Controlador Lógico Programável)
    participant Backend as Backend (API)
    participant Queue as Fila/Stream (AWS SQS/Kinesis)
    participant AWS as AWS (Armazenamento - DynamoDB/RDS/S3)
    participant Realtime as Serviço de Tempo Real (WebSocket/AWS IoT Core)
    participant Frontend as Frontend (Interface do Usuário)

    CLP->>Backend: Envia dados via MQTT/HTTP
    Backend->>Queue: Publica dados na fila/stream
    Queue->>AWS: Processa e armazena dados na AWS
    Backend->>Realtime: Publica dados para atualização em tempo real
    Realtime->>Frontend: Envia dados em tempo real via WebSocket/MQTT
    Frontend->>Frontend: Exibe dados em tempo real```  
