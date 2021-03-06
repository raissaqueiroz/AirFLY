/*
* Initialize Modules
*/
;(function($, window, document, undefined){

    $( window ).on( 'elementor:init', function() {
		
		// Add "master-addons" specific css class to elementor body
        $('.elementor-editor-active').addClass('master-addons');

        // Make our custom css visible in the panel's front-end
        if( typeof elementorPro == 'undefined' ) {
            elementor.hooks.addFilter( 'editor/style/styleText', function( css, view ){
                var model = view.getEditModel(),
                    customCSS = model.get( 'settings' ).get( 'custom_css' );

                if ( customCSS ) {
                    css += customCSS.replace( /selector/g, '.elementor-element.elementor-element-' + view.model.id );
                }
                return css;
            });
        }
        // End of Custom CSS	
        
        var JltmaControlBaseDataView = elementor.modules.controls.BaseData;


        /*!
         * ================== Visual Select Controller ===================
         **/
        var JltmaControlVisualSelectItemView = JltmaControlBaseDataView.extend( {
            onReady: function() {
                this.ui.select.jltmaVisualSelect();
            },
            onBeforeDestroy: function() {
                this.ui.select.jltmaVisualSelect( 'destroy' );
            }
        } );
        elementor.addControlView( 'jltma-visual-select', JltmaControlVisualSelectItemView );


        
        // Enables the live preview for Animation Tranistions in Elementor Editor
        function jltmaOnGlobalOpenEditorForTranistions ( panel, model, view ) {
            view.listenTo( model.get( 'settings' ), 'change', function( changedModel ){

                // Force to re-render the element if the Entrance Animation enabled for first time
                if( '' !== model.getSetting('ma_el_animation_name') && !view.$el.hasClass('jltma-animated') ){
                    view.render();
                    view.$el.addClass('jltma-animated');
                    view.$el.addClass('jltma-animated-once');
                }

                // Check the changed setting value
                for( settingName in changedModel.changed ) {
                    if ( changedModel.changed.hasOwnProperty( settingName ) ) {

                        // Replay the animation if an animation option changed (except the animation name)
                        if( settingName !== "ma_el_animation_name" && -1 !== settingName.indexOf("ma_el_animation_") ){

                            // Reply the animation
                            view.$el.removeClass( model.getSetting('ma_el_animation_name') );

                            setTimeout( function() {
                                view.$el.addClass( model.getSetting('ma_el_animation_name') );
                            }, ( model.getSetting('ma_el_animation_delay') || 300 ) ); // Animation Delay
                        }
                    }
                }

            }, view );
        }
        elementor.hooks.addAction( 'panel/open_editor/section', jltmaOnGlobalOpenEditorForTranistions );
        elementor.hooks.addAction( 'panel/open_editor/column' , jltmaOnGlobalOpenEditorForTranistions );
        elementor.hooks.addAction( 'panel/open_editor/widget' , jltmaOnGlobalOpenEditorForTranistions );

        


        // Query Control

        var JLTMA_ControlQuery = elementor.modules.controls.Select2.extend( {

            cache: null,
            isTitlesReceived: false,

            getSelect2Placeholder: function getSelect2Placeholder() {
                return {
                    id: '',
                    text: 'All',
                };
            },

            getSelect2DefaultOptions: function getSelect2DefaultOptions() {
                var self = this;

                return jQuery.extend( elementor.modules.controls.Select2.prototype.getSelect2DefaultOptions.apply( this, arguments ), {
                    ajax: {
                        transport: function transport( params, success, failure ) {
                            var data = {
                                q           : params.data.q,
                                query_type  : self.model.get('query_type'),
                                object_type : self.model.get('object_type'),
                            };

                            return elementorCommon.ajax.addRequest('jltma_query_control_filter_autocomplete', {
                                data    : data,
                                success : success,
                                error   : failure,
                            });
                        },
                        data: function data( params ) {
                            return {
                                q    : params.term,
                                page : params.page,
                            };
                        },
                        cache: true
                    },
                    escapeMarkup: function escapeMarkup(markup) {
                        return markup;
                    },
                    minimumInputLength: 1
                });
            },

            getValueTitles: function getValueTitles() {
                var self        = this,
                    ids         = this.getControlValue(),
                    queryType   = this.model.get('query_type');
                    objectType  = this.model.get('object_type');

                if ( ! ids || ! queryType ) return;

                if ( ! _.isArray( ids ) ) {
                    ids = [ ids ];
                }

                elementorCommon.ajax.loadObjects({
                    action  : 'jltma_query_control_value_titles',
                    ids     : ids,
                    data    : {
                        query_type  : queryType,
                        object_type : objectType,
                        unique_id   : '' + self.cid + queryType,
                    },
                    success: function success(data) {
                        self.isTitlesReceived = true;
                        self.model.set('options', data);
                        self.render();
                    },
                    before: function before() {
                        self.addSpinner();
                    },
                });
            },

            addSpinner: function addSpinner() {
                this.ui.select.prop('disabled', true);
                this.$el.find('.elementor-control-title').after('<span class="elementor-control-spinner ee-control-spinner">&nbsp;<i class="fa fa-spinner fa-spin"></i>&nbsp;</span>');
            },

            onReady: function onReady() {
                setTimeout( elementor.modules.controls.Select2.prototype.onReady.bind(this) );

                if ( ! this.isTitlesReceived ) {
                    this.getValueTitles();
                }
            }

        } );

        elementor.addControlView( 'jltma_query', JLTMA_ControlQuery );
	} );

    "use strict";!function(n){var t=function(){function n(){this.document=elementor.documents.currentDocument,this.breakpoints=elementorFrontend.config.breakpoints,this.init()}var t=n.prototype;return t.init=function(){var n=this;this.document.container.children.forEach(function(t){n.updateBreakPointCSS(t)}),elementor.hooks.addAction("panel/open_editor/widget",function(t,e,o){n.delay(function(){n.addDevice(o)})}),elementor.hooks.addAction("panel/open_editor/section",function(t,e,o){n.delay(function(){n.runFromRootSection(o)})}),elementor.hooks.addAction("panel/open_editor/column",function(t,e,o){n.delay(function(){n.runFromRootSection(o)})})},t.delay=function(n,t,e){void 0===t&&(t=10),void 0===e&&(e=20);var o=setInterval(function(){n(),0>=e&&clearInterval(o)},t)},t.runFromRootSection=function(n){var t=this.getRootSection(n.container);t&&this.updateBreakPointCSS(t)},t.updateBreakPointCSS=function(n){var t=this;n.view&&this.addDevice(n.view),n.children.forEach(function(n){t.updateBreakPointCSS(n)})},t.getRootSection=function(n){return n.parent||console.log("Something went wrong"),n.parent&&"document"==n.parent.type&&"section"==n.type?n:this.getRootSection(n.parent)},t.addDevice=function(n){var t=n.controlsCSSParser.stylesheet;for(var e in this.breakpoints)if(!["xs","sm","md","lg","xxl"].includes(e)){var o=this.breakpoints[e].input1;void 0===o&&(o=this.breakpoints[e]),t.addDevice(e,o)}this.renderStyles(n)},t.renderStyles=function(n){n.renderStyles()},n}();n(window).load(function(){new t})}(jQuery);

})(jQuery, window, document);
