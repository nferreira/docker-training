# Instalação do Docker no Linux

Aqui temos o passo a passo para instalação do Docker CE no Linux

## Ubuntu

### Pré-requisitos
Para instalar do Docker CE, vc precisa de umas das seguintes versões 64 bits do Ubuntu:
* Cosmic 18.10
* Bionic 18.04 (LTS)
* Xenial 16.04 (LTS)

O Docker CE é suportado em x86_64 (ou amd64), armhf, arm64, s390x (IBM Z) e ppc64le (IBM Power)

### Instalando

Primeiro vamos desinstalar qualquer versão antiga do Docker.
```
sudo apt-get -y remove docker docker-engine docker.io containerd runc
```

Agora, vamos atualizar o indice de pacotes do apt-get
```
sudo apt-get update
```

Instalar os pacotes que permitem o apt-get usar HTTPS
```
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

Em seguida, adicionar a chave GPG oficial do Docker
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Depois, adicionar o repositório oficial do Docker
```
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

Agora vamos atualizar o indice de pacotes do apt-get novamente
```
sudo apt-get update
```

E finalmente, instalar os pacotes do Docker
```
sudo apt-get install -y docker-ce docker-ce-cli containerd.io   
```

Agora dar permissão ao usuário vagrant de conectar no docker
```
sudo usermod -aG docker vagrant   
```

