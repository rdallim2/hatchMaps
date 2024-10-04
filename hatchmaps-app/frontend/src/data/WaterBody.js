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
      this.bugs[bug.name] = {
        bug, // Bug object
        time: [], // Associated time
      };
      this.bugs[bug.name].time.push(time); 
    } 
    console.log(this.bugs);
  }

  // Method to get all bugs and their times
  getBugs() {
    return this.bugs;
  }

  isMonthInBugs(month) {
    const activeBugs = [];
    for (const bugId in this.bugs) { // for all bugs in the bug list
      const bug = this.bugs[bugId]; 
        const timeList = this.bugs[bugId].time;
        timeList.forEach(item => {
          console.log("Item in timeList:", item);
      });
        const matchFound = timeList.some(time => time.includes(month));
        if (matchFound) {
            console.log("match found");
            activeBugs.push(this.bugs[bugId].bug.name); // Month found in the time list
        }
    }
    console.log(activeBugs);
    return activeBugs;
  }
}

export default WaterBody;