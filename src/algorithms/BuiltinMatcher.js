!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  Builtin Matcher
    //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
    //
    
    Pattern.BuiltinMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.BuiltinMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.BuiltinMatcher.prototype.reference = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf';
    Pattern.BuiltinMatcher.prototype.description = "This is JavaScript's builtin string search algorithm (<i>String.prototype.indexOf</i>), usually a variation of Knuth-Morris-Pratt or Boyer-Moore algorithms.";
    Pattern.BuiltinMatcher.prototype.match = function( s, offset ) {
        var p = this._pattern, m = p.length, n = s.length;
        
        if ( arguments.length < 2 ) offset = 0;
        if ( offset < 0 ) offset += n;
        if ( n > 0 && m > 0 && n >= offset+m )
        {
            return s.indexOf( p, offset );
        }
        return -1;
    };
    
}(Pattern);