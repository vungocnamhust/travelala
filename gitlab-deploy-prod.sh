#!/bin/bash

git pull https://vungocnam0409:Ditmemay0409.@gitlab.com/soict-it4552e/20202/group10/book-tour-backend master &&\
sudo docker-compose run app yarn &&\
sudo docker-compose up --build --detach &&\
echo "SETUP DONE!!!!!"
