// Delay loading any function until the html dom has loaded. All functions are
// defined in this top level function to ensure private scope.
jQuery(document).ready(function () {

  // Installs error handling.
  jQuery.ajaxSetup({
  error: function(resp, e) {
    if (resp.status == 0){
      alert('You are offline!!\n Please Check Your Network.');
      } else if (resp.status == 404){
        alert('Requested URL not found.');
      } else if (resp.status == 500){
        alert('Internel Server Error:\n\t' + resp.responseText);
      } else if (e == 'parsererror') {
        alert('Error.\nParsing JSON Request failed.');
      } else if (e == 'timeout') {
        alert('Request timeout.');
      } else {
        alert('Unknown Error.\n' + resp.responseText);
      }
    }
  });  // error:function()

  var sample_0_btn = jQuery('#sample_0_btn');
  //var graphviz_data_textarea = jQuery('#graphviz_data');
  var box1 = jQuery('#box1');
  var box2 = jQuery('#box2');
  var box3 = jQuery('#box3');
  var box4 = jQuery('#box4');

  function InsertText(box, text) {
    box.val(text);
  }

  // Bind actions to form buttons.
  sample_0_btn.click(function(){
    InsertText(box1, jQuery("#sample1_text").html().trim());
	InsertText(box2, jQuery("#sample2_text").html().trim());
	InsertText(box3, jQuery("#sample3_text").html().trim());
	InsertText(box4, jQuery("#sample4_text").html().trim());
  });
/*
  sample_1_btn.click(function(){
    InsertText(jQuery("#sample1_text").html().trim());
  });
*/
});
