/**
*
*   Pattern.js
*   @version: 1.0.0
*
*   Pattern Matching Algorithms Tests in JavaScript
*   https://github.com/foo123/PatternMatchingAlgorithms
*
**/
!function(root, name, factory) {
"use strict";
if (('object' === typeof module) && module.exports) /* CommonJS */
    (module.$deps = module.$deps||{}) && (module.exports = module.$deps[name] = factory.call(root));
else if (('function' === typeof define) && define.amd && ('function' === typeof require) && ('function' === typeof require.specified) && require.specified(name) /*&& !require.defined(name)*/) /* AMD */
    define(name, ['module'], function(module) {factory.moduleUri = module.uri; return factory.call(root);});
else if (!(name in root)) /* Browser/WebWorker/.. */
    (root[name] = factory.call(root)||1) && ('function' === typeof(define)) && define.amd && define(function() {return root[name];});
}(/* current root */          'undefined' !== typeof self ? self : this,
  /* module name */           "Pattern",
  /* module factory */        function ModuleFactory__Pattern(undef) {
"use strict";

// http://en.wikipedia.org/wiki/String_searching_algorithm
var Pattern = {VERSION: "1.0.0"}, Matchy;

Pattern.Matchy = function(MatchyRef) {
    Matchy = MatchyRef;
};
Pattern.Matcher = function(algorithm, ref, desc) {
    this.algorithm = algorithm;
    this.reference = ref;
    this.description = desc;
};
Pattern.Matcher.prototype = {
    constructor: Pattern.Matcher,

    algorithm: null,
    reference: null,
    description: '',
    _pattern: null,
    _matcher: null,

    dispose: function() {
        this._pattern = null;
        this._matcher = null;
        return this;
    },

    pattern: function(pattern) {
        this._pattern = pattern || null;
        this._matcher = this._pattern ? ("function" === typeof this.algorithm ? this.algorithm.bind(this) : (new Matchy())[this.algorithm](this._pattern)) : null;
        return this;
    },

    match: function(string, offset) {
        return this._matcher(string, offset || 0);
    }
};

// included algorithms
Pattern.NaiveMatcher = new Pattern.Matcher(function naive_matcher(s, o) {
    var p = this._pattern, n = s.length, m = p.length, i;
    if (arguments.length < 2) o = 0;
    if (o < 0) o += n;
    if ((0 < n) && (0 < m) && (n >= o+m))
    {
        n = n-m+1;
        for (i=o; i<n; ++i)
        {
            if (s.slice(i, i+m) === p) return i;
        }
    }
    return -1;
},
'https://en.wikipedia.org/wiki/String_searching_algorithm',
"This is a &quot;<i>naive</i>&quot; string search algorithm, in that it tests each succesive position of the input text to see if the pattern matches and does not exploit information about the pattern or the text in order to speed up the search."
);
Pattern.FSAMatcher = new Pattern.Matcher(
'fsa',
'https://en.wikipedia.org/wiki/Finite-state_machine',
"The Finite State Automaton matcher (or FSA matcher) searches a text for a pattern, by creating a deterministic finite automaton (DFA) which is then used to parse the text. The FSA method is also used for matching a regular expression pattern."
);
Pattern.RabinKarpMatcher = new Pattern.Matcher(
'rabinkarp',
'https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm',
"The Rabin–Karp algorithm is a string searching algorithm  that uses &quot;<i>hashing</i>&quot; to find any one of a set of pattern strings in a text. For text of length n and p patterns of combined length m, its average and best case running time is O(n+m) in space O(p), but its worst-case time is O(nm)."
);
Pattern.KnuthMorrisPrattMatcher = new Pattern.Matcher(
'knuthmorrispratt',
'https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm',
"The Knuth–Morris–Pratt algorithm (or KMP algorithm) searches for occurrences of a word W within a main text string S by exploiting the observation that when a mismatch occurs, the word itself contains sufficient information to determine where the next match could begin, thus bypassing re-examination of previously matched characters."
);
Pattern.BoyerMooreMatcher = new Pattern.Matcher(
'boyermoore',
'https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string-search_algorithm',
"The Boyer-Moore algorithm uses information gathered during the preprocess step to skip sections of the text, resulting in a lower constant factor than many other string algorithms. In general, the algorithm runs faster as the pattern length increases. The key feature of the algorithm is to match on the tail of the pattern rather than the head, and to skip along the text in jumps of multiple characters rather than searching every single character in the text."
);
Pattern.TwoWayMatcher = new Pattern.Matcher(
'twoway',
'https://en.wikipedia.org/wiki/Two-way_string-matching_algorithm',
"The two-way algorithm can be viewed as a combination of the forward-going Knuth–Morris–Pratt algorithm (KMP) and the backward-running Boyer–Moore string-search algorithm (BM). Like those two, the 2-way algorithm preprocesses the pattern to find partially repeating periods and computes <i>shifts</i> based on them, indicating what offset to <i>jump</i> to in the searched text when a given character is encountered."
);
Pattern.CommentzWalterMatcher = new Pattern.Matcher(
'commentzwalter',
'https://en.wikipedia.org/wiki/Commentz-Walter_algorithm',
"TODO"
);
Pattern.BaezaYatesGonnetMatcher = new Pattern.Matcher(
'baezayatesgonnet',
'https://en.wikipedia.org/wiki/Bitap_algorithm',
"TODO"
);
Pattern.AhoCorasickMatcher = new Pattern.Matcher(
'ahocorasick',
'https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm',
"TODO"
);

// export it
return Pattern;
});
