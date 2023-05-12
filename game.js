let bv = false;
let rv = false;
let yv = false;
let ck = false;
let gv = false;

class LabRoom1 extends AdventureScene {
    constructor() {
        super("labRoom1", "A Lab Room");
    }

    onEnter() {

        if(bv == false){
            let blueVial = this.add.text(this.w * 0.2, this.w * 0.4, "🧪 blue vial")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => this.showMessage("A vial full of some blue liquid"))
                .on('pointerdown', () => {
                    this.showMessage("Should keep it for later");
                    this.gainItem('blue vial');
                    this.tweens.add({
                        targets: blueVial,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => blueVial.destroy()
                    });
                    bv = true;
                });
        }

        this.add.text(this.w * 0.5, this.w * 0.1, "🚪 storage")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Door to the storage room");
            })
            .on('pointerdown', () => {
                this.gotoScene('storage');
            })

        this.add.text(this.w * 0.5, this.w * 0.4, "🚪 Second Lab Room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Door to another Lab Room");
            })
            .on('pointerdown', () => {
                this.gotoScene('labRoom2');
            })

        this.add.text(this.w * 0.1, this.w * 0.15, "⬜ note")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Test subject 32: Subject seems to take to the fusion wonderfully, no adverse side effects so far. Will continue to monitor. Hopefully this is the one.");
            })
    }
}

class LabRoom2 extends AdventureScene {
    constructor() {
        super("labRoom2", "Another Lab Room");
    }
    onEnter(){
        this.add.text(this.w * 0.1, this.w * 0.1, "🚪 First Lab Room")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Door back to the first lab");
        })
        .on('pointerdown', () => {
            this.gotoScene('labRoom1');
        })

        this.add.text(this.w * 0.35, this.w * 0.05, "⬜ note")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("I don't understand what's wrong, every formula we try fails. The darkness just doesn't fuse with any of them, almost as if it doesn't want to. The more I study it the more I think it might be thinking... but that's impossible, how can a shadow have a conscience.");
            })

        if(yv == false){
            let yellowVial = this.add.text(this.w * 0.2, this.w * 0.4, "🧪 yellow vial")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => this.showMessage("A vial full of some yellow liquid"))
                .on('pointerdown', () => {
                    this.showMessage("Should keep it for later");
                    this.gainItem('yellow vial');
                    this.tweens.add({
                        targets: yellowVial,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => yellowVial.destroy()
                    });
                    yv = true;
                });
        }

        this.add.text(this.w * 0.5, this.w * 0.5, "🚪 Door to Hallway")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Door to the hallway");
            })
            .on('pointerdown', () => {
                this.gotoScene('hallway');
            })

        if(ck == false){    
            let key = this.add.text(this.w * 0.4, this.w * 0.35, "🔑 Key")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("Wonder what this key is for...");
                })
                .on('pointerdown', () => {
                    this.showMessage("Might need this");
                    this.gainItem('key');
                    this.tweens.add({
                        targets: key,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0},
                        duration: 500,
                        onComplete: () => key.destroy()
                    });
                    ck = true;
                });
        }
    }
}

class Storage extends AdventureScene {
    constructor() {
        super("storage", "The storage room where they keep all their gear and chemicals");
    }
    onEnter() {
        this.add.text(this.w * 0.1, this.w * 0.1, "🚪 Back to Lab Room")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Door back to the lab");
        })
        .on('pointerdown', () => {
            this.gotoScene('labRoom1');
        })

        this.add.text(this.w * 0.2, this.w * 0.4, "⬜ note")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("My superiors are getting restless, they want results. I'll have to do something drastic, even if I lose most of the subjects in the process. I need just one to survive, my whole career rides on this...");
            })

        let cabinet = this.add.text(this.w * 0.4, this.w * 0.4, "🗄️ cabinet")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if(this.hasItem("key")){
                    this.showMessage("You have the key to the cabinet");
                }else{
                    if(ck == false){
                        this.showMessage("It's locked. Wonder what could be in here");
                    }else{
                        this.showMessage("You already got what you needed from here");
                    }
                }
            })
            .on('pointerdown', () => {
                if(this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("You found an orange vial");
                    this.gainItem('orange vial');
                }else{
                    this.tweens.add({
                        targets: cabinet,
                        x: '+=' + this.s,
                        repeat: 2,
                        yoyo: true,
                        ease: 'Sine.inOut',
                        duration: 100
                    });
                }
            })

        if(rv == false){
            let redVial = this.add.text(this.w * 0.5, this.w * 0.15, "🧪 red vial")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => this.showMessage("A vial full of some red liquid"))
                .on('pointerdown', () => {
                    this.showMessage("Should keep it for later");
                    this.gainItem('red vial');
                    this.tweens.add({
                        targets: redVial,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => redVial.destroy()
                    });
                    rv = true;
                });
        }
    }
}

class Bed extends AdventureScene {
    constructor(){
        super("bed", "The room is dark, you can't see anything.");
    }
    onEnter(){
        let free = false;
        let restraints = this.add.text(this.w * 0.3, this.w * 0.4, "remove restraints")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The restraints seem to have frayed with time");
            })
            .on('pointerdown', () => {
                this.showMessage("You easily removed the restraints");
                free = true;
                this.tweens.add({
                    targets: restraints,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => restraints.destroy()
                });
            });
        
        let light = this.add.text(this.w * 0.1, this.w * 0.15, "💡 lightswitch")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (free == true) {
                    this.showMessage("Time to turn the lights on");
                } else {
                    this.showMessage("You can't reach it strapped down...");
                }
            })
            .on('pointerdown', () => {
                if (free == true) {
                    this.gotoScene('labRoom1');
                }else{
                    this.tweens.add({
                        targets: light,
                        x: '+=' + this.s,
                        repeat: 2,
                        yoyo: true,
                        ease: 'Sine.inOut',
                        duration: 100
                    });
                }
            })
    }
}

class Hallway extends AdventureScene {
    constructor(){
        super("hallway", "A strange hallway with slots in the walls");
    }
    onEnter(){
        let outdoor = this.add.text(this.w * 0.5, this.w * 0.5, "🚪 Outside")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The door is locked, it requires a passcode");
            })
            .on('pointerdown', () => {
                this.tweens.add({
                    targets: outdoor,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            })

        this.add.text(this.w * 0.5, this.w * 0.15, "⬜ note")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Subject 32: It finally worked! I don't know why but it actually seems like the darkness has taken a liking to this subject. The formula seemed to have enhanced the bond between them as well. Finally it's time to give myself the power I've been working towards for so long.");
            })

        this.add.text(this.w * 0.1, this.w * 0.5, "🚪 Back to Lab Room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Door back to the lab");
            })
            .on('pointerdown', () => {
                this.gotoScene('labRoom2');
            })
        
        if(gv == false){
            let greenVial = this.add.text(this.w * 0.3, this.w * 0.05, "🧪 green vial")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => this.showMessage("A vial full of some green liquid"))
                .on('pointerdown', () => {
                    this.showMessage("Should keep it for later");
                    this.gainItem('green vial');
                    this.tweens.add({
                        targets: greenVial,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => greenVial.destroy()
                    });
                    gv = true;
                });
        }
    }
}

class Outside extends AdventureScene {
    constructor(){
        super("outside", "You finally made it out!");
    }
    onEnter(){

    }
}

class Logo extends Phaser.Scene {
    constructor() {
        super('start')
    }
    create(){
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.add.text(400,300, "You awake in a cold dark room.").setFontSize(30);
        this.add.text(450,350, "You're strapped to a bed, however the binding around your arm feels weak.").setFontSize(30);

        this.time.delayedCall(2000, () => this.add.text(50, 100, "Click anywhere to continue.").setFontSize(20));
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('bed'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Logo, Intro, Bed, LabRoom1, Storage, LabRoom2, Hallway, Outside, Outro],
    title: "Adventure Game",
});

