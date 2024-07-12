export class UtilGeneric {

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
      }
      replaceAll(str, match, replacement) {
        return str.replace(
          new RegExp(this.escapeRegExp(match), "g"),
          () => replacement
        );
      }
}