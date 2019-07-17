# Criando o ambiente do Vagrant

*** Esse passo só é necessário para alunos que não estiverem usando Linux como ambiente padrão.  

## Criando o arquivo Vagrant

Crie o arquivo Vagrantfile com o seguinte conteúdo:

```sh
# -*- mode: ruby -*-
# vi: set ft=ruby :
hosts = {
  "docker1" => "11.0.1.10",
  "docker2" => "11.0.1.11",
  "docker3" => "11.0.1.12",
  "docker4" => "11.0.1.13"
}
disk = './secondDisk.vdi'
Vagrant.configure("2") do |config|
  # always use Vagrants insecure key
  config.ssh.insert_key = false
  # forward ssh agent to easily ssh into the different machines
  config.ssh.forward_agent = true

  check_guest_additions = false
  functional_vboxsf     = false

  config.vm.box = "ubuntu/xenial64"
  hosts.each do |name, ip|
    config.vm.define name do |machine|
      machine.vm.hostname = name
      machine.vm.network :private_network, ip: ip
      machine.vm.provider "virtualbox" do |v|
        v.name = name
        disk = "./#{name}-second-disk.vdi"
        unless File.exist?(disk)
          v.customize ['createhd', '--filename', disk, '--variant', 'Fixed', '--size', 20 * 1024]
        end
        v.customize ['storageattach', :id,  '--storagectl', 'SCSI', '--port', 3, '--device', 0, '--type', 'hdd', '--medium', disk]
      end
    end
  end
end
```

Após criar o arquivo agora vamos subir o ambiente

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



