!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  Baeza-Yates-Gonnet-Wu-Manber Matcher
    //  http://en.wikipedia.org/wiki/Bitap_algorithm
    //
    
    Pattern.BaezaYatesGonnetWuManberMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.BaezaYatesGonnetWuManberMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.BaezaYatesGonnetWuManberMatcher.prototype.reference = 'http://en.wikipedia.org/wiki/Bitap_algorithm';
    
}(Pattern);