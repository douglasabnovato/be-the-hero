# Avaliação — be-the-hero

> Data: 30/10/2026 · Base: `dedd929`. Teste automático em cópia limpa, no Windows com Node 24; links testados uma vez.

## Execução

| Parte | Instalação | Testes | Build |
|---|---|---|---|
| `backend` | falha | não há | não há |
| `frontend` | passa | falha | falha |
| `mobile` | passa | não há | não há |

Falhas de instalação de módulos nativos podem ser próprias do Node 24 no Windows. O CI do PR, com Node 22 no Linux, é a referência.

## Publicação

| Endereço citado no README | Situação |
|---|---|
| https://be-the-hero-api.onrender.com/health | **sem resposta** |
| https://be-the-hero-web.onrender.com | **404** |

## Limites

O código e as telas não foram revisados um a um. Um endereço que responde não prova que a aplicação funciona, e um servidor gratuito pode estar dormindo.
