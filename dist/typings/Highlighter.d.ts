import { IGrammar, IRawGrammar, IToken, StackElement } from 'monaco-textmate';
import { ITextmateThemePlus } from '.';
export declare type IRawGrammarSource = IRawGrammar | Promise<IRawGrammar> | ((scopeName: string) => IRawGrammar | Promise<IRawGrammar>);
export interface IHighlighterState {
    ruleStack: StackElement;
    tokensCache: IToken[];
}
declare class Highlighter {
    static addGrammar(scopeName: string, grammar: IRawGrammarSource): void;
    /**
     * Inject grammars
     * @param scopeName Scope name to inject
     * @param injectInto List of host scope names who will suffer the injection
     */
    static linkInjections(scopeName: string, injectInto: string[]): string[];
    /**
     * Uninject grammars
     * @param scopeName Previously injected scope name to uninject
     * @param injections If provided injected scope name will be uninjected only from this list of host scope names, otherwise will be uninjected from all
     */
    static unlinkInjections(scopeName: string, injections?: string[]): string[];
    static activateLanguage(scopeName: string, languageId: string, load?: 'now' | 'asap' | 'defer'): Promise<boolean>;
    static loadLanguage(languageId: string): Promise<IGrammar>;
    static hasLanguageRegistered(languageId: string): boolean;
    private static scopeNameToInjections;
    private static scopeNameToRawGrammars;
    private static scopeNameToLanguageId;
    private static languageIdToScopeName;
    private static registry;
    private static initRegistry;
    private rawTheme;
    private theme;
    private cachedCssText;
    constructor(theme?: ITextmateThemePlus);
    get cssText(): string;
    getTokenizer(languageId: string): Promise<(stream: CodeMirror.StringStream, state: IHighlighterState) => string>;
    private tmScopeToCmToken;
    private tmScopeToTmThemeToken;
}
export { Highlighter };
