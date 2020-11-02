# Projeto Happy

## Requesitos do sistema

* Linux/MacOSX
* Docker

## Passos necessários para executar o codigo

* Criar os arquivos **``.env``** dentro das pastas **``backend``** e **``frontend``**

  **.env** da pasta **``backend``**

    ```.env
    PORT=3000
    HOST=localhost
    ```

  **.env** da pasta **``frontend``**

    ```.env
    REACT_APP_MAPBOX_TOKEN=seutoken
    PORT=3000
    HOST=localhost
    BACKEND_HOST=localhost
    BACKEND_PORT=3333
    ```

* Executar no terminal, na pasta raiz do projeto:

```bash
docker-compose up

# Ou use:
# docker-compose up -d
# para rodar os servidores em segundo plano
```

## Mais implementações serão adicionadas no futuro
