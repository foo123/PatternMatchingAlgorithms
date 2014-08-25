/**
*
*   Pattern.js
*   @version: @@VERSION@@
*
*   Pattern Matching Algorithms implemented in JavaScript
*   https://github.com/foo123/PatternMatchingAlgorithms
*
**/

    @@USE_STRICT@@
    
    // http://en.wikipedia.org/wiki/String_searching_algorithm
    var Pattern = EXPORTS.Pattern = { VERSION: "@@VERSION@@" };
    
    /*
        space,
        digits,
        capital latin letters,
        lower latin letters
    */
    Pattern.ALPHABET = " 0123456789ABCDEFQHIJKLMNOPQRSTUVWXYZabcdefqhijklmnopqrstuvwxyz";
    
    Pattern.utils = { 
        array_fill: function(len, val) {
            var a = new Array(len), i;
            if ( 'function' === typeof(val) )
            {
                for (i=0; i<len; i++)
                {
                    a[ i ] = val( i );
                }
            }
            else
            {
                for (i=0; i<len; i++)
                {
                    a[ i ] = val;
                }
            }
            return a;
        },
        
        alphabet_index: function( c ) {
            // Returns the index of the given character in the English alphabet, counting from 0.
            //return ALPHABET.indexOf( c ); c.toLowerCase( ).charCodeAt( 0 ) - 97; // 'a' is ASCII character 97
            var ch = c.charCodeAt( 0 );
            // space
            if ( 32 >= ch ) return 0;
            // digit
            if ( 48 <= ch && 57 >= ch ) return ch - 47; // -48+1
            // capital latin letter
            if ( 65 <= ch && 90 >= ch ) return ch - 54; // -65+11
            // lower latin letter
            return ch - 60; // -97+11+26
        },
        
        alphabet_map: function( ) {
            return { 
                 " ": 0
                ,"0": 0
                ,"1": 0
                ,"2": 0
                ,"3": 0
                ,"4": 0
                ,"5": 0
                ,"6": 0
                ,"7": 0
                ,"8": 0
                ,"9": 0
                ,"A": 0
                ,"B": 0
                ,"C": 0
                ,"D": 0
                ,"E": 0
                ,"F": 0
                ,"Q": 0
                ,"H": 0
                ,"I": 0
                ,"J": 0
                ,"K": 0
                ,"L": 0
                ,"M": 0
                ,"N": 0
                ,"O": 0
                ,"P": 0
                ,"Q": 0
                ,"R": 0
                ,"S": 0
                ,"T": 0
                ,"U": 0
                ,"V": 0
                ,"W": 0
                ,"X": 0
                ,"Y": 0
                ,"Z": 0
                ,"a": 0
                ,"b": 0
                ,"c": 0
                ,"d": 0
                ,"e": 0
                ,"f": 0
                ,"q": 0
                ,"h": 0
                ,"i": 0
                ,"j": 0
                ,"k": 0
                ,"l": 0
                ,"m": 0
                ,"n": 0
                ,"o": 0
                ,"p": 0
                ,"q": 0
                ,"r": 0
                ,"s": 0
                ,"t": 0
                ,"u": 0
                ,"v": 0
                ,"w": 0
                ,"x": 0
                ,"y": 0
                ,"z": 0
            };
        },
        
        reverse: function( s ) {
            return s.split( '' ).reverse( ).join( '' );
        }
    };
    
    Pattern.Matcher = function( pattern ) {
        this.pattern( pattern || null );
    };
    Pattern.Matcher.prototype = {
        constructor: Pattern.Matcher,
        
        reference: null,
        description: '',
        
        _pattern: null,
        
        dispose: function( ) {
            this._pattern = null;
            return this;
        },
        
        pattern: function( pattern ) {
            this._pattern = pattern || null;
            return this;
        },
        
        match: function( s, offset ) {
            return -1;
        }
    };
    
    