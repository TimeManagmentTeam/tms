export default {
    parseToJiraStyle: timeStr => {
        let timeArr = timeStr.split(':');
        let minutes = Number(timeArr[1]);
        let hours = Number(timeArr[0]) % 8;
        let days = Math.floor(Number(timeArr[0]) / 8);
        
        return (days ? `${days}d` : '') + (hours ? `${hours}h` : '') + (minutes ? `${minutes}m` : '');
    },

    parseFromJiraStyle: str => {
        let duration = /(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*([a-z]*)/ig;
        let parse = {};
        parse.m = 1;
        parse.h = parse.m * 60;
        parse.d = parse.h * 8;
        let minutes = 0;

        str = str.replace(/(\d),(\d)/g, '$1$2');
        str.replace(duration, (_, n, units) => {
            units = parse[units] || parse[units.toLowerCase().replace(/s$/, '')] || 1;
            minutes += parseFloat(n, 10) * units;
        });

        let hours = Math.floor(minutes / parse.h);
        minutes -= hours * parse.h;

        return `${hours}:${minutes}:00`;
    },

    getTotalTime(times) {
        let total = '';

        times.forEach(time => {
            total += this.parseToJiraStyle(time) + ' ';
        });

        return this.parseToJiraStyle(this.parseFromJiraStyle(total));
    }
};