import headerImg from '../assets/quiz-logo.png'
export default function Header () {
    return (
        <header>
            <img src = {headerImg} alt = 'Header image' />
            <h1>React Quiz</h1>
        </header>
    )
}