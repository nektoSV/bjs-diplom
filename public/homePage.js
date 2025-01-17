"use strict";



const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

    ApiConnector.current((response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }

    });

const ratesBoard = new RatesBoard();

function getRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
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
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Баланс успешно пополнен');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
        
    });
}

moneyManager.conversationMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертация успешно выполнена');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод выполнен успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }

    });
}

const favoritesWidget = new FavoritesWidget();


    ApiConnector.getFavorites(function(response)  {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            console.log(response.error);

        }

    });
        
    


    favoritesWidget.addUserCallback = function(user) {
    ApiConnector.addUserToFavorites(user, function(response) {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь успешно добавлен в избранное');
        } else {
            favoritesWidget.setMessage(response.sucсes, response.error);

        }

    });
}

favoritesWidget.removeUserCallback = function(user) {
    ApiConnector.removeUserFromFavorites(user, function(response) {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь успешно удален из избранного');
        } else {
            favoritesWidget.setMessage(response.success, response.error);

        }

    });
}


