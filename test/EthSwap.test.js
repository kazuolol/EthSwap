



const { default: Web3 } = require('web3')

const Token = artifacts.require("Token")
const EthSwap = artifacts.require("EthSwap")

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', ([deployer, investor]) => {
    let token, ethSwap;

    before(async () => {
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address)
        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    describe('EthSwap deployment', async () => {
        it('has a name', async () => {
            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap!!')
        })
    })

    describe('Token deployment', async () => {
        it('has a name', async () => {
            const name = await token.name()
            assert.equal(name, 'Dapp Token')
        })
    })

    describe('contract has tokens', async () => {
        it('has a non zero balance', async () => {

            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('buy tokens', async () => {
        let result;

        before(async () => {

            await token.approve(ethSwap.address, tokens('100'), { from: investor })
            result = await ethSwap.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether') })

        })

        it('allows users to buy tokens at a fixed rate', async () => {
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))
            //check ethSwap balance
            let ethSwapBalance;
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999900'))
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'ether'))
            //check logs for event emission with correct data
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')
        })

    })

    describe('sell tokens', async () => {
        let result;

        before(async () => {
            //investor must approve tokens before the purchase 
            await token.approve(ethSwap.address, tokens('100'), { from: investor })
            result = await ethSwap.sellTokens(tokens('100'), { from: investor })

        })

        it('allows users to sell tokens at a fixed rate', async () => {
            //check balance of investor after the sell, should be 0
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('0'))
            //check balance of ethSwap after sell, should be back to 1mil bc the bought tokens (100) were sold back
            let ethSwapBalance
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance, tokens('1000000'))
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance, web3.utils.toWei('0', 'Ether'))
            //check logs for event emission with correct data
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')
            //test for failure: investor can't sell more tokens than they have
            ethSwap.sellTokens(tokens('500'), { from: investor }).should.be.rejected;
            

        })  

    })


})

