export default function UserInput ({inputData , onChangeInput}) {
    return (
        <section id = "user-input">
        <div className="input-group">
            <p>
                <label>Initial Investment</label>
                <input type = "number" required 
                id = "initialInvestment"
                value = {inputData.initialInvestment}
                onChange = { (event) => onChangeInput(event.target.id , event.target.value) }></input>
            </p>
            <p>
                <label>Anual Investment</label>
                <input type = "number" required 
                id = "annualInvestment"
                value = {inputData.annualInvestment}
                onChange = { (event) => onChangeInput(event.target.id , event.target.value) }></input>
            </p>

        </div>
        <div className="input-group">
            <p>
                <label>Expected Return</label>
                <input type = "number" required 
                id = "expectedReturn"
                value = {inputData.expectedReturn}
                onChange = { (event) => onChangeInput(event.target.id , event.target.value) }></input>
            </p>
            <p>
                <label>Duration</label>
                <input type = "number" required 
                id = "duration"
                value = {inputData.duration}
                onChange = { (event) => onChangeInput(event.target.id , event.target.value) }></input>
            </p>
        </div>
    </section>
    )
}