class intro extends Phaser.Scene {
  constructor() {
    super('intro');
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.x = 0;
    this.y = 0;
    this.text = null;
    this.ball = null;
    this.shot = 0;
    this.track = 0;
    
  }

  preload() {
    this.load.image('ball', 'assets/BALL.png');
    this.load.image('basket', 'assets/Basket.png');
    this.load.image('button', 'assets/Next.png');
  }

  create() {
    this.add.text(20,50,"Press and hold the arrow keys to control the power of the launch",{ fontSize: '17px', fill: '#fff' });
    this.add.text(20,100,"Once you have decided your power press the space bar to launch the ball",{ fontSize: '17px', fill: '#fff' });
    this.add.text(20,150,"Press enter to reset the ball and give you another attempt",{ fontSize: '17px', fill: '#fff' });
    this.add.text(20,175,"Press NEXT to start the game",{ fontSize: '17px', fill: '#fff' });
    const button = this.add.image(400, 300, 'button'); // Replace 'button' with the appropriate image key
  
      button.setInteractive(); // Enable interactivity for the button
  
      button.on('pointerdown', () => {
        this.scene.start('level1'); // Navigate to the 'level2' scene
      });
   // Set depth to 0
  this.ball = this.physics.add.image(30, 600, 'ball');
  this.ball.setScale(0.5);
  this.ball.setBounce(1);
  this.ball.setCollideWorldBounds(true);
  // Add collision detection between ball and basket

    let graphics = this.add.graphics();
    graphics.lineStyle(4, 0xffffff, 1);
    // detect up and down arrow key presses
    const cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keydown', (event) => {
      if (event.code === 'ArrowUp') {
        // move ball up
        this.up = true;
      } else if (event.code === 'ArrowDown') {
        // move ball down
        this.down = true;
      } else if (event.code === 'ArrowLeft') {
        // move ball left
        this.left = true;
      } else if (event.code === 'ArrowRight') {
        // move ball right
        this.right = true;
      } else if (event.code === 'Space') {
        // create new ball
        this.ball.setScale(0.5);
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);
        this.ball.setVelocity(this.x, this.y);
        this.shot = 1;
        this.track++;
        this.text1.setText(`Shots: ${this.track}`);
      }
      else if (event.code === 'Enter') {
        // create new ball
        this.ball.x = 30;
        this.ball.y = 600;
        this.ball.setVelocity(0, 0);
      }
    });

    this.input.keyboard.on('keyup', (event) => {
      if (event.code === 'ArrowUp') {
        this.up = false;
      } else if (event.code === 'ArrowDown') {
        this.down = false;
      } else if (event.code === 'ArrowLeft') {
        this.left = false;
      } else if (event.code === 'ArrowRight') {
        this.right = false;
      }
    });
    this.text = this.add.text(10, 10, `x: ${this.x}, y: ${this.y}`, { font: '16px Arial', fill: '#ffffff' });
    this.text1 = this.add.text(150, 10, `Shots: ${this.track}`, { font: '16px Arial', fill: '#ffffff' });
  }

  update() {
    if (this.up) {
      this.y -= 1;
    }
    if (this.down) {
      this.y += 1;
    }
    if (this.left) {
      this.x -= 1;
    }
    if (this.right) {
      this.x += 1;
    }

    this.text.setText(`x: ${this.x}, y: ${this.y}`);
  }
}
track1 = 0;
class level1 extends Phaser.Scene {
    constructor() {
      super('level1');
      this.left = false;
      this.right = false;
      this.up = false;
      this.down = false;
      this.x = 0;
      this.y = 0;
      this.text = null;
      this.ball = null;
      this.shot = 0;
    }
  
    preload() {
      this.load.image('ball', 'assets/BALL.png');
      this.load.image('basket', 'assets/Basket.png');
      
    }
  
    create() {
     // Set depth to 0
     this.add.text(20,175,"Try and launch the ball into the target",{ fontSize: '17px', fill: '#fff' });
    this.basket = this.physics.add.image(750, 510, 'basket').setDepth(0); // Assign basket image to variable
    this.basket.body.setImmovable(true);
    this.ball = this.physics.add.image(30, 600, 'ball');
    this.physics.add.collider(this.ball, this.basket, () => {
      this.scene.start('level1B'); // Replace this with your desired action
    });
    this.ball.setScale(0.5);
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);
    this.basket.setCollideWorldBounds(true);
    // Add collision detection between ball and basket

      let graphics = this.add.graphics();
      graphics.lineStyle(4, 0xffffff, 1);
      // detect up and down arrow key presses
      const cursors = this.input.keyboard.createCursorKeys();
  
      this.input.keyboard.on('keydown', (event) => {
        if (event.code === 'ArrowUp') {
          // move ball up
          this.up = true;
        } else if (event.code === 'ArrowDown') {
          // move ball down
          this.down = true;
        } else if (event.code === 'ArrowLeft') {
          // move ball left
          this.left = true;
        } else if (event.code === 'ArrowRight') {
          // move ball right
          this.right = true;
        } else if (event.code === 'Space' && this.shot == 0) {
          // create new ball
          this.ball.setScale(0.5);
          this.ball.setBounce(1);
          this.ball.setCollideWorldBounds(true);
          this.ball.setVelocity(this.x, this.y);
          this.shot = 1;
          track1++;
          this.text1.setText(`Attempts: ${track1}`);
        }
        else if (event.code === 'Enter') {
          // create new ball
          this.ball.x = 30;
          this.ball.y = 600;
          this.shot = 0;
          this.ball.setVelocity(0, 0);
        }
      });
  
      this.input.keyboard.on('keyup', (event) => {
        if (event.code === 'ArrowUp') {
          this.up = false;
        } else if (event.code === 'ArrowDown') {
          this.down = false;
        } else if (event.code === 'ArrowLeft') {
          this.left = false;
        } else if (event.code === 'ArrowRight') {
          this.right = false;
        }
      });
      this.text = this.add.text(10, 10, `x: ${this.x}, y: ${this.y}`, { font: '16px Arial', fill: '#ffffff' });
      this.text1 = this.add.text(150, 10, `Attempts: ${track1}`, { font: '16px Arial', fill: '#ffffff' });
    }
  
    update() {
      if (this.up) {
        this.y -= 1;
      }
      if (this.down) {
        this.y += 1;
      }
      if (this.left) {
        this.x -= 1;
      }
      if (this.right) {
        this.x += 1;
      }
  
      this.text.setText(`x: ${this.x}, y: ${this.y}`);
    }
  }
  class level1B extends Phaser.Scene {
    constructor() {
      super({ key: 'level1B' });
    }
    preload(){
      this.load.image('button', 'assets/Next.png');
    }
  
    create() {
      this.add.text(10, 10, `Great Job!`, { font: '16px Arial', fill: '#ffffff' });
      this.add.text(150, 10, `It took you ${track1} Attempts`, { font: '16px Arial', fill: '#ffffff' });
  
      const button = this.add.image(400, 300, 'button'); // Replace 'button' with the appropriate image key
  
      button.setInteractive(); // Enable interactivity for the button
  
      button.on('pointerdown', () => {
        this.scene.start('level2'); // Navigate to the 'level2' scene
      });
    }
  }
track2 = 0;
class level2 extends Phaser.Scene {
    constructor() {
      super('level2');
      this.left = false;
      this.right = false;
      this.up = false;
      this.down = false;
      this.x = 0;
      this.y = 0;
      this.text = null;
      this.ball = null;
      this.shot = 0;
    }
  
    preload() {
      this.load.image('ball', 'assets/BALL.png');
      this.load.image('basket', 'assets/Basket.png');
      this.load.image('wall', 'assets/Wall.png');
      this.load.image('button', 'assets/Next.png');
    }
  
    create() {
     // Set depth to 0
    this.basket = this.physics.add.image(750, 510, 'basket').setDepth(0); // Assign basket image to variable
    this.basket.body.setImmovable(true);
    this.ball = this.physics.add.image(30, 600, 'ball');
    this.wall = this.physics.add.image(400, 600, 'wall');
    this.wall.body.setImmovable(true);
    this.physics.add.collider(this.ball, this.basket, () => {
      this.scene.start('level2B'); // Replace this with your desired action
    });
    this.physics.add.collider(this.ball, this.wall, () => {
      //this.scene.start('level2B'); // Replace this with your desired action
    });
    this.ball.setScale(0.5);
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);
    this.basket.setCollideWorldBounds(true);
    this.wall.setCollideWorldBounds(true);
    // Add collision detection between ball and basket

      let graphics = this.add.graphics();
      graphics.lineStyle(4, 0xffffff, 1);
      // detect up and down arrow key presses
      const cursors = this.input.keyboard.createCursorKeys();
  
      this.input.keyboard.on('keydown', (event) => {
        if (event.code === 'ArrowUp') {
          // move ball up
          this.up = true;
        } else if (event.code === 'ArrowDown') {
          // move ball down
          this.down = true;
        } else if (event.code === 'ArrowLeft') {
          // move ball left
          this.left = true;
        } else if (event.code === 'ArrowRight') {
          // move ball right
          this.right = true;
        } else if (event.code === 'Space' && this.shot == 0) {
          // create new ball
          this.ball.setScale(0.5);
          this.ball.setBounce(1);
          this.ball.setCollideWorldBounds(true);
          this.ball.setVelocity(this.x, this.y);
          this.shot = 1;
          track2++;
          this.text1.setText(`Attempts: ${track2}`);
        }
        else if (event.code === 'Enter') {
          // create new ball
          this.ball.x = 30;
          this.ball.y = 600;
          this.shot = 0;
          this.ball.setVelocity(0, 0);
        }
      });
  
      this.input.keyboard.on('keyup', (event) => {
        if (event.code === 'ArrowUp') {
          this.up = false;
        } else if (event.code === 'ArrowDown') {
          this.down = false;
        } else if (event.code === 'ArrowLeft') {
          this.left = false;
        } else if (event.code === 'ArrowRight') {
          this.right = false;
        }
      });
      this.text = this.add.text(10, 10, `x: ${this.x}, y: ${this.y}`, { font: '16px Arial', fill: '#ffffff' });
      this.text1 = this.add.text(150, 10, `Attempts: ${track2}`, { font: '16px Arial', fill: '#ffffff' });
    }
  
    update() {
      if (this.up) {
        this.y -= 1;
      }
      if (this.down) {
        this.y += 1;
      }
      if (this.left) {
        this.x -= 1;
      }
      if (this.right) {
        this.x += 1;
      }
  
      this.text.setText(`x: ${this.x}, y: ${this.y}`);
    }
  }
  class level2B extends Phaser.Scene {
    constructor() {
      super({ key: 'level2B' });
  }
  preload(){
    this.load.image('button', 'assets/Next.png');
  }
    create(){
      this.add.text(10, 10, `Great Job!`, { font: '16px Arial', fill: '#ffffff' });
      this.add.text(150, 10, `It took you ${track2} Attempts`, { font: '16px Arial', fill: '#ffffff' });
      const button = this.add.image(400, 300, 'button'); // Replace 'button' with the appropriate image key
  
      button.setInteractive(); // Enable interactivity for the button
  
      button.on('pointerdown', () => {
        this.scene.start('level3'); // Navigate to the 'level2' scene
      });
    }
  }
  track3 = 0;
class level3 extends Phaser.Scene {
    constructor() {
      super('level3');
      this.left = false;
      this.right = false;
      this.up = false;
      this.down = false;
      this.x = 0;
      this.y = 0;
      this.text = null;
      this.ball = null;
      this.shot = 0;
    }
  
    preload() {
      this.load.image('ball', 'assets/BALL.png');
      this.load.image('basket', 'assets/Basket.png');
      this.load.image('wall', 'assets/Wall.png');
      this.load.image('button', 'assets/Next.png');
    }
  
    create() {
     // Set depth to 0
    this.basket = this.physics.add.image(750, 510, 'basket').setDepth(0); // Assign basket image to variable
    this.basket.body.setImmovable(true);
    this.ball = this.physics.add.image(30, 600, 'ball');
    this.wall = this.physics.add.image(400, 200, 'wall');
    this.wall1 = this.physics.add.image(550, 0, 'wall');
    this.wall2 = this.physics.add.image(200, 600, 'wall');

    this.wall.setScale(.5);
    this.wall1.setScale(.5);
    this.wall2.setScale(.5);
    this.physics.add.collider(this.ball, this.basket, () => {
      this.scene.start('level3B'); // Replace this with your desired action
    });
    this.physics.add.collider(this.ball, this.wall, () => {
      //this.scene.start('level2B'); // Replace this with your desired action
    });
    this.physics.add.collider(this.ball, this.wall2, () => {
      //this.scene.start('level2B'); // Replace this with your desired action
    });
    this.physics.add.collider(this.ball, this.wall1, () => {
      //this.scene.start('level2B'); // Replace this with your desired action
    });
    this.add.text(150, 10, `Maybe you can knock the walls out of the way with your first attempt`, { font: '16px Arial', fill: '#ffffff' });
    this.ball.setScale(0.5);
    this.ball.setBounce(1);
    this.wall.setBounce(1);
    this.wall1.setBounce(1);
    this.wall2.setBounce(0);
    this.ball.setCollideWorldBounds(true);
    this.basket.setCollideWorldBounds(true);
    this.wall.setCollideWorldBounds(true);
    this.wall1.setCollideWorldBounds(true);
    this.wall2.setCollideWorldBounds(true);
    // Add collision detection between ball and basket

      let graphics = this.add.graphics();
      graphics.lineStyle(4, 0xffffff, 1);
      // detect up and down arrow key presses
      const cursors = this.input.keyboard.createCursorKeys();
  
      this.input.keyboard.on('keydown', (event) => {
        if (event.code === 'ArrowUp') {
          // move ball up
          this.up = true;
        } else if (event.code === 'ArrowDown') {
          // move ball down
          this.down = true;
        } else if (event.code === 'ArrowLeft') {
          // move ball left
          this.left = true;
        } else if (event.code === 'ArrowRight') {
          // move ball right
          this.right = true;
        } else if (event.code === 'Space' && this.shot == 0) {
          // create new ball
          this.ball.setScale(0.5);
          this.ball.setBounce(1);
          this.ball.setCollideWorldBounds(true);
          this.ball.setVelocity(this.x, this.y);
          this.shot = 1;
          track3++;
          this.text1.setText(`Attempts: ${track3}`);
        }
        else if (event.code === 'Enter') {
          // create new ball
          this.ball.x = 30;
          this.ball.y = 600;
          this.shot = 0;
          this.ball.setVelocity(0, 0);
        }
      });
  
      this.input.keyboard.on('keyup', (event) => {
        if (event.code === 'ArrowUp') {
          this.up = false;
        } else if (event.code === 'ArrowDown') {
          this.down = false;
        } else if (event.code === 'ArrowLeft') {
          this.left = false;
        } else if (event.code === 'ArrowRight') {
          this.right = false;
        }
      });
      this.text = this.add.text(10, 10, `x: ${this.x}, y: ${this.y}`, { font: '16px Arial', fill: '#ffffff' });
      this.text1 = this.add.text(150, 10, `Attempts: ${track3}`, { font: '16px Arial', fill: '#ffffff' });
    }
  
    update() {
      if (this.up) {
        this.y -= 1;
      }
      if (this.down) {
        this.y += 1;
      }
      if (this.left) {
        this.x -= 1;
      }
      if (this.right) {
        this.x += 1;
      }
  
      this.text.setText(`x: ${this.x}, y: ${this.y}`);
    }
  }
  class level3B extends Phaser.Scene {
    constructor() {
      super({ key: 'level3B' });
  }
  preload(){
    this.load.image('button', 'assets/Next.png');
  }
    create(){
      this.add.text(10, 10, `Great Job!`, { font: '16px Arial', fill: '#ffffff' });
      this.add.text(150, 10, `It took you ${track2} Attempts`, { font: '16px Arial', fill: '#ffffff' });
      const button = this.add.image(400, 300, 'button'); // Replace 'button' with the appropriate image key
  
      button.setInteractive(); // Enable interactivity for the button
  
      button.on('pointerdown', () => {
        this.scene.start('end'); // Navigate to the 'level2' scene
      });
    }
  }
  class end extends Phaser.Scene {
    constructor() {
      super({ key: 'end' });
  }
    create(){
      let x = track1 + track2 + track3;
      this.add.text(10, 10, `You Win!`, { font: '16px Arial', fill: '#ffffff' });
      this.add.text(150, 10, `It took you ${x} Attempts to compleate the game`, { font: '16px Arial', fill: '#ffffff' });
      const button = this.add.image(400, 300, 'button'); // Replace 'button' with the appropriate image key
  
      button.setInteractive(); // Enable interactivity for the button
  
      button.on('pointerdown', () => {
        this.scene.start('intro'); // Navigate to the 'level2' scene
      });
    }
  }
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: [intro,level1,level1B,level2,level2B,level3,level3B,end]
  };
  
  var game = new Phaser.Game(config);
