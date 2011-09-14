define(["dojo/_base/declare", "dojo/_base/lang", "dojo/Stateful"], 
	function(declare, lang, Stateful){
		
	/*=====
	var Stateful = dojo.Stateful;
	=====*/
	
	return declare("dojox.widget._Invalidating", Stateful, {
		// summary:
		//		Base class for classes (usually widgets) that watch invalidated properties and delay the rendering
		//		after these properties modifications to the next execution frame.
		
		//	watchedPoperties: String[]
		//		The list of properties to watch for. This list must be initialized in the constructor.
		//		Default value is null.
		watchedProperties: null,
		//	invalidRenderering: Boolean
		//		Whether the rendering is invalid or not. This is a readonly information, one must call 
		//		invalidateRendering to modify this flag. 
		invalidRendering: false,
		postscript: function(){
			this.inherited(arguments);		
			if(this.watchedProperties){
				var props = this.watchedProperties;
				for(var i = 0; i < props.length; i++){
					this.watch(props[i], lang.hitch(this, this.invalidateRendering));
				}
			}
		},
		addWatchedProperties: function(/*Array*/ properties){
			// summary:
			//		Add properties to the watched properties. This method must be called in the constructor.
			//		It is typically used by subclasses of a _Invalidating class to add more properties to
			//		watch for.
			// properties: String[]
			//		The list of properties to watch for.
			this.watchedProperties = this.watchedProperties?this.watchedProperties.concat(properties):properties;
		},
		invalidateRendering: function(){
			// summary:
			//		Invalidating the rendering for the next executation frame.
			if(!this.invalidRendering){
				this.invalidRendering = true;
				setTimeout(lang.hitch(this, this.validateRendering), 0);
			}
		},
		validateRendering: function(){
			// summary:
			//		Immediately validate the rendering if it has been invalidated. You generally do not call that method yourself.
			//	tags:
			//		protected
			if(this.invalidRendering){
				this.refreshRendering();
				this.invalidRendering = false;
			}
		},
		refreshRendering: function(){
			// summary:
			//		Actually refresh the rendering. Implementation should implement that method.
		}
	});
});