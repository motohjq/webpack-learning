const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');
const crypto = require('crypto');
const inputCSS = `
:local(.background){
    background-color: green;
}
`;
function generateScopedName(name) {
    const hash = crypto.createHash('md4').update(name).digest('hex');
    return `_${hash}__${name}`;
}
const plugin = () => {
    return {
        postcssPlugin: 'module-scope',
        Once(root, { rule }) {
            const exports = Object.create(null);
            function exportScopeName(name) {
                const scopedName = generateScopedName(name);
                exports[name] = scopedName;
                return scopedName;
            }
            function localizeNode(node) {
                switch (node.type) {
                    case 'selector':
                        node.nodes = node.map(localizeNode)
                        return node;
                    case 'class':
                        //生成一个新的类名选择器
                        return selectorParser.className({
                            value: exportScopeName(node.value)
                        })
                }
            }
            function traverseNode(node) {
                switch (node.type) {
                    case 'root':
                    case 'selector':
                        node.each(traverseNode);
                        break;
                    case 'pseudo':
                        if (node.value === ':local') {
                            const localSelector = localizeNode(node.first);
                            node.replaceWith(localSelector);
                        }
                        break;
                }
                return node;
            }
            //遍历根节点下的所有的规则进行处理
            root.walkRules(rule => {
                const parsedSelector = selectorParser().astSync(rule);
                rule.selector = traverseNode(parsedSelector.clone()).toString();
            });
            const exportedNames = Object.keys(exports);
            if (exportedNames.length > 0) {
                const exportRule = rule({
                    selector: ':export'
                });
                exportedNames.forEach(exportedName => {
                    exportRule.append({
                        prop: exportedName,
                        value: exports[exportedName],
                        raw: { before: '\n' }
                    });
                });
                root.append(exportRule);
            }
        }
    }
}
plugin.postcss = true;
const result = postcss([plugin()]).process(inputCSS);
console.log(result.css);