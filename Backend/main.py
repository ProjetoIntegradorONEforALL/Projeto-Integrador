import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Carregar os dados
df = pd.read_sql('dados_processamento.sql')

# 2. Criar métricas úteis

#quanto material foi processado por minuto
df['eficiencia'] = df['volume_processado'] / df['tempo_operacao_min']
#percentual de erros por unidade de material
df['taxa_erro'] = df['erros'] / df['volume_processado']

# 3. Análise de padrão por tipo de material
print("\nMédia de erros por tipo de material:")
print(df.groupby('tipo_material')['erros'].mean())

print("\nEficiência média por tipo de material:")
print(df.groupby('tipo_material')['eficiencia'].mean())

# 4. Visualização de padrões
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, x='tipo_material', y='eficiencia')
plt.title("Eficiência por Tipo de Material")
plt.ylabel("Eficiência (volume/minuto)")
plt.xlabel("Tipo de Material")
plt.tight_layout()
plt.show()

# 5. Verificando horários com maior eficiência
df['hora'] = pd.to_datetime(df['hora'], format='%H:%M').dt.hour
media_hora = df.groupby('hora')['eficiencia'].mean()

plt.figure(figsize=(10, 5))
media_hora.plot(kind='bar')
plt.title("Eficiência Média por Hora")
plt.ylabel("Eficiência")
plt.xlabel("Hora do Dia")
plt.xticks(rotation=0)
plt.tight_layout()
plt.show()
