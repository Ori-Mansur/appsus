'use strict'

import storageService, { makeId } from '../../../../lib/utils.js'



export default {
    getMails,
    getEmailById
}


const MAIL_KEY = 'emails';


var gEmails;




function getMails(){
    var mails = storageService.load(MAIL_KEY);
    if(!mails || mails.length === 0 ) {
        mails = _createMails();
        storageService.store(MAIL_KEY,mails);
    }
    gEmails = mails;
    return Promise.resolve(gEmails);
}


function getEmailById(emailId){
    var email = gEmails.find(email => email.id === emailId);
    return Promise.resolve(email);
}


function _createMails(){
    var mails = [
        {
            id: makeId(),
            subject: 'Wassap with Vue?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            sentAt : 1551133930843
        },
        {
            id: makeId(),
            subject: 'Wassap with React?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: true,
            sentAt : 1551133933968
        },
        {
            id: makeId(),
            subject: 'Wassap with Angular?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            sentAt : 1551133910276
        },
        {
            id: makeId(),
            subject: 'Wassap with Angular?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: true,
            sentAt : 1551133910276
        },
        {
            id: makeId(),
            subject: 'Wassap with Angular?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            sentAt : 1551133910276
        }
    ];
    return mails;
}