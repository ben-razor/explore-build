"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmScopeToCmToken = exports.cssTextFromTmTheme = exports.CmToken = void 0;
const LRU = require("lru-cache");
const theme_1 = require("monaco-textmate/dist/theme");
var CmToken;
(function (CmToken) {
    CmToken["Atom"] = "atom";
    CmToken["Attribute"] = "attribute";
    CmToken["Bracket"] = "bracket";
    CmToken["Builtin"] = "builtin";
    CmToken["Comment"] = "comment";
    CmToken["Def"] = "def";
    CmToken["Error"] = "error";
    CmToken["Header"] = "header";
    CmToken["HR"] = "hr";
    CmToken["Keyword"] = "keyword";
    CmToken["Link"] = "link";
    CmToken["Meta"] = "meta";
    CmToken["Number"] = "number";
    CmToken["Operator"] = "operator";
    CmToken["Property"] = "property";
    CmToken["Qualifier"] = "qualifier";
    CmToken["Quote"] = "quote";
    CmToken["String"] = "string";
    CmToken["String2"] = "string-2";
    CmToken["Tag"] = "tag";
    CmToken["Type"] = "type";
    CmToken["Variable"] = "variable";
    CmToken["Variable2"] = "variable-2";
    CmToken["Variable3"] = "variable-3";
})(CmToken = exports.CmToken || (exports.CmToken = {}));
/**
 * Generates css style rules from TM theme
 * Backwards compatible with Codemirror tokens (this theme WILL apply to traditional Codemirror modes)
 */
function cssTextFromTmTheme(rawTheme) {
    const theme = theme_1.Theme.createFromRawTheme(rawTheme);
    const cccmTokenColors = {
        [CmToken.Atom]: theme.match('constant.language')[0].foreground,
        [CmToken.Attribute]: theme.match('entity.other.attribute-name')[0].foreground,
        [CmToken.Bracket]: theme.match('punctuation.definition.tag')[0].foreground,
        [CmToken.Builtin]: theme.match('support.function')[0].foreground,
        [CmToken.Comment]: theme.match('comment')[0].foreground,
        [CmToken.Def]: theme.match('entity.name.function')[0].foreground,
        [CmToken.Error]: null,
        [CmToken.Header]: null,
        [CmToken.HR]: null,
        [CmToken.Keyword]: theme.match('keyword')[0].foreground,
        [CmToken.Link]: null,
        [CmToken.Meta]: theme.match('meta')[0].foreground,
        [CmToken.Number]: theme.match('constant.numeric')[0].foreground,
        [CmToken.Operator]: theme.match('keyword.operator')[0].foreground,
        [CmToken.Property]: theme.match('variable.other.property')[0].foreground,
        [CmToken.Qualifier]: null,
        [CmToken.Quote]: null,
        [CmToken.String]: theme.match('string')[0].foreground,
        [CmToken.String2]: theme.match('string.regexp')[0].foreground,
        [CmToken.Tag]: theme.match('entity.name.tag')[0].foreground,
        [CmToken.Type]: theme.match('storage.type')[0].foreground,
        [CmToken.Variable]: theme.match('variable.other.object')[0].foreground,
        [CmToken.Variable2]: theme.match('support.class.builtin')[0].foreground,
        [CmToken.Variable3]: null,
    };
    const { name, settings, gutterSettings } = rawTheme;
    const prefix = `.cm-s-${name}`;
    const lines = [];
    const { settings: generalSettings } = settings.find((rule) => !rule.scope) || {};
    if (generalSettings) {
        const { background, caret, foreground, lineHighlight, selection } = generalSettings;
        lines.push(`${prefix}.CodeMirror {`);
        if (background) {
            lines.push(`\tbackground: ${background};`);
        }
        if (foreground) {
            lines.push(`\tcolor: ${foreground};`);
        }
        lines.push('}');
        if (caret) {
            lines.push(`${prefix} .CodeMirror-cursor { border-left-color: ${caret}; }`);
        }
        if (lineHighlight) {
            lines.push(`${prefix} .CodeMirror-activeline-background { background: ${lineHighlight}; }`);
        }
        if (selection) {
            lines.push(`${prefix} .CodeMirror-selected { background: ${selection}; }`);
        }
    }
    if (gutterSettings) {
        const { background, divider, foreground, lineActiveBackground, lineActiveForeground } = gutterSettings;
        lines.push(`${prefix} .CodeMirror-gutters {`);
        if (background) {
            lines.push(`\tbackground: ${background};`);
        }
        if (divider) {
            lines.push(`\tborder-right-color: ${divider};`);
        }
        lines.push('}');
        if (foreground) {
            lines.push(`${prefix} .CodeMirror-linenumber { color: ${foreground}; }`);
        }
        if (lineActiveBackground) {
            lines.push(`${prefix} .CodeMirror-activeline .CodeMirror-activeline-gutter { background: ${lineActiveBackground}; }`);
        }
        if (lineActiveForeground) {
            lines.push(`${prefix} .CodeMirror-activeline .CodeMirror-linenumber { color: ${lineActiveForeground}; }`);
        }
    }
    const colorMap = theme.getColorMap();
    for (const token in cccmTokenColors) {
        const colorId = cccmTokenColors[token];
        if (colorId) {
            lines.push(`${prefix} .cm-${token} { color: ${colorMap[colorId]} }`);
        }
    }
    return lines
        .concat(...colorMap.map((color, i) => `${prefix} .cm-tm-${i} { color: ${color} }`))
        .join('\n');
}
exports.cssTextFromTmTheme = cssTextFromTmTheme;
const tmToCm = {
    comment: {
        $: CmToken.Comment,
    },
    constant: {
        // TODO: Revision
        $: CmToken.Def,
        character: {
            escape: {
                $: CmToken.String2,
            },
        },
        language: {
            $: CmToken.Atom,
        },
        numeric: {
            $: CmToken.Number,
        },
        other: {
            email: {
                link: {
                    $: CmToken.Link,
                },
            },
            symbol: {
                // TODO: Revision
                $: CmToken.Def,
            },
        },
    },
    entity: {
        name: {
            class: {
                $: CmToken.Def,
            },
            function: {
                $: CmToken.Def,
            },
            tag: {
                $: CmToken.Tag,
            },
            type: {
                $: CmToken.Type,
                class: {
                    $: CmToken.Variable,
                },
            },
        },
        other: {
            'attribute-name': {
                $: CmToken.Attribute,
            },
            'inherited-class': {
                // TODO: Revision
                $: CmToken.Def,
            },
        },
        support: {
            function: {
                // TODO: Revision
                $: CmToken.Def,
            },
        },
    },
    keyword: {
        $: CmToken.Keyword,
        operator: {
            $: CmToken.Operator,
        },
        other: {
            'special-method': CmToken.Def,
        },
    },
    punctuation: {
        $: CmToken.Operator,
        definition: {
            comment: {
                $: CmToken.Comment,
            },
            tag: {
                $: CmToken.Bracket,
            },
        },
    },
    storage: {
        $: CmToken.Keyword,
    },
    string: {
        $: CmToken.String,
        regexp: {
            $: CmToken.String2,
        },
    },
    support: {
        class: {
            $: CmToken.Def,
        },
        constant: {
            $: CmToken.Variable2,
        },
        function: {
            $: CmToken.Def,
        },
        type: {
            $: CmToken.Type,
        },
        variable: {
            $: CmToken.Variable2,
            property: {
                $: CmToken.Property,
            },
        },
    },
    variable: {
        $: CmToken.Def,
        language: {
            // TODO: Revision
            $: CmToken.Variable3,
        },
        other: {
            object: {
                $: CmToken.Variable,
                property: {
                    $: CmToken.Property,
                },
            },
            property: {
                $: CmToken.Property,
            },
        },
        parameter: {
            $: CmToken.Def,
        },
    },
};
function walk(scopeSegments, tree = tmToCm) {
    const first = scopeSegments.shift();
    const node = tree[first];
    if (node) {
        return walk(scopeSegments, node) || node.$ || null;
    }
    return null;
}
const dotRE = /\./;
const cache = new LRU({ max: 2000 });
function tmScopeToCmToken(scope) {
    if (!cache.has(scope)) {
        cache.set(scope, walk(scope.split(dotRE)));
    }
    return cache.get(scope);
}
exports.tmScopeToCmToken = tmScopeToCmToken;
//# sourceMappingURL=tmToCm.js.map