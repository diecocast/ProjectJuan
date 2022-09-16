jQuery(document).ready(function($) {
    "use strict";
    
        //Contact
        $('form.contactForm').submit(function(){
            var f = $(this).find('.form-group'), 
            ferror = false, 
            emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    
            f.children('input').each(function(){ // run all inputs
    
                var i = $(this); // current input
                var rule = i.attr('data-rule');
    
                if( rule !== undefined ){
                var ierror=false; // error flag for current input
                var pos = rule.indexOf( ':', 0 );
                if( pos >= 0 ){
                    var exp = rule.substr( pos+1, rule.length );
                    rule = rule.substr(0, pos);
                }else{
                    rule = rule.substr( pos+1, rule.length );
                }
                
                switch( rule ){
                    case 'required':
                    if( i.val()==='' ){ ferror=ierror=true; }
                    break;
                    
                    case 'minlen':
                    if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
                    break;
    
                    case 'email':
                    if( !emailExp.test(i.val()) ){ ferror=ierror=true; }
                    break;
    
                    case 'checked':
                    if( !i.attr('checked') ){ ferror=ierror=true; }
                    break;
                    
                    case 'regexp':
                    exp = new RegExp(exp);
                    if( !exp.test(i.val()) ){ ferror=ierror=true; }
                    break;
                }
                    i.next('.validation').html( ( ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
                }
            });
            f.children('textarea').each(function(){ // run all inputs
    
                var i = $(this); // current input
                var rule = i.attr('data-rule');
    
                if( rule !== undefined ){
                var ierror=false; // error flag for current input
                var pos = rule.indexOf( ':', 0 );
                if( pos >= 0 ){
                    var exp = rule.substr( pos+1, rule.length );
                    rule = rule.substr(0, pos);
                }else{
                    rule = rule.substr( pos+1, rule.length );
                }
                
                switch( rule ){
                    case 'required':
                    if( i.val()==='' ){ ferror=ierror=true; }
                    break;
                    
                    case 'minlen':
                    if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
                    break;
                }
                    i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
                }
            });
            if( ferror ) return false; 
            else var str = $(this).serialize();		
                $.ajax({
                    type: "",
                    url: "",
                    data: str,
                    success: function(msg){
                       // alert(msg);
                        if(msg == 'OK') {
                            $("#sendmessage").addClass("show");			
                            $("#errormessage").removeClass("show");	
                            $('.contactForm').find("input, textarea").val("");
                        }
                        else {
                            $("#sendmessage").removeClass("show");
                            $("#errormessage").addClass("show");
                            $('#errormessage').html(msg);
                        }
                        
                    }
                });
            return false;
        });
    
    });

const form = document.getElementById('contactForm1');

form.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('form',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>console.log(json));
    form.innerHTML = "<h3>Your message has been sent. Thank you!</h3><style></style>";
    Swal.fire({
        title: '<strong>Good Job!</strong>',
        icon: 'success',
        html:
          'Your message has been sended.',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
      })
})