let Winner = null;
let PlayerSpeed = .015;
let MaxInvincibilityFrames = 30;
let EnemyInvincibilityFrames = 15;
let PlayerSwordDamage = 10;
let LeftBound = .25;
let RightBound = 47.75;
let TopBound = 31.75;
let BottomBound = .25;
let DamagePickupBonus = 5;
let SpeedPickupBonus = .002;
let ManaPickupBonus = 15;
let HealthPickupBonus = 15;
enum SpellSpeeds {
      Fell = .04,
      Flamelash = 0,
      Nebula = .02,
     }
enum SpellDamage {
      Fell = 20,
      Flamelash = 50,
      Nebula = 50,
     }
enum SpellDurability {
      Fell = 3,
      Flamelash = 10,
      Nebula = 5,
     }
enum SpellCost {
      Fell = 15,
      Flamelash = 25,
      Nebula = 40,
     }
enum SpellCooldown {
      Fell = 30,
      Flamelash = 90,
      Nebula = 120,
     }
enum SpellScale {
      Fell = .5,
      Flamelash = 1.5,
      Nebula = .65,
     }
enum SpawnRate {
      Skeleton = 200,
      Slime = 80,
      Blob = 1000,
     }
enum MobHealth {
      Skeleton = 100,
      Slime = 25,
      Blob = 300,
      Lich = 450,
      Knight = 1500,
     }
enum MobSpeed {
      Skeleton = .003,
      Slime = .008,
      Blob = .001,
      Lich = .006,
      Knight = .013,
     }
enum MobDamage {
      Skeleton = 5,
      Slime = 2,
      Blob = 15,
      Lich = 10,
      Knight = 45,
     }
enum MobKnockback {
      Skeleton = .05,
      Slime = .025,
      Blob = .09,
      Lich = .15,
      Knight = .15,
     }
let Gates:Sup.Math.Vector2[] = [];
Gates.push(new Sup.Math.Vector2(0,0));
Gates.push(new Sup.Math.Vector2(0,8));
Gates.push(new Sup.Math.Vector2(0,16));
Gates.push(new Sup.Math.Vector2(0,24));
Gates.push(new Sup.Math.Vector2(0,32));  
Gates.push(new Sup.Math.Vector2(48,0));
Gates.push(new Sup.Math.Vector2(48,8));
Gates.push(new Sup.Math.Vector2(48,16));
Gates.push(new Sup.Math.Vector2(48,24));
Gates.push(new Sup.Math.Vector2(48,32));   
Gates.push(new Sup.Math.Vector2(12,0));
Gates.push(new Sup.Math.Vector2(24,0));
Gates.push(new Sup.Math.Vector2(36,0)); 
Gates.push(new Sup.Math.Vector2(12,32));
Gates.push(new Sup.Math.Vector2(24,32));
Gates.push(new Sup.Math.Vector2(36,32));
Gates.push(new Sup.Math.Vector2(31.823,21.101)); 
Gates.push(new Sup.Math.Vector2(36.806,9.747));
Gates.push(new Sup.Math.Vector2(20.926,25.269));
Gates.push(new Sup.Math.Vector2(9.415,10.092));