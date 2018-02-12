package main

import (
	"wwwGo/www"
	"github.com/kataras/iris"
)
func main() {
	app := iris.Default()
	www.Start(app, ":8080")
}
