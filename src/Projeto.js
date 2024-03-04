class floresta extends Phaser.Scene {
    constructor() {
      super({ key: 'floresta' });
      this.will //adicionar this. faz com que o will seja uma propriedade da classe inteira
      this.esqueleto
      this.passarinho
      this.teclado
      this.chao
      this.pontuacao = 0
    }

preload() {
    //carrega os assets
    this.load.image('bgFloresta', 'assets/bg1.jpg');
    this.load.image('chao', 'assets/chao.jpg');  
    this.load.spritesheet('will', 'assets/personagem.png', { frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('esqueleto', 'assets/inimigo1.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('passarinho', 'assets/inimigo3.png', { frameWidth: 191, frameHeight: 161 });
}

create() {
    //adiciona os assets, declarar os que contem física
    this.chao = this.physics.add.staticGroup();
    this.add.image(640, 200, 'bgFloresta').setScale(0.3);
    this.will = this.physics.add.sprite(200, 10, 'will').setScale(2);
    this.esqueleto = this.physics.add.sprite(900, 200, "esqueleto").setScale(1);
    this.passarinho = this.physics.add.sprite(1100, 600, "passarinho").setScale(0.7);
    this.chao.create(640, 650, 'chao').setScale(0.3).refreshBody();

    this.cameras.main.startFollow(this.will);
    this.cameras.main.setZoom(2);

    this.anims.create({ //comando da animação
        key: 'existir', //nome da animação
        frames: this.anims.generateFrameNumbers('will', { start: 0, end: 12}), //indicamos quais o frames da animação. 8 frames
        frameRate: 6, //quantidade de frames em 1 segundo (FPS)
        repeat: -1 // (-1 indica repetição contínua, 0 indica sem repetição, e um número positivo indica a quantidade de repetições).
    });

    this.anims.create({
        key: 'pular',
        frames: this.anims.generateFrameNumbers('will', { start: 65, end: 70}),
        frameRate: 5,
        repeat: 1
    });

    this.anims.create({
        key: 'andar',
        frames: this.anims.generateFrameNumbers('will', { start: 13, end: 20}),
        frameRate: 6,
        repeat: -1
    });

    this.will.anims.play('existir', true);      //Ativar a animação 'existir' no Will
    this.will.setCollideWorldBounds(true);      // impedir com que ele saia da tela
    this.physics.add.collider(this.will, this.chao);
    this.will.setSize(15, 30, true)

    this.anims.create({ //comando da animação
        key: 'esqueletar',
        frames: this.anims.generateFrameNumbers('esqueleto', { start: 10, end: 17}), 
        frameRate: 5, 
        repeat: -1
    });

    this.esqueleto.anims.play('esqueletar', true);
    this.esqueleto.setCollideWorldBounds(true);
    this.physics.add.collider(this.esqueleto, this.chao);
    this.esqueleto.setSize(20, 60, true)

    
    this.tweens.add({
        targets: this.passarinho,
        x: 200,
        duration: 3000, // Duração em milissegundos
        ease: 'Power2',
        yoyo: true, // Faz o movimento de ida e volta
        repeat: -1 // Repete infinitamente]
    });

    this.anims.create({
        key: 'voar',
        frames: this.anims.generateFrameNumbers('passarinho', { start: 9, end: 11}),
        frameRate: 10,
        repeat: -1
    });

    this.passarinho.anims.play('voar', true);
    this.passarinho.setCollideWorldBounds(true);
    this.passarinho.body.setAllowGravity(false);

    //Adiciona o teclado
    this.teclado = this.input.keyboard.createCursorKeys();

    //explica os controles e o objetivo
    alert("OBJETIVO: passe maior parte do tempo tocando no dragão. CONTROLES: Aperte os botões left e right do teclado para se mover. Aperte Up para pular.")


}

update() { 

    if (this.teclado.left.isDown) {
        this.will.setVelocityX(-150);
        this.will.anims.play('andar', true);
        this.will.setFlip(true, false);
    }
    
    //Movimento para a direita
    else if (this.teclado.right.isDown) {
        this.will.setVelocityX(150);
        this.will.anims.play('andar', true);
        this.will.setFlip(false, false);
     }

    //Movimento horizontal
    else {
        this.will.setVelocityX(0);
        this.will.anims.play('existir', true);
    }

    if (this.teclado.up.isDown && this.will.body.touching.down) {
        this.will.setVelocityY(-220);
        this.will.anims.play('pular', true);
    }


    if (this.physics.overlap(this.will, this.esqueleto)) {
        this.scene.start('gameover', { pontuacao: this.pontuacao });
        this.scene.stop('floresta');
    }

    if (this.physics.overlap(this.will, this.passarinho)) {

        this.pontuacao += 1
        console.log(this.pontuacao)
    }
    
    if (this.esqueleto.x >= 850) {
        this.esqueleto.setVelocityX(-100)
        this.esqueleto.setFlip(false, false)
    }
    else if (this.esqueleto.x <= 50) {
        this.esqueleto.setVelocityX(100)
        this.esqueleto.setFlip(true, false)
    }
}
}