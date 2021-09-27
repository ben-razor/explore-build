import { ITextmateThemePlus } from '.';
export declare enum CmToken {
    Atom = "atom",
    Attribute = "attribute",
    Bracket = "bracket",
    Builtin = "builtin",
    Comment = "comment",
    Def = "def",
    Error = "error",
    Header = "header",
    HR = "hr",
    Keyword = "keyword",
    Link = "link",
    Meta = "meta",
    Number = "number",
    Operator = "operator",
    Property = "property",
    Qualifier = "qualifier",
    Quote = "quote",
    String = "string",
    String2 = "string-2",
    Tag = "tag",
    Type = "type",
    Variable = "variable",
    Variable2 = "variable-2",
    Variable3 = "variable-3"
}
/**
 * Generates css style rules from TM theme
 * Backwards compatible with Codemirror tokens (this theme WILL apply to traditional Codemirror modes)
 */
export declare function cssTextFromTmTheme(rawTheme: ITextmateThemePlus): string;
export declare function tmScopeToCmToken(scope: string): CmToken;
