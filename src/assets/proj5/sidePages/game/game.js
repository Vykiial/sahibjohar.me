/*
  Sahib Johar, Jack Burger
  2021-06-08
  Main JS File
  This is our code file for final summative project
*/

// The current speedrun record for the game is 47 seconds 

// The following creates a new global variable and assigns a Phaser scene object to it. It's created as a global variable because it is referenced through almost every line of code.
let mainScene = new Phaser.Scene('mainScene');

// The following gets checks the local storage to see if the user has already entered a name and if not asks them for one. If one is not given their name is set as 'Player'. In both cases it adds their name to the local storage
mainScene.name = window.localStorage.getItem('name');
if(window.localStorage.length == 0){
	mainScene.name = prompt('Please enter your name. (Max 7 letters)');
	window.localStorage.setItem('name', mainScene.name);
	if(mainScene.name == null || mainScene.name == ''){
		mainScene.name = 'Player';
		window.localStorage.setItem('name', mainScene.name);
	}
}

/********************************************************************************************
The following is evidence of the use of string functions by ********************************************************************************************/
mainScene.name = mainScene.name.trim();
mainScene.firstLetter = mainScene.name.substring(0, 1);
mainScene.firstLetter = mainScene.firstLetter.toUpperCase();
mainScene.restOfName = mainScene.name.substring(1, 7);
mainScene.name = mainScene.firstLetter.concat(mainScene.restOfName);

// The following set of code preloads all the assets needed for the core game
mainScene.preload = function(){
	// The following load in the player, enemy, coin, and volume button spritesheets
	this.load.spritesheet('player', '../../assets/sprites/arioSpriteSheet.png', {
		frameWidth: 17, 
		frameHeight: 26
	});
	this.load.spritesheet('oomba', '../../assets/sprites/oombaSpriteSheet.png', {
		frameWidth: 19,
		frameHeight: 20
	});
	this.load.spritesheet('coin', '../../assets/sprites/coinSprite.png', {
    frameWidth:24,
    frameHeight: 21
  });
  this.load.spritesheet('volume', '../../assets/sprites/muteButtonSprite.png', {
    frameWidth: 56,
    frameHeight: 55,
  });

	// The following loads in the image for the tilemap as well as the tilemap itself
	this.load.image('tileset', '../../assets/tilesets/arioTileSet.png');
	this.load.tilemapTiledJSON('background','../../assets/tilesets/arioMap.json');

	// The following loads in all the images used in the core game
	this.load.image('retryScreen', '../../assets/images/midScreen.png');
	this.load.image('button', '../../assets/images/button.png');
	this.load.image('lava', '../../assets/sprites/lava.png');
	this.load.image('winBack', '../../assets/sprites/winBack.png');
	this.load.image('leaderboard', '../../assets/sprites/leaderboard.png');

  // The following loads the audio used in the core game
  this.load.audio('music', '../../assets/music/music.mp3');
}

// The following creates and displays the objects used in the game
mainScene.create = function(){
	// The following creates a local variable to manually add in mini game scenes later on
	this.alive = 'mainMenu';

	// The following creates local variables to store the dimensions of the player's screen
	this.gameW = this.sys.game.config.width;
	this.gameH = this.sys.game.config.height;

	// The following block of code creates and appropriately places objects that are related to the Main Menu
	this.mainMenu = this.add.image(this.gameW / 2, this.gameH / 2.25, 'retryScreen');
	this.mainMenu.setDepth(1);
	this.mainMenu.setScale(2);
	this.mainMenuTitle = this.add.text(this.mainMenu.x - 320, this.mainMenu.y - 230, 'The Adventures of Ario', {fontSize: '48px'});
	this.mainMenuTitle.setDepth(1);
	this.mainMenuPlayButton = this.add.image(this.mainMenu.x, this.mainMenu.y, 'button');
	this.mainMenuPlayButton.setDepth(1);
	this.mainMenuPlayButtonText = this.add.text(this.mainMenu.x - 36, this.mainMenu.y - 15, 'Play', {fontSize: '30px'});
	this.mainMenuPlayButtonText.setDepth(1);
	this.mainMenuPlayButton.setInteractive();
	this.mainMenuHomeButton = this.add.image(this.mainMenu.x - 125, this.mainMenu.y + 100, 'button');
	this.mainMenuHomeButton.setDepth(1);
	this.mainMenuHomeButton.setInteractive();
	this.mainMenuHomeButtonText = this.add.text(this.mainMenu.x - 160, this.mainMenu.y + 85, 'Home', {fontSize: '30px'});
	this.mainMenuHomeButtonText.setDepth(1);
	this.mainMenuHelpButton = this.add.image(this.mainMenu.x + 125, this.mainMenu.y + 100, 'button');
	this.mainMenuHelpButtonText = this.add.text(this.mainMenu.x + 90, this.mainMenu.y + 85, 'Help', {fontSize: '30px'});
	this.mainMenuHelpButtonText.setDepth(1);
	this.mainMenuHelpButton.setDepth(1);
	this.mainMenuHelpButton.setInteractive();
	this.mainMenuAlertText = this.add.text(this.mainMenu.x - 335, this.mainMenu.y - 160, 'Best played on 1920x1080 resolution \nwith hardware acceleration on', {
		fontSize: '32px', 
		align: 'center'
	});
	this.mainMenuAlertText.setDepth(1);

	// The following code creates and displays the tilemap as well as all of its layers
	this.background = this.make.tilemap({ key: 'background' });
	this.tileset = this.background.addTilesetImage('arioTileset', 'tileset');
	this.ground = this.background.createLayer('Ground', this.tileset);
	this.backgroundLayer = this.background.createLayer('Background', this.tileset);
	this.platforms = this.background.createLayer('Platforms', this.tileset);
	this.castleBackgrounds = this.background.createLayer('CastleBackgrounds', this.tileset);
	
	// The following creates the last two layers of the tilemap as game objects and enables the physics engine for those objects
	this.lava = this.background.createFromObjects('Lava', {
		name: 'Lava',
		key: 'lava'
	});
	this.physics.world.enable(this.lava, 1);
	this.winBack = this.background.createFromObjects('WinBack', {
		name: 'WinBack',
		key: 'winBack'
	});
	this.physics.world.enable(this.winBack, 1);

	// The following codes creates and displays the player object as well as sets the size for it
	this.player = this.physics.add.sprite(170, this.gameH / 1.3, 'player');
	this.player.setScale(1.6);
	this.player.setSize(14, 20, true);

	// The following code sets the world boundary to the size of the tilemap as well as adds collision between the player and the world boundary, the floor, and the platforms 
	this.physics.world.setBounds( 0, 0, 6528, this.gameH);
	this.player.setCollideWorldBounds(true);
	this.ground.setCollisionByProperty({collides: true});
	this.platforms.setCollisionByProperty({collides: true});
	this.physics.add.collider(this.player, this.ground);
	this.physics.add.collider(this.player, this.platforms);

	// The following sets the bounds of the main camera to the dimensions of the tilemap as well as sets it to follow the this.player object
	this.cameras.main.setBounds(0, 0, 6528, this.gameH);
	this.cameras.main.startFollow(this.player);

  /******************************************************************************************The following is evidence of the use of arrays ******************************************************************************************/
	// The following code creates 3 arrays for the three different sets of coins throughout the map. It makes use of for loops to add a coin object to each index in each array and adds collision between the coins and the ground and platforms in the same loop
  this.coin = [];
  this.coinGroup1 = [];
  this.coinGroup2 = [];
	for(let c = 0; c < 9; c++){
    this.coin[c] = this.physics.add.sprite(c * 700 + 80, this.gameH / 2, 'coin');
    this.coinGroup1[c] = this.physics.add.sprite(c * 20 + 2820 , this.gameH / 5, 'coin');
    this.coinGroup2[c] = this.physics.add.sprite(c * 30 + 5800, this.gameH / 5, 'coin');
    this.physics.add.collider(this.coin[c], this.platforms);
    this.physics.add.collider(this.coinGroup1[c], this.platforms);
    this.physics.add.collider(this.coinGroup2[c], this.platforms);
    this.physics.add.collider(this.coin[c], this.ground);
    this.physics.add.collider(this.coinGroup1[c], this.ground);
    this.physics.add.collider(this.coinGroup2[c], this.ground);
  }

	// The following block of code contains all the code for creating and displaying the leaderboard 
	this.leaderboard = this.add.image(this.gameW - (288 * 1.5), 0, 'leaderboard');
	this.leaderboard.setOrigin(0, 0);
	this.leaderboard.setScale(1.5);
	this.leaderboard.setScrollFactor(0);
	this.leaderboard.setDepth(1);
	this.leaderboardMarioScore = 1700;

	/******************************************************************************************The following is more evidence of the use of arrays ******************************************************************************************/
	// The following code creates an array for the leaderboard and adds randomized numbers to each index of the array to be used in the leaderboard. (The leaderboard does not contain real scores) The scores created by the random number generator are between 200 and 1600 with are normal scores for the game
	this.leaderboardNames = ['Mario', 'HassanIsBad123', 'Hassan', 'James', 'Gerald', 'Requis', 'Amber', 'Jackson', 'Lamar', 'Jefferson'];
	this.leaderboardScores = [];
	this.leaderboardNamesText = [];
	this.leaderboardScoreText = [];
	for(let i = 0; i < 9; i++){
		this.leaderboardScores[i] = Math.round(Math.random() * 1400 / 10) * 10 + 200;
	}

	/******************************************************************************************The following is evidence of the use of bubble sorting ******************************************************************************************/
	// The following calls on the bubble sort function we created to sort the randomized score leaderboard from greatest to least
	this.leaderboardScores = bubbleSort(this.leaderboardScores);

	// The following code contains the rest of the code to create and display the rest of the elements of the leaderboard and uses for loops to assign different objects to different indexies of the arrays 
	this.leaderboardNameTextCounter = 0;
	for(let i = 0; i < 10; i++){
		this.leaderboardNameTextCounter += 22.5;
		this.leaderboardNamesText[i] = this.add.text(this.leaderboard.x + 48, this.leaderboard.y + this.leaderboardNameTextCounter, this.leaderboardNames[i], {fontSize: '16px'});
		this.leaderboardNamesText[i].setScrollFactor(0);
		this.leaderboardNamesText[i].setDepth(1);
	}
	for(let i = 0; i < 10; i++){
		this.leaderboardNamesText[i].y += 40;
	}
	this.leaderboardTitleText = this.add.text(this.leaderboard.x + 115, this.leaderboard.y + 20, 'Leaderboard', {fontSize: '32px'});
	this.leaderboardTitleText.setScrollFactor(0);
	this.leaderboardTitleText.setDepth(1);
	this.leaderboardNameTextCounter = 22.5;
	for(let i = 0; i < 10; i++){
		this.leaderboardNameTextCounter += 22.5;
		this.leaderboardScoreText[i] = this.add.text(this.leaderboard.x + 350, this.leaderboard.y + this.leaderboardNameTextCounter, this.leaderboardScores[i], {fontSize: '16px'});
		this.leaderboardScoreText[i].setScrollFactor(0);
		this.leaderboardScoreText[i].setDepth(1);
	}
	for(let i = 0; i < 10; i++){
		this.leaderboardScoreText[i].y += 40;
	}
	this.leaderboardMarioScoreText = this.add.text(this.leaderboard.x + 350, this.leaderboard.y + 65, this.leaderboardMarioScore, {fontSize: '16px'});
	this.leaderboardMarioScoreText.setScrollFactor(0);
	this.leaderboardMarioScoreText.setDepth(1);

// The following is the code that creates and displays the oomba objects within the game by assigning each to its own index in the array and changes their size as well as adds collision between the floor, platforms and itself.
	this.oomba = [];
	for(let i = 0; i < 15; i++){
		// The following create sprites within the oomba array
		this.oomba[i] = this.physics.add.sprite(i * 370 + 700, this.gameH / 3, 'oomba');
		// The following increases the oomba objects scaling
		this.oomba[i].setScale(1.25);
		// The following adds collion between the oomba objects and the ground object
		this.physics.add.collider(this.oomba[i], this.ground);
		// The following adds collion between the oomba objects and the platform objects
		this.physics.add.collider(this.oomba[i], this.platforms);
	}

  //The following is the code to create and display the mute button within the game
  this.volume = this.add.sprite(this.gameW - 50, 800, 'volume');
	this.volume.setScrollFactor(0);
	this.volume.setInteractive();

  //The following is the code related to creating the music within the game
  this.music = this.sound.add('music');
	this.music.setVolume(.05);
	this.music.play();
  this.music.setLoop(true);

	// The following blocks of code are used to create animations for the different sprites in the game
	// This next block of code is used to create all player animations
	this.anims.create({
		key: 'walkingRight',
		repeat: 0,
		frames: this.anims.generateFrameNames('player', {start: 1, end: 2}),
		frameRate: 5
	});
	this.anims.create({
		key: 'standingRight',
		repeat: 0,
		frames: this.anims.generateFrameNames('player', {start: 0, end: 0}),
		frameRate: 1
	});
	this.anims.create({
		key: 'walkingLeft',
		repeat: 0,
		frames: this.anims.generateFrameNames('player', {start: 3, end: 4}),
		frameRate: 5
	});
	this.anims.create({
		key: 'standingLeft',
		repeat: 0,
		frames: this.anims.generateFrameNames('player', {start: 5, end: 5}),
		frameRate: 1
	});
	this.anims.create({
		key: 'jumpingRight',
		repeat: 0,
		frames: this.anims.generateFrameNames('player', {start: 6, end: 6}),
		frameRate: 1
	});
	this.anims.create({
		key: 'jumpingLeft',
		repeat: 0,
		frames: this.anims.generateFrameNames('player', {start: 9, end: 9}),
		frameRate: 1
	});

	// This next block of code is used to create all oomba animations
	this.anims.create({
		key: 'oombaRight',
		repeat: 0,
		frames: this.anims.generateFrameNames('oomba', {start: 0, end: 3}),
		frameRate: 10
	});
	this.anims.create({
		key: 'oombaLeft',
		repeat: 0,
		frames: this.anims.generateFrameNames('oomba', {start: 4, end: 7}),
		frameRate: 10
	});

  // The following is the animation for the coins 
  this.anims.create({
		key: 'coinSpin',
		repeat: -1,
		frames: this.anims.generateFrameNames('coin', {start: 0, end: 4}),
		frameRate: 7
	});

  // The following code contain the animations for the mute button
  this.anims.create({
		key: 'mute',
		repeat: 0,
		frames: this.anims.generateFrameNames('volume', {start: 0, end: 1}),
		frameRate: 10
	});
  this.anims.create({
		key: 'unMute',
		repeat: 0,
		frames: this.anims.generateFrameNames('volume', {start: 1, end: 0}),
		frameRate: 10
	});

	// The following code is related to keeping track of the player's points as well as displaying them
	this.points = 0;
	this.pointsText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px'});
	this.pointsText.setScrollFactor(0);

	// The following code is related to creating the timer of the game and displaying it
	this.sec = 0;
	this.min = 0;
	this.timeText = this.add.text(500, 16, 'Time: 00:00', {fontSize: '32px'});
	this.timeText.setScrollFactor(0);

	// The following code is the code to montior keyboard inputs from the user and assign it to local variables
	this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
	this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
	this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
	this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
	this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

	// The following block of code is used to creating and displaying the lose/win screen
	this.retryScreen = this.add.image(this.gameW / 2, this.gameH / 2.25, 'retryScreen');
	this.retryButton = this.add.image(this.gameW / 2.25, this.gameH / 2, 'button');
	this.homeButton = this.add.image(this.gameW / 1.8, this.gameH / 2, 'button');
	this.retryText = this.add.text(this.retryButton.x - 35, this.retryButton.y - 12.5, 'Retry',{fontSize: '24px'});
	this.homeText = this.add.text(this.homeButton.x - 30, this.homeButton.y - 12.5, 'Home', {fontSize: '24px'});
	this.loseText = this.add.text(this.retryText.x - 25, this.retryScreen.y - 100, 'You Lose, ' + mainScene.name + '!' , {fontSize: '32px'});
	this.winText = this.add.text(this.retryText.x - 10, this.retryScreen.y - 100, 'You Win, ' + mainScene.name + '!', {fontSize: '32px'});
	moveScreenBack();
	this.retryScreen.setScrollFactor(0);
	this.retryButton.setScrollFactor(0);
	this.homeButton.setScrollFactor(0);
	this.retryText.setScrollFactor(0);
	this.homeText.setScrollFactor(0);
	this.loseText.setScrollFactor(0);
	this.winText.setScrollFactor(0);
}

/********************************************************************************************The following is more evidence of the use of arrays ********************************************************************************************/
// The following creates two local arrays and and assigns booleans to each to index of each array to keep track of which way the oombas should be moving
mainScene.oombaMoveRight = [];
mainScene.oombaMoveLeft = [];
for(let z = 0; z < 15; z++){
	// The following assigns 'true' to 10 of the first elements in the oombaMoveRight array
	mainScene.oombaMoveRight[z] = true;
	// The following assigns 'false' to 10 of the first elements in the oombaMoveLeft array
	mainScene.oombaMoveLeft[z] = false;
}

// The following creates two local variables to keep track of when the timer should start as well as whether the music is muted or not
mainScene.mute = false;
mainScene.timer = false;

// The following is the main game loop
mainScene.update = function(){
	// The following code uses the mainScene.timer variable that was created above to decide when the timer should start. When the timer does start it calls on the timer function to keep track of the time.
	if(this.timer == true){
		timer();
	}

	// The following checks if the player is alive and if so allows movement, collision with oombas and with lava. The code from here until line 454 only runs if the player is alive
	if(this.alive == 'true'){
		movePlayer();
		oombaArioTopCollision();
		if(oombaArioLeftRightCollision()){
			bringLoseScreenforward();
			this.player.setDepth(-1);
			this.alive = 'false';
		}
		if(lavaCollision()){
			bringLoseScreenforward();
			this.player.setDepth(-1);
			this.alive = 'false';
		}

    // The following code checks when the player collides with any of the coins by using for loops and updates the score as well as moves the coin
    for(let c = 0; c < 9; c++){
      mainScene.coin[c].play('coinSpin', true);
      mainScene.coinGroup1[c].play('coinSpin', true);
      mainScene.coinGroup2[c].play('coinSpin', true);
      if(mainScene.physics.overlap(mainScene.player, mainScene.coin[c])){
        mainScene.coin[c].setPosition(-1000, 1000);
        mainScene.points += 50;
        mainScene.pointsText.setText('Score: ' + mainScene.points);
      }
      else if(mainScene.physics.overlap(mainScene.player, mainScene.coinGroup1[c])){
        mainScene.coinGroup1[c].setPosition(-1000, 1000);
        mainScene.points += 50;
        mainScene.pointsText.setText('Score: ' + mainScene.points);
      }
      else if(mainScene.physics.overlap(mainScene.player, mainScene.coinGroup2[c])){
        mainScene.coinGroup2[c].setPosition(-1000, 1000);
        mainScene.points += 50;
        mainScene.pointsText.setText('Score: ' + mainScene.points);
      }
    }

		// The following checks for collision between the player and the ending tile by calling the winBackCollision function and if collision is detected, end the game and lets the player know they won by calling the bringWinScreenforward function
		if(winBackCollision()){
			bringWinScreenforward();
			this.player.setDepth(-1);
			this.alive = 'false';
		}

		// The following is an algorithm created to move each oomba object to the right until that specific object collides with a tile then it will start moving that specific oompa  the other way and so on
		for(let y = 0; y < 15; y++){
			if(this.oomba[y].body.blocked.right){
				this.oombaMoveRight[y] = false;
				this.oombaMoveLeft[y] = true;
			}
			if(this.oombaMoveRight[y] == true){
				oombaRight(y);
			}
			if(this.oomba[y].body.blocked.left){
				this.oombaMoveRight[y] = true;
				this.oombaMoveLeft[y] = false;
			}
			if(this.oombaMoveLeft[y] == true){
				oombaLeft(y);
			}
		}
	}

	// The following code is executed when the player has died. It stops all player and other movement and checks for clicks on either the retry or home button and acts accordingly 
	if(this.alive == 'false'){
		for(let i = 0; i < 15; i++){
			mainScene.oomba[i].setVelocity(0, 0);
		}
    for(let c = 0; c < 9; c++){
      mainScene.coin[c].play('coinSpin', false);
      mainScene.coinGroup1[c].play('coinSpin', false);
      mainScene.coinGroup2[c].play('coinSpin', false);
    }
		this.retryButton.on('pointerdown', () => {window.location.replace('https://ics3u-summative.sahib321.repl.co/sidePages/game/game.html')});
		this.homeButton.on('pointerdown', () => {window.location.replace('https://ics3u-summative.sahib321.repl.co/')});
	}

	// The following code is triggered during the Main Menu scene of the game. It monitors for clicks on either the play, home or help buttons and acts accordingly
	if(this.alive == 'mainMenu'){
		this.mainMenuPlayButton.on('pointerup', () => {
			this.alive = 'true';
			this.mainMenu.setDepth(-1);
			this.mainMenuTitle.setDepth(-1);
			this.mainMenuPlayButton.setDepth(-1);
			this.mainMenuPlayButtonText.setDepth(-1);
			this.mainMenuHelpButton.setDepth(-1);
			this.mainMenuHelpButtonText.setDepth(-1);
			this.mainMenuHomeButton.setDepth(-1);
			this.mainMenuHomeButtonText.setDepth(-1);
			this.mainMenuAlertText.setDepth(-1);
			this.timer = true;
		});
		this.mainMenuHomeButton.on('pointerup', () => {
			window.location.replace('https://ics3u-summative.sahib321.repl.co/');
		});
		this.mainMenuHelpButton.on('pointerup', () => {
			window.location.replace('https://ics3u-summative.sahib321.repl.co/sidePages/help.html');
		});
	}
  
	// The following calls on the muteButton function so that the button works all throughout the game's scenes
	muteButton();
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and no return value ********************************************************************************************/
function movePlayer(){
	// This function uses the key monitoring variables that were created earlier to montior the user's key presses and move them in the right direction as well as play the right animation
	if(mainScene.dKey.isDown || mainScene.rightKey.isDown){
		mainScene.player.setVelocityX(150);
		mainScene.player.play('walkingRight', true);
		mainScene.side = 'right';
	}
	if(mainScene.dKey.isUp && mainScene.rightKey.isUp && mainScene.side == 'right'){
		mainScene.player.play('standingRight', true);
		mainScene.player.setVelocityX(0);
	}
	if(mainScene.aKey.isDown || mainScene.leftKey.isDown){
		mainScene.player.setVelocityX(-150);
		mainScene.player.play('walkingLeft', true);
		mainScene.side = 'left';
	}
	if(mainScene.aKey.isUp && mainScene.leftKey.isUp && mainScene.side == 'left'){
		mainScene.player.play('standingLeft', true);
		mainScene.player.setVelocityX(0);
	}

	// The following two if statments check for key presses on 'w', the up key or spacebar as well as makes sure the player is on the ground before jumping
	if((mainScene.spaceKey.isDown || mainScene.upKey.isDown || mainScene.wKey.isDown) && mainScene.side == 'right' && mainScene.player.body.blocked.down){
		mainScene.player.setVelocityY(-300);
		mainScene.player.play('jumpingRight', true);
		mainScene.side = 'right';
	}
	if((mainScene.spaceKey.isDown || mainScene.upKey.isDown || mainScene.wKey.isDown) && mainScene.side == 'left' && mainScene.player.body.blocked.down){
		mainScene.player.setVelocityY(-300);
		mainScene.player.play('jumpingLeft', true);
		mainScene.side = 'left';
	}
}

/********************************************************************************************The following two functions are evidence of global created functions that take a parameter but do not return a value ********************************************************************************************/
function oombaRight(num){
	// This function as well as the next contain code for the oombas to move either right or left respectively 
	for(let x = num; x < num + 1; x++){
		mainScene.oomba[num].play('oombaRight', true);
		mainScene.oomba[num].setVelocityX(100);
	}
}
function oombaLeft(num){
	for(let x = num; x < num + 1; x++){
		mainScene.oomba[num].play('oombaLeft', true);
		mainScene.oomba[num].setVelocityX(-100);
	}
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and no return value ********************************************************************************************/
function oombaArioTopCollision(){
	// This function checks to see if the player jumps on top of an oomba and if so moves the oomba out of the world and updates the player's score
	for(let i = 0; i < 15; i++){
		if(mainScene.physics.overlap(mainScene.player, mainScene.oomba[i]) && mainScene.oomba[i].body.touching.up){
			mainScene.player.setVelocityY(-300);
			mainScene.oomba[i].setPosition(-1000, 1000);
			mainScene.points += 25;
			mainScene.pointsText.setText('Score: ' + mainScene.points);
		}
	}
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and does return a value ********************************************************************************************/
function oombaArioLeftRightCollision(){
	// This function checks if the player collides with an oomba from anywhere but the top and returns true is so and false if not
	for(let i = 0; i < 15; i++){
		if(mainScene.physics.overlap(mainScene.player, mainScene.oomba[i]) && !(mainScene.oomba[i].body.touching.up)){
			return true;
		}
	}
	return false;
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and does return a value ********************************************************************************************/
function lavaCollision(){
	// The following checks for collision between the player and the lava and returns true if collision is detected and otherwise returns false
	if(mainScene.physics.overlap(mainScene.player, mainScene.lava)){
		return true;
	}
	return false;
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and does return a value ********************************************************************************************/
function winBackCollision(){
	// This function checks for collision between the player and the end tile and if it is detected returns true and if so returns false
	if(mainScene.physics.overlap(mainScene.player, mainScene.winBack)){
		return true;
	}
	return false;
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and no return value ********************************************************************************************/
function muteButton(){
	// The following function checks if the mute button is pressed or not and acts accordingly
  if(mainScene.mute == false){
    mainScene.volume.on('pointerup', () => {
			mainScene.volume.play('mute', true), 
			mainScene.mute = true,
			mainScene.music.setMute(true)
  });
}
  else if(mainScene.mute == true){
    mainScene.volume.on('pointerup', () => {
			mainScene.volume.play('unMute', true), 
			mainScene.mute = false,
			mainScene.music.setMute(false)
    });
  }
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and no return value ********************************************************************************************/
function bringWinScreenforward(){
	// The following function brings the win screen forward and destroys the text at the top of the screen
	mainScene.retryScreen.setDepth(1);
	mainScene.retryButton.setDepth(1);
	mainScene.homeButton.setDepth(1);
	mainScene.retryText.setDepth(1);
	mainScene.homeText.setDepth(1);
	mainScene.winText.setDepth(1);
	mainScene.player.setVelocity(0, 0);
	mainScene.retryPoints = mainScene.add.text(mainScene.homeText.x - 50, mainScene.retryScreen.y - 40, 'Score: ' + mainScene.points, {fontSize: '28px'});
	mainScene.endTime = 'Time: ' + mainScene.min + ':' + mainScene.sec;
	mainScene.timeEndText = mainScene.add.text(mainScene.retryText.x - 50, mainScene.retryScreen.y - 40, mainScene.endTime, {fontSize: '28px'});
	mainScene.timeEndText.setDepth(1);
	mainScene.pointsText.destroy();
	mainScene.timeText.destroy();
	mainScene.retryPoints.setDepth(1);
	mainScene.timeEndText.setScrollFactor(0);
	mainScene.retryPoints.setScrollFactor(0);
	mainScene.retryButton.setInteractive();
	mainScene.homeButton.setInteractive();
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and no return value ********************************************************************************************/
function bringLoseScreenforward(){
	// The following function brings the loss screen forward and destroys the text at the top of the screen
	mainScene.retryScreen.setDepth(1);
	mainScene.retryButton.setDepth(1);
	mainScene.homeButton.setDepth(1);
	mainScene.retryText.setDepth(1);
	mainScene.homeText.setDepth(1);
	mainScene.loseText.setDepth(1);
	mainScene.player.setVelocity(0, 0);
	mainScene.retryPoints = mainScene.add.text(mainScene.homeText.x - 50, mainScene.retryScreen.y - 40, 'Score: ' + mainScene.points, {fontSize: '28px'});
	mainScene.retryPoints.setDepth(1);
	mainScene.endTime = 'Time: ' + mainScene.min + ':' + mainScene.sec;
	mainScene.timeEndText = mainScene.add.text(mainScene.retryText.x - 50, mainScene.retryScreen.y - 40, mainScene.endTime, {fontSize: '28px'});
	mainScene.timeEndText.setDepth(1);
	mainScene.pointsText.destroy();
	mainScene.timeText.destroy();
	mainScene.timeEndText.setScrollFactor(0);
	mainScene.retryPoints.setScrollFactor(0);
	mainScene.retryButton.setInteractive();
	mainScene.homeButton.setInteractive();
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and no return value ********************************************************************************************/
function moveScreenBack(){
	// The following function moves both the win screen and the loss screen behind the main game screen
	mainScene.retryScreen.setDepth(-1);
	mainScene.retryButton.setDepth(-1);
	mainScene.homeButton.setDepth(-1);
	mainScene.retryText.setDepth(-1);
	mainScene.homeText.setDepth(-1);
	mainScene.loseText.setDepth(-1);
	mainScene.winText.setDepth(-1);
}

/********************************************************************************************The following is evidence of the use of a created global function that has no parameters and no return value ********************************************************************************************/
function timer() {
	// The following is a global function created to keep track of time spent in the game, the reference code that was used can be found at https://dev.to/gspteck/create-a-stopwatch-in-javascript-2mak
	mainScene.timer = false;
	mainScene.sec = parseInt(mainScene.sec);
	mainScene.min = parseInt(mainScene.min);
	mainScene.sec += 1;
	if (mainScene.sec == 60) {
		mainScene.min += 1;
		mainScene.sec = 0;
	}
	if (mainScene.sec < 10 || mainScene.sec == 0) {
		mainScene.sec = '0' + mainScene.sec;
	}
	if (mainScene.min < 10 || mainScene.min == 0) {
		mainScene.min = '0' + mainScene.min;
	}
	if(mainScene.alive == false){
		return;
	}
	setTimeout("timer()", 1000);
	mainScene.timeText.setText('Time: ' + mainScene.min + ':' + mainScene.sec);
}

/********************************************************************************************The following is evidence of the use of a created global function that does have parameters and does return a value and evidence of bubble sorting as well as this is the bubble sort algorithm we decided to use ********************************************************************************************/
function bubbleSort(arrayToSort){
	let tempNumber = 0;
	for(let x = 0; x < arrayToSort.length - 1; x++)
		for(let i = 0; i < arrayToSort.length - 1; i++){
			if(arrayToSort[i] < arrayToSort[i + 1]){
				tempNumber = arrayToSort[i];
				arrayToSort[i] = arrayToSort[i + 1];
				arrayToSort[i + 1] = tempNumber;
			}
		}
	return arrayToSort;
}

// The following intializing the config object as a global constant to be used later within the intialization of the game object
const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: 'black',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 750
			},
			debug: false
		}
	},
	scene: mainScene
};

// The following intializes the global constant game object and assigns it an object uses the Phaer.Game method and passing in the config object as a parameter. It is used as a global constant so that it can be used throughout in correlation with the mainScene object. It is responsible for being the main controller of the entire phaser game and handling things such as the boot process and setting up all of the main Phaser processes.
const game = new Phaser.Game(config);