$(document).ready(function(){
	$("#content .confirm button").click(function(){
		var sexValue = $(".sex input[name='sex']:checked").val();
		var username = $(".username input[name='username']").val();

		if(username && sexValue){
			$.getJSON('./text.json',function(data){
				var showData = [];
				if(sexValue == 'man'){  
					showData = data.common.concat(data.man);
				}
				if (sexValue == "woman"){
					showData = data.common.concat(data.woman);
				}
				
				var dataLength = showData.length;
				var randonNum = Math.round(Math.random()*(dataLength-1));
				var theText = showData[randonNum];

				var lastText = setText(theText,username);

				// $('body').children('#header').remove();
				$('#header .welcome').text('请长按保存您的小故事');
				$('#header img').remove();
				$('body').children('#content').remove();
				$('body').append('<div id="textContent">'+lastText+'</div>');

				
				html2canvas($("body #textContent"), {
					// canvas: canvas,
                	onrendered: function(canvas) {
                	    var theImage = new Image();
                	    theImage.src = canvas.toDataURL("image/png"); 
                	    theImage.id = 'lastImg'; 
                	    $('body').append(theImage);
                	    $('body').children('#textContent').remove();

                	},
                	background:'#333542'
                	// width: theWidth,
  					// height: theHeight
				});

				

			})
		}
	})
})

function setText(text,user){
	var textHtml = '';
	var replaceHtml = '<span class="bolder">'+user+'</span>';
	for (var i = 0; i < text.length; i++) {

		text[i] = text[i].replace(/<xx>/g,replaceHtml);
		// console.log(text[i].indexOf('<xx>'));
		textHtml += "<p>"+text[i]+"</p>";
	}
	return textHtml;
}