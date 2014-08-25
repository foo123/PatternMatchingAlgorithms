!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  Aho - Corasick (multiple )Matcher
    //  http://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_string_matching_algorithm
    //
    
    Pattern.AhoCorasickMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.AhoCorasickMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.AhoCorasickMatcher.prototype.reference = 'http://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_string_matching_algorithm';
    
}(Pattern);