import Bug from './Bug';
import WaterBody from './WaterBody';
import Site from './Sites';



//BUG DATA
//id, name, order, hatchTemp, subspecies, color

const caddisflyVarious = new Bug(1, 'Caddisfly- various', 'caddisfly', [56, 66], 'various', 'various');
const blueWingedOlive = new Bug(2, 'Blue winged Olive', 'mayfly', [46, 56], 'blueWingedOlive', 'olive');
const midgeVarious = new Bug(3, 'Midge- various', 'midge', [42, 90], 'various', 'various');
const salmonfly = new Bug(4, 'Salmon Fly' ,'stonefly', [55, 60], 'salmonfly', 'black');
const goldenStonefly = new Bug(5, 'Golden Stone Fly' ,'stonefly', [55, 60],  'goldenStonefly', 'gold');
const paleMorningDun = new Bug(6, 'Pale Morning Dun' ,'mayfly', [60, 65], 'paleMorningDun', 'paleYellow');
const greenDrake = new Bug(7, 'Green Drake' ,'mayfly', [55, 60], 'green', 'green');
const octoberCaddis = new Bug(8, 'October Caddis' ,'caddisfly', [56, 66], 'octoberCaddis', 'orange');
const marchBrown = new Bug(9, 'March Brown' ,'mayfly', [46,56], 'marchBrown', 'brown');


//WATERBODY DATA
//id, name, waterType, bugs
//addBug(bug, time)
const willametteRiver = new WaterBody(100, 'willametteRiver', 'river');
willametteRiver.addBug(blueWingedOlive, ['jan', 'feb', 'jul', 'aug', 'sep', 'oct']);
willametteRiver.addBug(marchBrown, ['jan', 'feb']);
willametteRiver.addBug(caddisflyVarious, ['apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct']);
willametteRiver.addBug(goldenStonefly, ['apr', 'may', 'jun']);
willametteRiver.addBug(salmonfly, ['apr', 'may', 'jun', 'jul']);
willametteRiver.addBug(paleMorningDun, ['may', 'jun', 'jul']);
willametteRiver.addBug(midgeVarious, ['jan', 'feb', 'march', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']);

const mckenzieRiver = new WaterBody(101, 'mckenzieRiver', 'river');
mckenzieRiver.addBug(blueWingedOlive, ['jan', 'feb', 'jul', 'sep', 'oct', 'nov']);
mckenzieRiver.addBug(marchBrown, [ 'feb', 'mar', 'apr', 'may']);
mckenzieRiver.addBug(caddisflyVarious, ['apr', 'may', 'jun', 'jul', 'aug']);
mckenzieRiver.addBug(goldenStonefly, ['mar', 'apr', 'may', 'jun', 'jul']);
mckenzieRiver.addBug(salmonfly, ['mar', 'apr', 'may', 'jun', 'jul']);
mckenzieRiver.addBug(paleMorningDun, ['may', 'jun', 'jul']);
mckenzieRiver.addBug(midgeVarious, ['jan', 'feb', 'march', 'apr', 'may', 'jun', 'july', 'aug', 'sep', 'oct', 'nov', 'dec']);
mckenzieRiver.addBug(octoberCaddis, ['sep', 'oct', 'nov']);

const metoliusRiver = new WaterBody(102, 'metoliusRiver', 'river');
metoliusRiver.addBug(blueWingedOlive, ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']);
metoliusRiver.addBug(caddisflyVarious, ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']);
metoliusRiver.addBug(greenDrake,['may', 'jun', 'jul', 'aug', 'sep', 'oct']);
metoliusRiver.addBug(paleMorningDun, ['may', 'jun', 'jul', 'aug', 'sep', 'oct']);
metoliusRiver.addBug(goldenStonefly, ['jul', 'aug', 'sep', 'oct']);
metoliusRiver.addBug(salmonfly, ['jul', 'aug']);



//SITE DATA
//id, name, bodyOfWater, lat, long, temp

//WILLAMETTE
const willametteAtCorvallis = new Site(14171600, 'Willamette River At Corvallis', willametteRiver, 44.16633386, -123.2568056);
const willametteBelowFalls = new Site(14207770, 'Willamette River Below Falls', willametteRiver, 45.35762066, -122.610925);
const mfWillametteAboveSnakeCreek = new Site(14144790, 'Middle Fork Willametter River Above Snake Creek', willametteRiver, 43.53996944, -122.4478389);


//MCKENZIE
const mckenzieAboveSouthFork = new Site(14159110, 'Mckenzie River Above South Fork', mckenzieRiver, 44.16633386, -122.2565067);
const mckenzieAboveHaydenBridge = new Site(14164900, 'Mckenzie River Above Hayden Bridge', mckenzieRiver, 44.0712365, -122.9645273);
const mckenzieNearCoburg = new Site(14165500, 'Mckenzie River Near Coburg', mckenzieRiver, 44.11305556, -123.0469722);

//METOLIUS
const metoliusNearGrandview = new Site(14091500, 'Metolius River Near Grandview', mckenzieRiver, 44.6262275, -121.4839433);

export const sites = {
    14171600: willametteAtCorvallis,
    14207770: willametteBelowFalls,
    14144790: mfWillametteAboveSnakeCreek,
    14159110: mckenzieAboveSouthFork,
    14164900: mckenzieAboveHaydenBridge,
    14165500: mckenzieNearCoburg,
    14091500: metoliusNearGrandview
  };
  