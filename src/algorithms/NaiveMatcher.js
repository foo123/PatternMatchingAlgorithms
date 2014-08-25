!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  "Naive" String Matcher
    //  http://en.wikipedia.org/wiki/String_searching_algorithm
    //
    
    Pattern.NaiveMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.NaiveMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.NaiveMatcher.prototype.reference = 'http://en.wikipedia.org/wiki/String_searching_algorithm';
    Pattern.NaiveMatcher.prototype.description = "This is a &quot;<i>naive</i>&quot; string search algorithm, in that it tests each succesive position of the input text to see if the pattern matches and does not use information about the pattern (or the text) in order to speed up the search.";
    Pattern.NaiveMatcher.prototype.match = function( s, offset ) {
        var p = this._pattern, n = s.length, m = p.length, i;
        
        if ( arguments.length < 2 ) offset = 0;
        if ( offset < 0 ) offset += n;
        if ( n > 0 && m > 0 && n >= offset+m )
        {
            n = n-m+1;
            for (i=offset; i<n; i++)
            {
                if ( s.slice(i, i+m) === p ) return i;
            }
        }
        return -1;
    };
    
}(Pattern);