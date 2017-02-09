(function() {
    "use strict";

    const runGameModule = (function() {
        const display = document.getElementById('cards');

        class CardGame {
            constructor(cards) {
                this.cardsAvail = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
                this.playerHandTotal = 0;
                this.cardsDealt = [];
                this.gameEnd = false;
                this.init();
            }

            dealCards() {
                let card1 = this.cardsAvail[Math.floor(Math.random() * this.cardsAvail.length)];
                let card2 = this.cardsAvail[Math.floor(Math.random() * this.cardsAvail.length)];
                this.cardsDealt.push(card1);
                this.cardsDealt.push(card2);
                this.buildCard(card1);
                this.buildCard(card2);
                console.log(`deal: ${card1}, ${card2} `);
            }

            buildCard(card) {
                const newCard = document.createElement('div');
                newCard.className = 'card';
                newCard.innerHTML = card;
                display.appendChild(newCard);
            }

            handTotal() {
                let hand = 0;
                this.cardsDealt.forEach((card) => {
                    if (Number(card)) {
                        hand += Number(card);
                    } else {
                        if (card === 'J' || card === 'Q' || card === 'K') {
                            hand += 10;
                        }
                        if (card === 'A') {
                            if (hand <= 10) {
                                hand += 11;
                            } else if (hand > 10) {
                                hand += 1;
                            }
                        }
                    }
                });
                this.playerHandTotal = hand;
                console.log(hand);
            }

            checkResult(standing, hitting) {
                if (!this.gameEnd) {
                    this.handTotal();
                    if (this.playerHandTotal === 21) {
                        this.gameEnd = true;
                        alert('You win!');
                        location.reload();
                    } else if (this.playerHandTotal <= 15 && standing) {
                        this.gameEnd = true;
                        alert('you lose.');
                        location.reload();
                    } else if (this.playerHandTotal < 19 && this.playerHandTotal > 15 && standing) {
                        this.gameEnd = true;
                        alert('Push!');
                        location.reload();
                    } else if (this.playerHandTotal > 18 && this.playerHandTotal < 21 && standing) {
                        this.gameEnd = true;
                        alert('You win!');
                        location.reload();
                    } else if (this.playerHandTotal > 21) {
                        this.gameEnd = true;
                        alert('You Bust.');
                        location.reload();
                    }
                }
            }

            init() {
                this.dealCards();
                this.checkResult(false, false);
            }
        }

        function hit() {
            let hitCard = round.cardsAvail[Math.floor(Math.random() * round.cardsAvail.length)];
            console.log(`hit: ${hitCard}`);
            round.cardsDealt.push(hitCard);
            if (!round.gameEnd) {
                round.buildCard(hitCard);
                round.checkResult(false, true);
            }
        }

        function stand() {
            round.checkResult(true, false);
        }
        const round = new CardGame();
        return {
            hit: hit,
            stand: stand
        };
    })();
    document.getElementById('stand').addEventListener('click', () => {
        runGameModule.stand();
    });

    document.getElementById('hit').addEventListener('click', () => {
        runGameModule.hit();
    });
})();
