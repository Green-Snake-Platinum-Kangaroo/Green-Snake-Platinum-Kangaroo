var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);
var renderer = new THREE.WebGLRenderer();
var cubes = [];
var controls;

document.body.appendChild(renderer.domElement);

var i = 0;
for(var x = 0; x < 30; x += 2) {
	var j = 0;
	cubes[i] = [];
	for(var y = 0; y < 30; y += 2) {
		var geometry = new THREE.CubeGeometry(2, 1.5, 6);

		var material = new THREE.MeshPhongMaterial({
			color: randomFairColor(),
			ambient: 0x808080,
			specular: 0xffffff,
			shininess: 20,
			reflectivity: 5.5
		});

		cubes[i][j] = new THREE.Mesh(geometry, material);
		cubes[i][j].position = new THREE.Vector3(x, y, 0);

		scene.add(cubes[i][j]);
		j++;
	}
	i++;
}

var light = new THREE.AmbientLight(0x505050);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);


directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, -1, -1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-1, -1, 0);
scene.add(directionalLight);

camera.position.z = 50;

controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

for(var i = 0; i < 7; i++) {
	controls.pan(new THREE.Vector3( 1, 0, 0 ));
	controls.pan(new THREE.Vector3( 0, 1, 0 ));
}

var render = function () {
	// console.log(dataArray);
	analyser.getByteFrequencyData(dataArray);
	var zeros = Array.prototype.slice.call(dataArray);
	zeros = zeros.reduce(function(a, b){ return a + b; });
	// console.log('zeros', zeros, 'data array ',  dataArray, 'data array length', dataArray.length);
	// if(!zeros){
		
 //  }

	if(typeof dataArray === 'object' && dataArray.length > 0 && zeros > 0) {
		// debugger;
		// console.log('make the blocks move');
		// for (var i = 0; i < bufferLength; i++) {
  //       boost += dataArray[i];
  //       console.log('boost', boost / 1000);
  //   }
  //   

		var k = 0;
		for(var i = 0; i < cubes.length; i++) {
			for(var j = 0; j < cubes[i].length; j++) {
				boost += dataArray[i];
				var scale = (dataArray[k] + boost) / 3000;
				// console.log('SCALE', scale, '[i]', i, '[j]', j);
				cubes[i][j].scale.z = (scale < 1 ? 1 : scale);
				// console.log('cube color before', cubes[i][j].material.color.r);
				var red = scale * 50;
				// console.log('red', red);
				// console.log('cube color before', cubes[i][j].material.color.r);
				cubes[i][j].material.color.r = scale + 100;
				// console.log('cube color after', cubes[i][j].material.color.r);
				// cubes[i][j].material.color.g = 0;
				// cubes[i][j].material.color.b = 0;
				// if(k < dataArray.length){
				// 	k += 1;
				// }
				debugger;
				if(isNaN(k)){
					k += 0;
				}
				k += (k < dataArray.length ? 1 : 0);
			}
    }
    boost = boost / bufferLength;
  }

	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
};
// console.log('data array', dataArray.length);
render();
renderer.setSize($(window).width(), $(window).height());

function randomFairColor() {
	var min = 64;
	var max = 224;
	var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
	var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
	var b = (Math.floor(Math.random() * (max - min + 1)) + min);
	return r + g + b;
}
