## INDICE

* [SOBRE](#sobre)
* [MAPA](#mapa)
* [PROBLEMAS](#problemas)
* [CREDITOS](#creditos)
</br>

## SOBRE

Site agregador dos eventos realizados por todos os gerúndios do projeto Acolher — tanto showcase da programação como repositório de eventos passados, e suas gravações.

## MAPA

```
.
├── css/
│   ├── base
│   ├── normalize
│   ├── schedule
│   └── tags
├── font/
│   ├── Monoton-Regular
│   └── Rubik-VariableFont_wght
├── img/
│   ├── logo/
│   │   └── [...]
│   ├── portrait/
│   │   └── [...]
│   └── theater
├── js/
│   ├── cardGenerator
│   ├── cardInfo
│   └── monthFormat
├── index
└── readme
```

## PROBLEMAS

### A lista do filtro está vazia
A linha `populateComboBox(container);` foi removida do final @ js/cardInfo

### "Uncaught TypeError: tags.join is not a function"
Um parâmetro está ausente em `generateEvent()` @ js/cardInfo

## CREDITOS

Gabriel Lacerda - CSS</br>
Rafael Vaz - JS</br>
Manel Roig @ FreeFrontend - Botão com setas
Felix Mooneeram @ Unsplash - Imagem de fundo
