// Dimension Settings set the scene size
var width = window.innerWidth;
var height = window.innerHeight;

// set some camera attributes
var view_angle = 50;
var aspect = width / height;
var near = 1;
var far = 10000;

// get the DOM element to attach to
var $container = $('#container');

  // create a WebGL renderer, camera and a scene
var renderer = new THREE.WebGLRenderer({alpha:true});
var camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);
var scene = new THREE.Scene();

// initial the boxes
var cubes = [];
var controls;

var row = 0;
for(var x = 0; x < 32; x += 2) {
  var col = 0;
  cubes[row] = [];
  for(var y = 0; y < 16; y += 2) {
    var geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    var material = new THREE.MeshLambertMaterial({
      // color: {},
      ambient: 0x808080,
      specular: 0x999999,
      shininess: 100,
      opacity:0.8,
      transparent: true
    });
		cubes[row][col] = new THREE.Mesh(geometry, material);
		cubes[row][col].position.x = x;
    cubes[row][col].position.y = y;
    cubes[row][col].position.z = 0;
    cubes[row][col].material.color.setHSL(0.5,0.8,0.8);
		scene.add(cubes[row][col]);
		col++;
	}
	row++;
}

  // create a point light
var light = new THREE.AmbientLight(0x505050);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(0, 1, 1);
scene.add(light);

light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(1, 1, 0);
scene.add(light);


light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(0, -1, -1);
scene.add(light);

light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(-1, -1, 0);
scene.add(light);

 // set the camera position
camera.position.z = 50;

controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

for(var i = 0; i < 7; i++) {
	controls.pan(new THREE.Vector3( 1, 0, 0 ));
	controls.pan(new THREE.Vector3( 0, 1, 0 ));
}

var render = function () {
	analyser.getByteFrequencyData(dataArray);
	var zeros = Array.prototype.slice.call(dataArray);
	zeros = zeros.reduce(function(a, b){ return a + b; });

	if(typeof dataArray === 'object' && dataArray.length > 0 && zeros > 0) {
		var k = 0;
		var z = 127;
		for(var row = 0; row < cubes.length; row++) {
			for(var col = 0; col < cubes[row].length; col++) {
				// console.log('z',dataArray[z]);
				boost += dataArray[z];
				var scale = (dataArray[k] + boost) / 3000;
					cubes[row][col].material.color.setHSL(dataArray[z] / 255, 0.8, 0.8);
					// console.log('hsl', cubes[i][col].getHSL());
					// console.log('SCALE', scale, '[i]', i, '[col]', col);
					// cubes[i][col].scale.z = (scale < 1 || isNaN(scale)) ? 1 : scale;
					cubes[row][col].scale.z = (dataArray[z] / 10 < 1) ? 1 : dataArray[z] / 10;
					// console.log('cube color before', cubes[i][col].material.color.r);
					var red = scale * 50;
					// cubes[i][col].material.color.r = Math.random() * dataArray[z] - 50;
					// console.log('cube color after', cubes[i][col].material.color.r);
					// cubes[i][col].material.color.g = Math.random() * dataArray[z] - 50;
					// cubes[i][col].material.color.b = 10;

				if(isNaN(k)){
					k += 0;
				}
				k += (k < dataArray.length ? 1 : 0);
					z--;
				}
			}
    }
    boost = boost / bufferLength;
	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
};

  // start the renderer
renderer.setSize(width, height);

// and make it pretty
renderer.setClearColor(0xffffff, 0.7);
renderer.clear();

render();

// attach the render-supplied DOM element
$container.append(renderer.domElement);

function randomFairColor() {
	var min = 64;
	var max = 224;
	var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
	var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
	var b = (Math.floor(Math.random() * (max - min + 1)) + min);
	return r + g + b;
}
