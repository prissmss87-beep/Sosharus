import './styles.css'
import X from '../../assets/x.svg'

export default function Main() {

    const users = [
      {
        id: 'fa1tt352621',
        name: "LucasGaybriel",
        age: 17,
        email: 'lucas@email.com'
      },
      {
        id: '2598hfabbha1',
        name: "AlbertoWesker",
        age: 16,
        email: 'alberto@email.com'
      },
    ]

    return (

        <div className='container'>
            <form>
                <h1>Sign Up</h1>
                <input name='name' type='text' />
                <input name='age' type='number' />
                <input name='email' type='email' />
                <button type='button'>Sign Up</button>
            </form>

            <div>
                <div>
                    <p>Name: </p>
                    <p>Idade: </p>
                    <p>Email: </p>
                </div>
                <button>
                    <img src={X} />
                </button>
            </div>
        </div>

    )


}