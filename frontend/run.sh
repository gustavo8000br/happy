#!/bin/bash

#Set name
NAME=$(basename $0)

#Set option choices
OPTS="hi123"
PUSAGE=""

#This is how to use the script
usage="
Usage:  ./${NAME} [OPTIONS]

Options are:
  -h  Show this message.
  -i  Install dependencies
  -1  Start dev server.
  -2  Start tests.
  -3  Compile prod build.

Example:

./${NAME} -123
"

#Run script
while getopts :${OPTS} i ; do
    case $i in
    1)
      echo "Iniciando servidor de desenvolvimento!"
      nohup yarn dev > /dev/null 2>logs/run-dev.log &;;
    2)
      echo "Iniciando testes!"
      nohup yarn test > /dev/null 2>logs/run-tests.log &;;
    3)
      echo "Iniciando compilação de produção!"
      nohup yarn build > /dev/null 2>logs/compile.log &;;
    i)
      echo "Iniciando instalação das dependencias!"
      nohup yarn > /dev/null 2>logs/install.log &;;
    h | \?) PUSAGE=1;;
    esac
done

#Show help based on selection
if [ ${PUSAGE} ]; then
    echo "${usage}"
    exit 0
fi

#Check for input if none show help.
if [[ $1 == "" ]]; then
    echo "${usage}"
    exit 0
fi
