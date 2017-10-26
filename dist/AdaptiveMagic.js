/* !
 * AdaptiveMagic v1.0.0 (2017-10-08)
 * The javascript library for execute code by different screen's sizes.
 * (c) 2017 Filipp Zhuravlev 
 * Project Website: https://github.com/Wishez/AdaptiveMagic
 * 
 * @version 1.0.0
 * @license Dual licensed under MIT license and GPL.
 * @author Filipp Zhuravlev - shiningfinger@list.ru
 *
 * @file AdaptiveMagic main library.
 * 
 * @namespace AM
 *  
 */


(function ( root, factory ) {
     if ( typeof define === 'function' && define.amd ) {
      // AMD. Register as an anonymous module.
        define( factory );
    } else if ( typeof exports === 'object' ) {
      // CommonJS
      module.exports = factory();
    } else {
      // Browser global
      root.AM = factory();
    }
})((window || {}), function() {
    /*
     * @private
     */
    const _assert = ( condition, message ) => {
        if (condition)  throw Error(message)
    }
   /*
    * @private
    */
   const _isinstanceOf = ( value, type ) => typeof value === type;
   /*
    * @private
    */
    const _notEqualOf = ( value, type ) => typeof value !== type;
    /*
     * @global
     */
    let AdaptiveMagic = {};
  
   /* 
    * Default Breakpoints
    * @private
    */
    let _breakpoints = {
        lgLess: 1600,
        lg: {
          min: 1600,
          max: 1199
        },
        lgUp: 1199,
        mdLess: 1200,
        md: {
          min: 991,
          max: 1200
        },
        mdUp: 991,
        smLess: 992,
        sm: {
          min: 799,
          max: 992
        },
        smUp: 799,
        xsLess: 800,
        xs: {
          min: 560,
          max: 800
        },
        xsUp: 559,
        xxs: 560,
        xxsUp: 0
    };
   /*
    * [limitations description]
    * @type {Object}
    */
    AdaptiveMagic.limitations = {
        lastBreakpoint: "",
        isUsingLimitation: true 
    };


  
   /*  Set value of isUsingLimitation in AdaptiveMagic.limitations object 
    * for allow or prevent repeating action by changing a screen size's width.
    * @param {Boolean} isLimited - The value defines repeated mode of function by resize screen's width.
    * 
    * @public
    */
    AdaptiveMagic.changeLimitationMode = isLimited => {
        _assert(
            typeof isLimited !== 'boolean',
            'First argument must be a value of Boolean type.'
        );

        AdaptiveMagic.limitations.isUsingLimitation =  isLimited;
    }


   /*
    * Check range of window size's width. 
    * You can point or take one of default sizes.
    * 
    * @param {(String|Object)} breakpoint   -  Define base breakpoint as string or set range breakpoint as object.
    *
    * @private
    */
   const _checkWidth = breakpoint => {
        const screenWidth = window.innerWidth;

        /*
            Check the range of breakpoint.
        */
        if ( _isinstanceOf( breakpoint, 'object' ) ) {
            if ( breakpoint.min && breakpoint.max ) {
                return ( screenWidth > breakpoint.min && 
                         screenWidth < breakpoint.max);
            } else if ( breakpoint.min ) {
                // Less than
                return screenWidth > breakpoint.min;
            } else { 
                // Up than
                return screenWidth < breakpoint.max
            }
    }
    /*
      It  checks by a pointed breakpoint a screen width.
    */
    switch ( breakpoint ) {
      // Up than
      case 'lgUp':
        return screenWidth > _breakpoints.lgUp;
      case 'mdUp':
        return screenWidth > _breakpoints.mdUp;
      case 'smUp':
        return screenWidth > _breakpoints.smUp;
      case 'xsUp':
        return screenWidth > _breakpoints.xsUp;
      // Less and more than 
      case 'lg':
        return (screenWidth > _breakpoints.lg.min &&
                     screenWidth < _breakpoints.lg.max);
      case 'md':
        return ( screenWidth > _breakpoints.md.min && 
                      screenWidth < _breakpoints.md.max);
      case 'sm':
        return ( screenWidth > _breakpoints.sm.min && 
                      screenWidth < _breakpoints.sm.max);
      case 'xs':
        return ( screenWidth > _breakpoints.xs.min && 
                      screenWidth < _breakpoints.xs.max);
      // Less than
      case 'lgLess':
        return screenWidth < _breakpoints.lgLess;
      case 'mdLess':
        return screenWidth < _breakpoints.mdLess;
      case 'smLess':
        return screenWidth < _breakpoints.smLess;
      case 'xsLess':
        return screenWidth < _breakpoints.xsLess;
      case 'xxs':
        return screenWidth < _breakpoints.xxs;
      // If a breakpoint wasn't defined.
      default:
        return false;
    };
  };

  /*
   *
   *@param {String|Object} breakpoint - It's defined a last used breakpoint  in the function.
   *@param {Boolean} isForce - The argument forces to set last used breakpoint;
   *
   * @private
   */
  const _setLastBreakpointIfNeeded = ( 
      breakpoint,
      isForce = false 
  ) => {
      const lb = AdaptiveMagic.limitations.lastBreakpoint;

      if (!lb || isForce) {
            AdaptiveMagic.limitations.lastBreakpoint = _isinstanceOf(breakpoint, 'string') ? 
                breakpoint : 
                breakpoint.name;
      } else {
            return false;
      }
  }

  /* 
   * The main function is checking breakpoint 
   * and executing a defined code in the "callback" argument. 
   * 
   * @param {(String|Object)} breakpoints - The define breakpoint the code will be executed.
   * @param {Function} callback - The function will be executed.
   * 
   *@public 
   */
  AdaptiveMagic.doBy = ( 
    breakpoint, 
    callback 
  ) => {
       _assert(
            ( _notEqualOf( breakpoint, 'string' ) && 
              _notEqualOf( breakpoint,  'object' ) ), 
            'First argument must be an object or a string.'
        );

      /* 
       * If allowed to prevent action AdaptiveMagic is repeated by a breakpoint, 
       * the next iteration won't be repeated by a breakpoint.
       */
      const lastBreakpoint = AdaptiveMagic.limitations.lastBreakpoint;
      let callable = false;
      const isLastBreakpoint = !!breakpoint.name ?
        lastBreakpoint !== breakpoint.name :
        lastBreakpoint !== breakpoint;

      /*
       *  I checks a needed breakpoint and check for a last  call of a callback.
       *  If there was set isUsingLimitation as false, then callback can repeat.
       */
      if ( ( _checkWidth(breakpoint) && isLastBreakpoint  ) || 
          !AdaptiveMagic.limitations.isUsingLimitation )
          callable = true;


      if ( callable) {
        callback();

        if ( AdaptiveMagic.limitations.isUsingLimitation ) {
            _setLastBreakpointIfNeeded(breakpoint, true);
        }
      } 
  };
  
   /* Export facade. */
   return AdaptiveMagic; 
});