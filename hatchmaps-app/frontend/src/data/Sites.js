import WaterBody from './WaterBody';

class Site{
    constructor(id, name, bodyOfWater, lat, long, temp, hatch){
        this.id = id;
        this.name = name;
        this.bodyOfWater = bodyOfWater;
        this.lat = lat;
        this.long = long;
        this.temp = temp;
        this.hatch = [];
    }


addHatch(hatch) {
    this.hatch.push(hatch);
}

getHatches(){
    return this.hatch;
}

}

export default Site;