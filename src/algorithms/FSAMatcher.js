!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  Finite State Automaton (FSA) Matcher
    //  http://en.wikipedia.org/wiki/Finite-state_machine
    //  http://en.wikipedia.org/wiki/String_searching_algorithm
    //
    
    var min = Math.min, array_fill = Pattern.utils.array_fill,
        alphabet_map = Pattern.utils.alphabet_map,
        ALPHABET = Pattern.ALPHABET,
        ALPHABET_LEN = ALPHABET.length
    ;
    
    function isSuffix( s1, s2 )
    {
        return s1 === s2.slice( -s1.length );
    }
    
    function computeTransitionMatrix( p )
    {
        var m = p.length, q, a, aa, k, delta;
        
        delta = array_fill( m, alphabet_map );
        
        for (q=0; q<m; q++)
        {
            for (a=0; a<ALPHABET_LEN; a++)
            {
                k = min(m, q+1);
                aa = ALPHABET.charAt( a );
                while ( k > 0 && !isSuffix(p.slice(0, k), p.slice(0, q)+aa) ) k--;
                delta[ q ][ aa ] = k;
            }
        }
        return delta;
    }
    
    Pattern.FSAMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.FSAMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.FSAMatcher.prototype.reference = 'http://en.wikipedia.org/wiki/Finite-state_machine';
    Pattern.FSAMatcher.prototype.description = "The Finite State Automaton matcher (or FSA matcher) searches a text for a pattern, by creating a deterministic finite automaton (DFA) which is then used to parse the text. The FSA method is also used for matching a regular expression pattern."
    Pattern.FSAMatcher.prototype._delta = null;
    Pattern.FSAMatcher.prototype.dispose = function( ) {
        this._pattern = null;
        this._delta = null;
        return this;
    };
    Pattern.FSAMatcher.prototype.pattern = function( pattern ) {
        this._pattern = pattern || null;
        if ( this._pattern )
        {
            this._delta = computeTransitionMatrix( this._pattern );
        }
        else
        {
            this._delta = null;
        }
        return this;
    };
    Pattern.FSAMatcher.prototype.match = function( s, offset ) {
        var p = this._pattern, delta = this._delta, 
            n = s.length, m = p.length, q, i;
        
        if ( arguments.length < 2 ) offset = 0;
        if ( offset < 0 ) offset += n;
        if ( n > 0 && m > 0 && n >= offset+m )
        {
            q = 0;
            for (i=offset; i<n; i++)
            {
                q = delta[ q ][ s.charAt( i ) ];
                if ( m === q ) return i-m+1;
            }
        }
        return -1;
    };
    
}(Pattern);