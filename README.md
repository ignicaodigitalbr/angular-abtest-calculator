#Klick Angular Calculator
The module has some methods that allows you to calculate specific values with data applied to A \ B test.

##Usage
Make the dependence injection of mudule.
eg.:
```
  /**
  * Your module
  */
  angular
    .module('YourModuleName', ['NgCalculator']);
```

Inject the A\B test calculator service in your service, controller, directive, factory,.., and use it.
eg.:
```
  angular
    .module('YourModuleName')
    .controller('YourController', YourController);

    YourController.$inject = ['ABTestRelevanceService'];

    function YourController(ABTestRelevanceService) {
      var abTestValues : [
        { access: 1000, goals: 30 },
        { access: 1000, goals: 32 },
        { access: 1001, goals: 55 },
        { access: 1000, goals: 35 }
      ],
      
      result;
    
      result = ABTestRelevanceService.statisticalRelevance();
      console.info(result);
      
      /*
       * The console will show an object equal to this.
       * [
       *  { rate: 3, type: 'pattern' },
       *  { rate: 3.2, zScore: -0.2580355189695215, pValue: 0.39818974750130653, confidentiality: 60.18 },
       *  { rate: 5.49, zScore: -2.7721139209341543, pValue: 0.002784677087099785, confidentiality: 99.72 },
       *  { rate: 3.5, zScore: -0.6305666611194322, pValue: 0.2641619516715518, confidentiality: 73.58 }
       * ]
       *
       */
    }
```


##Development

- Install [Grunt](http://gruntjs.com/):

```
[sudo] npm install -g grunt-cli
```

- Install dependencies:

```
[sudo] npm install
```

###Running tests

```
karma start
```

##API

##TODO
