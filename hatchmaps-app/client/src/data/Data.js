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
const octoberCaddis = new Bug(8, '10ober Caddis' ,'caddisfly', [56, 66], 'OctoberCaddis', 'orange');
const marchBrown = new Bug(9, 'March Brown' ,'mayfly', [46,56], 'MarchBrown', 'brown');


//WATERBODY DATA
//id, name, waterType, bugs
//addBug(bug, time)
const willametteRiver = new WaterBody(100, 'willametteRiver', 'river');
willametteRiver.addBug(blueWingedOlive, ['1', '2', '7', '8', '9', '10']);
willametteRiver.addBug(marchBrown, ['1', '2']);
willametteRiver.addBug(caddisflyVarious, ['4', '5', '6', '7', '8', '9', '10']);
willametteRiver.addBug(goldenStonefly, ['4', '5', '6']);
willametteRiver.addBug(salmonfly, ['4', '5', '6', '7']);
willametteRiver.addBug(paleMorningDun, ['5', '6', '7']);
willametteRiver.addBug(midgeVarious, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);

const mckenzieRiver = new WaterBody(101, 'mckenzieRiver', 'river');
mckenzieRiver.addBug(blueWingedOlive, ['1', '2', '7', '9', '10', '11']);
mckenzieRiver.addBug(marchBrown, [ '2', '3', '4', '5']);
mckenzieRiver.addBug(caddisflyVarious, ['4', '5', '6', '7', '8']);
mckenzieRiver.addBug(goldenStonefly, ['3', '4', '5', '6', '7']);
mckenzieRiver.addBug(salmonfly, ['3', '4', '5', '6', '7']);
mckenzieRiver.addBug(paleMorningDun, ['5', '6', '7']);
mckenzieRiver.addBug(midgeVarious, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
mckenzieRiver.addBug(octoberCaddis, ['9', '10', '11']);

const metoliusRiver = new WaterBody(102, 'metoliusRiver', 'river');
metoliusRiver.addBug(blueWingedOlive, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
metoliusRiver.addBug(caddisflyVarious, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
metoliusRiver.addBug(greenDrake,['5', '6', '7', '8', '9', '10']);
metoliusRiver.addBug(paleMorningDun, ['5', '6', '7', '8', '9', '10']);
metoliusRiver.addBug(goldenStonefly, ['7', '8', '9', '10']);
metoliusRiver.addBug(salmonfly, ['7', '8']);



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
const metoliusNearGrandview = new Site(14091500, 'Metolius River Near Grandview', metoliusRiver, 44.6262275, -121.4839433);

export const sites = {
    14171600: willametteAtCorvallis,
    14207770: willametteBelowFalls,
    14144790: mfWillametteAboveSnakeCreek,
    14159110: mckenzieAboveSouthFork,
    14164900: mckenzieAboveHaydenBridge,
    14165500: mckenzieNearCoburg,
    14091500: metoliusNearGrandview
  };
  