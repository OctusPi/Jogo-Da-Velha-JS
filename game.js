const celulas = document.querySelectorAll('.col')
const btreset = document.getElementById('btn_reset')
const scoreX  = document.getElementById('scorex')
const scoreO  = document.getElementById('scoreo')

const game = {
    start: true,
    cels_winner: [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]],
    player1:{
        score: 0,
        turn: false,
        winner: false,
        mark: 'X',
        marked: [],
    },
    player2:{
        score: 0,
        turn: false,
        winner: false,
        mark: 'O',
        marked: [],
    }
}

function player_time(p1, p2){
    if(p1.marked.length == 0 && p2.marked.length == 0){
        return p2.winner ? p2 : p1
    }

    if(p1.turn){
        p1.turn = false
        return p2
    }else{
        p2.turn = false
        return p1
    }
}

function check_win(player){
    if(player.marked.length >= 3){
        game.cels_winner.forEach(c => {
            function ok(id){
                return player.marked.includes(id)
            }
        
            if(c.every(ok)){
                game.start = false
                update_score(player)
                c.forEach(i => {
                    celulas[i].classList.add('winner')
                })
                return true
            }
        })
    }
}

function update_score(player){
    player.score++
    
    scoreX.innerText = `Player ${game.player1.mark} : ${game.player1.score}`
    scoreO.innerText = `Player ${game.player2.mark} : ${game.player2.score}`
    game.player1.winner = false
    game.player2.winner = false
    
    player.winner = true
}

function reset_game(){
    game.start = true
    game.player1.marked = []
    game.player2.marked = []

    celulas.forEach(cel => {
        cel.innerText = ''
        cel.classList.remove('winner')
    })
}

function start_game(){
    celulas.forEach((cel, index) => {
        
        cel.addEventListener('click', () => {
            if(game.start && cel.innerText == ''){
                const player = player_time(game.player1, game.player2)
                cel.innerText = player.mark
                player.marked.push(index)
                player.turn = true
                check_win(player)
            }
        })
    })

    btreset.addEventListener('click', reset_game)

}

start_game()