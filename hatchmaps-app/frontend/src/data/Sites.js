import WaterBody from './WaterBody';

class Site{
    constructor(id, name, bodyOfWater, lat, long, temp){
        this.id = id;
        this.name = name;
        this.bodyOfWater = bodyOfWater;
        this.lat = lat;
        this.long = long;
        this.temp = temp;
    }
}

export default Site;