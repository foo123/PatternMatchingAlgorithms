!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  Commentz - Walter (multiple) Matcher
    //  http://en.wikipedia.org/wiki/Commentz-Walter_algorithm
    //
    
    Pattern.CommentzWalterMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.CommentzWalterMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.CommentzWalterMatcher.prototype.reference = 'http://en.wikipedia.org/wiki/Commentz-Walter_algorithm';
    
}(Pattern);