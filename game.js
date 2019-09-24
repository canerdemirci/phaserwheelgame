let game;

let gameOptions = {
    slices: [
        {
            degrees: 40,
            startColor: 0xff0000,
            endColor: 0xff8800,
            rings: 3,
            iconFrame: 1,
            iconScale: 0.4,
            text: 'BANANA',
        },
        {
            degrees: 60,
            startColor: 0x00ff00,
            endColor: 0x004400,
            rings: 200,
            iconFrame: 0,
            iconScale: 0.4,
            text: 'PEAR',
        },
        {
            degrees: 125,
            startColor: 0xff00ff,
            endColor: 0x0000ff,
            rings: 10,
            text: 'BLUE TEXT, WHITE STROKE',
            sliceText: 'BLUE',
            sliceTextStyle: {
                fontFamily: 'Arial Black',
                fontSize: 36,
                color: '#000077',
            },
            sliceTextStroke: 8,
            sliceTextStrokeColor: '#ffffff',
        },
        {
            degrees: 45,
            startColor: 0x666666,
            endColor: 0xffff00,
            rings: 200,
            iconFrame: 3,
            iconScale: 0.4,
            text: 'STRAWBERRY',
        },
        {
            degrees: 90,
            startColor: 0x000000,
            endColor: 0xffff00,
            rings: 1,
            text: "POO :(",
            sliceText: "?",
            sliceTextStyle: {
                fontFamily: "Arial Black",
                fontSize: 72
            },
        }
    ],
    rotationTimeRange: {
        min: 2,
        max: 11,
    },
    backSpin: {
        min: 1,
        max: 4,
    },
    wheelRadius: 240,
    strokeColor: 0xffffff,
    strokeWidth: 5,
};

window.onload = function() {
    let gameConfig = {
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'thegame',
            width: 600,
            height: 600,
        },
        backgroundColor: 0x000000,
        scene: [playGame],
    };

    game = new Phaser.Game(gameConfig);

    window.focus();
}

class playGame extends Phaser.Scene {
    constructor() {
        super('PlayGame');
    }

    preload() {
        this.load.image('pin', 'ping.png');
        this.load.spritesheet('icons', 'icons.png', {
            frameWidth: 256,
            frameHeight: 256,
        });
    }

    create() {
        let startDegrees = -90;
        let graphics = this.make.graphics({
            x: 0,
            y: 0,
            add: false,
        });

        this.wheelContainer = this.add.container(game.config.width / 2, game.config.height / 2);

        let iconArray = [];

        for (let i=0; i < gameOptions.slices.length; i++) {
            let startColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].startColor);
            let endColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].endColor);

            for (let j = gameOptions.slices[i].rings; j > 0; j--) {
                let ringColor = Phaser.Display.Color.Interpolate.ColorWithColor(startColor, endColor, gameOptions.slices[i].rings, j);
                let ringColorString = Phaser.Display.Color.RGBToString(Math.round(ringColor.r), Math.round(ringColor.g), Math.round(ringColor.b), 0, '0x');

                graphics.fillStyle(ringColorString, 1);
                graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, j * gameOptions.wheelRadius / gameOptions.slices[i].rings, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false);
                graphics.fillPath();
            }

            graphics.lineStyle(gameOptions.strokeWidth, gameOptions.strokeColor, 1);
            graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false);
            graphics.strokePath();

            if (gameOptions.slices[i].iconFrame != undefined) {
                let icon = this.add.image(gameOptions.wheelRadius * 0.75 * Math.cos(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), gameOptions.wheelRadius * 0.75 * Math.sin(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), "icons", gameOptions.slices[i].iconFrame);

                icon.scaleX = gameOptions.slices[i].iconScale;
                icon.scaleY = gameOptions.slices[i].iconScale;

                icon.angle = startDegrees + gameOptions.slices[i].degrees / 2 + 90;

                iconArray.push(icon);
            }
        }
    }
}