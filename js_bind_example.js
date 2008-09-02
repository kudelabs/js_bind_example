/**
 * @author Adeh DeSandies
 */
var FancyEditor = Class.create( {

		initialize: function(holder, options) {
			options = options ;// options ||  {off: "div.off", on: "div.on", save: "input.save", text: "input.text"};
			this.holder 		= $(holder);
			this.off			= this.holder.select(options.off).first();
			this.on				= this.holder.select(options.on).first();
			this.save_button	= this.on.select(options.save).first();
			this.text			= this.on.select(options.text).first();
			this.editing		= false; 
			this.off.onclick 			= this.show_text_field.bind(this);
			this.off.onmouseover 		= this.show_highlight.bind(this);
			this.off.onmouseout 		= this.hide_highlight.bind(this);
			
			this.save_button.onclick 	= this.hide_text_field.bind(this);
		},
		select_text : function(){ 
			this.text.select();
		},	
		show_text_field : function () {
			if (this.editing) {return;} 
			this.editing = true;
			new Effect.BlindUp(this.off, {duration:0.3});
			new Effect.BlindDown(this.on, {duration:0.3, queue:'end'});   
			setTimeout(this.select_text.bind(this), 610);	
			
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

 