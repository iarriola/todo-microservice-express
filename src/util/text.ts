export class TextUtil {
    cleanQuery(str: string) : string {
        return str.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ').trim();
    }
}

const textUtil = new TextUtil();
export default textUtil;
