# [Internals] cgroup, namespaces and Beyond

É bem interessante entender quais ferramentas do Linux permitem o conceito de Container ser explorado e utilizado. Nessa seção, vamos criar um "container" na mão para mostrar o que um container runtime, como o Docker, é responsável de fazer todas as vezes que executamos um comando para criar e rodar um novo container. 

*** Note que nem podemos caracterizar o que vamos criar aqui como um *Container* real. Aqui estamos criando um prototipo de container para fins educacionais.  

Para o nosso exercício vamos utilizar nossa instancia do Vagrant (veja em [Montando o ambiente no Vagrant](../vagrant-env/README.md)) e que já tenha o Docker instalado (veja em [Instalação do Docker no Linux](../docker-install-linux/README.md))

Para nosso exercício, vamos abriar duas conexões ssh ao nó do Vagrant 
1. Um terminal que chamaremos de *Container*; e
2. Outro que chamaremos de Host

## No terminal do Container

```sh
$ vagrant up docker1
Bringing machine 'docker1' up with 'virtualbox' provider...
==> docker1: Checking if box 'ubuntu/xenial64' is up to date...
==> docker1: Booting VM...
==> docker1: Waiting for machine to boot. This may take a few minutes...
    docker1: SSH address: 127.0.0.1:2222
    docker1: SSH username: vagrant
    docker1: SSH auth method: private key
==> docker1: Machine booted and ready!
```

Um vez o ambiente esteja em pé, vamos abrir uma sessão ssh:

```sh
$ vagrant ssh docker1
vagrant ssh docker1
Welcome to Ubuntu 16.04.5 LTS (GNU/Linux 4.4.0-141-generic x86_64)
New release '18.04.2 LTS' available.
Run 'do-release-upgrade' to upgrade to it.
vagrant@docker1:~$
```

Agora vamos criar a disco...

```sh
mkfs.btrfs -f /dev/sdc
mkdir -p /root/btrfs && mount /dev/sdc /root/btrfs -t btrfs && cd /root/btrfs
mkdir -p images containers
btrfs subvol create images/alpine
CID=$(docker run -d alpine true)
docker export $CID | tar -C images/alpine -xf-
btrfs subvol snapshot images/alpine containers/tupperware
touch containers/tupperware/THIS_IS_TUPPERWAAAARE
mount --make-rprivate /
chroot containers/tupperware sh
mount -t proc none /proc
exit
unshare --mount --uts --ipc --net --pid --fork bash
hostname tupperware
exec bash
ps 
pidof unshare
kill `pidof unshare`
mount -t proc none /proc
ps
umount /proc
mount --bind /root/btrfs/containers/tupperware/ /root/btrfs/containers/tupperware/
mount --move /root/btrfs/containers/tupperware/ /root/btrfs/
cd /root/btrfs/
mkdir oldroot
pivot_root . oldroot/
ps -ef
mount
umount -a 
mount -t proc none /proc
umount -l oldroot

#Network (on Host)
CPID=$(pidof unshare)
ip link add h$CPID type veth peer name c$CPID
ip link set c$CPID netns $CPID
ip link set h$CPID master docker0 up

#In container
/sbin/ifconfig -a
ip link set lo up
ip link set c$CPID name eth0 up
ip addr add 172.17.42.3/16 dev eth0
ip route add default via 172.17.42.1

# Back in the container 
exec chroot / sh
```

