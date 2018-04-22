
var vibrate_effect=0;

function vibrate_anim()
{
	vibrate_effect+=1;
	var longueur = $(".corde_svg").first().width();
	$(".corde_svg").html("<path d='M 0,20 C 0 20,"+ Math.floor(longueur/2)+" "+((Math.sin(vibrate_effect/5)*20)+20)+", "+longueur+" 20' style='fill:none; stroke:#333; stroke-width:2px;'/>");

	if(vibrate_effect<135)
	{
		setTimeout(vibrate_anim, 10);
	}
	else
	{
		vibrate_effect=0;
		$(".corde_svg").html("<path d='M 0,20 C 0 20,"+ Math.floor(longueur/2)+" 20, "+longueur+" 20' style='fill:none; stroke:#333; stroke-width:2px;'/>");
	}
}


function fallingDrops()
{
	var $drops = $();
	var nbDrops = 30;

	for (var i = 0; i < nbDrops; ++i) {

		var $drop = $('<div class="drop"></div>');

		$drop.css({
			'left': (Math.random() * $('#rainScreen').width()) + 'px',
			'top': ( -Math.random() * $('#rainScreen').height()) + 'px'
		});
		$drops = $drops.add($drop);

		$('#rainScreen').prepend($drops);
	}

	$drops.each(function() {
		
		var uneAnim = function($drop) {
			$drop.animate({
				top: $('#rainScreen').height() + 'px',
			}, Math.random()*-5000 + 5000, function(){
				$drop.css({
					'left': (Math.random() * $('#rainScreen').width()) + 'px',
					'top': (-Math.random() * $('#rainScreen').height()) + 'px',
				});
				uneAnim($drop);
			});
		};
		uneAnim($(this));
	});


};
function konamiCode(){
	var konamiKeys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
	nbTouches = 0;
	var isKonamiOn = false;

	$(document).keydown(function (e) {
		if (e.keyCode === konamiKeys[nbTouches++]) {
			if (nbTouches === konamiKeys.length) {
				if (!isKonamiOn)
				{
					$(".drop").css({'background':'-webkit-linear-gradient(#333,red)'});
					$("body").css({'background':'#333', 'color':'white'});
					$(".logo img").attr("src","images/logoJAChaos.png");
					console.log("konami");
					isKonamiOn = true;
				}
				else
				{
					$(".drop").css({'background':'-webkit-linear-gradient(white,#333)'});
					$("body").css({'background':'white', 'color': '#333'});
					$(".logo img").attr("src","images/logoJA.png");

					isKonamiOn = false;
				}
				nbTouches = 0;
				return false;
			}
		}
		else {
			nbTouches = 0;
		}
	});}




	$(document).ready(function() {


		fallingDrops();
		konamiCode();


		//initialisation des cordes svg	
		var longueur = $(".corde_svg").first().width();
		$(".corde_svg").html("<path d='M 0,20 C 0 20,"+ Math.floor(longueur/2)+" 20, "+longueur+" 20' style='fill:none; stroke:#333; stroke-width:2px;'/>");
		
		$(".corde_svg").hover(function(){
			vibrate_anim();
		});

		//animations smooth entre les parties
		$('a[href^="#"]').click(function(){
			var the_id = $(this).attr("href");
			$('html, body').animate({
				scrollTop:$(the_id).offset().top
			}, 300);
			return false;
		});

		$(".hover").mouseleave(
			function () {
				$(this).removeClass("hover");
			}
			);


		
		//initialisation des skills a des pos random
		$(".skill").each(function(index, element) {

			
			var posx = Math.floor( Math.random() * $(this).parent().width() );
			var posy = Math.floor( Math.random() * $(this).parent().height());

			
			$(this).css({
				'left':posx+'px',
				'top':posy+'px',
			});
	        
	    });

		$(".logo img").mouseenter(function(){
			$(this).addClass("change").delay(2000).queue(function(){
				$(this).removeClass("change").dequeue();
			});

			$(".logo img").click(function(){$("html, body").animate({ scrollTop: 0 }, "slow");});

			


		});


		
		var oldText = "";

//Affiche une progress bar sur un hover des skills
$( ".skill" ).hover(

	function() {
		oldText = $(this).text();
		$(this).text($(this).attr('val'));
		$(this).attr('val',oldText);
		$(this).addClass("skill-span");
		console.log(oldText);
		$(this).css('font-size','-=20px');

		console.log("testHover");

	}, function() {
		$(this).css('font-size','+=20px');
		oldText = $(this).text();
		$(this).text( $(this).attr('val'));
		$(this).attr('val',oldText);
		$(this).removeClass("skill-span");
	}
	);


$(".fa-refresh").click(function(){
	location.reload();
});

$("#rainButton").click(function(){
	var rainScreen = document.getElementById("rainScreen");
	if(rainScreen.style.visibility == "hidden")
	{
		rainScreen.style.visibility = "visible"
		$("#rainButton").style.color = "#333"
	}
	else
	{
		rainScreen.style.visibility = "hidden"
		$("#rainButton").style.color = "#afafaf"
	}
});

$(".projects_img").hover(function(){
	$(this).css('-webkit-transition','700ms' ); 
	$(this).css('-webkit-filter' , 'grayscale(0%)');}, function(){
		$(this).css( '-webkit-transition' , '700ms' ); $(this).css('-webkit-filter', 'grayscale(100%)');}
		
		);

});


