// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const main = {
    ARROW_UP: "↑",
    ARROW_DOWN: "↓",
    ARROW_LEFT: "←",
    ARROW_RIGHT: "→",
    ARROW_UP_LEFT: "↖",
    ARROW_UP_RIGHT: "↗",
    ARROW_DOWN_RIGHT: "↘",
    ARROW_DOWN_LEFT: "↙",
    RADIO_ON: "◉",
    RADIO_OFF: "◯",
    TICK: "✔",
    CROSS: "✘",
    ELLIPSIS: "…",
    POINTER_SMALL: "›",
    LINE: "─",
    POINTER: "❯",
    INFO: "ℹ",
    TAB_LEFT: "⇤",
    TAB_RIGHT: "⇥",
    ESCAPE: "⎋",
    BACKSPACE: "⌫",
    PAGE_UP: "⇞",
    PAGE_DOWN: "⇟",
    ENTER: "↵",
    SEARCH: "⌕"
};
const win = {
    ...main,
    RADIO_ON: "(*)",
    RADIO_OFF: "( )",
    TICK: "√",
    CROSS: "×",
    POINTER_SMALL: "»"
};
const Figures = Deno.build.os === "windows" ? win : main;
const keyMap = {
    up: "ARROW_UP",
    down: "ARROW_DOWN",
    left: "ARROW_LEFT",
    right: "ARROW_RIGHT",
    pageup: "PAGE_UP",
    pagedown: "PAGE_DOWN",
    tab: "TAB_RIGHT",
    enter: "ENTER",
    return: "ENTER"
};
function getFiguresByKeys(keys) {
    const figures = [];
    for (const key of keys){
        const figure = Figures[keyMap[key]] ?? key;
        if (!figures.includes(figure)) {
            figures.push(figure);
        }
    }
    return figures;
}
export { Figures as Figures };
export { getFiguresByKeys as getFiguresByKeys };
const base64abc = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "/"
];
function encode(data) {
    const uint8 = typeof data === "string" ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data);
    let result = "", i;
    const l = uint8.length;
    for(i = 2; i < l; i += 3){
        result += base64abc[uint8[i - 2] >> 2];
        result += base64abc[(uint8[i - 2] & 0x03) << 4 | uint8[i - 1] >> 4];
        result += base64abc[(uint8[i - 1] & 0x0f) << 2 | uint8[i] >> 6];
        result += base64abc[uint8[i] & 0x3f];
    }
    if (i === l + 1) {
        result += base64abc[uint8[i - 2] >> 2];
        result += base64abc[(uint8[i - 2] & 0x03) << 4];
        result += "==";
    }
    if (i === l) {
        result += base64abc[uint8[i - 2] >> 2];
        result += base64abc[(uint8[i - 2] & 0x03) << 4 | uint8[i - 1] >> 4];
        result += base64abc[(uint8[i - 1] & 0x0f) << 2];
        result += "=";
    }
    return result;
}
const ESC = "\x1B";
const CSI = `${ESC}[`;
const OSC = `${ESC}]`;
const SEP = ";";
const bel = "\u0007";
const cursorPosition = `${CSI}6n`;
function cursorTo(x, y) {
    if (typeof y !== "number") {
        return `${CSI}${x}G`;
    }
    return `${CSI}${y};${x}H`;
}
function cursorMove(x, y) {
    let ret = "";
    if (x < 0) {
        ret += `${CSI}${-x}D`;
    } else if (x > 0) {
        ret += `${CSI}${x}C`;
    }
    if (y < 0) {
        ret += `${CSI}${-y}A`;
    } else if (y > 0) {
        ret += `${CSI}${y}B`;
    }
    return ret;
}
function cursorUp(count = 1) {
    return `${CSI}${count}A`;
}
function cursorDown(count = 1) {
    return `${CSI}${count}B`;
}
function cursorForward(count = 1) {
    return `${CSI}${count}C`;
}
function cursorBackward(count = 1) {
    return `${CSI}${count}D`;
}
function cursorNextLine(count = 1) {
    return `${CSI}E`.repeat(count);
}
function cursorPrevLine(count = 1) {
    return `${CSI}F`.repeat(count);
}
const cursorLeft = `${CSI}G`;
const cursorHide = `${CSI}?25l`;
const cursorShow = `${CSI}?25h`;
const cursorSave = `${ESC}7`;
const cursorRestore = `${ESC}8`;
function scrollUp(count = 1) {
    return `${CSI}S`.repeat(count);
}
function scrollDown(count = 1) {
    return `${CSI}T`.repeat(count);
}
const eraseScreen = `${CSI}2J`;
function eraseUp(count = 1) {
    return `${CSI}1J`.repeat(count);
}
function eraseDown(count = 1) {
    return `${CSI}0J`.repeat(count);
}
const eraseLine = `${CSI}2K`;
const eraseLineEnd = `${CSI}0K`;
const eraseLineStart = `${CSI}1K`;
function eraseLines(count) {
    let clear = "";
    for(let i = 0; i < count; i++){
        clear += eraseLine + (i < count - 1 ? cursorUp() : "");
    }
    clear += cursorLeft;
    return clear;
}
const clearScreen = "\u001Bc";
const clearTerminal = Deno.build.os === "windows" ? `${eraseScreen}${CSI}0f` : `${eraseScreen}${CSI}3J${CSI}H`;
function link(text, url) {
    return [
        OSC,
        "8",
        SEP,
        SEP,
        url,
        bel,
        text,
        OSC,
        "8",
        SEP,
        SEP,
        bel
    ].join("");
}
function image(buffer, options) {
    let ret = `${OSC}1337;File=inline=1`;
    if (options?.width) {
        ret += `;width=${options.width}`;
    }
    if (options?.height) {
        ret += `;height=${options.height}`;
    }
    if (options?.preserveAspectRatio === false) {
        ret += ";preserveAspectRatio=0";
    }
    return ret + ":" + encode(buffer) + bel;
}
const mod = {
    bel: bel,
    cursorPosition: cursorPosition,
    cursorTo: cursorTo,
    cursorMove: cursorMove,
    cursorUp: cursorUp,
    cursorDown: cursorDown,
    cursorForward: cursorForward,
    cursorBackward: cursorBackward,
    cursorNextLine: cursorNextLine,
    cursorPrevLine: cursorPrevLine,
    cursorLeft: cursorLeft,
    cursorHide: cursorHide,
    cursorShow: cursorShow,
    cursorSave: cursorSave,
    cursorRestore: cursorRestore,
    scrollUp: scrollUp,
    scrollDown: scrollDown,
    eraseScreen: eraseScreen,
    eraseUp: eraseUp,
    eraseDown: eraseDown,
    eraseLine: eraseLine,
    eraseLineEnd: eraseLineEnd,
    eraseLineStart: eraseLineStart,
    eraseLines: eraseLines,
    clearScreen: clearScreen,
    clearTerminal: clearTerminal,
    link: link,
    image: image
};
function getCursorPosition({ stdin =Deno.stdin , stdout =Deno.stdout  } = {}) {
    const data = new Uint8Array(8);
    Deno.stdin.setRaw(true);
    stdout.writeSync(new TextEncoder().encode(cursorPosition));
    stdin.readSync(data);
    Deno.stdin.setRaw(false);
    const [y, x] = new TextDecoder().decode(data).match(/\[(\d+);(\d+)R/)?.slice(1, 3).map(Number) ?? [
        0,
        0
    ];
    return {
        x,
        y
    };
}
const tty = factory();
function factory(options) {
    let result = "";
    let stack = [];
    const stdout = options?.stdout ?? Deno.stdout;
    const stdin = options?.stdin ?? Deno.stdin;
    const tty = function(...args) {
        if (this) {
            update(args);
            stdout.writeSync(new TextEncoder().encode(result));
            return this;
        }
        return factory(args[0] ?? options);
    };
    tty.text = function(text) {
        stack.push([
            text,
            []
        ]);
        update();
        stdout.writeSync(new TextEncoder().encode(result));
        return this;
    };
    tty.getCursorPosition = ()=>getCursorPosition({
            stdout,
            stdin
        });
    const methodList = Object.entries(mod);
    for (const [name, method] of methodList){
        if (name === "cursorPosition") {
            continue;
        }
        Object.defineProperty(tty, name, {
            get () {
                stack.push([
                    method,
                    []
                ]);
                return this;
            }
        });
    }
    return tty;
    function update(args) {
        if (!stack.length) {
            return;
        }
        if (args) {
            stack[stack.length - 1][1] = args;
        }
        result = stack.reduce((prev, [cur, args])=>prev + (typeof cur === "string" ? cur : cur.call(tty, ...args)), "");
        stack = [];
    }
}
const KeyMap = {
    "[P": "f1",
    "[Q": "f2",
    "[R": "f3",
    "[S": "f4",
    "OP": "f1",
    "OQ": "f2",
    "OR": "f3",
    "OS": "f4",
    "[11~": "f1",
    "[12~": "f2",
    "[13~": "f3",
    "[14~": "f4",
    "[[A": "f1",
    "[[B": "f2",
    "[[C": "f3",
    "[[D": "f4",
    "[[E": "f5",
    "[15~": "f5",
    "[17~": "f6",
    "[18~": "f7",
    "[19~": "f8",
    "[20~": "f9",
    "[21~": "f10",
    "[23~": "f11",
    "[24~": "f12",
    "[A": "up",
    "[B": "down",
    "[C": "right",
    "[D": "left",
    "[E": "clear",
    "[F": "end",
    "[H": "home",
    "OA": "up",
    "OB": "down",
    "OC": "right",
    "OD": "left",
    "OE": "clear",
    "OF": "end",
    "OH": "home",
    "[1~": "home",
    "[2~": "insert",
    "[3~": "delete",
    "[4~": "end",
    "[5~": "pageup",
    "[6~": "pagedown",
    "[[5~": "pageup",
    "[[6~": "pagedown",
    "[7~": "home",
    "[8~": "end"
};
const KeyMapShift = {
    "[a": "up",
    "[b": "down",
    "[c": "right",
    "[d": "left",
    "[e": "clear",
    "[2$": "insert",
    "[3$": "delete",
    "[5$": "pageup",
    "[6$": "pagedown",
    "[7$": "home",
    "[8$": "end",
    "[Z": "tab"
};
const KeyMapCtrl = {
    "Oa": "up",
    "Ob": "down",
    "Oc": "right",
    "Od": "left",
    "Oe": "clear",
    "[2^": "insert",
    "[3^": "delete",
    "[5^": "pageup",
    "[6^": "pagedown",
    "[7^": "home",
    "[8^": "end"
};
const SpecialKeyMap = {
    "\r": "return",
    "\n": "enter",
    "\t": "tab",
    "\b": "backspace",
    "\x7f": "backspace",
    "\x1b": "escape",
    " ": "space"
};
const kEscape = "\x1b";
function parse(data) {
    let index = -1;
    const keys = [];
    const input = data instanceof Uint8Array ? new TextDecoder().decode(data) : data;
    const hasNext = ()=>input.length - 1 >= index + 1;
    const next = ()=>input[++index];
    parseNext();
    return keys;
    function parseNext() {
        let ch = next();
        let s = ch;
        let escaped = false;
        const key = {
            name: undefined,
            char: undefined,
            sequence: undefined,
            code: undefined,
            ctrl: false,
            meta: false,
            shift: false
        };
        if (ch === kEscape && hasNext()) {
            escaped = true;
            s += ch = next();
            if (ch === kEscape) {
                s += ch = next();
            }
        }
        if (escaped && (ch === "O" || ch === "[")) {
            let code = ch;
            let modifier = 0;
            if (ch === "O") {
                s += ch = next();
                if (ch >= "0" && ch <= "9") {
                    modifier = (Number(ch) >> 0) - 1;
                    s += ch = next();
                }
                code += ch;
            } else if (ch === "[") {
                s += ch = next();
                if (ch === "[") {
                    code += ch;
                    s += ch = next();
                }
                const cmdStart = s.length - 1;
                if (ch >= "0" && ch <= "9") {
                    s += ch = next();
                    if (ch >= "0" && ch <= "9") {
                        s += ch = next();
                    }
                }
                if (ch === ";") {
                    s += ch = next();
                    if (ch >= "0" && ch <= "9") {
                        s += next();
                    }
                }
                const cmd = s.slice(cmdStart);
                let match;
                if (match = cmd.match(/^(\d\d?)(;(\d))?([~^$])$/)) {
                    code += match[1] + match[4];
                    modifier = (Number(match[3]) || 1) - 1;
                } else if (match = cmd.match(/^((\d;)?(\d))?([A-Za-z])$/)) {
                    code += match[4];
                    modifier = (Number(match[3]) || 1) - 1;
                } else {
                    code += cmd;
                }
            }
            key.ctrl = !!(modifier & 4);
            key.meta = !!(modifier & 10);
            key.shift = !!(modifier & 1);
            key.code = code;
            if (code in KeyMap) {
                key.name = KeyMap[code];
            } else if (code in KeyMapShift) {
                key.name = KeyMapShift[code];
                key.shift = true;
            } else if (code in KeyMapCtrl) {
                key.name = KeyMapCtrl[code];
                key.ctrl = true;
            } else {
                key.name = "undefined";
            }
        } else if (ch in SpecialKeyMap) {
            key.name = SpecialKeyMap[ch];
            key.meta = escaped;
        } else if (!escaped && ch <= "\x1a") {
            key.name = String.fromCharCode(ch.charCodeAt(0) + "a".charCodeAt(0) - 1);
            key.ctrl = true;
            key.char = key.name;
        } else if (/^[0-9A-Za-z]$/.test(ch)) {
            key.name = ch.toLowerCase();
            key.shift = /^[A-Z]$/.test(ch);
            key.meta = escaped;
            key.char = ch;
        } else if (escaped) {
            key.name = ch.length ? undefined : "escape";
            key.meta = true;
        } else {
            key.name = ch;
            key.char = ch;
        }
        key.sequence = s;
        if (s.length !== 0 && (key.name !== undefined || escaped) || charLengthAt(s, 0) === s.length) {
            keys.push(key);
        } else {
            throw new Error("Unrecognized or broken escape sequence");
        }
        if (hasNext()) {
            parseNext();
        }
    }
}
function charLengthAt(str, i) {
    const pos = str.codePointAt(i);
    if (typeof pos === "undefined") {
        return 1;
    }
    return pos >= 0x10000 ? 2 : 1;
}
const { Deno: Deno1  } = globalThis;
const noColor = typeof Deno1?.noColor === "boolean" ? Deno1.noColor : true;
let enabled = !noColor;
function code(open, close) {
    return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g")
    };
}
function run(str, code) {
    return enabled ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}` : str;
}
function bold(str) {
    return run(str, code([
        1
    ], 22));
}
function dim(str) {
    return run(str, code([
        2
    ], 22));
}
function italic(str) {
    return run(str, code([
        3
    ], 23));
}
function underline(str) {
    return run(str, code([
        4
    ], 24));
}
function red(str) {
    return run(str, code([
        31
    ], 39));
}
function green(str) {
    return run(str, code([
        32
    ], 39));
}
function yellow(str) {
    return run(str, code([
        33
    ], 39));
}
function blue(str) {
    return run(str, code([
        34
    ], 39));
}
const ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
].join("|"), "g");
function stripColor(string) {
    return string.replace(ANSI_PATTERN, "");
}
const osType = (()=>{
    const { Deno: Deno1  } = globalThis;
    if (typeof Deno1?.build?.os === "string") {
        return Deno1.build.os;
    }
    const { navigator  } = globalThis;
    if (navigator?.appVersion?.includes?.("Win")) {
        return "windows";
    }
    return "linux";
})();
const isWindows = osType === "windows";
const CHAR_FORWARD_SLASH = 47;
function assertPath(path) {
    if (typeof path !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
    }
}
function isPosixPathSeparator(code) {
    return code === 47;
}
function isPathSeparator(code) {
    return isPosixPathSeparator(code) || code === 92;
}
function isWindowsDeviceRoot(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for(let i = 0, len = path.length; i <= len; ++i){
        if (i < len) code = path.charCodeAt(i);
        else if (isPathSeparator(code)) break;
        else code = CHAR_FORWARD_SLASH;
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
                else res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format(sep, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base;
    if (dir === pathObject.root) return dir + base;
    return dir + sep + base;
}
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS[c] ?? c;
    });
}
class DenoStdInternalError extends Error {
    constructor(message){
        super(message);
        this.name = "DenoStdInternalError";
    }
}
function assert(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError(msg);
    }
}
const sep = "\\";
const delimiter = ";";
function resolve(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1; i--){
        let path;
        const { Deno: Deno1  } = globalThis;
        if (i >= 0) {
            path = pathSegments[i];
        } else if (!resolvedDevice) {
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path = Deno1.cwd();
        } else {
            if (typeof Deno1?.env?.get !== "function" || typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
            if (path === undefined || path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path = `${resolvedDevice}\\`;
            }
        }
        assertPath(path);
        const len = path.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator(code)) {
                isAbsolute = true;
                if (isPathSeparator(path.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for(; j < len; ++j){
                        if (isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        last = j;
                        for(; j < len; ++j){
                            if (!isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for(; j < len; ++j){
                                if (isPathSeparator(path.charCodeAt(j))) break;
                            }
                            if (j === len) {
                                device = `\\\\${firstPart}\\${path.slice(last)}`;
                                rootEnd = j;
                            } else if (j !== last) {
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot(code)) {
                if (path.charCodeAt(1) === 58) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator(path.charCodeAt(2))) {
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator(code)) {
            rootEnd = 1;
            isAbsolute = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            isAbsolute = true;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        } else if (j !== last) {
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute) tail = ".";
    if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return false;
    const code = path.charCodeAt(0);
    if (isPathSeparator(code)) {
        return true;
    } else if (isWindowsDeviceRoot(code)) {
        if (len > 2 && path.charCodeAt(1) === 58) {
            if (isPathSeparator(path.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i = 0; i < pathsCount; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (joined === undefined) joined = firstPart = path;
            else joined += `\\${path}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert(firstPart != null);
    if (isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize(joined);
}
function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    const fromOrig = resolve(from);
    const toOrig = resolve(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 92) {
                    return toOrig.slice(toStart + i + 1);
                } else if (i === 2) {
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 92) {
                    lastCommonSep = i;
                } else if (i === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i;
    }
    if (i !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath(path) {
    if (typeof path !== "string") return path;
    if (path.length === 0) return "";
    const resolvedPath = resolve(path);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== 63 && code !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path;
}
function dirname(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = offset = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return path;
                        }
                        if (j !== last) {
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return path;
    }
    for(let i = len - 1; i >= offset; --i){
        if (isPathSeparator(path.charCodeAt(i))) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return path.slice(0, end);
}
function basename(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if (isWindowsDeviceRoot(drive)) {
            if (path.charCodeAt(1) === 58) start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= start; --i){
            const code = path.charCodeAt(i);
            if (isPathSeparator(code)) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= start; --i){
            if (isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname(path) {
    assertPath(path);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path.length >= 2 && path.charCodeAt(1) === 58 && isWindowsDeviceRoot(path.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i = path.length - 1; i >= start; --i){
        const code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("\\", pathObject);
}
function parse1(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            rootEnd = j;
                        } else if (j !== last) {
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        ret.root = ret.dir = path;
        return ret;
    }
    if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= rootEnd; --i){
        code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path.slice(startPart, end);
        }
    } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path = `\\\\${url.hostname}${path}`;
    }
    return path;
}
function toFileUrl(path) {
    if (!isAbsolute(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
    if (hostname != null && hostname != "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const mod1 = {
    sep: sep,
    delimiter: delimiter,
    resolve: resolve,
    normalize: normalize,
    isAbsolute: isAbsolute,
    join: join,
    relative: relative,
    toNamespacedPath: toNamespacedPath,
    dirname: dirname,
    basename: basename,
    extname: extname,
    format: format,
    parse: parse1,
    fromFileUrl: fromFileUrl,
    toFileUrl: toFileUrl
};
const sep1 = "/";
const delimiter1 = ":";
function resolve1(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--){
        let path;
        if (i >= 0) path = pathSegments[i];
        else {
            const { Deno: Deno1  } = globalThis;
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
        }
        assertPath(path);
        if (path.length === 0) {
            continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    }
    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize1(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    const isAbsolute = path.charCodeAt(0) === 47;
    const trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    path = normalizeString(path, !isAbsolute, "/", isPosixPathSeparator);
    if (path.length === 0 && !isAbsolute) path = ".";
    if (path.length > 0 && trailingSeparator) path += "/";
    if (isAbsolute) return `/${path}`;
    return path;
}
function isAbsolute1(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
}
function join1(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i = 0, len = paths.length; i < len; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (!joined) joined = path;
            else joined += `/${path}`;
        }
    }
    if (!joined) return ".";
    return normalize1(joined);
}
function relative1(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    from = resolve1(from);
    to = resolve1(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                    return to.slice(toStart + i + 1);
                } else if (i === 0) {
                    return to.slice(toStart + i);
                }
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                    lastCommonSep = i;
                } else if (i === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
    }
    let out = "";
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath1(path) {
    return path;
}
function dirname1(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    const hasRoot = path.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for(let i = path.length - 1; i >= 1; --i){
        if (path.charCodeAt(i) === 47) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path.slice(0, end);
}
function basename1(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= 0; --i){
            const code = path.charCodeAt(i);
            if (code === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= 0; --i){
            if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname1(path) {
    assertPath(path);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i = path.length - 1; i >= 0; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format1(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("/", pathObject);
}
function parse2(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path.length === 0) return ret;
    const isAbsolute = path.charCodeAt(0) === 47;
    let start;
    if (isAbsolute) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= start; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute) {
                ret.base = ret.name = path.slice(1, end);
            } else {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
        } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute) ret.dir = "/";
    return ret;
}
function fromFileUrl1(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl1(path) {
    if (!isAbsolute1(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const mod2 = {
    sep: sep1,
    delimiter: delimiter1,
    resolve: resolve1,
    normalize: normalize1,
    isAbsolute: isAbsolute1,
    join: join1,
    relative: relative1,
    toNamespacedPath: toNamespacedPath1,
    dirname: dirname1,
    basename: basename1,
    extname: extname1,
    format: format1,
    parse: parse2,
    fromFileUrl: fromFileUrl1,
    toFileUrl: toFileUrl1
};
const path = isWindows ? mod1 : mod2;
const { join: join2 , normalize: normalize2  } = path;
const path1 = isWindows ? mod1 : mod2;
const { basename: basename2 , delimiter: delimiter2 , dirname: dirname2 , extname: extname2 , format: format2 , fromFileUrl: fromFileUrl2 , isAbsolute: isAbsolute2 , join: join3 , normalize: normalize3 , parse: parse3 , relative: relative2 , resolve: resolve2 , sep: sep2 , toFileUrl: toFileUrl2 , toNamespacedPath: toNamespacedPath2  } = path1;
class GenericPrompt {
    static injectedValue;
    settings;
    tty = tty;
    indent;
    cursor = {
        x: 0,
        y: 0
    };
    #value;
    #lastError;
    #isFirstRun = true;
    #encoder = new TextEncoder();
    static inject(value) {
        GenericPrompt.injectedValue = value;
    }
    constructor(settings){
        this.settings = {
            ...settings,
            keys: {
                submit: [
                    "enter",
                    "return"
                ],
                ...settings.keys ?? {}
            }
        };
        this.indent = this.settings.indent ?? " ";
    }
    async prompt() {
        try {
            return await this.#execute();
        } finally{
            this.tty.cursorShow();
        }
    }
    clear() {
        this.tty.cursorLeft.eraseDown();
    }
    #execute = async ()=>{
        if (typeof GenericPrompt.injectedValue !== "undefined" && this.#lastError) {
            throw new Error(await this.error());
        }
        await this.render();
        this.#lastError = undefined;
        if (!await this.read()) {
            return this.#execute();
        }
        if (typeof this.#value === "undefined") {
            throw new Error("internal error: failed to read value");
        }
        this.clear();
        const successMessage = this.success(this.#value);
        if (successMessage) {
            console.log(successMessage);
        }
        GenericPrompt.injectedValue = undefined;
        this.tty.cursorShow();
        return this.#value;
    };
    async render() {
        const result = await Promise.all([
            this.message(),
            this.body?.(),
            this.footer()
        ]);
        const content = result.filter(Boolean).join("\n");
        const lines = content.split("\n");
        const columns = getColumns();
        const linesCount = columns ? lines.reduce((prev, next)=>{
            const length = stripColor(next).length;
            return prev + (length > columns ? Math.ceil(length / columns) : 1);
        }, 0) : content.split("\n").length;
        const y = linesCount - this.cursor.y - 1;
        if (!this.#isFirstRun || this.#lastError) {
            this.clear();
        }
        this.#isFirstRun = false;
        if (Deno.build.os === "windows") {
            console.log(content);
            this.tty.cursorUp();
        } else {
            Deno.stdout.writeSync(this.#encoder.encode(content));
        }
        if (y) {
            this.tty.cursorUp(y);
        }
        this.tty.cursorTo(this.cursor.x);
    }
    async read() {
        if (typeof GenericPrompt.injectedValue !== "undefined") {
            const value = GenericPrompt.injectedValue;
            await this.#validateValue(value);
        } else {
            const events = await this.#readKey();
            if (!events.length) {
                return false;
            }
            for (const event of events){
                await this.handleEvent(event);
            }
        }
        return typeof this.#value !== "undefined";
    }
    submit() {
        return this.#validateValue(this.getValue());
    }
    message() {
        return `${this.settings.indent}${this.settings.prefix}` + bold(this.settings.message) + this.defaults();
    }
    defaults() {
        let defaultMessage = "";
        if (typeof this.settings.default !== "undefined" && !this.settings.hideDefault) {
            defaultMessage += dim(` (${this.format(this.settings.default)})`);
        }
        return defaultMessage;
    }
    success(value) {
        return `${this.settings.indent}${this.settings.prefix}` + bold(this.settings.message) + this.defaults() + " " + this.settings.pointer + " " + green(this.format(value));
    }
    footer() {
        return this.error() ?? this.hint();
    }
    error() {
        return this.#lastError ? this.settings.indent + red(bold(`${Figures.CROSS} `) + this.#lastError) : undefined;
    }
    hint() {
        return this.settings.hint ? this.settings.indent + italic(blue(dim(`${Figures.POINTER} `) + this.settings.hint)) : undefined;
    }
    setErrorMessage(message) {
        this.#lastError = message;
    }
    async handleEvent(event) {
        switch(true){
            case event.name === "c" && event.ctrl:
                this.clear();
                this.tty.cursorShow();
                Deno.exit(130);
                return;
            case this.isKey(this.settings.keys, "submit", event):
                await this.submit();
                break;
        }
    }
    #readKey = async ()=>{
        const data = await this.#readChar();
        return data.length ? parse(data) : [];
    };
    #readChar = async ()=>{
        const buffer = new Uint8Array(8);
        const isTty = Deno.isatty(Deno.stdin.rid);
        if (isTty) {
            Deno.stdin.setRaw(true, {
                cbreak: this.settings.cbreak === true
            });
        }
        const nread = await Deno.stdin.read(buffer);
        if (isTty) {
            Deno.stdin.setRaw(false);
        }
        if (nread === null) {
            return buffer;
        }
        return buffer.subarray(0, nread);
    };
    #transformValue = (value)=>{
        return this.settings.transform ? this.settings.transform(value) : this.transform(value);
    };
    #validateValue = async (value)=>{
        if (!value && typeof this.settings.default !== "undefined") {
            this.#value = this.settings.default;
            return;
        }
        this.#value = undefined;
        this.#lastError = undefined;
        const validation = await (this.settings.validate ? this.settings.validate(value) : this.validate(value));
        if (validation === false) {
            this.#lastError = `Invalid answer.`;
        } else if (typeof validation === "string") {
            this.#lastError = validation;
        } else {
            this.#value = this.#transformValue(value);
        }
    };
    isKey(keys, name, event) {
        const keyNames = keys?.[name];
        return typeof keyNames !== "undefined" && (typeof event.name !== "undefined" && keyNames.indexOf(event.name) !== -1 || typeof event.sequence !== "undefined" && keyNames.indexOf(event.sequence) !== -1);
    }
}
function getColumns() {
    try {
        return Deno.consoleSize(Deno.stdout.rid).columns;
    } catch (_error) {
        return null;
    }
}
export { GenericPrompt as GenericPrompt };
class GenericInput extends GenericPrompt {
    inputValue = "";
    inputIndex = 0;
    constructor(settings){
        super({
            ...settings,
            keys: {
                moveCursorLeft: [
                    "left"
                ],
                moveCursorRight: [
                    "right"
                ],
                deleteCharLeft: [
                    "backspace"
                ],
                deleteCharRight: [
                    "delete"
                ],
                ...settings.keys ?? {}
            }
        });
    }
    getCurrentInputValue() {
        return this.inputValue;
    }
    message() {
        const message = super.message() + " " + this.settings.pointer + " ";
        this.cursor.x = stripColor(message).length + this.inputIndex + 1;
        return message + this.input();
    }
    input() {
        return underline(this.inputValue);
    }
    highlight(value, color1 = dim, color2 = blue) {
        value = value.toString();
        const inputLowerCase = this.getCurrentInputValue().toLowerCase();
        const valueLowerCase = value.toLowerCase();
        const index = valueLowerCase.indexOf(inputLowerCase);
        const matched = value.slice(index, index + inputLowerCase.length);
        return index >= 0 ? color1(value.slice(0, index)) + color2(matched) + color1(value.slice(index + inputLowerCase.length)) : value;
    }
    async handleEvent(event) {
        switch(true){
            case this.isKey(this.settings.keys, "moveCursorLeft", event):
                this.moveCursorLeft();
                break;
            case this.isKey(this.settings.keys, "moveCursorRight", event):
                this.moveCursorRight();
                break;
            case this.isKey(this.settings.keys, "deleteCharRight", event):
                this.deleteCharRight();
                break;
            case this.isKey(this.settings.keys, "deleteCharLeft", event):
                this.deleteChar();
                break;
            case event.char && !event.meta && !event.ctrl:
                this.addChar(event.char);
                break;
            default:
                await super.handleEvent(event);
        }
    }
    addChar(__char) {
        this.inputValue = this.inputValue.slice(0, this.inputIndex) + __char + this.inputValue.slice(this.inputIndex);
        this.inputIndex++;
    }
    moveCursorLeft() {
        if (this.inputIndex > 0) {
            this.inputIndex--;
        }
    }
    moveCursorRight() {
        if (this.inputIndex < this.inputValue.length) {
            this.inputIndex++;
        }
    }
    deleteChar() {
        if (this.inputIndex > 0) {
            this.inputIndex--;
            this.deleteCharRight();
        }
    }
    deleteCharRight() {
        if (this.inputIndex < this.inputValue.length) {
            this.inputValue = this.inputValue.slice(0, this.inputIndex) + this.inputValue.slice(this.inputIndex + 1);
        }
    }
}
export { GenericInput as GenericInput };
function distance(a, b) {
    if (a.length == 0) {
        return b.length;
    }
    if (b.length == 0) {
        return a.length;
    }
    const matrix = [];
    for(let i = 0; i <= b.length; i++){
        matrix[i] = [
            i
        ];
    }
    for(let j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }
    for(let i = 1; i <= b.length; i++){
        for(let j = 1; j <= a.length; j++){
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}
class GenericList extends GenericInput {
    options = this.settings.options;
    listIndex = this.getListIndex();
    listOffset = this.getPageOffset(this.listIndex);
    static separator(label = "------------") {
        return {
            value: label,
            disabled: true
        };
    }
    static mapOption(option) {
        return {
            value: option.value,
            name: typeof option.name === "undefined" ? option.value : option.name,
            disabled: !!option.disabled
        };
    }
    constructor(settings){
        super({
            ...settings,
            keys: {
                previous: settings.search ? [
                    "up"
                ] : [
                    "up",
                    "u",
                    "p",
                    "8"
                ],
                next: settings.search ? [
                    "down"
                ] : [
                    "down",
                    "d",
                    "n",
                    "2"
                ],
                previousPage: [
                    "pageup",
                    "left"
                ],
                nextPage: [
                    "pagedown",
                    "right"
                ],
                ...settings.keys ?? {}
            }
        });
    }
    match() {
        const input = this.getCurrentInputValue().toLowerCase();
        if (!input.length) {
            this.options = this.settings.options.slice();
        } else {
            this.options = this.settings.options.filter((option)=>match(option.name) || option.name !== option.value && match(option.value)).sort((a, b)=>distance(a.name, input) - distance(b.name, input));
        }
        this.listIndex = Math.max(0, Math.min(this.options.length - 1, this.listIndex));
        this.listOffset = Math.max(0, Math.min(this.options.length - this.getListHeight(), this.listOffset));
        function match(value) {
            return stripColor(value).toLowerCase().includes(input);
        }
    }
    message() {
        let message = `${this.settings.indent}${this.settings.prefix}` + bold(this.settings.message) + this.defaults();
        if (this.settings.search) {
            message += " " + this.settings.searchLabel + " ";
        }
        this.cursor.x = stripColor(message).length + this.inputIndex + 1;
        return message + this.input();
    }
    body() {
        return this.getList() + this.getInfo();
    }
    getInfo() {
        if (!this.settings.info) {
            return "";
        }
        const selected = this.listIndex + 1;
        const actions = [
            [
                "Next",
                getFiguresByKeys(this.settings.keys?.next ?? [])
            ],
            [
                "Previous",
                getFiguresByKeys(this.settings.keys?.previous ?? [])
            ],
            [
                "Next Page",
                getFiguresByKeys(this.settings.keys?.nextPage ?? [])
            ],
            [
                "Previous Page",
                getFiguresByKeys(this.settings.keys?.previousPage ?? [])
            ],
            [
                "Submit",
                getFiguresByKeys(this.settings.keys?.submit ?? [])
            ]
        ];
        return "\n" + this.settings.indent + blue(Figures.INFO) + bold(` ${selected}/${this.options.length} `) + actions.map((cur)=>`${cur[0]}: ${bold(cur[1].join(", "))}`).join(", ");
    }
    getList() {
        const list = [];
        const height = this.getListHeight();
        for(let i = this.listOffset; i < this.listOffset + height; i++){
            list.push(this.getListItem(this.options[i], this.listIndex === i));
        }
        if (!list.length) {
            list.push(this.settings.indent + dim("  No matches..."));
        }
        return list.join("\n");
    }
    getListHeight() {
        return Math.min(this.options.length, this.settings.maxRows || this.options.length);
    }
    getListIndex(value) {
        return Math.max(0, typeof value === "undefined" ? this.options.findIndex((item)=>!item.disabled) || 0 : this.options.findIndex((item)=>item.value === value) || 0);
    }
    getPageOffset(index) {
        if (index === 0) {
            return 0;
        }
        const height = this.getListHeight();
        return Math.floor(index / height) * height;
    }
    getOptionByValue(value) {
        return this.options.find((option)=>option.value === value);
    }
    read() {
        if (!this.settings.search) {
            this.tty.cursorHide();
        }
        return super.read();
    }
    async handleEvent(event) {
        switch(true){
            case this.isKey(this.settings.keys, "previous", event):
                this.selectPrevious();
                break;
            case this.isKey(this.settings.keys, "next", event):
                this.selectNext();
                break;
            case this.isKey(this.settings.keys, "nextPage", event):
                this.selectNextPage();
                break;
            case this.isKey(this.settings.keys, "previousPage", event):
                this.selectPreviousPage();
                break;
            default:
                await super.handleEvent(event);
        }
    }
    moveCursorLeft() {
        if (this.settings.search) {
            super.moveCursorLeft();
        }
    }
    moveCursorRight() {
        if (this.settings.search) {
            super.moveCursorRight();
        }
    }
    deleteChar() {
        if (this.settings.search) {
            super.deleteChar();
        }
    }
    deleteCharRight() {
        if (this.settings.search) {
            super.deleteCharRight();
            this.match();
        }
    }
    addChar(__char) {
        if (this.settings.search) {
            super.addChar(__char);
            this.match();
        }
    }
    selectPrevious() {
        if (this.options.length < 2) {
            return;
        }
        if (this.listIndex > 0) {
            this.listIndex--;
            if (this.listIndex < this.listOffset) {
                this.listOffset--;
            }
            if (this.options[this.listIndex].disabled) {
                this.selectPrevious();
            }
        } else {
            this.listIndex = this.options.length - 1;
            this.listOffset = this.options.length - this.getListHeight();
            if (this.options[this.listIndex].disabled) {
                this.selectPrevious();
            }
        }
    }
    selectNext() {
        if (this.options.length < 2) {
            return;
        }
        if (this.listIndex < this.options.length - 1) {
            this.listIndex++;
            if (this.listIndex >= this.listOffset + this.getListHeight()) {
                this.listOffset++;
            }
            if (this.options[this.listIndex].disabled) {
                this.selectNext();
            }
        } else {
            this.listIndex = this.listOffset = 0;
            if (this.options[this.listIndex].disabled) {
                this.selectNext();
            }
        }
    }
    selectPreviousPage() {
        if (this.options?.length) {
            const height = this.getListHeight();
            if (this.listOffset >= height) {
                this.listIndex -= height;
                this.listOffset -= height;
            } else if (this.listOffset > 0) {
                this.listIndex -= this.listOffset;
                this.listOffset = 0;
            }
        }
    }
    selectNextPage() {
        if (this.options?.length) {
            const height = this.getListHeight();
            if (this.listOffset + height + height < this.options.length) {
                this.listIndex += height;
                this.listOffset += height;
            } else if (this.listOffset + height < this.options.length) {
                const offset = this.options.length - height;
                this.listIndex += offset - this.listOffset;
                this.listOffset = offset;
            }
        }
    }
}
export { GenericList as GenericList };
class Checkbox extends GenericList {
    static inject(value) {
        GenericPrompt.inject(value);
    }
    static prompt(options) {
        return new this({
            pointer: blue(Figures.POINTER_SMALL),
            prefix: yellow("? "),
            indent: " ",
            listPointer: blue(Figures.POINTER),
            maxRows: 10,
            searchLabel: blue(Figures.SEARCH),
            minOptions: 0,
            maxOptions: Infinity,
            check: green(Figures.TICK),
            uncheck: red(Figures.CROSS),
            ...options,
            keys: {
                check: [
                    "space"
                ],
                ...options.keys ?? {}
            },
            options: Checkbox.mapOptions(options)
        }).prompt();
    }
    static separator(label) {
        return {
            ...super.separator(label),
            icon: false
        };
    }
    static mapOptions(options) {
        return options.options.map((item)=>typeof item === "string" ? {
                value: item
            } : item).map((item)=>({
                ...this.mapOption(item),
                checked: typeof item.checked === "undefined" && options.default && options.default.indexOf(item.value) !== -1 ? true : !!item.checked,
                icon: typeof item.icon === "undefined" ? true : item.icon
            }));
    }
    getListItem(item, isSelected) {
        let line = this.settings.indent;
        line += isSelected ? this.settings.listPointer + " " : "  ";
        if (item.icon) {
            let check = item.checked ? this.settings.check + " " : this.settings.uncheck + " ";
            if (item.disabled) {
                check = dim(check);
            }
            line += check;
        } else {
            line += "  ";
        }
        line += `${isSelected && !item.disabled ? this.highlight(item.name, (val)=>val) : this.highlight(item.name)}`;
        return line;
    }
    getValue() {
        return this.settings.options.filter((item)=>item.checked).map((item)=>item.value);
    }
    async handleEvent(event) {
        switch(true){
            case this.isKey(this.settings.keys, "check", event):
                this.checkValue();
                break;
            default:
                await super.handleEvent(event);
        }
    }
    checkValue() {
        const item = this.options[this.listIndex];
        if (item.disabled) {
            this.setErrorMessage("This option is disabled and cannot be changed.");
        } else {
            item.checked = !item.checked;
        }
    }
    validate(value) {
        const isValidValue = Array.isArray(value) && value.every((val)=>typeof val === "string" && val.length > 0 && this.settings.options.findIndex((option)=>option.value === val) !== -1);
        if (!isValidValue) {
            return false;
        }
        if (value.length < this.settings.minOptions) {
            return `The minimum number of options is ${this.settings.minOptions} but got ${value.length}.`;
        }
        if (value.length > this.settings.maxOptions) {
            return `The maximum number of options is ${this.settings.maxOptions} but got ${value.length}.`;
        }
        return true;
    }
    transform(value) {
        return value.map((val)=>val.trim());
    }
    format(value) {
        return value.map((val)=>this.getOptionByValue(val)?.name ?? val).join(", ");
    }
}
export { Checkbox as Checkbox };
const sep3 = Deno.build.os === "windows" ? "\\" : "/";
class GenericSuggestions extends GenericInput {
    suggestionsIndex = -1;
    suggestionsOffset = 0;
    suggestions = [];
    #hasReadPermissions;
    constructor(settings){
        super({
            ...settings,
            keys: {
                complete: [
                    "tab"
                ],
                next: [
                    "up"
                ],
                previous: [
                    "down"
                ],
                nextPage: [
                    "pageup"
                ],
                previousPage: [
                    "pagedown"
                ],
                ...settings.keys ?? {}
            }
        });
    }
    get localStorage() {
        if (this.settings.id && "localStorage" in window) {
            try {
                return window.localStorage;
            } catch (_) {}
        }
        return null;
    }
    loadSuggestions() {
        if (this.settings.id) {
            const json = this.localStorage?.getItem(this.settings.id);
            const suggestions = json ? JSON.parse(json) : [];
            if (!Array.isArray(suggestions)) {
                return [];
            }
            return suggestions;
        }
        return [];
    }
    saveSuggestions(...suggestions) {
        if (this.settings.id) {
            this.localStorage?.setItem(this.settings.id, JSON.stringify([
                ...suggestions,
                ...this.loadSuggestions()
            ].filter(uniqueSuggestions)));
        }
    }
    async render() {
        if (this.settings.files && this.#hasReadPermissions === undefined) {
            const status = await Deno.permissions.request({
                name: "read"
            });
            this.#hasReadPermissions = status.state === "granted";
        }
        await this.match();
        return super.render();
    }
    async match() {
        this.suggestions = await this.getSuggestions();
        this.suggestionsIndex = Math.max(this.getCurrentInputValue().trim().length === 0 ? -1 : 0, Math.min(this.suggestions.length - 1, this.suggestionsIndex));
        this.suggestionsOffset = Math.max(0, Math.min(this.suggestions.length - this.getListHeight(), this.suggestionsOffset));
    }
    input() {
        return super.input() + dim(this.getSuggestion());
    }
    getSuggestion() {
        return this.suggestions[this.suggestionsIndex]?.toString().substr(this.getCurrentInputValue().length) ?? "";
    }
    async getUserSuggestions(input) {
        return typeof this.settings.suggestions === "function" ? await this.settings.suggestions(input) : this.settings.suggestions ?? [];
    }
    #isFileModeEnabled() {
        return !!this.settings.files && this.#hasReadPermissions === true;
    }
    async getFileSuggestions(input) {
        if (!this.#isFileModeEnabled()) {
            return [];
        }
        const path = await Deno.stat(input).then((file)=>file.isDirectory ? input : dirname2(input)).catch(()=>dirname2(input));
        return await listDir(path, this.settings.files);
    }
    async getSuggestions() {
        const input = this.getCurrentInputValue();
        const suggestions = [
            ...this.loadSuggestions(),
            ...await this.getUserSuggestions(input),
            ...await this.getFileSuggestions(input)
        ].filter(uniqueSuggestions);
        if (!input.length) {
            return suggestions;
        }
        return suggestions.filter((value)=>stripColor(value.toString()).toLowerCase().startsWith(input)).sort((a, b)=>distance((a || a).toString(), input) - distance((b || b).toString(), input));
    }
    body() {
        return this.getList() + this.getInfo();
    }
    getInfo() {
        if (!this.settings.info) {
            return "";
        }
        const selected = this.suggestionsIndex + 1;
        const matched = this.suggestions.length;
        const actions = [];
        if (this.suggestions.length) {
            if (this.settings.list) {
                actions.push([
                    "Next",
                    getFiguresByKeys(this.settings.keys?.next ?? [])
                ], [
                    "Previous",
                    getFiguresByKeys(this.settings.keys?.previous ?? [])
                ], [
                    "Next Page",
                    getFiguresByKeys(this.settings.keys?.nextPage ?? [])
                ], [
                    "Previous Page",
                    getFiguresByKeys(this.settings.keys?.previousPage ?? [])
                ]);
            } else {
                actions.push([
                    "Next",
                    getFiguresByKeys(this.settings.keys?.next ?? [])
                ], [
                    "Previous",
                    getFiguresByKeys(this.settings.keys?.previous ?? [])
                ]);
            }
            actions.push([
                "Complete",
                getFiguresByKeys(this.settings.keys?.complete ?? [])
            ]);
        }
        actions.push([
            "Submit",
            getFiguresByKeys(this.settings.keys?.submit ?? [])
        ]);
        let info = this.settings.indent;
        if (this.suggestions.length) {
            info += blue(Figures.INFO) + bold(` ${selected}/${matched} `);
        }
        info += actions.map((cur)=>`${cur[0]}: ${bold(cur[1].join(" "))}`).join(", ");
        return info;
    }
    getList() {
        if (!this.suggestions.length || !this.settings.list) {
            return "";
        }
        const list = [];
        const height = this.getListHeight();
        for(let i = this.suggestionsOffset; i < this.suggestionsOffset + height; i++){
            list.push(this.getListItem(this.suggestions[i], this.suggestionsIndex === i));
        }
        if (list.length && this.settings.info) {
            list.push("");
        }
        return list.join("\n");
    }
    getListItem(value, isSelected) {
        let line = this.settings.indent ?? "";
        line += isSelected ? `${this.settings.listPointer} ` : "  ";
        if (isSelected) {
            line += underline(this.highlight(value));
        } else {
            line += this.highlight(value);
        }
        return line;
    }
    getListHeight(suggestions = this.suggestions) {
        return Math.min(suggestions.length, this.settings.maxRows || suggestions.length);
    }
    async handleEvent(event) {
        switch(true){
            case this.isKey(this.settings.keys, "next", event):
                if (this.settings.list) {
                    this.selectPreviousSuggestion();
                } else {
                    this.selectNextSuggestion();
                }
                break;
            case this.isKey(this.settings.keys, "previous", event):
                if (this.settings.list) {
                    this.selectNextSuggestion();
                } else {
                    this.selectPreviousSuggestion();
                }
                break;
            case this.isKey(this.settings.keys, "nextPage", event):
                if (this.settings.list) {
                    this.selectPreviousSuggestionsPage();
                } else {
                    this.selectNextSuggestionsPage();
                }
                break;
            case this.isKey(this.settings.keys, "previousPage", event):
                if (this.settings.list) {
                    this.selectNextSuggestionsPage();
                } else {
                    this.selectPreviousSuggestionsPage();
                }
                break;
            case this.isKey(this.settings.keys, "complete", event):
                await this.#completeValue();
                break;
            case this.isKey(this.settings.keys, "moveCursorRight", event):
                if (this.inputIndex < this.inputValue.length) {
                    this.moveCursorRight();
                } else {
                    await this.#completeValue();
                }
                break;
            default:
                await super.handleEvent(event);
        }
    }
    deleteCharRight() {
        if (this.inputIndex < this.inputValue.length) {
            super.deleteCharRight();
            if (!this.getCurrentInputValue().length) {
                this.suggestionsIndex = -1;
                this.suggestionsOffset = 0;
            }
        }
    }
    async #completeValue() {
        this.inputValue = await this.complete();
        this.inputIndex = this.inputValue.length;
        this.suggestionsIndex = 0;
        this.suggestionsOffset = 0;
    }
    async complete() {
        let input = this.getCurrentInputValue();
        if (!input.length) {
            return input;
        }
        const suggestion = this.suggestions[this.suggestionsIndex]?.toString();
        if (this.settings.complete) {
            input = await this.settings.complete(input, suggestion);
        } else if (this.#isFileModeEnabled() && input.at(-1) !== sep3 && await isDirectory(input) && (this.getCurrentInputValue().at(-1) !== "." || this.getCurrentInputValue().endsWith(".."))) {
            input += sep3;
        } else if (suggestion) {
            input = suggestion;
        }
        return this.#isFileModeEnabled() ? normalize3(input) : input;
    }
    selectPreviousSuggestion() {
        if (this.suggestions.length) {
            if (this.suggestionsIndex > -1) {
                this.suggestionsIndex--;
                if (this.suggestionsIndex < this.suggestionsOffset) {
                    this.suggestionsOffset--;
                }
            }
        }
    }
    selectNextSuggestion() {
        if (this.suggestions.length) {
            if (this.suggestionsIndex < this.suggestions.length - 1) {
                this.suggestionsIndex++;
                if (this.suggestionsIndex >= this.suggestionsOffset + this.getListHeight()) {
                    this.suggestionsOffset++;
                }
            }
        }
    }
    selectPreviousSuggestionsPage() {
        if (this.suggestions.length) {
            const height = this.getListHeight();
            if (this.suggestionsOffset >= height) {
                this.suggestionsIndex -= height;
                this.suggestionsOffset -= height;
            } else if (this.suggestionsOffset > 0) {
                this.suggestionsIndex -= this.suggestionsOffset;
                this.suggestionsOffset = 0;
            }
        }
    }
    selectNextSuggestionsPage() {
        if (this.suggestions.length) {
            const height = this.getListHeight();
            if (this.suggestionsOffset + height + height < this.suggestions.length) {
                this.suggestionsIndex += height;
                this.suggestionsOffset += height;
            } else if (this.suggestionsOffset + height < this.suggestions.length) {
                const offset = this.suggestions.length - height;
                this.suggestionsIndex += offset - this.suggestionsOffset;
                this.suggestionsOffset = offset;
            }
        }
    }
}
function uniqueSuggestions(value, index, self) {
    return typeof value !== "undefined" && value !== "" && self.indexOf(value) === index;
}
function isDirectory(path) {
    return Deno.stat(path).then((file)=>file.isDirectory).catch(()=>false);
}
async function listDir(path, mode) {
    const fileNames = [];
    for await (const file of Deno.readDir(path || ".")){
        if (mode === true && (file.name.startsWith(".") || file.name.endsWith("~"))) {
            continue;
        }
        const filePath = join3(path, file.name);
        if (mode instanceof RegExp && !mode.test(filePath)) {
            continue;
        }
        fileNames.push(filePath);
    }
    return fileNames.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
}
class Confirm extends GenericSuggestions {
    static prompt(options) {
        if (typeof options === "string") {
            options = {
                message: options
            };
        }
        return new this({
            pointer: blue(Figures.POINTER_SMALL),
            prefix: yellow("? "),
            indent: " ",
            listPointer: blue(Figures.POINTER),
            maxRows: 8,
            active: "Yes",
            inactive: "No",
            ...options,
            files: false,
            complete: undefined,
            suggestions: [
                options.active ?? "Yes",
                options.inactive ?? "No"
            ],
            list: false,
            info: false
        }).prompt();
    }
    static inject(value) {
        GenericPrompt.inject(value);
    }
    defaults() {
        let defaultMessage = "";
        if (this.settings.default === true) {
            defaultMessage += this.settings.active[0].toUpperCase() + "/" + this.settings.inactive[0].toLowerCase();
        } else if (this.settings.default === false) {
            defaultMessage += this.settings.active[0].toLowerCase() + "/" + this.settings.inactive[0].toUpperCase();
        } else {
            defaultMessage += this.settings.active[0].toLowerCase() + "/" + this.settings.inactive[0].toLowerCase();
        }
        return defaultMessage ? dim(` (${defaultMessage})`) : "";
    }
    success(value) {
        this.saveSuggestions(this.format(value));
        return super.success(value);
    }
    getValue() {
        return this.inputValue;
    }
    validate(value) {
        return typeof value === "string" && [
            this.settings.active[0].toLowerCase(),
            this.settings.active.toLowerCase(),
            this.settings.inactive[0].toLowerCase(),
            this.settings.inactive.toLowerCase()
        ].indexOf(value.toLowerCase()) !== -1;
    }
    transform(value) {
        switch(value.toLowerCase()){
            case this.settings.active[0].toLowerCase():
            case this.settings.active.toLowerCase():
                return true;
            case this.settings.inactive[0].toLowerCase():
            case this.settings.inactive.toLowerCase():
                return false;
        }
        return;
    }
    format(value) {
        return value ? this.settings.active : this.settings.inactive;
    }
}
export { Confirm as Confirm };
class Input extends GenericSuggestions {
    static prompt(options) {
        if (typeof options === "string") {
            options = {
                message: options
            };
        }
        return new this({
            pointer: blue(Figures.POINTER_SMALL),
            prefix: yellow("? "),
            indent: " ",
            listPointer: blue(Figures.POINTER),
            maxRows: 8,
            minLength: 0,
            maxLength: Infinity,
            ...options
        }).prompt();
    }
    static inject(value) {
        GenericPrompt.inject(value);
    }
    success(value) {
        this.saveSuggestions(value);
        return super.success(value);
    }
    getValue() {
        return this.settings.files ? normalize3(this.inputValue) : this.inputValue;
    }
    validate(value) {
        if (typeof value !== "string") {
            return false;
        }
        if (value.length < this.settings.minLength) {
            return `Value must be longer than ${this.settings.minLength} but has a length of ${value.length}.`;
        }
        if (value.length > this.settings.maxLength) {
            return `Value can't be longer than ${this.settings.maxLength} but has a length of ${value.length}.`;
        }
        return true;
    }
    transform(value) {
        return value.trim();
    }
    format(value) {
        return value;
    }
}
export { Input as Input };
class List extends GenericSuggestions {
    static prompt(options) {
        if (typeof options === "string") {
            options = {
                message: options
            };
        }
        return new this({
            pointer: blue(Figures.POINTER_SMALL),
            prefix: yellow("? "),
            indent: " ",
            listPointer: blue(Figures.POINTER),
            maxRows: 8,
            separator: ",",
            minLength: 0,
            maxLength: Infinity,
            minTags: 0,
            maxTags: Infinity,
            ...options
        }).prompt();
    }
    static inject(value) {
        GenericPrompt.inject(value);
    }
    input() {
        const oldInput = this.inputValue;
        const tags = this.getTags(oldInput);
        const separator = this.settings.separator + " ";
        if (this.settings.files && tags.length > 1) {
            tags[tags.length - 2] = normalize3(tags[tags.length - 2]);
        }
        this.inputValue = tags.join(separator);
        const diff = oldInput.length - this.inputValue.length;
        this.inputIndex -= diff;
        this.cursor.x -= diff;
        return tags.map((val)=>underline(val)).join(separator) + dim(this.getSuggestion());
    }
    getTags(value = this.inputValue) {
        return value.trim().split(this.regexp());
    }
    regexp() {
        return new RegExp(this.settings.separator === " " ? ` +` : ` *${this.settings.separator} *`);
    }
    success(value) {
        this.saveSuggestions(...value);
        return super.success(value);
    }
    getValue() {
        const input = this.inputValue.replace(/,+\s*$/, "");
        if (!this.settings.files) {
            return input;
        }
        return this.getTags(input).map(normalize3).join(this.settings.separator + " ");
    }
    getCurrentInputValue() {
        return this.getTags().pop() ?? "";
    }
    addChar(__char) {
        switch(__char){
            case this.settings.separator:
                if (this.inputValue.length && this.inputValue.trim().slice(-1) !== this.settings.separator) {
                    super.addChar(__char);
                }
                this.suggestionsIndex = -1;
                this.suggestionsOffset = 0;
                break;
            default:
                super.addChar(__char);
        }
    }
    deleteChar() {
        if (this.inputValue[this.inputIndex - 1] === " ") {
            super.deleteChar();
        }
        super.deleteChar();
    }
    async complete() {
        const tags = this.getTags().slice(0, -1);
        tags.push(await super.complete());
        return tags.join(this.settings.separator + " ");
    }
    validate(value) {
        if (typeof value !== "string") {
            return false;
        }
        const values = this.transform(value);
        for (const val of values){
            if (val.length < this.settings.minLength) {
                return `Value must be longer than ${this.settings.minLength} but has a length of ${val.length}.`;
            }
            if (val.length > this.settings.maxLength) {
                return `Value can't be longer than ${this.settings.maxLength} but has a length of ${val.length}.`;
            }
        }
        if (values.length < this.settings.minTags) {
            return `The minimum number of tags is ${this.settings.minTags} but got ${values.length}.`;
        }
        if (values.length > this.settings.maxTags) {
            return `The maximum number of tags is ${this.settings.maxTags} but got ${values.length}.`;
        }
        return true;
    }
    transform(value) {
        return this.getTags(value).filter((val)=>val !== "");
    }
    format(value) {
        return value.join(`, `);
    }
}
export { List as List };
function parseNumber(value) {
    return Number(value);
}
class Number1 extends GenericSuggestions {
    static prompt(options) {
        if (typeof options === "string") {
            options = {
                message: options
            };
        }
        return new this({
            pointer: blue(Figures.POINTER_SMALL),
            prefix: yellow("? "),
            indent: " ",
            listPointer: blue(Figures.POINTER),
            maxRows: 8,
            min: -Infinity,
            max: Infinity,
            float: false,
            round: 2,
            ...options,
            files: false,
            keys: {
                increaseValue: [
                    "up",
                    "u",
                    "+"
                ],
                decreaseValue: [
                    "down",
                    "d",
                    "-"
                ],
                ...options.keys ?? {}
            }
        }).prompt();
    }
    static inject(value) {
        GenericPrompt.inject(value);
    }
    success(value) {
        this.saveSuggestions(value);
        return super.success(value);
    }
    async handleEvent(event) {
        switch(true){
            case this.settings.suggestions && this.isKey(this.settings.keys, "next", event):
                if (this.settings.list) {
                    this.selectPreviousSuggestion();
                } else {
                    this.selectNextSuggestion();
                }
                break;
            case this.settings.suggestions && this.isKey(this.settings.keys, "previous", event):
                if (this.settings.list) {
                    this.selectNextSuggestion();
                } else {
                    this.selectPreviousSuggestion();
                }
                break;
            case this.isKey(this.settings.keys, "increaseValue", event):
                this.increaseValue();
                break;
            case this.isKey(this.settings.keys, "decreaseValue", event):
                this.decreaseValue();
                break;
            default:
                await super.handleEvent(event);
        }
    }
    increaseValue() {
        this.manipulateIndex(false);
    }
    decreaseValue() {
        this.manipulateIndex(true);
    }
    manipulateIndex(decrease) {
        if (this.inputValue[this.inputIndex] === "-") {
            this.inputIndex++;
        }
        if (this.inputValue.length && this.inputIndex > this.inputValue.length - 1) {
            this.inputIndex--;
        }
        const decimalIndex = this.inputValue.indexOf(".");
        const [abs, dec] = this.inputValue.split(".");
        if (dec && this.inputIndex === decimalIndex) {
            this.inputIndex--;
        }
        const inDecimal = decimalIndex !== -1 && this.inputIndex > decimalIndex;
        let value = (inDecimal ? dec : abs) || "0";
        const oldLength = this.inputValue.length;
        const index = inDecimal ? this.inputIndex - decimalIndex - 1 : this.inputIndex;
        const increaseValue = Math.pow(10, value.length - index - 1);
        value = (parseInt(value) + (decrease ? -increaseValue : increaseValue)).toString();
        this.inputValue = !dec ? value : this.inputIndex > decimalIndex ? abs + "." + value : value + "." + dec;
        if (this.inputValue.length > oldLength) {
            this.inputIndex++;
        } else if (this.inputValue.length < oldLength && this.inputValue[this.inputIndex - 1] !== "-") {
            this.inputIndex--;
        }
        this.inputIndex = Math.max(0, Math.min(this.inputIndex, this.inputValue.length - 1));
    }
    addChar(__char) {
        if (isNumeric(__char)) {
            super.addChar(__char);
        } else if (this.settings.float && __char === "." && this.inputValue.indexOf(".") === -1 && (this.inputValue[0] === "-" ? this.inputIndex > 1 : this.inputIndex > 0)) {
            super.addChar(__char);
        }
    }
    validate(value) {
        if (!isNumeric(value)) {
            return false;
        }
        const val = parseFloat(value);
        if (val > this.settings.max) {
            return `Value must be lower or equal than ${this.settings.max}`;
        }
        if (val < this.settings.min) {
            return `Value must be greater or equal than ${this.settings.min}`;
        }
        return true;
    }
    transform(value) {
        const val = parseFloat(value);
        if (this.settings.float) {
            return parseFloat(val.toFixed(this.settings.round));
        }
        return val;
    }
    format(value) {
        return value.toString();
    }
    getValue() {
        return this.inputValue;
    }
}
function isNumeric(value) {
    return typeof value === "number" || !!value && !isNaN(parseNumber(value));
}
export { Number1 as Number };
class Secret extends GenericInput {
    static prompt(options) {
        if (typeof options === "string") {
            options = {
                message: options
            };
        }
        return new this({
            pointer: blue(Figures.POINTER_SMALL),
            prefix: yellow("? "),
            indent: " ",
            label: "Password",
            hidden: false,
            minLength: 0,
            maxLength: Infinity,
            ...options
        }).prompt();
    }
    static inject(value) {
        GenericPrompt.inject(value);
    }
    input() {
        return underline(this.settings.hidden ? "" : "*".repeat(this.inputValue.length));
    }
    read() {
        if (this.settings.hidden) {
            this.tty.cursorHide();
        }
        return super.read();
    }
    validate(value) {
        if (typeof value !== "string") {
            return false;
        }
        if (value.length < this.settings.minLength) {
            return `${this.settings.label} must be longer than ${this.settings.minLength} but has a length of ${value.length}.`;
        }
        if (value.length > this.settings.maxLength) {
            return `${this.settings.label} can't be longer than ${this.settings.maxLength} but has a length of ${value.length}.`;
        }
        return true;
    }
    transform(value) {
        return value;
    }
    format(value) {
        return this.settings.hidden ? "*".repeat(8) : "*".repeat(value.length);
    }
    getValue() {
        return this.inputValue;
    }
}
export { Secret as Secret };
class Select extends GenericList {
    listIndex = this.getListIndex(this.settings.default);
    static inject(value) {
        GenericPrompt.inject(value);
    }
    static prompt(options) {
        return new this({
            pointer: blue(Figures.POINTER_SMALL),
            prefix: yellow("? "),
            indent: " ",
            listPointer: blue(Figures.POINTER),
            maxRows: 10,
            searchLabel: blue(Figures.SEARCH),
            ...options,
            options: Select.mapOptions(options)
        }).prompt();
    }
    static mapOptions(options) {
        return options.options.map((item)=>typeof item === "string" ? {
                value: item
            } : item).map((item)=>this.mapOption(item));
    }
    input() {
        return underline(blue(this.inputValue));
    }
    getListItem(item, isSelected) {
        let line = this.settings.indent;
        line += isSelected ? `${this.settings.listPointer} ` : "  ";
        line += `${isSelected && !item.disabled ? this.highlight(item.name, (val)=>val) : this.highlight(item.name)}`;
        return line;
    }
    getValue() {
        return this.options[this.listIndex]?.value ?? this.settings.default;
    }
    validate(value) {
        return typeof value === "string" && value.length > 0 && this.options.findIndex((option)=>option.value === value) !== -1;
    }
    transform(value) {
        return value.trim();
    }
    format(value) {
        return this.getOptionByValue(value)?.name ?? value;
    }
}
export { Select as Select };
class Toggle extends GenericPrompt {
    status = typeof this.settings.default !== "undefined" ? this.format(this.settings.default) : "";
    static prompt(options) {
        if (typeof options === "string") {
            options = {
                message: options
            };
        }
        return new this({
            pointer: blue(Figures.POINTER_SMALL),
            prefix: yellow("? "),
            indent: " ",
            active: "Yes",
            inactive: "No",
            ...options,
            keys: {
                active: [
                    "right",
                    "y",
                    "j",
                    "s",
                    "o"
                ],
                inactive: [
                    "left",
                    "n"
                ],
                ...options.keys ?? {}
            }
        }).prompt();
    }
    message() {
        let message = super.message() + " " + this.settings.pointer + " ";
        if (this.status === this.settings.active) {
            message += dim(this.settings.inactive + " / ") + underline(this.settings.active);
        } else if (this.status === this.settings.inactive) {
            message += underline(this.settings.inactive) + dim(" / " + this.settings.active);
        } else {
            message += dim(this.settings.inactive + " / " + this.settings.active);
        }
        return message;
    }
    read() {
        this.tty.cursorHide();
        return super.read();
    }
    async handleEvent(event) {
        switch(true){
            case event.sequence === this.settings.inactive[0].toLowerCase():
            case this.isKey(this.settings.keys, "inactive", event):
                this.selectInactive();
                break;
            case event.sequence === this.settings.active[0].toLowerCase():
            case this.isKey(this.settings.keys, "active", event):
                this.selectActive();
                break;
            default:
                await super.handleEvent(event);
        }
    }
    selectActive() {
        this.status = this.settings.active;
    }
    selectInactive() {
        this.status = this.settings.inactive;
    }
    validate(value) {
        return [
            this.settings.active,
            this.settings.inactive
        ].indexOf(value) !== -1;
    }
    transform(value) {
        switch(value){
            case this.settings.active:
                return true;
            case this.settings.inactive:
                return false;
        }
    }
    format(value) {
        return value ? this.settings.active : this.settings.inactive;
    }
    getValue() {
        return this.status;
    }
}
export { Toggle as Toggle };
function prompt(prompts, options) {
    return new PromptList(prompts, options).run(options?.initial);
}
let injected = {};
function inject(values) {
    injected = values;
}
class PromptList {
    prompts;
    options;
    result;
    index;
    names;
    isInBeforeHook;
    get prompt() {
        return this.prompts[this.index];
    }
    constructor(prompts, options){
        this.prompts = prompts;
        this.options = options;
        this.result = {};
        this.index = -1;
        this.isInBeforeHook = false;
        this.names = this.prompts.map((prompt)=>prompt.name);
    }
    async run(name) {
        this.index = -1;
        this.result = {};
        this.isInBeforeHook = false;
        await this.next(name);
        return this.result;
    }
    async next(name) {
        if (this.updateIndex(name)) {
            await this.runBeforeHook(async ()=>{
                this.isInBeforeHook = false;
                await this.runPrompt();
                await this.runAfterHook();
            });
        }
    }
    updateIndex(name) {
        if (name && typeof name === "string") {
            this.index = this.names.indexOf(name);
            if (this.index === -1) {
                throw new Error(`Invalid prompt name: ${name}, allowed prompt names: ${this.names.join(", ")}`);
            }
        } else if (typeof name === "number") {
            if (name < 0 || name > this.names.length) {
                throw new Error(`Invalid prompt index: ${name}, prompt length: ${this.names.length}`);
            }
            this.index = name;
        } else if (name === true && !this.isInBeforeHook) {
            this.index++;
            if (this.index < this.names.length - 1) {
                this.index++;
            }
        } else {
            this.index++;
        }
        this.isInBeforeHook = false;
        if (this.index < this.names.length) {
            return true;
        } else if (this.index === this.names.length) {
            return false;
        } else {
            throw new Error("next() called multiple times");
        }
    }
    async runBeforeHook(run) {
        this.isInBeforeHook = true;
        const next = async (name)=>{
            if (name || typeof name === "number") {
                return this.next(name);
            }
            await run();
        };
        if (this.options?.before) {
            await this.options.before(this.prompt.name, this.result, async (name)=>{
                if (name || typeof name === "number") {
                    return this.next(name);
                } else if (this.prompt.before) {
                    await this.prompt.before(this.result, next);
                } else {
                    await run();
                }
            });
            return;
        } else if (this.prompt.before) {
            await this.prompt.before(this.result, next);
            return;
        }
        await run();
    }
    async runPrompt() {
        const prompt = this.prompt.type;
        if (typeof injected[this.prompt.name] !== "undefined") {
            if (prompt.inject) {
                prompt.inject(injected[this.prompt.name]);
            } else {
                GenericPrompt.inject(injected[this.prompt.name]);
            }
        }
        try {
            this.result[this.prompt.name] = await prompt.prompt({
                cbreak: this.options?.cbreak,
                ...this.prompt
            });
        } finally{
            tty.cursorShow();
        }
    }
    async runAfterHook() {
        if (this.options?.after) {
            await this.options.after(this.prompt.name, this.result, async (name)=>{
                if (name) {
                    return this.next(name);
                } else if (this.prompt.after) {
                    await this.prompt.after(this.result, (name)=>this.next(name));
                } else {
                    await this.next();
                }
            });
        } else if (this.prompt.after) {
            await this.prompt.after(this.result, (name)=>this.next(name));
        } else {
            await this.next();
        }
    }
}
export { prompt as prompt };
export { inject as inject };
