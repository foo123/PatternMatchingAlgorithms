!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  Rabin-Karp Matcher
    //  http://citeseerx.ist.psu.edu/viewdoc/download;jsessionid=BA184C94C16CB23D5FA7329E257E3713?doi=10.1.1.86.9502&rep=rep1&type=pdf
    //  http://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm
    //
    
    var pow = Math.pow,
        alphabet_index = Pattern.utils.alphabet_index,
        D = Pattern.ALPHABET.length, // typically the length of the alphabet |S|, here only ASCII alphabet assumed
        Q = 3989 // prime number so that 10*Q can fit in one WORD (i.e 2^16 bits)
    ;
    
    Pattern.RabinKarpMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.RabinKarpMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.RabinKarpMatcher.prototype.reference = 'http://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm';
    Pattern.RabinKarpMatcher.prototype.description = "The Rabin–Karp algorithm is a string searching algorithm  that uses &quot;<i>hashing</i>&quot; to find any one of a set of pattern strings in a text. For text of length n and p patterns of combined length m, its average and best case running time is O(n+m) in space O(p), but its worst-case time is O(nm).";
    Pattern.RabinKarpMatcher.prototype.match = function( s, offset ) {
        var p = this._pattern, n = s.length, m = p.length, 
            h, pq, sq, i
        ;
        
        if ( arguments.length < 2 ) offset = 0;
        if ( offset < 0 ) offset += n;
        if ( n > 0 && m > 0 && n >= offset+m )
        {
            h = pow(D, m-1) % Q;
            pq = 0; sq = 0;
            
            // pre-processing
            for (i=0; i<m; i++)
            {
                pq = ( pq*D + alphabet_index(p.charAt( i )) ) % Q;
                sq = ( sq*D + alphabet_index(s.charAt( offset+i )) ) % Q;
            }
            
            // matching
            n = n-m;
            for (i=offset; i<=n; i++)
            {
                // pq, sq, D-base arithmetic code, used as a quick "hash" test
                // worst case: many hash collisions -> "naive" matching
                if ( pq === sq ) 
                {
                    if ( s.slice(i, i+m) === p ) return i;
                }
                // update text hash for next char using Horner algorithm
                if ( i < n ) 
                {
                    sq = ( D*(sq - h*alphabet_index(s.charAt(i))) + alphabet_index(s.charAt(i+m)) ) % Q;
                    if ( sq < 0 ) sq += Q;
                }
            }
        }
        return -1;
    };
    
}(Pattern);