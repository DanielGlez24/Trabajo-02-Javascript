! function(e) {
	var t = {};

	function i(s) {
		if (t[s]) return t[s].exports;
		var a = t[s] = {
			i: s,
			l: !1,
			exports: {}
		};
		return e[s].call(a.exports, a, a.exports, i), a.l = !0, a.exports
	}
	i.m = e, i.c = t, i.d = function(e, t, s) {
		i.o(e, t) || Object.defineProperty(e, t, {
			enumerable: !0,
			get: s
		})
	}, i.r = function(e) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, i.t = function(e, t) {
		if (1 & t && (e = i(e)), 8 & t) return e;
		if (4 & t && "object" == typeof e && e && e.__esModule) return e;
		var s = Object.create(null);
		if (i.r(s), Object.defineProperty(s, "default", {
				enumerable: !0,
				value: e
			}), 2 & t && "string" != typeof e)
			for (var a in e) i.d(s, a, function(t) {
				return e[t]
			}.bind(null, a));
		return s
	}, i.n = function(e) {
		var t = e && e.__esModule ? function() {
			return e.default
		} : function() {
			return e
		};
		return i.d(t, "a", t), t
	}, i.o = function(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, i.p = "", i(i.s = 0)
}([function(e, t, i) {
	"use strict";
	i.r(t);
	class s {
		constructor(e, t, i, s) {
			this.image = t, this.relatedScene = e, this.x = i, this.y = s
		}
		create() {
			this.startButton = this.relatedScene.add.sprite(this.x, this.y, this.image).setInteractive(), this.startButton.on("pointerover", () => {
				this.startButton.setFrame(1)
			}), this.startButton.on("pointerout", () => {
				this.startButton.setFrame(0)
			}), this.startButton.on("pointerdown", () => {
				this.doClick()
			})
		}
	}
	class a extends s {
		constructor(e) {
			super(e, "playbutton", 400, 400)
		}
		doClick() {
			this.relatedScene.breakoutSample.play(), this.relatedScene.scene.start("game")
		}
	}
	class r extends Phaser.Scene {
		constructor() {
			super({
				key: "loader"
			}), this.playButton = new a(this)
		}
		preload() {
			this.load.image("rightbutton", "/images/right.png"), this.load.image("leftbutton", "/images/left.png"), this.load.image("launchbutton", "/images/launchbutton.png"), this.load.image("background-preload", "/images/background-preload.png"), this.load.spritesheet("playbutton", "/images/playbutton.png", {
				frameWidth: 190,
				frameHeight: 49
			}), this.load.audio("breakoutsample", "/sounds/breakout.mp3"), this.load.image("background", "/images/background.png"), this.load.image("platform", "/images/platform2.png"), this.load.image("ball", "/images/ball.png"), this.load.image("bluebrick", "/images/brickBlue.png"), this.load.image("blackbrick", "/images/brickBlack.png"), this.load.image("greenbrick", "/images/brickGreen.png"), this.load.image("orangebrick", "/images/brickOrange.png"), this.load.image("yellowbrick", "/images/brickYellow.png"), this.load.image("whitebrick", "/images/brickWhite.png"), this.load.image("greybrick", "/images/brickGrey.png"), this.load.spritesheet("bluediamond", "/images/blue_diamond-sprites.png", {
				frameWidth: 48,
				frameHeight: 48
			}), this.load.spritesheet("reddiamond", "/images/red_diamond-sprites.png", {
				frameWidth: 48,
				frameHeight: 48
			}), this.load.spritesheet("greendiamond", "/images/green_diamond-sprites.png", {
				frameWidth: 48,
				frameHeight: 48
			}), this.load.audio("platformimpactsample", "/sounds/platform-impact.mp3"), this.load.audio("brickimpactsample", "/sounds/brick-impact.mp3"), this.load.audio("fixedbrickimpactsample", "/sounds/fixed-brick-impact.mp3"), this.load.audio("gameoversample", "/sounds/gameover.mp3"), this.load.audio("winsample", "/sounds/you_win.mp3"), this.load.audio("startgamesample", "/sounds/start-game.mp3"), this.load.audio("livelostsample", "/sounds/live-lost.mp3"), this.load.audio("phasechange", "/sounds/phasechange.mp3"), this.load.spritesheet("restartbutton", "/images/restart.png", {
				frameWidth: 190,
				frameHeight: 49
			}), this.load.image("congratulations", "/images/congratulations.png"), this.load.image("gameover", "/images/gameover.png")
		}
		create() {
			this.add.image(400, 250, "background-preload"), this.playButton.create(), this.breakoutSample = this.sound.add("breakoutsample")
		}
	}
	class o {
		constructor(e) {
			this.relatedScene = e, this.powers = []
		}
		configureColisions() {
			this.relatedScene.physics.add.collider(this.relatedScene.ball.get(), this.bricks, this.brickImpact, null, this)
		}
		configureColisionsFixed() {
			this.relatedScene.physics.add.collider(this.relatedScene.ball.get(), this.fixedBricks, this.relatedScene.fixedBrickImpact, null, this.relatedScene)
		}
		deleteFixedBricks() {
			this.fixedBricks && this.fixedBricks.getChildren().forEach(e => {
				e.disableBody(!0, !0)
			}), this.diamonds && this.diamonds.diamonds.getChildren().forEach(e => {
				e.disableBody(!0, !0)
			})
		}
		isPhaseFinished() {
			return 0 === this.bricks.countActive()
		}
		setBrickCollider(e) {
			this.relatedScene.physics.add.collider(this.bricks, e), this.fixedBricks && this.relatedScene.physics.add.collider(this.fixedBricks, e)
		}
		getBrickIndex(e) {
			let t = this.bricks.getChildren();
			for (let i in t)
				if (t[i] == e) return i
		}
		brickImpact(e, t) {
			let i = this.getBrickIndex(t);
			this.powers[i] && this.powers[i].create(e.x, e.y), this.relatedScene.brickImpact(e, t)
		}
	}
	class l {
		constructor(e) {
			this.relatedScene = e, this.diamonds = this.relatedScene.physics.add.group(), this.relatedScene.physics.add.collider(this.relatedScene.ball.get(), this.diamonds, this.ballImpact, null, this)
		}
		create(e, t, i, s) {
			let a = this.diamonds.create(e, t, i);
			a.relatedPower = s, a.setScale(.6), a.anims.play(i + "animation"), a.body.setAllowRotation(), a.body.setAngularVelocity(100), a.body.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100)), a.setBounce(1), a.setCollideWorldBounds(!0)
		}
		ballImpact(e, t) {
			t.destroy(), t.relatedPower.givePower();
			let i = e.body.velocity;
			this.relatedScene.removeGlueFromBall(), i.y > 0 ? e.body.setVelocityY(300) : e.body.setVelocityY(-300)
		}
	}
	class n {
		constructor(e, t, i) {
			this.relatedScene = e, this.powerSprite = i, this.diamonds = t
		}
		create(e, t) {
			this.diamonds.create(e, t, this.powerSprite, this)
		}
		givePower() {
			console.log("Define the power")
		}
	}
	class h extends n {
		constructor(e, t) {
			super(e, t, "bluediamond")
		}
		givePower() {
			this.relatedScene.increaseLives()
		}
	}
	class c extends n {
		constructor(e, t) {
			super(e, t, "reddiamond")
		}
		givePower() {
			this.relatedScene.setPlatformBig()
		}
	}
	class d extends n {
		constructor(e, t) {
			super(e, t, "greendiamond")
		}
		givePower() {
			this.relatedScene.setGluePower()
		}
	}
	class m extends o {
		create() {
			this.bricks = this.relatedScene.physics.add.staticGroup({
				key: ["bluebrick", "orangebrick", "greenbrick", "blackbrick", "yellowbrick", "blackbrick", "yellowbrick", "bluebrick", "orangebrick", "greenbrick"],
				frameQuantity: 1,
				gridAlign: {
					width: 5,
					height: 4,
					cellWidth: 150,
					cellHeight: 100,
					x: 135,
					y: 150
				}
			}), this.fixedBricks = this.relatedScene.physics.add.staticGroup(), this.fixedBricks.create(316, 165, "greybrick"), this.fixedBricks.create(466, 165, "greybrick"), this.configureColisions(), this.configureColisionsFixed(), this.diamonds = new l(this.relatedScene), this.setBrickCollider(this.diamonds.diamonds), this.powers[3] = new h(this.relatedScene, this.diamonds), this.powers[5] = new c(this.relatedScene, this.diamonds), this.powers[7] = new d(this.relatedScene, this.diamonds)
		}
	}
	class u extends o {
		create() {
			this.bricks = this.relatedScene.physics.add.staticGroup(), this.bricks.create(400, 270, "orangebrick"), this.bricks.create(360, 225, "orangebrick"), this.bricks.create(440, 225, "orangebrick"), this.bricks.create(480, 180, "orangebrick"), this.bricks.create(400, 180, "orangebrick"), this.bricks.create(320, 180, "orangebrick"), this.bricks.create(280, 135, "orangebrick"), this.bricks.create(360, 135, "orangebrick"), this.bricks.create(440, 135, "orangebrick"), this.bricks.create(520, 135, "orangebrick"), this.bricks.create(330, 90, "orangebrick"), this.bricks.create(470, 90, "orangebrick"), this.configureColisions(), this.diamonds = new l(this.relatedScene), this.setBrickCollider(this.diamonds.diamonds), this.powers[11] = new h(this.relatedScene, this.diamonds), this.powers[10] = new c(this.relatedScene, this.diamonds), this.powers[4] = new d(this.relatedScene, this.diamonds)
		}
	}
	class p extends o {
		create() {
			this.bricks = this.relatedScene.physics.add.staticGroup(), this.bricks.create(110, 270, "orangebrick"), this.bricks.create(170, 225, "bluebrick"), this.bricks.create(230, 180, "yellowbrick"), this.bricks.create(290, 135, "blackbrick"), this.bricks.create(350, 90, "greenbrick"), this.bricks.create(680, 270, "orangebrick"), this.bricks.create(620, 225, "bluebrick"), this.bricks.create(560, 180, "yellowbrick"), this.bricks.create(500, 135, "blackbrick"), this.bricks.create(440, 90, "greenbrick"), this.configureColisions(), this.diamonds = new l(this.relatedScene), this.setBrickCollider(this.diamonds.diamonds), this.powers[3] = new h(this.relatedScene, this.diamonds), this.powers[4] = new c(this.relatedScene, this.diamonds), this.powers[1] = new d(this.relatedScene, this.diamonds)
		}
	}
	class g extends o {
		create() {
			this.bricks = this.relatedScene.physics.add.staticGroup({
				key: ["bluebrick", "orangebrick", "greenbrick", "yellowbrick"],
				frameQuantity: 10,
				gridAlign: {
					width: 10,
					height: 4,
					cellWidth: 67,
					cellHeight: 34,
					x: 95,
					y: 100
				}
			}), this.configureColisions(), this.diamonds = new l(this.relatedScene), this.setBrickCollider(this.diamonds.diamonds), this.powers[3] = new h(this.relatedScene, this.diamonds), this.powers[35] = new h(this.relatedScene, this.diamonds), this.powers[1] = new c(this.relatedScene, this.diamonds), this.powers[24] = new c(this.relatedScene, this.diamonds), this.powers[16] = new d(this.relatedScene, this.diamonds), this.powers[29] = new d(this.relatedScene, this.diamonds)
		}
	}
	class b extends o {
		create() {
			this.bricks = this.relatedScene.physics.add.staticGroup({
				key: ["bluebrick"],
				frameQuantity: 4,
				gridAlign: {
					width: 10,
					height: 5,
					cellWidth: 67,
					cellHeight: 34,
					x: 290,
					y: 150
				}
			}), this.fixedBricks = this.relatedScene.physics.add.staticGroup({
				key: ["greybrick"],
				frameQuantity: 4,
				gridAlign: {
					width: 10,
					height: 5,
					cellWidth: 67,
					cellHeight: 34,
					x: 290,
					y: 190
				}
			}), this.configureColisions(), this.configureColisionsFixed(), this.diamonds = new l(this.relatedScene), this.setBrickCollider(this.diamonds.diamonds), this.powers[1] = new h(this.relatedScene, this.diamonds), this.powers[3] = new c(this.relatedScene, this.diamonds)
		}
	}
	class k extends o {
		create() {
			this.bricks = this.relatedScene.physics.add.staticGroup({
				key: ["whitebrick", "blackbrick", "whitebrick", "blackbrick", "whitebrick"],
				frameQuantity: 10,
				gridAlign: {
					width: 10,
					height: 5,
					cellWidth: 67,
					cellHeight: 34,
					x: 105,
					y: 70
				}
			}), this.bricks.getChildren().forEach((e, t) => {
				(t >= 10 && t < 20 || t >= 30 && t < 40) && t++, (t + 1) % 2 == 0 && e.disableBody(!0, !0)
			}), this.configureColisions(), this.diamonds = new l(this.relatedScene), this.setBrickCollider(this.diamonds.diamonds), this.powers[3] = new h(this.relatedScene, this.diamonds), this.powers[14] = new c(this.relatedScene, this.diamonds), this.powers[21] = new d(this.relatedScene, this.diamonds), this.powers[4] = new h(this.relatedScene, this.diamonds), this.powers[15] = new c(this.relatedScene, this.diamonds), this.powers[22] = new d(this.relatedScene, this.diamonds)
		}
	}
	class w {
		constructor(e) {
			this.relatedScene = e, this.phases = [k, b, g, p, u, m]
		}
		create() {
			let e = this.phases.pop();
			return this.currentPhase = new e(this.relatedScene), this.currentPhase.create()
		}
		nextLevel() {
			if (this.currentPhase.deleteFixedBricks(), 0 != this.phases.length) return this.create();
			this.relatedScene.endGame(!0)
		}
		isPhaseFinished() {
			return this.currentPhase.isPhaseFinished()
		}
	}
	class f {
		constructor(e, t) {
			this.relatedScene = e, this.initialLives = t, this.displacement = 55, this.maxWidth = 800
		}
		create() {
			let e = this.maxWidth - (this.initialLives - 1) * this.displacement - 30;
			this.liveImages = this.relatedScene.physics.add.staticGroup({
				setScale: {
					x: .3,
					y: .3
				},
				key: "platform",
				frameQuantity: this.initialLives - 1,
				gridAlign: {
					width: this.initialLives - 1,
					height: 1,
					cellWidth: this.displacement,
					cellHeight: 30,
					x: e,
					y: 30
				}
			})
		}
		liveLost() {
			if (0 == this.liveImages.countActive()) return this.relatedScene.endGame(), !0;
			return this.liveImages.getFirstAlive().disableBody(!0, !0), !1
		}
		increase() {
			this.liveImages.getChildren().forEach((e, t) => {
				e.x = e.x - this.displacement
			}), this.liveImages.create(765, 33, "platform").setScale(.3)
		}
	}
	class y {
		constructor(e) {
			this.relatedScene = e, this.size = .6, this.gluePower = !1, this.hasBallGlued = !1
		}
		create() {
			this.platform = this.relatedScene.physics.add.image(400, 460, "platform").setImmovable().setScale(this.size), this.platform.setCollideWorldBounds(!0)
		}
		hasGluePower() {
			return this.gluePower
		}
		updatePosition(e, t, i) {
			t.left.isDown || i.left.isDown ? (this.platform.setVelocityX(-500), (e.isGlued || this.hasBallGlued) && e.get().setVelocityX(-500)) : t.right.isDown || i.right.isDown ? (this.platform.setVelocityX(500), (e.isGlued || this.hasBallGlued) && e.get().setVelocityX(500)) : (this.platform.setVelocityX(0), (e.isGlued || this.hasBallGlued) && e.get().setVelocityX(0))
		}
		setInitialState(e) {
			this.platform.x = 400, this.platform.y = 460, e.get().setVelocity(0, 0), e.get().x = 385, 1 == this.size ? e.get().y = 420 : e.get().y = 430, e.isGlued = !0
		}
		setSize(e) {
			this.size = e, this.platform.setScale(e)
		}
		setBigSize() {
			this.setSize(1), this.gluePower = !1
		}
		setInitialSize() {
			this.setSize(.6)
		}
		removeGlue() {
			this.gluePower = !1
		}
		setGluePower() {
			this.setInitialSize(), this.gluePower = !0
		}
		get() {
			return this.platform
		}
		isGluedBecausePower() {
			return this.hasGluePower() && this.hasBallGlued
		}
	}
	class S {
		constructor(e) {
			this.relatedScene = e, this.isGlued = !0
		}
		create() {
			this.ball = this.relatedScene.physics.add.image(385, 430, "ball"), this.ball.setBounce(1), this.ball.setCollideWorldBounds(!0)
		}
		isLost() {
			return !!(this.ball.y > 500 && this.ball.active)
		}
		get() {
			return this.ball
		}
		throw (e) {
			this.ball.setVelocity(e, -300), this.isGlued = !1
		}
		removeGlue() {
			this.isGlued = !1
		}
	}
	class B {
		constructor(e) {
			this.relatedScene = e, this.right = {
				isDown: !1
			}, this.left = {
				isDown: !1
			}, this.launch = {
				isDown: !1
			}
		}
		create() {
			this.leftButton = this.relatedScene.add.image(60, 320, "leftbutton").setScale(1.3).setInteractive({
				draggable: !0
			}), this.rightButton = this.relatedScene.add.image(740, 320, "rightbutton").setScale(1.3).setInteractive({
				draggable: !0
			}), this.launchButton = this.relatedScene.add.image(722, 430, "launchbutton").setScale(1.3).setInteractive(), this.leftButton.on("pointerdown", () => {
				this.left.isDown = !0, this.right.isDown = !1, this.launch.isDown = !1
			}), this.leftButton.on("pointerup", () => {
				this.left.isDown = !1
			}), this.leftButton.on("dragend", () => {
				this.left.isDown = !1
			}), this.rightButton.on("pointerdown", () => {
				this.right.isDown = !0, this.left.isDown = !1, this.launch.isDown = !1
			}), this.rightButton.on("pointerup", () => {
				this.right.isDown = !1
			}), this.rightButton.on("dragend", () => {
				this.right.isDown = !1
			}), this.launchButton.on("pointerdown", () => {
				this.launch.isDown = !0, this.right.isDown = !1, this.left.isDown = !1
			}), this.launchButton.on("pointerup", () => {
				this.launch.isDown = !1
			})
		}
	}
	class x extends Phaser.Scene {
		constructor() {
			super({
				key: "game"
			})
		}
		init() {
			this.glueRecordVelocityX = -60, this.phaseConstructor = new w(this), this.platform = new y(this), this.ball = new S(this), this.liveCounter = new f(this, 6), this.score = 0, this.mobileControls = new B(this)
		}
		create() {
			this.physics.world.setBoundsCollision(!0, !0, !0, !1), this.add.image(410, 250, "background"), this.liveCounter.create(), this.platform.create(), this.ball.create(), this.physics.add.collider(this.ball.get(), this.platform.get(), this.platformImpact, null, this), this.phaseConstructor.create(), this.scoreText = this.add.text(16, 16, "PUNTOS: 0", {
				fontSize: "20px",
				fill: "#fff",
				fontFamily: "verdana, arial, sans-serif"
			}), this.platformImpactSample = this.sound.add("platformimpactsample"), this.brickImpactSample = this.sound.add("brickimpactsample"), this.fixedBrickImpactSample = this.sound.add("fixedbrickimpactsample"), this.gameOverSample = this.sound.add("gameoversample"), this.winSample = this.sound.add("winsample"), this.startGameSample = this.sound.add("startgamesample"), this.liveLostSample = this.sound.add("livelostsample"), this.phaseChangeSample = this.sound.add("phasechange"), this.createAnimations(), this.mobileControls.create(), this.cursors = this.input.keyboard.createCursorKeys()
		}
		update() {
			if (this.platform.updatePosition(this.ball, this.cursors, this.mobileControls), this.ball.isLost()) {
				this.liveCounter.liveLost() || (this.liveLostSample.play(), this.platform.setInitialState(this.ball), this.platform.setInitialSize(), this.platform.removeGlue(), this.glueRecordVelocityX = -60)
			}(this.cursors.up.isDown || this.mobileControls.launch.isDown) && (this.ball.isGlued ? (this.startGameSample.play(), this.ball.throw(-60)) : this.platform.isGluedBecausePower() && (this.ball.throw(this.glueRecordVelocityX), this.platform.hasBallGlued = !1))
		}
		platformImpact(e, t) {
			this.platformImpactSample.play(), this.increasePoints(1);
			let i = e.x - t.x;
			this.platform.hasGluePower() ? (e.setVelocityY(0), e.setVelocityX(0), this.glueRecordVelocityX = this.calculateVelocity(i), this.platform.hasBallGlued = !0) : e.setVelocityX(this.calculateVelocity(i))
		}
		calculateVelocity(e) {
			return e > 50 && (e = 50), e > 0 || e < 0 ? 8 * e : Phaser.Math.Between(-10, 10)
		}
		brickImpact(e, t) {
			this.brickImpactSample.play(), t.disableBody(!0, !0), this.increasePoints(10), this.phaseConstructor.isPhaseFinished() && (this.phaseChangeSample.play(), this.phaseConstructor.nextLevel(), this.platform.setInitialState(this.ball))
		}
		fixedBrickImpact(e, t) {
			this.fixedBrickImpactSample.play()
		}
		increasePoints(e) {
			this.score += e, this.scoreText.setText("PUNTOS: " + this.score)
		}
		endGame(e = !1) {
			e ? (this.winSample.play(), this.scene.start("congratulations")) : (this.gameOverSample.play(), this.scene.start("gameover"))
		}
		createAnimations() {
			this.anims.create({
				key: "bluediamondanimation",
				frames: this.anims.generateFrameNumbers("bluediamond", {
					start: 0,
					end: 7
				}),
				frameRate: 10,
				repeat: -1,
				yoyo: !0
			}), this.anims.create({
				key: "reddiamondanimation",
				frames: this.anims.generateFrameNumbers("reddiamond", {
					start: 0,
					end: 7
				}),
				frameRate: 10,
				repeat: -1,
				yoyo: !0
			}), this.anims.create({
				key: "greendiamondanimation",
				frames: this.anims.generateFrameNumbers("greendiamond", {
					start: 0,
					end: 7
				}),
				frameRate: 10,
				repeat: -1,
				yoyo: !0
			})
		}
		increaseLives() {
			this.liveCounter.increase()
		}
		setGluePower() {
			this.platform.setGluePower()
		}
		setPlatformBig() {
			this.platform.setBigSize()
		}
		removeGlueFromBall() {
			this.ball.removeGlue()
		}
	}
	class v extends s {
		constructor(e) {
			super(e, "restartbutton", 400, 230)
		}
		doClick() {
			this.relatedScene.scene.start("game")
		}
	}
	class P extends Phaser.Scene {
		constructor() {
			super({
				key: "congratulations"
			}), this.restartButton = new v(this)
		}
		create() {
			this.add.image(410, 250, "background"), this.restartButton.create(), this.congratsImage = this.add.image(400, 90, "congratulations")
		}
	}
	class G extends Phaser.Scene {
		constructor() {
			super({
				key: "gameover"
			}), this.restartButton = new v(this)
		}
		create() {
			this.add.image(410, 250, "background"), this.restartButton.create(), this.gameoverImage = this.add.image(400, 90, "gameover")
		}
	}
	const C = {
		type: Phaser.AUTO,
		width: 800,
		height: 500,
		scene: [r, x, G, P],
		physics: {
			default: "arcade",
			arcade: {
				debug: !1
			}
		},
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	};
	new Phaser.Game(C)
}]);