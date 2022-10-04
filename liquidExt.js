/*
 * Based on liquidjs@9.37.0, https://github.com/harttle/liquidjs
 */

const liquidjs = require('liquidjs');

module.exports = {
    __generator: function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    },
    assert: function (predicate, message) {
        if (!predicate) {
            var msg = typeof message === 'function'
                ? message()
                : (message || "expect ".concat(predicate, " to be true"));
            throw new liquidjs.AssertionError(msg);
        }
    },
    tags: {
        /**
         * Extends the include tag by adding all parameters to the render context. 
         * This allows included templates to check if an optional parameter is set.
         */
        includeWithParams: function (liquidEngine) {
            return {
                ...liquidEngine.tags.impls.include,
                parse: function (token) {
                    var args = token.args;
                    var tokenizer = new liquidjs.Tokenizer(args, liquidEngine.options.operatorsTrie);
                    this['file'] = this.parseFilePath(tokenizer, liquidEngine);
                    this['currentFile'] = token.file;
                    var begin = tokenizer.p;
                    var withStr = tokenizer.readIdentifier();
                    if (withStr.content === 'with') {
                        tokenizer.skipBlank();
                        if (tokenizer.peek() !== ':') {
                            this.withVar = tokenizer.readValue();
                        }
                        else
                            tokenizer.p = begin;
                    }
                    else
                        tokenizer.p = begin;
                    this.hashString = tokenizer.remaining();
                    this.hash = new liquidjs.Hash(this.hashString, liquidEngine.options.jekyllInclude);
                },
                render: function (ctx, emitter) {
                    const paramHash = new liquidjs.Hash(this.hashString, liquidEngine.options.jekyllInclude);
                    const rendered = paramHash.render(ctx);
                    const params = Object.fromEntries(
                        Object.entries(paramHash.hash).map(param => {
                            const key = param[0];
                            const token = rendered.next(param[1].begin)
                            const value = token.value;
                            return [key, value];
                        }));
                    ctx.environments.params = params;

                    var _a, liquid, hash, withVar, renderer, filepath, saved, scope, templates;
                    return module.exports.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this, liquid = _a.liquid, hash = _a.hash, withVar = _a.withVar;
                                renderer = liquid.renderer;
                                return [4 /*yield*/, this.renderFilePath(this['file'], ctx, liquid)];
                            case 1:
                                filepath = _b.sent();
                                module.exports.assert(filepath, function () { return "illegal filename \"".concat(filepath, "\""); });
                                saved = ctx.saveRegister('blocks', 'blockMode');
                                ctx.setRegister('blocks', {});
                                ctx.setRegister('blockMode', "OUTPUT");
                                return [4 /*yield*/, hash.render(ctx)];
                            case 2:
                                scope = _b.sent();
                                if (withVar)
                                    scope[filepath] = evalToken(withVar, ctx);
                                return [4 /*yield*/, liquid._parsePartialFile(filepath, ctx.sync, this['currentFile'])];
                            case 3:
                                templates = _b.sent();
                                ctx.push(ctx.opts.jekyllInclude ? { include: scope } : scope);
                                return [4 /*yield*/, renderer.renderTemplates(templates, ctx, emitter)];
                            case 4:
                                _b.sent();
                                ctx.pop();
                                ctx.restoreRegister(saved);
                                return [2 /*return*/];
                        }
                    });
                }
            };
        }
    }
};
