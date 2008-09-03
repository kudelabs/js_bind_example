/**
 * author:  Adeh DeSandies, Mysen Huang
 * company: Kude Labs Software Development Limited Company
 * license: This source code is purely for demonstration purposes and is not meant for production use
 * 作者: 阿代-德桑迪斯，黄文斌
 * 公司: 酷德软件开发有限公司
 * 许可:	这个源码纯粹是为了示范目的，并不用于商业产品
 */
var FancyEditor = Class.create( {
		// FancyEditor is a self-containted Javascript object that could be used as a reusable library.
		// 梦幻编辑器是一个独立的JS对象，它能被用来作为一个可重复使用的库
		// The goal here is to demonstrate the use of prototype.js bind() helper function to improve our JS code.
		// 这里的目标是要展示如何使用原型prototype.js的bind()绑定功能，以改善我们的js代码
		
		initialize: function(holder) {
			// this assumes that inside our holder we have
			// 2 main divs, one for editing '.on', and one for displaying the information '.off'
			// inside '.off' we assume there is a span to hold our editable text '.display'
			// inside '.on' we assume that there is a text-field '.text', and a submit button '.save'.
			// 这里假设在holder容器里面我们有2个主要的divs， 一个用于编辑'.on', 还有一个用于展示信息'.off'
			// 在'.off'里, 我们假定有一个叫'.display'的span元素保留着我们可编辑的文本
			// 在'.on'里, 我们假定有一个'.text'文本框和'.save'提交按钮 
			
			this.holder 		= $(holder);
			
			this.off			= this.holder.select('div.off').first();
			this.display		= this.off.select('span.display').first();
			
			this.on				= this.holder.select('div.on').first();
			this.text			= this.on.select('input.text').first();
			this.save_button	= this.on.select('input.save').first();
			
			this.editing		= false; 
			
			// here we use bind to ensure that when show_text_field() is called
			// this will be what we expect it to be: our instance of FancyEditor.
			// 这里我们使用绑定以确保show_text_field()函数被调用
			// 这将是我们所期望它成为：我们的实例FancyEditor 
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
			// 一个简单的过度效果，使人们注意到我们在变化模式（显示模式 -> 编辑模式）。
			// 这些效果是按顺序完成的，总共花了0.6秒. 在这0.6秒内，我们不能用JS访问被隐藏的元素.

			new Effect.BlindUp(this.off, {duration:0.3});
			new Effect.BlindDown(this.on, {duration:0.3, queue:'end'});   
			
			// This is a common problem. We need to access this.text, but this.text is
			// not visible at runtime. So we use bind to create a function that can be
			// called at a later date, when all the elements are visible and accessible
			// to JS.
			// 这是一个普遍的难题。我们需要访问this.text, 但this.text在运行过度效果的时间里是不可见的，
			// 所以我们使用绑定来创建一个函数，以便它在接下来所有元素都可见并可访问的时候可以被调用到。
			setTimeout(this.select_text.bind(this), 610);	
			
		},

		hide_text_field : function () {
			if (!this.editing) {return;}
			if (this.text.value == '') {this.text.value = "Please type something here!";}  
			
			// update the display in '.off'
			// 更新'.off'容器的显示内容（即刚输入的文本）
			this.display.update(this.text.value);
			
			new Effect.BlindUp(this.on, {duration:0.3});
			new Effect.BlindDown(this.off, {duration:0.3, queue:'end'}); 
			
			// Here, we need to set this.editing after the effects are finished. 
			// This time, we create a functional object and make sure to bind it to our instance.
			// 当过度效果结束时，设置this.editing的值为'false'以便下一次再调用。 
			// 我们建立了一个功能对象，并确保绑定到我们的实例。
			
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

 