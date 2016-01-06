$(document).ready(function() {
	var randomQuote;
	var prev;
	getRandomQuote();

  	function getRandomQuote(){
	    var json = [
		    {"quote":"Who's the more foolish, the fool or the fool who follows him?","person":"Ben Obi-Wan Kenobi"},
		    {"quote":"Women always figure out the truth. Always.", "person":"Han Solo"},
		    {"quote":"The Force is strong with this one.","person": "Darth Vader"},
		    {"quote":"Wonderful girl. Either I'm going to kill her or I'm beginning to like her.", "person":"Han Solo"},
		    {"quote":"The Force will be with you, always.", "person":"Ben Obi-Wan Kenobi"},
		    {"quote":"Use the Force, Luke.", "person":"Ben Obi-Wan Kenobi"},
		    {"quote":"Hokey religions and ancient weapons are no match for a good blaster at your side, kid.", "person":"Han Solo"},
		    {"quote":"You are unwise to lower your defenses!", "person":"Darth Vader"},
		    {"quote":"In my experience, there's no such thing as luck.", "person":"Ben Obi-Wan Kenobi"},
		    {"quote":"Your weapons, you will not need them.", "person":"Yoda"}
		];
	    
	    var index = Math.floor(Math.random() * json.length);

	    while(prev == index) {
	    	index = Math.floor(Math.random() * json.length);
	    }

	    prev = index;
		randomQuote = '"' + json[index].quote + '"';
		$('.quote').text(randomQuote);
	    $('.person').text("- " + json[index].person);
	}
  
	$(".btn-primary").on( "click", function() {
    	getRandomQuote();
	});  

	$(".btn-info").attr("href", 'https://twitter.com/intent/tweet?text=' + randomQuote);
  
});
