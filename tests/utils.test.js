import {describe, it, expect} from "vitest";
import {stripMarkdownFromString} from "../js/utils";


describe('stripMarkdown', () => {
    it('should remove all markdown from given text', () => {
        const testMsg = '**This is bold.**'
        const strippedMessage = stripMarkdownFromString(testMsg)
        expect(strippedMessage).toBe('This is bold.')
    });

    it('should remove headers', () => {
        const testMessageWithHeader = '# Header\n## Subheader\n### Third level'
        const strippedMessage = stripMarkdownFromString(testMessageWithHeader)
        expect(strippedMessage).toBe('Header\nSubheader\nThird level')
    });

    it('should remove italic formatting with asterisks', () => {
        const testMessageWithItalic = '*This is italic*'
        const strippedMessage = stripMarkdownFromString(testMessageWithItalic)
        expect(strippedMessage).toBe('This is italic')
    });

    it('should remove italic formatting with underscores', () => {
        const testMessageWithItalic = '_This is italic_'
        const strippedMessage = stripMarkdownFromString(testMessageWithItalic)
        expect(strippedMessage).toBe('This is italic')
    });

    it('should remove bold formatting with underscores', () => {
        const testMessageWithBold = '__This is bold__'
        const strippedMessage = stripMarkdownFromString(testMessageWithBold)
        expect(strippedMessage).toBe('This is bold')
    });

    it('should remove strikethrough formatting', () => {
        const testMessageWithStrikethrough = '~~This is crossed out~~'
        const strippedMessage = stripMarkdownFromString(testMessageWithStrikethrough)
        expect(strippedMessage).toBe('This is crossed out')
    });

    it('should remove inline code formatting', () => {
        const testMessageWithCode = 'This is `inline code` here'
        const strippedMessage = stripMarkdownFromString(testMessageWithCode)
        expect(strippedMessage).toBe('This is inline code here')
    });

    it('should remove links and keep link text', () => {
        const testMessageWithLink = 'Check out [this link](https://example.com)'
        const strippedMessage = stripMarkdownFromString(testMessageWithLink)
        expect(strippedMessage).toBe('Check out this link')
    });

    it('should handle multiple markdown formats in one string', () => {
        const testMessageWithMultipleFormats = '# Header\n**Bold** and *italic* with [a link](https://example.com)'
        const strippedMessage = stripMarkdownFromString(testMessageWithMultipleFormats)
        expect(strippedMessage).toBe('Header\nBold and italic with a link')
    });
})