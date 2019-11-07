'use strict'

import storageService, { makeId } from '../../../../lib/utils.js'



export default {
    getMails,
    getEmailById,
    getEmailByFilter,
    showMoreFromEmail,
    addNewMail,
    deleteMail,
    saveEmailToStorage
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

function showMoreFromEmail(emailId){
    return getEmailById(emailId)
        .then(email =>{
            if(email.isShowingMore) email.isShowingMore=false;
            else email.isShowingMore = true;
            storageService.store(MAIL_KEY,gEmails);
            return Promise.resolve();
        })
}

function getEmailByFilter(key,type){
    var regex = new RegExp(`${key}`, 'i');
    var emails;
    switch(type){
        case 'readEmails':
            emails = gEmails.filter(email => email.isRead);
            break;
        case 'unreadEmails':
            emails = gEmails.filter(email => !email.isRead);
            break;
        case 'allEmails':
            emails = gEmails;
            break;
    }
    if(emails && key) emails = emails.filter(email => regex.test(email.subject)) 
    return Promise.resolve(emails)
}

function addNewMail(email){
    var newEmail = {
        id: makeId(),
        subject: email.subject,
        body: email.body,
        isRead: false,
        isShowingMore: false,
        sentAt: Date.now()
    }
    gEmails.unshift(newEmail);
    storageService.store(MAIL_KEY,gEmails);
    return Promise.resolve();
}

function deleteMail(emailId){
   var idx = gEmails.findIndex(email => email.id === emailId)
   gEmails.splice(idx,1);
   storageService.store(MAIL_KEY,gEmails);
   return Promise.resolve()
}

function saveEmailToStorage(email){
    storageService.store('email-toKeep',email);
}


function _createMails(){
    var mails = [
        {
            id: makeId(),
            subject: 'Wassap with Vue?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            isShowingMore: false,
            sentAt : 1551133930843
        },
        {
            id: makeId(),
            subject: 'Wassap with React?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: true,
            isShowingMore: false,
            sentAt : 1551133933968
        },
        {
            id: makeId(),
            subject: 'Wassap with Angular?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            isShowingMore: false,
            sentAt : 1551133910276
        },
        {
            id: makeId(),
            subject: 'Wassap with Angular?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: true,
            isShowingMore: false,
            sentAt : 1551133910276
        },
        {
            id: makeId(),
            subject: 'Wassap with Angular?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            isShowingMore: false,
            sentAt : 1551133910276
        }
    ];
    return mails;
}