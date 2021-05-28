class Player {
  constructor() {
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.xPos = 0
    
  }

  getCount() {
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    })
  }

  updateCount(count) {
    database.ref('/').update({
      playerCount: count
    });
    
  }
  update() {
    var playerIndex = "players/player" + this.index;

    database.ref(playerIndex).set({
      name: this.name,
      distance: this.distance,
      xPos: this.xPos
    })

  }
  static getPlayerInfo() {
    database.ref('players').on("value", (data) => {
      allPlayers = data.val()
    })
  }
  getFinishedPlayers(){
    database.ref('finishedPlayers').on("value", (data) => {
      finishedPlayers = data.val()
   })
  }
  static updateFinishedPlayers(){
    database.ref("/").update({ finishedPlayers: finishedPlayers + 1 })
    
  }
}
