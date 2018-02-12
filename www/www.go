package www
import (
	"github.com/kataras/iris"
	"github.com/go-floki/jade"
	"html/template"
	"strings"
	"github.com/kataras/iris/context"
	"github.com/kataras/iris/websocket"
)
var address string
var app *iris.Application 
var templates map[string]*template.Template
var err error
func Start(_app *iris.Application, _address string){
	app = _app
	address = _address
	//app.RegisterView(iris.HTML)
	
	templates, err = jade.CompileDir("./www/views", jade.DefaultDirOptions, jade.DefaultOptions)
	if err!=nil {
		panic(err)
	}
	setupWS(app)
	app.StaticWeb("/", "./www/public")
	app.Get("/", home)
	log:=app.Logger()
	log.SetLevel("DEBUG")

	app.Get("/{req:string regexp(^[A-Za-z]+$)}", func(ctx iris.Context){
		log:=ctx.Application().Logger()
		req := ctx.RequestPath(true)
		//ctx.WriteString(req)
		req = strings.Replace(req,"/", "", -1)
		log.Info("requesting: ", req)

		html:=templates[req]
		if html == nil {
			ctx.StatusCode(404)
			app.FireErrorCode(ctx)
		} else {
			err = html.Execute(ctx,map[string]interface{}{"":""})
			if err!=nil{
				panic(err)
			}	
		}
	})
	run()
}

func setupWS(app *iris.Application){
		ws := websocket.New(websocket.Config{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		})
		ws.OnConnection(handlerWS)
		app.Get("/ws", ws.Handler())
		app.Any("/iris-ws.js", func(ctx context.Context) {
			ctx.Write(websocket.ClientSource)
		})
}
func handlerWS(c websocket.Connection) {
	c.On("chat", func(msg string) {
		app.Logger().Infof("message inc:> ", msg)
		c.To(websocket.Broadcast).Emit("chat", msg)
	})
}
func run(){
	app.Run(iris.Addr(address))
}

func home(ctx iris.Context){
	html:=templates["index"]
	html.Execute(ctx, map[string]interface{}{"title":"chamizo.pro"})
}