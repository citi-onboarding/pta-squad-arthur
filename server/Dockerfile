# --- Etapa 1: Preparação e Instalação de Sistema ---

# Usar a imagem base do Node 20.9.0 Slim
FROM node:20.9.0-slim

# Instalar dependências de sistema necessárias (como o openssl)
RUN apt-get update -y && apt-get install -y openssl

# Instalar o PNPM globalmente, pois ele não vem no node:slim por padrão
RUN npm install -g pnpm

# --- Etapa 2: Configuração de Usuário e Diretório ---

# Criar o diretório da aplicação e definir permissões iniciais para o usuário 'node'
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Definir o diretório de trabalho
WORKDIR /home/node/app

# --- Etapa 3: Instalação de Dependências (PNPM) ---

# Copiar package.json e pnpm-lock.yaml (se você usa pnpm, este é o arquivo correto)
COPY package.json pnpm-lock.yaml ./

# Instalar dependências usando pnpm. 
# O flag '--shamefully-hoist' é CRÍTICO para ambientes Docker/Linux
# pois ele "achata" o node_modules, corrigindo problemas de symlinks 
# que causam o erro 'Cannot find module'.
RUN pnpm install --shamefully-hoist

# --- Etapa 4: Construção e Permissões Finais ---

# Copiar o restante do código da aplicação para o contêiner
# Usamos --chown para garantir que o usuário 'node' seja o proprietário dos arquivos
COPY --chown=node:node . .

# Rodar a geração do Prisma (ou qualquer outro script de build)
# CORREÇÃO: Usando pnpm para ser consistente.
RUN pnpm generate

# REMOVIDO: A linha 'chown -R ... .prisma' foi removida porque o diretório não estava sendo encontrado. 
# A propriedade já está definida pelo COPY --chown=node:node . .

# Definir o usuário para a execução do servidor (segurança)
USER node

# Expor a porta que a aplicação escuta
EXPOSE 3001

# Comando para iniciar a aplicação
# CORREÇÃO: Usando pnpm para ser consistente.
CMD [ "pnpm", "dev" ]

# Para a documentação seguida para construção desse arquivo, vá para o step 3 do link:
# https://www.digitalocean.com/community/tutorials/como-construir-uma-aplicacao-node-js-com-o-docker-pt