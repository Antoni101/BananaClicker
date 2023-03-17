
//VARIABLES

var dmgBtn;
var bananas = 0;
var counter;
var banana;
var moreDmg = 0;
var damage = 2;
var getBanana = 1;
var perclickPrice = 50;
var upgradeFarmPrice = 500;
var moreFarmPrice = 100;
var perBtn;
var farmUp;
var moreFarm;
var autofarm;
var dmgPrice = 75;
var percenthp;
var autoTime = 1000;
var farms = 0;
var maxhp = 10;
var hp = 10;
var bpsTxt;
var bps = 0;
var farmUnlocked = false;
var bananasS;
var moreDmgS;
var damageS;
var getBananaS;
var perclickPriceS;
var upgradeFarmPriceS;
var moreFarmPriceS;
var dmgPriceS;
var autoTimeS;
var farmsS;
var maxhpS;
var hpS;
var bpsS;
var farmUnlockedS;
var autosaveIcon;
var farmCheck = 0;
var farmCheckS;
var monkeyGet = 1;
var monkeyGetS;
var calcPercent = function(v, t) {
  return 100*v/t;
};
var b = {
  maxhealth: 10,
  health: 10,
  x: 38,
  y: 27,
  frame: 1
};

//ADD PERCENTAGE TO NUMBER

function getPercent(num, per)
{
  return (num/100)*per;
  
  //damage += getPercent(damage,5) 5% Damage Boost
}

//REFRESH GAME (VALUES / GRAPHICS)

function refresh() {
  
  perclickPrice = Math.ceil(perclickPrice)
  moreFarmPrice = Math.ceil(moreFarmPrice)
  bananas = Math.ceil(bananas);
  dmgPrice = Math.ceil(dmgPrice)
  upgradeFarmPrice = Math.ceil(upgradeFarmPrice)
  banana.src = "images/bananas/banana" + b.frame + ".png";
  dmgBtn.innerHTML = "Damage +10% 🍌" + dmgPrice
  perBtn.innerHTML = "+1 Banana Per Click 🍌" + perclickPrice;
  counter.innerHTML = "Bananas: 🍌" + bananas;
  banana.style.top = b.y + "%";
  banana.style.left = b.x + "%";
  console.log("BHP: " + b.health + " (" + Math.ceil(percenthp) + "%)");
  console.log("🍌" + bananas+ " / BPC: " + getBanana + "/ Speed " + autoTime + " ms");
  console.log("Damage: " + damage + " Monkey Get 🍌" + monkeyGet);
  console.log("Rewarded 🍌" + reward);
  percenthp = (b.health / b.maxhealth) * 100;
  if (bananas >= perclickPrice) {
    perBtn.style.backgroundColor = "#9147ff";
  }
  else {
    perBtn.style.backgroundColor = "Grey";
  }
  if (bananas >= upgradeFarmPrice) {
    farmUp.style.backgroundColor = "#9147ff";
  }
  else {
    farmUp.style.backgroundColor = "Grey";
  }
  if (bananas >= moreFarmPrice) {
    moreFarm.style.backgroundColor = "#9147ff";
  }
  else {
    moreFarm.style.backgroundColor = "Grey";
  }
  if (bananas >= dmgPrice) {
    dmgBtn.style.backgroundColor = "#9147ff";
  }
  else {
    dmgBtn.style.backgroundColor = "Grey";
  }
  checkBanana()
}


//GAME ONLOAD

function load() {
  setInterval(saveGame, 60000); //Autosave
  bpsTxt = document.getElementById("bps");
  autosaveIcon = document.getElementById("autosaving");
  counter = document.getElementById("bananaCounter");
  banana = document.getElementById("banana");
  perBtn = document.getElementById("perClick");
  farmUp = document.getElementById("farmUpgrade");
  farmUp.innerHTML = "Monkey Upgrade  ⇡ 🍌" + upgradeFarmPrice;
  moreFarm = document.getElementById("moreFarm");
  moreFarm.innerHTML = "Monkey 🍌" + moreFarmPrice;
  dmgBtn = document.getElementById("dmgUpgrade");
  setInterval(doBps, 1000);
  refresh()
}

//BANANAS PER SECOND

function doBps() {
  bpsTxt.innerHTML = "BPS: (🍌" + bps + " Per Sec)"
  bps = 0;
}

//BANANA ONCLICK

function pressBanana() {
  b.health -= damage;
  bananas += getBanana;
  bps += getBanana;

  if (b.health <= 1) {
    resetBanana()
  }

  refresh()
}

//RESET BANANA POSITION AND HEALTH AND GIVE REWARD
 
function resetBanana() {
  hp += getPercent(b.maxhealth,10);
  reward = (b.maxhealth * getBanana) + getPercent(b.maxhealth, 20);
  bananas += reward;
  console.log("Rewarded " + reward + " Bananas")
  b.x = Math.floor(Math.random() * 60) + 1;
  b.y = Math.floor(Math.random() * 60) + 1;
  b.maxhealth = hp;
  b.health = b.maxhealth;
  b.frame = 1;
  refresh()
}

//PER CLICK UPGRADE

function perClick() {
  if (bananas >= perclickPrice) {
    getBanana += 1;
    bananas -= perclickPrice;
    perclickPrice += getPercent(perclickPrice,25)
    perclickPrice = Math.ceil(perclickPrice);
  }
  refresh()
}

//BUY MONKEY

function getFarm() {
  if (farmUnlocked == false) {
    if (bananas >= moreFarmPrice) {
      autofarm = setInterval(monketime, autoTime);
      bananas -= moreFarmPrice;
      farmUnlocked = true;
      moreFarm.disabled = true;
      moreFarm.innerHTML = "Purchased";
      moreFarmPrice = 99999999999;
    }
  }
  refresh()
}

function monketime() {
  b.health -= damage;
  bananas += monkeyGet;
  bps += monkeyGet;

  if (b.health <= 1) {
    resetBanana()
  }

  refresh()
  
}

//MONKEY UPGRADE SPEED

function farmUpgrade() {
  if (farmUnlocked == true) {
    if (bananas >= upgradeFarmPrice) {
      clearInterval(autofarm);
      autoTime -= 35;
      monkeyGet += 2;
      autofarm = setInterval(pressBanana, autoTime);
      farmCount = farms;
      bananas -= upgradeFarmPrice;
      upgradeFarmPrice += getPercent(upgradeFarmPrice,30)
      upgradeFarmPrice = Math.ceil(upgradeFarmPrice);
      if (autoTime <= 0) {
        farmUp.disabled = true;
      }
      else {
        farmUp.innerHTML = "Monkey Upgrade  ⇡ 🍌" + upgradeFarmPrice;
      }
    }
  }
  refresh()
}

//CHECK BANANA HEALTH PERCENTAGE

function checkBanana() { 
  if (percenthp > 90) {b.frame = 1;}
  else if (percenthp > 80) {b.frame = 2;}
  else if (percenthp > 70) {b.frame = 3;}
  else if (percenthp > 60) {b.frame = 4;}
  else if (percenthp > 50) {b.frame = 5;}
  else if (percenthp > 40) {b.frame = 6;}
  else if (percenthp > 30) {b.frame = 7;}
  else if (percenthp > 20) {b.frame = 8;}
  else if (percenthp > 10) {b.frame = 9;}
}

//DAMAGE UPGRADE

function getDmg() {
  if (bananas >= dmgPrice) {
    bananas -= dmgPrice;
    damage += getPercent(damage,10)
    dmgPrice += getPercent(dmgPrice,25)
    dmgPrice = Math.ceil(dmgPrice);
  }
  refresh()
}

function saveGame() {
  autosaveIcon.style.display = "Block";
  localStorage.setItem("bananasS", bananas);
  localStorage.setItem("monkeyGetS", monkeyGet);
  localStorage.setItem("moreDmgS", moreDmg);
  localStorage.setItem("damageS", damage);
  localStorage.setItem("getBananaS", getBanana);
  localStorage.setItem("perclickPriceS", perclickPrice);
  localStorage.setItem("upgradeFarmPriceS", upgradeFarmPrice); 
  localStorage.setItem("dmgPriceS", dmgPrice); 
  localStorage.setItem("autoTimeS", autoTime); 
  localStorage.setItem("maxhpS", maxhp); 
  localStorage.setItem("hpS", hp); 
  localStorage.setItem("bpsS", bps); 
  if (farmUnlocked == true ) {
    farmCheck = 1;
    localStorage.setItem("farmCheckS", farmCheck); 
  }
  setTimeout(function(){ autosaveIcon.style.display = "None"; }, 2000);
}

function loadSave() {
  bananas = localStorage.getItem("bananasS");
  bananas = parseInt(bananas);
  monkeyGet = localStorage.getItem("monkeyGetS");
  monkeyGet = parseInt(monkeyGet);
  moreDmg = localStorage.getItem("moreDmgS");
  moreDmg = parseInt(moreDmg);
  damage = localStorage.getItem("damageS");
  damage = parseInt(damage);
  getBanana = localStorage.getItem("getBananaS");
  getBanana = parseInt(getBanana);
  perclickPrice = localStorage.getItem("perclickPriceS");
  perclickPrice = parseInt(perclickPrice);
  upgradeFarmPrice = localStorage.getItem("upgradeFarmPriceS");
  upgradeFarmPrice = parseInt(upgradeFarmPrice);
  dmgPrice = localStorage.getItem("dmgPriceS");
  dmgPrice = parseInt(dmgPrice);
  autoTime = localStorage.getItem("autoTimeS");
  autoTime = parseInt(autoTime);
  maxhp = localStorage.getItem("maxhpS");
  maxhp = parseInt(maxhp);
  hp = localStorage.getItem("hpS");
  hp = parseInt(hp);
  bps = localStorage.getItem("bpsS");
  bps = parseInt(bps);
  farmCheck = localStorage.getItem("farmCheckS");
  farmCheck = parseInt(farmCheck);
  if (farmCheck == 1) {
    farmUnlocked = true;
    autofarm = setInterval(pressBanana, autoTime);
    moreFarm.disabled = true;
    moreFarm.innerHTML = "Purchased";
    moreFarmPrice = 99999999999;
    console.log("hi")
  }
  refresh()
}

//REMOVE EVERYTHING
function clearAll() {
  dmgBtn.remove();
  perBtn.remove();
  farmUp.remove();
  moreFarm.remove();
  banana.remove();
  bpsTxt.remove();
  refresh();
}



