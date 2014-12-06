$(document).ready(function () {

  // Dimension Settings set the scene size
  var width = window.innerWidth;
  var height = window.innerHeight;

  // set some camera attributes
  var view_angle = 45;
  var aspect = width / height;
  var near = 0.1;
  var far = 10000;

  // get the DOM element to attach to
  var $container = $('#container');

  // create a WebGL renderer, camera and a scene
  var renderer = new THREE.WebGLRenderer();
  var camera  = new THREE.PerspectiveCamera(view_angle, aspect, near, far);
  var scene    = new THREE.Scene();

  var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
  var red      = new THREE.MeshLambertMaterial({color: 0xFF0000});
  var grey    = new THREE.MeshLambertMaterial({color: 0x222222});


  // set up the clock vars
  var radiusTop = 20;
  var radiusBottom = 21;
  var clockHeight = 4;
  var radiusSegments = 48;
  var heightSegments = 1;
  var openEnded = false;

  var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, clockHeight, radiusSegments, heightSegments, openEnded);

  var dial    = new THREE.Mesh(geometry, material);

  geometry = new THREE.BoxGeometry(3, 3, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(18,0,0));
  var mark1    = new THREE.Mesh(geometry, grey);

  geometry = new THREE.BoxGeometry(3, 3, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(18,0,0));
  var mark2    = new THREE.Mesh(geometry, grey);

  geometry = new THREE.BoxGeometry(3, 3, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(18,0,0));
  var mark3    = new THREE.Mesh(geometry, grey);

  geometry = new THREE.BoxGeometry(3, 3, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(18,0,0));
  var mark4    = new THREE.Mesh(geometry, grey);

  geometry = new THREE.BoxGeometry(15, 2, 2);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(12,0,0));
  var second  = new THREE.Mesh(geometry, red);

  geometry = new THREE.BoxGeometry(12, 1, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(15,0,0));
  var minute  = new THREE.Mesh(geometry, material);

  geometry = new THREE.BoxGeometry(10, 1, 4);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(15,0,0));

  var hour    = new THREE.Mesh(geometry, material);

  // Positions
  dial.position.x  = 0;
  dial.position.y  = -3;
  dial.position.z  = 0;

  mark1.position.x  = 0;
  mark1.position.y  = 0;
  mark1.position.z  = 0;

  mark2.position.x  = -18;
  mark2.position.y  = 0;
  mark2.position.z  = -18;

  mark3.position.x  = -36;
  mark3.position.y  = 0;
  mark3.position.z  = 0;

  mark4.position.x  = -18;
  mark4.position.y  = 0;
  mark4.position.z  = 18;

  second.position.x = 0;
  second.position.y = 1.5;
  second.position.z = 0;

  // add the clock to the scene
  scene.add(camera);
  scene.add(dial);
  scene.add(mark1);
  scene.add(mark2);
  scene.add(mark3);
  scene.add(mark4);
  scene.add(second);

  // create a point light
  var light = new THREE.SpotLight(0xFFFFFF, 1);

  // set its position
  light.position.x  = 0;
  light.position.y  = 100;
  light.position.z  = 0;
  light.lookAt(dial.position);

  // add to the scene
  scene.add(light);

  // set the camera position
  camera.position.z = 0;
  camera.position.y = 80;
  camera.lookAt(dial.position);

  // enable shadows on the renderer
  renderer.shadowMapEnabled = true;

  // enable shadows for a light
  light.castShadow      = true;
  light.shadowCameraNear = 1.0;
  light.shadowDarkness  = 0.5;

  // enable shadows for an object
  dial.castShadow      = true;
  dial.receiveShadow  = true;

  mark1.castShadow      = true;
  mark1.receiveShadow  = true;

  second.castShadow    = true;
  second.receiveShadow = true;

  minute.castShadow    = true;
  minute.receiveShadow = true;

  hour.castShadow      = true;
  hour.receiveShadow  = true;

  // start the renderer
  renderer.setSize(width, height);

  // and make it pretty
  renderer.setClearColor(0x555753, 1.0);
  renderer.clear();

  // attach the render-supplied DOM element
  $container.append(renderer.domElement);

  // Set initial time
  var now = new Date();
  hour.rotation.y  = -((Math.PI * 2) * (now.getHours()  / 12.0));
  minute.rotation.y = -((Math.PI * 2) * (now.getMinutes() / 60.0));
  second.rotation.y = -((Math.PI * 2) * (now.getSeconds() / 60.0));

  // Animation Tween
  var rotation_start = {angle: now.getSeconds() };
  var rotation_end  = {angle: rotation_start.angle + 1 };

  // dataset on hand object? or attribute directly?
  var tween1 = new TWEEN.Tween( rotation_start ).to( rotation_end, 1000 )
            .easing(TWEEN.Easing.Elastic.InOut)
            //.repeat( Infinity ) couldnt get this to fire 'on complete' to change values.
            .delay( 0 )
            .onUpdate( function() {
              second.rotation.y = -((Math.PI * 2) * (this.angle / 4.0));

            })
            .onComplete( function() {
              rotation_start.angle = new Date().getSeconds();
              rotation_end.angle  = rotation_start.angle + 1;

              // TODO fire off hour/minute animations here?
            })
            .start()

      // questionable? rely on the 1000ms with 0ms delay for accuracy.
      tween1.chain(tween1);


  // Update Method
  var update = function() {
    TWEEN.update();
  };


  // Browser Animation Loop
  var animate = function() {
    update();

    // draw!
    renderer.render(scene, camera);
    requestAnimationFrame( animate );
  };

  animate();
});
