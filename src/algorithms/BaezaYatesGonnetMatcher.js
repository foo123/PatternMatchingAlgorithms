!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  Baeza-Yates-Gonnet (Bitap) Matcher
    //  http://en.wikipedia.org/wiki/Bitap_algorithm
    //
    
    Pattern.BaezaYatesGonnetMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.BaezaYatesGonnetMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.BaezaYatesGonnetMatcher.prototype.reference = 'http://en.wikipedia.org/wiki/Bitap_algorithm';
    
    Pattern.BitapMatcher = Pattern.BaezaYatesGonnetMatcher;
    
}(Pattern);