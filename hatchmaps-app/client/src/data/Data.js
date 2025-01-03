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
const octoberCaddis = new Bug(8, 'October Caddis' ,'caddisfly', [56, 66], 'OctoberCaddis', 'orange');
const marchBrown = new Bug(9, 'March Brown' ,'mayfly', [46,56], 'MarchBrown', 'brown');
const scudVarious= new Bug(10, 'Scud- Various', 'sowbug', [50, 68], 'various', 'various');
const mahogonyDun = new Bug(11, 'Mahogony Dun', 'mayfly', [50, 60], 'mahogonyDun', 'brown');



//WATERBODY DATA
//id, name, waterType, bugs
//addBug(bug, time)
const willametteRiver = new WaterBody(100, 'willametteRiver', 'river');
willametteRiver.addBug(blueWingedOlive, ['01', '02', '07', '08', '09', '10']);
willametteRiver.addBug(marchBrown, ['01', '02']);
willametteRiver.addBug(caddisflyVarious, ['04', '05', '06', '07', '08', '09', '10']);
willametteRiver.addBug(goldenStonefly, ['04', '05', '06']);
willametteRiver.addBug(salmonfly, ['04', '05', '06', '07']);
willametteRiver.addBug(paleMorningDun, ['05', '06', '07']);
willametteRiver.addBug(midgeVarious, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);

const mckenzieRiver = new WaterBody(101, 'mckenzieRiver', 'river');
mckenzieRiver.addBug(blueWingedOlive, ['01', '02', '03', '04', '05', '06', '09', '10', '11']);
mckenzieRiver.addBug(marchBrown, [ '02', '03', '04', '05']);
mckenzieRiver.addBug(caddisflyVarious, ['04', '05', '06', '07', '08']);
mckenzieRiver.addBug(goldenStonefly, ['03', '04', '05', '06', '07']);
mckenzieRiver.addBug(salmonfly, ['03', '04', '05', '06', '07']);
mckenzieRiver.addBug(paleMorningDun, ['05', '06', '07']);
mckenzieRiver.addBug(midgeVarious, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
mckenzieRiver.addBug(octoberCaddis, ['9', '10', '11']);

const metoliusRiver = new WaterBody(102, 'metoliusRiver', 'river');
metoliusRiver.addBug(blueWingedOlive, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
metoliusRiver.addBug(caddisflyVarious, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
metoliusRiver.addBug(greenDrake,['05', '06', '07', '08', '09', '10']);
metoliusRiver.addBug(paleMorningDun, ['05', '06', '07', '08', '09', '10']);
metoliusRiver.addBug(goldenStonefly, ['07', '08', '09', '10']);
metoliusRiver.addBug(salmonfly, ['07', '08']);

const crookedRiver = new WaterBody(103, 'crookedRiver', 'river');
crookedRiver.addBug(midgeVarious, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
crookedRiver.addBug(scudVarious, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
crookedRiver.addBug(blueWingedOlive, ['02', '03', '04', ' 05', '09', '10', '11']);
crookedRiver.addBug(caddisflyVarious, ['04', '05', '06', '07', '08', '09']);
crookedRiver.addBug(mahogonyDun, ['08', '09', '10', '11']);
crookedRiver.addBug(octoberCaddis, ['09', '10', '11']);


const umpquaRiver = new WaterBody(104, 'umpquaRiver', 'river');
umpquaRiver.addBug(midgeVarious, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
umpquaRiver.addBug(blueWingedOlive, ['01', '02', '03', '04', '05', '06', '09', '10']);
umpquaRiver.addBug(marchBrown, ['02', '03', '04', '05']);
umpquaRiver.addBug(salmonfly, ['03', '04', '05', '06', '07', '09', '10']);
umpquaRiver.addBug(caddisflyVarious, ['06', '07', '08', '09', '10']);
umpquaRiver.addBug(octoberCaddis, ['09', '10']);



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

//CROOKED
const crookedNearBellButte = new Site(14078260, 'Crooked River Near Bell Butte', crookedRiver, 44.062, -120.0433056);
const crookedBelowOpalSprings = new Site(14087400, 'Crooked River Below Opal Springs', crookedRiver, 44.4923407, -121.298377);

//UMPQUA
const umpquaAtTiller = new Site(14308000, 'Umpqua River At Tiller', umpquaRiver, 	42.9303985, -122.9483872);
const umpquaAtCanyonville = new Site(14308910, 'Umpqua River At Canyonville', umpquaRiver, 42.94369444, -123.2859167);
const umpquaNearBrockway = new Site (14312000, 'Umpqua Near Brockway', umpquaRiver, 43.13317169, -123.3984053);
const umpquaAtMelrose = new Site (14312330, 'Umpqua At Melrose', umpquaRiver, 43.2517611, -123.4477);
const umpquaAtSodaSprings = new Site (14316460, 'Umpqua At Soda Springs', umpquaRiver, 	43.3059544, -122.5128232);
const umpquaAboveCopeland = new Site (14316500, 'Umpqua Above Copeland', umpquaRiver, 43.29595427, -122.5367127);
const umpquaNearIdleyld = new Site (14317450, 'Umpqua Near Idleyld', umpquaRiver, 43.324563, -122.9997836);
const umpquaAtWinchester = new Site (14319500, 'Umpqua At Winchester', umpquaRiver, 43.27096667, -123.4115444);
const umpquaNearElkton = new Site (14321000, 'Umpqua Near Elkton', umpquaRiver, 43.5859502, -123.5553727)



export const sites = {
    14171600: willametteAtCorvallis,
    14207770: willametteBelowFalls,
    14144790: mfWillametteAboveSnakeCreek,
    14159110: mckenzieAboveSouthFork,
    14164900: mckenzieAboveHaydenBridge,
    14165500: mckenzieNearCoburg,
    14091500: metoliusNearGrandview,
    14078260: crookedNearBellButte,
    14087400: crookedBelowOpalSprings,
    14308000: umpquaAtTiller,
    14308910: umpquaAtCanyonville,
    14312000: umpquaNearBrockway,
    14312330: umpquaAtMelrose,
    14316460: umpquaAtSodaSprings,
    14316500: umpquaAboveCopeland,
    14317450: umpquaNearIdleyld,
    14319500: umpquaAtWinchester,
    14321000: umpquaNearElkton
  };
  