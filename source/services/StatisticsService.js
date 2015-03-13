(function() {
  'use strict';

  angular
    .module('NgCalculator')
    .service('StatisticsService', StatisticsService);


  function StatisticsService() {

    /**
     * Calculate the standard error of to measures
     *
     * @param {Float} access
     * @param {Float} goals
     * @throws {String} If params isn't float
     *
     * @return {Float}
     */
    this.percentageStandardError = function(access, goals){
      if (!angular.isNumber(access) || !angular.isNumber(goals)) {
        throw "Invalid params was provided.";
      }

      if(0 === access) {
        throw "Access can't be 0 (zero).";
      }

      if ( goals > access) {
        throw "Goals can't be greater than access.";
      }

      var standardError,

          percentage = goals / access,

          sd = percentage * (1 - percentage) / access;

      standardError = Math.sqrt(sd);

      return standardError;
    }

    /**
     * Standard Error
     *
     * @param  {Array} measures array of measures
     * @return {Float}
     */
    this.standardError = function(measures){
      if (!angular.isArray(measures)){
        throw "Invalid param was provided.";
      }

      var standardError = 0;

      measures.forEach(function(value){
        standardError += value * value;
      });

      return Math.sqrt(standardError);
    }

    /**
     * Normal distribuition calc
     *
     * @param  {Float} value
     * @return {Float}
     */
    this.normalDistribution = function(value){
      var d1=0.0498673470,
          d2=0.0211410061,
          d3=0.0032776263,
          d4=0.0000380036,
          d5=0.0000488906,
          d6=0.0000053830;

      var a=Math.abs(value),
          t=1.0+a*(d1+a*(d2+a*(d3+a*(d4+a*(d5+a*d6)))));
      t*=t;
      t*=t;
      t*=t;
      t*=t;
      t=1.0/(t+t);

      if(value>=0){
        t=1-t;
      }

      return t;
    }

    /**
     * Calculate significance
     * @param  {Integer} c_t control visits
     * @param  {Integer} v_t variation visits
     * @param  {Integer} c_c control conversions
     * @param  {Integer} v_c variation conversions
     * @return {String}
     */
    this.statisticalRelevance = function(c_t, v_t, c_c, v_c){

      if(c_t<15){
          console.warn("The control visits is too small");
          return;
      }

      if(v_t<15){
          console.warn("The variation visits is too small");
          return;
      }

      var c_p=c_c/c_t;
      var v_p=v_c/v_t;

      [
        {c_c: 1, c_t: 2},
        {v_c: 1, v_t: 2}
      ]

      var std_error=Math.sqrt((c_p*(1-c_p)/c_t)+(v_p*(1-v_p)/v_t));
      var z_value=(v_p-c_p)/std_error;
      var p_value=this.normalDistribution(z_value);
      if(p_value>0.5)
          p_value=1-p_value;

      p_value=Math.round(p_value*1000)/1000;
      console.info(' P_VALUE: '+ p_value);

      console.log(100 - (p_value * 100) );

      if(p_value<0.05){
          return "Yes!";
      }
      else{
          return "No";
      }
    }

  }

})();
