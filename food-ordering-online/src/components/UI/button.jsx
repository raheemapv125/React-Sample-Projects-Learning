export default function Button ({children , textOnly , classList , ...props}) {
    let cssClass = textOnly ? 'text-button' : 'button'
    cssClass += ' ' + classList
    return (
        <button className= {cssClass} {...props} >
            {children}
        </button>
    )
}