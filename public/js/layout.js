
        
function animOut(element) {
               $(element || this)
               .animate({opacity:0.01},3000)
               .animate({opacity:1},3000); 
         }
         jQuery(function($, undefined) {
            var lastMenu = '';
            
            var terminal = $('#term_demo').terminal(function(cmdNargs, term) {
                
                let command = (cmdNargs.split(' ')[0]||'').toLowerCase();
                var adios = /adios/;
                if(adios.test(cmdNargs)===true){
                    window.location = '/';
                }
                var chat=/chat/;
                if(chat.test(window.location)){
                    if(!socket){
                        term.echo("No hay conexión.")
                        return false;
                    }
                    socket.OnConnect(function () {
                        term.echo('Conectado al chat.');
                    });
                    socket.OnDisconnect(function () {
                        term.echo('Descontectado del chat.');
                    });
                    // read events from the server
                    socket.On("chat", function (msg) {
                        term.echo(msg);
                    });
                    if(cmdNargs.length > 0) {
                        term.echo(cmdNargs);
                        socket.Emit("chat", cmdNargs);                    
                    }
                    return true;
                }
                var proyectos=function(){
                    term.echo('mixe       ------    un blog adaptado en lengua mixe[mixe.chamizo.pro]');
                    term.echo('sitio      ------    source de este sitio[github]');
                    term.echo('blog       ------    blog personal / y sobre cosmos en español');
                    term.echo('ruido/noise -----    ruidos de ciudad/city noise');
                    lastMenu='proyectos';
                }
                var utils=function(){
                    term.echo('mx/us               ------    español / english');
                    term.echo('gif [text]          ------    [text] en un .gif en 21c/frame 400x100');
                    term.echo('chat          ------    cuenta conectada para tutiear lo que escribas')
                    lastMenu='cosas';
                }
                if(command==='proyectos' || command==='projects'){
                    proyectos();
                }
                else if(command==='chat' || command==='habla'){
                        window.location="/chat";
                }
                else if(command==='tools' || command==='cosas'){
                    utils();
                }
                else if(command==='contact' || command==='contacto'){
                    window.location="/contact";
                }
                else if(command==='acerca' || command==='about'){
                    
                    window.location.href="/about";
                }
                else if(command==='ruido' || command==='noise'){
                    
                    window.location.href="/ruidos";
                }
                else if(command==='mixe'){
                    term.echo('estás por abandonar esta página...');
                    term.read();
                    window.location="http://mixe.chamizo.pro";
                }
                else if(command==='blog'){
                    term.echo('estás por abandonar esta página...');
                    term.read();
                    window.location='http://blog.chamizo.pro';
                }
                else if(command==='sitio' || command==='site'){
                    term.echo('estás por abandonar esta página...');
                    term.read();
                    window.location='https://github.com/celerno/www/blob/master/README.md';
                }
                else if(command ==='tuit' || command==='tweet'){
                    $.ajax({method: "POST", url: "/tuit", data:{text: cmdNargs.substring(command.length, 127)}});
                }
                else if(command === 'mx'){
                    animOut($('.en'));
                }
                else if(command === 'us'){
                    animOut($('.sp'));
                }
                else if (command==='/' || command==='home' || command ==='inicio'){
                        window.location="/";
                }
                else if (command==='' || command==='menu' || command ==='menú'  || command ==='ls' || command=='dir'){
                    term.echo('inicio/home         ------    &#8962;');
                    term.echo('proyectos/projects  ------    proyectos / projects');
                    term.echo('acerca/about        ------    sobre mí / about me');
                    term.echo('cosas/tools         ------    &#128295;');
                    term.echo('?                   ------    &#9072;');
                    if(lastMenu==='proyectos'){
                        proyectos();
                    }
                    else if (lastMenu=='cosas'){
                        utils();
                    }
                    lastMenu='';
                }
                else if (command === 'gif'){
                    gifText(document, cmdNargs.substring(4));
                }
                else if (command === '?' || command ==='ayuda' || command==='help'){
                    if(command==='?'){
                        term.echo('Ayuda / Help: ');   
                        term.echo('este sitio utiliza navegación por comandos / this site uses nav by command');
                        term.echo('escribe [menú]&#9166;  / type [menu]&#9166; for main menu / para ir al menú principal.');    
                        term.echo('escribe la [opción] deseada / type [option] of your choice');
                    }
                    else if (command==='ayuda') {
                        term.echo('Ayuda:');   
                        term.echo('este sitio utiliza navegación por comandos.');
                        term.echo('escribe [menú]&#9166; para ir al menú principal.');    
                        term.echo('elige una de las opciones presentadas y presiona enter &#9166;');
                    }
                    else if (command==='help') {
                        term.echo('Ayuda:');   
                        term.echo('this site uses nav by command.');
                        term.echo('type [menu]&#9166; for main menu');    
                        term.echo('type the [option] of your choice and press enter &#9166;');

                    }

                }
                else if (command !== '') {
                    term.echo('aún no reconozco la palabra [' + command + '] (._. \')');
                    term.echo('escribe [ayuda] &#9166; / type [help] &#9166;');
                }
                }

                , {
                    greetings: 'chamizo.pro - [toda entrada es &#128190; / inputs here are &#128190;]',
                    name: 'js_demo',
                    height: 120,
                    prompt: '_> '
                });
                terminal.exec('', true);
            });
