App = {
    loading: false,
    contracts: {},

    load: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },
    // Connects to the blockchain
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */})
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },
    // Get the first account from metamask
    loadAccount: async () => {
        App.account = web3.eth.accounts[0];
    },
    loadContract: async () => {
        const todoList = await $.getJSON('TodoList.json');
        // TruffleContract allow to you to call the function from the smart contract
        App.contracts.TodoList = TruffleContract(todoList);
        App.contracts.TodoList.setProvider(App.web3Provider);

        App.todoList = await App.contracts.TodoList.deployed();
    },
    render: async () => {
        // Prevent render twice
        if(App.loading){
            return;
        }

        App.setLoading(true);

        // Display the account
        $('#account').html(App.account);

        App.setLoading(false);

    },
    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $('#loader');
        const content = $('#content');
        if(boolean){
            loader.show();
            content.hide();
        }
        else{
            loader.hide();
            content.show();
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})