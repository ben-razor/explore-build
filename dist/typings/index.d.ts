import { IRawTheme } from 'monaco-textmate';
import { Highlighter } from './Highlighter';
export interface ITextmateThemePlus extends IRawTheme {
    gutterSettings?: {
        background?: string;
        divider?: string;
        foreground?: string;
        lineActiveBackground?: string;
        lineActiveForeground?: string;
    };
}
export declare const addGrammar: typeof Highlighter.addGrammar;
export declare const activateLanguage: typeof Highlighter.activateLanguage;
/**
 * Inject grammars into grammars
 * Returns an array of language ID's that were udpated
 *
 * @param scopeName Scope name that needs to be injected into other grammars
 * @param injectInto List of host scope names
 */
export declare function linkInjections(scopeName: string, injectInto: string[]): Promise<string[]>;
/**
 * Uninject grammars out of grammars
 * Returns an array of language ID's that were udpated
 *
 * @param scopeName Scope name that needs to be uninjected out of other grammars
 * @param unInjectFrom  If provided, scope name will be uninjected only from this list of host scope names, otherwise will be uninjected from all
 */
export declare function unlinkInjections(scopeName: string, unInjectFrom: string[]): Promise<string[]>;
export declare const themedHighlighters: Map<string, Highlighter>;
/**
 * Add a Textmate theme to CodeMirror
 *
 * @param theme Theme object
 */
export declare function addTheme(theme: ITextmateThemePlus): void;
