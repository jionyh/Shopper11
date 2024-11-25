
# Ride Service

**Ride Service** é uma aplicação fullstack que oferece estimativas, confirmações e o histórico de corridas. O sistema integra uma API para fornecer estimativas de preço, tempo e distância das viagens, além de permitir a escolha de motoristas. A interface do frontend interage diretamente com o backend, proporcionando uma experiência completa ao usuário.

Desenvolvido como parte de um teste técnico da Shopper, este aplicativo integra a API do Google Maps para gerar dados detalhados sobre a rota entre dois pontos, incluindo distância, tempo estimado e o valor da viagem, com base nas opções de motoristas disponíveis. O sistema permite que o usuário informe a origem e o destino, e retorna as informações sobre a viagem, incluindo a lista de corridas confirmadas.

----------
## 📋 **Índice**
- [Visão Geral](#-visão-geral)
- [Recursos](#-recursos)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Endpoints da API](#-endpoints-da-api)
----------
## 🌟 **Visão Geral**
Este projeto fullstack fornece uma aplicação que gerencia:
- Estimativas de preços para corridas, com base na distância e no tempo estimado de viagem.
- Confirmações de corridas, incluindo a escolha de motoristas.
- Geração de imagens das rotas entre os pontos de origem e destino, usando a API do Google Maps, para uma visualização clara da trajetória.
----------
## ✨ **Recursos**
- Estimativa de preços de corridas em tempo real.
- Gerenciamento de motoristas e suas avaliações.
- Geração de imagens de rotas para visualização clara do trajeto.
- Cálculo do valor da viagem com base na distância, tempo estimado e motorista selecionado.
----------
## 🛠 **Tecnologias Utilizadas**
-  **Node.js** - Ambiente de execução.
-  **Express.js** - Framework para o servidor.
-  **Prisma** - ORM para gerenciamento do banco de dados.
-  **Docker** - Containerização dos serviços.
-  **Jest** - Framework de testes.
-  **React** - Frontend Single Page Application (SPA).
-  **Vite** - Ferramenta de build para o frontend.
-  **Tanstack Query** - Para requisições e caching no frontend.
-  **Axios** - Para requisições HTTP no frontend.
-  **Tailwind** - Framework CSS utilitário para o frontend.
-  **Shadcn/UI** - Biblioteca de componentes UI para o frontend.
----------
## ⚙️ **Pré-requisitos**

-  **Docker** e **Docker Compose** instalados no ambiente.

----------

## 🚀 **Instalação e Execução**

#### 1. Clone o repositório:
```bash
git clone https://github.com/jionyh/shopper11.git
cd shopper11
```
#### 2. Configure as variáveis de ambiente no arquivo `.env` (ver seção [Variáveis de Ambiente](#variáveis-de-ambiente)).

#### 3. Inicie os serviços:
```bash
docker compose up
```
O backend estará disponível na porta 8080 e o frontend na porta 80.

----------

## 🔑 **Variáveis de Ambiente**

Certifique-se de criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```bash
GOOGLE_API_KEY=sua_chave_da_api_google_aqui
```
----------

## 📚 **Endpoints da API**  

### **Estimativa de Corrida**
-  **POST**  `/ride/estimate`
-  **Descrição**: Calcula a estimativa de preço para uma corrida.
-  **Body**:
```bash
{
	"customer_id: "string",
	"origin": "string",
	"destination": "string"
}
```
-  **Resposta**:
```bash
	{
		"origin":  {
			"latitude":  "number",  //  Latitude  do  ponto  de  origem
			"longitude": "number" // Longitude do  ponto  de  origem
	},
		"destination": {
			"latitude":  "number",  //  Latitude  do  ponto  de  destino
			"longitude": "number" // Longitude do  ponto  de  destino
	},
		"distance": "number", // Distância entre o ponto de origem e destino em metros
		"duration": "string", // Duração estimada da corrida em segundos (ex:  "1289s")
		"options": [
			{
				"id": "number", // ID único do motorista
				"name": "string", // Nome do motorista
				"description": "string", // Descrição do motorista
				"vehicle": "string", // Descrição do veículo (ex:  "Plymouth Valiant 1973 rosa")
				"review": {
					"rating": "number", // Avaliação do motorista (0 a 5)
					"comment": "string" // Comentário sobre o motorista
			},
		"value": "number" // Valor estimado da corrida

			}],
		"routeResponse": {
			"routes": [{
				"legs": [{
					"startLocation":  {
						"latLng":  {
							"latitude":  "number",  //  Latitude  do  ponto  de  partida
							"longitude": "number" // Longitude do  ponto  de  partida
						}},
					"endLocation": {
						"latLng":  {
							"latitude":  "number",  //  Latitude  do  ponto  de  chegada
							"longitude": "number" // Longitude do  ponto  de  chegada
			}}}],
			"distanceMeters": "number", // Distância total em metros
			"duration": "string" // Duração estimada da corrida em segundos (ex:  "1289s")
			}]}}
```

### **Confirmação de Corrida**

-  **PATCH**  `/ride/confirm`
-  **Descrição**: Confirma uma corrida para o cliente.
-  **Body**:
```bash
{ 
	"origin": "string", // Endereço ou descrição do ponto de origem 
	"destination": "string", // Endereço ou descrição do ponto de destino 
	"customer_id": "string", // ID do cliente 
	"distance": "number", // Distância da corrida em metros 
	"duration": "string", // Duração estimada da corrida (ex: "1289s") 
	"driver": { 
		"id": "number", // ID do motorista 
		"name": "string" // Nome do motorista 
	}, 
	"value": "number" // Valor total estimado da corrida 
	}
```
-  **Resposta**:
```bash
{
	success:true
}
```

### **Histórico do Cliente**
-  **GET**  `/ride/:customer_id?/?driver_id={id do motorista}`
-  **Descrição**: Retorna o histórico de corridas de um cliente.
- **Resposta**
```bash
{
  "customer_id": "string",  // ID do cliente
  "rides": [
    {
      "id": "number",  // ID da corrida
      "date": "date",  // Data e hora da corrida
      "origin": "string",  // Ponto de origem
      "destination": "string",  // Ponto de destino
      "distance": "number",  // Distância da corrida em metros 
      "duration": "number",  // Duração estimada da corrida (ex: "1289s")
      "driver": {
        "id": "number",  // ID do motorista
        "name": "string"  // Nome do motorista
      },
      "value": "number"  // Valor da corrida
    },
  ]
}

```

### **Imagem da Rota**
-  **GET**  `/ride/route-image`
-  **Descrição**: Retorna uma imagem da rota calculada.

  