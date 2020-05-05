'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Streak = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['pipelines/', ''], ['pipelines/', '']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/boxes'], ['pipelines/', '/boxes']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/boxes?stageKey=', ''], ['pipelines/', '/boxes?stageKey=', '']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/webhooks'], ['pipelines/', '/webhooks']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/newsfeed'], ['pipelines/', '/newsfeed']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/stages'], ['pipelines/', '/stages']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/stages/', ''], ['pipelines/', '/stages/', '']),
    _templateObject8 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/fields'], ['pipelines/', '/fields']),
    _templateObject9 = (0, _taggedTemplateLiteral3.default)(['pipelines/', '/fields/', ''], ['pipelines/', '/fields/', '']),
    _templateObject10 = (0, _taggedTemplateLiteral3.default)(['boxes/', ''], ['boxes/', '']),
    _templateObject11 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/fields'], ['boxes/', '/fields']),
    _templateObject12 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/reminders'], ['boxes/', '/reminders']),
    _templateObject13 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/comments'], ['boxes/', '/comments']),
    _templateObject14 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/files'], ['boxes/', '/files']),
    _templateObject15 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/threads'], ['boxes/', '/threads']),
    _templateObject16 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/newsfeed'], ['boxes/', '/newsfeed']),
    _templateObject17 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/tasks'], ['boxes/', '/tasks']),
    _templateObject18 = (0, _taggedTemplateLiteral3.default)(['boxes/', '/fields/', ''], ['boxes/', '/fields/', '']),
    _templateObject19 = (0, _taggedTemplateLiteral3.default)(['files/', ''], ['files/', '']),
    _templateObject20 = (0, _taggedTemplateLiteral3.default)(['files/', '/contents'], ['files/', '/contents']),
    _templateObject21 = (0, _taggedTemplateLiteral3.default)(['threads/', ''], ['threads/', '']),
    _templateObject22 = (0, _taggedTemplateLiteral3.default)(['tasks/', ''], ['tasks/', '']),
    _templateObject23 = (0, _taggedTemplateLiteral3.default)(['contacts/', ''], ['contacts/', '']),
    _templateObject24 = (0, _taggedTemplateLiteral3.default)(['teams/', '/contacts'], ['teams/', '/contacts']),
    _templateObject25 = (0, _taggedTemplateLiteral3.default)(['webhooks/', ''], ['webhooks/', '']),
    _templateObject26 = (0, _taggedTemplateLiteral3.default)(['webhooks?pipelineKey=', ''], ['webhooks?pipelineKey=', '']),
    _templateObject27 = (0, _taggedTemplateLiteral3.default)(['search?query=', ''], ['search?query=', '']);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _autoEncodeUri = require('./auto-encode-uri');

var _autoEncodeUri2 = _interopRequireDefault(_autoEncodeUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConnHelper = function () {
  function ConnHelper(authKey) {
    (0, _classCallCheck3.default)(this, ConnHelper);

    this._authKey = authKey;
  }

  (0, _createClass3.default)(ConnHelper, [{
    key: '_getRequestOptions',
    value: function _getRequestOptions(method, path) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'utf8';

      // By default we request the V1 of the API
      var prefix = '/api/v1/';

      // If the requested resource is a Task or Contact, then use the V2 of the API
      if (path.indexOf('comments') > -1 || path.indexOf('contacts') > -1 || path.indexOf('webhooks') > -1 || path.indexOf('tasks') > -1 || path.indexOf('teams') > -1) prefix = '/api/v2/';

      return {
        method: method, headers: headers, encoding: encoding,
        host: 'mailfoogae.appspot.com',
        path: prefix + path,
        auth: this._authKey
      };
    }
  }, {
    key: '_parseResponse',
    value: function _parseResponse(response) {
      return new _promise2.default(function (resolve, reject) {
        var strs = [];
        response.on('data', function (chunk) {
          strs.push(chunk);
        });
        response.on('end', function () {
          try {
            var str = strs.join('');
            if (response.statusCode === 200) {
              resolve(JSON.parse(str));
            } else {
              var json = void 0;
              var errorMessage = 'Response code ' + response.statusCode;
              try {
                json = JSON.parse(str);
                if (json && json.error) {
                  errorMessage = json.error;
                }
              } catch (err) {
                // Ignore parse error
              }
              reject((0, _assign2.default)(new Error(errorMessage), {
                str: str, json: json,
                statusCode: response.statusCode,
                headers: response.headers
              }));
            }
          } catch (err) {
            reject(err);
          }
        });
        response.on('error', reject);
      });
    }
  }, {
    key: '_plainResponse',
    value: function _plainResponse(response) {
      return new _promise2.default(function (resolve, reject) {
        var chunks = [];
        response.on('data', function (chunk) {
          chunks.push(chunk);
        });
        response.on('end', function () {
          try {
            var buf = Buffer.concat(chunks);
            if (response.statusCode === 200) {
              resolve(buf);
            } else {
              var errorMessage = 'Response code ' + response.statusCode;
              reject((0, _assign2.default)(new Error(errorMessage), {
                buf: buf,
                statusCode: response.statusCode,
                headers: response.headers
              }));
            }
          } catch (err) {
            reject(err);
          }
        });
        response.on('error', reject);
      });
    }
  }, {
    key: 'get',
    value: function get(path) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var opts = _this._getRequestOptions('GET', path);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this._parseResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'getNoParse',
    value: function getNoParse(path) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        var opts = _this2._getRequestOptions('GET', path, undefined, null);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this2._plainResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'put',
    value: function put(path, data) {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        var dstr = _querystring2.default.stringify(data);
        var opts = _this3._getRequestOptions('PUT', path + '?' + dstr);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this3._parseResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'delete',
    value: function _delete(path) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        var opts = _this4._getRequestOptions('DELETE', path);
        var request = _https2.default.request(opts, function (res) {
          resolve(_this4._parseResponse(res));
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'post',
    value: function post(path, data) {
      var _this5 = this;

      return new _promise2.default(function (resolve, reject) {
        var send = _querystring2.default.stringify({ json: (0, _stringify2.default)(data) });
        var opts = _this5._getRequestOptions('POST', path, {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': send.length
        });
        var request = _https2.default.request(opts, function (res) {
          resolve(_this5._parseResponse(res));
        });
        request.write(send);
        request.on('error', reject);
        request.end();
      });
    }
  }]);
  return ConnHelper;
}();

var Me = function () {
  function Me(s, c) {
    (0, _classCallCheck3.default)(this, Me);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Me, [{
    key: 'getMe',
    value: function getMe() {
      return this._c.get('users/me');
    }
  }, {
    key: 'getMyTeams',
    value: function getMyTeams() {
      return this._c.get('users/me/teams');
    }
  }]);
  return Me;
}();

var Pipelines = function () {
  function Pipelines(s, c) {
    (0, _classCallCheck3.default)(this, Pipelines);

    this._s = s;
    this._c = c;
    this.Stages = new PipelineStages(s, c);
    this.Fields = new PipelineFields(s, c);
  }

  (0, _createClass3.default)(Pipelines, [{
    key: 'getAll',
    value: function getAll() {
      return this._c.get('pipelines');
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject, key));
    }
  }, {
    key: 'getBoxes',
    value: function getBoxes(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject2, key));
    }
  }, {
    key: 'getBoxesInStage',
    value: function getBoxesInStage(key, stageKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject3, key, stageKey));
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this._c.put('pipelines', data);
    }
  }, {
    key: 'getWebhooks',
    value: function getWebhooks(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject4, key));
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject, key));
    }
  }, {
    key: 'update',
    value: function update(data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject, data.key), data);
    }
  }, {
    key: 'getFeed',
    value: function getFeed(key, detailLevel) {
      var qs = '';
      if (detailLevel) {
        qs += '?' + _querystring2.default.stringify({ detailLevel: detailLevel });
      }
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject5, key) + qs);
    }
  }]);
  return Pipelines;
}();

var PipelineStages = function () {
  function PipelineStages(s, c) {
    (0, _classCallCheck3.default)(this, PipelineStages);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(PipelineStages, [{
    key: 'getAll',
    value: function getAll(pipeKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject6, pipeKey));
    }
  }, {
    key: 'getOne',
    value: function getOne(pipeKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject7, pipeKey, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject6, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(pipeKey, key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject7, pipeKey, key));
    }
  }, {
    key: 'update',
    value: function update(pipeKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject7, pipeKey, data.key), data);
    }
  }]);
  return PipelineStages;
}();

var PipelineFields = function () {
  function PipelineFields(s, c) {
    (0, _classCallCheck3.default)(this, PipelineFields);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(PipelineFields, [{
    key: 'getAll',
    value: function getAll(pipeKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject8, pipeKey));
    }
  }, {
    key: 'getOne',
    value: function getOne(pipeKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject9, pipeKey, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject8, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(pipeKey, key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject9, pipeKey, key));
    }
  }, {
    key: 'update',
    value: function update(pipeKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject9, pipeKey, data.key), data);
    }
  }]);
  return PipelineFields;
}();

var Boxes = function () {
  function Boxes(s, c) {
    (0, _classCallCheck3.default)(this, Boxes);

    this._s = s;
    this._c = c;
    this.Fields = new BoxFields(s, c);
  }

  (0, _createClass3.default)(Boxes, [{
    key: 'getAll',
    value: function getAll() {
      return this._c.get('boxes');
    }
  }, {
    key: 'getForPipeline',
    value: function getForPipeline(key) {
      return this._s.Pipelines.getBoxes(key);
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject10, key));
    }
  }, {
    key: 'create',
    value: function create(pipeKey, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject2, pipeKey), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject10, key));
    }
  }, {
    key: 'update',
    value: function update(data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject10, data.key), data);
    }
  }, {
    key: 'getFields',
    value: function getFields(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject11, key));
    }
  }, {
    key: 'getReminders',
    value: function getReminders(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject12, key));
    }
  }, {
    key: 'getComments',
    value: function getComments(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject13, key));
    }
    // deprecated method

  }, {
    key: 'createComment',
    value: function createComment(key, data) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject13, key), data);
    }
  }, {
    key: 'postComment',
    value: function postComment(key, message) {
      return this._c.put((0, _autoEncodeUri2.default)(_templateObject13, key), { message: message });
    }
  }, {
    key: 'getFiles',
    value: function getFiles(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject14, key));
    }
  }, {
    key: 'getThreads',
    value: function getThreads(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject15, key));
    }
  }, {
    key: 'getFeed',
    value: function getFeed(key, detailLevel) {
      var qs = '';
      if (detailLevel) {
        qs += '?' + _querystring2.default.stringify({ detailLevel: detailLevel });
      }
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject16, key) + qs);
    }
  }, {
    key: 'getTasks',
    value: function getTasks(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject17, key));
    }
  }]);
  return Boxes;
}();

var BoxFields = function () {
  function BoxFields(s, c) {
    (0, _classCallCheck3.default)(this, BoxFields);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(BoxFields, [{
    key: 'getForBox',
    value: function getForBox(key) {
      return this._s.Boxes.getFields(key);
    }
  }, {
    key: 'getOne',
    value: function getOne(boxKey, key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject18, boxKey, key));
    }
  }, {
    key: 'update',
    value: function update(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject18, boxKey, data.key), data);
    }
  }]);
  return BoxFields;
}();

var Files = function () {
  function Files(s, c) {
    (0, _classCallCheck3.default)(this, Files);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Files, [{
    key: 'getForBox',
    value: function getForBox(key) {
      return this._s.Boxes.getFiles(key);
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject19, key));
    }
  }, {
    key: 'getContents',
    value: function getContents(key) {
      return this._c.getNoParse((0, _autoEncodeUri2.default)(_templateObject20, key));
    }
  }]);
  return Files;
}();

var Threads = function () {
  function Threads(s, c) {
    (0, _classCallCheck3.default)(this, Threads);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Threads, [{
    key: 'getForBox',
    value: function getForBox(boxKey) {
      return this._s.Boxes.getThreads(boxKey);
    }
  }, {
    key: 'getOne',
    value: function getOne(threadKey) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject21, threadKey));
    }
  }]);
  return Threads;
}();

var Tasks = function () {
  function Tasks(s, c) {
    (0, _classCallCheck3.default)(this, Tasks);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Tasks, [{
    key: 'getForBox',
    value: function getForBox(boxKey) {
      return this._s.Boxes.getTasks(boxKey);
    }
  }, {
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject22, key));
    }
  }, {
    key: 'create',
    value: function create(boxKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject17, boxKey), data);
    }
  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject22, key), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject22, key));
    }
  }]);
  return Tasks;
}();

var Contacts = function () {
  function Contacts(s, c) {
    (0, _classCallCheck3.default)(this, Contacts);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Contacts, [{
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject23, key));
    }
  }, {
    key: 'create',
    value: function create(teamKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject24, teamKey), data);
    }
  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject23, key), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject23, key));
    }
  }]);
  return Contacts;
}();

var Webhooks = function () {
  function Webhooks(s, c) {
    (0, _classCallCheck3.default)(this, Webhooks);

    this._s = s;
    this._c = c;
  }

  (0, _createClass3.default)(Webhooks, [{
    key: 'getOne',
    value: function getOne(key) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject25, key));
    }
  }, {
    key: 'create',
    value: function create(pipelineKey, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject26, pipelineKey), data);
    }
  }, {
    key: 'update',
    value: function update(key, data) {
      return this._c.post((0, _autoEncodeUri2.default)(_templateObject25, key), data);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this._c.delete((0, _autoEncodeUri2.default)(_templateObject25, key));
    }
  }]);
  return Webhooks;
}();

var Streak = exports.Streak = function () {
  function Streak(authKey) {
    (0, _classCallCheck3.default)(this, Streak);

    this._c = new ConnHelper(authKey);
    this.Me = new Me(this, this._c);
    this.Pipelines = new Pipelines(this, this._c);
    this.Boxes = new Boxes(this, this._c);
    this.Files = new Files(this, this._c);
    this.Threads = new Threads(this, this._c);
    this.Tasks = new Tasks(this, this._c);
    this.Contacts = new Contacts(this, this._c);
    this.Webhooks = new Webhooks(this, this._c);
  }

  (0, _createClass3.default)(Streak, [{
    key: 'search',
    value: function search(query) {
      return this._c.get((0, _autoEncodeUri2.default)(_templateObject27, query));
    }
  }]);
  return Streak;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDb25uSGVscGVyIiwiYXV0aEtleSIsIl9hdXRoS2V5IiwibWV0aG9kIiwicGF0aCIsImhlYWRlcnMiLCJlbmNvZGluZyIsInByZWZpeCIsImluZGV4T2YiLCJob3N0IiwiYXV0aCIsInJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0cnMiLCJvbiIsImNodW5rIiwicHVzaCIsInN0ciIsImpvaW4iLCJzdGF0dXNDb2RlIiwiSlNPTiIsInBhcnNlIiwianNvbiIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiZXJyIiwiRXJyb3IiLCJjaHVua3MiLCJidWYiLCJCdWZmZXIiLCJjb25jYXQiLCJvcHRzIiwiX2dldFJlcXVlc3RPcHRpb25zIiwicmVxdWVzdCIsImh0dHBzIiwiX3BhcnNlUmVzcG9uc2UiLCJyZXMiLCJlbmQiLCJ1bmRlZmluZWQiLCJfcGxhaW5SZXNwb25zZSIsImRhdGEiLCJkc3RyIiwicXVlcnlzdHJpbmciLCJzdHJpbmdpZnkiLCJzZW5kIiwibGVuZ3RoIiwid3JpdGUiLCJNZSIsInMiLCJjIiwiX3MiLCJfYyIsImdldCIsIlBpcGVsaW5lcyIsIlN0YWdlcyIsIlBpcGVsaW5lU3RhZ2VzIiwiRmllbGRzIiwiUGlwZWxpbmVGaWVsZHMiLCJrZXkiLCJhZXUiLCJzdGFnZUtleSIsInB1dCIsImRlbGV0ZSIsInBvc3QiLCJkZXRhaWxMZXZlbCIsInFzIiwicGlwZUtleSIsIkJveGVzIiwiQm94RmllbGRzIiwiZ2V0Qm94ZXMiLCJtZXNzYWdlIiwiZ2V0RmllbGRzIiwiYm94S2V5IiwiRmlsZXMiLCJnZXRGaWxlcyIsImdldE5vUGFyc2UiLCJUaHJlYWRzIiwiZ2V0VGhyZWFkcyIsInRocmVhZEtleSIsIlRhc2tzIiwiZ2V0VGFza3MiLCJDb250YWN0cyIsInRlYW1LZXkiLCJXZWJob29rcyIsInBpcGVsaW5lS2V5IiwiU3RyZWFrIiwicXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7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Q0FBYSxJQUFiLEVBQW1CLEtBQUtoQyxFQUF4QixDQUFoQjtBQUNEOzs7OzJCQUVNbUMsSyxFQUFnQztBQUNyQyxhQUFPLEtBQUtuQyxFQUFMLENBQVFDLEdBQVIsS0FBWU8sdUJBQVoscUJBQWdDMkIsS0FBaEMsRUFBUDtBQUNEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5cbmltcG9ydCBhZXUgZnJvbSAnLi9hdXRvLWVuY29kZS11cmknO1xuXG5jbGFzcyBDb25uSGVscGVyIHtcbiAgX2F1dGhLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihhdXRoS2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hdXRoS2V5ID0gYXV0aEtleTtcbiAgfVxuXG4gIF9nZXRSZXF1ZXN0T3B0aW9ucyhtZXRob2Q6IHN0cmluZywgcGF0aDogc3RyaW5nLCBoZWFkZXJzOiBPYmplY3Q9e30sIGVuY29kaW5nOiA/c3RyaW5nPSd1dGY4Jyk6IE9iamVjdCB7XG4gICAgLy8gQnkgZGVmYXVsdCB3ZSByZXF1ZXN0IHRoZSBWMSBvZiB0aGUgQVBJXG4gICAgbGV0IHByZWZpeCA9ICcvYXBpL3YxLyc7XG5cbiAgICAvLyBJZiB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGlzIGEgVGFzayBvciBDb250YWN0LCB0aGVuIHVzZSB0aGUgVjIgb2YgdGhlIEFQSVxuICAgIGlmIChwYXRoLmluZGV4T2YoJ2NvbW1lbnRzJykgPiAtMSB8fCBwYXRoLmluZGV4T2YoJ2NvbnRhY3RzJykgPiAtMSB8fCBwYXRoLmluZGV4T2YoJ3dlYmhvb2tzJykgPiAtMSB8fCBwYXRoLmluZGV4T2YoJ3Rhc2tzJykgPiAtMSB8fCBwYXRoLmluZGV4T2YoJ3RlYW1zJykgPiAtMSkgcHJlZml4ID0gJy9hcGkvdjIvJztcblxuICAgIHJldHVybiB7XG4gICAgICBtZXRob2QsIGhlYWRlcnMsIGVuY29kaW5nLFxuICAgICAgaG9zdDogJ21haWxmb29nYWUuYXBwc3BvdC5jb20nLFxuICAgICAgcGF0aDogcHJlZml4ICsgcGF0aCxcbiAgICAgIGF1dGg6IHRoaXMuX2F1dGhLZXlcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUmVzcG9uc2UocmVzcG9uc2U6IGh0dHBzLkluY29taW5nTWVzc2FnZSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHN0cnM6IHN0cmluZ1tdID0gW107XG4gICAgICByZXNwb25zZS5vbignZGF0YScsIChjaHVuazogc3RyaW5nKSA9PiB7XG4gICAgICAgIHN0cnMucHVzaChjaHVuayk7XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc3RyID0gc3Rycy5qb2luKCcnKTtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2Uoc3RyKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBqc29uO1xuICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGBSZXNwb25zZSBjb2RlICR7cmVzcG9uc2Uuc3RhdHVzQ29kZX1gO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAganNvbiA9IEpTT04ucGFyc2Uoc3RyKTtcbiAgICAgICAgICAgICAgaWYgKGpzb24gJiYganNvbi5lcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGpzb24uZXJyb3I7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAvLyBJZ25vcmUgcGFyc2UgZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdChPYmplY3QuYXNzaWduKChuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTogT2JqZWN0KSwge1xuICAgICAgICAgICAgICBzdHIsIGpzb24sXG4gICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnNcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuICBfcGxhaW5SZXNwb25zZShyZXNwb25zZTogaHR0cHMuSW5jb21pbmdNZXNzYWdlKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFtdO1xuICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICB9KTtcbiAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgYnVmID0gQnVmZmVyLmNvbmNhdChjaHVua3MpO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoYnVmKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFJlc3BvbnNlIGNvZGUgJHtyZXNwb25zZS5zdGF0dXNDb2RlfWA7XG4gICAgICAgICAgICByZWplY3QoT2JqZWN0LmFzc2lnbigobmV3IEVycm9yKGVycm9yTWVzc2FnZSk6IE9iamVjdCksIHtcbiAgICAgICAgICAgICAgYnVmLFxuICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZXJyb3InLCByZWplY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KHBhdGg6IHN0cmluZyk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnR0VUJywgcGF0aCk7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRzLCByZXMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuX3BhcnNlUmVzcG9uc2UocmVzKSk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXROb1BhcnNlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnR0VUJywgcGF0aCwgdW5kZWZpbmVkLCBudWxsKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGxhaW5SZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1dChwYXRoOiBzdHJpbmcsIGRhdGE6IE9iamVjdCk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGRzdHIgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ1BVVCcsIHBhdGggKyAnPycgKyBkc3RyKTtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdHMsIHJlcyA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5fcGFyc2VSZXNwb25zZShyZXMpKTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMoJ0RFTEVURScsIHBhdGgpO1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Qob3B0cywgcmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcykpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcG9zdChwYXRoOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHNlbmQgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoe2pzb246SlNPTi5zdHJpbmdpZnkoZGF0YSl9KTtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9nZXRSZXF1ZXN0T3B0aW9ucygnUE9TVCcsIHBhdGgsIHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgICAnQ29udGVudC1MZW5ndGgnOiBzZW5kLmxlbmd0aFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRzLCByZXMgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuX3BhcnNlUmVzcG9uc2UocmVzKSk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Qud3JpdGUoc2VuZCk7XG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIE1lIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldE1lKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgndXNlcnMvbWUnKTtcbiAgfVxuICBnZXRNeVRlYW1zKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgndXNlcnMvbWUvdGVhbXMnKTtcbiAgfVxufVxuXG5jbGFzcyBQaXBlbGluZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgU3RhZ2VzOiBQaXBlbGluZVN0YWdlcztcbiAgRmllbGRzOiBQaXBlbGluZUZpZWxkcztcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gICAgdGhpcy5TdGFnZXMgPSBuZXcgUGlwZWxpbmVTdGFnZXMocywgYyk7XG4gICAgdGhpcy5GaWVsZHMgPSBuZXcgUGlwZWxpbmVGaWVsZHMocywgYyk7XG4gIH1cbiAgZ2V0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgncGlwZWxpbmVzJyk7XG4gIH1cbiAgZ2V0T25lKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7a2V5fWApO1xuICB9XG4gIGdldEJveGVzKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7a2V5fS9ib3hlc2ApO1xuICB9XG4gIGdldEJveGVzSW5TdGFnZSAoa2V5OiBzdHJpbmcsIHN0YWdlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtrZXl9L2JveGVzP3N0YWdlS2V5PSR7c3RhZ2VLZXl9YCk7XG4gIH1cbiAgY3JlYXRlKGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dCgncGlwZWxpbmVzJywgZGF0YSk7XG4gIH1cbiAgZ2V0V2ViaG9va3Moa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtrZXl9L3dlYmhvb2tzYCk7XG4gIH1cbiAgZGVsZXRlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgcGlwZWxpbmVzLyR7a2V5fWApO1xuICB9XG4gIHVwZGF0ZShkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgcGlwZWxpbmVzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbiAgZ2V0RmVlZChrZXk6IHN0cmluZywgZGV0YWlsTGV2ZWw6ID9zdHJpbmcpIHtcbiAgICBsZXQgcXMgPSAnJztcbiAgICBpZiAoZGV0YWlsTGV2ZWwpIHtcbiAgICAgIHFzICs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7ZGV0YWlsTGV2ZWx9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7a2V5fS9uZXdzZmVlZGAgKyBxcyk7XG4gIH1cbn1cblxuY2xhc3MgUGlwZWxpbmVTdGFnZXMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0QWxsKHBpcGVLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlc2ApO1xuICB9XG4gIGdldE9uZShwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzLyR7a2V5fWApO1xuICB9XG4gIGNyZWF0ZShwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnB1dChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L3N0YWdlc2AsIGRhdGEpO1xuICB9XG4gIGRlbGV0ZShwaXBlS2V5OiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vc3RhZ2VzLyR7a2V5fWApO1xuICB9XG4gIHVwZGF0ZShwaXBlS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9zdGFnZXMvJHtkYXRhLmtleX1gLCBkYXRhKTtcbiAgfVxufVxuXG5jbGFzcyBQaXBlbGluZUZpZWxkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXRBbGwocGlwZUtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzYCk7XG4gIH1cbiAgZ2V0T25lKHBpcGVLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cbiAgY3JlYXRlKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vZmllbGRzYCwgZGF0YSk7XG4gIH1cbiAgZGVsZXRlKHBpcGVLZXk6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5kZWxldGUoYWV1IGBwaXBlbGluZXMvJHtwaXBlS2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cbiAgdXBkYXRlKHBpcGVLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYHBpcGVsaW5lcy8ke3BpcGVLZXl9L2ZpZWxkcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIEJveGVzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIEZpZWxkczogQm94RmllbGRzO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgICB0aGlzLkZpZWxkcyA9IG5ldyBCb3hGaWVsZHMocywgYyk7XG4gIH1cbiAgZ2V0QWxsKCkge1xuICAgIHJldHVybiB0aGlzLl9jLmdldCgnYm94ZXMnKTtcbiAgfVxuICBnZXRGb3JQaXBlbGluZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLlBpcGVsaW5lcy5nZXRCb3hlcyhrZXkpO1xuICB9XG4gIGdldE9uZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fWApO1xuICB9XG4gIGNyZWF0ZShwaXBlS2V5LCBkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldSBgcGlwZWxpbmVzLyR7cGlwZUtleX0vYm94ZXNgLCBkYXRhKTtcbiAgfVxuICBkZWxldGUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5kZWxldGUoYWV1IGBib3hlcy8ke2tleX1gKTtcbiAgfVxuICB1cGRhdGUoZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYGJveGVzLyR7ZGF0YS5rZXl9YCwgZGF0YSk7XG4gIH1cbiAgZ2V0RmllbGRzKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgYm94ZXMvJHtrZXl9L2ZpZWxkc2ApO1xuICB9XG4gIGdldFJlbWluZGVycyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9yZW1pbmRlcnNgKTtcbiAgfVxuICBnZXRDb21tZW50cyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9jb21tZW50c2ApO1xuICB9XG4gIC8vIGRlcHJlY2F0ZWQgbWV0aG9kXG4gIGNyZWF0ZUNvbW1lbnQoa2V5OiBzdHJpbmcsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wdXQoYWV1IGBib3hlcy8ke2tleX0vY29tbWVudHNgLCBkYXRhKTtcbiAgfVxuICBwb3N0Q29tbWVudChrZXk6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucHV0KGFldSBgYm94ZXMvJHtrZXl9L2NvbW1lbnRzYCwge21lc3NhZ2V9KTtcbiAgfVxuICBnZXRGaWxlcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9maWxlc2ApO1xuICB9XG4gIGdldFRocmVhZHMoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBib3hlcy8ke2tleX0vdGhyZWFkc2ApO1xuICB9XG4gIGdldEZlZWQoa2V5OiBzdHJpbmcsIGRldGFpbExldmVsOiA/c3RyaW5nKSB7XG4gICAgbGV0IHFzID0gJyc7XG4gICAgaWYgKGRldGFpbExldmVsKSB7XG4gICAgICBxcyArPSAnPycgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkoe2RldGFpbExldmVsfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7a2V5fS9uZXdzZmVlZGAgKyBxcyk7XG4gIH1cbiAgZ2V0VGFza3Moa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBib3hlcy8ke2tleX0vdGFza3NgKTtcbiAgfVxufVxuXG5jbGFzcyBCb3hGaWVsZHMge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0Rm9yQm94KGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3MuQm94ZXMuZ2V0RmllbGRzKGtleSk7XG4gIH1cbiAgZ2V0T25lKGJveEtleTogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGJveGVzLyR7Ym94S2V5fS9maWVsZHMvJHtrZXl9YCk7XG4gIH1cbiAgdXBkYXRlKGJveEtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgYm94ZXMvJHtib3hLZXl9L2ZpZWxkcy8ke2RhdGEua2V5fWAsIGRhdGEpO1xuICB9XG59XG5cbmNsYXNzIEZpbGVzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldEZvckJveChrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9zLkJveGVzLmdldEZpbGVzKGtleSk7XG4gIH1cbiAgZ2V0T25lKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgZmlsZXMvJHtrZXl9YCk7XG4gIH1cbiAgZ2V0Q29udGVudHMoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXROb1BhcnNlKGFldSBgZmlsZXMvJHtrZXl9L2NvbnRlbnRzYCk7XG4gIH1cbn1cblxuY2xhc3MgVGhyZWFkcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXRGb3JCb3goYm94S2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRUaHJlYWRzKGJveEtleSk7XG4gIH1cbiAgZ2V0T25lKHRocmVhZEtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgdGhyZWFkcy8ke3RocmVhZEtleX1gKTtcbiAgfVxufVxuXG5jbGFzcyBUYXNrcyB7XG4gIF9zOiBTdHJlYWs7XG4gIF9jOiBDb25uSGVscGVyO1xuICBjb25zdHJ1Y3RvcihzOiBTdHJlYWssIGM6IENvbm5IZWxwZXIpIHtcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gYztcbiAgfVxuICBnZXRGb3JCb3goYm94S2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcy5Cb3hlcy5nZXRUYXNrcyhib3hLZXkpO1xuICB9XG4gIGdldE9uZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYHRhc2tzLyR7a2V5fWApO1xuICB9XG4gIGNyZWF0ZShib3hLZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYGJveGVzLyR7Ym94S2V5fS90YXNrc2AsIGRhdGEpO1xuICB9XG4gIHVwZGF0ZShrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYHRhc2tzLyR7a2V5fWAsIGRhdGEpO1xuICB9XG4gIGRlbGV0ZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXUgYHRhc2tzLyR7a2V5fWApO1xuICB9XG59XG5cbmNsYXNzIENvbnRhY3RzIHtcbiAgX3M6IFN0cmVhaztcbiAgX2M6IENvbm5IZWxwZXI7XG4gIGNvbnN0cnVjdG9yKHM6IFN0cmVhaywgYzogQ29ubkhlbHBlcikge1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xuICB9XG4gIGdldE9uZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmdldChhZXUgYGNvbnRhY3RzLyR7a2V5fWApO1xuICB9XG4gIGNyZWF0ZSh0ZWFtS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGB0ZWFtcy8ke3RlYW1LZXl9L2NvbnRhY3RzYCwgZGF0YSk7XG4gIH1cbiAgdXBkYXRlKGtleTogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fYy5wb3N0KGFldSBgY29udGFjdHMvJHtrZXl9YCwgZGF0YSk7XG4gIH1cbiAgZGVsZXRlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZGVsZXRlKGFldSBgY29udGFjdHMvJHtrZXl9YCk7XG4gIH1cbn1cblxuY2xhc3MgV2ViaG9va3Mge1xuICBfczogU3RyZWFrO1xuICBfYzogQ29ubkhlbHBlcjtcbiAgY29uc3RydWN0b3IoczogU3RyZWFrLCBjOiBDb25uSGVscGVyKSB7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG4gIH1cbiAgZ2V0T25lKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2MuZ2V0KGFldSBgd2ViaG9va3MvJHtrZXl9YCk7XG4gIH1cbiAgY3JlYXRlKHBpcGVsaW5lS2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jLnBvc3QoYWV1IGB3ZWJob29rcz9waXBlbGluZUtleT0ke3BpcGVsaW5lS2V5fWAsIGRhdGEpO1xuICB9XG4gIHVwZGF0ZShrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2MucG9zdChhZXUgYHdlYmhvb2tzLyR7a2V5fWAsIGRhdGEpO1xuICB9XG4gIGRlbGV0ZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jLmRlbGV0ZShhZXUgYHdlYmhvb2tzLyR7a2V5fWApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJlYWsge1xuICBfYzogQ29ubkhlbHBlcjtcbiAgTWU6IE1lO1xuICBQaXBlbGluZXM6IFBpcGVsaW5lcztcbiAgQm94ZXM6IEJveGVzO1xuICBGaWxlczogRmlsZXM7XG4gIFRocmVhZHM6IFRocmVhZHM7XG4gIFRhc2tzOiBUYXNrcztcbiAgQ29udGFjdHM6IENvbnRhY3RzO1xuICBXZWJob29rczogV2ViaG9va3M7XG5cbiAgY29uc3RydWN0b3IoYXV0aEtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYyA9IG5ldyBDb25uSGVscGVyKGF1dGhLZXkpO1xuICAgIHRoaXMuTWUgPSBuZXcgTWUodGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5QaXBlbGluZXMgPSBuZXcgUGlwZWxpbmVzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuQm94ZXMgPSBuZXcgQm94ZXModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5GaWxlcyA9IG5ldyBGaWxlcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLlRocmVhZHMgPSBuZXcgVGhyZWFkcyh0aGlzLCB0aGlzLl9jKTtcbiAgICB0aGlzLlRhc2tzID0gbmV3IFRhc2tzKHRoaXMsIHRoaXMuX2MpO1xuICAgIHRoaXMuQ29udGFjdHMgPSBuZXcgQ29udGFjdHModGhpcywgdGhpcy5fYyk7XG4gICAgdGhpcy5XZWJob29rcyA9IG5ldyBXZWJob29rcyh0aGlzLCB0aGlzLl9jKTtcbiAgfVxuXG4gIHNlYXJjaChxdWVyeTogc3RyaW5nKTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5fYy5nZXQoYWV1IGBzZWFyY2g/cXVlcnk9JHtxdWVyeX1gKTtcbiAgfVxufVxuIl19