# SPTrilhas 🌿🗺️

> Plataforma web desenvolvida para estimular, organizar e facilitar o desenvolvimento do turismo regional, conectando visitantes a rotas, pontos de interesse e experiências locais.

---

## 🚀 Sobre o Projeto

O **SPTrilhas** é uma solução voltada para o setor de turismo, projetada para servir como um guia digital interativo. O objetivo principal é valorizar atrativos locais, incentivar o ecoturismo e o turismo cultural, fornecendo uma interface moderna e intuitiva para quem busca explorar novos destinos.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando uma arquitetura moderna que combina robustez no back-end com agilidade e interatividade no front-end:

*   **Linguagens principais:** 
    *   [TypeScript](https://www.typescriptlang.org/) (~78.7%) — Foco na tipagem segura e experiência de desenvolvimento no front-end.
    *   [PHP](https://www.php.net/) (~19.7%) — Utilizado na camada de aplicação e regras de negócio.
*   **Frameworks e Ferramentas:**
    *   **Laravel Ecosystem:** Estrutura baseada em PHP (com arquivos como `artisan`, `composer.json` e diretórios padrão `app`, `routes`, `database`).
    *   **Vite:** Empacotador de módulos e ferramenta de build de alta performance (`vite.config.ts`).
    *   **Análise e Qualidade de Código:** PHPStan (`phpstan.neon`), PHP Pint (`pint.json`) e EditorConfig (`.editorconfig`).

---

## 📂 Estrutura do Repositório

O projeto segue a organização padrão de frameworks modernos baseados em PHP/TypeScript:

```text
SPTrilhas/
├── app/             # Lógica principal da aplicação (Controllers, Models, etc.)
├── bootstrap/       # Arquivos de inicialização do framework
├── config/          # Arquivos de configuração do sistema
├── database/        # Migrations, seeders e fábricas de dados
├── public/          # Arquivos públicos acessíveis pela Web
├── resources/       # Views, assets e arquivos de estilo/scripts fonte
├── routes/          # Definições de rotas web e de API
├── storage/         # Arquivos gerados pelo sistema, logs e cache
├── tests/           # Testes automatizados (Feature e Unit)
├── vite.config.ts   # Configuração do empacotador Vite
└── composer.json    # Dependências do ecossistema PHP
