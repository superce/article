const cnchars = require('simplebig');
export async function translate(html: string) {
    const result = cnchars.s2t(html);
    return result
}