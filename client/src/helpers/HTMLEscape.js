export function escape(string) {
    return new DOMParser().parseFromString(string,'text/html').querySelector('html').textContent;
}
