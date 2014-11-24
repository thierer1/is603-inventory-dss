var util = require('util'); // include a system module (util: http://nodejs.org/api/util.html)
var _ = require('underscore');
var BaseForecastingModel = require('./BaseForecastingModel'); // include the base classs
var StatUtils = require('../../utils/StatUtils');

// class definition
var LinearRegForecastingModel = function () {
  // super constructor call 
  BaseForecastingModel.call(this);

  this.getForecastedQuantity = function (forProduct) {
    var salesArr = this.getWeeklySalesArr(forProduct);
    var bestFit = StatUtils.bestFit(salesArr);

    var result = {
      value: Math.ceil(bestFit.f(salesArr.length + 1)),
      debug: {
        bestFit: bestFit
      }
    };
    
    return result;
  };
};

util.inherits(LinearRegForecastingModel, BaseForecastingModel);

module.exports = LinearRegForecastingModel;