
var camera, scene, renderer;
var effect, controls;
var element, container;
var bulbLight, bulbMat, floorMat, hemiLight
var dist = 500
var size_cube = 5
var size_house_piece = 50
var size_bulb = 5
var param_bulb = 0
var moving = false
var moving_side = false
var direct_side = 'right'
var shoot = false

window.onload = function(event) {


    // ref for lumens: http://www.power-sure.com/lumens.htm
    var bulbLuminousPowers = {
        "110000 lm (1000W)": 110000,
        "3500 lm (300W)": 3500,
        "1700 lm (100W)": 1700,
        "800 lm (60W)": 800,
        "400 lm (40W)": 400,
        "180 lm (25W)": 180,
        "20 lm (4W)": 20,
        "Off": 0
    };

    // ref for solar irradiances: https://en.wikipedia.org/wiki/Lux
    var hemiLuminousIrradiances = {
        "0.0001 lx (Moonless Night)": 0.0001,
        "0.002 lx (Night Airglow)": 0.002,
        "0.5 lx (Full Moon)": 0.5,
        "3.4 lx (City Twilight)": 3.4,
        "50 lx (Living Room)": 50,
        "100 lx (Very Overcast)": 100,
        "350 lx (Office Room)": 350,
        "400 lx (Sunrise/Sunset)": 400,
        "1000 lx (Overcast)": 1000,
        "18000 lx (Daylight)": 18000,
        "50000 lx (Direct Sun)": 50000
    };

    var params = {
        shadows: true,
        exposure: 0.68,
        bulbPower: Object.keys( bulbLuminousPowers )[ 0 ],
        hemiIrradiance: Object.keys( hemiLuminousIrradiances )[0]
    };

    var clock = new THREE.Clock();

    function init() {

      renderer = new THREE.WebGLRenderer();
      //----------------
      renderer.physicallyCorrectLights = true;
      renderer.gammaInput = true;
      renderer.gammaOutput = true;
      renderer.shadowMap.enabled = true;
      //-------------
      element = renderer.domElement;
      container = document.getElementById('container');
      container.appendChild(element);

      effect = new THREE.StereoEffect(renderer);

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
      hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
      scene.add( hemiLight );

      camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 10000);
      //camera.position.set(-500, 400, -200);
      camera.position.set(dist/2, dist/2, dist/2);
      scene.add(camera);

      controls = new THREE.OrbitControls(camera, element);
      // controls.rotateUp(Math.PI / 4);
      controls.target.set(
        camera.position.x + 0.1,
        camera.position.y,
        camera.position.z
      );
      controls.noZoom = true;
      controls.noPan = true;

      function setOrientationControls(e) {
        if (!e.alpha) {
          return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();
        element.addEventListener('click', fullscreen, false);
        window.removeEventListener('deviceorientation', setOrientationControls, true);

    } // end init


   window.addEventListener('deviceorientation', setOrientationControls, true);

    //   Bulb light

    list_bulbs = []
    bulbMat = new THREE.MeshStandardMaterial ( {
        emissive: 0xffffee,
        emissiveIntensity: 1,
        color: 0x000000
       });

      var bulbGeometry = new THREE.SphereGeometry( size_bulb, 16, 8 );
      bulbLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );
      bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
      bulbLight.castShadow = true;
      bulbLight.position.set( 60, 50, -60 );
      list_bulbs.push(bulbLight)
      scene.add( bulbLight );

      //------------------

      var bulletGeometry = new THREE.SphereGeometry( size_bulb/5, 16, 8 );
      bulletLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );
      bulletLight.add( new THREE.Mesh( bulletGeometry, bulbMat ) );
      bulletLight.castShadow = true;
      scene.add( bulletLight );

    // Sky

     var size_sphere = 1000
     make_sky(size_sphere)

      // Buildings

      // var nb_buildings = 100
      // var esp = 100
      // var dist_inter_build = 1500
      // building_with_brick(nb_buildings, esp, dist_inter_build)

      //----- The four columns, pillars, grandes tours en porcelaine

      var column_tower_dic = {}

      var space_col = 20
      height_tow = 20
      var column_tower_base = column_torsed("texture/azulejos_portugal.jpg", 15, 0,0,0, height_tow) // door
      for (i=0;i<4; i++){
          column_tower_dic[2*i] = column_tower_base.clone()
          column_tower_dic[2*i].position.set(45,10,80+space_col*i)
          column_tower_dic[2*i+1] = column_tower_base.clone()
          column_tower_dic[2*i+1].position.set(80,10,80+space_col*i)
      }

      for (i=0; i<Object.keys(column_tower_dic).length+1; i++){
        scene.add( column_tower_dic[i] )
      }

      make_ground(size_sphere*3)

      var geometry = new THREE.SphereGeometry( 100, 32, 32 );
      var texture = new THREE.TextureLoader().load( "texture/azulejos_portugal.jpg" );
      var material = new THREE.MeshBasicMaterial( {map: texture} );
      var balloon = new THREE.Mesh( geometry, material );
      sizeball = 30
      balloon.position.set(sizeball,sizeball,sizeball)
      scene.add(balloon)

      //---------------------------------- Keys

      var forwardstep = 3     // speed for forward movement
      $(document).keydown(function(event){

            if (event.keyCode == "y".charCodeAt(0)-32){
                  var direction = camera.getWorldDirection();
                  distance = -forwardstep;
                  direct = direction.multiplyScalar(distance)
                  camera.position.add( direct );
                  //alert(direct.x + '__' + direct.y + '__' + direct.z )
              } // end if key code
            if (event.keyCode == "u".charCodeAt(0)-32){
                    var direction = camera.getWorldDirection();
                    distance = forwardstep;
                    direct = direction.multiplyScalar(distance)
                    camera.position.add( direct );
                } // end if key code
            if (event.keyCode == "j".charCodeAt(0)-32){
                    var direction = camera.getWorldDirection();
                    perp0 = new THREE.Vector3( -direction.z, 0, direction.x )
                    moving_side = !moving_side
                    direct_side = 'right'
                  } // end if key code
            if (event.keyCode == "h".charCodeAt(0)-32){
                    var direction = camera.getWorldDirection();
                    perp1 = new THREE.Vector3( direction.z,0 , -direction.x )
                    moving_side = !moving_side
                    direct_side = 'left'
                } // end if key code
            if (event.keyCode == "z".charCodeAt(0)-32){
                   direct_shoot = camera.getWorldDirection();
                   shoot = !shoot
                } // end if key code
        })

        // $(document).keydown(function(event){
        //
        //       if (event.keyCode == "q".charCodeAt(0)-32){
        //             var direction = camera.getWorldDirection();
        //             distance = -forwardstep;
        //             direct = direction.multiplyScalar(distance)
        //             camera.position.add( direct );
        //             //alert(direct.x + '__' + direct.y + '__' + direct.z )
        //         } // end if key code
        //       if (event.keyCode == "d".charCodeAt(0)-32){
        //               var direction = camera.getWorldDirection();
        //               distance = forwardstep;
        //               direct = direction.multiplyScalar(distance)
        //               camera.position.add( direct );
        //
        //
        //           } // end if key code
        //   })

      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);

      window.addEventListener('touchstart', function() {
          moving = !moving
         }); // end touchstart
    }

    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      //renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function update(dt) {
      resize();
      camera.updateProjectionMatrix();
      controls.update(dt);
    }

    var previousShadowMap = false;

    function render(dt) {

      if (moving){
          var direction = camera.getWorldDirection();
          distance = 2;
          camera.position.add( direction.multiplyScalar(distance) );
      }
      if (moving_side){
          if (direct_side == 'right'){
              camera.position.add( perp0 );
          }
          else{
             camera.position.add( perp1 );
          }
      }
      var direction = camera.getWorldDirection();

      if (shoot){
         bulletLight.position.add(direct_shoot)
      }
      else{
        bulletLight.position.set( camera.position.x+10*direction.x, camera.position.y+10*direction.y, camera.position.z+10*direction.z )
      }


      renderer.toneMappingExposure = Math.pow( params.exposure, 5.0 ); // to allow for very bright scenes.
      renderer.shadowMap.enabled = params.shadows;

      if( params.shadows !== previousShadowMap ) {
        //   material.needsUpdate = true;
          //floorMat.needsUpdate = true;
          previousShadowMap = params.shadows;
      }

      bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow( 0.02, 2.0 ); // convert from intensity to irradiance at bulb surface
      hemiLight.intensity = hemiLuminousIrradiances[ params.hemiIrradiance ];
      effect.render(scene, camera);
    }

    function animate(t) {
      requestAnimationFrame(animate);
      update(clock.getDelta());
      render(clock.getDelta());
    }

    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }

    init();
    animate();

}
