

// burger menu
    var burger = document.getElementById("toggle");
    var overlay = document.getElementById('overlay');

    burger.addEventListener('click', function(){
        this.classList.toggle('active');
        
        overlay.classList.toggle('open');
    });
    
    overlay.addEventListener('click', function(){
        overlay.classList.toggle('open');
        burger.classList.toggle('active');
    });


//popup

var modalArray = document.querySelectorAll('.js-open-modal');
var modalOverlay = document.querySelector('.modal__overlay');
var closelArray = document.querySelectorAll('.js-close');

modalArray.forEach(function(item){
    item.addEventListener('click', function(event){
        event.preventDefault();
        
        var modalName = this.getAttribute('data-modal');
        var modal = document.querySelector('.modal[data-modal="' + modalName + '"]');
       

        modal.classList.remove('close');
        modalOverlay.classList.remove('close');
    });
});

closelArray.forEach(function(close){
            close.addEventListener('click', function(event){
                event.preventDefault();
                var parent = this.parentNode;
               modalOverlay.classList.add('close');
               parent.classList.add('close');
            
            });
        });

// slider 

var multiItemSlider = (function () {
    return function (selector, config) {
      var
        _mainElement = document.querySelector(selector), 
        _sliderWrapper = _mainElement.querySelector('.slider__list'),
        _sliderItems = _mainElement.querySelectorAll('.slider__item'),
        _sliderControls = _mainElement.querySelectorAll('.slider__control'), 
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), 
        _sliderControlRight = _mainElement.querySelector('.slider__control_right'), 
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), 
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),   
        _positionLeftItem = 0, 
        _transform = 0,
        _step = _itemWidth / _wrapperWidth * 100,
        _items = []; 

      // наполнение массива _items
      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });

      var position = {
        getItemMin: function () {
          var indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position < _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getItemMax: function () {
          var indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position > _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getMin: function () {
          return _items[position.getItemMin()].position;
        },
        getMax: function () {
          return _items[position.getItemMax()].position;
        }
      };

      var _transformItem = function (direction) {
        var nextItem;
        if (direction === 'right') {
          _positionLeftItem++;
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
            nextItem = position.getItemMin();
            _items[nextItem].position = position.getMax() + 1;
            _items[nextItem].transform += _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          };
          _transform -= _step;
        };
        if (direction === 'left') {
          _positionLeftItem--;
          if (_positionLeftItem < position.getMin()) {
            nextItem = position.getItemMax();
            _items[nextItem].position = position.getMin() - 1;
            _items[nextItem].transform -= _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          };
          _transform += _step;
        };
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      };

      // обработчик события click для кнопок "назад" и "вперед"
      var _controlClick = function (e) {
          e.preventDefault();
        var direction = this.classList.contains('slider__control_right') ? 'right' : 'left';
        _transformItem(direction);
      };

      var _setUpListeners = function () {
        // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
        _sliderControls.forEach(function (item) {
          item.addEventListener('click', _controlClick);
        });
      };

      // инициализация
      _setUpListeners();

      return {
        right: function () { // метод right
          _transformItem('right');
        },
        left: function () { // метод left
          _transformItem('left');
        }
      }

    }
  }());

  var slider = multiItemSlider('#slider');