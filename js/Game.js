class Game {
  constructor() { }



  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200)
    car1.addImage(img1)
    car2 = createSprite(300, 200)
    car2.addImage(img2)
    car3 = createSprite(500, 200)
    car3.addImage(img3)
    car4 = createSprite(700, 200)
    car4.addImage(img4)
    cars = [car1, car2, car3, car4]
    passed = false
  }

  play() {
    background("grey")
    imageMode(CENTER)
    image(backgroundImage, displayWidth / 2, -displayHeight * 11, displayWidth, displayHeight * 25)
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo()
    //console.log(allPlayers)
    var displayPosition = 150
    if (allPlayers != undefined) {
      var index = 0
      var x
      var y

      for (var plr in allPlayers) {
        textSize(20)
        index += 1
        x += 200 + allPlayers[plr].xPos
        y = displayHeight - allPlayers[plr].distance

        cars[index - 1].x = x
        cars[index - 1].y = y

        if (index === player.index) {
          console.log("working")
          cars[index - 1].shapeColor = "red"
          camera.position.y = cars[index - 1].y
        }

        else {
          cars[index - 1].shapeColor = "black"
        }

        // text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 100, displayPosition)
        displayPosition += 50

      }

    }


    player.getFinishedPlayers()

    if (player.distance <= 18165) {
      player.update();
      //console.log(finishedPlayers)
      //finishedPlayers += 1
      if (keyIsDown(UP_ARROW) && player.index != null) {
        //player.distance += 550
        yVelocity = yVelocity + 0.9
        if (keyIsDown(LEFT_ARROW) && player.index != null) {
          xVelocity = xVelocity - 0.1

        }
        if (keyIsDown(RIGHT_ARROW) && player.index != null) {
          xVelocity = xVelocity + 0.1

        }
      }


    } else if (passed == false){
      
      Player.updateFinishedPlayers()
      passed = true
    }
    player.distance = player.distance + yVelocity
    player.xPos = player.xPos + xVelocity
    player.update()
    drawSprites();
  }
  end() {
    //console.log("啊待会发贺卡上的看法是肯定会发考试的")
  }



}