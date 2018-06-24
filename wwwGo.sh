#!/bin/bash
case $1 in
    start)
        echo "Starting wwwGo"
        /appmaster/go/src/github.com/celerno/wwwGo/wwwGo &
        ;;
    stop)
        echo "Stopping wwwGo."
        sudo kill $(sudo lsof -t -i:80)
        ;;
    *)
        echo "wwwGo service."
        echo $"Usage $0 {start|stop}"
        exit 1
esac
exit 0