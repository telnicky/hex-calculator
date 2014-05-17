var baseSelect = "<select class='baseSelect'>" +
                   "<option value='16'>Hex</option>" +
                   "<option value='2'>Binary</option>" +
                   "<option value='10'>Decimal</option>" +
                 "</select>";

var operatorSelect =  "<select class='operatorSelect'>" +
                        "<option value='plus'>+</option>" +
                        "<option value='minus'>-</option>" +
                        "<option value='multiply'>*</option>" +
                        "<option value='divide'>/</option>" +
                      "</select>";

var calculatorRow = _.template("<div class='row' data-base='<%= base %>'>" +
                      "<div class='large-2 columns'>" +
                        operatorSelect +
                      "</div>" +
                        "<div class='large-6 columns'>" +
                         "<input type='text' class='rowValue'/>" +
                        "</div>" +
                      "<div class='large-2 columns'>" +
                        "<button class='removeRow tiny alert'>Remove</button>" +
                      "</div>" +
                    "</div>");

$(function() {
  var calculator = $('.calculator'),
      currentBase = $('.baseSelect').val();
  $('.calculator').prepend(calculatorRow({ base: currentBase }));
});

$('.addRow').click(function() {
  var calculator = $('.calculator'),
      currentBase = $('.baseSelect').val();
  calculator.append(calculatorRow({ base: currentBase }));
});

$('.calculator').on('click', '.removeRow', function() {
  $(this).closest('.row').remove();
});

$('.baseSelect').on('change', function() {
  var rows = $('.calculator, .controls').find('.row'),
    base = this.value;

  _.each(rows, function(row) {
    updateBaseForRow($(row), base);
  });
});

$('.calculator').on('change', '.row', function() {
  var rows = $('.calculator').find('.row'),
    base = $('.baseSelect').val(),
    total = _.reduce(rows, function(total, row) {
      var operator = $(row).find('.operatorSelect').val(),
        input = $(row).find('.rowValue'),
        rhs = parseInt(input.val(), base) || 0;

      if (operator == 'plus') {
        return total + rhs;
      }
      else if (operator == 'minus') {
        return total - rhs;
      }

      return total;
    }, 0);

  $('.total').val(total.toString(base));
});

function updateBaseForRow($row, newBase) {
  var base = parseInt(newBase, 10),
    oldBase = $row.data('base') || 16,
    $input = $row.find('.rowValue'),
    value = parseInt($input.val(), oldBase);

  $input.val(value.toString(base));
  $row.data("base", base.toString());
}

