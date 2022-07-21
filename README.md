# Hire.me
Um pequeno projeto para testar suas habilidades como programador.

## Instruções Gerais

1. *Clone* este repositório
2. Fazer o download das dependências com **yarn** ou **npm**.

## Utilização

1. Cadastro de URL
2. Consulta da URL


### 1 - Cadastro de URLs
```
PUT http://localhost:3000/create?url=https://ge.globo.com/

{
	"alias": "4FJaFz8Uc",
	"url": "https://ge.globo.com/",
	"statistics": {
		"time_taken": "25ms"
	}
}
```
```
PUT http://localhost:3000/create?url=https://github.com/lucasquitan/hire.me&CUSTOM_ALIAS=meu-git

{
	"alias": "meu-git",
	"url": "https://github.com/lucasquitan/hire.me",
	"statistics": {
		"time_taken": "15ms"
	}
}
```
### 2 - Consulta de URL
Para consulta, basta digitar a url base (http://localhost:3000) e o código cadastrado.
```
http://localhost:3000/4FJaFz8Uc
```

