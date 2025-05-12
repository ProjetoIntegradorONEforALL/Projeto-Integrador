import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Simulando dados de produção
def gerar_dados_simulados(n=180):
    np.random.seed(42)
    datas = pd.date_range(start='2025-01-01', periods=n)
    turnos = np.random.choice(['Manha', 'Tarde', 'Noite'], size=n)
    volume = np.random.normal(loc=1000, scale=150, size=n).astype(int)
    erros = np.random.poisson(lam=3, size=n)
    tempo = volume / (np.random.normal(loc=15, scale=2, size=n))
    operadores = np.random.choice(['A', 'B', 'C', 'D'], size=n)

    return pd.DataFrame({
        'Data': datas,
        'Turno': turnos,
        'Volume_Processado': volume,
        'Erros_Separacao': erros,
        'Tempo_Execucao': tempo.round(2),
        'Operador': operadores
    })

def analise_dados(df):
    print("\nResumo estatístico:")
    print(df.describe())

    # Correlação
    corr = df[['Volume_Processado', 'Erros_Separacao', 'Tempo_Execucao']].corr()
    sns.heatmap(corr, annot=True, cmap='coolwarm')
    plt.title('Correlação entre variáveis')
    plt.show()

    # Volume por turno
    sns.boxplot(data=df, x='Turno', y='Volume_Processado')
    plt.title('Distribuição de Volume por Turno')
    plt.show()

    # Erros por operador
    sns.barplot(data=df, x='Operador', y='Erros_Separacao', estimator=np.mean)
    plt.title('Média de Erros por Operador')
    plt.show()

def clustering(df):
    features = df[['Volume_Processado', 'Erros_Separacao', 'Tempo_Execucao']]
    scaler = StandardScaler()
    scaled = scaler.fit_transform(features)

    kmeans = KMeans(n_clusters=3, random_state=42)
    df['Cluster'] = kmeans.fit_predict(scaled)

    sns.pairplot(df, hue='Cluster', vars=['Volume_Processado', 'Erros_Separacao', 'Tempo_Execucao'])
    plt.suptitle('Clusters de Produção', y=1.02)
    plt.show()

def regressao(df):
    X = df[['Volume_Processado', 'Tempo_Execucao']]
    y = df['Erros_Separacao']

    modelo = LinearRegression()
    modelo.fit(X, y)

    print("\nCoeficientes da Regressão:")
    print(f"Volume_Processado: {modelo.coef_[0]:.4f}")
    print(f"Tempo_Execucao: {modelo.coef_[1]:.4f}")
    print(f"Intercepto: {modelo.intercept_:.4f}")

    df['Erro_Previsto'] = modelo.predict(X)
    sns.scatterplot(x=y, y=df['Erro_Previsto'])
    plt.xlabel('Erro Real')
    plt.ylabel('Erro Previsto')
    plt.title('Regressão Linear - Erros de Separação')
    plt.show()

if __name__ == "__main__":
    df = gerar_dados_simulados()
    analise_dados(df)
    clustering(df)
    regressao(df)