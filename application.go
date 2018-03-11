package main

import (
	"github.com/celerno/wwwGo/www"
	"github.com/kataras/iris"
	"github.com/kataras/golog"
	"os"
)
func init(){
	golog.SetLevel("ERROR")
}
func main() {
	app := iris.Default()
	url := os.Getenv("PORT")
	if len(url) == 0 {
		url=":5000"
	}
	www.Start(app, url)
}
