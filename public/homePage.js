"use strict";


const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if(response.success) {
            location.reload();
        }
    });
};

    ApiConnector.current((response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        }

    });

const ratesBoard = new RatesBoard();

function getRates() {
    ApiConnector.getStocks((response) => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getRates();

setInterval(getRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data,(response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            MessageWidget.setMessage(response.success, 'Баланс успешно пополнен');
        }else {
            MessageWidget.setMessage(response.success, response.error);
        }
        
    });
}

moneyManager.conversationMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            MessageWidget.setMessage(response.success, 'Конвертация успешно выполнена');
        }else {
            MessageWidget.setMessage(response.success, response.error);
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            MessageWidget.setMessage(response.success, 'Перевод выполнен успешно');
        }else {
            MessageWidget.setMessage(response.success, response.error);
        }

    });
}


