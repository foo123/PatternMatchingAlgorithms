!function(Pattern, undef){

    @@USE_STRICT@@
    
    //
    //  Boyer-Moore Matcher
    //  http://www.cs.utexas.edu/~moore/publications/fstrpos.pdf
    //  http://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm
    //
    
    var max = Math.max, 
        array_fill = Pattern.utils.array_fill, 
        reverse = Pattern.utils.reverse,
        alphabet_index = Pattern.utils.alphabet_index,
        ALPHABET = Pattern.ALPHABET,
        ALPHABET_LEN = ALPHABET.length
    ;
    
    function match_length( s, idx1, idx2 )
    {
        // Returns the length of the match of the substrings of S beginning at idx1 and idx2.
        var sl = s.length, match_count;
        
        if ( idx1 === idx2 )
        {
            return sl - idx1;
        }
        
        match_count = 0;
        while ( idx1 < sl && idx2 < sl && s.charAt( idx1 ) === s.charAt( idx2 ) )
        {
            match_count++;
            idx1++;
            idx2++;
        }
        return match_count;
    }
 
    function fundamental_preprocess( s )
    {
        // Returns Z, the Fundamental Preprocessing of S. Z[i] is the length of the substring 
        // beginning at i which is also a prefix of S. This pre-processing is done in O(n) time,
        // where n is the length of S.
        
        var sl = s.length, i, z, l, r, a, b, k;
        
        if ( 0 === sl ) // Handles case of empty string
        {
            return [ ];
        }
        if ( 1 === sl ) // Handles case of single-character string
        {
            return [ 1 ];
        }
        
        z = array_fill( sl, 0 );
        
        z[ 0 ] = sl;
        z[ 1 ] = match_length(s, 0, 1);
        for (i=2; i<1+z[1]; i++) // Optimization from exercise 1-5
        {
            z[ i ] = z[ 1 ]-i+1;
        }
        // Defines lower and upper limits of z-box
        l = 0;
        r = 0;
        for (i=2+z[1]; i<sl; i++)
        {
            if (i <= r) // i falls within existing z-box
            {
                k = i-l;
                b = z[ k ];
                a = r-i+1;
                if (b < a) // b ends within existing z-box
                {
                    z[ i ] = b;
                }
                else // b ends at or after the end of the z-box, we need to do an explicit match to the right of the z-box
                {
                    z[ i ] = b+match_length(s, a, r+1);
                    l = i;
                    r = i+z[ i ]-1;
                }
            }
            else // i does not reside within existing z-box
            {
                z[ i ] = match_length(s, 0, i);
                if ( z[ i ] > 0 )
                {
                    l = i;
                    r = i+z[ i ]-1;
                }
            }
        }
        return z;
    }
 
    function bad_character_table( s )
    {
        // Generates R for S, which is an array indexed by the position of some character c in the 
        // English alphabet. At that index in R is an array of length |S|+1, specifying for each
        // index i in S (plus the index after S) the next location of character c encountered when
        // traversing S from right to left starting at i. This is used for a constant-time lookup
        // for the bad character rule in the Boyer-Moore string search algorithm, although it has
        // a much larger size than non-constant-time solutions.
        
        var sl = s.length, c, i, j, R, alpha;
        
        if (0 === sl)
        {
            return array_fill(ALPHABET_LEN, function( ){ return [ ]; });
        }
        
        R = array_fill(ALPHABET_LEN, function( ){ return [ -1 ]; });
        alpha = array_fill(ALPHABET_LEN, function( ){ return -1 ; });
        
        for (i=0; i<sl; i++)
        {
            c = s.charAt( i );
            alpha[ alphabet_index( c ) ] = i;
            for (j=0; j<alpha.length; j++)
            {
                R[ j ].push( alpha[ j ] );
            }
        }
        return R;
    }
 
    function good_suffix_table( s )
    {
        // Generates L for S, an array used in the implementation of the strong good suffix rule.
        // L[i] = k, the largest position in S such that S[i:] (the suffix of S starting at i) matches
        // a suffix of S[:k] (a substring in S ending at k). Used in Boyer-Moore, L gives an amount to
        // shift P relative to T such that no instances of P in T are skipped and a suffix of P[:L[i]]
        // matches the substring of T matched by a suffix of P in the previous match attempt.
        // Specifically, if the mismatch took place at position i-1 in P, the shift magnitude is given
        // by the equation len(P) - L[i]. In the case that L[i] = -1, the full shift table is used.
        // Since only proper suffixes matter, L[0] = -1.
        var sl = s.length, i, j, L, N;
        
        L = array_fill( sl, -1 );
        N = fundamental_preprocess( reverse( s ) ).reverse( ); // S[::-1] reverses S
        for (j=0; j<sl/*-1*/; j++)
        {
            i = sl - N[ j ];
            if (i !== sl)
            {
                L[ i ] = j;
            }
        }
        return L;
    }
 
    function full_shift_table( s )
    {
        // Generates F for S, an array used in a special case of the good suffix rule in the Boyer-Moore
        // string search algorithm. F[i] is the length of the longest suffix of S[i:] that is also a
        // prefix of S. In the cases it is used, the shift magnitude of the pattern P relative to the
        // text T is len(P) - F[i] for a mismatch occurring at i-1.
        var sl = s.length, F, Z, longest, i, zv, zl;
        
        F = array_fill( sl, 0 );
        Z = fundamental_preprocess( s );
        zl = Z.length;
        longest = 0
        for (i=0; i<zl; i++) //zv in enumerate(reversed(Z)):
        {
            zv = Z[ zl-1-i ];
            if ( i+1 === zv ) longest = max( zv, longest );
            F[ sl-1-i ] = longest;
        }
        return F;
    }
 
    Pattern.BoyerMooreMatcher = function( pattern ) {
        Pattern.Matcher.call(this, pattern);
    };
    Pattern.BoyerMooreMatcher.prototype = Object.create( Pattern.Matcher.prototype );
    Pattern.BoyerMooreMatcher.prototype._L = null;
    Pattern.BoyerMooreMatcher.prototype._R = null;
    Pattern.BoyerMooreMatcher.prototype._F = null;
    Pattern.BoyerMooreMatcher.prototype.reference = 'http://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm';
    Pattern.BoyerMooreMatcher.prototype.description = "The Boyer-Moore algorithm uses information gathered during the preprocess step to skip sections of the text, resulting in a lower constant factor than many other string algorithms. In general, the algorithm runs faster as the pattern length increases. The key feature of the algorithm is to match on the tail of the pattern rather than the head, and to skip along the text in jumps of multiple characters rather than searching every single character in the text."
    Pattern.BoyerMooreMatcher.prototype.dispose = function( ) {
        this._pattern = null;
        this._L = null;
        this._R = null;
        this._F = null;
        return this;
    };
    Pattern.BoyerMooreMatcher.prototype.pattern = function( pattern ) {
        this._pattern = pattern || null;
        if ( this._pattern )
        {
            this._R = bad_character_table( this._pattern );
            this._L = good_suffix_table( this._pattern );
            this._F = full_shift_table( this._pattern );
        }
        else
        {
            this._L = null;
            this._R = null;
            this._F = null;
        }
        return this;
    };
    Pattern.BoyerMooreMatcher.prototype.match = function( s, offset ) {
        // Implementation of the Boyer-Moore string search algorithm. This finds all occurrences of P
        // in T, and incorporates numerous ways of pre-processing the pattern to determine the optimal 
        // amount to shift the string and skip comparisons. In practice it runs in O(m) (and even 
        // sublinear) time, where m is the length of T. This implementation performs a case-insensitive
        // search on ASCII alphabetic characters, spaces not included.
        
        var p = this._pattern, m = p.length, n = s.length,
            R = this._R, L = this._L, F = this._F,
            k, previous_k, i, h, 
            char_shift, suffix_shift, shift
        ;
        
        if ( arguments.length < 2 ) offset = 0;
        if ( offset < 0 ) offset += n;
        if ( n > 0 && m > 0 && n >= offset+m )
        {
            //matches = []
         
            k = offset + m - 1;      // Represents alignment of end of P relative to T
            previous_k = offset -1;     // Represents alignment in previous phase (Galil's rule)
            while ( k < n )
            {
                i = m - 1;  // Character to compare in P
                h = k;           // Character to compare in T
                while (i >= 0 && h > previous_k && p.charAt(i) === s.charAt(h))   // Matches starting from end of P
                {
                    i--;
                    h--;
                }
                if (-1 === i || h === previous_k)  // Match has been found (Galil's rule)
                {
                    return k - m + 1;
                    //matches.append(k - len(P) + 1)
                    //k += len(P)-F[1] if len(P) > 1 else 1
                }
                else   // No match, shift by max of bad character and good suffix rules
                {
                    char_shift = i - R[ alphabet_index( s.charAt( h ) ) ][ i ];
                    if (i+1 === m)   // Mismatch happened on first attempt
                    {
                        suffix_shift = 1;
                    }
                    else if (-1 === L[i+1])   // Matched suffix does not appear anywhere in P
                    {
                        suffix_shift = m - F[i+1];
                    }
                    else               // Matched suffix appears in P
                    {
                        suffix_shift = m - L[i+1];
                    }
                    shift = max( char_shift, suffix_shift );
                    if ( shift >= i+1 ) previous_k = k;  // Galil's rule
                    k += shift;
                }
            }
        }
        return -1;
    };
    
}(Pattern);