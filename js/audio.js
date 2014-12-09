var sourceJs;
var buffer;
var boost = 0;

var interval = window.setInterval(function() {
	if($('#loading_dots').text().length < 3) {
		$('#loading_dots').text($('#loading_dots').text() + '.');
	}
	else {
		$('#loading_dots').text('');
	}
}, 500);

/*
	The following section is the setup for routing Audio to the visualizer:

	There are 5 general steps:

	1. Create audio context
	2. Inside the context, create sources — such as <audio>, oscillator, stream
	3. Create effects nodes, such as reverb, biquad filter, panner, compressor
	4. Choose final destination of audio, for example your system speakers
	5. Connect the sources up to the effects, and the effects to the destination.

	For more information see:	https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

*/


// 1. Create audio context, see: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 2. Inside the context, create sources 
var audio  = document.querySelector('audio'); // creating a reference to the <audio> tag on index.html
audio.volume = 0.15;
var source = audioCtx.createMediaElementSource(audio);

// 3. Create effects nodes
var analyser = audioCtx.createAnalyser();


// 4. Choose final destination of audio
analyser.connect(audioCtx.destination);

// 5. Connect the sources up to the effects
source.connect(analyser);




analyser.fftSize = 256;  

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

analyser.getFloatFrequencyData(dataArray);


			$('#info')
				.fadeOut('normal', function() {
					$(this).html('<div id="artist"><a class="name" href="http://www.looperman.com/users/profile/345547" target="_blank">Cufool</a><br /><a class="song" href="http://www.looperman.com/tracks/detail/70506" target="_blank">You in my world instrumental</a><br /></div><div><img src="data/cufool.jpg" width="58" height="58" /></div>');
				})
				.fadeIn();

			clearInterval(interval);


function displayTime(time) {
	if(time < 60) {
		return '0:' + (time < 10 ? '0' + time : time);
	}
	else {
		var minutes = Math.floor(time / 60);
		time -= minutes * 60;
		return minutes + ':' + (time < 10 ? '0' + time : time);
	}
}

function play() {
	$('#play').fadeOut('normal', function() {
		$(this).remove();
	});
	source.start();
}

$(window).resize(function() {
	if($('#play').length === 1) {
		$('#play').width($(window).width());
		$('#play').height($(window).height());

		if($('#play_link').length === 1) {
			$('#play_link').css('top', ($(window).height() / 2 - $('#play_link').height() / 2) + 'px');
			$('#play_link').css('left', ($(window).width() / 2 - $('#play_link').width() / 2) + 'px');
		}
	}
});
