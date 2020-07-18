let counter = 0;
    
checkDefaultFont();

$( ".draggable" ).draggable( {
    helper: "clone",
    appendTo: "body",
    revert: "invalid",
    snap: ".fr",
    stack: ".draggable",
    scroll: false
} );

function setDroppable(id) {
    $(id).droppable({
        accept: ".draggable",
        activeClass: "snaptarget-hover",
        drop: function (event, ui) {
            var ct = $(this);
            var item = $(ui.draggable);
            var origPos;
            var ctPos = ct.offset();
        
            if (item.is('.fr')) {
            origPos = item.offset();
            ct.append(item);
            } else {
            origPos = ui.offset;
            item = item.clone();
            ct.append(item);
            item.removeClass("ui-draggable");
            item.addClass('fr');
            item.draggable({
                containment: id,
                snap: false,
                stack: ".draggable",
                scroll: false
            });
            }
            item.css({
                top: origPos.top - ctPos.top - 1,
                left: origPos.left - ctPos.left -1
            } );
            $('.fr > .sticker-parent').rotatable();
            // $('.fr > .sticker-parent').resizable();
    }
    } );
    
}

setDroppable( '#top' );
setDroppable( '#right' );
setDroppable( '#bottom' );
setDroppable( '#left' );


$( ".plus" ).click( function () {
    if( $('.toggle-inputs').css('display') == 'block') {
        $('.plus > span').html("+");
    } else {
        $('.plus > span').html("-");
    }
    $( ".toggle-inputs" ).slideToggle( "slow" );
} );

function checkDefaultFont() {
    localStorage.setItem( 'font', 'rounded' );
}

function textValidation(id, counterClass, limit) {
    document.querySelector( id ).oninput = function ( e ) {
        let counter = e.target.value.length,
            counterElement = document.querySelector( counterClass );
        counter <= limit && (counterElement.innerHTML = counter)
        
    }
}

textValidation('#top-input', '.top-counter', 15);
textValidation('#bottom-input', '.bottom-counter', 15);
textValidation('#left-input', '.left-counter', 20);
textValidation( '#right-input', '.right-counter', 20 );


function setFontFamily(value, el) {
    switch(value) {
        case 'classic':
            el.style.fontFamily = 'WhitneySans';
            el.style.lineHeight = '80px';
            el.style.fontSize = '4ex';
            break;
        case 'rounded':
            el.style.fontFamily = 'Chewy';
            break;
        case 'script':
            el.style.fontFamily = 'Damion'
            break;
        case 'chunky':
            el.style.fontFamily = 'Arial'
            break;
        default:
            break;
    }
}

function createElementOnFrame( valueId, frameId ) {

        counter++;

        let value = document.querySelector( valueId ).value;

        if ( value.length !== 0 ) {
            
            let font = localStorage.getItem( 'font' ),
                div = document.createElement( 'div' ),
                id = (frameId + counter).replace('#', '')

            if(frameId == '#right' || frameId == '#left') {
                div.className = 'textDropable rotate'
            } else {
                div.className = 'textDropable'
            }

            div.id = id;
            div.innerHTML = value;

            setTimeout( () => {
                let w = div.offsetWidth + 2;
                div.style.width = w + 'px';
            }, 0 );

            setFontFamily( font, div );
            document.querySelector( frameId ).append( div );

            $( '#'+id ).draggable( { containment: frameId} )            
        }

}

function clearInputs() {
    document.querySelector( '#top-input' ).value = '',
    document.querySelector( '#right-input' ).value = '',
    document.querySelector( '#bottom-input' ).value = '',
    document.querySelector( '#left-input' ).value = '';
    let counters = document.querySelectorAll( '.limitor > span' );
    for ( let i = 0; i < counters.length; i++) {
        counters[i].innerHTML = 0;
    }
}

function clearInnerHtml(elementId) {
    document.querySelector(elementId).innerHTML = ''
}

document.querySelector( '.apply-button' ).onclick = function () {

    createElementOnFrame('#top-input', '#top');
    createElementOnFrame('#bottom-input', '#bottom');
    createElementOnFrame('#right-input', '#right');
    createElementOnFrame( '#left-input', '#left' );

    clearInputs();
}

$( "input[type='radio']" ).click( function () {

    $("input[type='radio']").parent().removeClass('checked-font');
    $( this ).parent().addClass( 'checked-font' );
    
    var radioValue = $( "input[name='font']:checked" ).val();
    if(radioValue){
        localStorage.setItem('font', radioValue)
    }
} )

document.querySelector( '.reset' ).onclick = function () {
    clearInnerHtml('#top');
    clearInnerHtml('#right');
    clearInnerHtml('#bottom');
    clearInnerHtml('#left');
    document.querySelector('.font-item > label').click()
    document.querySelector( '.carousel-indicators > li' ).click()
    clearInputs();
}

document.querySelector( '.chat-close' ).onclick = function (e) {
    document.querySelector( '.live-chat-wrapper' ).style.display = 'none';
    e.stopPropagation()

}

document.querySelector( '.support-icon-wrapper' ).onclick = function () {
    document.querySelector('.live-chat-wrapper').style.display = 'block'
}