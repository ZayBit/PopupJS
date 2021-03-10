// Interface Config Popup
interface config {
    btnOpen?: string,
    btnClose?: string,
    closeBtnDisable?: boolean,
    fadeEffect?: boolean,
    lightbox?: boolean,
    lightboxTransition?: number,
    direction?: string,
    transition?: number,
    destroy?:boolean,
    slideConfig?: {
        mainSlideshow?: string,
        slideShowContent?: string,
        slide_transition?: number,
        autoPlay?: boolean,
        infinite?: boolean,
        classBtnNext?: string,
        classBtnPrev?: string
    },
    moveTo?: {
        x?: number,
        y?: number,
        direction?: string
    },
    optionsTime?: {
        time: number,
        action: string,
        progressBar?: string
    }
}

 function Popup(className: string, configApp: config) {
    const el_popup = document.querySelector(className) as HTMLElement;
    if (!el_popup) return;
    // create the lightbox
    const popupLightbox = document.createElement('span'),
    // element.style
          el_style = el_popup.style;
    // config object
    let { 
        fadeEffect = true,
        lightbox = false,
        lightboxTransition = 300,
        transition = 600,
        direction = '',
        moveTo,
        closeBtnDisable = false,
        destroy = false,
        optionsTime } = configApp;

    if (direction === '' && !moveTo) return;
    if (lightbox) {
        popupLightbox.classList.add('popup-lightbox');
        popupLightbox.style.transition = `all ${lightboxTransition}ms ease`;
        popupLightbox.style.opacity = '0';
    }
    el_style.opacity = '0';
    el_style.display = 'none';
    let progress_bar = null;
    if(optionsTime && optionsTime.progressBar){
        progress_bar = optionsTime.progressBar.trim() != '' ? el_popup.querySelector(optionsTime.progressBar.trim()) as HTMLElement : false;
    }
    closeDirection()
    let btn_clearTime = false,
        closeBtn_avalible = true,
        transition_finished = true;
    // --- TODO:
    // if(optionsTime.action == 'open') setTimeout()
    // default class of buttons: Open and Close
    const { btnOpen = null, btnClose = '.btn-close' } = configApp,
        btn_open = btnOpen != null ? document.querySelector(btnOpen) : false,
        btn_close = (!closeBtnDisable) ? el_popup.querySelector(btnClose) : false,
    // functions to call event click
        clickEvent = (btn: Element, func: Function) => {if(btn){btn.addEventListener('click', () => func())}},
    // keep centered midLeft and midRight
        keepCentered =()=> {
        el_style.top = `${(window.innerHeight - el_popup.clientHeight) / 2}px`
        window.addEventListener('resize', () => {
            el_style.transition = 'none'
            el_style.top = `${(window.innerHeight - el_popup.clientHeight) / 2}px`
            el_style.transition = `all ${transition}ms ease`
        })
    },
    // once it finishes closing, the item is destroyed or disappears
     displayNone = ()=> {
        if (!fadeEffect) {
            setTimeout(() => {
                if(destroy){
                    el_popup.remove()
                }else { el_style.display = 'none' }
            }, transition)
        }
    }
   function responsive(name_position, x = 0, y = 0) {
        function checkSize() {
            let el_left_position = document.body.clientWidth - el_popup.clientWidth,
                el_top_position = window.innerHeight - el_popup.clientHeight;
            if (name_position == 'right') {
                if (document.body.clientWidth <= el_popup.clientWidth + x) {
                    if (el_left_position >= 0) el_style.right = `${el_left_position}px`;
                } else {
                    el_style.right = `${x}px`;
                }
            } else {
                if (document.body.clientWidth <= el_popup.clientWidth + x) {
                    if (el_left_position >= 0) el_style.left = `${el_left_position}px`;
                } else {
                    el_style.left = `${x}px`;
                }
            }
            if (name_position == 'bottom') {
                if (window.innerHeight <= el_popup.clientHeight + y) {
                    if (el_top_position >= 0) el_style.bottom = `${el_top_position}px`;
                } else {
                    el_style.bottom = `${y}px`
                }
            } else {
                if (window.innerHeight <= el_popup.clientHeight + y) {
                    if (el_top_position >= 0) el_style.top = `${el_top_position}px`;
                } else {
                    el_style.top = `${y}px`
                }
            }
        }
        window.onresize = () => {
            checkSize()
        }
        checkSize();
    }
    function timeEvent() {
        if (optionsTime) {
            const { time, action } = optionsTime;
            if (time >= 100) {
                let time_interval = 0,
                    interval = setInterval(() => {
                        time_interval++;
                        let progress = parseInt(((100 / time) * time_interval).toString())
                        if (progress_bar) progress_bar.style.width = `${progress}%`;
                        if (time_interval >= time || btn_clearTime) {
                            switch (action.trim()) {
                                case 'close':
                                    closePopup()
                                    break;
                                case 'activeBtn':
                                    if (btn_close) btn_close.classList.add('btn-active')
                                    if (btn_close) btn_close.classList.remove('btn-disable')
                                    closeBtn_avalible = true;
                                    btnCloseEvent()
                                    break;
                            }
                            clearInterval(interval)
                        }
                    }, 10)
            }
        }
    }
    function customPosition() {
        if (moveTo) {
            let { x = 0, y = 0, direction = ''} = moveTo;
            if (moveTo) {
                el_style.setProperty(direction, '-100%')
                setTimeout(() => {
                    if (direction == 'right' || direction == 'left') el_style.setProperty(direction, x.toString())
                    if (direction == 'top' || direction == 'bottom') {
                        el_style.setProperty(direction, y.toString())
                        el_style.setProperty('left', x.toString())
                    }
                    responsive(direction, x, y)
                })
            }
        }
    }
    function openPopup(){
        if (!transition_finished) return;
        btn_clearTime = false;
        transition_finished = false;
        if (fadeEffect) fadeIn(el_popup);
        toDirection()
        if (optionsTime && optionsTime.action.trim() == 'activeBtn') closeBtn_avalible = false;
        if (btn_close && optionsTime) btn_close.classList.add('btn-disable');
        btnCloseEvent()
    }
    function closePopup() {
        if (fadeEffect) {
            fadeOut(el_popup)
        } else {
            setTimeout(() => { transition_finished = true }, transition)
        }
        if (lightbox) fadeOut(popupLightbox);
        setTimeout(() => popupLightbox.remove(), lightboxTransition)
        if (!moveTo) {
            closeDirection()
        } else {
            const { direction } = moveTo;
            ['left','right','bottom','top'].filter(p=>{
                if(p===direction)el_style.setProperty(direction,'-100%')
            })
        }
        displayNone()
        if (progress_bar) progress_bar.style.width = `0%`;
    }
    // Close Popup
    const btnCloseEvent = ()=> {
        if (!btn_close) return;
        clickEvent(btn_close, () => {
            if (!closeBtn_avalible) return;
            if (btn_close && optionsTime) btn_close.classList.remove('btn-active')
            btn_clearTime = true;
            closePopup();
        });
    }
    // close popup
    function closeDirection() {
        if (moveTo && direction || moveTo) return;
        if (direction.trim() == 'center') {
            if (fadeEffect) el_style.transition = `all ${transition - 100}ms ease`;
            el_style.transform = 'scale(0.6)';
        } else {
            setNewPosition('close');
        }
    }
    function setNewPosition(status = 'open') {
        if (direction.split('').length >= 7 && !moveTo) {
            // Ej. bottomLeft = left
            let position_x = direction.match(/[A-Z]\w+/g).toString().toLowerCase(),
            // Ej. bottomLeft = bottom
                position_y = direction.match(/^[a-z]+/g).toString().toLowerCase(),

                value_property_x = (status == 'open') ? '-100%' : '0%',
                timeOut_value = (status == 'open') ? '0%' : '-100%';
            if (position_x === 'center' && position_y != 'mid') {
                el_style.cssText += `
                    left:0px;
                    right:0px;
                    width: fit-content;
                    height: fit-content;
                    margin: auto;
                    `;
                el_style.setProperty(position_y, value_property_x)
                setTimeout(() => el_style.setProperty(position_y, timeOut_value))
            }
            if (position_y != 'mid' && position_x != 'center') {
                el_style.setProperty(position_x, value_property_x)
                el_style.setProperty(position_y, '0px')
                setTimeout(() => el_style.setProperty(position_x, timeOut_value))
            } else if (position_y == 'mid') {
                keepCentered();
                el_style.setProperty(position_x, value_property_x)
                el_style.transition = 'none';
                setTimeout(() => {
                    el_style.setProperty(position_x, timeOut_value)
                    el_style.transition = `all ${transition}ms ease`;
                })
            }
        }
    }
    // direction effect
    function toDirection() {
        if (lightbox) {
            document.body.appendChild(popupLightbox);
            fadeIn(popupLightbox)
        }
        if (!fadeEffect) {
            el_popup.removeAttribute('style');
            transition_finished = false;
        }
        el_style.transition = `all ${transition}ms ease`
        if (!moveTo) {
            if (direction.trim() == 'center') {
                if (fadeEffect) el_style.transition = `all ${transition - 100}ms ease`;
                el_style.transform = 'scale(0.6)';
                el_popup.classList.add('center')
                setTimeout(() => el_style.transform = 'scale(1)')
            } else {
                setNewPosition()
            }
        } else {
            customPosition()
        }
        setTimeout(() => {
            timeEvent()
        }, transition)
    }
    // fade effect
    const fadeOut = (el: HTMLElement)=> {
        let count = 10,
            interval = setInterval(function () {
            count--;
            el.style.opacity = `${count / 10}`;
            if (count <= 0) {
                setTimeout(() => {
                    let allClassRemove = ['top-center', 'center', 'bottom-center']
                    allClassRemove.forEach(e => {
                        if (el.classList.contains(e)) el.classList.remove(e);
                    })
                    if(destroy){
                        el_popup.remove()
                    }else{ el.style.display = 'none' }
                    transition_finished = true;
                }, transition)
                clearInterval(interval);
            }
        })
    },
    fadeIn = (el: HTMLElement)=> {
        let count = 0;
        el.style.display = 'flex';
        let interval = setInterval(function () {
            count++;
            el.style.opacity = `${count / 10}`;
            if (count >= 10) {
                clearInterval(interval);
            }
        })
    }
        // Open Popup
        if(btn_open){
            clickEvent(btn_open, () => {
                openPopup();
            });
        }else{
            openPopup();
        }
    function slideshow() {
        // slideshow config
        const {
            mainSlideshow = '.slideshow',
            slideShowContent = '.slides-container',
            slide_transition = 600,
            autoPlay = false,
            infinite = false,
            classBtnNext = '.btn-next',
            classBtnPrev = '.btn-prev'
        } = configApp.slideConfig;
        // main container
        const slideshow = document.querySelector(mainSlideshow) as HTMLElement;
        if (!slideshow) return;
        const slide_container = slideshow.querySelector(slideShowContent) as HTMLElement,
            slide_items = slide_container.children,
            slide_length = slide_items.length,
            slide_button_prev = slideshow.querySelector(classBtnPrev),
            slide_button_next = slideshow.querySelector(classBtnNext);

        let slide_style = slide_container.style,
            delay_autoplay = false,
            continue_slide = true,
            current_slide = (infinite) ? 1 : 0;
        // loop condicion  infinite 
        if (infinite) {
            let last_item_clone = slide_items[slide_length - 1].cloneNode(true);
            slide_container.insertBefore(last_item_clone, slide_items[0])
            slide_style.marginLeft = `-100%`;
        }
        slide_style.width = `${(infinite) ? slide_length + 1 : slide_length}00%`;
        // loop infinite
        if (autoPlay) {
            let counter = 0;
            setInterval(() => {
                counter++;
                if (delay_autoplay) counter = 0;
                if (counter >= slide_transition) {
                    nextSlide()
                    counter = 0;
                }
            })
        }
        // click events
        clickEvent(slide_button_prev,()=>prevSlide())
        clickEvent(slide_button_next,()=>nextSlide())
        function prevSlide() {
            if (!continue_slide) return;
            delay_autoplay = true;
            if (current_slide == 0 && infinite) {
                slide_style.transition = `none`;
                slide_style.marginLeft = `-${slide_items[0].clientWidth * slide_length}px`;
                current_slide = slide_length;
            }
            if (current_slide <= 0 && infinite) {
                current_slide = slide_length + 1;
            } else if (current_slide <= 0 && !infinite) {
                current_slide = slide_length;
            }
            current_slide--;
            setTimeout(() => {
                slide_style.marginLeft = `-${slide_items[0].clientWidth * current_slide}px`;
                slide_style.transition = `all ${slide_transition}ms ease`;
            }, 20)
            setTimeout(() => {
                if (current_slide == 0 && infinite) {
                    current_slide = slide_length;
                    slide_style.marginLeft = `-${slide_items[0].clientWidth * slide_length}px`;
                    slide_style.transition = `none`;
                }
                delay_autoplay = false;
                continue_slide = true;
            }, slide_transition)
            continue_slide = false;
        }
        function nextSlide() {
            if (!continue_slide) return;
            delay_autoplay = true;
            if (current_slide == slide_length && infinite) {
                slide_style.transition = `none`;
                slide_style.marginLeft = `-0px`;
            }
            current_slide++;
            if (current_slide >= slide_length + 1 && infinite) {
                current_slide = 1;
            } else if (current_slide > slide_length - 1 && !infinite) {
                current_slide = 0;
            }
            setTimeout(() => {
                slide_style.transition = `all ${slide_transition}ms ease`;
                slide_style.marginLeft = `-${slide_items[0].clientWidth * current_slide}px`;
            }, 20)
            setTimeout(() => {
                if (current_slide == slide_length && infinite) {
                    current_slide = 0;
                    slide_style.marginLeft = `-0px`;
                    slide_style.transition = `none`;
                }
                delay_autoplay = false;
                continue_slide = true;
            }, slide_transition)
            continue_slide = false;
        }
    }
    if (configApp.slideConfig) slideshow();
}

