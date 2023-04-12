function Die(props) {
    const diceStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div style={diceStyle} className="die" onClick={props.holdDice}>
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die