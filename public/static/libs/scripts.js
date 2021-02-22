$(document).ready(function(){

  $("input[name='USER_FROM']").attr('readonly','readonly');
  $("input[name='POSITION']").attr('readonly','readonly');
  $("input[name='DATE']").attr('readonly','readonly');

  /*
     $(".hidden_fill_another").hide();
     $("#FILL_ANOTHER").on('change', function() {
         if($(this).is(':checked')){
             $('.hidden_fill_another').show();
         }else{
             $('.hidden_fill_another').hide();
         }
     });

     $("input[name='FROM'], input[name='TO']").on('change', function () {

         var dFrom = $("input[name='FROM']").val().split('.');
         var dTo = $("input[name='TO']").val().split('.');
         var from = new Date(dFrom[2], dFrom[1]-1, dFrom[0]);
         var to = new Date(dTo[2], dTo[1]-1, dTo[0]);

         $("input[name='COUNT_DAYS']").val((to - from) / (60 * 60 * 24 * 1000) + 1);

     });

     var pathTemplate = BX.message('MESS_ID');

     var select = $('input[name=EMPLOYEE]');
     var observer = new MutationObserver(function(mutations) {
         if(mutations[0].target.value != ''){
             $.ajax({
                 type: "POST",
                 url: pathTemplate + "/ajax.php",
                 //dataType: 'json',
                 data: {
                     user: mutations[0].target.value,
                 },
                 success: function(data){
                     console.log(JSON.parse(data));
                     var answer = JSON.parse(data);

                     $("input[name='DEPARTMENT']").val(answer.DEPARTMENT.ID);
                     $("input[name='inp_DEPARTMENT']").val(answer.DEPARTMENT.NAME);
                     $("input[name='POSITION']").val(answer.POSITION.NAME);
                 }
             });
         }
     });

     observer.observe(select[0], { attributes: true});
 */
});
/* declaration script -- start */
$(function() {

  /* dependencies */
  $('body').append('<script src="/local/templates/.default/components/sitesoft/bizproc.wizards.start/CORRUPTION_POSITION/plugins/jquery-validation/jquery.validate.min.js"></script>');
  $('body').append('<script src="/local/templates/.default/components/sitesoft/bizproc.wizards.start/CORRUPTION_POSITION/plugins/tingle.js/tingle.min.js"></script>');
  $('body').append('<script src="/local/templates/.default/components/sitesoft/bizproc.wizards.start/CORRUPTION_POSITION/plugins/jquery-autocomplete/jquery.autocomplete.min.js"></script>');
  $('body').append('<script src="/local/templates/.default/components/sitesoft/bizproc.wizards.start/CORRUPTION_POSITION/plugins/cleave-js/cleave.min.js"></script>');

  /* utils */
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth
  }

  /* objects */
  var Modal = function(content, options) {
    this.content = content;
    this.options = $.extend(
      {
        classList: ['tingle-modal--default'],
        onOpenCallback: function() {}
      },
      options
    );
    this.modal = new tingle.modal({
      footer: false,
      stickyFooter: false,
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: 'Закрыть',
      cssClass: this.options.classList,
      beforeOpen() {
        $('body').css({'padding-right': getScrollbarWidth()});
        /* если тема default крестик закрытия расположить внутри */
        if (this.cssClass.includes('tingle-modal--default')) {
          var $modal = $('.tingle-modal--default');
          var $closeButton = $modal.find('> .tingle-modal__close');
          var $modalBox = $modal.find('.tingle-modal-box');
          if ($modalBox.find('.tingle-modal__close').length === 0) {
            $closeButton.clone().appendTo($modalBox).on('click', function() {
              $closeButton.trigger('click');
            });
          }
        }
      },
      onOpen: () => {
        this.options.onOpenCallback();
      },
      beforeClose() {
        $('body').css({'padding-right': getScrollbarWidth()});
        $(this.modalBoxContent).html('');
        return true;
      },
    });
  };

  Modal.prototype = {
    open: function() {
      this.modal.setContent(this.content);
      this.modal.open();
    },
    close: function() {
      this.modal.close();
    }
  };

  var Declaration = function(el) {
    this.$el = $(el);
    this.$form = this.$el.find('.declaration__steps');
    this.$steps = this.$el.find('.declaration__step');
    this.$currentStep = null;
    this.$progressItems = this.$el.find('.declaration__progress-item');
    this.$btnNext = this.$el.find('.declaration__btn-next');
    this.$btnPrev = this.$el.find('.declaration__btn-prev');
    this.$relatives = this.$el.find('.relatives');
    this.$descriptionLink = this.$el.find('.declaration__open-popup-description');
    this.$inputAddresseeName = this.$el.find('[name="addressee_name"]');
    this.$inputAddresseeID = this.$el.find('[name="addressee_id"]');
    this.$addresseeOccupation = this.$el.find('.declaration__addressee-occupation');

    this.initialStep = this.$el.data('initialStep') || 1;
    this.step = null;

    this.modifiers = {
      progressItemActive: 'progress-item-active'
    }

  }

  Declaration.prototype = {
    init: function() {
      this.setStep(this.initialStep);
      this.setupValidationPlugin();
      this.initPlugins();
      this.bindDomEvents();
      this.bindChildrenEvents();
    },
    initPlugins: function() {
      var _this = this;

      /* mockup данные */
      var employees =  [
        {
          value: 'ФИО 1',
          id : 1,
          occupation: 'бухгалтер',
          department: 'отдел 1'

        },
        {
          value: 'ФИО 2',
          id : 2,
          occupation: 'дизайнер',
          department: 'отдел 2'
        },
        {
          value: 'ФИО 3',
          id : 3,
          occupation: 'старший управляющий',
          department: 'отдел 3'
        },
      ];
      /* mockup данные */
      /* документация к плагину devbridgeAutocomplete https://www.devbridge.com/sourcery/components/jquery-autocomplete/ */
      this.$inputAddresseeName.devbridgeAutocomplete({
        lookup: employees,
        onSelect: function (suggestion) {
          _this.$inputAddresseeID.val(suggestion.id).closest('.field').find('.field__error').remove();
          _this.$addresseeOccupation.html(suggestion.occupation.charAt(0).toUpperCase() + suggestion.occupation.slice(1));
        },
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'По запросу ничего не найдено',
        formatResult: function (suggestion, currentValue) {
          var re = new RegExp('(' + currentValue + ')', "gi");
          return suggestion.value.replace(re, '<strong>$1</strong>') + ', ' + suggestion.department + ', ' + suggestion.occupation;
        },
        onInvalidateSelection: function(event) {
          _this.$addresseeOccupation.html('');
          _this.$inputAddresseeID.val('');
        }
      });

    },
    setStep: function(step) {
      var _this = this;
      this.step = step;
      this.$currentStep = this.$steps.eq(step - 1);
      this.$steps.hide();
      this.$currentStep.show();
      this.$progressItems.each(function(index){
        $(this).toggleClass(_this.modifiers.progressItemActive, index < _this.step);
      });
    },
    bindDomEvents: function() {
      var _this = this;
      this.$steps.on('submit', function(event){
        event.preventDefault();
      });

      this.$btnNext.on('click', function(){
        var $fieldToValidate = _this.$currentStep.find('.field__control input, .field__control select');
        if ($fieldToValidate.length > 0 && !$fieldToValidate.valid()) {
          return;
        }
        var $allFields = _this.$currentStep.find('input, select');
        _this.sendData($allFields);
        _this.step++;
        _this.setStep(_this.step);
      });

      this.$btnPrev.on('click', function(){
        _this.step--;
        _this.setStep(_this.step);
      });

      this.$descriptionLink.on('click', function(event){
        event.stopPropagation();
        popupDescription.open();
      });
    },
    bindChildrenEvents: function() {
      this.$relatives.on('update_relatives_amount', function(event, params) {
        console.log(params.amount);
      });

    },
    setupValidationPlugin: function() {
      this.$form.validate({
        highlight: function(element) {
          $(element).closest('.field').addClass('field--error');
        },
        unhighlight: function(element) {
          $(element).closest('.field').removeClass('field--error');
        },
        errorPlacement: function($error, $element) {
          $element.closest('.field').append($error);
        },
        errorElement: 'div',
        errorClass: 'field__error',
        focusCleanup: true,
        onsubmit: false,
        ignore: '[name*="hash"]'
      })
    },
    sendData: function($fields) {
      console.log($fields)
    }
  };

  var Relatives = function(el) {
    this.$el = $(el);
    this.$list = this.$el.find('.relatives__list');
    this.$itemTemplate = this.$el.find('.relatives__template .relatives__item');
    this.$btnAdd = this.$el.find('.relatives__btn-add button');
    this.relativesAmount = 0;
  };

  Relatives.prototype = {
    init: function() {
      this.bindDomEvents();
      this.appendItem();
    },
    bindDomEvents: function() {
      var _this = this;
      this.$btnAdd.on('click', function() {
        _this.appendItem();
      });
      this.$el.on('click', '.relatives__btn-delete .link-delete', function(event) {
        event.preventDefault();
        _this.removeItem($(this).closest('.relatives__item'));
      });
    },
    appendItem: function() {
      var hash = new Date().getTime();
      var $newItem = this.$itemTemplate.clone();
      var $fields = $newItem.find('.field__control input, .field__control select');
      /* добавляю хэши, чтобы имена полей были уникальными, иначе валидация работает некорректно */
      $fields.each(function(){
        var $this = $(this);
        var fieldName = $this.attr('name');
        $this.attr('name', fieldName.replace(/hash/i, hash));
      });
      this.$list.append($newItem);
      this.relativesAmount++;
      this.$el.trigger('update_relatives_amount', {amount: this.relativesAmount});
    },
    removeItem: function($item) {
      $item.remove();
      this.relativesAmount--;
      this.$el.trigger('update_relatives_amount', {amount: this.relativesAmount});
    }
  };

  var Incomes = function(el) {
    this.$el = $(el);
    this.$list = this.$el.find('.incomes__list');
    this.$itemTemplate = this.$el.find('.incomes__template .incomes__item');
    this.$btnAdd = this.$el.find('.incomes__btn-add button');
  };

  Incomes.prototype = {
    init: function() {
      this.bindDomEvents();
      this.appendItem();
    },
    bindDomEvents: function() {
      var _this = this;
      this.$btnAdd.on('click', function() {
        _this.appendItem();
      });
      this.$el.on('click', '.incomes__btn-delete .link-delete', function(event) {
        event.preventDefault();
        _this.removeItem($(this).closest('.incomes__item'));
      });
    },
    appendItem: function() {
      var hash = new Date().getTime();
      var $newItem = this.$itemTemplate.clone();
      var $fields = $newItem.find('.field__control input, .field__control select');
      $fields.each(function(){
        var $this = $(this);
        var fieldName = $this.attr('name');
        $this.attr('name', fieldName.replace(/hash/i, hash));
      });
      this.$list.append($newItem);
    },
    removeItem: function($item) {
      $item.remove();
    }
  };

  /* run */
  var popupDescription = new Modal($('.declaration-description').clone().html());
  var popupError = new Modal($('.declaration-error').clone().html());
  //popupError.open();

  new Declaration($('.declaration')[0]).init();
  new Relatives($('.relatives')[0]).init();
  $('.incomes').each(function() {
    new Incomes(this).init();
  });
  function dateValidator() {
    $('.input-date__control').toArray().forEach(function(field) {
      new Cleave(field, {
        date: true,
        delimiter: '.',
        datePattern: ['d', 'm', 'Y']
      });
    });
  }
  dateValidator();
});
/* declaration script -- end */
