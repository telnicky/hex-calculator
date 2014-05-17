$(".hex-display").keyup(function(evt) {
  console.log(this.value);
  this.value = this.value.replace(/[^0-9a-fA-F]/g,'');
  var hexValue = this.value,
  val = parseInt(hexValue, 16);

  if(hexValue != '') {
    $('.bin-display').val(val.toString(2));
    $('.dec-display').val(val.toString(10));
  }
  else {
    $('.bin-display').val('');
    $('.dec-display').val('');
  }
});

$(".bin-display").keyup(function(evt) {
  this.value = this.value.replace(/[^0-1]/g,'');
  var binValue = this.value,
  val = parseInt(binValue, 2);

  if(binValue != '') {
    $('.hex-display').val(val.toString(16));
    $('.dec-display').val(val.toString(10));
  }
  else {
    $('.bin-display').val('');
    $('.dec-display').val('');
  }
});

$(".dec-display").keyup(function(evt) {
  this.value = this.value.replace(/[^0-9]/g,'');
  var decValue = this.value,
  val = parseInt(decValue, 10);

  if(decValue != '') {
    $('.hex-display').val(val.toString(16));
    $('.bin-display').val(val.toString(2));
  }
  else {
    $('.bin-display').val('');
    $('.dec-display').val('');
  }
});

