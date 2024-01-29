# **SISTEMA DE GERENCIAMENTO DE PRESENÇA EM EVENTOS - BACKEND**
## *No âmbito do Instituto Federal de Brasília*

## **Problemática do Projeto** 

O Instituto Federal de Brasília (IFB) - Campus Brasília realiza eventos acadêmicos regularmente, no qual recebe um grande número de inscrições entre estudantes da comunidade interna e externa à instituição. Muitos desses eventos acontecem durante o período letivo, de maneira que os docentes do Instituto utilizam a participação do aluno em eventos como uma forma de complemento de conteúdo referente ao plano de ensino da disciplina lecionada. Por não existir um padrão no gerenciamento desses dados, cada docente cria sua própria maneira para registrar a presença do aluno. Podendo ser elas: a utilização de formulários da plataforma do Google, a assinatura de uma ata em sala de aula antes do evento acontecer, dentre outras. 
De maneira geral as soluções utilizadas demandam do mesmo problema:
- A real participação do estudante no evento: O próprio estudante pode simplesmente confirmar sua presença no evento, mas não ter realmente participado.
- Entrega do Certificado de participação: Muitos eventos fazem a entrega do certificado mediante a inscrição do estudante, sem ter uma verificação da real presença, ocasionando a entrega indevida do mesmo.
- Confiabilidade: A verificação de presenças gera um atraso na confirmação destas, pois exige do docente a execução de uma filtragem dos dados da lista recebida, além da falta de confiabilidade das informações da lista, no qual a assinatura de um participante ausente poderá ser escrito, por exemplo, por outro aluno.

## Arquitetura Utilizada ##
- REST
- Design Pattern Repository

## Tecnologias Utilizadas ##
- NodeJs
- PostgreSql

## Implantação em produção ##
- Back end: cyclic
- Banco de dados: Neon

# Execução do Projeto #
Para utilização dessa API segue os passos: 
```
#Clonar o repositorio ou realizar o download da pasta: 
git clone https://github.com/JadilsonJuniorJR/S.G.P.E_BACKEND.git

#Entrar na pasta
cd '.\S.G.P.E_BACKEND-main\'

#Instalar o projeto
npm install

#Executar o projeto
npm start server.js
```

**Para realizar as etapas mencionadas, é necessário o uso do gerenciador de pacotes NPM. Além disso, será preciso criar um arquivo .env, no qual você deve incluir informações importantes, como a porta principal e o link do banco de dados que será utilizado pelo projeto. Certifique-se de configurar corretamente o arquivo .env para garantir o funcionamento adequado da aplicação.**

Modelo: 
``` 
PORT=*****
POSTGRES_URL="******"
```




## Representação das Pastas e Interações dos Arquivos ##
A representação visual abaixo destaca as pastas mais significativas do projeto, organizadas em colunas. Dentro dessas pastas principais, encontram-se subpastas contendo arquivos JavaScript, destacados em amarelo. As setas direcionais indicam as interações desses arquivos, fornecendo uma visão clara do fluxo de trabalho e das relações entre eles.
![image](https://github.com/JadilsonJuniorJR/S.G.P.E_BACKEND/assets/104590503/fc2206fe-422c-420b-87f4-5487d4aa6fc3)

## Visão da Solução Implementada ##

### Processo do Registro de Entrada do Participante ###
Nesta imagem, podemos visualizar o processo no backend após o envio dos dados de entrada pelo usuário. O fluxo representa a sequência de operações que ocorrem após a submissão das informações.
![Frame 103](https://github.com/JadilsonJuniorJR/S.G.P.E_BACKEND/assets/104590503/fa575037-2067-41b2-b353-edade69e9c41)

###  Processo do Registro de Saida do Participante ###
Com relação à imagem abaixo, podemos observar o processo de confirmação de presença realizado pelo sistema.
![Group 104](https://github.com/JadilsonJuniorJR/S.G.P.E_BACKEND/assets/104590503/5f31bf49-335e-4200-b0b2-07a6d009a09c)


