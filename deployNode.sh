#!/bin/bash

# installing front end dependencies

sudo apt-get update
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

yes | sudo apt-get install -y build-essential nodejs
sudo apt-get update

cd /var/www/myproject/frontend
npm install
npm run build
npm run build

sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
sudo /sbin/mkswap /var/swap.1
sudo /sbin/swapon /var/swap.1

# chmod -R 777 node_modules

# installing apache2
cd ~
sudo apt-get update
sudo apt-get install -y apache2

sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
sudo /sbin/mkswap /var/swap.1
sudo /sbin/swapon /var/swap.1

sudo sed -i 's/DocumentRoot.*/DocumentRoot \/var\/www\/myproject\/frontend/' /etc/apache2/sites-available/000-default.conf
sudo service apache2 restart
