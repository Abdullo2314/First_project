import './Button.css'
export default function Button({ children, onClick }) {

    return <button className='button active' onClick={onClick} onDoubleClick={() => console.log("hello")}>{children}</button>
}