# BlueGreen Play

Demonstração estática com créditos fictícios. HTML, CSS e JavaScript sem dependências de produção.

## Publicação na Vercel

Importe este repositório. Selecione framework Other e output directory `dist`. Não é necessário comando de build ou instalação. `vercel.json` contém a configuração.

## Testes e limites

Execute `node --check dist/app.js`. Os dados são locais ao navegador. Há seis variações de três mecânicas: slots, dados e números. O painel administrativo está aberto para avaliação e controla somente os dados locais. Não há autenticação de produção, pagamentos, Pix, API de jogos externos ou operações monetárias.

Não apresentar esta demonstração como plataforma pronta para operação financeira. Para produção, implementar autenticação, controle de acesso no servidor, banco de dados, livro de movimentações, integrações contratadas, monitoramento e validação dos requisitos aplicáveis.

## Fluxos para testar

- Criar perfil, buscar jogos e favoritar.
- Recarregar 1.000 créditos fictícios.
- Jogar, conferir saldo e histórico.
- Simular retirada dentro do saldo disponível.
- Pausar e reativar jogos no painel.
- Exportar histórico CSV.
- Reiniciar a demonstração mediante confirmação.

O histórico local retém as últimas 500 movimentações; indicadores representam os dados ainda retidos. A migração para outro domínio não transfere o armazenamento local do navegador.
