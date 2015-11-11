$(function () {
  var apiUrl = "http://localhost:8080/api/users";
  $('#withdrawSend').click(function () {
    $.ajax({
        method: "PUT",
        url: apiUrl + '/withdraw',
        data: {
          id: $("#userid").val(),
          amount: $("#withdraw").val()
        }
      })
      .done(function (data) {
        $('#content').text(data.message);
      });
  });
  $('#depositSend').click(function () {
    $.ajax({
        method: "PUT",
        url: apiUrl + '/deposit',
        data: {
          id: $("#userid").val(),
          amount: $("#deposit").val()
        }
      })
      .done(function (data) {
        $('#content').text(data.message);
      });
  });
  $('#listUsers').click(function () {
    $.get(apiUrl, function (data) {
      var tmp = $('#content')
      tmp.text('');
      for (var i = 0; i < data.length; i++) {
        var div = $('<div/>')
          .appendTo(tmp);
        var name = $('<p/>')
          .text('name: ' + data[i].name)
          .appendTo(div);
        var balance = $('<p/>')
          .text('balance: ' + data[i].balance)
          .appendTo(div);
        var id = $('<p/>')
          .addClass('border-bottom')
          .text('id: ' + data[i]._id)
          .appendTo(div);
      }
    });
  });
  $('#addUser').click(function () {
    $.ajax({
        method: "POST",
        url: apiUrl,
        data: {
          name: $("#username").val(),
          balance: $("#balance").val()
        }
      })
      .done(function (data) {
        $('#content').text(data.message);
      });
  });
  $('#deleteUser').click(function () {
    $.ajax({
        method: "DELETE",
        url: apiUrl,
        data: {
          id: $("#userid").val()
        }
      })
      .done(function (data) {
        $('#content').text(data.message);
      });
  });
});