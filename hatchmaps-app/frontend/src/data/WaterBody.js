import Bug from './Bug';

class WaterBody{
    constructor(id, name, waterType, bugs){
        this.id = id;
        this.name = name;
        this.waterType = waterType;
        this.bugs = {};
    }

  // Method to add a bug and its associated time
  addBug(bug, time) {
    if(bug instanceof Bug){
      this.bugs[bug.id] = {
        bug, // Bug object
        time: [], // Associated time
      };
      this.bugs[bug.id].time.push(time); 
    } 
  }

  // Method to get all bugs and their times
  getBugs() {
    return this.bugs;
  }
}

export default WaterBody;