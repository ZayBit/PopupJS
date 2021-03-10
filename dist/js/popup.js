function Popup(className, configApp) {
    var el_popup = document.querySelector(className);
    if (!el_popup)
        return;
    // create the lightbox
    var popupLightbox = document.createElement('span'), 
    // element.style
    el_style = el_popup.style;
    // config object
    var _a = configApp.fadeEffect, fadeEffect = _a === void 0 ? true : _a, _b = configApp.lightbox, lightbox = _b === void 0 ? false : _b, _c = configApp.lightboxTransition, lightboxTransition = _c === void 0 ? 300 : _c, _d = configApp.transition, transition = _d === void 0 ? 600 : _d, _e = configApp.direction, direction = _e === void 0 ? '' : _e, moveTo = configApp.moveTo, _f = configApp.closeBtnDisable, closeBtnDisable = _f === void 0 ? false : _f, _g = configApp.destroy, destroy = _g === void 0 ? false : _g, optionsTime = configApp.optionsTime;
    if (direction === '' && !moveTo)
        return;
    if (lightbox) {
        popupLightbox.classList.add('popup-lightbox');
        popupLightbox.style.transition = "all " + lightboxTransition + "ms ease";
        popupLightbox.style.opacity = '0';
    }
    el_style.opacity = '0';
    el_style.display = 'none';
    var progress_bar = null;
    if (optionsTime && optionsTime.progressBar) {
        progress_bar = optionsTime.progressBar.trim() != '' ? el_popup.querySelector(optionsTime.progressBar.trim()) : false;
    }
    closeDirection();
    var btn_clearTime = false, closeBtn_avalible = true, transition_finished = true;
    // --- TODO:
    // if(optionsTime.action == 'open') setTimeout()
    // default class of buttons: Open and Close
    var _h = configApp.btnOpen, btnOpen = _h === void 0 ? null : _h, _j = configApp.btnClose, btnClose = _j === void 0 ? '.btn-close' : _j, btn_open = btnOpen != null ? document.querySelector(btnOpen) : false, btn_close = (!closeBtnDisable) ? el_popup.querySelector(btnClose) : false, 
    // functions to call event click
    clickEvent = function (btn, func) { if (btn) {
        btn.addEventListener('click', function () { return func(); });
    } }, 
    // keep centered midLeft and midRight
    keepCentered = function () {
        el_style.top = (window.innerHeight - el_popup.clientHeight) / 2 + "px";
        window.addEventListener('resize', function () {
            el_style.transition = 'none';
            el_style.top = (window.innerHeight - el_popup.clientHeight) / 2 + "px";
            el_style.transition = "all " + transition + "ms ease";
        });
    }, 
    // once it finishes closing, the item is destroyed or disappears
    displayNone = function () {
        if (!fadeEffect) {
            setTimeout(function () {
                if (destroy) {
                    el_popup.remove();
                }
                else {
                    el_style.display = 'none';
                }
            }, transition);
        }
    };
    function responsive(name_position, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        function checkSize() {
            var el_left_position = document.body.clientWidth - el_popup.clientWidth, el_top_position = window.innerHeight - el_popup.clientHeight;
            if (name_position == 'right') {
                if (document.body.clientWidth <= el_popup.clientWidth + x) {
                    if (el_left_position >= 0)
                        el_style.right = el_left_position + "px";
                }
                else {
                    el_style.right = x + "px";
                }
            }
            else {
                if (document.body.clientWidth <= el_popup.clientWidth + x) {
                    if (el_left_position >= 0)
                        el_style.left = el_left_position + "px";
                }
                else {
                    el_style.left = x + "px";
                }
            }
            if (name_position == 'bottom') {
                if (window.innerHeight <= el_popup.clientHeight + y) {
                    if (el_top_position >= 0)
                        el_style.bottom = el_top_position + "px";
                }
                else {
                    el_style.bottom = y + "px";
                }
            }
            else {
                if (window.innerHeight <= el_popup.clientHeight + y) {
                    if (el_top_position >= 0)
                        el_style.top = el_top_position + "px";
                }
                else {
                    el_style.top = y + "px";
                }
            }
        }
        window.onresize = function () {
            checkSize();
        };
        checkSize();
    }
    function timeEvent() {
        if (optionsTime) {
            var time_1 = optionsTime.time, action_1 = optionsTime.action;
            if (time_1 >= 100) {
                var time_interval_1 = 0, interval_1 = setInterval(function () {
                    time_interval_1++;
                    var progress = parseInt(((100 / time_1) * time_interval_1).toString());
                    if (progress_bar)
                        progress_bar.style.width = progress + "%";
                    if (time_interval_1 >= time_1 || btn_clearTime) {
                        switch (action_1.trim()) {
                            case 'close':
                                closePopup();
                                break;
                            case 'activeBtn':
                                if (btn_close)
                                    btn_close.classList.add('btn-active');
                                if (btn_close)
                                    btn_close.classList.remove('btn-disable');
                                closeBtn_avalible = true;
                                btnCloseEvent();
                                break;
                        }
                        clearInterval(interval_1);
                    }
                }, 10);
            }
        }
    }
    function customPosition() {
        if (moveTo) {
            var _a = moveTo.x, x_1 = _a === void 0 ? 0 : _a, _b = moveTo.y, y_1 = _b === void 0 ? 0 : _b, _c = moveTo.direction, direction_1 = _c === void 0 ? '' : _c;
            if (moveTo) {
                el_style.setProperty(direction_1, '-100%');
                setTimeout(function () {
                    if (direction_1 == 'right' || direction_1 == 'left')
                        el_style.setProperty(direction_1, x_1.toString());
                    if (direction_1 == 'top' || direction_1 == 'bottom') {
                        el_style.setProperty(direction_1, y_1.toString());
                        el_style.setProperty('left', x_1.toString());
                    }
                    responsive(direction_1, x_1, y_1);
                });
            }
        }
    }
    function openPopup() {
        if (!transition_finished)
            return;
        btn_clearTime = false;
        transition_finished = false;
        if (fadeEffect)
            fadeIn(el_popup);
        toDirection();
        if (optionsTime && optionsTime.action.trim() == 'activeBtn')
            closeBtn_avalible = false;
        if (btn_close && optionsTime)
            btn_close.classList.add('btn-disable');
        btnCloseEvent();
    }
    function closePopup() {
        if (fadeEffect) {
            fadeOut(el_popup);
        }
        else {
            setTimeout(function () { transition_finished = true; }, transition);
        }
        if (lightbox)
            fadeOut(popupLightbox);
        setTimeout(function () { return popupLightbox.remove(); }, lightboxTransition);
        if (!moveTo) {
            closeDirection();
        }
        else {
            var direction_2 = moveTo.direction;
            ['left', 'right', 'bottom', 'top'].filter(function (p) {
                if (p === direction_2)
                    el_style.setProperty(direction_2, '-100%');
            });
        }
        displayNone();
        if (progress_bar)
            progress_bar.style.width = "0%";
    }
    // Close Popup
    var btnCloseEvent = function () {
        if (!btn_close)
            return;
        clickEvent(btn_close, function () {
            if (!closeBtn_avalible)
                return;
            if (btn_close && optionsTime)
                btn_close.classList.remove('btn-active');
            btn_clearTime = true;
            closePopup();
        });
    };
    // close popup
    function closeDirection() {
        if (moveTo && direction || moveTo)
            return;
        if (direction.trim() == 'center') {
            if (fadeEffect)
                el_style.transition = "all " + (transition - 100) + "ms ease";
            el_style.transform = 'scale(0.6)';
        }
        else {
            setNewPosition('close');
        }
    }
    function setNewPosition(status) {
        if (status === void 0) { status = 'open'; }
        if (direction.split('').length >= 7 && !moveTo) {
            // Ej. bottomLeft = left
            var position_x_1 = direction.match(/[A-Z]\w+/g).toString().toLowerCase(), 
            // Ej. bottomLeft = bottom
            position_y_1 = direction.match(/^[a-z]+/g).toString().toLowerCase(), value_property_x = (status == 'open') ? '-100%' : '0%', timeOut_value_1 = (status == 'open') ? '0%' : '-100%';
            if (position_x_1 === 'center' && position_y_1 != 'mid') {
                el_style.cssText += "\n                    left:0px;\n                    right:0px;\n                    width: fit-content;\n                    height: fit-content;\n                    margin: auto;\n                    ";
                el_style.setProperty(position_y_1, value_property_x);
                setTimeout(function () { return el_style.setProperty(position_y_1, timeOut_value_1); });
            }
            if (position_y_1 != 'mid' && position_x_1 != 'center') {
                el_style.setProperty(position_x_1, value_property_x);
                el_style.setProperty(position_y_1, '0px');
                setTimeout(function () { return el_style.setProperty(position_x_1, timeOut_value_1); });
            }
            else if (position_y_1 == 'mid') {
                keepCentered();
                el_style.setProperty(position_x_1, value_property_x);
                el_style.transition = 'none';
                setTimeout(function () {
                    el_style.setProperty(position_x_1, timeOut_value_1);
                    el_style.transition = "all " + transition + "ms ease";
                });
            }
        }
    }
    // direction effect
    function toDirection() {
        if (lightbox) {
            document.body.appendChild(popupLightbox);
            fadeIn(popupLightbox);
        }
        if (!fadeEffect) {
            el_popup.removeAttribute('style');
            transition_finished = false;
        }
        el_style.transition = "all " + transition + "ms ease";
        if (!moveTo) {
            if (direction.trim() == 'center') {
                if (fadeEffect)
                    el_style.transition = "all " + (transition - 100) + "ms ease";
                el_style.transform = 'scale(0.6)';
                el_popup.classList.add('center');
                setTimeout(function () { return el_style.transform = 'scale(1)'; });
            }
            else {
                setNewPosition();
            }
        }
        else {
            customPosition();
        }
        setTimeout(function () {
            timeEvent();
        }, transition);
    }
    // fade effect
    var fadeOut = function (el) {
        var count = 10, interval = setInterval(function () {
            count--;
            el.style.opacity = "" + count / 10;
            if (count <= 0) {
                setTimeout(function () {
                    var allClassRemove = ['top-center', 'center', 'bottom-center'];
                    allClassRemove.forEach(function (e) {
                        if (el.classList.contains(e))
                            el.classList.remove(e);
                    });
                    if (destroy) {
                        el_popup.remove();
                    }
                    else {
                        el.style.display = 'none';
                    }
                    transition_finished = true;
                }, transition);
                clearInterval(interval);
            }
        });
    }, fadeIn = function (el) {
        var count = 0;
        el.style.display = 'flex';
        var interval = setInterval(function () {
            count++;
            el.style.opacity = "" + count / 10;
            if (count >= 10) {
                clearInterval(interval);
            }
        });
    };
    // Open Popup
    if (btn_open) {
        clickEvent(btn_open, function () {
            openPopup();
        });
    }
    else {
        openPopup();
    }
    function slideshow() {
        // slideshow config
        var _a = configApp.slideConfig, _b = _a.mainSlideshow, mainSlideshow = _b === void 0 ? '.slideshow' : _b, _c = _a.slideShowContent, slideShowContent = _c === void 0 ? '.slides-container' : _c, _d = _a.slide_transition, slide_transition = _d === void 0 ? 600 : _d, _e = _a.autoPlay, autoPlay = _e === void 0 ? false : _e, _f = _a.infinite, infinite = _f === void 0 ? false : _f, _g = _a.classBtnNext, classBtnNext = _g === void 0 ? '.btn-next' : _g, _h = _a.classBtnPrev, classBtnPrev = _h === void 0 ? '.btn-prev' : _h;
        // main container
        var slideshow = document.querySelector(mainSlideshow);
        if (!slideshow)
            return;
        var slide_container = slideshow.querySelector(slideShowContent), slide_items = slide_container.children, slide_length = slide_items.length, slide_button_prev = slideshow.querySelector(classBtnPrev), slide_button_next = slideshow.querySelector(classBtnNext);
        var slide_style = slide_container.style, delay_autoplay = false, continue_slide = true, current_slide = (infinite) ? 1 : 0;
        // loop condicion  infinite 
        if (infinite) {
            var last_item_clone = slide_items[slide_length - 1].cloneNode(true);
            slide_container.insertBefore(last_item_clone, slide_items[0]);
            slide_style.marginLeft = "-100%";
        }
        slide_style.width = ((infinite) ? slide_length + 1 : slide_length) + "00%";
        // loop infinite
        if (autoPlay) {
            var counter_1 = 0;
            setInterval(function () {
                counter_1++;
                if (delay_autoplay)
                    counter_1 = 0;
                if (counter_1 >= slide_transition) {
                    nextSlide();
                    counter_1 = 0;
                }
            });
        }
        // click events
        clickEvent(slide_button_prev, function () { return prevSlide(); });
        clickEvent(slide_button_next, function () { return nextSlide(); });
        function prevSlide() {
            if (!continue_slide)
                return;
            delay_autoplay = true;
            if (current_slide == 0 && infinite) {
                slide_style.transition = "none";
                slide_style.marginLeft = "-" + slide_items[0].clientWidth * slide_length + "px";
                current_slide = slide_length;
            }
            if (current_slide <= 0 && infinite) {
                current_slide = slide_length + 1;
            }
            else if (current_slide <= 0 && !infinite) {
                current_slide = slide_length;
            }
            current_slide--;
            setTimeout(function () {
                slide_style.marginLeft = "-" + slide_items[0].clientWidth * current_slide + "px";
                slide_style.transition = "all " + slide_transition + "ms ease";
            }, 20);
            setTimeout(function () {
                if (current_slide == 0 && infinite) {
                    current_slide = slide_length;
                    slide_style.marginLeft = "-" + slide_items[0].clientWidth * slide_length + "px";
                    slide_style.transition = "none";
                }
                delay_autoplay = false;
                continue_slide = true;
            }, slide_transition);
            continue_slide = false;
        }
        function nextSlide() {
            if (!continue_slide)
                return;
            delay_autoplay = true;
            if (current_slide == slide_length && infinite) {
                slide_style.transition = "none";
                slide_style.marginLeft = "-0px";
            }
            current_slide++;
            if (current_slide >= slide_length + 1 && infinite) {
                current_slide = 1;
            }
            else if (current_slide > slide_length - 1 && !infinite) {
                current_slide = 0;
            }
            setTimeout(function () {
                slide_style.transition = "all " + slide_transition + "ms ease";
                slide_style.marginLeft = "-" + slide_items[0].clientWidth * current_slide + "px";
            }, 20);
            setTimeout(function () {
                if (current_slide == slide_length && infinite) {
                    current_slide = 0;
                    slide_style.marginLeft = "-0px";
                    slide_style.transition = "none";
                }
                delay_autoplay = false;
                continue_slide = true;
            }, slide_transition);
            continue_slide = false;
        }
    }
    if (configApp.slideConfig)
        slideshow();
}
