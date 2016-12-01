/**
 * Created by EdwardChor on 30/11/2016.
 */
var request = require('request');
var url = require('url');
var _ = require('lodash');

var config = require(__base + 'config');

var service = {};

service.request = function (req, res, method, requestUrl, data) {
    var mock = false;
    for (var i in config.mockList) {
        if (config.mockList.hasOwnProperty(i)) {
            if (requestUrl.match('^' + config.mockList[i] + '$')) {
                requestUrl = config.mockUrlPrefix + requestUrl;
                mock = true;
                break;
            }
        }
    }

    if (!mock) {
        requestUrl = config.backendUrlPrefix + requestUrl;
    }

    var urlObj = url.parse(requestUrl, true);

    if (method === 'GET') {
        _.extend(urlObj.query, data);
    }

    console.log(url.format(urlObj));

    return new Promise(function (resolve, reject) {
        request({
            method: method,
            url: url.format(urlObj),
            body: data,
            json: true,
            headers: {
                'x-access-token': req.cookies['access-token']
            }
        }, function (err, response, body) {
            if (err) return reject(err);

            var data = body;

            if (!response.statusCode.toString().startsWith('2')) {
                reject({
                    status: response.statusCode,
                    message: data.error
                });
            }
            else {
                resolve(data);
            }
        });
    });
};

service.get = function (req, res, requestUrl, query) {
    return service.request(req, res, 'GET', requestUrl, query);
};

service.post = function (req, res, requestUrl, data) {
    return service.request(req, res, 'POST', requestUrl, data);
};

service.put = function (req, res, requestUrl, data) {
    return service.request(req, res, 'PUT', requestUrl, data);
};

service.patch = function (req, res, requestUrl, data) {
    return service.request(req, res, 'PATCH', requestUrl, data);
};

service.delete = function (req, res, requestUrl, data) {
    return service.request(req, res, 'DELETE', requestUrl, data);
};

module.exports = service;