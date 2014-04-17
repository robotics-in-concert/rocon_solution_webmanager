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


  var generate_btn = jQuery('#generate_btn');
	var generate_btn1 = jQuery('#generate_btn1'); //new	
	var generate_btn2 = jQuery('#generate_btn2'); //new	
  var sample_0_btn = jQuery('#sample_0_btn');
  var sample_1_btn = jQuery('#sample_1_btn');
  var sample_2_btn = jQuery('#sample_2_btn');
  var sample_3_btn = jQuery('#sample_3_btn');
  var sample_4_btn = jQuery('#sample_4_btn');
  var sample_5_btn = jQuery('#sample_5_btn');

  var svg_div = jQuery('#graphviz_svg_div');
  var graphviz_data_textarea = jQuery('#graphviz_data');
	 var graphviz_data_textarea1 = jQuery('#dotgraph_data1'); //new
	 var graphviz_data_textarea2 = jQuery('#dotgraph_data2'); //new

  function InsertGraphvizText(text) {
    graphviz_data_textarea.val(text);
  }


  function UpdateGraphviz() {
	svg_div.html("");
    var data = graphviz_data_textarea.val();
    // Generate the Visualization of the Graph into "svg".
    var svg = Viz(data, "svg");	
    svg_div.html("<hr>" + svg + "<hr>");
  }

   function UpdateGraphviz_new(textarea) { //new_2014-04-11
	svg_div.html("");
    var data = textarea.val();
    // Generate the Visualization of the Graph into "svg".
    var svg = Viz(data, "svg");	
    svg_div.html("<hr>" + svg + "<hr>");
  }

  // Startup function: call UpdateGraphviz
  jQuery(function() {
	// The buttons are disabled, enable them now that this script
	// has loaded.
    generate_btn.removeAttr("disabled")
                .text("Generate Graph!");

	sample_0_btn.removeAttr("disabled");
    sample_1_btn.removeAttr("disabled");
    sample_2_btn.removeAttr("disabled");
    sample_3_btn.removeAttr("disabled");
    sample_4_btn.removeAttr("disabled");
    sample_5_btn.removeAttr("disabled");
  });

  // Bind actions to form buttons.
  generate_btn.click(UpdateGraphviz);

	generate_btn1.click(function(){ //new
		UpdateGraphviz_new(graphviz_data_textarea1)});
	generate_btn2.click(function(){ //new
		UpdateGraphviz_new(graphviz_data_textarea2)});

  sample_0_btn.click(function(){
    InsertGraphvizText(jQuery("#sample0_text").html().trim());
  });

  sample_1_btn.click(function(){
    InsertGraphvizText(jQuery("#sample1_text").html().trim());
  });

  sample_2_btn.click(function(){
    InsertGraphvizText(jQuery("#sample2_text").html().trim());
  });

  sample_3_btn.click(function(){
    InsertGraphvizText(jQuery("#sample3_text").html().trim());
  });

  sample_4_btn.click(function(){
    InsertGraphvizText(jQuery("#sample4_text").html().trim());
  });

  sample_5_btn.click(function(){
    InsertGraphvizText(jQuery("#sample5_text").html().trim());
  });

});
