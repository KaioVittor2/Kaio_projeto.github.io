class gameover extends Phaser.Scene {
    constructor() {
      super({ key: 'gameover' });
      this.textoPontuacao
      this.pontuacao = 0
    }

preload() {
  this.load.image('bgpoer', 'assets/bg4.jpg');
  this.load.image('gameOver', 'assets/gameOver.jpg');
  this.load.image('tentarNovamente', 'assets/TentarNovamente.png');
}
create(data) {
  this.pontuacao = data.pontuacao || 0;

  this.add.image(640, 200, 'bgpoer').setScale(0.3);
  this.add.image(640, 200, 'gameOver').setScale(1);
  var btnJogar = this.add.image(640, 400, 'tentarNovamente').setScale(1);


  btnJogar.setInteractive();

  btnJogar.on("pointerover", () => {
    this.input.setDefaultCursor("pointer");
  });
  btnJogar.on("pointerout", () => {
    this.input.setDefaultCursor("default");
  });

  
  btnJogar.on("pointerdown", () => {
    this.cameras.main.fadeOut(1000, 209, 209, 209, (camera, progress) => {
      // Quando a transição estiver concluída, carrega o novo cenário
      if (progress == 1) {
        this.children.removeAll(true, true);
        this.scene.start('floresta');
        this.scene.stop('gameover');
      }
    });
  });
  


  
console.log(this.pontuacao)
this.textoPontuacao = this.add.text(640, 310, 'Pontuação: ' + this.pontuacao, {
  font: '32px Arial',
  fill: '#fffff'
});
this.textoPontuacao.setOrigin(0.5);

}
}