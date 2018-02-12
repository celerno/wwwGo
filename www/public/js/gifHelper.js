
var gifText = function(d, text){
    var gif = new GIF({
      workers: 1,
      quality: 1,
      background:'white',
      repeat:0,
      width: 400,
      height: 120,
      transparent:true
    });

    let size = 21;
    var palabras = text.split(' ');
    var arr = new Array();
    let texto = '';

      for (var t = 0; t < palabras.length; t++) 
      {
        if(texto.length >0 && texto.length + 1 + palabras[t].length > 21)
          {
            arr.push(texto);
            texto='';
          }
        texto += (texto.length===0?palabras[t]: ' ' + palabras[t]);
      }
    if(texto.length>0){
      arr.push(texto.trim());
    }



  var cText = '';
	for (var i = 0; i < arr.length; i++) {
		
    let c = d.createElement('canvas');
    c.id='c';
    c.width = 400;
    c.height= 100;
   
    var ctx = c.getContext("2d");
    ctx.font = "30px Courier New";
    ctx.fillStyle = "#5a6372";
    ctx.strokeStyle = "#5a6372";
    arr[i] = arr[i].trim();
    ctx.fillText(arr[i], ((size - arr[i].length) * 10), 50);
    ctx.strokeText(arr[i], ((size- arr[i].length) * 10), 50);
    gif.addFrame(c, {delay:2000});
    if(i===(arr.length - 1)){
      let blank = d.createElement('canvas');
      gif.addFrame(blank, {delay:2000});
    }
  }

    gif.on('finished', function(img) {
        var render = d.getElementById('render');
	if(!render){
		render = d.createElement('img');
		var div = d.createElement('div');
    render.setAttribute('id','render');
		div.style.textAlign='center';
		div.style.width='100%';
		div.appendChild(render);
		d.body.appendChild(div);
	}
        render.src=URL.createObjectURL(img);
    });
    gif.render();
//    d.body.appendChild(c);
//    d.body.appendChild(c2);

}
