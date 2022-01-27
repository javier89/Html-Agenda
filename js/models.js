/*
    * Main Contact class
    * Params: first_name, last_name, email, phoneNumber, country
*/

var Contact = function Contact(raw){
    this.id = _.uniqueId();
    if(raw != undefined){
        this.first_name = raw.first_name;
        this.last_name = raw.last_name;
        this.email = raw.email;
        this.phoneNumber = raw.phoneNumber;
        this.country = raw.country;

    }
};