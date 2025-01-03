# Hatchmaps
Hatchmaps is an interactive map for displaying water condition and insect information relevant to fly fishing. Temperature data is scraped from USGS (https://waterdata.usgs.gov/or/nwis/current?type=qw&PARAmeter_cds=STATION_NM,DATETIME,00010,00011) and the site primarily serves data for the most popular fly fishing spots in oregon. Calculations on bug forecasts are made based on readings from various books and articles, please contact if interested if you'd be able to provide any valueable info about specific hatches. 

https://hatchmaps.com/

## How it's made:

**Tech Used:** React.js, Express.js, Node.js, MySql, Mapbox, Puppeteer, Docker, AWS, Git 

I implemented a Sern (MySQL, Express.js, React, node.js) fullstack for this site. The scraping of the USGS data was done with Puppeteer, and the map used was one I built in Mapbox. The app is run in two docker containers for client and server-side, and it's bundled in a docker-compose. It's served via an AWS EC2 instance, connected to an RDS MySQL database. 

In terms of future work on this project, my primary focus currently is looking into ways of decreasing costs with AWS; I'm trying to reduce any unnecessary files and dependencies, as well as determining if the load balancer I'm currently running is truly needed, and if the EC2 instance type (t2.medium) can be switched to something else to reduce costs.

## Contact

Please feel free to reach out if you'd be interested in contributing or if you have a suggestion for the site.

**Email:** ryandallimore@gmail.com
**Linkedin** https://www.linkedin.com/in/ryandallimore/
**Portfolio Site:** https://rdallim2.github.io/RyanDallimore_site/


