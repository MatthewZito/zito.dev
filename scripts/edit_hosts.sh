#!/usr/bin/env bash   
#title          :edit_hosts
#desc           :add, remove /etc/hosts entries by IP and hostname
#author         :Matthew Zito (goldmund)
#created        :02/2021
#version        :1.0.0  
#usage          :bash ./edit_hosts.sh
#environment    :bash 5.0.17
#===============================================================================
IFS=$'\n'

# local constants
ROOT_UID=0
E_NOTROOT=87
E_FILENOTFOUND=2
E_ARGS=88

HOSTS_FILE="/etc/hosts"
DEFAULT_IP="127.0.0.1"
IP=${3:-$DEFAULT_IP}

usage () {
  cat <<EOF
Add or remove a given line from /etc/hosts. Must be run as root.

Usage: 
  $0 \$1 \$2 ?\$3
Options: 
  add (\$1) Add an entry, \$2, for IP addr ( \$3 OR $DEFAULT_IP)
  rm (\$1 Remove an entry, \$2, for IP addr ( \$3 OR $DEFAULT_IP)

Examples: 
  $0 add local-dev.site 127.0.0.1 
  $0 rm local-dev.site 127.0.0.1 

EOF
  exit 1
}

# begin script
set -o errexit
set -o nounset

source "$(dirname $0)/util.sh"

if [[ ! -e $HOSTS_FILE ]];then
  panic $E_FILENOTFOUND "Hosts file not found"
fi

if [[ ! $UID -eq $ROOT_UID ]]; then
  panic $E_NOTROOT "Must execute as root"
fi

if (( $# < 2 )); then
  panic $E_ARGS "Insufficient arguments"
fi

case "$1" in
  add )
    echo "$IP $2" >> $HOSTS_FILE
    ;;
  rm )
    sed -ie "\|^$IP $2\$|d" $HOSTS_FILE
    ;;
  * )
    usage
    ;;
esac

exit
