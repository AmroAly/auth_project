#!/bin/bash

sudo apt-get update
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install -y apache2 php7.0 php-mbstring php-zip phpunit unzip libapache2-mod-php php7.0-mysql

sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password 12345'

sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password 12345'


sudo apt-get install mysql-server -y
sudo service mysql start

mysql -u root -p12345 < /vagrant/createUser.sql

echo "ServerName localhost" | sudo tee /etc/apache2/conf-enabled/servername.conf
sudo a2enconf servername
sudo a2dismod php5
sudo a2enmod php7.0
sudo service apache2 restart

sudo a2dissite 000-default.conf
sudo cp /tmp/001-talented.conf /etc/apache2/sites-available
sudo a2ensite  001-talented.conf
sudo service apache2 restart

sudo a2enmod rewrite
sudo service apache2 restart

sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
sudo /sbin/mkswap /var/swap.1
sudo /sbin/swapon /var/swap.1

wget https://getcomposer.org/composer.phar
mv composer.phar composer
chmod +x composer
sudo mv composer /usr/local/bin

sudo chown -R vagrant:vagrant /var/www
# composer global require laravel/installer
cd /var/www/myproject

if [ ! -f .env ]; then
	cp .env.example .env
fi
sudo sed -i 's/DB_DATABASE.*/DB_DATABASE=myproject/' .env
sudo sed -i 's/DB_USERNAME.*/DB_USERNAME=myproject/' .env
sudo sed -i 's/DB_PASSWORD.*/DB_PASSWORD=mypassword/' .env
composer install
php artisan key:generate

# composer create-project --prefer-dist laravel/laravel myproject
chmod -R 777 storage/

# composer dump-autoload

sudo sed -i 's/DocumentRoot.*/DocumentRoot \/var\/www\/myproject\/public/' /etc/apache2/sites-available/000-default.conf
sudo service apache2 restart

sed -i '/mysql/{n;n;n;n;s/'\''DB_DATABASE'\'', '\''.*'\''/'\''DB_DATABASE'\'', '\''myproject'\''/g}' /var/www/myproject/config/database.php
sed -i '/mysql/{n;n;n;n;n;s/'\''DB_USERNAME'\'', '\''.*'\''/'\''DB_USERNAME'\'', '\''myproject'\''/g}' /var/www/myproject/config/database.php
sed -i '/mysql/{n;n;n;n;n;n;s/'\''DB_PASSWORD'\'', '\''.*'\''/'\''DB_PASSWORD'\'', '\''mypassword'\''/g}' /var/www/myproject/config/database.php
