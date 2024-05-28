export function preloadDoor() {
    this.load.image('doorIdle', './assets/Idle.png');
    this.load.spritesheet('doorClosespritesheet', './assets/Closiong (46x56).png', { frameWidth: 46, frameHeight: 56 });
    this.load.spritesheet('doorOpenspritesheet', './assets/Opening (46x56).png', { frameWidth: 46, frameHeight: 56 });
}

export function createDoor() {
    const door = this.physics.add.sprite(doorObject.x, doorObject.y, 'doorIdle');
    door.anims.play('doorIdle');
    this.door = door;

    this.anims.create({
        key: 'doorIdle',
        frames: [{ key: 'doorIdle' }],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'doorOpen',
        frames: this.anims.generateFrameNumbers('doorOpenspritesheet', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'doorClose',
        frames: this.anims.generateFrameNumbers('doorClosespritesheet', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: 0
    });

    this.physics.add.collider(this.door, this.collider);
}

export function updateDoor() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.physics.overlap(this.king, this.door)) {
        this.king.anims.play('In', true);
        this.king.once('animationcomplete-In', () => {
            this.door.anims.play('doorOpen', true);
            this.door.once('animationcomplete-doorOpen', () => {
                this.door.anims.play('doorClose', true);
                this.door.once('animationcomplete-doorClose', () => {
                    this.door.anims.play('doorIdle', true);
                });
            });
        });
    }
}