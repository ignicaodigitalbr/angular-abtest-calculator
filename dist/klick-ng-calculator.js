(function() {
  'use strict';

  /**
  * ABTestCalculator Module
  *
  * Description
  */
  angular
    .module('ABTestCalculator', []);
})();
;(function() {
  'use strict';

  angular
    .module('ABTestCalculator')
    .service('ABTestRelevanceService', ABTestRelevanceService);

  ABTestRelevanceService.$inject = ['$log'];

  function ABTestRelevanceService($log) {

    /**
     * Calculate the standard error of to measures
     *
     * @param {Float} access
     * @param {Float} goals
     * @throws {String} If params isn't float
     *
     * @return {Float}
     */
    this.percentageStandardError = function(access, goals) {
      if (!angular.isNumber(access) || !angular.isNumber(goals)) {
        $log.warn('Invalid params was provided.');
        return false;
      }

      if (0 === access) {
        return false;
      }

      if (goals > access) {
        $log.error('Goals can\'t be greater than access.');
        return false;
      }

      var standardError,

          percentage = goals / access,

          sd = percentage * (1 - percentage) / access;

      standardError = Math.sqrt(sd);

      return standardError;
    };

    /**
     * Standard Error
     *
     * @param  {Array} measures array of measures
     * @return {Float}
     */
    this.standardError = function(measures) {
      if (!angular.isArray(measures)) {
        $log.warn('Invalid param was provided.');
        return false;
      }

      var standardError = 0;

      measures.forEach(function(value) {
        standardError += value * value;
      });

      return Math.sqrt(standardError);
    };

    /**
     * Normal distribuition calc
     *
     * @param  {Float} score
     * @param  {Float} mean
     * @param  {Float} sd
     * @param  {Boolean} cumulative
     *
     * @return {Float}
     */
    this.normalDistribution = function(score, mean, sd, cumulative) {
      if (
        !angular.isNumber(score) ||
        !angular.isNumber(mean) ||
        !angular.isNumber(sd)
      ) {
        return false;
      }

      if (sd <= 0) {
        return false;
      }

      return (cumulative) ? jStat.normal.cdf(score, mean, sd) : jStat.normal.pdf(score, mean, sd);
    };

    /**
     * Returns the z score of a variation with cotrol
     * @param  {Object} control   The control page
     * @param  {Object} variation The variation page
     * @return {Float}
     */
    this.zScore = function(control, variation) {
      var self = this,
          controlPError,
          controlPAv,
          variationPError,
          variationPAv,
          standardError,
          zScore;

      if (!angular.isObject(control) || !angular.isObject(variation)) {
        return false;
      }

      if (angular.isUndefined(control.access) || angular.isUndefined(control.goals)) {
        return false;
      }

      if (angular.isUndefined(variation.access) || angular.isUndefined(variation.goals)) {
        return false;
      }

      controlPError = self.percentageStandardError(control.access, control.goals);
      variationPError = self.percentageStandardError(variation.access, variation.goals);
      standardError = self.standardError([controlPError, variationPError]);

      controlPAv = control.goals / control.access;
      variationPAv = variation.goals / variation.access;

      zScore = (controlPAv - variationPAv) / standardError;

      return zScore;
    };

    /**
     * Calculate significance
     *
     * @param  {Array} variations
     * @return {Object | Boolean}
     */
    this.statisticalRelevance = function(variations) {
      var self = this,
          zScore = 0,
          pValue = 0,
          confidentiality = 0,
          result = [],
          control;

      if (!angular.isArray(variations)) {
        return false;
      }

      control = getControl(variations);

      if (!control) {
        return false;
      }

      variations.forEach(function(variation, index) {

        if (angular.isDefined(variation.index) && variation.index === index) {
          result[index] = {
            rate: getRate(variation.goals, variation.access),
            type: 'pattern'
          };

          return;
        }

        zScore = self.zScore(control, variation);
        pValue = self.normalDistribution(zScore, 0, 1, true);
        confidentiality = getConfidentiality(pValue);

        result[index] = {
          rate: getRate(variation.goals, variation.access),
          zScore: zScore,
          pValue: pValue,
          confidentiality: confidentiality
        };
      });

      return result;

    };

    /**
     * Round the number with 2 decimal numbers
     * @param  {Float} value
     * @return {Float}
     */
    function round(value) {
      return Math.round((value) * 100) / 100;
    }

    /**
     * Return as percentage the confidentiality
     * @param  {Float} value
     * @return {Float}
     */
    function getConfidentiality(value) {
      return round((1 - value) * 100);
    }

    /**
     * Returns the percentage of goals
     * @param  {Integer} goals  Conversion
     * @param  {Integer} access Total of access
     * @return {Float}
     */
    function getRate(goals, access) {
      var rate = (access > 0)? round((goals / access) * 100) : 0;
      return rate;
    }

    /**
     * Returns the control page of a test. It is chosen getting the page with the less rate conversion/access
     * @param  {Array} variations
     * @return {Object}
     */
    function getControl(variations) {
      var control,
          controlIndex,
          auxVariationRate;

      try {
        variations.forEach(function(variation) {
          if (
              !angular.isNumber(variation.goals) ||
              !angular.isNumber(variation.access)
            ) {
            $log.warn('Invalid variation param type was provided');
          }
        });
      }
      catch (e) {
        return false;
      }

      variations.forEach(function(variation, index) {
        if (angular.isUndefined(auxVariationRate) || auxVariationRate > (variation.goals / variation.access)) {
          control = variation;
          controlIndex = index;

          auxVariationRate = (variation.goals / variation.access);
        }
      });

      control.index = controlIndex;

      return control;

    }
  }

})();
