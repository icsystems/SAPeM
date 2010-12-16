(function($) {
/* jQuery object extension methods */
	$.fn.extend({
		appendText: function(e) {
			if ( typeof e == "string" )
				return this.append( document.createTextNode( e ) );
			return this;
		}
	});
})(jQuery);
