!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  Knuth-Morris-Pratt Matcher
    //  http://www.eecs.ucf.edu/~shzhang/Combio09/kmp.pdf
    //  http://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm
    //
    
    var array_fill = Pattern.utils.array_fill;
    
    function computePrefix( p )
    {
        var m = p.length, k, q,
            prefix = array_fill( m, 0 )
        ;
        
        k = 0;
        for (q=1; q<m; q++)
        {
            while ( k > 0 && p.charAt( k+1 ) !== p.charAt( q ) ) k = prefix[ k ];
            
            if ( p.charAt( k+1 ) === p.charAt( q ) ) k++;
            
            prefix[ q ] = k;
        }
        return prefix;
    }
    
    Pattern.KnuthMorrisPrattMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.KnuthMorrisPrattMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.KnuthMorrisPrattMatcher.prototype.reference = 'http://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm';
    Pattern.KnuthMorrisPrattMatcher.prototype.description = "The Knuth–Morris–Pratt algorithm (or KMP algorithm) searches for occurrences of a \"word\" W within a main \"text string\" S by employing the observation that when a mismatch occurs, the word itself embodies sufficient information to determine where the next match could begin, thus bypassing re-examination of previously matched characters."
    Pattern.KnuthMorrisPrattMatcher.prototype._prefix = null;
    Pattern.KnuthMorrisPrattMatcher.prototype.dispose = function( ) {
        this._pattern = null;
        this._prefix = null;
        return this;
    };
    Pattern.KnuthMorrisPrattMatcher.prototype.pattern = function( pattern ) {
        this._pattern = pattern || null;
        if ( this._pattern )
        {
            this._prefix = computePrefix( this._pattern );
        }
        else
        {
            this._prefix = null;
        }
        return this;
    };
    Pattern.KnuthMorrisPrattMatcher.prototype.match = function( s, offset ) {
        var p = this._pattern, prefix = this._prefix,
            n = s.length, m = p.length, i, q
        ;
        
        if ( arguments.length < 2 ) offset = 0;
        if ( offset < 0 ) offset += n;
        if ( n > 0 && m > 0 && n >= offset+m )
        {
            q = 0;  // number of characters matched
            for (i=offset; i<n; i++)
            {
                while ( q > 0 && p.charAt( q ) !== s.charAt( i ) ) 
                {
                    q = prefix[ q ]+1;
                }
                
                if ( p.charAt( q ) === s.charAt( i ) ) q++;  // next character matches
                
                if ( m === q ) return i-m+1;
            }
        }
        return -1;
    };
    
}(Pattern);