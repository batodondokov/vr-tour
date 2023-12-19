firstSceneElements = document.querySelectorAll('.first_scene')
secondSceneElements = document.querySelectorAll('.second_scene')
clickableElements = document.querySelectorAll('.clickable')
cursor = document.querySelector('#cursor')
compass = document.querySelector('#compass_model')
penguin = document.querySelector('#penguin_model')
sky = document.querySelector('#sky')
cam = document.querySelector('#camera')
plate1 = document.querySelector('#plate1')
plate2 = document.querySelector('#plate2')
plate3 = document.querySelector('#plate3')
panel1 = document.querySelector('#panel1')
panel2 = document.querySelector('#panel2')
panel3 = document.querySelector('#panel3')

panelHandler(plate1,panel1)
panelHandler(plate2,panel2)
panelHandler(plate3,panel3)

function changeScene(scene_id) {
  if (scene_id == 1){
    sky.setAttribute("src", 'https://cdn.glitch.global/fdfcd7f5-9d96-45bf-840d-b0bd1e91b766/170311a_Wordie-House_275HDR-Pano.jpg?v=1696304344095')
    penguin.setAttribute("scale", '0.005 0.005 0.005')
    compass.setAttribute("scale", '0 0 0')
    firstSceneElements.forEach(element => {
      element.setAttribute("visible",'true'); 
    });
    secondSceneElements.forEach(element => {
      element.setAttribute("visible",'false'); 
    });
    cam.setAttribute("position", '0 1.6, 0')
    sky.setAttribute("position", '0 0 0')
  }else if (scene_id == 2){
    sky.setAttribute("src", 'https://cdn.glitch.global/fdfcd7f5-9d96-45bf-840d-b0bd1e91b766/170311a_Wordie-House_019HDR-Pano.jpg?v=1696303980891')
    penguin.setAttribute("scale", '0 0 0')
    compass.setAttribute("scale", '0.1 0.1 0.1')
    firstSceneElements.forEach(element => {
      element.setAttribute("visible",'false'); 
    });
    secondSceneElements.forEach(element => {
      element.setAttribute("visible",'true'); 
    });
    cam.setAttribute("position", '0 1.6, 200')
    sky.setAttribute("position", '0 0 200')
  }else{
    alert('error')
  }
}

function panelHandler(plate, panel){
  plate.addEventListener('mouseenter', function () {
    plate.addEventListener('click', function () {
      panel.setAttribute("width",'3'); 
      panel.setAttribute("height",'3'); 
    });
  });
  panel.addEventListener('mouseleave', function () {
    panel.setAttribute("width",'0'); 
    panel.setAttribute("height",'0'); 
  });
}

function changeCursorColor(elements){
  elements.forEach(element => {
    element.addEventListener('mouseenter', function () {
      cursor.setAttribute("color",'green')
    });
    element.addEventListener('mouseleave', function () {
      cursor.setAttribute("color",'black')
    });
  });
  
}

changeCursorColor(clickableElements)

AFRAME.registerComponent('rotate-penguin', {
  schema: { },
  init: function () {

    var penguin = this.el

    penguin.addEventListener('mouseenter', function () {
      penguin.setAttribute("animation-mixer",'clip: Slide'); 
    });
    penguin.addEventListener('mouseleave', function () {
      penguin.setAttribute("animation-mixer",'clip: Walk'); 
    });

    var flag = 'forward'
    function foo() {
      if(flag == 'forward'){
        penguin.emit('rotateForward')
        flag = 'backward'
      }else{
        penguin.emit('rotateBackward')
        flag = 'forward'
      }
      setTimeout(foo, 10000);
    }
    foo(flag);
  }
});

AFRAME.registerComponent('spin-compass', {
  schema: { },
  init: function () {
    var button = document.querySelector('#button')
    var compass = this.el
    button.addEventListener('mouseenter', function () {
      button.addEventListener('click', function(){
        compass.emit('buttonPressed')
      })
    });
  }
});

AFRAME.registerComponent('open-the-door',{
  schema: { },
  init: function (){
    var door = this.el
    door.addEventListener('mouseenter', function () {
      door.setAttribute("src",'assets/door-opened1.png'); 
      door.addEventListener('click', function () {
        changeScene(2)
      });
    });
    door.addEventListener('mouseleave', function () {
      door.setAttribute("src",'assets/door-clossed1.png'); 
    });
  }
})

AFRAME.registerComponent('show-info',{
  schema: { },
  init: function (){
    var pan = this.el
    var info = document.querySelector('#info')

    pan.addEventListener('mouseenter', function () {
      pan.addEventListener('click', function () {
        info.setAttribute("width",'3'); 
        info.setAttribute("height",'3'); 
      });
    });

    info.addEventListener('mouseleave', function () {
      info.setAttribute("width",'0'); 
      info.setAttribute("height",'0'); 
    });
  }
})

AFRAME.registerComponent('exit',{
  schema: { },
  init: function (){
    plate = this.el
    plate.addEventListener('mouseenter', function () {
      plate.addEventListener('click', function () {
        changeScene(1)
      });
    });
  }
})


