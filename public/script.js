$(function() {
  var peerReviewCanvas = $('#peer-review')[0];
  var peerReviewCtx = peerReviewCanvas.getContext('2d');
  var pointDistributionCanvas = $("#point-distribution")[0];
  var pointDistributionCtx = pointDistributionCanvas.getContext('2d');

  peerReviewCtx.fillText('Peer Review', 10, 10);
  for(var count = 0; count <= 10; count++)
  {
    var pos = 30 + count * 20;
    peerReviewCtx.strokeText("" + 10 - count, 10, pos);
    peerReviewCtx.moveTo(25, pos);
    peerReviewCtx.lineTo(90, pos);
  }
  peerReviewCtx.stroke();

  var colors = ['green', 'red', 'blue', 'orange', 'purple', 'pink'];
  $.ajax({
    url: '/peerReview.json',
    dataType: 'json',
    success: function(data) {
      var categories = Object.keys(data);
      categories.forEach(function(category, index) {
        var value = data[category];
        var y = 30 + (10 - value) * 20;
        var x = 30 + index * 10;
        var height = value * 20;
        peerReviewCtx.fillStyle = colors[index];
        peerReviewCtx.fillRect(x, y, 5, height);
        peerReviewCtx.fillRect(100, 80 + 20 * index, 10, 10);
        peerReviewCtx.strokeText(category, 120, 90 + 20 * index);
      });
    }
  });

  $.ajax({
    url: 'pointDistribution.json',
    dataType: 'json',
    success: function(data) {
      var people = Object.keys(data);
      var total = Object.values(data).reduce(function(acc, val) {
        return acc + val;
      }, 0);

      var start = 0;
      people.forEach(function(person, index) {
        var percent = data[person] / total;
        var end = start + percent * 2 * Math.PI;
        pointDistributionCtx.beginPath();
        pointDistributionCtx.arc(100, 100, 80, start, end);
        start = end;
        pointDistributionCtx.fillStyle = colors[index];
        pointDistributionCtx.fill();
      });
    }
  });
});
