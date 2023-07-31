let state = true
const board = [...document.querySelectorAll('.column')]

function mark(players, board){
    if(board){
        let index = 0

        board.forEach((column, i) => {
            column.addEventListener('click', e => {
                if(e.target.getAttribute('data-mark') === '' && state){
                    e.target.innerHTML = players[index].id
                    e.target.setAttribute('data-mark', players[index].id)

                    if(iswin(players[index], board, i)){
                        state = false
                        updatescore(players[index])
                    }

                    if(players.length - 1 > index){
                        index++
                    }else{
                        index = 0
                    }
                }
            })
        });
    }
}

function iswin(player, board, markedcell){
    const win = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]];
    let winner = false

    win.forEach(w => {
        if(w.includes(markedcell)){
            let group = []
            w.forEach(c => {
                let getMark = board[c].getAttribute('data-mark')
                group.push(getMark === player.id)
            })

            if(group.every(current => current === true)){
                player.score++
                winner = true
                return
            }
        }
    })

    return winner
}

function updatescore(player){
    const score = document.getElementById(player.id === 'X' ? 'score-x' : 'score-o')
    if(score){
        score.innerHTML = player.score
    }
}

function startgame(){
    const player1 = {
        id: 'X',
        score: 0
    }

    const player2 = {
        id: 'O',
        score: 0
    }

    mark([player1, player2], board)
}

function resetgame(){
    const reset = document.getElementById('reset')
    if(reset){
        reset.addEventListener('click', e => {
            state = true
            board.forEach(column => {
                column.setAttribute('data-mark', '')
                column.innerHTML = ''
            })
        })
    }
}

startgame()
resetgame()