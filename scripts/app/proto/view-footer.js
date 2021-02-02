var _ = require('lodash/collection');
exports.bindings = {
    protoList: false,
    totalList: true
};
exports.components = [{
    id: 'pagerbox',
    name: 'pager',
    options: {
        model: 'protoList', total: 'totalList'
    }
}];