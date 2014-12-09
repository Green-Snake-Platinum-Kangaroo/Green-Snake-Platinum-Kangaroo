var sourceJs;
var buffer;
var boost = 0;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var audio  = document.querySelector('audio');
audio.volume = 0.15;
var source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
var gainNode = audioCtx.createGain();
source.connect(gainNode);
gainNode.connect(audioCtx.destination);
analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

analyser.getFloatFrequencyData(dataArray);
$('#info')
	.fadeOut('normal', function() {
		$(this).html('<div id="artist"><a class="name" href="http://www.looperman.com/users/profile/345547" target="_blank">Cufool</a><br /><a class="song" href="http://www.looperman.com/tracks/detail/70506" target="_blank">You in my world instrumental</a><br /></div><div><img src="data/cufool.jpg" width="58" height="58" /></div>');
	})
	.fadeIn();
