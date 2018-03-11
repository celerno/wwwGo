var scheme = document.location.protocol == "https:" ? "wss" : "ws";
var port = document.location.port ? (":" + document.location.port) : "";
var wsURL = scheme + "://" + document.location.hostname + port+"/ws";
var socket = new Ws(wsURL);