var distance = require('gps-distance');
var dist = require('google-distance');

var path = ['43.7055072,-72.2936611', '43.7055072,-72.2936611', '43.7055072,-72.2936611', '43.7055072,-72.2936611', '43.7055072,-72.2936611' ,'43.7055072,-72.2936611', '43.7055072,-72.2936611', '43.7055072,-72.2936611', '43.7055072,-72.2936611', '43.7055072,-72.2936611','43.7055072,-72.2936611', '43.7055072,-72.2936611', '43.7055072,-72.2936611', '43.7048404,-72.2945232'];

dist.get(
  {
    origin: path[0],
    destinations: path,
    mode: 'walking',
    units: 'imperial'
  },
  function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var sum = 0;
      data.forEach((item) => {
        var amount = item.distance.split(' ')[0];
        var units  = item.distance.split(' ')[1];

        if (units === 'ft') {
          var amountInt = parseInt(amount);
          if (amountInt !== 1) {
            sum += amountInt
          }
        } else if (units === 'mi') {
          sum += parseInt(amount) * 0.000189394;
        }



      });

      console.log((sum / 300) * 5);
    }
  }
)


// var result2 = distance(path);




// console.log(result2);
