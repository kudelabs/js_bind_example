/**
 * author: Adeh DeSandies, Mysen Huang
 * company: Kude Labs Software Development Limited Company
 * license: This source code is purely for demonstration purposes and is not meant for production use
 */
var FancyEditor = Class.create( {
		// FancyEditor is a self-containted Javascript object that could be used as a reusable library.
		// The goal here is to demonstrate the use of prototype.js bind() helper function to improve
		// our JS code.

		initialize: function(holder) {
			// this assumes that inside our holder we have
			// 2 main divs, one for editing '.on', and one for displaying the information '.off'
			// inside '.off' we assume there is a span to hold our editable text '.display'
			// inside '.on' we assume that there is a text-field '.text', and a submit button '.save'.
			this.holder 		= $(holder);
			
			this.off			= this.holder.select('div.off').first();
			this.display		= this.off.select('span.display').first();
			
			this.on				= this.holder.select('div.on').first();
			this.text			= this.on.select('input.text').first();
			this.save_button	= this.on.select('input.save').first();
			
			this.editing		= false; 
			
			// here we use bind to ensure that when show_text_field() is called
			// this will be what we expect it to be: our instance of FancyEditor.
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
			
			// A simple effect to bring attention to the fact that we are changing modes.
			// The effects are queued, so the total time it will take to finish is
			// .6s, or 600ms. Before the effects are finished, we cannot use JS to access
			// the hidden elements. 
			new Effect.BlindUp(this.off, {duration:0.3});
			new Effect.BlindDown(this.on, {duration:0.3, queue:'end'});   
			
			// This is a common problem. We need to access this.text, but this.text is
			// not visible at runtime. So we use bind to create a function that can be
			// called at a later date, when all the elements are visible and accessible
			// to JS.
			setTimeout(this.select_text.bind(this), 610);	
			
		},

		hide_text_field : function () {
			if (!this.editing) {return;}
			if (this.text.value == '') {this.text.value = "Please type something here!";}   //mysen, for null input
			
			// update the display in '.off'
			this.display.update(this.text.value);
			
			new Effect.BlindUp(this.on, {duration:0.3});
			new Effect.BlindDown(this.off, {duration:0.3, queue:'end'}); 
			
			// Here, we need to set this.edting after the effects are finished. 
			// This time, we create a functional object and make sure to bind it
			// to our instance.
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

 