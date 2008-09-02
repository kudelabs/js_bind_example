/**
 * @author Adeh DeSandies
 */
var FancyEditor = Class.create( {

		initialize: function(holder) {
			this.holder 		= $(holder);
			this.off			= this.holder.select("div.off").first();
			this.on				= this.holder.select("div.on").first();
			this.save_button	= this.on.select("input.save").first();
			this.text			= this.on.select("input.text").first();
			this.editing		= false;
			
			this.off.onclick 			= this.show_text_field.bind(this);
			this.off.onmouseover 		= this.show_highlight.bind(this);
			this.off.onmouseout 		= this.hide_highlight.bind(this);
			
			this.save_button.onclick 	= this.hide_text_field.bind(this);
		},

		show_text_field : function () {
			if (this.editing) {return;}
			
			this.editing = true;
			new Effect.BlindUp(this.off, {duration:0.3});
			new Effect.BlindDown(this.on, {duration:0.3, queue:'end'});  
			setTimeout(this.text.select.bind(this.text), 610); 
			
			
		},
	
		hide_text_field : function () {
			if (!this.editing) {return;}
			if (this.text.value == '') this.text.value = "Please type something here!";   //mysen, for null input
			this.off.select('span').first().update(this.text.value);
			
			new Effect.BlindUp(this.on, {duration:0.3});
			new Effect.BlindDown(this.off, {duration:0.3, queue:'end'}); 
			
			var finished = function(){this.editing = false};
			setTimeout(finished.bind(this), 610);
			
		},
		
		show_highlight : function() {
			this.off.addClassName('high');
		},
		hide_highlight : function() {
			this.off.removeClassName('high');
		}
		
	});

	
