# Text-to-speech IBM Watson

<img width="1680" alt="Screen Shot 2020-11-01 at 21 49 55" src="https://user-images.githubusercontent.com/54810767/97823358-7eec8000-1c97-11eb-834d-e5a33a199f02.png">

Para rodar essa aplicação localmente você precisará:

1. Rodar o comando **npm i** em **/client** e em **/server**;

2. Criar uma table nomeada como "**smarkioDatabase**" no mysql com estas colunas e parâmetros abaixo: 

<img width="578" alt="Screen Shot 2020-11-01 at 23 12 45" src="https://user-images.githubusercontent.com/54810767/97823454-cd9a1a00-1c97-11eb-9ddf-f0584af49d06.png">


3. Criar um arquivo **.env** em **/server** que contenha **APIKEY=**<Sua chave da API text-to-speech da IBM e **SERVICEURL=**<A URL de serviço da API text-to-speech>;

4. Rodar o comando "**npm start**" em **/client** e "**npm run devStart**" em **/server**.



***Leve em consideração que este teste foi feito por um desenvolvedor júnior com menos de 1 ano de experiência na área de Desenvolvimento Web e que não havia estudado, até então, bancos de dados que não fossem no-sql.
