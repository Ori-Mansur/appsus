'use strict'

import storageService, { makeId } from '../../../../lib/utils.js'



export default {
    getMails,
    getEmailById,
    getEmailByFilter,
    showMoreFromEmail,
    addNewMail,
    deleteMail,
    saveEmailToStorage,
    getEmialsByType,
    readEmail,
    getEmailsAmount,
    starredEmail,
    toggleReadEmail
}


const MAIL_KEY = 'emails';


var gEmails;

getMails();


function getMails(){
    var mails = storageService.load(MAIL_KEY);
    if(!mails || mails.length === 0 ) {
        mails = _createMails();
        storageService.store(MAIL_KEY,mails);
    }
    gEmails = mails;
    // return Promise.resolve(gEmails);
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
            gEmails.forEach(email=>{
                if(email.id !== emailId && email.isShowingMore === true){
                    email.isShowingMore = false;
                }
            })
            storageService.store(MAIL_KEY,gEmails);
            return Promise.resolve();
        })
}

function getEmailByFilter(key,type,emailsType,sortType){
    
    return getEmialsByType(emailsType)
        .then(emails => {
        var emails =  sortEmails(sortType,emails)
        
        var filteredEmails;
        switch(type){
            case 'readEmails':
                filteredEmails = emails.filter(email => email.isRead);
                break;
            case 'unreadEmails':
                filteredEmails = emails.filter(email => !email.isRead);
                break;
            case 'allEmails':
                filteredEmails = emails;
                break;
        }
        if(filteredEmails && key){
            var regex = new RegExp(`${key}`, 'i');
            filteredEmails = filteredEmails.filter(email => regex.test(email.subject)) 
        }
        return Promise.resolve(filteredEmails)
        })
}

function sortEmails(sort,emails){    
    var sortedEmails;
    if(sort === 'title'){
        sortedEmails = emails.sort((a,b) =>{
            if(a.subject<b.subject) return -1;
            else if(a.subject>b.subject) return 1;
            else return 0;

        })
    } else sortedEmails = emails.sort((a,b)=> b.sentAt - a.sentAt);
    return sortedEmails
}

function addNewMail(email){
    if(email.id){        
        return getEmailById(email.id)
            .then(draftMail =>{
                draftMail.subject = email.subject;
                draftMail.body = email.body;
                draftMail.isRead = false;
                draftMail.isShowingMore = false;
                draftMail.sentAt = Date.now();
                draftMail.type = email.type
                if(email.type === 'draft') draftMail.isRead = true;
                storageService.store(MAIL_KEY,gEmails);
                return Promise.resolve();
            })
    } else {
        var newEmail = {
            id: makeId(),
            subject: email.subject,
            body: email.body,
            isRead: false,
            isShowingMore: false,
            sentAt: Date.now(),
            type: email.type
        }
        if(email.type ==='draft') newEmail.isRead = true;
        gEmails.unshift(newEmail);
        storageService.store(MAIL_KEY,gEmails);
        return Promise.resolve();
    }
}

function deleteMail(emailId){
   var idx = gEmails.findIndex(email => email.id === emailId)
   gEmails.splice(idx,1);
   storageService.store(MAIL_KEY,gEmails);
   return Promise.resolve(gEmails)
}

function saveEmailToStorage(email){
    storageService.store('email-toKeep',email);
}

function getEmailsAmount(){
    var inboxEmails = gEmails.filter(email => (email.type === 'inbox' ||email.type === 'starred'));
    var length = inboxEmails.length
    var unread = 0;
    for(var i =0;i<gEmails.length;i++){
        if(!gEmails[i].isRead ) unread++
    }
    return Promise.resolve({length,unread})    
}


function getEmialsByType(type){    
    var emails; 
    if(type === 'inbox')  emails = gEmails.filter(email => (email.type === type ||email.type === 'starred')); 
    else  emails = gEmails.filter(email => email.type === type);
    return Promise.resolve(emails);
}

function readEmail(emailId){
    getEmailById(emailId)
        .then(email => {
            email.isRead = true;
            storageService.store(MAIL_KEY,gEmails);
        })
}

function starredEmail(emailId){
    return getEmailById(emailId)
        .then(email => {
            if(email.type === 'starred') email.type = 'inbox'
            else email.type = 'starred';            
            storageService.store(MAIL_KEY,gEmails);
            return Promise.resolve()
        })
}

function toggleReadEmail(emailId){
    return getEmailById(emailId)
        .then(email => {
            email.isRead = !email.isRead;
            storageService.store(MAIL_KEY,gEmails);
            return Promise.resolve();
        })
}




function _createMails(){
    var mails = [
        {
            id: makeId(),
            subject: 'Wassap with Vue?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: true,
            isShowingMore: false,
            sentAt : 1551133930843,
            type: 'draft',
        },
        {
            id: makeId(),
            subject: 'Wassap with React?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: true,
            isShowingMore: false,
            sentAt : 1551133933968,
            type: 'draft',

        },
        {
            id: makeId(),
            subject: 'Hi are you with Angulldkkdar?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            isShowingMore: false,
            sentAt : 1551137340276,
            type: 'inbox',
        },
        {
            id: makeId(),
            subject: 'sap apiis hhwwed with Angular?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: true,
            isShowingMore: false,
            sentAt : 1551133910276,
            type: 'inbox',
        },
        {
            id: makeId(),
            subject: 'we did it witsjllh Awwi29399ar?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            isShowingMore: false,
            sentAt : 1551133493016,
            type: 'starred',
        },
        {
            id: makeId(),
            subject: 'we dww0jsjsjjj lhassssngular?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            isShowingMore: false,
            sentAt : 1551133922216,
            type: 'inbox',
        },
        {
            id: makeId(),
            subject: 'we ?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            isShowingMore: false,
            sentAt : 1551102910116,
            type: 'starred',
        },
        {
            id: makeId(),
            subject: 'you did it!!!!?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit delectus dolorum? Beatae id omnis voluptatum quibusdam, at ad vel aut modi alias quos dolor maxime aliquid non officia harum.',
            isRead: false,
            isShowingMore: false,
            sentAt : 15511339769116,
            type: 'inbox',
        }
    ];
    return mails;
}